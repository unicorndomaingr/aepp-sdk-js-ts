/*
 * ISC License (ISC)
 * Copyright (c) 2022 aeternity developers
 *
 *  Permission to use, copy, modify, and/or distribute this software for any
 *  purpose with or without fee is hereby granted, provided that the above
 *  copyright notice and this permission notice appear in all copies.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 *  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 *  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 *  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 *  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 *  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 *  PERFORMANCE OF THIS SOFTWARE.
 */

/**
 * Oracle methods - routines to interact with the æternity oracle system
 *
 * The high-level description of the oracle system is
 * https://github.com/aeternity/protocol/blob/master/ORACLE.md in the protocol
 * repository.
 */

import BigNumber from 'bignumber.js';
import { send, SendOptions } from './spend';
import { mapObject, pause } from './utils/other';
import { oracleQueryId, decode, encode } from './tx/builder/helpers';
import { unpackTx } from './tx/builder';
import {
  ORACLE_TTL,
  ORACLE_TTL_TYPES,
  QUERY_FEE,
  QUERY_TTL,
  RESPONSE_TTL,
  TX_TYPE,
} from './tx/builder/schema';
import { RequestTimedOutError } from './utils/errors';
import { EncodedData } from './utils/encoder';
import { _getPollInterval } from './chain';
import { _buildTx, BuildTxOptions } from './tx';
import Node from './Node';
import AccountBase from './account/Base';

type OracleQueries = Awaited<ReturnType<Node['getOracleQueriesByPubkey']>>['oracleQueries'];

/**
 * Constructor for Oracle Object (helper object for using Oracle)
 * @category oracle
 * @param oracleId - Oracle public key
 * @param options - Options
 * @returns Oracle object
 */
export async function getOracleObject(
  oracleId: EncodedData<'ok'>,
  options: { onNode: Node; onAccount: AccountBase },
): Promise<GetOracleObjectReturnType> {
  return {
    ...await options.onNode.getOracleByPubkey(oracleId),
    queries: (await options.onNode.getOracleQueriesByPubkey(oracleId)).oracleQueries,
    ...mapObject<Function, Function>(
      {
        pollQueries: pollForQueries,
        postQuery: postQueryToOracle,
        respondToQuery,
        extendOracle: extendOracleTtl,
        getQuery: getQueryObject,
      },
      ([name, handler]) => [
        name,
        (...args: any) => {
          const lastArg = args[args.length - 1];
          if (lastArg != null && typeof lastArg === 'object' && lastArg.constructor === Object) {
            Object.assign(lastArg, { ...options, ...lastArg });
          } else args.push(options);
          return handler(oracleId, ...args);
        },
      ],
    ),
  } as any;
}

interface GetOracleObjectReturnType extends Awaited<ReturnType<Node['getOracleByPubkey']>> {
  id: EncodedData<'ok'>;
  queries: OracleQueries;
  // TODO: replace getOracleObject with a class
  pollQueries: (cb: Parameters<typeof pollForQueries>[1]) => ReturnType<typeof pollForQueries>;
  postQuery: Function;
  respondToQuery: Function;
  extendOracle: Function;
  getQuery: Function;
}

/**
 * Poll for oracle queries
 * @category oracle
 * @param oracleId - Oracle public key
 * @param onQuery - OnQuery callback
 * @param options - Options object
 * @param options.interval - Poll interval(default: 5000)
 * @param options.onNode - Node to use
 * @returns Callback to stop polling function
 */
export function pollForQueries(
  oracleId: EncodedData<'ok'>,
  onQuery: (queries: OracleQueries) => void,
  { interval, onNode, ...options }: { interval?: number; onNode: Node }
  & Parameters<typeof _getPollInterval>[1],
): () => void {
  interval ??= _getPollInterval('microblock', options);
  const knownQueryIds = new Set();
  const checkNewQueries = async (): Promise<void> => {
    const queries = ((await onNode.getOracleQueriesByPubkey(oracleId)).oracleQueries ?? [])
      .filter(({ id }) => !knownQueryIds.has(id));
    queries.forEach(({ id }) => knownQueryIds.add(id));
    if (queries.length > 0) onQuery(queries);
  };

  let stopped = false;

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  (async () => {
    while (!stopped) { // eslint-disable-line no-unmodified-loop-condition
      // TODO: allow to handle this error somehow
      await checkNewQueries().catch(console.error);
      await pause(interval);
    }
  })();
  return () => { stopped = true; };
}

/**
 * Constructor for OracleQuery Object (helper object for using OracleQuery)
 * @category oracle
 * @param oracleId - Oracle public key
 * @param queryId - Oracle Query id
 * @param options - Options
 * @returns OracleQuery object
 */
export async function getQueryObject(
  oracleId: EncodedData<'ok'>,
  queryId: EncodedData<'oq'>,
  options: RespondToQueryOptions & Parameters<typeof pollForQueryResponse>[2],
): Promise<GetQueryObjectReturnType> {
  const record = await options.onNode.getOracleQueryByPubkeyAndQueryId(oracleId, queryId);
  return {
    ...record,
    decodedQuery: decode(record.query as EncodedData<'oq'>).toString(),
    decodedResponse: decode(record.response as EncodedData<'or'>).toString(),
    respond: async (response, opt) => (
      respondToQuery(oracleId, queryId, response, { ...options, ...opt })
    ),
    pollForResponse: async (opt) => pollForQueryResponse(oracleId, queryId, { ...options, ...opt }),
  };
}

interface GetQueryObjectReturnType extends Awaited<ReturnType<Node['getOracleQueryByPubkeyAndQueryId']>> {
  decodedQuery: string;
  decodedResponse: string;
  respond: (response: string, options?: Parameters<typeof respondToQuery>[3]) =>
  ReturnType<typeof respondToQuery>;
  pollForResponse: (options?: Parameters<typeof pollForQueryResponse>[2]) =>
  ReturnType<typeof pollForQueryResponse>;
}

/**
 * Poll for oracle query response
 * @category oracle
 * @param oracleId - Oracle public key
 * @param queryId - Oracle Query id
 * @param options - Options object
 * @param options.interval - Poll interval
 * @param options.onNode - Node to use
 * @returns OracleQuery object
 */
export async function pollForQueryResponse(
  oracleId: EncodedData<'ok'>,
  queryId: EncodedData<'oq'>,
  { interval, onNode, ...options }:
  { interval?: number; onNode: Node } & Parameters<typeof _getPollInterval>[1],
): Promise<string> {
  interval ??= _getPollInterval('microblock', options);
  let height;
  let ttl;
  let response;
  do {
    if (height != null) await pause(interval);
    ({ response, ttl } = await onNode.getOracleQueryByPubkeyAndQueryId(oracleId, queryId));
    const responseBuffer = decode(response as EncodedData<'or'>);
    if (responseBuffer.length > 0) return responseBuffer.toString();
    height = await this.height();
  } while (ttl >= height);
  throw new RequestTimedOutError(height);
}

/**
 * Register oracle
 * @category oracle
 * @param queryFormat - Format of query
 * @param responseFormat - Format of query response
 * @param options - Options
 * @param options.queryFee - Oracle query Fee
 * @param options - Options object
 * @param options.abiVersion - Always 0 (do not use virtual machine)
 * @param options.fee - Transaction fee
 * @param options.ttl - Transaction time to leave
 * @returns Oracle object
 */
export async function registerOracle(
  queryFormat: string,
  responseFormat: string,
  options: RegisterOracleOptions,
): Promise<Awaited<ReturnType<typeof send>> & Awaited<ReturnType<typeof getOracleObject>>> {
  const accountId = await options.onAccount.address(options);
  const oracleRegisterTx = await _buildTx(TX_TYPE.oracleRegister, {
    queryFee: QUERY_FEE,
    oracleTtlValue: ORACLE_TTL.value,
    oracleTtlType: ORACLE_TTL.type,
    ...options,
    accountId,
    queryFormat,
    responseFormat,
  });
  return {
    ...await send(oracleRegisterTx, options),
    ...await getOracleObject(encode(decode(accountId), 'ok'), options),
  };
}

type RegisterOracleOptionsType = SendOptions & Parameters<typeof getOracleObject>[1]
& BuildTxOptions<TX_TYPE.oracleRegister, 'accountId' | 'queryFormat' | 'responseFormat' | 'queryFee' | 'oracleTtlType' | 'oracleTtlValue'>
& {
  queryFee?: number | string | BigNumber;
  oracleTtlType?: ORACLE_TTL_TYPES;
  oracleTtlValue?: number;
};
interface RegisterOracleOptions extends RegisterOracleOptionsType {}

/**
 * Post query to oracle
 * @category oracle
 * @param oracleId - Oracle public key
 * @param query - Oracle query object
 * @param options - Options object
 * @param options.queryTtl - queryTtl Oracle query time to leave
 * @param options.responseTtl - queryFee Oracle query response time to leave
 * @param options.queryFee - queryFee Oracle query fee
 * @param options.fee - fee Transaction fee
 * @param options.ttl - Transaction time to leave
 * @returns Query object
 */
export async function postQueryToOracle(
  oracleId: EncodedData<'ok'>,
  query: string,
  options: PostQueryToOracleOptions,
): Promise<Awaited<ReturnType<typeof send>> & Awaited<ReturnType<typeof getQueryObject>>> {
  options.queryFee ??= (await options.onNode.getOracleByPubkey(oracleId)).queryFee.toString();
  const senderId = await options.onAccount.address(options);

  const oracleQueryTx = await _buildTx(TX_TYPE.oracleQuery, {
    queryTtlType: QUERY_TTL.type,
    queryTtlValue: QUERY_TTL.value,
    responseTtlType: RESPONSE_TTL.type,
    responseTtlValue: RESPONSE_TTL.value,
    ...options,
    oracleId,
    senderId,
    query,
  });
  const { nonce } = unpackTx(oracleQueryTx, TX_TYPE.oracleQuery).tx;
  const queryId = oracleQueryId(senderId, nonce, oracleId);
  return {
    ...await send(oracleQueryTx, options),
    ...await getQueryObject(oracleId, queryId, options),
  };
}

type PostQueryToOracleOptionsType = Parameters<typeof send>[1]
& Parameters<typeof getQueryObject>[2]
& BuildTxOptions<TX_TYPE.oracleQuery, 'oracleId' | 'senderId' | 'query' | 'queryTtlType' | 'queryTtlValue' | 'responseTtlType' | 'responseTtlValue'>
& {
  queryTtlType?: ORACLE_TTL_TYPES;
  queryTtlValue?: number;
  responseTtlType?: ORACLE_TTL_TYPES;
  responseTtlValue?: number;
};
interface PostQueryToOracleOptions extends PostQueryToOracleOptionsType {}

/**
 * Extend oracle ttl
 * @category oracle
 * @param oracleId - Oracle public key
 * @param options - Options object
 * @param options.fee - fee Transaction fee
 * @param options.ttl - Transaction time to leave
 * @param options.oracleTtlType - Oracle time to leave for extend
 * @param options.oracleTtlValue - Oracle time to leave for extend
 * @returns Oracle object
 */
export async function extendOracleTtl(
  oracleId: EncodedData<'ok'>,
  options: ExtendOracleTtlOptions,
): Promise<Awaited<ReturnType<typeof send>> & Awaited<ReturnType<typeof getOracleObject>>> {
  const oracleExtendTx = await _buildTx(TX_TYPE.oracleExtend, {
    oracleTtlType: ORACLE_TTL.type,
    oracleTtlValue: ORACLE_TTL.value,
    ...options,
    callerId: await options.onAccount.address(options),
    oracleId,
  });
  return {
    ...await send(oracleExtendTx, options),
    ...await getOracleObject(oracleId, options),
  };
}

type ExtendOracleTtlOptionsType = SendOptions & Parameters<typeof getOracleObject>[1]
& BuildTxOptions<TX_TYPE.oracleExtend, 'oracleTtlType' | 'oracleTtlValue' | 'callerId' | 'oracleId'>
& { oracleTtlType?: ORACLE_TTL_TYPES; oracleTtlValue?: number };
interface ExtendOracleTtlOptions extends ExtendOracleTtlOptionsType {}

/**
 * Extend oracle ttl
 * @category oracle
 * @param oracleId - Oracle public key
 * @param queryId - Oracle query id
 * @param response - Oracle query response
 * @param options - Options object
 * @param options.responseTtl - responseTtl Query response time to leave
 * @param options.fee - Transaction fee
 * @param options.ttl - Transaction time to leave
 * @returns Oracle object
 */
export async function respondToQuery(
  oracleId: EncodedData<'ok'>,
  queryId: EncodedData<'oq'>,
  response: string,
  options: RespondToQueryOptions,
): Promise<Awaited<ReturnType<typeof send>> & Awaited<ReturnType<typeof getOracleObject>>> {
  const oracleRespondTx = await _buildTx(TX_TYPE.oracleResponse, {
    responseTtlType: RESPONSE_TTL.type,
    responseTtlValue: RESPONSE_TTL.value,
    ...options,
    callerId: await options.onAccount.address(options),
    oracleId,
    queryId,
    response,
  });
  return {
    ...await send(oracleRespondTx, options),
    ...await getOracleObject(oracleId, options),
  };
}

type RespondToQueryOptionsType = SendOptions & Parameters<typeof getOracleObject>[1]
& BuildTxOptions<TX_TYPE.oracleResponse, 'callerId' | 'oracleId' | 'queryId' | 'response' | 'responseTtlType' | 'responseTtlValue'>
& { responseTtlType?: ORACLE_TTL_TYPES; responseTtlValue?: number };
interface RespondToQueryOptions extends RespondToQueryOptionsType {}
