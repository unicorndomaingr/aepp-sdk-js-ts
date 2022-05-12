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
 * Chain module
 * @module @aeternity/aepp-sdk/es/chain
 * @export Chain
 * @example import { Chain } from '@aeternity/aepp-sdk'
 */

import { AE_AMOUNT_FORMATS, formatAmount } from './utils/amount-formatter'
// @ts-expect-error TODO remove
import verifyTransaction from './tx/validator'
import { pause } from './utils/other'
// @ts-expect-error TODO remove
import { isNameValid, produceNameId, decode } from './tx/builder/helpers'
// @ts-expect-error TODO remove
import { DRY_RUN_ACCOUNT } from './tx/builder/schema'
// @ts-expect-error todo remove
import Node from './node'
// @ts-expect-error todo remove
import Ae from './'
import {
  AensPointerContextError,
  DryRunError,
  InvalidAensNameError,
  InvalidTxError,
  RequestTimedOutError,
  TxTimedOutError,
  TxNotInChainError
} from './utils/errors'

interface Transaction {
  hash: string
  rawTx: string
  confirmationHeight?: number
}

interface Account {
  balance: string
  id: string
  kind: string
  nonce: number
  payable: boolean
}

interface Tx {
  blockHash: string
  blockHeight: number
  hash: string
  signatures: string[]
  tx: any
}

interface Generation {
  keyBlock: {
    beneficiary: string
    hash: string
    height: number
    info: string
    miner: string
    nonce: string
    pow: number[]
    prevHash: string
    prevKeyHash: string
    stateHash: string
    target: number
    time: number
    version: number
  }
  microBlocks: any[]
}

interface ReqTransaction {
  tx: string
  accountAddress: string
  top: string | number
  txEvents: boolean
  options?: any
  resolve: Function
  reject: (error: any) => void
}

interface Contract {
  abiVersion: number
  active: boolean
  deposit: number
  id: string
  ownerId: string
  referrerIds: any[]
  vmVersion: number
}

export function _getPollInterval (
  type: 'block' | 'microblock', { _expectedMineRate = 180000, _microBlockCycle = 3000, _maxPollInterval = 5000 }
): number {
  const base = {
    block: _expectedMineRate,
    microblock: _microBlockCycle
  }[type]
  return Math.min(base / 3, _maxPollInterval)
}

/**
 * Submit a signed transaction for mining
 * @instance
 * @abstract
 * @category async
 * @param tx - Transaction to submit
 * @param [options={}] - Options to pass to the implementation
 * @param [options.verify=true] - Verify transaction before broadcast.
 * @return Transaction
 */
export async function sendTransaction (
  tx: string, { onNode, onAccount, verify = true, waitMined = true, confirm, ...options }: {
    onNode: Node
    onAccount: Ae
    verify: boolean
    waitMined: boolean
    confirm: boolean | number
  }
): Promise<Transaction> {
  if (verify) {
    const validation = await verifyTransaction(tx, onNode)
    if (validation.length > 0) {
      const message = 'Transaction verification errors: ' +
        validation.map((v: any) => v.message).join(', ')
      throw Object.assign(new InvalidTxError(message), {
        code: 'TX_VERIFICATION_ERROR',
        validation,
        transaction: tx
      })
    }
  }

  try {
    const { txHash } = await onNode.api.postTransaction({ tx }, {
      __queue: `tx-${await onAccount?.address(options).catch(() => '') as string}`
    })

    if (waitMined) {
      const txData = { ...await poll(txHash, { onNode, ...options }), rawTx: tx }
      // wait for transaction confirmation
      if (confirm != null) {
        return {
          ...txData,
          confirmationHeight: await waitForTxConfirm(txHash, { onNode, confirm, ...options })
        }
      }
      return txData
    }
    return { hash: txHash, rawTx: tx }
  } catch (error) {
    throw Object.assign(error, {
      rawTx: tx,
      verifyTx: async () => await verifyTransaction(tx, onNode)
    })
  }
}

/**
 * Wait for transaction confirmation
 * @function waitForTxConfirm
 * @instance
 * @abstract
 * @category async
 * @rtype (txHash: String, { confirm: Number | Boolean } = { confirm: 3 }) => Promise<Number>
 * @param {String} txHash - Transaction hash
 * @param {Object} [options] - options
 * @param {Number} [options.confirm=3] - Number of blocks to wait for transaction confirmation
 * @return Current Height
 */
export async function waitForTxConfirm (
  txHash: string,
  { onNode, confirm = 3, ...options }: {
    onNode?: Node
    confirm?: boolean | number
  }): Promise<number> {
  confirm = confirm === true ? 3 : confirm
  const { blockHeight }: {blockHeight: number} = await onNode.api.getTransactionByHash(txHash)
  const height = await awaitHeight(blockHeight + (confirm as number), { onNode, ...options })
  const { blockHeight: newBlockHeight } = await onNode.api.getTransactionByHash(txHash)
  switch (newBlockHeight) {
    case -1:
      throw new TxNotInChainError(txHash)
    case blockHeight:
      return height
    default:
      return await waitForTxConfirm(txHash, options)
  }
}

/**
 * Get account by account public key
 * @function getAccount
 * @instance
 * @abstract
 * @category async
 * @rtype (address, { hash, height }) => account: Object
 * @param address - Account public key
 * @param [options={}] - Options
 * @param [options.height] - Get account on specific block by block height
 * @param [options.hash] - Get account on specific block by block hash
 * @return Account
 */
export async function getAccount (
  address: string,
  { height, hash, onNode }: {
    height?: number
    hash?: string
    onNode: Node
  }): Promise<Account> {
  if (height != null) return onNode.api.getAccountByPubkeyAndHeight(address, height)
  if (hash != null) return onNode.api.getAccountByPubkeyAndHash(address, hash)
  return onNode.api.getAccountByPubkey(address)
}

/**
 * Request the balance of specified account
 * @function getBalance
 * @instance
 * @abstract
 * @category async
 * @param address - The public account address to obtain the balance for
 * @param [options={}] - Options
 * @param [options.height] - The chain height at which to obtain the balance for (default:
 * top of chain)
 * @param [options.hash} - The block hash on which to obtain the balance for (default: top
 * of chain)
 * @return The transaction as it was mined
 */
export async function getBalance (
  address: string,
  { format = AE_AMOUNT_FORMATS.AETTOS, onNode, height, hash, ...options }: {
    format: string
    height?: number
    hash?: string
    onNode: Node
  }): Promise<string> {
  const { balance }: {
    balance: number | string } = await getAccount(address, { onNode, ...options })
    .catch(() => ({ balance: 0 }))

  return formatAmount(balance, { targetDenomination: format })
}

/**
 * Obtain current height of the chain
 * @instance
 * @abstract
 * @category async
 * @return Current chain height
 */
export async function height ({ onNode }: { onNode: Node}): Promise<number> {
  return (await onNode.api.getCurrentKeyBlockHeight()).height
}

/**
 * Wait for the chain to reach a specific height
 * @function awaitHeight
 * @instance
 * @abstract
 * @category async
 * @param [options={}] - Options
 * @param [options.interval] - Interval (in ms) at which to poll the chain
 * @param [options.attempts] - Number of polling attempts after which to fail
 * @return Current chain height
 */
export async function awaitHeight (
  _height: number,
  { interval, attempts = 20, onNode, ...options }: {
    interval?: number
    attempts?: number
    onNode: Node
  }): Promise<number> {
  interval ??= _getPollInterval('block', options)
  let currentHeight
  for (let i = 0; i < attempts; i++) {
    if (i !== 0) await pause(interval)
    currentHeight = await height({ onNode })
    if (currentHeight >= _height) return currentHeight
  }
  throw new RequestTimedOutError((attempts - 1) * interval, currentHeight, _height)
}

/**
 * Wait for a transaction to be mined
 * @function poll
 * @instance
 * @abstract
 * @category async
 * @rtype (th: String, options?: Object) => tx: Object
 * @param [options={}] - Options
 * @param [options.interval] - Interval (in ms) at which to poll the chain
 * @param [options.blocks] - Number of blocks mined after which to fail
 */
export async function poll (
  th: string,
  { blocks = 10, interval, onNode, ...options }: {
    blocks?: number
    interval?: number
    onNode: Node
  }): Promise<Tx> {
  interval ??= _getPollInterval('microblock', options)
  const max = await height({ onNode }) + blocks
  do {
    const tx = await onNode.api.getTransactionByHash(th)
    if (tx.blockHeight !== -1) return tx
    await pause(interval)
  } while (await height({ onNode }) < max)
  throw new TxTimedOutError(blocks, th)
}

/**
 * Obtain current generation
 * @instance
 * @abstract
 * @category async
 * @return {Object} Current Generation
 */
export async function getCurrentGeneration ({ onNode }: { onNode: Node }): Promise<Generation> {
  return onNode.api.getCurrentGeneration()
}

/**
 * Get generation by hash or height
 * @instance
 * @abstract
 * @category async
 * @param {String|Number} hashOrHeight - Generation hash or height
 * @return {Object} Generation
 */
export async function getGeneration (
  hashOrHeight: string | number,
  { onNode }: { onNode: Node }): Promise<Generation> {
  if (typeof hashOrHeight === 'string') return onNode.api.getGenerationByHash(hashOrHeight)
  else return onNode.api.getGenerationByHeight(hashOrHeight)
}

/**
 * Get micro block transactions
 * @instance
 * @abstract
 * @category async
 * @return {Object[]} Transactions
 */
export async function getMicroBlockTransactions (
  hash: string,
  { onNode }: { onNode: Node }): Promise<any> {
  return (await onNode.api.getMicroBlockTransactionsByHash(hash)).transactions
}

/**
 * Get key block
 * @instance
 * @abstract
 * @category async
 * @return Key Block
 */
export async function getKeyBlock (
  hashOrHeight: string | number,
  { onNode }: { onNode: Node }): Promise<Generation['keyBlock']> {
  let res
  if (typeof hashOrHeight === 'string') res = onNode.api.getKeyBlockByHash(hashOrHeight)
  else res = onNode.api.getKeyBlockByHeight(hashOrHeight)
  return res
}

/**
 * Get micro block header
 * @instance
 * @abstract
 * @category async
 * @return Micro block header
 */
export async function getMicroBlockHeader (
  hash: string,
  { onNode }: { onNode: Node }): Promise<any> {
  return onNode.api.getMicroBlockHeaderByHash(hash)
}

const txDryRunRequests: Map<string, any> = new Map()
async function txDryRunHandler (key: string, onNode: Node): Promise<void> {
  const rs = txDryRunRequests.get(key) as ReqTransaction[]
  txDryRunRequests.delete(key)

  let dryRunRes
  try {
    dryRunRes = await onNode.api.protectedDryRunTxs({
      top: rs?.[0].top,
      txEvents: rs?.[0].txEvents,
      txs: rs?.map((req) => ({ tx: req.tx })),
      accounts: Array.from(
        new Set(rs?.map((req: { accountAddress: string }) => req.accountAddress)))
        .map(pubKey => ({ pubKey, amount: DRY_RUN_ACCOUNT.amount }))
    })
  } catch (error) {
    rs?.forEach(({ reject }) => reject(error))
    return
  }

  const { results, txEvents } = dryRunRes
  results.forEach(({ result, reason, ...resultPayload }: {
    result: string
    reason: any
  }, idx: number) => {
    const { resolve, reject, tx, options, accountAddress } = rs?.[idx]
    if (result === 'ok') return resolve({ ...resultPayload, txEvents })
    reject(Object.assign(
      new DryRunError(reason), { tx, accountAddress, options }
    ))
  })
}

/**
 * Transaction dry-run
 * @function txDryRun
 * @instance
 * @abstract
 * @category async
 * @rtype (tx, accountAddress, options) => result: Object
 * @param tx - transaction to execute
 * @param accountAddress - address that will be used to execute transaction
 * @param [options.top] - hash of block on which to make dry-run
 * @param [options.txEvents] - collect and return on-chain tx events that would result
 * from the call
 * @return Result
 */
export async function txDryRun (
  tx: string,
  accountAddress: string,
  { top, txEvents, combine, onNode }: {
    top: string | number
    txEvents: boolean
    combine: boolean
    onNode: Node }): Promise<void> {
  const key = combine ? [top, txEvents].join() : 'immediate'
  if (!txDryRunRequests.has(key)) {
    txDryRunRequests.set(key, [])
  }
  return await new Promise((resolve, reject) => {
    txDryRunRequests.get(key)?.push({ tx, accountAddress, top, txEvents, resolve, reject })
    if (!combine) {
      void txDryRunHandler(key, onNode)
      return
    }
    txDryRunRequests.get(key).timeout ??= setTimeout(() => { void txDryRunHandler(key, onNode) })
  })
}

export async function getContractByteCode (
  contractId: string, { onNode }: { onNode: Node }): Promise<string> {
  return onNode.api.getContractCode(contractId)
}

export async function getContract (
  contractId: string, { onNode }: { onNode: Node }): Promise<Contract> {
  return onNode.api.getContract(contractId)
}

export async function getName (
  name: string, { onNode }: { onNode: Node }): Promise<string> {
  return onNode.api.getNameEntryByName(name)
}

/**
 * Resolve AENS name and return name hash
 * @param {String} nameOrId
 * @param {String} key in AENS pointers record
 * @param {Object} [options]
 * @param {Boolean} [options.verify] To ensure that name exist and have a corresponding pointer
 * // TODO: avoid that to don't trust to current api gateway
 * @param {Boolean} [options.resolveByNode] Enables pointer resolving using node
 * @return {String} Address or AENS name hash
 */
export async function resolveName (
  nameOrId: string,
  key: string,
  { verify = true, resolveByNode, onNode }: {
    verify: boolean
    resolveByNode: boolean
    onNode: Node
  }): Promise<string> {
  try {
    decode(nameOrId)
    return nameOrId
  } catch (error) {}
  if (isNameValid(nameOrId)) {
    if (verify || resolveByNode) {
      const name = await onNode.api.getNameEntryByName(nameOrId)
      const pointer = name.pointers.find((pointer: { key: string }) => pointer.key === key)
      if (pointer == null) {
        throw new AensPointerContextError(nameOrId, key)
      }
      if (resolveByNode) return pointer.id
    }
    return produceNameId(nameOrId)
  }
  throw new InvalidAensNameError(`Invalid name or address: ${nameOrId}`)
}
