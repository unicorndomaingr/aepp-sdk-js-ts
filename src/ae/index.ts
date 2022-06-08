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
 * Ae module
 * @module @aeternity/aepp-sdk/es/ae
 * @export Ae
 * @example import { Ae } from '@aeternity/aepp-sdk'
 */
import stampit from '@stamp/it'
import * as chainMethods from '../chain'
import * as txMethods from '../tx'
import NodePool from '../node-pool'
import AccountResolver from '../account/resolver'
import { buildTxHash, unpackTx } from '../tx/builder'
import BigNumber from 'bignumber.js'
import { AE_AMOUNT_FORMATS } from '../utils/amount-formatter'
import { ArgumentError } from '../utils/errors'
import { mapObject } from '../utils/other'
import { EncodedData } from './../utils/encoder'
import { TxParamsCommon, TxSchema, TxType, TX_TYPE, AMOUNT, TxTypeSchemas } from './../tx/builder/schema'
import { getAccount } from '../chain'
// @ts-expect-error
import ContractCompilerHttp from '../contract/compiler'
import * as aensMethods from './aens'
import * as oracleMethods from './oracle'
import * as contractMethods from './contract'
import * as contractGaMethods from '../contract/ga'
import { _AccountBase } from '../account/base'

export interface SentTx<TxParams extends TxSchema>{
  blockHash: EncodedData<'mh'>
  blockHeight: number
  hash: EncodedData<'th'>
  signatures: Array<EncodedData<'sg'>>
  tx: TxParams
  rawTx: EncodedData<'tx'>
}

export interface InstanceFields {
  onAccount: _AccountBase
  instance: {
    buildTx: typeof txMethods.buildTx
    _getPollInterval: typeof chainMethods._getPollInterval
    send: <Tx extends TxSchema>(
      tx: EncodedData<'tx'>,
      options: Partial<Tx>
    ) => Promise<SentTx<Tx>>
    [key: string]: any
  } & aensMethods.ApiAensFunctions & oracleMethods.ApiOracleMethods
  onNode: chainMethods.Node
}

interface TxSend extends TxParamsCommon, Omit<InstanceFields, 'onAccount'> {
  verify?: boolean
  innerTx?: boolean
  onAccount: InstanceFields['onAccount'] | _AccountBase
  txType?: TxType
}

const AE_DEFAULTS = { denomination: AE_AMOUNT_FORMATS.AETTOS } as const

/**
 * Sign and post a transaction to the chain
 * @category async
 * @param tx - Transaction
 * @param options - Options
 * @param options.verify - Verify transaction before broadcast, throw error if not
 * valid
 * @return Transaction
 */
async function send (tx: EncodedData<'tx'>, options: TxSend): Promise<SentTx<any>> {
  const instance = options.instance

  const opt = { ...AE_DEFAULTS, ...options }
  const { contractId, authFun = undefined } = options.innerTx === true
    ? { contractId: null }
    : await getAccount(await instance.address(opt), { onNode: options.onNode })

  const signed = contractId != null
    ? await signUsingGA(tx, { ...opt, authFun, onNode: options.onNode })
    : await instance.signTransaction(tx, opt)
  return opt.innerTx === true
    ? { hash: buildTxHash(signed), rawTx: signed }
    : instance.sendTransaction(signed, opt)
}

async function signUsingGA (
  tx: EncodedData<'tx'>,
  { authData, authFun, instance, ...options }: InstanceFields & {
    authData?: object | EncodedData<'cb'>
    authFun?: string
  } & Parameters<typeof contractGaMethods.createMetaTx>[3]): Promise<string> {
  return instance.createMetaTx(tx, authData, authFun, options)
}

/**
 * Send coins to another account
 * @instance
 * @category async
 * @param amount - Amount to spend
 * @param recipientIdOrName - Address or name of recipient account
 * @param options - Options
 * @return Transaction
 */
async function spend (
  amount: number | string,
  recipientIdOrName: string | Buffer,
  options: TxSend): Promise<SentTx<TxTypeSchemas['payingFor']>> {
  const instance = options.instance
  const opt = { ...AE_DEFAULTS, ...options }
  return await send(
    await instance.buildTx(TX_TYPE.spend, {
      ...opt,
      senderId: await instance.address(opt),
      recipientId: await instance.resolveName(recipientIdOrName, 'account_pubkey', opt),
      amount
    }),
    opt
  )
}

// TODO: Rename to spendFraction
/**
 * Send a fraction of coin balance to another account
 * @instance
 * @category async
 * @param fraction - Fraction of balance to spend (between 0 and 1)
 * @param recipientIdOrName - Address or name of recipient account
 * @param options - Options
 * @return Transaction
 */
async function transferFunds (
  fraction: number | string,
  recipientIdOrName: string,
  options: TxSend): Promise<SentTx<TxTypeSchemas['spendTx']>> {
  if (fraction < 0 || fraction > 1) {
    throw new ArgumentError('fraction', 'a number between 0 and 1', fraction)
  }

  const opt = { ...AE_DEFAULTS, ...options }
  const instance = opt.instance
  const recipientId = await instance.resolveName(recipientIdOrName, 'account_pubkey', opt)
  const senderId = await instance.address(opt)
  const balance = new BigNumber(await instance.getBalance(senderId))
  const desiredAmount = balance.times(fraction).integerValue(BigNumber.ROUND_HALF_UP)
  const { tx: { fee } } = unpackTx(
    await instance.buildTx(TX_TYPE.spend,
      { ...opt, senderId, recipientId, amount: desiredAmount }),
    { txType: TX_TYPE.spend }
  )
  // Reducing of the amount may reduce transaction fee, so this is not completely accurate
  const amount = desiredAmount.plus(fee)
    .gt(balance)
    ? balance.minus(fee)
    : desiredAmount
  return await send(
    await instance.buildTx(TX_TYPE.spend,
      { ...opt, senderId, recipientId, amount }),
    opt)
}

/**
 * Submit transaction of another account paying for it (fee and gas)
 * @param transaction - tx_<base64>-encoded transaction
 * @param options
 * @return Object Transaction
 */
async function payForTransaction (
  transaction: Buffer,
  options: TxTypeSchemas['payingFor'] & InstanceFields): Promise<SentTx<TxTypeSchemas['payingFor']>> {
  const opt = { ...AE_DEFAULTS, ...options }
  const instance = opt.instance
  return await send(
    await instance.buildTx(
      TX_TYPE.payingFor, {
        ...opt,
        payerId: await instance.address(opt),
        tx: transaction
      }),
    opt)
}

/**
 * Remove all listeners for RPC
 */
function destroyInstance ({ instance }: {instance: any}): void {
  const destroyMethods = ['destroyClient', 'destroyServer'] // Array with destroy function's
  destroyMethods.forEach((m) => instance[m] != null && typeof instance[m] === 'function' && instance[m]())
}

const AeMethods = {
  ...mapObject<Function, Function>(
    {
      send,
      spend,
      transferFunds,
      payForTransaction,
      destroyInstance,
      signUsingGA,
      ...chainMethods,
      ...txMethods,
      ...oracleMethods,
      ...aensMethods,
      ...contractMethods,
      ...contractGaMethods
    },
    ([name, handler]) => [
      name,
      function (...args: any[]) {
        const instanceOptions = {
          ...this.Ae.defaults,
          onNode: this.selectedNode.instance,
          instance: this,
          onAccount: this,
          onCompiler: {
            compilerApi: this.compilerApi,
            compilerVersion: this.compilerVersion
          }
        }
        const lastArg = args[args.length - 1]
        if (
          lastArg != null && typeof lastArg === 'object' && lastArg.constructor === Object
        ) {
          Object.assign(lastArg, {
            ...instanceOptions,
            ...lastArg,
            ...lastArg.onAccount != null && { onAccount: this._resolveAccount(lastArg.onAccount) }
          })
        } else args.push(instanceOptions)
        return handler(...args)
      }
    ])
}

export default stampit(NodePool, AccountResolver, ContractCompilerHttp, {
  methods: AeMethods,
  deepProps: {
    Ae: {
      defaults: {
        denomination: AE_AMOUNT_FORMATS.AETTOS,
        amount: AMOUNT
      }
    }
  }
})
