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

import { describe, it, before } from 'mocha'
import { expect } from 'chai'
import BigNumber from 'bignumber.js'
import { getSdk, BaseAe } from '.'
// @ts-expect-error TODO remove
import { generateKeyPair, MemoryAccount } from '../../src'

// TODO remove and import interfaces once contract aci is merged
interface FunctionACI {
  arguments: any[]
  name: string
  payable: boolean
  returns: string
  stateful: boolean
}
interface Aci {
  encodedAci: {contract: {
    name: string
    event: any
    kind: string
    state: any
    type_defs: any[]
    functions: FunctionACI[]
  }}
  externalEncodedAci: any[]
  interface: string
}
interface Event {
  address: string
  data: string
  topics: Array<string | number>
}
interface ContractInstance {
  _aci: Aci
  _name: string
  calldata: any
  source?: string
  bytecode?: string
  deployInfo: {
    address?: string
    result?: {
      callerId: string
      callerNonce: number
      contractId: string
      gasPrice: number
      gasUsed: number
      height: number
      log: any[]
      returnType: string
      returnValue: string
    }
    owner?: string
    transaction?: string
    rawTx?: string
    txData?: TxData
  }
  options: any
  compilerVersion: string
  compile: (options?: {}) => Promise<string>
  _estimateGas: (name: string, params: any[], options: any) => Promise<number>
  deploy: (params: any[], options: object) => Promise<any>
  call: (fn: string, params?: any[], options?: {}) => Promise<any>
  decodeEvents: (events: Event[], { omitUnknown, contractAddressToName, ...opt }: {
    omitUnknown?: boolean
    contractAddressToName?: {[key: string]: string }}) => Array<DecodedEvent | null>
  methods: any
}
interface TxData {
  blockHash: string
  blockHeight: number
  hash: string
  signatures: any[]
  tx: object[]
  rawTx: string
  callerId: string
  callerNonce: number
  contractId: string
  gasPrice: number
  gasUsed: number
  height: number
  log: any[]
  returnType: string
  returnValue: string
}
interface DecodedEvent {
  name: string
  args: unknown
  contract: {
    name: string
    address: string
  }
}

describe('Paying for transaction of another account', function () {
  let aeSdk: any

  before(async function () {
    aeSdk = await getSdk()
  })

  it('pays for spend transaction', async () => {
    const sender = MemoryAccount({ keypair: generateKeyPair() })
    const receiver = MemoryAccount({ keypair: generateKeyPair() })
    await aeSdk.spend(1e4, await sender.address())
    const spendTx = await aeSdk.spendTx({
      senderId: await sender.address(),
      recipientId: await receiver.address(),
      amount: 1e4
    })
    const signedSpendTx = await aeSdk.signTransaction(spendTx, { onAccount: sender, innerTx: true })
    const payerBalanceBefore = await aeSdk.getBalance(await aeSdk.address())
    const {
      fee: outerFee, tx: { tx: { fee: innerFee } }
    } = (await aeSdk.payForTransaction(signedSpendTx)).tx
    expect(await aeSdk.getBalance(await aeSdk.address())).to.equal(
      new BigNumber(payerBalanceBefore).minus(outerFee).minus(innerFee).toFixed()
    )
    expect(await aeSdk.getBalance(await sender.address())).to.equal('0')
    expect(await aeSdk.getBalance(await receiver.address())).to.equal('10000')
  })

  const contractSource = `
    contract Test =
      record state = { value: int }
      entrypoint init(x: int): state = { value = x }
      entrypoint getValue(): int = state.value
      stateful entrypoint setValue(x: int) = put(state{ value = x })`
  let contractAddress: string
  let aeSdkNotPayingFee: any
  let payingContract: ContractInstance

  it('pays for contract deployment', async () => {
    aeSdkNotPayingFee = await BaseAe({
      withoutGenesisAccount: true,
      accounts: [MemoryAccount({ keypair: generateKeyPair() })]
    }, {
      deepProps: { Ae: { defaults: { waitMined: false, innerTx: true } } }
    })
    const contract: ContractInstance = await aeSdkNotPayingFee
      .getContractInstance({ source: contractSource })
    const { rawTx: contractDeployTx, address } = await contract.deploy([42], {})
    contractAddress = address
    await aeSdk.payForTransaction(contractDeployTx)
    payingContract = await aeSdkNotPayingFee.getContractInstance(
      { source: contractSource, contractAddress }
    )
    expect((await payingContract.methods.getValue()).decodedResult).to.be.equal(BigInt(42))
  })

  it('pays for contract call', async () => {
    const contract = await aeSdkNotPayingFee.getContractInstance(
      { source: contractSource, contractAddress }
    )
    const { rawTx: contractCallTx } = await contract.methods.setValue(43)
    await aeSdk.payForTransaction(contractCallTx)
    expect((await payingContract.methods.getValue()).decodedResult).to.be.equal(BigInt(43))
  })
})
