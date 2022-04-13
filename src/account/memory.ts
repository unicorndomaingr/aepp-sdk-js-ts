/*
 * ISC License (ISC)
 * Copyright (c) 2018 aeternity developers
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
 * Memory Account module
 * @module @aeternity/aepp-sdk/es/account/memory
 * @export MemoryAccount
 * @example import { MemoryAccount } from '@aeternity/aepp-sdk'
 */

import AccountBase from './base'
// @ts-ignore TODO: remove me
import { sign, isValidKeypair } from '../utils/crypto'
import { isHex } from '../utils/string'
// @ts-ignore TODO: remove me
import { decode } from '../tx/builder/helpers'
import { InvalidKeypairError } from '../utils/errors'
import { Memory } from './memory.types'
import stampit from '@stamp/it'

const secrets = new WeakMap()

/**
 * In-memory account stamp
 * @function
 * @alias module:@aeternity/aepp-sdk/es/account/memory
 * @rtype Stamp
 * @param {Object} [options={}] - Initializer object
 * @param {Object} options.keypair - Key pair to use
 * @param {String} options.keypair.publicKey - Public key
 * @param {String} options.keypair.secretKey - Private key
 * @return {Account}
 */
export default AccountBase.compose({
  init (this:Memory, { keypair, gaId }: Memory['options']) {
    this.isGa = !!gaId
    if (gaId) {
      decode(gaId)
      secrets.set(this, { publicKey: gaId })
      return
    }

    if (!keypair || typeof keypair !== 'object') throw new InvalidKeypairError('KeyPair must be an object')
    if (!keypair.secretKey || !keypair.publicKey) {
      throw new InvalidKeypairError('KeyPair must must have "secretKey", "publicKey" properties')
    }
    if (typeof keypair.publicKey !== 'string' || keypair.publicKey.indexOf('ak_') === -1) {
      throw new InvalidKeypairError('Public Key must be a base58c string with "ak_" prefix')
    }
    if (
      !Buffer.isBuffer(keypair.secretKey) &&
      (typeof keypair.secretKey === 'string' && !isHex(keypair.secretKey))
    ) throw new InvalidKeypairError('Secret key must be hex string or Buffer')

    const pubBuffer = Buffer.from(decode(keypair.publicKey, 'ak'))
    if (!isValidKeypair(Buffer.from(keypair.secretKey, 'hex'), pubBuffer)) throw new InvalidKeypairError('Invalid Key Pair')

    secrets.set(this, {
      secretKey: Buffer.isBuffer(keypair.secretKey) ? keypair.secretKey : Buffer.from(keypair.secretKey, 'hex'),
      publicKey: keypair.publicKey
    })
  },
  props: { isGa: false },
  methods: {
    sign (this:Memory, data) {
      if (this.isGa) throw new InvalidKeypairError('You are trying to sign data using generalized account without keypair')
      return Promise.resolve(sign(data, secrets.get(this).secretKey))
    },
    address (this:Memory) {
      return Promise.resolve(secrets.get(this).publicKey)
    }
  } as Omit<Memory, 'isGa'|'options'>
}) as stampit.Stamp<Memory>
