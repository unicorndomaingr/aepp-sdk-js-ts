import { SendTxOptions } from './index'
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
 * @module @aeternity/aepp-sdk/es/ae/oracle
 * @export Oracle
 * @example import * as oracleMethods from '@aeternity/aepp-sdk'
 */

import { InstanceFields, send, SentTx } from '.'
import { pause } from '../utils/other'
import { oracleQueryId, decode } from '../tx/builder/helpers'
import { unpackTx } from '../tx/builder'
import { ORACLE_TTL, QUERY_FEE, QUERY_TTL, RESPONSE_TTL, TtlObject, TxTypeSchemas, TX_TYPE } from '../tx/builder/schema'
import { RequestTimedOutError } from '../utils/errors'
import { EncodedData } from './../utils/encoder'
import { _getPollInterval } from '../chain'
import { buildTx } from '../tx'
import { OracleQuery } from '../apis/node'

interface OracleObject {
  pollQueries: Function
  postQuery: Function
  respondToQuery: Function
  extendOracle: Function
  getQuery: Function
  abiVersion: number
  id: EncodedData<'ok'>
  queryFormat: string
  responseFormat: string
  ttl: number
  queries: OracleQuery[]
}

const ORACLE_DEFAULTS = {
  queryFee: QUERY_FEE,
  oracleTtl: ORACLE_TTL,
  queryTtl: QUERY_TTL,
  responseTtl: RESPONSE_TTL
} as const

export interface ApiOracleMethods {
  readonly oracleRegisterTx: (opt?: Partial<TxTypeSchemas['oracleRegister']>) => Promise<string>
}

/**
 * Constructor for Oracle Object (helper object for using Oracle)
 * @alias module:@aeternity/aepp-sdk/es/ae/oracle
 * @category async
 * @param oracleId Oracle public key
 * @return Oracle object
 */
export async function getOracleObject (
  oracleId: EncodedData<'ok'>, options: InstanceFields & SendTxOptions<TxTypeSchemas['oracleExtend']>
): Promise<OracleObject> {
  const oracle = await options.onNode.api.getOracleByPubkey(oracleId)
  const { oracleQueries: queries } =
    await options.onNode.api.getOracleQueriesByPubkey(oracleId)
  return {
    ...oracle,
    abiVersion: parseInt(oracle.abiVersion),
    id: oracle.id as EncodedData<'ok'>,
    // @ts-expect-error type is corrent
    queries,
    pollQueries: pollForQueries.bind(oracleId),
    postQuery: postQueryToOracle.bind(oracleId, { onNode: options.onNode }),
    respondToQuery: respondToQuery.bind(oracleId, { onNode: options.onNode }),
    extendOracle: async (oracleTtl: TtlObject) => await extendOracleTtl(
      oracleId, oracleTtl, options
    ),
    getQuery: getQueryObject.bind(oracleId, { onNode: options.onNode })
  }
}

/**
 * Poll for oracle queries
 * @alias module:@aeternity/aepp-sdk/es/ae/oracle
 * @param oracleId Oracle public key
 * @param onQuery OnQuery callback
 * @param options Options object
 * @param options.interval Poll interval(default: 5000)
 * @return stopPolling - Stop polling function
 */
export function pollForQueries (
  oracleId: EncodedData<'ok'>,
  onQuery: Function,
  { interval, onNode }: {
    interval: number
  } & InstanceFields
): Function {
  interval ??= _getPollInterval('microblock')
  const knownQueryIds = new Set()
  const checkNewQueries = async (): Promise<void> => {
    const queries: Array<{id: string}> =
        ((await onNode.api.getOracleQueriesByPubkey(oracleId)).oracleQueries ?? [])
          .filter(({ id }: {id: string}) => !knownQueryIds.has(id))
    queries.forEach(({ id }) => knownQueryIds.add(id))
    if (queries.length > 0) onQuery(queries)
  }

  let stopped = false;

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  (async () => {
    while (!stopped) { // eslint-disable-line no-unmodified-loop-condition
      // TODO: allow to handle this error somehow
      await checkNewQueries().catch(console.error)
      await pause(interval)
    }
  })()
  return () => { stopped = true }
}

/**
 * Constructor for OracleQuery Object (helper object for using OracleQuery)
 * @alias module:@aeternity/aepp-sdk/es/ae/oracle
 * @param oracleId Oracle public key
 * @param queryId Oracle Query id
 * @return OracleQuery object
 */
export async function getQueryObject (oracleId: EncodedData<'ok'>, queryId: EncodedData<'oq'>, {
  onNode
}: InstanceFields): Promise<{
    decodedQuery: string
    decodedResponse: string
    respond: Function
    pollForResponse: Function
    decode: (data: EncodedData<'ok'>) => Buffer }> {
  const q = await onNode.api.getOracleQueryByPubkeyAndQueryId(oracleId, queryId)
  return {
    ...q,
    decodedQuery: decode(q.query as EncodedData<'oq'>).toString(),
    decodedResponse: decode(q.response as EncodedData<'or'>).toString(),
    respond: respondToQuery.bind(oracleId, queryId, { onNode }),
    pollForResponse: pollForQueryResponse.bind(oracleId, queryId, { onNode }),
    /**
     * @deprecated use plain decode instead
     * @param data
     */
    decode: (data: EncodedData<'ok'>) => decode(data)
  }
}

/**
 * Poll for oracle query response
 * @alias module:@aeternity/aepp-sdk/es/ae/oracle
 * @category async
 * @param oracleId Oracle public key
 * @param queryId Oracle Query id
 * @param options Options object
 * @param options.attempts Poll attempt's(default: 20)
 * @param options.interval Poll interval(default: 5000)
 * @return OracleQuery object
 */
export async function pollForQueryResponse (
  oracleId: EncodedData<'ok'>,
  queryId: EncodedData<'oq'>,
  { attempts = 20, interval, onNode }: {
    attempts: number
    interval?: number
  } & InstanceFields
): Promise<string> {
  interval ??= _getPollInterval('microblock')
  for (let i = 0; i < attempts; i++) {
    if (i > 0) await pause(interval)
    const { response } = await onNode.api.getOracleQueryByPubkeyAndQueryId(oracleId, queryId)
    const responseBuffer = decode(response as EncodedData<'or'>)
    if (responseBuffer.length > 0) {
      return String(responseBuffer)
    }
  }
  throw new RequestTimedOutError((attempts - 1) * interval)
}

/**
 * Register oracle
 * @alias module:@aeternity/aepp-sdk/es/ae/oracle
 * @param queryFormat Format of query
 * @param responseFormat Format of query response
 * @param options
 * @param options.queryFee Oracle query Fee
 * @param options Options object
 * @param options.abiVersion Always 0 (do not use virtual machine)
 * @param options.fee Transaction fee
 * @param options.ttl Transaction time to leave
 * @return Oracle object
 */
export async function registerOracle (
  queryFormat: string,
  responseFormat: string,
  options: SendTxOptions<TxTypeSchemas['oracleRegister']> & SendTxOptions<TxTypeSchemas['oracleExtend']> & TxTypeSchemas['oracleRegister'] & TxTypeSchemas['oracleExtend']
): Promise<object> {
  const opt = { ...ORACLE_DEFAULTS, ...options } // Preset VmVersion for oracle
  const accountId = await options.onAccount.address(opt)

  const oracleRegisterTx = await buildTx(TX_TYPE.oracleRegister, {
    ...opt as TxTypeSchemas['oracleRegister'],
    accountId,
    queryFormat,
    responseFormat,
    onNode: options.onNode
  })
  return {
    ...await send(oracleRegisterTx, opt),
    ...await getOracleObject(`ok_${accountId.slice(3)}`, opt as any)
  }
}

/**
 * Post query to oracle
 * @alias module:@aeternity/aepp-sdk/es/ae/oracle
 * @param oracleId Oracle public key
 * @param query Oracle query object
 * @param options Options object
 * @param options.queryTtl queryTtl Oracle query time to leave
 * @param options.responseTtl queryFee Oracle query response time to leave
 * @param options.queryFee queryFee Oracle query fee
 * @param options.fee fee Transaction fee
 * @param options.ttl Transaction time to leave
 * @return Query object
 */
export async function postQueryToOracle (oracleId: EncodedData<'ok'>,
  query: string,
  options: SendTxOptions<TxTypeSchemas['oracleQuery']> & InstanceFields & {
    queryFee: number
  }
): Promise<object> {
  console.log(options)
  const queryFee = options?.queryFee ??
  (await options.onNode.api.getOracleByPubkey(oracleId)).queryFee
  const opt = { ...ORACLE_DEFAULTS, ...options, queryFee }
  const senderId = await options.onAccount.address(opt)

  const oracleQueryTx = await buildTx(TX_TYPE.oracleQuery, {
    ...opt,
    oracleId,
    senderId,
    query
  })
  const queryId = oracleQueryId(senderId, unpackTx(
    oracleQueryTx, { txType: TX_TYPE.oracleQuery }).tx.nonce, oracleId)
  return {
    ...await send(oracleQueryTx, opt),
    ...await getQueryObject(oracleId, queryId, opt)
  }
}

/**
 * Extend oracle ttl
 * @alias module:@aeternity/aepp-sdk/es/ae/oracle
 * @param oracleId Oracle public key
 * @param oracleTtl Oracle time to leave for extend
 * @param options Options object
 * @param options.fee fee Transaction fee
 * @param options.ttl Transaction time to leave
 * @return Oracle object
 */
export async function extendOracleTtl (oracleId: EncodedData<'ok'>,
  oracleTtl: TtlObject,
  options: SendTxOptions<TxTypeSchemas['oracleExtend']> & InstanceFields
): Promise<SentTx<TxTypeSchemas['oracleExtend']> & OracleObject> {
  const opt = { ...ORACLE_DEFAULTS, ...options }
  const callerId = await options.onAccount.address(opt)

  const oracleExtendTx = await buildTx(TX_TYPE.oracleExtend, {
    ...opt,
    oracleId,
    callerId,
    oracleTtl
  })
  return {
    ...await send(oracleExtendTx, opt),
    ...await getOracleObject(oracleId, opt)
  }
}

/**
 * Extend oracle ttl
 * @alias module:@aeternity/aepp-sdk/es/ae/oracle
 * @param oracleId Oracle public key
 * @param queryId Oracle query id
 * @param response Oracle query response
 * @param options Options object
 * @param options.responseTtl responseTtl Query response time to leave
 * @param options.fee Transaction fee
 * @param options.ttl Transaction time to leave
 * @return Oracle object
 */
export async function respondToQuery (
  oracleId: EncodedData<'ok'>,
  queryId: EncodedData<'oq'>,
  response: string,
  options: SendTxOptions<TxTypeSchemas['oracleResponse']> & InstanceFields
): Promise<SentTx<TxTypeSchemas['oracleResponse']> & OracleObject> {
  const opt = {
    ...ORACLE_DEFAULTS,
    ...options
  }
  const callerId = await options.onAccount.address(opt)

  const oracleRespondTx = await buildTx(TX_TYPE.oracleResponse, {
    ...opt,
    oracleId,
    queryId,
    callerId,
    response,
    onNode: options.onNode
  })
  return {
    ...await send(oracleRespondTx, opt),
    ...await getOracleObject(oracleId, options as any)
  }
}
