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
 * Tx module
 * @module @aeternity/aepp-sdk/es/tx
 * @export Tx
 * @example import { Tx } from '@aeternity/aepp-sdk'
 */

import stampit from '@stamp/it'
import { required } from '@stamp/required'
import {
  TxContractCall,
  TxContractCreate,
  TxNameClaim2,
  TxNamePreClaim,
  TxNameRevoke,
  TxNameTransfer,
  TxNameUpdate,
  TxOracleExtend,
  TxOracleQuery,
  TxOracleRegister,
  TxOracleRespond,
  TxPayingFor,
  TxSpend
} from './builder/schema'
import { EncodedData } from './../utils/encoder'

export abstract class Tx {
  /**
 * Create a `spend_tx` transaction
 * @param  options - The object to extract properties from
 * @return `spend_tx` transaction
 */
  abstract spendTx: (options: TxSpend) => Promise<EncodedData<'tx'>>

  /**
 * Create a `name_preclaim_tx` transaction
 * @param options - The object to extract properties from
 * @return`name_preclaim_tx` transaction
 */
  abstract namePreclaimTx: (options: TxNamePreClaim) => Promise<string>

  /**
 * Create a `name_claim_tx` transaction
 * @param  options - The object to extract properties from
 * @return name_claim_tx` transaction
 */
  abstract nameClaimTx: (options: TxNameClaim2) => Promise<string>

  /**
 * Create a `name_transfer_tx` transaction
 * @param options - The object to extract properties from
 * @return`name_transfer_tx` transaction
 */
  abstract nameTransferTx: (options: TxNameTransfer) => Promise<string>

  /**
 * Create a `name_update_tx` transaction
 * @param options - The object to extract properties from
 * @return`name_update_tx` transaction
 */
  abstract nameUpdateTx: (options: TxNameUpdate) => Promise<string>

  /**
 * Create a `name_revoke_tx` transaction
 * @param options - The object to extract properties from
 * @return`name_revoke_tx` transaction
 */
  abstract nameRevokeTx: (options: TxNameRevoke) => Promise<string>

  /**
   * Create a `contract_create_tx` transaction
   * @param options - The object to extract properties from
   * @return`contract_create_tx` transaction
  */
  abstract contractCreateTx: (options: TxContractCreate) => Promise<{
    tx: EncodedData<'tx'>
    contractId: EncodedData<'ct'>
  }>

  /**
 * Create a `contract_call_tx` transaction
 * @param options - The object to extract properties from
 * @return `contract_call_tx` transaction
 */
  abstract contractCallTx: (options: TxContractCall) => Promise<string>

  /**
 * Create a `oracle_register_tx` transaction
 * @param options - The object to extract properties from
 * @return `oracle_register_tx` transaction
 */
  abstract oracleRegisterTx: (options: TxOracleRegister) => Promise<string>

  /**
 * Create a `oracle_extend_tx` transaction
 * @param options - The object to extract properties from
 * @return `oracle_extend_tx` transaction
 */
  abstract oracleExtendTx: (options: TxOracleExtend) => Promise<string>

  /**
 * Create a `oracle_post_query_tx` transaction
 * @param options - The object to extract properties from
 * @return `oracle_post_query_tx` transaction
 */
  abstract oraclePostQuery: (options: TxOracleQuery) => Promise<string>

  /**
 * Create a `oracle_respond_tx` transaction
 * @param options - The object to extract properties from
 * @return `oracle_respond_tx` transaction
 */
  abstract oracleRespondTx: (options: TxOracleRespond) => Promise<string>

  /**
   * Get Account Nonce
   * @function getAccountNonce
   * @param address - Account public key
   * @return Result
  */
  abstract getAccountNonce: (address: string) => Promise<string>
  abstract payingForTx ({ tx, payerId, ...args }: TxPayingFor): Promise<EncodedData<'tx'>>
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
    namePreclaimTx: required,
    nameClaimTx: required,
    nameTransferTx: required,
    nameUpdateTx: required,
    nameRevokeTx: required,
    contractCreateTx: required,
    contractCallTx: required,
    oracleRegisterTx: required,
    oracleExtendTx: required,
    oraclePostQueryTx: required,
    oracleRespondTx: required,
    getAccountNonce: required,
    channelCloseSoloTx: required,
    channelSlashTx: required,
    channelSettleTx: required,
    channelSnapshotSoloTx: required,
    gaAttachTx: required,
    getVmVersion: required,
    prepareTxParams: required,
    payingForTx: required
  }
}) as stampit.Composable)
