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
 * Aens methods - routines to interact with the æternity naming system
 *
 * The high-level description of the naming system is
 * https://github.com/aeternity/protocol/blob/master/AENS.md in the protocol
 * repository.
 * @module @aeternity/aepp-sdk/es/ae/aens
 * @example import * as aensMethods from '@aeternity/aepp-sdk'
 */

import { salt } from '../utils/crypto'
import { commitmentHash, isAuctionName } from '../tx/builder/helpers'
import { CLIENT_TTL, NAME_TTL, TX_TYPE, TxTypeSchemas } from '../tx/builder/schema'
import { ArgumentError } from '../utils/errors'
import { Pointer } from './../tx/builder/helpers'
import { EncodedData } from './../utils/encoder'
import { BigNumber } from 'bignumber.js'
import { InstanceFields, send, SentTx } from '.'
import { buildTx } from '../tx'
import { getName, height } from '../chain'
import { _AccountResolver } from '../account/resolver'
import { TxSchema } from './../tx/builder/schema'
import { SendTxOptions } from './index'
export interface BaseAensOptions {
  fee?: number | string | BigNumber
  ttl?: number | string | BigNumber
  nonce?: number | BigNumber | string
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
}

interface AensOptions<TxTypeSchema extends TxSchema>
  extends InstanceFields, SendTxOptions<TxTypeSchema> {}

export interface QueryResult {
  id: EncodedData<'nm'>
  owner: EncodedData<'ak'>
  pointers: KeyPointers | Pointer[]
  ttl: number
  update: (pointers: KeyPointers, options?: TxTypeSchemas['nameUpdateTx']) => Promise<SentTx<TxTypeSchemas['nameUpdateTx']>>
  transfer: (account: EncodedData<'ak'>, options?: TxTypeSchemas['nameTransfer']) => Promise<SentTx<TxTypeSchemas['nameTransfer']>>
  revoke: (options: TxTypeSchemas['nameRevokeTx']) => Promise<SentTx<TxTypeSchemas['nameRevokeTx']>>
  extendTtl: (nameTtl: number, options?: TxTypeSchemas['nameUpdateTx']) => Promise<SentTx<TxTypeSchemas['nameUpdateTx']>>
}

interface ClaimTxObject extends SentTx<TxTypeSchemas['nameClaimTx']> {
  nameFee?: BigNumber
}

interface TxAensNamePreclaim extends SentTx<TxTypeSchemas['namePreClaimTx']> {
  height: number
  salt: number
  commitmentId: string
  claim: (options?: Partial<TxTypeSchemas['nameClaimTx']>) => Promise<ClaimTxObject>
}

const AENS_DEFAULTS = {
  clientTtl: CLIENT_TTL,
  nameTtl: NAME_TTL
} as const

export type AensName = `${string}.chain`

export interface ApiAensFunctions {
  aensClaim: typeof aensClaim
  nameRevokeTx: (options: TxTypeSchemas['nameRevokeTx']) => Promise<EncodedData<'tx'>>
  aensRevoke: typeof aensRevoke
  nameUpdateTx: (options: TxTypeSchemas['nameUpdateTx']) => Promise<EncodedData<'tx'>>
  address: (opt?: BaseAensOptions) => Promise<EncodedData<'ak'>>
  nameTransferTx: (options: TxTypeSchemas['nameTransfer']) => Promise<string>
  height: () => Promise<number>
  getName: (name: string) => Promise<{
    id: EncodedData<'nm'>
    pointers: Pointer[]
    owner: EncodedData<'ak'>
    ttl: number
  }>
  aensUpdate: typeof aensUpdate
}

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
export async function aensRevoke (
  name: AensName,
  { ...options }: AensOptions<TxTypeSchemas['nameRevokeTx']>
): Promise<SentTx<TxTypeSchemas['nameRevokeTx']>> {
  const opt = { ...AENS_DEFAULTS, ...options }

  const nameRevokeTx = await buildTx(TX_TYPE.nameRevoke, {
    ...opt,
    nameId: name,
    accountId: await options.instance.address(opt)
  })
  return await send(nameRevokeTx, opt)
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
export async function aensUpdate (
  name: AensName,
  pointers: KeyPointers,
  { extendPointers, ...options }: TxTypeSchemas['nameUpdateTx'] & SendTxOptions<TxTypeSchemas['nameUpdateTx']> & {
    extendPointers?: boolean
  }
): Promise<SentTx<TxTypeSchemas['nameUpdateTx']>> {
  extendPointers ??= false
  const opt = { ...AENS_DEFAULTS, ...options, extendPointers }
  const allPointers = {
    ...extendPointers && Object.fromEntries(
      (await getName(name, { onNode: opt.onNode }))
        .pointers.map(({ key, id }: {key: string, id: string}) => [key, id])
    ),
    ...pointers
  }

  const nameUpdateTx = await buildTx(TX_TYPE.nameUpdate, {
    ...opt,
    nameId: name,
    accountId: await options.instance.address(opt),
    pointers: Object.entries(allPointers).map(([key, id]) => ({ key, id: id.toString() }))
  })

  return await send(nameUpdateTx, opt)
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
export async function aensTransfer (name: AensName,
  account: EncodedData<'ak'>,
  { ...options }: Partial<TxTypeSchemas['nameTransfer']> & SendTxOptions<TxTypeSchemas['nameTransfer']>
): Promise<SentTx<TxTypeSchemas['nameTransfer']>> {
  const opt = { ...AENS_DEFAULTS, ...options }
  const nameTransferTx = await buildTx(TX_TYPE.nameTransfer, {
    ...opt,
    nameId: name,
    accountId: await options.onAccount.address(opt),
    recipientId: account
  })

  return await send(nameTransferTx, opt)
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
export async function aensQuery (name: AensName,
  opt: QueryOptions & InstanceFields): Promise<QueryResult> {
  const o = await getName(name, { onNode: opt.onNode })

  return Object.freeze(Object.assign(o, {
    pointers: o.pointers ?? [],
    update: async (pointers: KeyPointers,
      options: TxTypeSchemas['nameUpdateTx'] & {
        innerTx: boolean
        tx: TxTypeSchemas['nameUpdateTx']
      }): Promise<SentTx<TxTypeSchemas['nameUpdateTx']>> => {
      return {
        ...await aensUpdate(name, pointers, { ...opt, ...options }),
        ...await aensQuery(name, opt)
      }
    },
    transfer: async (account: EncodedData<'ak'>, options: TxTypeSchemas['nameTransfer'] & {
      innerTx: boolean
      tx: TxTypeSchemas['nameTransfer']
    }): Promise<SentTx<TxTypeSchemas['nameTransfer']>> => {
      return {
        ...await aensTransfer(name, account, { ...opt, ...options }),
        ...await aensQuery(name, opt)
      }
    },
    revoke: async (
      { ...options }: TxTypeSchemas['nameRevokeTx'] & {
        innerTx: boolean
        tx: TxTypeSchemas['nameRevokeTx']
      }
    ): Promise<SentTx<TxTypeSchemas['nameRevokeTx']>> => await aensRevoke(
      name, { ...opt, ...options }
    ),
    extendTtl: async (
      nameTtl = NAME_TTL,
      options: TxTypeSchemas['nameUpdateTx'] & {
        innerTx: boolean
        tx: TxTypeSchemas['nameUpdateTx']
      }): Promise<SentTx<TxTypeSchemas['nameUpdateTx']>> => {
      if (nameTtl > NAME_TTL || nameTtl <= 0) {
        throw new ArgumentError('nameTtl', `a number between 1 and ${NAME_TTL} blocks`, nameTtl)
      }

      return {
        ...await aensUpdate(
          name,
          {},
          { ...opt, ...options, nameTtl, extendPointers: true }),
        ...await aensQuery(name, opt)
      }
    }
  })) as QueryResult
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
export async function aensClaim (
  name: AensName,
  salt: number, { ...options }: AensOptions<TxTypeSchemas['nameClaimTx']> & {
    nameFee: BigNumber
    VSN?: number | string | BigNumber
  }
):
  Promise<ClaimTxObject> {
  const opt = { ...AENS_DEFAULTS, ...options }

  const claimTx = await buildTx(TX_TYPE.nameClaim, {
    ...opt,
    accountId: await options.onAccount.address(opt),
    nameSalt: salt,
    name
  })

  const result = await send(claimTx, opt)
  if (!isAuctionName(name)) {
    const nameInter = result.blockHeight != null && result.blockHeight > 0
      ? await aensQuery(name, opt)
      : {}
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
export async function aensPreclaim (name: AensName,
  { ...options }: AensOptions<TxTypeSchemas['nameClaimTx']> & {
    nameFee: BigNumber
  }):
  Promise<TxAensNamePreclaim> {
  const opt = { ...AENS_DEFAULTS, ...options }
  const _salt = salt()
  const currentHeight = await height(opt)
  const commitmentId = commitmentHash(name, _salt)

  const preclaimTx = await buildTx(TX_TYPE.namePreClaim, {
    ...opt,
    accountId: await options.onAccount.address(opt),
    commitmentId
  })

  const result = await send(preclaimTx, opt)

  return Object.freeze({
    ...result,
    height: currentHeight,
    claim: async (opts: Partial<TxTypeSchemas['nameClaimTx']>) => {
      return await aensClaim(name, _salt, { ...options, ...opts })
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
export async function aensBid (
  name: AensName,
  nameFee: BigNumber,
  { ...options }: AensOptions<TxTypeSchemas['nameClaimTx']>
): Promise<ClaimTxObject> {
  return await aensClaim(name, 0, { ...options, nameFee, VSN: 2 })
}
