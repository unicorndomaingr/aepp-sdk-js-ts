import { EncodedData } from './../utils/encoder'
import { TxParams, TxType, TX_TYPE } from './builder/schema'
/**
 * TxObject module
 * @module @aeternity/aepp-sdk/es/tx/tx-object
 * @export TxObject
 * @example import TxObject from '@aeternity/aepp-sdk/es/tx/tx-object'
 */
// import stampit from '@stamp/it'
import { buildTx, calculateFee, unpackTx } from './builder'
import { encode } from './builder/helpers'
import { isHex } from '../utils/string'
import { InvalidTxError, TypeError, InvalidSignatureError } from '../utils/errors'
import { NestedUint8Array } from 'rlp'

/**
 * Transaction Validator Class
 * This class gives us possibility to unpack and validate some of transaction properties,
 * to make sure we can post it to the chain
 * @alias module:@aeternity/aepp-sdk/es/tx/tx-object
 * @param options - Initializer object
 * @param options.tx - Rlp binary or base64c transaction
 * @param options.params - Transaction params
 * @param options.type - Transaction type
 * @param options.options - Build options
 * @return TxObject instance
 * @example new TxObject({ params: {...}, type: 'spendTx' })
 */

class TxObject<Tx extends TxParams> {
  options: any
  signatures: Uint8Array[]
  type: TxType
  params: Tx & {
    signatures?: Uint8Array[]
    encodedTx: {
      tx?: Tx
      txType?: TxType
    }
    [key: string]: any
  }

  isSigned: boolean
  rlpEncoded: Buffer
  encodedTx: any
  binary: Uint8Array | NestedUint8Array

  constructor ({ tx, params, type, options = {} }: {
    tx?: Uint8Array | EncodedData<'tx'>
    params?: Tx
    type?: TxType
    options?: any
  }) {
    this.options = options
    this.signatures = []
    Object.assign(this, this.initTransaction({ tx, params, type, options }))

    if (this.type === TX_TYPE.signed) {
      const { signatures = [], encodedTx: { txType } } = this.params
      this.signatures = signatures
      if (txType != null) { this.type = txType }
      this.isSigned = true
    }
  }

  /**
 * Build transaction from object
 * @alias module:@aeternity/aepp-sdk/es/tx/tx-object
 * @param type Transaction type
 * @param params Transaction params
 * @param options Options
 */
  buildTransaction = (
    type: TxType,
    params: TxParams,
    options: any = {}): {
    encodedTx: any
    binary: Uint8Array | NestedUint8Array
    rlpEncoded: any
    params: Tx
    type: TxType
  } => {
    const fee = calculateFee(
      params.fee, type,
      { gasLimit: params.gasLimit, params, vsn: params.vsn })
    const { rlpEncoded, binary, tx: encodedTx, txObject } = buildTx<Tx>(
      { ...params, fee }, type, { vsn: params.vsn, ...options }
    )
    return { rlpEncoded, binary, encodedTx, params: txObject, type }
  }

  /**
 * Unpack transaction from RLP encoded binary or base64c string
 * @alias module:@aeternity/aepp-sdk/es/tx/tx-object
 * @param tx RLP encoded binary or base64c(rlpBinary) string
 */
  unpackTransaction = (tx: Uint8Array | EncodedData<'tx'>): {
    encodedTx: EncodedData<'tx'>
    type: TxType
    params: Tx
    rlpEncoded: Uint8Array | `tx_${string}`
    binary: Uint8Array | NestedUint8Array
  } => {
    if (typeof tx === 'string') {
      const { txType: type, tx: params, rlpEncoded, binary } = unpackTx<Tx>(tx)
      return { encodedTx: tx, type, params, rlpEncoded, binary }
    } else {
      const { txType: type, tx: params, rlpEncoded, binary } = unpackTx<Tx>(tx, true)
      return { encodedTx: encode<'tx'>(tx, 'tx'), type, params, rlpEncoded, binary }
    }
  }

  /**
 * Helper which build or unpack transaction base on constructor arguments
 * Need to provide one of arguments: [tx] -> unpack flow or [params, type] -> build flow
 * @alias module:@aeternity/aepp-sdk/es/tx/tx-object
 * @param _.tx Transaction rlp binary or vase64c string
 * @param _.params Transaction params
 * @param _.type Transaction type
 * @param _.options Options
 */
  initTransaction = ({ tx, params, type, options = {} }: {
    tx?: Uint8Array | EncodedData<'tx'>
    params?: Tx
    type?: TxType
    options: any
  }): {
    encodedTx: string
    type: TxType
    params: Tx
    rlpEncoded: Uint8Array | `tx_${string}`
    binary: Uint8Array | NestedUint8Array
  } => {
    if (params !== undefined && type !== undefined) {
      return this.buildTransaction(type, params, options)
    }
    if (tx != null) return this.unpackTransaction(tx)
    throw new InvalidTxError('Invalid TxObject arguments. Please provide one of { tx: "tx_asdasd23..." } or { type: "spendTx", params: {...} }')
  }

  /**
     * Rebuild transaction with new params and recalculate fee
     * @alias module:@aeternity/aepp-sdk/es/tx/tx-object
     * @param props Transaction properties for update
     * @param options
     * @return {TxObject}
     */
  setProp (props: any, options?: Tx): TxObject<Tx> {
    if (typeof props !== 'object') throw new TypeError('Props should be an object')
    this.isSigned = false
    this.signatures = []
    Object.assign(
      this,
      this.buildTransaction(
        this.type, { ...this.params, ...props, fee: null }, { ...this.options, ...options }
      )
    )
    return this
  }

  /**
     * Get signatures
     * @alias module:@aeternity/aepp-sdk/es/tx/tx-object
     * @return Array of signatures
     */
  getSignatures (): Uint8Array[] {
    return this.signatures
  }

  /**
     * Add signature
     * @alias module:@aeternity/aepp-sdk/es/tx/tx-object
     * @param  signature Signature to add ( Can be: Buffer | Uint8Array | HexString )
     * @return {void}
     */
  addSignature (signature: Uint8Array | string): void {
    if (typeof signature === 'string' && isHex(signature)) signature = Buffer.from(signature, 'hex') as Uint8Array
    else if (!Buffer.isBuffer(signature) && !(signature instanceof Uint8Array)) throw new InvalidSignatureError('Invalid signature, signature must be of type Buffer or Uint8Array')
    Object.assign(
      this,
      this.buildTransaction(
        TX_TYPE.signed,
        {
          // @ts-expect-error
          encodedTx: this.rlpEncoded,
          signatures: [...this.signatures, signature]
        }
      )
    )

    const { signatures, encodedTx: { txType } } = this.params
    if (signatures != null) { this.signatures = signatures }
    if (txType != null) { this.type = txType }
    this.isSigned = true
  }

  /**
     * Calculate fee
     * @alias module:@aeternity/aepp-sdk/es/tx/tx-object
     * @param  props
     * @return {String} fee
     */
  calculateMinFee (props = {}): number | string {
    const params = { ...this.params, ...props }
    // @ts-expect-error
    return calculateFee(0, this.type, { gasLimit: params.gasLimit, params, vsn: params.vsn })
  }

  /**
     * Create txObject from base64c RLP encoded transaction string with 'tx_' prefix
     * @alias module:@aeternity/aepp-sdk/es/tx/tx-object
     * @param  tx Transaction string (tx_23fsdgsdfg...)
     */
  static fromString <Tx extends TxParams>(tx: EncodedData<'tx'>): TxObject<Tx> {
    return new TxObject<Tx>({ tx })
  }

  /**
    * Create txObject from transaction RLP binary
    * @alias module:@aeternity/aepp-sdk/es/tx/tx-object
    * @param tx Transaction RLP binary
    */
  static fromRlp <Tx extends TxParams>(tx: Buffer): TxObject<Tx> {
    return new TxObject<Tx>({ tx })
  }
}

export default TxObject
