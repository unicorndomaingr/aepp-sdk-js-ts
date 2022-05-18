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
import TxStamp, { Tx } from '../tx'
import * as chainMethods from '../chain'
import NodePool, { _NodePool } from '../node-pool'
import AccountResolver, { _AccountResolver } from '../account/resolver'
import { buildTxHash, unpackTx } from '../tx/builder'
import BigNumber from 'bignumber.js'
import { AE_AMOUNT_FORMATS } from '../utils/amount-formatter'
import { ArgumentError } from '../utils/errors'
import { mapObject } from '../utils/other'
import { TxParams, TxPayingFor, TxSpend } from '../tx/builder/schema'
// @ts-expect-error
import GeneralizedAccount from '../contract/ga'
// @ts-expect-error
import Chain from '../chain'
import { EncodedData } from './../utils/encoder'

export interface SentTx<TxType extends TxParams> {
  blockHash: EncodedData<'mh'>
  blockHeight: number
  hash: EncodedData<'th'>
  signatures: Array<EncodedData<'sg'>>
  tx: TxType
  rawTx: EncodedData<'tx'>
}

type IAe = Tx & _NodePool & _AccountResolver & Chain

interface TxSend {
  verify?: boolean
  innerTx?: TxParams
  onAccount?: string
}
export class Ae implements IAe {
  signTransaction: _AccountResolver['signTransaction']
  sendTransaction: Chain['sendTransaction']
  getAccount: Chain['getAccount']
  address: _AccountResolver['address']
  addresses: Chain['addresses']
  createMetaTx: GeneralizedAccount['createMetaTx']
  resolveName: Chain['resolveName']
  getBalance: Chain['getBalance']
  spendTx: Tx['spendTx']
  payingForTx: Tx['payingForTx']
  destroyClient?: () => Promise<void>
  destroyServer?: () => Promise<void>
  selectedNode: _NodePool['selectedNode']

  static Ae = { defaults: { denomination: AE_AMOUNT_FORMATS.AETTOS } }

  /**
 * Sign and post a transaction to the chain
 * @category async
 * @param tx - Transaction
 * @param options - Options
 * @param options.verify - Verify transaction before broadcast, throw error if not
 * valid
 * @return Transaction
 */
  async send <Tx extends TxParams>(tx: EncodedData<'tx'>, options: TxSend = {}): Promise<SentTx<Tx>> {
    const opt = { ...Ae.Ae.defaults, ...options }
    const { contractId, authFun = null } = options.innerTx != null
      ? { contractId: false }
      : await this.getAccount(await this.address(opt))
    const signed = contractId != null && contractId !== false
      ? await this.signUsingGA(tx, { ...opt, authFun })
      : await this.signTransaction(tx, opt as any)
    return opt.innerTx != null
      ? { hash: buildTxHash(signed), rawTx: signed }
      : this.sendTransaction(signed, opt)
  }

  async signUsingGA (
    tx: string,
    { authData, authFun, ...options }: any = {}): Promise<string> {
    return this.createMetaTx(tx, authData, authFun, options)
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
  async spend (
    amount: number | string,
    recipientIdOrName: string | Buffer,
    options?: TxSend): Promise<SentTx<TxSpend>> {
    const opt = { ...Ae.Ae.defaults, ...options }
    const spentTx = await this.spendTx({
      ...opt,
      senderId: await this.address(opt),
      recipientId: await this.resolveName(recipientIdOrName, 'account_pubkey', opt),
      amount
    })
    return await this.send(spentTx, opt)
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
  async transferFunds (
    fraction: number | string,
    recipientIdOrName: string,
    options: TxSend & {
      onAccount: {
        publicKey: EncodedData<'ak'>
        secretKey: string
      }
    }): Promise<object> {
    if (fraction < 0 || fraction > 1) {
      throw new ArgumentError('fraction', 'a number between 0 and 1', fraction)
    }
    const opt = { ...Ae.Ae.defaults, ...options }
    const recipientId = await this.resolveName(recipientIdOrName, 'account_pubkey', opt)
    const senderId = await this.address(opt)
    const balance = new BigNumber(await this.getBalance(senderId))
    const desiredAmount = balance.times(fraction).integerValue(BigNumber.ROUND_HALF_UP)
    const { tx: { fee } } = unpackTx(
      await this.spendTx({ ...opt, senderId, recipientId, amount: desiredAmount })
    )
    // Reducing of the amount may reduce transaction fee, so this is not completely accurate
    const amount = desiredAmount.plus(fee ?? 0)
      .gt(balance)
      ? balance.minus(fee ?? 0)
      : desiredAmount
    return await this.send(await this.spendTx({ ...opt, senderId, recipientId, amount }), opt)
  }

  /**
 * Submit transaction of another account paying for it (fee and gas)
 * @param transaction - tx_<base64>-encoded transaction
 * @param options
 * @return Object Transaction
 */
  async payForTransaction (
    transaction: Buffer,
    options: TxSend & TxPayingFor & {
      onAccount: string | {
        publicKey: EncodedData<'ak'>
        secretKey: string
      }
    }): Promise<SentTx<TxPayingFor>> {
    const opt = { ...Ae.Ae.defaults, ...options }
    return await this.send(
      await this.payingForTx({
        ...opt,
        payerId: await this.address(opt),
        tx: transaction
      }),
      opt
    )
  }

  /**
 * Remove all listeners for RPC
 */
  destroyInstance (): void {
    const destroyMethods = ['destroyClient', 'destroyServer'] // Array with destroy function's
    destroyMethods.forEach((m: keyof Ae) => this[m] != null && typeof this[m] === 'function' && this[m]())
  }
}
/**
 * Basic Ae Stamp
 *
 * Attempting to create instances from the Stamp without overwriting all
 * abstract methods using composition will result in an exception.
 *
 * Ae objects are the composition of three basic building blocks:
 * * {@link module:@aeternity/aepp-sdk/es/tx--Tx}
 * * {@link module:@aeternity/aepp-sdk/es/account--Account}
 * * {@link module:@aeternity/aepp-sdk/es/chain--Chain}
 * Only by providing the joint functionality of those three, most more advanced
 * operations, i.e. the ones with actual use value on the chain, become
 * available.
 * @function
 * @alias module:@aeternity/aepp-sdk/es/ae
 * @rtype Stamp
 * @param options - Initializer object
 * @return Ae instance
 */
export default stampit(NodePool, TxStamp, AccountResolver, {
  methods: {
    send: Ae.prototype.send,
    spend: Ae.prototype.spend,
    transferFunds: Ae.prototype.transferFunds,
    payForTransaction: Ae.prototype.payForTransaction,
    destroyInstance: Ae.prototype.destroyInstance,
    signUsingGA: Ae.prototype.signUsingGA,
    ...mapObject(
      chainMethods,
      ([name, handler]) => [
        name,
        function (...args: any[]) {
          const instanceOptions = {
            ...this.Ae.defaults,
            onNode: this.selectedNode.instance,
            onAccount: this
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
      ]
    )
  },
  deepProps: { Ae: { defaults: { denomination: AE_AMOUNT_FORMATS.AETTOS } } }
})
