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
import { EncodedData } from './../utils/encoder'
import Tx from '.'
import { buildTx, calculateFee, unpackTx } from './builder'
import { buildContractId } from './builder/helpers'
import TxObject from './tx-object'
import {
  ArgumentError,
  UnsupportedABIversionError,
  UnsupportedVMversionError,
  UnsupportedProtocolError,
  UnknownTxError
} from '../utils/errors'
import {
  TxNameRevoke,
  TxContractCreate,
  TxContractCall,
  TxOracleRegister,
  TxOracleExtend,
  TxOracleQuery,
  TxOracleRespond,
  TxChannelCloseSolo,
  TxChannelSlash,
  TxChannelSettle,
  TxChannelSnapshotSolo,
  TxGaAttach,
  TxPayingFor,
  TxBase,
  ABI_VERSIONS,
  MIN_GAS_PRICE,
  PROTOCOL_VM_ABI,
  TX_TYPE,
  TX_TTL,
  TxNamePreClaim,
  TxNameClaim2,
  TxSpend,
  TxNameTransfer,
  TxNameUpdate,
  TxParams,
  TxType
} from './builder/schema'
import { BigNumber } from 'bignumber.js'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import stampit from '@stamp/it'

interface VmVersion {
  vmVersion: number
  abiVersion: number
}

async function spendTx ({ senderId, recipientId, payload = '' }: TxSpend): Promise<string> {
  const { ttl, nonce } = await this.prepareTxParams(
    TX_TYPE.spend, { senderId, ...arguments[0], payload }
  )
  return new TxObject({
    params: {
      ...arguments[0],
      recipientId,
      senderId,
      nonce,
      ttl,
      payload
    },
    type: TX_TYPE.spend
  }).encodedTx
}

async function namePreclaimTx ({ accountId }: TxNamePreClaim): Promise<string> {
  const { fee, ttl, nonce } = await this.prepareTxParams(
    TX_TYPE.namePreClaim, { senderId: accountId, ...arguments[0] }
  )
  return new TxObject({
    params: { ...arguments[0], nonce, ttl, fee },
    type: TX_TYPE.namePreClaim
  }).encodedTx
}

async function nameClaimTx ({ accountId, vsn = 2 }: TxNameClaim2): Promise<string> {
  const { fee, ttl, nonce } = await this.prepareTxParams(
    TX_TYPE.nameClaim, { senderId: accountId, ...arguments[0], vsn }
  )
  return new TxObject({
    params: { ...arguments[0], nonce, ttl, fee, vsn },
    type: TX_TYPE.nameClaim
  }).encodedTx
}

async function nameTransferTx ({ accountId, recipientId }: TxNameTransfer): Promise<string> {
  const { fee, ttl, nonce } = await this.prepareTxParams(
    TX_TYPE.nameTransfer, { senderId: accountId, ...arguments[0] }
  )
  return new TxObject({
    params: { ...arguments[0], recipientId, nonce, ttl, fee },
    type: TX_TYPE.nameTransfer
  }).encodedTx
}

async function nameUpdateTx ({ accountId }: TxNameUpdate): Promise<string> {
  const { fee, ttl, nonce } = await this.prepareTxParams(
    TX_TYPE.nameUpdate, { senderId: accountId, ...arguments[0] }
  )
  return new TxObject({
    params: { ...arguments[0], nonce, ttl, fee },
    type: TX_TYPE.nameUpdate
  }).encodedTx
}

async function nameRevokeTx ({ accountId }: TxNameRevoke): Promise<string> {
  const { fee, ttl, nonce } = await this.prepareTxParams(
    TX_TYPE.nameRevoke, { senderId: accountId, ...arguments[0] }
  )
  return new TxObject({
    params: { ...arguments[0], nonce, ttl, fee },
    type: TX_TYPE.nameRevoke
  }).encodedTx
}

async function contractCreateTx (
  { ownerId, gasPrice = MIN_GAS_PRICE }: TxContractCreate): Promise<{
    tx: TxParams
    contractId: string
  }> {
  const ctVersion = this.getVmVersion(TX_TYPE.contractCreate, arguments[0])
  const { fee, ttl, nonce } = await this.prepareTxParams(
    TX_TYPE.contractCreate, { senderId: ownerId, ...arguments[0], ctVersion, gasPrice }
  )
  return {
    tx: new TxObject({
      params: { ...arguments[0], nonce, ttl, fee, ctVersion, gasPrice },
      type: TX_TYPE.contractCreate
    }).encodedTx,
    contractId: buildContractId(ownerId, nonce)
  }
}

async function contractCallTx (
  { callerId, gasPrice = MIN_GAS_PRICE }: TxContractCall): Promise<string> {
  const ctVersion = this.getVmVersion(TX_TYPE.contractCall, arguments[0])
  const { fee, ttl, nonce } = await this.prepareTxParams(
    TX_TYPE.contractCall,
    { senderId: callerId, ...arguments[0], gasPrice, abiVersion: ctVersion.abiVersion }
  )
  return new TxObject({
    params: { ...arguments[0], nonce, ttl, fee, abiVersion: ctVersion.abiVersion, gasPrice },
    type: TX_TYPE.contractCall
  }).encodedTx
}

async function oracleRegisterTx ({
  accountId, queryFormat, responseFormat, queryFee, oracleTtl, abiVersion = ABI_VERSIONS.NO_ABI
}: TxOracleRegister): Promise<string> {
  const { fee, ttl, nonce } = await this.prepareTxParams(
    TX_TYPE.oracleRegister, { senderId: accountId, ...arguments[0], abiVersion }
  )
  return new TxObject<TxOracleRegister>({
    params: {
      accountId,
      queryFee,
      abiVersion,
      fee,
      oracleTtl,
      nonce,
      ttl,
      queryFormat,
      responseFormat
    },
    type: TX_TYPE.oracleRegister
  }).encodedTx
}

export async function oracleExtendTx (
  { oracleId, callerId, oracleTtl }: TxOracleExtend): Promise<string> {
  const { fee, ttl, nonce } = await this.prepareTxParams(
    TX_TYPE.oracleExtend, { senderId: callerId, ...arguments[0] }
  )
  return new TxObject<TxOracleExtend>({
    params: { oracleId, fee, oracleTtl, nonce, ttl },
    type: TX_TYPE.oracleExtend
  }).encodedTx
}

export async function oraclePostQueryTx (
  { oracleId, responseTtl, query, queryTtl, queryFee, senderId }: TxOracleQuery): Promise<EncodedData<'tx'>> {
  const { fee, ttl, nonce } = await this.prepareTxParams(
    TX_TYPE.oracleQuery, { senderId, ...arguments[0] }
  )
  return new TxObject({
    params: { oracleId, responseTtl, query, queryTtl, fee, queryFee, ttl, nonce, senderId },
    type: TX_TYPE.oracleQuery
  }).encodedTx
}

export async function oracleRespondTx (
  { oracleId, callerId, responseTtl, queryId, response }: TxOracleRespond): Promise<string> {
  const { fee, ttl, nonce } = await this.prepareTxParams(
    TX_TYPE.oracleResponse, { senderId: callerId, ...arguments[0] }
  )
  return new TxObject<TxOracleRespond>({
    params: { oracleId, responseTtl, queryId, response, fee, ttl, nonce },
    type: TX_TYPE.oracleResponse
  }).encodedTx
}

async function channelCloseSoloTx (
  { channelId, fromId, payload, poi }: TxChannelCloseSolo): Promise<string> {
  const { fee, ttl, nonce } = await this.prepareTxParams(
    TX_TYPE.channelCloseSolo, { senderId: fromId, ...arguments[0], payload }
  )
  return buildTx({
    ...arguments[0],
    channelId,
    fromId,
    payload,
    poi,
    ttl,
    fee,
    nonce
  }, TX_TYPE.channelCloseSolo).tx
}

async function channelSlashTx (
  { channelId, fromId, payload, poi }: TxChannelSlash): Promise<string> {
  const { fee, ttl, nonce } = await this.prepareTxParams(
    TX_TYPE.channelSlash, { senderId: fromId, ...arguments[0], payload }
  )
  return buildTx({
    ...arguments[0],
    channelId,
    fromId,
    payload,
    poi,
    ttl,
    fee,
    nonce
  }, TX_TYPE.channelSlash).tx
}

async function channelSettleTx (
  {
    channelId,
    fromId,
    initiatorAmountFinal,
    responderAmountFinal
  }: TxChannelSettle): Promise<string> {
  const { fee, ttl, nonce } = await this.prepareTxParams(
    TX_TYPE.channelSettle, { senderId: fromId, ...arguments[0] }
  )
  return buildTx({
    ...arguments[0],
    channelId,
    fromId,
    initiatorAmountFinal,
    responderAmountFinal,
    ttl,
    fee,
    nonce
  }, TX_TYPE.channelSettle).tx
}

async function channelSnapshotSoloTx (
  { channelId, fromId, payload }: TxChannelSnapshotSolo): Promise<string> {
  const { fee, ttl, nonce } = await this.prepareTxParams(
    TX_TYPE.channelSnapshotSolo, { senderId: fromId, ...arguments[0], payload }
  )
  return buildTx({
    ...arguments[0],
    channelId,
    fromId,
    payload,
    ttl,
    fee,
    nonce
  }, TX_TYPE.channelSnapshotSolo).tx
}

async function gaAttachTx ({ ownerId, gasPrice = MIN_GAS_PRICE }: TxGaAttach): Promise<object> {
  const ctVersion = this.getVmVersion(TX_TYPE.contractCreate, arguments[0])
  const { fee, ttl, nonce } = await this.prepareTxParams(
    TX_TYPE.gaAttach, { senderId: ownerId, ...arguments[0], ctVersion, gasPrice }
  )
  return {
    tx: new TxObject({
      params: { ...arguments[0], nonce, ttl, fee, ctVersion, gasPrice },
      type: TX_TYPE.gaAttach
    }).encodedTx,
    contractId: buildContractId(ownerId, nonce)
  }
}

async function payingForTx ({ tx, payerId, ...args }: TxPayingFor): Promise<string> {
  const params = { tx: unpackTx(tx), payerId }
  const { fee, nonce } = await this.prepareTxParams(TX_TYPE.payingFor, {
    ...params, ...args, senderId: payerId
  })
  return buildTx({ ...params, ...args, fee, nonce }, TX_TYPE.payingFor).tx
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
  if (vmVersion == null || vmVersion === 0) { vmVersion = protocolForTX.vmVersion[0] }
  if (protocolForTX.vmVersion != null && !protocolForTX.vmVersion.includes(vmVersion)) {
    throw new UnsupportedVMversionError(`VM VERSION ${vmVersion} do not support by this node. Supported: [${protocolForTX.vmVersion.toString()}]`)
  }
  if (!protocolForTX.abiVersion.includes(abiVersion)) {
    throw new UnsupportedABIversionError(`ABI VERSION ${abiVersion} do not support by this node. Supported: [${protocolForTX.abiVersion.toString()}]`)
  }
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
async function getAccountNonce (accountId: string, nonce: number): Promise<number> {
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
async function prepareTxParams (
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
  }: TxBase & {
    senderId?: string
    ttl?: number
    nonce?: number
    fee?: number
    gasLimit?: number
    absoluteTtl?: number
    strategy?: 'continuity' | 'max'
  }
): Promise<{
    fee: number | string
    ttl: number
    nonce: number | string | BigNumber
  }> {
  n = n ?? (
    await this.api.getAccountNextNonce(senderId, { strategy }).catch(() => ({ nextNonce: 1 }))
  ).nextNonce
  const ttl = await calculateTtl.call(this, t, absoluteTtl == null)
  const fee = calculateFee(
    f,
    txType,
    { showWarning: this.showWarning, gasLimit, params: { ...arguments[1], nonce: n, ttl }, vsn }
  )
  // @ts-expect-error remove me wen chain.js is migrated to ts
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
    spendTx,
    namePreclaimTx,
    nameClaimTx,
    nameTransferTx,
    nameUpdateTx,
    nameRevokeTx,
    contractCreateTx,
    contractCallTx,
    prepareTxParams,
    oracleRegisterTx,
    oracleExtendTx,
    oraclePostQueryTx,
    oracleRespondTx,
    channelCloseSoloTx,
    channelSlashTx,
    channelSettleTx,
    channelSnapshotSoloTx,
    gaAttachTx,
    payingForTx,
    getAccountNonce,
    getVmVersion
  }
})

export default Transaction
