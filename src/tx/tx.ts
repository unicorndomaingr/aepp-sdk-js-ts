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
 * Transaction module
 * @module @aeternity/aepp-sdk/es/tx/tx
 * @export Transaction
 * @example import { Transaction } from '@aeternity/aepp-sdk'
 */

// @ts-expect-error
import Ae from '../ae'
import Tx from '.'
import {
  ABI_VERSIONS,
  PROTOCOL_VM_ABI,
  TX_TYPE,
  TX_TTL,
  TxType,
  TxParamsCommon
} from './builder/schema'
import {
  ArgumentError,
  UnsupportedProtocolError,
  UnknownTxError
} from '../utils/errors'
import { BigNumber } from 'bignumber.js'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import stampit from '@stamp/it'
import { EncodedData } from '../utils/encoder'
import { buildTx, calculateFee, unpackTx } from './builder/index'
export interface VmVersion {
  vmVersion: number
  abiVersion: number
}

export async function asyncBuildTx (
  txType: TxType,
  params: TxParamsCommon): Promise<EncodedData<'tx'>> {
  let senderKey: keyof TxParamsCommon
  switch (txType) {
    case TX_TYPE.spend:
    case TX_TYPE.oracleQuery:
      senderKey = 'senderId'
      break
    case TX_TYPE.nameClaim:
    case TX_TYPE.nameUpdate:
    case TX_TYPE.nameRevoke:
    case TX_TYPE.nameTransfer:
    case TX_TYPE.namePreClaim:
    case TX_TYPE.oracleRegister:
      senderKey = 'accountId'
      break
    case TX_TYPE.contractCreate:
    case TX_TYPE.gaAttach:
      senderKey = 'ownerId'
      break
    case TX_TYPE.contractCall:
    case TX_TYPE.oracleExtend:
    case TX_TYPE.oracleResponse:
      senderKey = 'callerId'
      break
    case TX_TYPE.channelCloseSolo:
    case TX_TYPE.channelSlash:
    case TX_TYPE.channelSettle:
    case TX_TYPE.channelSnapshotSolo:
      senderKey = 'fromId'
      break
    case TX_TYPE.payingFor:
      senderKey = 'payerId'
      break
    default:
      throw new ArgumentError('txType', 'valid transaction type', txType)
  }
  // TODO: move specific cases to field-types
  if ([TX_TYPE.contractCreate, TX_TYPE.gaAttach].includes(txType as any)) {
    params.ctVersion = this.getVmVersion(TX_TYPE.contractCreate, params)
  }
  if (txType === TX_TYPE.contractCall) {
    params.abiVersion = this.getVmVersion(TX_TYPE.contractCall, params).abiVersion
  }
  if (txType === TX_TYPE.oracleRegister) {
    params.abiVersion ??= ABI_VERSIONS.NO_ABI
  }
  if (txType === TX_TYPE.payingFor) {
    params.tx = unpackTx(params.tx)
  }
  const extraParams = await this.prepareTxParams(txType, { ...params, senderId: params[senderKey] })
  return buildTx({ ...params, ...extraParams }, txType).tx
}

/**
 * Validated vm/abi version or get default based on transaction type and NODE version
 *
 * @param txType Type of transaction
 * @param vmAbi Object with vm and abi version fields
 *  @return Object with vm/abi version
 */
function getVmVersion (
  txType: TxType,
  { vmVersion, abiVersion }: Partial<VmVersion> = {}): VmVersion {
  const { consensusProtocolVersion }:
  {consensusProtocolVersion: keyof typeof PROTOCOL_VM_ABI} = this.getNodeInfo()
  const supportedProtocol = PROTOCOL_VM_ABI[consensusProtocolVersion]
  if (supportedProtocol == null) throw new UnsupportedProtocolError('Not supported consensus protocol version')
  const protocolForTX = supportedProtocol[txType as keyof typeof supportedProtocol]
  if (protocolForTX == null) throw new UnknownTxError('Not supported tx type')
  if (abiVersion == null || abiVersion === 0) { abiVersion = protocolForTX.abiVersion[0] }
  if (vmVersion == null || vmVersion === 0) { vmVersion = protocolForTX.vmVersion[0] as number }
  return { vmVersion, abiVersion }
}

/**
 * Compute the absolute ttl by adding the ttl to the current height of the chain
 *
 * @param ttl
 * @param relative ttl is absolute or relative(default: true(relative))
 * @return Absolute Ttl
 */
async function calculateTtl (ttl = TX_TTL, relative = true): Promise<number> {
  if (ttl === 0) return 0
  if (ttl < 0) throw new ArgumentError('ttl', 'greater or equal to 0', ttl)

  if (relative) {
    const { height } = await this.api.getCurrentKeyBlock()
    return +(height) + ttl
  }
  return ttl
}

/**
 * Get the next nonce to be used for a transaction for an account
 *
 * @param accountId
 * @param nonce
 * @return Next Nonce
 */
export async function getAccountNonce (accountId: string, nonce: number): Promise<number> {
  if (nonce != null) return nonce
  const { nonce: accountNonce } = await this.api.getAccountByPubkey(accountId)
    .catch(() => ({ nonce: 0 }))
  return parseInt(accountNonce) + 1
}

/**
 * Calculate fee, get absolute ttl (ttl + height), get account nonce
 *
 * @param txType Type of transaction
 * @param params Object which contains all tx data
 * @return Object with account nonce, absolute ttl and transaction fee
 */
export async function prepareTxParams (
  txType: TxType,
  {
    senderId,
    nonce: n,
    ttl: t,
    fee: f,
    gasLimit,
    absoluteTtl,
    vsn,
    strategy
  }: TxParamsCommon & {
    vsn?: number
    gasLimit?: number
    absoluteTtl?: number
    strategy?: 'continuity' | 'max'
  }
): Promise<{
    fee: number | string | BigNumber
    ttl: number
    nonce: number | string | BigNumber
  }> {
  n = n ?? (
    await this.api.getAccountNextNonce(senderId, { strategy }).catch(() => ({ nextNonce: 1 }))
  ).nextNonce as number
  const ttl = await calculateTtl.call(this, t, absoluteTtl == null)
  const fee = calculateFee(
    f,
    txType,
    { showWarning: this.showWarning, gasLimit, params: { ...arguments[1], nonce: n, ttl }, vsn }
  )
  return { fee, ttl, nonce: n }
}

/**
 * Transaction Stamp
 *
 * This is implementation of [Tx](api/tx.md) relays
 * the creation of transactions to {@link module:@aeternity/aepp-sdk/es/Node}.
 * This stamp provide ability to create native transaction's,
 * or transaction's using Node API.
 * As there is no built-in security between Node and client communication,
 * creating transaction using {@link module:@aeternity/aepp-sdk/es/Node} API
 * must never be used for production but can be very useful to verify other
 * implementations.
 * @function
 * @alias module:@aeternity/aepp-sdk/es/tx/tx
 * @rtype Stamp
 * @param options - Initializer object
 * @param options.url - Node url
 * @return Transaction instance
 * @example Transaction({url: 'https://testnet.aeternity.io/'})
 */
const Transaction = Ae.compose(Tx, {
  async init ({ showWarning = false }) {
    this.showWarning = showWarning
  },
  props: {
    showWarning: false
  },
  methods: {
    buildTx: asyncBuildTx,
    prepareTxParams,
    getAccountNonce,
    getVmVersion
  }
})

export default Transaction
