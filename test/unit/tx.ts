/*
 * ISC License (ISC)
 * Copyright (c) 2021 aeternity developers
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

import '..';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { encode as rlpEncode } from 'rlp';
import BigNumber from 'bignumber.js';
import { randomName } from '../utils';
import { salt } from '../../src/utils/crypto';
import {
  decode,
  encode,
  getDefaultPointerKey,
  commitmentHash,
  getMinimumNameFee,
  isNameValid,
  produceNameId,
} from '../../src/tx/builder/helpers';
import { toBytes } from '../../src/utils/bytes';
import { buildTx, unpackTx } from '../../src/tx/builder';
import { NAME_BID_RANGES, TX_TYPE } from '../../src/tx/builder/schema';
import { SchemaNotFoundError } from '../../src/utils/errors';

describe('Tx', () => {
  it('reproducible commitment hashes can be generated', async () => {
    const saltValue = salt();
    const hash = await commitmentHash('foobar.chain', saltValue);
    hash.should.be.a('string');
    return hash.should.be.equal(await commitmentHash('foobar.chain', saltValue));
  });

  it('test from big number to bytes', async () => {
    // TODO investigate about float numbers serialization
    const data = [
      new BigNumber('7841237845261982793129837487239459234675231423423453451234'),
      new BigNumber('7841237845261982793129837487239459214234234534523'),
      new BigNumber('7841237845261982793129837412341231231'),
      new BigNumber('78412378452619'),
      new BigNumber('7841237845261982793129837487239459214124563456'),
      new BigNumber('7841237845261982793129837487239459214123'),
    ];

    function bnFromBytes(bn: BigNumber): string {
      const bytes = toBytes(bn, true);
      return new BigNumber(bytes.toString('hex'), 16).toString(10);
    }

    data.forEach((n) => {
      n.toString(10).should.be.equal(bnFromBytes(n));
    });
  });

  it('Produce name id for `.chain`', () => {
    produceNameId('asdas.chain').should.be.equal('nm_2DMazuJNrGkQYve9eMttgdteaigeeuBk3fmRYSThJZ2NpX3r8R');
  });

  describe('getMinimumNameFee', () => {
    it('returns correct name fees', () => {
      for (let i = 1; i <= Object.keys(NAME_BID_RANGES).length; i += 1) {
        getMinimumNameFee(randomName(i)).toString()
          .should.be.equal(NAME_BID_RANGES[i].toString());
      }
    });
  });

  describe('isNameValid', () => {
    it('validates domain', () => isNameValid('asdasdasd.unknown').should.be.equal(false));
    it('don\'t throws exception', () => isNameValid('asdasdasd.chain').should.be.equal(true));
  });

  const payload = Buffer.from([1, 2, 42]);
  describe('decode', () => {
    it('decodes base64check', () => expect(decode('ba_AQIq9Y55kw==')).to.be.eql(payload));

    it('decodes base58check', () => expect(decode('bf_3DZUwMat2')).to.be.eql(payload));

    it('throws if invalid checksum', () => expect(() => decode('ak_23aaaaa'))
      .to.throw('Invalid checksum'));

    it('throws if invalid size', () => expect(() => decode('ak_An6Ui6sE1F'))
      .to.throw('Payload should be 32 bytes, got 4 instead'));
  });

  describe('encode', () => {
    it('encodes base64check', () => expect(encode(payload, 'ba')).to.be.equal('ba_AQIq9Y55kw=='));

    it('encodes base58check', () => expect(encode(payload, 'bf')).to.be.equal('bf_3DZUwMat2'));
  });

  describe('getDefaultPointerKey', () => {
    it('returns default pointer key for contract', () => expect(getDefaultPointerKey('ct_2dATVcZ9KJU5a8hdsVtTv21pYiGWiPbmVcU1Pz72FFqpk9pSRR'))
      .to.be.equal('contract_pubkey'));
  });

  it('Deserialize tx: invalid tx VSN', () => {
    const tx = encode(rlpEncode([10, 99]), 'tx');
    expect(() => unpackTx(tx))
      .to.throw(SchemaNotFoundError, `Transaction deserialization not implemented for tag ${10} version ${99}`);
  });

  it('Serialize tx: invalid tx VSN', () => {
    expect(() => buildTx({} as any, TX_TYPE.spend, { vsn: 5 }))
      .to.throw(SchemaNotFoundError, 'Transaction serialization not implemented for spend version 5');
  });
});
