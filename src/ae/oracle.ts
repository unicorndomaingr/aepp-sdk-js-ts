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
 * Oracle module - routines to interact with the æternity oracle system
 *
 * The high-level description of the oracle system is
 * https://github.com/aeternity/protocol/blob/master/ORACLE.md in the protocol
 * repository.
 * @module @aeternity/aepp-sdk/es/ae/oracle
 * @export Oracle
 * @example import { Oracle } from '@aeternity/aepp-sdk'
 */

import Ae, { SentTx } from '.'
import { pause } from '../utils/other'
import { oracleQueryId, decode } from '../tx/builder/helpers'
import { unpackTx } from '../tx/builder'
import { ORACLE_TTL, QUERY_FEE, QUERY_TTL, RESPONSE_TTL, TxOracleExtend, TxOracleQuery, TxOracleRegister, TxOracleRespond, TxParams } from '../tx/builder/schema'
import { RequestTimedOutError } from '../utils/errors'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import stampit from '@stamp/it'
import { oracleExtendTx, oraclePostQueryTx, oracleRespondTx } from '../tx/tx'
import { EncodedData } from './../utils/encoder'

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
  queries: string[]
}

interface TtlObject { type: string, value: number}
interface OracleOptions {
  queryFee?: number
  oracleTtl?: TtlObject
  queryTtl?: TtlObject
  responseTtl?: TtlObject
}

export class _Oracle {
  readonly api: any
  readonly _getPollInterval: (type: string, options?: {
    _expectedMineRate: number
    _microBlockCycle: number
    _maxPollInterval: number
  }) => number

  readonly address: (opt?: object) => Promise<string>
  readonly oracleRegisterTx: (opt?: TxOracleRegister) => Promise<object>
  static readonly Ae: {
    defaults: OracleOptions
  } = {
      defaults: {
        queryFee: QUERY_FEE,
        oracleTtl: ORACLE_TTL,
        queryTtl: QUERY_TTL,
        responseTtl: RESPONSE_TTL
      }
    }

  readonly send: <TxType extends TxParams>(
    tx: string | TxParams,
    options: TxParams
  ) => Promise<TxType & SentTx<TxType>>

  readonly oracleRespondTx: typeof oracleRespondTx
  readonly oracleExtendTx: typeof oracleExtendTx
  readonly oraclePostQueryTx: typeof oraclePostQueryTx

  /**
 * Constructor for Oracle Object (helper object for using Oracle)
 * @alias module:@aeternity/aepp-sdk/es/ae/oracle
 * @category async
 * @param oracleId Oracle public key
 * @return Oracle object
 */
  async getOracleObject (oracleId: EncodedData<'ok'>): Promise<OracleObject> {
    const oracle = await this.api.getOracleByPubkey(oracleId)
    const { oracleQueries: queries } = await this.api.getOracleQueriesByPubkey(oracleId)
    return {
      ...oracle,
      queries,
      pollQueries: this.pollForQueries.bind(this, oracleId),
      postQuery: this.postQueryToOracle.bind(this, oracleId),
      respondToQuery: this.respondToQuery.bind(this, oracleId),
      extendOracle: this.extendOracleTtl.bind(this, oracleId),
      getQuery: this.getQueryObject.bind(this, oracleId)
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
  pollForQueries (
    oracleId: EncodedData<'ok'>,
    onQuery: Function,
    { interval = this._getPollInterval('microblock') } = {}
  ): Function {
    const knownQueryIds = new Set()
    const checkNewQueries = async (): Promise<void> => {
      const queries: Array<{id: string}> =
        ((await this.api.getOracleQueriesByPubkey(oracleId)).oracleQueries ?? [])
          .filter(({ id }: {id: string}) => !knownQueryIds.has(id))
      queries.forEach(({ id }) => knownQueryIds.add(id))
      if (queries.length > 0) onQuery(queries)
    }

    let stopped = false
    void (async () => {
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
  async getQueryObject (oracleId: EncodedData<'ok'>, queryId: string): Promise<{
    decodedQuery: string
    decodedResponse: string
    respond: Function
    pollForResponse: Function }> {
    const q = await this.api.getOracleQueryByPubkeyAndQueryId(oracleId, queryId)
    return {
      ...q,
      decodedQuery: decode(q.query).toString(),
      decodedResponse: decode(q.response).toString(),
      respond: this.respondToQuery.bind(this, oracleId, queryId),
      pollForResponse: this.pollForQueryResponse.bind(this, oracleId, queryId),
      /**
     * @deprecated use plain decode instead
     * @param data
     */
      decode: (data: EncodedData<string>) => decode(data)
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
  async pollForQueryResponse (
    oracleId: EncodedData<'ok'>,
    queryId: string,
    { attempts = 20, interval = this._getPollInterval('microblock') } = {}
  ): Promise<string> {
    for (let i = 0; i < attempts; i++) {
      if (i > 0) await pause(interval)
      const { response } = await this.api.getOracleQueryByPubkeyAndQueryId(oracleId, queryId)
      const responseBuffer = decode(response, 'or')
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
  async registerOracle (
    queryFormat: string,
    responseFormat: string,
    options = {}
  ): Promise<object> {
    const opt = { ..._Oracle.Ae.defaults, ...options } // Preset VmVersion for oracle
    const accountId = await this.address(opt)

    const oracleRegisterTx = await this.oracleRegisterTx({
      ...opt,
      accountId,
      queryFormat,
      responseFormat
    })
    return {
      ...await this.send(oracleRegisterTx, opt),
      ...await this.getOracleObject(`ok_${accountId.slice(3)}`)
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
  async postQueryToOracle (oracleId: EncodedData<'ok'>,
    query: string,
    options: TxOracleQuery): Promise<object> {
    const queryFee = options?.queryFee ?? (await this.api.getOracleByPubkey(oracleId)).queryFee
    const opt = { ..._Oracle.Ae.defaults, ...options, queryFee }
    const senderId = await this.address(opt)

    const oracleRegisterTx = await this.oraclePostQueryTx({
      ...opt,
      oracleId,
      senderId,
      query
    })
    const queryId = oracleQueryId(senderId, unpackTx(oracleRegisterTx).tx.nonce ?? 0, oracleId)
    return {
      ...await this.send(oracleRegisterTx, opt),
      ...await this.getQueryObject(oracleId, queryId)
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
  async extendOracleTtl (oracleId: EncodedData<'ok'>,
    oracleTtl: { type: string, value: number},
    options: TxOracleExtend): Promise<SentTx<TxOracleExtend> & OracleObject> {
    const opt = { ..._Oracle.Ae.defaults, ...options }
    const callerId = await this.address(opt)

    const oracleExtendTx = await this.oracleExtendTx({
      ...opt,
      oracleId,
      callerId,
      oracleTtl
    })
    return {
      ...await this.send(oracleExtendTx, opt),
      ...await this.getOracleObject(oracleId)
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
  async respondToQuery (oracleId: EncodedData<'ok'>,
    queryId: string,
    response: string,
    options: TxOracleRespond): Promise<SentTx<TxOracleExtend> & OracleObject> {
    const opt: TxOracleRespond = {
      ..._Oracle.Ae.defaults,
      ...options
    }
    const callerId = await this.address(opt)

    const oracleRespondTx = await this.oracleRespondTx({
      ...opt,
      oracleId,
      queryId,
      callerId,
      response
    })
    return {
      ...await this.send(oracleRespondTx, opt),
      ...await this.getOracleObject(oracleId)
    }
  }
}
/**
 * Oracle Stamp
 *
 * Oracle provides oracle-system related methods atop
 * {@link module:@aeternity/aepp-sdk/es/ae--Ae} clients.
 * @alias module:@aeternity/aepp-sdk/es/ae/oracle
 * @param Options - Initializer object
 * @return Oracle instance
 */
const Oracle = Ae.compose({
  methods: {
    registerOracle: _Oracle.prototype.registerOracle,
    respondToQuery: _Oracle.prototype.respondToQuery,
    extendOracleTtl: _Oracle.prototype.extendOracleTtl,
    postQueryToOracle: _Oracle.prototype.postQueryToOracle,
    pollForQueryResponse: _Oracle.prototype.pollForQueryResponse,
    pollForQueries: _Oracle.prototype.pollForQueries,
    getOracleObject: _Oracle.prototype.getOracleObject,
    getQueryObject: _Oracle.prototype.getQueryObject
  },
  deepProps: {
    Ae: {
      defaults: _Oracle.Ae.defaults
    }
  }
})

export default Oracle
