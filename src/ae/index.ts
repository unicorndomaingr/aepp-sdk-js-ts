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
import * as oracleMethods from './oracle'
import * as aensMethods from './aens'
import NodePool from '../node-pool'
import AccountResolver from '../account/resolver'
import { buildTxHash, unpackTx } from '../tx/builder'
import BigNumber from 'bignumber.js'
import { AE_AMOUNT_FORMATS } from '../utils/amount-formatter'
import { ArgumentError } from '../utils/errors'
import { mapObject } from '../utils/other'
import { EncodedData } from './../utils/encoder'
import ContractCompilerHttp from '../contract/compiler'
import * as contractMethods from './contract'
import * as contractGaMethods from '../contract/ga'
import { AensName, SentTx } from './../chain'
import { TxSchema, TX_TYPE, AMOUNT, TxTypeSchemas } from './../tx/builder/schema'
import Node from '../node'

export type SendTxOptions<TxParams extends TxSchema> =
  Parameters<typeof chainMethods.sendTransaction>[1] & InstanceFields
  & {
    innerTx: boolean
    tx: TxParams
  }

export interface InstanceFields {
  onAccount: chainMethods.Account
  onNode: Node
}

export const AE_DEFAULTS = { denomination: AE_AMOUNT_FORMATS.AETTOS } as const

/**
  * Sign and post a transaction to the chain
  * @category async
  * @param tx - Transaction
  * @param options - Options
  * @param options.verify - Verify transaction before broadcast, throw error if not
  * valid
  * @return Transaction
  */
export async function send (
  tx: any,
  options: Parameters<typeof chainMethods.sendTransaction>[1] & InstanceFields & {
    innerTx: boolean
  } & any
): Promise<SentTx> {
  const opt = {
    ...AE_DEFAULTS,
    ...options
  }

  const { contractId, authFun = undefined } = opt.innerTx === true
    ? { contractId: null }
    : await chainMethods.getAccount(await options.onAccount.address(opt), opt)

  const signed = contractId != null
    ? await options.onAccount.signUsingGA(tx, { ...opt, authFun })
    : await options.onAccount.signTransaction(
      tx, { ...opt, networkId: options.onNode.nodeNetworkId }
    )

  return opt.innerTx === true
    ? { hash: buildTxHash(signed), rawTx: signed }
    : await chainMethods.sendTransaction(signed, opt)
}

async function signUsingGA (
  tx: EncodedData<'tx'>,
  { authData, authFun, ...options }: InstanceFields & {
    authData: {
      gasLimit?: number
      callData?: EncodedData<'cb'>
      source?: string
      args?: any[]
    }
    authFun?: string
  } & Parameters<typeof contractGaMethods.createMetaTx>[3]): Promise<EncodedData<'tx'>> {
  return options.onAccount.createMetaTx(tx, authData, authFun, options)
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
  recipientIdOrName: AensName,
  options: SendTxOptions<TxTypeSchemas['spendTx']> & {
    resolveByNode: boolean
  }): Promise<SentTx> {
  const opt = {
    ...this.Ae.defaults,
    ...options
  }
  return this.send(
    await this.buildTx(TX_TYPE.spend, {
      ...opt,
      senderId: await this.address(opt),
      recipientId: await this.resolveName(recipientIdOrName, 'account_pubkey', opt),
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
  recipientIdOrName: AensName,
  options: SendTxOptions<TxTypeSchemas['spendTx']> & {
    resolveByNode: boolean
  }): Promise<SentTx> {
  if (fraction < 0 || fraction > 1) {
    throw new ArgumentError('fraction', 'a number between 0 and 1', fraction)
  }
  const opt = { ...this.Ae.defaults, ...options }
  const recipientId = await this.resolveName(recipientIdOrName, 'account_pubkey', opt)
  const senderId = await this.address(opt)
  const balance = new BigNumber(await this.getBalance(senderId))
  const desiredAmount = balance.times(fraction).integerValue(BigNumber.ROUND_HALF_UP)
  const { tx: { fee } } = unpackTx(
    await this.buildTx(TX_TYPE.spend, { ...opt, senderId, recipientId, amount: desiredAmount }),
    { txType: TX_TYPE.spend }
  )
  // Reducing of the amount may reduce transaction fee, so this is not completely accurate
  const amount = desiredAmount.plus(fee).gt(balance) ? balance.minus(fee) : desiredAmount
  return this.send(
    await this.buildTx(TX_TYPE.spend, { ...opt, senderId, recipientId, amount }),
    opt
  )
}

/**
  * Submit transaction of another account paying for it (fee and gas)
  * @param transaction - tx_<base64>-encoded transaction
  * @param options
  * @return Object Transaction
  */
async function payForTransaction (
  transaction: Buffer,
  options: TxTypeSchemas['payingFor'] & SendTxOptions<TxTypeSchemas['payingFor']>): Promise<SentTx> {
  const opt = { ...this.Ae.defaults, ...options }
  return this.send(
    await this.buildTx(
      TX_TYPE.payingFor, {
        ...opt,
        payerId: await this.address(opt),
        tx: transaction
      }),
    opt)
}

/**
  * Remove all listeners for RPC
  */
function destroyInstance (): void {
  const destroyMethods = ['destroyClient', 'destroyServer'] // Array with destroy function's
  destroyMethods.forEach((m) => this[m] != null && typeof this[m] === 'function' && this[m]())
}

const { _buildTx, ...otherTxMethods } = txMethods
export default stampit(NodePool as stampit.Composable, AccountResolver, ContractCompilerHttp, {
  methods: {
    spend,
    transferFunds,
    payForTransaction,
    destroyInstance,
    signUsingGA,
    ...mapObject<Function, Function>(
      {
        send,
        ...chainMethods,
        ...otherTxMethods,
        ...contractMethods,
        ...contractGaMethods,
        ...oracleMethods,
        ...aensMethods,
        buildTx: _buildTx
      },
      ([name, handler]) => [
        name,
        function (...args: any) {
          const instanceOptions = {
            ...this.Ae.defaults,
            onNode: this.api,
            onAccount: this,
            onCompiler: this.compilerApi
          }
          const lastArg = args[args.length - 1]
          if (
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            lastArg && typeof lastArg === 'object' && lastArg.constructor === Object
          ) {
            Object.assign(lastArg, {
              ...instanceOptions,
              ...lastArg,
              // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
              ...lastArg.onAccount && { onAccount: this._resolveAccount(lastArg.onAccount) }
            })
          } else args.push(instanceOptions)
          return handler(...args)
        }
      ])
  },
  deepProps: {
    Ae: {
      defaults: {
        denomination: AE_AMOUNT_FORMATS.AETTOS,
        amount: AMOUNT
      }
    }
  }
})
