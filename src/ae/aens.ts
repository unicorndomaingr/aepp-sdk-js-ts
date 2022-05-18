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
 * Aens module - routines to interact with the æternity naming system
 *
 * The high-level description of the naming system is
 * https://github.com/aeternity/protocol/blob/master/AENS.md in the protocol
 * repository.
 * @module @aeternity/aepp-sdk/es/ae/aens
 * @export Aens
 * @example import { Aens } from '@aeternity/aepp-sdk'
 */

import { salt } from '../utils/crypto'
import { commitmentHash, ensureNameValid, isAuctionName } from '../tx/builder/helpers'
import Ae, { SentTx } from '.'
import { CLIENT_TTL, NAME_TTL, OnAccount, TxNameRevoke } from '../tx/builder/schema'
import { ArgumentError } from '../utils/errors'
import { Pointer } from './../tx/builder/helpers'
import { TxNameClaim2, TxNamePreClaim, TxNameTransfer, TxNameUpdate, TxParams } from './../tx/builder/schema'
import { EncodedData } from './../utils/encoder'
import { BigNumber } from 'bignumber.js'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import stampit from '@stamp/it'

export interface BaseAensOptions {
  fee?: number | string | BigNumber
  ttl?: number | string | BigNumber
  nonce?: number | BigNumber | string
  onAccount?: OnAccount
}

interface KeyPointers {
  [key: string]: string | Buffer
}

interface QueryOptions {
  denomination?: string
  clientTtl?: number
  nameTtl?: number
  gasPrice?: number
  amount?: number
  queryFee?: number
  oracleTtl?: { type: string, value: number }
  queryTtl?: { type: string, value: number }
  responseTtl?: { type: string, value: number }
  _expectedMineRate?: number
  _microBlockCycle?: number
  onAccount?: OnAccount
}

interface QueryResult {
  id: EncodedData<'nm'>
  owner: EncodedData<'ak'>
  pointers: KeyPointers | Pointer[]
  ttl: number
  update: (pointers: KeyPointers, options?: TxNameUpdate) => Promise<SentTx<TxNameUpdate>>
  transfer: (account: EncodedData<'ak'>, options?: TxNameTransfer) => Promise<SentTx<TxNameTransfer>>
  revoke: (options: TxNameRevoke) => Promise<SentTx<TxNameRevoke>>
  extendTtl: (nameTtl: number, options?: TxNameUpdate) => Promise<SentTx<TxNameUpdate>>
}

interface TxAensNamePreclaim extends SentTx<TxNamePreClaim> {
  height: number
  salt: number
  commitmentId: string
  claim: (options?: BaseAensOptions) => Promise<TxNameClaim2 & SentTx<TxNameClaim2>>
}

export class _Aens {
  readonly aensClaim: (
    name: string,
    salt: number,
    options: TxNameClaim2 & {onAccount?: OnAccount}) => Promise<SentTx<TxNameClaim2> & QueryResult>

  readonly send: <TxType extends TxParams>(
    tx: string | TxParams,
    options: TxParams
  ) => Promise<TxType & SentTx<TxType>>

  static readonly Ae = {
    defaults: {
      clientTtl: CLIENT_TTL,
      nameTtl: NAME_TTL
    }
  }

  readonly nameRevokeTx: (options: TxNameRevoke) => Promise<string>
  readonly nameUpdateTx: (options: TxNameUpdate) => Promise<string>
  readonly address: (opt?: BaseAensOptions) => Promise<EncodedData<'ak'>>
  readonly nameTransferTx: (options: TxNameTransfer) => Promise<string>
  readonly height: () => Promise<number>
  readonly getName: (name: string) => Promise<{
    id: EncodedData<'nm'>
    pointers: Pointer[]
    owner: EncodedData<'ak'>
    ttl: number
  }>

  readonly aensUpdate: (
    name: string,
    pointers?: Map<string, string> | KeyPointers,
    options?: TxNameUpdate) => Promise<SentTx<TxNameUpdate>>

  readonly aensQuery: typeof _Aens.prototype.query
  readonly aensPreclaim: typeof _Aens.prototype.preclaim
  readonly aensBid: typeof _Aens.prototype.bid
  readonly aensTransfer: typeof _Aens.prototype.transfer
  readonly aensRevoke: typeof _Aens.prototype.revoke
  readonly nameClaimTx: (options?: TxNameClaim2) => Promise<string>
  readonly namePreclaimTx: (options?: TxNamePreClaim) => Promise<string>

  /**
 * Revoke a name
 * @alias module:@aeternity/aepp-sdk/es/ae/aens
 * @param name Name hash
 * @param options
 * @param options.onAccount Make operation on specific account from sdk (you pass
 * publickKey) or using provided KeyPair(Can be keypair object or MemoryAccount)
 * @param options.fee fee
 * @param options.ttl ttl
 * @param options.nonce nonce
 * @return Transaction result
 * @example
 * const name = 'test.chain'
 * const nameObject = await sdkInstance.aensQuery(name)
 *
 * await sdkInstance.aensRevoke(name, { fee, ttl , nonce })
 * // or
 * await nameObject.revoke({ fee, ttl, nonce })
 */
  async revoke (name: string, options: BaseAensOptions): Promise<SentTx<TxNameRevoke>> {
    ensureNameValid(name)
    const opt = { ..._Aens.Ae.defaults, ...options }

    const nameRevokeTx = await this.nameRevokeTx({
      ...opt,
      nameId: name,
      accountId: await this.address(opt)
    })

    return await this.send(nameRevokeTx, opt)
  }

  /**
 * Update a name
 * @alias module:@aeternity/aepp-sdk/es/ae/aens
 * @param name AENS name
 * @param pointers Map of pointer keys to corresponding addresses
 * @param options
 * @param options.extendPointers Get the pointers from the node and merge with provided
 * ones. Pointers with the same type will be overwritten
 * @param options.onAccount Make operation on specific account from sdk (you
 * pass publickKey) or using provided KeyPair(Can be keypair object or MemoryAccount)
 * @param options.fee fee
 * @param options.ttl ttl
 * @param options.nonce nonce
 * @param options.nameTtl Name ttl represented in number of
 * blocks (Max value is 50000 blocks)
 * @param options.clientTtl=84600 a suggestion as to how long any
 * clients should cache this information
 * @throws Invalid pointer array error
 * @example
 * const name = 'test.chain'
 * const pointersArray = ['ak_asd23dasdas...,' 'ct_asdf34fasdasd...']
 * const nameObject = await sdkInstance.aensQuery(name)
 *
 * await sdkInstance.aensUpdate(name, pointersArray, { nameTtl, ttl, fee, nonce, clientTtl })
 * // or
 * await nameObject.update(pointers, { nameTtl, ttl, fee, nonce, clientTtl })
 */
  async update (name: string,
    pointers: Map<string, string>,
    options: BaseAensOptions & {
      extendPointers: boolean
      nameTtl?: number | string | BigNumber
      clientTtl?: number | string | BigNumber
    } = { extendPointers: false }): Promise<SentTx<TxNameUpdate>> {
    ensureNameValid(name)
    const opt = { ..._Aens.Ae.defaults, ...options }
    const allPointers = {
      ...options.extendPointers && Object.fromEntries(
        (await this.getName(name))
          .pointers.map(({ key, id }: {key: string, id: string}) => [key, id])
      ),
      ...pointers
    }

    const nameUpdateTx = await this.nameUpdateTx({
      ...opt,
      nameId: name,
      accountId: await this.address(opt),
      pointers: Object.entries(allPointers).map(([key, id]) => ({ key, id: id.toString() }))
    })

    return await this.send(nameUpdateTx, opt)
  }

  /**
 * Transfer a domain to another account
 * @alias module:@aeternity/aepp-sdk/es/ae/aens
 * @param name AENS name
 * @param account Recipient account publick key
 * @param options
 * @param options.onAccount Make operation on specific account from sdk (you pass
 * publickKey) or using provided KeyPair(Can be keypair object or MemoryAccount)
 * @param options.fee fee
 * @param options.ttl ttl
 * @param options.nonce nonce
 * @return Transaction result
 * @example
 * const name = 'test.chain'
 * const recipientPub = 'ak_asd23dasdas...'
 * const nameObject = await sdkInstance.aensQuery(name)
 *
 * await sdkInstance.aensTransfer(name, recipientPub, { ttl, fee, nonce })
 * // or
 * await nameObject.transfer(recipientPub, { ttl, fee, nonce })
 */
  async transfer (name: string,
    account: EncodedData<'ak'>,
    options: BaseAensOptions): Promise<SentTx<TxNameTransfer>> {
    ensureNameValid(name)
    const opt = { ..._Aens.Ae.defaults, ...options }
    const nameTransferTx = await this.nameTransferTx({
      ...opt,
      nameId: name,
      accountId: await this.address(opt),
      recipientId: account
    })

    return await this.send(nameTransferTx, opt)
  }

  /**
 * Query the AENS name info from the node
 * and return the object with info and predefined functions for manipulating name
 * @category async
 * @alias module:@aeternity/aepp-sdk/es/ae/aens
 * @param name
 * @param opt Options
 * @return
 * @example
 * const nameObject = sdkInstance.aensQuery('test.chain')
 * console.log(nameObject)
 * {
 *  id, // name hash
 *  pointers, // array of pointers
 *  update, // Update name function
 *  extendTtl, // Extend Ttl name function
 *  transfer, // Transfer name function
 *  revoke // Revoke name function
 * }
 */
  async query (name: string, opt: QueryOptions = {}): Promise<QueryResult> {
    ensureNameValid(name)
    const o: {
      pointers: KeyPointers | Pointer[]
      id: EncodedData<'nm'>
      ttl: number
      owner: EncodedData<'ak'>} = await this.getName(name)

    return Object.freeze(Object.assign(o, {
      pointers: o.pointers ?? [],
      update: async (pointers: KeyPointers,
        options: TxNameUpdate): Promise<SentTx<TxNameUpdate>> => {
        return {
          ...(await this.aensUpdate(name, pointers, { ...opt, ...options })),
          ...(await this.aensQuery(name))
        }
      },
      transfer: async (account: EncodedData<'ak'>, options: TxNameTransfer): Promise<SentTx<TxNameTransfer>> => {
        return {
          ...(await this.aensTransfer(name, account, { ...opt, ...options })),
          ...(await this.aensQuery(name))
        }
      },
      revoke: async (
        options: TxNameRevoke
      ): Promise<SentTx<TxNameRevoke>> => await this.aensRevoke(name, { ...opt, ...options }),
      extendTtl: async (
        nameTtl = NAME_TTL,
        options: TxNameUpdate): Promise<SentTx<TxNameUpdate>> => {
        if (typeof nameTtl !== 'number' || nameTtl > NAME_TTL || nameTtl <= 0) {
          throw new ArgumentError('nameTtl', `a number between 1 and ${NAME_TTL} blocks`, nameTtl)
        }

        return {
          ...await this.aensUpdate(
            name,
            undefined,
            { ...opt, ...options, nameTtl, extendPointers: true }),
          ...await this.aensQuery(name)
        }
      }
    }))
  }

  /**
 * Claim a previously preclaimed registration. This can only be done after the
 * preclaim step
 * @category async
 * @alias module:@aeternity/aepp-sdk/es/ae/aens
 * @param name
 * @param salt Salt from pre-claim, or 0 if it's a bid
 * @param options options
 * @param options.onAccount Make operation on specific account from sdk (you pass
 * publickKey) or using provided KeyPair(Can be keypair object or MemoryAccount)
 * @param options.fee fee
 * @param options.ttl ttl
 * @param options.nonce nonce
 * @param options.nameFee Name Fee (By default calculated by sdk)
 * @return the result of the claim
 * @example
 * const name = 'test.chain'
 * const salt = preclaimResult.salt // salt from pre-claim transaction
 *
 * await sdkInstance.aensClaim(name, salt, { ttl, fee, nonce, nameFee })
 */
  async claim (name: string, salt: number, options: TxNameClaim2):
  Promise<SentTx<TxNameClaim2> & {
    nameFee?: number | string | BigNumber
  }> {
    ensureNameValid(name)
    const opt = { ..._Aens.Ae.defaults, ...options }

    const claimTx = await this.nameClaimTx({
      ...opt,
      accountId: await this.address(opt),
      nameSalt: salt,
      name
    })

    const result = await this.send<TxNameClaim2>(claimTx, opt)
    if (!isAuctionName(name)) {
      const nameInter = result.blockHeight > 0 ? await this.aensQuery(name, opt) : {}
      return Object.assign(result, nameInter)
    }
    return { ...result, nameFee: opt.nameFee }
  }

  /**
 * Preclaim a name. Sends a hash of the name and a random salt to the node
 * @alias module:@aeternity/aepp-sdk/es/ae/aens
 * @param name
 * @param options
 * @param options.onAccount Make operation on specific account from sdk (you pass
 * publickKey) or using provided KeyPair(Can be keypair object or MemoryAccount)
 * @param options.fee fee
 * @param options.ttl ttl
 * @param options.nonce nonce
 * @example
 * const name = 'test.chain'
 * const salt = preclaimResult.salt // salt from pre-claim transaction
 *
 * await sdkInstance.aensPreclaim(name, { ttl, fee, nonce })
 * {
 *   ...transactionResult,
 *   claim, // Claim function (options={}) => claimTransactionResult
 *   salt,
 *   commitmentId
 * }
 */
  async preclaim (name: string, options?: BaseAensOptions & {
    onAccount?: EncodedData<'ak'>
  }):
    Promise<TxAensNamePreclaim> {
    ensureNameValid(name)
    const opt = { ..._Aens.Ae.defaults, ...options }
    const _salt = salt()
    const height = await this.height()
    const commitmentId = commitmentHash(name, _salt)

    const preclaimTx = await this.namePreclaimTx({
      ...opt,
      accountId: await this.address(opt),
      commitmentId
    })

    const result = await this.send<TxNamePreClaim>(preclaimTx, opt)

    return Object.freeze({
      ...result,
      height,
      claim: async (options?: BaseAensOptions) => {
        return await this.aensClaim(name, _salt, { ...options, onAccount: opt.onAccount })
      },
      salt: _salt,
      commitmentId
    })
  }

  /**
 * Bid to name auction
 * @alias module:@aeternity/aepp-sdk/es/ae/aens
 * @param name Domain name
 * @param nameFee Name fee (bid fee)
 * @param options
 * @param options.onAccount Make operation on specific account from sdk (you pass
 * publickKey) or using provided KeyPair(Can be keypair object or MemoryAccount)
 * @param options.fee fee
 * @param options.ttl ttl
 * @param options.nonce nonce
 * @return Transaction result
 * @example
 * const name = 'test.chain'
 * const bidFee = computeBidFee(name, startFee, incrementPercentage)
 *
 * await sdkInstance.aensBid(name, 213109412839123, { ttl, fee, nonce })
 */
  async bid (name: string,
    nameFee: number | BigNumber | string,
    options: {
      onAccount?: OnAccount
    } = {}): Promise<SentTx<TxNameClaim2> & QueryResult> {
    return await this.aensClaim(name, 0, { ...options, nameFee, vsn: 2 })
  }
}

const Aens = Ae.compose({
  methods: {
    aensQuery: _Aens.prototype.query,
    aensPreclaim: _Aens.prototype.preclaim,
    aensClaim: _Aens.prototype.claim,
    aensUpdate: _Aens.prototype.update,
    aensTransfer: _Aens.prototype.transfer,
    aensRevoke: _Aens.prototype.revoke,
    aensBid: _Aens.prototype.bid
  },
  deepProps: {
    Ae: _Aens.Ae
  }
})

export default Aens
