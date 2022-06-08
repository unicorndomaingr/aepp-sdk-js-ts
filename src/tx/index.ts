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
 * Tx module
 * @module @aeternity/aepp-sdk/es/tx
 * @export Tx
 * @example import { Tx } from '@aeternity/aepp-sdk'
 */

import stampit from '@stamp/it'
import { required } from '@stamp/required'
import { buildTx } from './builder'
import { TxType } from './builder/schema'
import { getAccountNonce, prepareTxParams, VmVersion } from './tx'

abstract class Tx {
  /**
   * Create a transaction
   * @function buildTx
   * @instance
   * @abstract
   * @category async
   * @param options - The object with transaction properties
   * @return generated transaction
  */
  abstract buildTx: typeof buildTx

  abstract getVmVersion: (
    txType: TxType,
    { vmVersion, abiVersion }: Partial<VmVersion>) => VmVersion

  abstract prepareTxParams: typeof prepareTxParams

  /**
   * Get Account Nonce
   * @function getAccountNonce
   * @param address - Account public key
   * @return Result
  */
  abstract getAccountNonce: typeof getAccountNonce
}

/**
 * Basic Tx Stamp
 *
 * Attempting to create instances from the Stamp without overwriting all
 * abstract methods using composition will result in an exception.
 *
 * Tx is one of the three basic building blocks of an
 * {@link module:@aeternity/aepp-sdk/es/ae--Ae} client and provides methods to
 * create aeternity transactions.
 * @alias module:@aeternity/aepp-sdk/es/tx
 * @param options - Initializer object
 * @return Tx instance
 * @example Tx()
 */
export default stampit<Tx>(required({
  methods: {
    buildTx: required,
    getAccountNonce: required,
    getVmVersion: required,
    prepareTxParams: required
  }
}) as stampit.Composable)
