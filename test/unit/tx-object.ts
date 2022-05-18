import { EncodedData } from '../../src/utils/encoder'
import { TxSigned, TxSpend, TX_TYPE } from '../../src/tx/builder/schema'
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
import { describe, it } from 'mocha'
import { expect } from 'chai'
import TxObject from '../../src/tx/tx-object'
import { generateKeyPair } from '../../src/utils/crypto'
import MemoryAccount from '../../src/account/memory'
import {
  TypeError
} from '../../src/utils/errors'

describe('TxObject', () => {
  const keyPair = generateKeyPair()
  let txObject: TxObject<any>
  let signedTx: EncodedData<'tx'>

  describe('Init TxObject', () => {
    it('Build transaction', async () => {
      txObject = new TxObject<TxSpend>({
        type: TX_TYPE.spend,
        params: {
          senderId: keyPair.publicKey,
          recipientId: keyPair.publicKey,
          amount: 100,
          ttl: 0,
          nonce: 1,
          fee: 100,
          payload: ''
        }
      })
      signedTx = await MemoryAccount({ keypair: keyPair, networkId: 'ae_mainnet' }).signTransaction(txObject.encodedTx)
      txObject.encodedTx.should.be.a('string')
      expect(txObject.rlpEncoded).to.be.an.instanceOf(Uint8Array)
      txObject.binary.should.be.a('Array')
      txObject.params.should.be.a('object')
    })

    it('Unpack transaction from string/rlp', () => {
      expect(TxObject.fromString(txObject.encodedTx)).to.eql(txObject)
      expect(TxObject.fromRlp(txObject.rlpEncoded)).to.eql(txObject)
    })

    it('Unpack signed transaction', () => {
      const tx = TxObject.fromString(signedTx)
      tx.getSignatures().length.should.not.be.equal(0)
      tx.isSigned.should.be.equal(true)
    })

    it('Get signature on unsigned tx', () => expect(txObject.getSignatures()).to.eql([]))

    it('Invalid props', () => {
      expect(() => txObject.setProp(true)).to.throw(TypeError, 'Props should be an object')
    })

    it('Change props of signed transaction', () => {
      const signedTxObject = TxObject.fromString<TxSigned>(signedTx)
      const fee = signedTxObject.params.fee
      signedTxObject.setProp({ amount: 10000 })
      signedTxObject?.params?.fee?.should.not.be.equal(fee)
      signedTxObject.params.amount.should.be.equal('10000')
    })

    it('Add signatures', async () => {
      const oldTx = txObject.encodedTx
      const txWithNetworkId = Buffer.concat([Buffer.from('ae_mainnet'), txObject.rlpEncoded])
      const sig = await MemoryAccount({ keypair: keyPair }).sign(txWithNetworkId)
      txObject.addSignature(sig)
      txObject.getSignatures().length.should.be.equal(1)
      txObject.isSigned.should.be.equal(true)
      oldTx.should.not.be.equal(txObject.encodedTx)
    })
  })
})
