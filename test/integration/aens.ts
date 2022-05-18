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

import { describe, it, before } from 'mocha'
import { expect } from 'chai'
// @ts-expect-error TODO remove
import { getSdk } from '.'
import { randomName } from '../utils'
import { generateKeyPair } from '../../src/utils/crypto'
import { buildContractId, computeAuctionEndBlock, computeBidFee } from '../../src/tx/builder/helpers'
import { AensPointerContextError } from '../../src/utils/errors'
import { pause } from '../../src/utils/other'
import { Aepp } from '../../src/ae/aepp'
import { EncodedData } from '../../src/utils/encoder'

describe('Aens', function () {
  let aeSdk: Aepp
  const account = generateKeyPair()
  const name = randomName(13) // 13 name length doesn't trigger auction

  before(async function () {
    aeSdk = await getSdk()
    await aeSdk.spend('1000000000000000', account.publicKey)
  })

  it('claims names', async () => {
    const preclaim = await aeSdk.aensPreclaim(name)
    preclaim.should.be.an('object')
    const claimed = await preclaim.claim()
    claimed.should.be.an('object')
    expect(claimed.id).to.be.a('string')
    expect(claimed.ttl).to.be.a('number')
  })

  it('queries names', async () => {
    // For some reason the node will return 404 when name is queried
    // just right after claim tx has been mined so we wait 0.5s
    await pause(500)
    return await aeSdk.aensQuery(name).should.eventually.be.an('object')
  })

  it('throws error on querying non-existent name', () => aeSdk
    .aensQuery(randomName(13)).should.eventually.be.rejected)

  it('Spend using name with invalid pointers', async () => {
    const current = await aeSdk.address()
    const onAccount = aeSdk.addresses().find((acc: string) => acc !== current)
    const { pointers } = await aeSdk.getName(name)
    pointers.length.should.be.equal(0)
    await expect(aeSdk.spend(100, name, { onAccount }))
      .to.be.rejectedWith(AensPointerContextError, `Name ${name} don't have pointers for account_pubkey`)
  })

  it('Call contract using AENS name', async () => {
    const source =
      'contract Identity =' +
      '  entrypoint getArg(x : int) = x'
    const contract = await aeSdk.getContractInstance({ source })
    await contract.deploy([])
    const nameObject = await aeSdk.aensQuery(name)
    await nameObject.update({ contract_pubkey: (contract.deployInfo.address) })

    const contractByName = await aeSdk.getContractInstance({ source, contractAddress: name })
    // @ts-expect-error
    expect((await contractByName.methods.getArg(42)).decodedResult).to.be.equal(42n)
  })

  const address = generateKeyPair().publicKey
  const pointers = {
    myKey: address,
    account_pubkey: address,
    oracle_pubkey: address.toString().replace('ak', 'ok'),
    channel: address.toString().replace('ak', 'ch'),
    contract_pubkey: buildContractId(address.toString(), 13)
  }
  const pointersNode = Object.entries(pointers).map(([key, id]) => ({ key, id }))

  it('updates', async () => {
    const nameObject = await aeSdk.aensQuery(name)
    expect(await nameObject.update(pointers)).to.deep.include({ pointers: pointersNode })
  })

  it('throws error on updating names not owned by the account', async () => {
    const preclaim = await aeSdk.aensPreclaim(randomName(13))
    await preclaim.claim()
    const current = await aeSdk.address()
    const onAccount = aeSdk.addresses().find((acc: string) => acc !== current)
    await aeSdk
      .aensUpdate(name, onAccount, { onAccount, blocks: 1 }).should.eventually.be.rejected
  })

  it('updates extending pointers', async () => {
    const nameObject = await aeSdk.aensQuery(name)
    const anotherContract = buildContractId(address.toString(), 12)
    expect(await nameObject.update({ contract_pubkey: anotherContract }, { extendPointers: true }))
      .to.deep.include({
        pointers: [
          ...pointersNode.filter(pointer => pointer.key !== 'contract_pubkey'),
          { key: 'contract_pubkey', id: anotherContract }
        ]
      })
  })

  it('throws error on setting 33 pointers', async () => {
    const nameObject = await aeSdk.aensQuery(name)
    const pointers = Object.fromEntries(
      new Array(33).fill(undefined).map((v, i) => [`pointer-${i}`, address])
    )
    void expect(nameObject.update(pointers))
      .to.be.rejectedWith('Expected 32 pointers or less, got 33 instead')
  })

  it('Extend name ttl', async () => {
    const nameObject = await aeSdk.aensQuery(name)
    const extendResult = await nameObject.extendTtl(10000)
    return extendResult.should.be.deep.include({
      ttl: extendResult.blockHeight + 10000
    })
  })

  it('Spend by name', async () => {
    const current = await aeSdk.address()
    const onAccount = aeSdk.addresses().find((acc: string) => acc !== current)
    await aeSdk.spend(100, name, { onAccount })
  })

  it('transfers names', async () => {
    const claim = await aeSdk.aensQuery(name)
    const current = await aeSdk.address()
    const onAccount: EncodedData<'ak'> = aeSdk.addresses().find((acc: string) => acc !== current)
    await claim.transfer(onAccount)

    const claim2 = await aeSdk.aensQuery(name)
    expect(await claim2.update({ account_pubkey: onAccount }, { onAccount })).to.deep.include({
      pointers: [{ key: 'account_pubkey', id: onAccount }]
    })
  })

  it('revoke names', async () => {
    const current = await aeSdk.address()
    const onAccount = aeSdk.addresses().find((acc: string) => acc !== current)
    const aensName = await aeSdk.aensQuery(name)

    // @ts-expect-error TODO remove
    const revoke = await aensName.revoke({ onAccount })
    revoke.should.be.an('object')
    await aeSdk.aensQuery(name).should.be.rejectedWith(Error)
  })

  it('PreClaim name using specific account', async () => {
    const current = await aeSdk.address()
    const onAccount = aeSdk.addresses().find((acc: string) => acc !== current)

    const preclaim = await aeSdk.aensPreclaim(name, { onAccount })
    preclaim.should.be.an('object')
    expect(preclaim.tx.accountId).to.be.equal(onAccount)
  })

  describe('name auctions', function () {
    it('claims names', async () => {
      const current = await aeSdk.address()
      const onAccount = aeSdk.addresses().find((acc: string) => acc !== current)
      const name = randomName(12)

      const preclaim = await aeSdk.aensPreclaim(name)
      preclaim.should.be.an('object')

      const claim = await preclaim.claim()
      claim.should.be.an('object')

      const bidFee = computeBidFee(name, null, undefined)
      const bid = await aeSdk.aensBid(name, bidFee, { onAccount })
      bid.should.be.an('object')

      const isAuctionFinished = await aeSdk.getName(name).catch(() => false)
      isAuctionFinished.should.be.equal(false)

      const auctionEndBlock = computeAuctionEndBlock(name, bid.blockHeight)
      console.log(`BID STARTED AT ${bid.blockHeight} WILL END AT ${auctionEndBlock}`)
    })
  })
})
