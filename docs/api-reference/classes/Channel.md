[api-reference](../README.md) / Channel

# Class: Channel

Channel

**`alias`** module:@aeternity/aepp-sdk/es/channel/index

**`rtype`** Channel

**`param`** Channel params

**`param`** Channel url (for example: "ws://localhost:3001")

**`param`** Participant role ("initiator" or "responder")

**`param`** Initiator's public key

**`param`** Responder's public key

**`param`** Initial deposit in favour of the responder by the initiator

**`param`** Amount of coins the initiator has committed to
the channel

**`param`** Amount of coins the responder has committed to
the channel

**`param`** The minimum amount both peers need to maintain

**`param`** Minimum block height to include the channel_create_tx

**`param`** Host of the responder's node

**`param`** The port of the responders node

**`param`** Amount of blocks for disputing a solo close

**`param`** Existing channel id (required if reestablishing a
channel)

**`param`** Offchain transaction (required if reestablishing
a channel)

**`param`** The time waiting for a new event to be initiated
(default: 600000)

**`param`** The time waiting for the initiator to produce
the create channel transaction after the noise session had been established (default: 120000)

**`param`** The time frame the other client has to sign an
off-chain update after our client had initiated and signed it. This applies only for double
signed on-chain intended updates: channel create transaction, deposit, withdrawal and etc.
(default: 120000)

**`param`** The time frame the other client has to confirm an
on-chain transaction reaching maturity (passing minimum depth) after the local node has detected
this. This applies only for double signed on-chain intended updates: channel create transaction,
deposit, withdrawal and etc. (default: 360000)

**`param`** The time frame the client has to return a signed
off-chain update or to decline it. This applies for all off-chain updates (default: 500000)

**`param`** The time frame the other client has to react to an
event. This applies for all off-chain updates that are not meant to land on-chain, as well as
some special cases: opening a noise connection, mutual closing acknowledgement and
reestablishing an existing channel (default: 120000)

**`param`** the time frame the responder has to accept an
incoming noise session. Applicable only for initiator (default: timeout_accept's value)

**`param`** The time frame the initiator has to start an
outgoing noise session to the responder's node. Applicable only for responder (default:
timeout_idle's value)

**`param`** Log websocket communication

**`param`** Function which verifies and signs transactions

**`returns`** Channel instance

**`example`** await Channel.initialize({
  url: 'ws://localhost:3001',
  role: 'initiator'
  initiatorId: 'ak_Y1NRjHuoc3CGMYMvCmdHSBpJsMDR6Ra2t5zjhRcbtMeXXLpLH',
  responderId: 'ak_V6an1xhec1xVaAhLuak7QoEbi6t7w5hEtYWp9bMKaJ19i6A9E',
  initiatorAmount: 1e18,
  responderAmount: 1e18,
  pushAmount: 0,
  channelReserve: 0,
  ttl: 1000,
  host: 'localhost',
  port: 3002,
  lockPeriod: 10,
  async sign (tag, tx) => await account.signTransaction(tx)
})

## Table of contents

### Constructors

- [constructor](Channel.md#constructor)

### Methods

- [balances](Channel.md#balances)
- [callContract](Channel.md#callcontract)
- [callContractStatic](Channel.md#callcontractstatic)
- [cleanContractCalls](Channel.md#cleancontractcalls)
- [createContract](Channel.md#createcontract)
- [deposit](Channel.md#deposit)
- [disconnect](Channel.md#disconnect)
- [forceProgress](Channel.md#forceprogress)
- [fsmId](Channel.md#fsmid)
- [getContractCall](Channel.md#getcontractcall)
- [getContractState](Channel.md#getcontractstate)
- [id](Channel.md#id)
- [leave](Channel.md#leave)
- [off](Channel.md#off)
- [on](Channel.md#on)
- [poi](Channel.md#poi)
- [round](Channel.md#round)
- [sendMessage](Channel.md#sendmessage)
- [shutdown](Channel.md#shutdown)
- [state](Channel.md#state)
- [status](Channel.md#status)
- [update](Channel.md#update)
- [withdraw](Channel.md#withdraw)
- [initialize](Channel.md#initialize)
- [reconnect](Channel.md#reconnect)

## Constructors

### constructor

• **new Channel**()

## Methods

### balances

▸ **balances**(`accounts`): `Promise`<{ `[key: EncodedData<"ak">]`: `string`;  }\>

Get balances

The accounts paramcontains a list of addresses to fetch balances of.
Those can be either account balances or a contract ones, encoded as an account addresses.

If a certain account address had not being found in the state tree - it is simply
skipped in the response.

**`example`** channel.balances([
  'ak_Y1NRjHuoc3CGMYMvCmdHSBpJsMDR6Ra2t5zjhRcbtMeXXLpLH',
  'ak_V6an1xhec1xVaAhLuak7QoEbi6t7w5hEtYWp9bMKaJ19i6A9E'
  'ct_2dCUAWYZdrWfACz3a2faJeKVTVrfDYxCQHCqAt5zM15f3u2UfA'
]).then(balances =>
  console.log(balances['ak_Y1NRjHuoc3CGMYMvCmdHSBpJsMDR6Ra2t5zjhRcbtMeXXLpLH'])
)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accounts` | \`ak\_${string}\`[] | List of addresses to fetch balances from |

#### Returns

`Promise`<{ `[key: EncodedData<"ak">]`: `string`;  }\>

#### Defined in

[src/channel/index.ts:367](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L367)

___

### callContract

▸ **callContract**(`options`, `sign`): `Promise`<{ `accepted`: `boolean` ; `signedTx`: `string`  }\>

Trigger call a contract update

The call contract update is calling a preexisting contract inside the channel's
internal state tree. The update is a change to be applied on top of the latest state.

That would call a contract with the poster being the caller of it. Poster commits
an amount of coins to the contract.

The call would also create a call object inside the channel state tree. It contains
the result of the contract call.

It is worth mentioning that the gas is not consumed, because this is an off-chain
contract call. It would be consumed if it were an on-chain one. This could happen
if a call with a similar computation amount is to be forced on-chain.

**`example`** channel.callContract({
  contract: 'ct_9sRA9AVE4BYTAkh5RNfJYmwQe1NZ4MErasQLXZkFWG43TPBqa',
  callData: 'cb_1111111111111111...',
  amount: 0,
  abiVersion: 1
}).then(({ accepted, signedTx }) => {
  if (accepted) {
    console.log('Contract called succesfully')
  } else {
    console.log('Contract call has been rejected')
  }
})

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `CallContractOptions` |  |
| `sign` | `SignTx` | Function which verifies and signs contract call transaction |

#### Returns

`Promise`<{ `accepted`: `boolean` ; `signedTx`: `string`  }\>

#### Defined in

[src/channel/index.ts:695](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L695)

___

### callContractStatic

▸ **callContractStatic**(`options`): `Promise`<`CallContractOptions`\>

Call contract using dry-run

In order to get the result of a potential contract call, one might need to
dry-run a contract call. It takes the exact same arguments as a call would
and returns the call object.

The call is executed in the channel's state but it does not impact the state
whatsoever. It uses as an environment the latest channel's state and the current
top of the blockchain as seen by the node.

**`example`** channel.callContractStatic({
  contract: 'ct_9sRA9AVE4BYTAkh5RNfJYmwQe1NZ4MErasQLXZkFWG43TPBqa',
  callData: 'cb_1111111111111111...',
  amount: 0,
  abiVersion: 1
}).then(({ returnValue, gasUsed }) => {
  console.log('Returned value:', returnValue)
  console.log('Gas used:', gasUsed)
})

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` |  |
| `options.abiVersion` | `number` | Version of the ABI |
| `options.amount` | `number` | Amount the caller of the contract commits to it |
| `options.callData` | `string` | ABI encoded compiled AEVM call data for the code |
| `options.contract` | `string` | Address of the contract to call |

#### Returns

`Promise`<`CallContractOptions`\>

#### Defined in

[src/channel/index.ts:813](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L813)

___

### cleanContractCalls

▸ **cleanContractCalls**(): `Promise`<`void`\>

Clean up all locally stored contract calls

Contract calls are kept locally in order for the participant to be able to look them up.
They consume memory and in order for the participant to free it - one can prune all messages.
This cleans up all locally stored contract calls and those will no longer be available for
fetching and inspection.

#### Returns

`Promise`<`void`\>

#### Defined in

[src/channel/index.ts:891](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L891)

___

### createContract

▸ **createContract**(`options`, `sign`): `Promise`<{ `accepted`: `boolean` ; `address`: `string` ; `signedTx`: `string`  }\>

Trigger create contract update

The create contract update is creating a contract inside the channel's internal state tree.
The update is a change to be applied on top of the latest state.

That would create a contract with the poster being the owner of it. Poster commits initially
a deposit amount of coins to the new contract.

**`example`** channel.createContract({
  code: 'cb_HKtpipK4aCgYb17wZ...',
  callData: 'cb_1111111111111111...',
  deposit: 10,
  vmVersion: 3,
  abiVersion: 1
}).then(({ accepted, signedTx, address }) => {
  if (accepted) {
    console.log('New contract has been created')
    console.log('Contract address:', address)
  } else {
    console.log('New contract has been rejected')
  }
})

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` |  |
| `options.abiVersion` | `number` | Version of the Application Binary Interface |
| `options.callData` | `string` | Api encoded compiled AEVM call data for the code |
| `options.code` | `string` | Api encoded compiled AEVM byte code |
| `options.deposit` | `number` \| `BigNumber` | Initial amount the owner of the contract commits to it |
| `options.vmVersion` | `number` | Version of the Virtual Machine |
| `sign` | `SignTx` | Function which verifies and signs create contract transaction |

#### Returns

`Promise`<{ `accepted`: `boolean` ; `address`: `string` ; `signedTx`: `string`  }\>

#### Defined in

[src/channel/index.ts:621](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L621)

___

### deposit

▸ **deposit**(`amount`, `sign`, `callbacks?`): `Promise`<{ `accepted`: `boolean` ; `state`: `ChannelState`  }\>

Deposit coins into the channel

After the channel had been opened any of the participants can initiate a deposit.
The process closely resembles the update. The most notable difference is that the
transaction has been co-signed: it is channel_deposit_tx and after the procedure
is finished - it is being posted on-chain.

Any of the participants can initiate a deposit. The only requirements are:

  - Channel is already opened
  - No off-chain update/deposit/withdrawal is currently being performed
  - Channel is not being closed or in a solo closing state
  - The deposit amount must be equal to or greater than zero, and cannot exceed
    the available balance on the channel (minus the channel_reserve)

After the other party had signed the deposit transaction, the transaction is posted
on-chain and onOnChainTx callback is called with on-chain transaction as first argument.
After computing transaction hash it can be tracked on the chain: entering the mempool,
block inclusion and a number of confirmations.

After the minimum_depth block confirmations onOwnDepositLocked callback is called
(without any arguments).

When the other party had confirmed that the block height needed is reached
onDepositLocked callback is called (without any arguments).

**`example`** channel.deposit(
  100,
  async (tx) => await account.signTransaction(tx),
  { onOnChainTx: (tx) => console.log('on_chain_tx', tx) }
).then(({ accepted, state }) => {
  if (accepted) {
    console.log('Deposit has been accepted')
    console.log('The new state is:', state)
  } else {
    console.log('Deposit has been rejected')
  }
})

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `number` \| `BigNumber` | Amount of coins to deposit |
| `sign` | `SignTx` | Function which verifies and signs deposit transaction |
| `callbacks` | `Object` |  |
| `callbacks.onDepositLocked?` | `Function` |  |
| `callbacks.onOnChainTx?` | `Function` | Called when deposit transaction has been posted on chain |
| `callbacks.onOwnDepositLocked?` | `Function` |  |

#### Returns

`Promise`<{ `accepted`: `boolean` ; `state`: `ChannelState`  }\>

#### Defined in

[src/channel/index.ts:562](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L562)

___

### disconnect

▸ **disconnect**(): `void`

Close the connection

#### Returns

`void`

#### Defined in

[src/channel/index.ts:200](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L200)

___

### forceProgress

▸ **forceProgress**(`options`, `sign`, `callbacks?`): `Promise`<{ `accepted`: `boolean` ; `signedTx`: `string` ; `tx`: `string` \| `Buffer`  }\>

Trigger a force progress contract call
This call is going on-chain

**`example`** channel.forceProgress({
  contract: 'ct_9sRA9AVE4BYTAkh5RNfJYmwQe1NZ4MErasQLXZkFWG43TPBqa',
  callData: 'cb_1111111111111111...',
  amount: 0,
  abiVersion: 1,
  gasPrice: 1000005554
}).then(({ accepted, signedTx }) => {
  if (accepted) {
    console.log('Contract force progress call successful')
  } else {
    console.log('Contract force progress call has been rejected')
  }
})

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` |  |
| `options.abiVersion` | `number` | Version of the ABI |
| `options.amount` | `number` | Amount the caller of the contract commits to it |
| `options.callData` | `string` | ABI encoded compiled AEVM call data for the code |
| `options.contract` | `string` | Address of the contract to call |
| `options.gasLimit?` | `number` | - |
| `options.gasPrice?` | `number` | - |
| `sign` | `SignTx` | Function which verifies and signs contract force progress transaction |
| `callbacks` | `Object` |  |
| `callbacks.onOnChainTx?` | `Function` | - |

#### Returns

`Promise`<{ `accepted`: `boolean` ; `signedTx`: `string` ; `tx`: `string` \| `Buffer`  }\>

#### Defined in

[src/channel/index.ts:749](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L749)

___

### fsmId

▸ **fsmId**(): `string`

Get channel's fsm id

#### Returns

`string`

#### Defined in

[src/channel/index.ts:260](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L260)

___

### getContractCall

▸ **getContractCall**(`options`): `Promise`<{ `gasPrice`: `number` \| `BigNumber` ; `gasUsed`: `number` \| `BigNumber` ; `height`: `number` ; `log`: `string` ; `returnType`: `string` ; `returnValue`: `string`  }\>

Get contract call result

The combination of a caller, contract and a round of execution determines the
contract call. Providing an incorrect set of those results in an error response.

**`example`** channel.getContractCall({
  caller: 'ak_Y1NRjHuoc3CGMYMvCmdHSBpJsMDR6Ra2t5zjhRcbtMeXXLpLH',
  contract: 'ct_9sRA9AVE4BYTAkh5RNfJYmwQe1NZ4MErasQLXZkFWG43TPBqa',
  round: 3
}).then(({ returnType, returnValue }) => {
  if (returnType === 'ok') console.log(returnValue)
})

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` |  |
| `options.caller` | `string` | Address of contract caller |
| `options.contract` | `string` | Address of the contract |
| `options.round` | `number` | Round when contract was called |

#### Returns

`Promise`<{ `gasPrice`: `number` \| `BigNumber` ; `gasUsed`: `number` \| `BigNumber` ; `height`: `number` ; `log`: `string` ; `returnType`: `string` ; `returnValue`: `string`  }\>

#### Defined in

[src/channel/index.ts:843](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L843)

___

### getContractState

▸ **getContractState**(`contract`): `Promise`<{ `contract`: `Contract` ; `contractState`: `object`  }\>

Get contract latest state

**`example`** channel.getContractState(
  'ct_9sRA9AVE4BYTAkh5RNfJYmwQe1NZ4MErasQLXZkFWG43TPBqa'
).then(({ contract }) => {
  console.log('deposit:', contract.deposit)
})

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `string` | Address of the contract |

#### Returns

`Promise`<{ `contract`: `Contract` ; `contractState`: `object`  }\>

#### Defined in

[src/channel/index.ts:872](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L872)

___

### id

▸ **id**(): `string`

Get channel id

#### Returns

`string`

#### Defined in

[src/channel/index.ts:250](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L250)

___

### leave

▸ **leave**(): `Promise`<{ `channelId`: `string` ; `signedTx`: `string`  }\>

Leave channel

It is possible to leave a channel and then later reestablish the channel
off-chain state and continue operation. When a leave method is called,
the channel fsm passes it on to the peer fsm, reports the current mutually
signed state and then terminates.

The channel can be reestablished by instantiating another Channel instance
with two extra params: existingChannelId and offchainTx (returned from leave
method as channelId and signedTx respectively).

**`example`** channel.leave().then(({ channelId, signedTx }) => {
  console.log(channelId)
  console.log(signedTx)
})

#### Returns

`Promise`<{ `channelId`: `string` ; `signedTx`: `string`  }\>

#### Defined in

[src/channel/index.ts:394](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L394)

___

### off

▸ **off**(`eventName`, `callback`): `void`

Remove event listener function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | Event name |
| `callback` | `EventCallback` | Callback function |

#### Returns

`void`

#### Defined in

[src/channel/index.ts:191](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L191)

___

### on

▸ **on**(`eventName`, `callback`): `void`

Register event listener function

Possible events:

  - "error"
  - "onChainTx"
  - "ownWithdrawLocked"
  - "withdrawLocked"
  - "ownDepositLocked"
  - "depositLocked"

TODO: the event list looks outdated

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | Event name |
| `callback` | `EventCallback` | Callback function |

#### Returns

`void`

#### Defined in

[src/channel/index.ts:180](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L180)

___

### poi

▸ **poi**(`addresses`): `Promise`<\`pi\_${string}\`\>

Get proof of inclusion

If a certain address of an account or a contract is not found
in the state tree - the response is an error.

**`example`** channel.poi({
  accounts: [
    'ak_Y1NRjHuoc3CGMYMvCmdHSBpJsMDR6Ra2t5zjhRcbtMeXXLpLH',
    'ak_V6an1xhec1xVaAhLuak7QoEbi6t7w5hEtYWp9bMKaJ19i6A9E'
  ],
  contracts: ['ct_2dCUAWYZdrWfACz3a2faJeKVTVrfDYxCQHCqAt5zM15f3u2UfA']
}).then(poi => console.log(poi))

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addresses` | `Object` |  |
| `addresses.accounts` | `string`[] | List of account addresses to include in poi |
| `addresses.contracts?` | `string`[] | List of contract addresses to include in poi |

#### Returns

`Promise`<\`pi\_${string}\`\>

#### Defined in

[src/channel/index.ts:343](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L343)

___

### round

▸ **round**(): ``null`` \| `number`

Get current round

If round cannot be determined (for example when channel has not been opened)
it will return `null`.

#### Returns

``null`` \| `number`

#### Defined in

[src/channel/index.ts:228](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L228)

___

### sendMessage

▸ **sendMessage**(`message`, `recipient`): `void`

Send generic message

If message is an object it will be serialized into JSON string
before sending.

If there is ongoing update that has not yet been finished the message
will be sent after that update is finalized.

**`example`** channel.sendMessage(
  'hello world',
  'ak_Y1NRjHuoc3CGMYMvCmdHSBpJsMDR6Ra2t5zjhRcbtMeXXLpLH'
)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` \| `ChannelMessage` |  |
| `recipient` | `string` | Address of the recipient |

#### Returns

`void`

#### Defined in

[src/channel/index.ts:927](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L927)

___

### shutdown

▸ **shutdown**(`sign`): `Promise`<`string`\>

Trigger mutual close

At any moment after the channel is opened, a closing procedure can be triggered.
This can be done by either of the parties. The process is similar to the off-chain updates.

**`example`** channel.shutdown(
  async (tx) => await account.signTransaction(tx)
).then(tx => console.log('on_chain_tx', tx))

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sign` | `Function` | Function which verifies and signs mutual close transaction |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/channel/index.ts:420](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L420)

___

### state

▸ **state**(): `Promise`<`ChannelState`\>

Get current state

#### Returns

`Promise`<`ChannelState`\>

#### Defined in

[src/channel/index.ts:217](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L217)

___

### status

▸ **status**(): `string`

Get current status

#### Returns

`string`

#### Defined in

[src/channel/index.ts:208](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L208)

___

### update

▸ **update**(`from`, `to`, `amount`, `sign`, `metadata?`): `Promise`<{ `accepted`: `boolean` ; `errorCode?`: `number` ; `errorMessage?`: `string` ; `signedTx?`: `string`  }\>

Trigger a transfer update

The transfer update is moving coins from one channel account to another.
The update is a change to be applied on top of the latest state.

Sender and receiver are the channel parties. Both the initiator and responder
can take those roles. Any public key outside of the channel is considered invalid.

**`example`** channel.update(
  'ak_Y1NRjHuoc3CGMYMvCmdHSBpJsMDR6Ra2t5zjhRcbtMeXXLpLH',
  'ak_V6an1xhec1xVaAhLuak7QoEbi6t7w5hEtYWp9bMKaJ19i6A9E',
  10,
  async (tx) => await account.signTransaction(tx)
).then(({ accepted, signedTx }) =>
  if (accepted) {
    console.log('Update has been accepted')
  }
)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `from` | `string` | `undefined` | Sender's public address |
| `to` | `string` | `undefined` | Receiver's public address |
| `amount` | `number` \| `BigNumber` | `undefined` | Transaction amount |
| `sign` | `SignTx` | `undefined` | Function which verifies and signs offchain transaction |
| `metadata` | `string`[] | `[]` |  |

#### Returns

`Promise`<{ `accepted`: `boolean` ; `errorCode?`: `number` ; `errorMessage?`: `string` ; `signedTx?`: `string`  }\>

#### Defined in

[src/channel/index.ts:292](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L292)

___

### withdraw

▸ **withdraw**(`amount`, `sign`, `callbacks?`): `Promise`<{ `accepted`: `boolean` ; `signedTx`: `string`  }\>

Withdraw coins from the channel

After the channel had been opened any of the participants can initiate a withdrawal.
The process closely resembles the update. The most notable difference is that the
transaction has been co-signed: it is channel_withdraw_tx and after the procedure
is finished - it is being posted on-chain.

Any of the participants can initiate a withdrawal. The only requirements are:

  - Channel is already opened
  - No off-chain update/deposit/withdrawal is currently being performed
  - Channel is not being closed or in a solo closing state
  - The withdrawal amount must be equal to or greater than zero, and cannot exceed
    the available balance on the channel (minus the channel_reserve)

After the other party had signed the withdraw transaction, the transaction is posted
on-chain and onOnChainTx callback is called with on-chain transaction as first argument.
After computing transaction hash it can be tracked on the chain: entering the mempool,
block inclusion and a number of confirmations.

After the minimum_depth block confirmations onOwnWithdrawLocked callback is called
(without any arguments).

When the other party had confirmed that the block height needed is reached
onWithdrawLocked callback is called (without any arguments).

**`example`** channel.withdraw(
  100,
  async (tx) => await account.signTransaction(tx),
  { onOnChainTx: (tx) => console.log('on_chain_tx', tx) }
).then(({ accepted, signedTx }) => {
  if (accepted) {
    console.log('Withdrawal has been accepted')
  } else {
    console.log('Withdrawal has been rejected')
  }
})

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `number` \| `BigNumber` | Amount of coins to withdraw |
| `sign` | `SignTx` | Function which verifies and signs withdraw transaction |
| `callbacks` | `Object` |  |
| `callbacks.onOnChainTx?` | `Function` | Called when withdraw transaction has been posted on chain |
| `callbacks.onOwnWithdrawLocked?` | `Function` |  |
| `callbacks.onWithdrawLocked?` | `Function` |  |

#### Returns

`Promise`<{ `accepted`: `boolean` ; `signedTx`: `string`  }\>

#### Defined in

[src/channel/index.ts:487](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L487)

___

### initialize

▸ `Static` **initialize**(`options`): `Promise`<[`Channel`](Channel.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ChannelOptions` |

#### Returns

`Promise`<[`Channel`](Channel.md)\>

#### Defined in

[src/channel/index.ts:151](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L151)

___

### reconnect

▸ `Static` **reconnect**(`options`, `txParams`): `Promise`<[`Channel`](Channel.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ChannelOptions` |
| `txParams` | `any` |

#### Returns

`Promise`<[`Channel`](Channel.md)\>

#### Defined in

[src/channel/index.ts:952](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/channel/index.ts#L952)
