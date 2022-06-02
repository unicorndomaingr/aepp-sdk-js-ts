api-reference

# api-reference

## Table of contents

### References

- [Aens](README.md#aens)
- [ContractCompilerHttp](README.md#contractcompilerhttp)
- [Node](README.md#node)
- [Oracle](README.md#oracle)
- [RpcAepp](README.md#rpcaepp)
- [RpcWallet](README.md#rpcwallet)
- [Transaction](README.md#transaction)
- [Tx](README.md#tx)
- [Universal](README.md#universal)
- [verifyTransaction](README.md#verifytransaction)

### Enumerations

- [MESSAGE\_DIRECTION](enums/MESSAGE_DIRECTION.md)
- [METHODS](enums/METHODS.md)
- [RPC\_STATUS](enums/RPC_STATUS.md)
- [SUBSCRIPTION\_TYPES](enums/SUBSCRIPTION_TYPES.md)
- [WALLET\_TYPE](enums/WALLET_TYPE.md)

### Classes

- [AccountError](classes/AccountError.md)
- [AensError](classes/AensError.md)
- [AensPointerContextError](classes/AensPointerContextError.md)
- [AeppError](classes/AeppError.md)
- [AlreadyConnectedError](classes/AlreadyConnectedError.md)
- [AmbiguousEventDefinitionError](classes/AmbiguousEventDefinitionError.md)
- [ArgumentCountMismatchError](classes/ArgumentCountMismatchError.md)
- [ArgumentError](classes/ArgumentError.md)
- [BaseError](classes/BaseError.md)
- [BrowserRuntimeConnection](classes/BrowserRuntimeConnection.md)
- [BrowserWindowMessageConnection](classes/BrowserWindowMessageConnection.md)
- [BytecodeMismatchError](classes/BytecodeMismatchError.md)
- [Channel](classes/Channel.md)
- [ChannelCallError](classes/ChannelCallError.md)
- [ChannelConnectionError](classes/ChannelConnectionError.md)
- [ChannelError](classes/ChannelError.md)
- [ChannelPingTimedOutError](classes/ChannelPingTimedOutError.md)
- [CompilerError](classes/CompilerError.md)
- [ContractError](classes/ContractError.md)
- [CryptographyError](classes/CryptographyError.md)
- [DecodeError](classes/DecodeError.md)
- [DerivationError](classes/DerivationError.md)
- [DisconnectedError](classes/DisconnectedError.md)
- [DryRunError](classes/DryRunError.md)
- [DuplicateContractError](classes/DuplicateContractError.md)
- [DuplicateNodeError](classes/DuplicateNodeError.md)
- [IllegalArgumentError](classes/IllegalArgumentError.md)
- [IllegalBidFeeError](classes/IllegalBidFeeError.md)
- [InactiveContractError](classes/InactiveContractError.md)
- [InsufficientBalanceError](classes/InsufficientBalanceError.md)
- [InsufficientNameFeeError](classes/InsufficientNameFeeError.md)
- [InternalError](classes/InternalError.md)
- [InvalidAensNameError](classes/InvalidAensNameError.md)
- [InvalidAuthDataError](classes/InvalidAuthDataError.md)
- [InvalidChecksumError](classes/InvalidChecksumError.md)
- [InvalidKeypairError](classes/InvalidKeypairError.md)
- [InvalidMethodInvocationError](classes/InvalidMethodInvocationError.md)
- [InvalidPasswordError](classes/InvalidPasswordError.md)
- [InvalidRpcMessageError](classes/InvalidRpcMessageError.md)
- [InvalidSignatureError](classes/InvalidSignatureError.md)
- [InvalidTxError](classes/InvalidTxError.md)
- [InvalidTxParamsError](classes/InvalidTxParamsError.md)
- [MerkleTreeHashMismatchError](classes/MerkleTreeHashMismatchError.md)
- [MissingCallbackError](classes/MissingCallbackError.md)
- [MissingContractAddressError](classes/MissingContractAddressError.md)
- [MissingContractDefError](classes/MissingContractDefError.md)
- [MissingEventDefinitionError](classes/MissingEventDefinitionError.md)
- [MissingFunctionNameError](classes/MissingFunctionNameError.md)
- [MissingNodeInTreeError](classes/MissingNodeInTreeError.md)
- [MissingParamError](classes/MissingParamError.md)
- [NoDefaultAensPointerError](classes/NoDefaultAensPointerError.md)
- [NoSerializerFoundError](classes/NoSerializerFoundError.md)
- [NoSuchContractFunctionError](classes/NoSuchContractFunctionError.md)
- [NoWalletConnectedError](classes/NoWalletConnectedError.md)
- [NodeError](classes/NodeError.md)
- [NodeInvocationError](classes/NodeInvocationError.md)
- [NodeNotFoundError](classes/NodeNotFoundError.md)
- [NotImplementedError](classes/NotImplementedError.md)
- [NotPayableFunctionError](classes/NotPayableFunctionError.md)
- [PayloadLengthError](classes/PayloadLengthError.md)
- [PrefixNotFoundError](classes/PrefixNotFoundError.md)
- [RequestTimedOutError](classes/RequestTimedOutError.md)
- [RpcBroadcastError](classes/RpcBroadcastError.md)
- [RpcConnectionDenyError](classes/RpcConnectionDenyError.md)
- [RpcConnectionError](classes/RpcConnectionError.md)
- [RpcError](classes/RpcError.md)
- [RpcInternalError](classes/RpcInternalError.md)
- [RpcInvalidTransactionError](classes/RpcInvalidTransactionError.md)
- [RpcMethodNotFoundError](classes/RpcMethodNotFoundError.md)
- [RpcNotAuthorizeError](classes/RpcNotAuthorizeError.md)
- [RpcPermissionDenyError](classes/RpcPermissionDenyError.md)
- [RpcRejectedByUserError](classes/RpcRejectedByUserError.md)
- [RpcUnsupportedProtocolError](classes/RpcUnsupportedProtocolError.md)
- [SchemaNotFoundError](classes/SchemaNotFoundError.md)
- [TagNotFoundError](classes/TagNotFoundError.md)
- [TransactionError](classes/TransactionError.md)
- [TxNotInChainError](classes/TxNotInChainError.md)
- [TxTimedOutError](classes/TxTimedOutError.md)
- [TypeError](classes/TypeError.md)
- [UnAuthorizedAccountError](classes/UnAuthorizedAccountError.md)
- [UnavailableAccountError](classes/UnavailableAccountError.md)
- [UnexpectedChannelMessageError](classes/UnexpectedChannelMessageError.md)
- [UnknownChannelStateError](classes/UnknownChannelStateError.md)
- [UnknownNodeLengthError](classes/UnknownNodeLengthError.md)
- [UnknownPathNibbleError](classes/UnknownPathNibbleError.md)
- [UnknownRpcClientError](classes/UnknownRpcClientError.md)
- [UnknownTxError](classes/UnknownTxError.md)
- [UnsubscribedAccountError](classes/UnsubscribedAccountError.md)
- [UnsupportedABIversionError](classes/UnsupportedABIversionError.md)
- [UnsupportedPlatformError](classes/UnsupportedPlatformError.md)
- [UnsupportedProtocolError](classes/UnsupportedProtocolError.md)
- [UnsupportedVMversionError](classes/UnsupportedVMversionError.md)
- [UnsupportedVersionError](classes/UnsupportedVersionError.md)
- [WalletError](classes/WalletError.md)

### Interfaces

- [Keystore](interfaces/Keystore.md)

### Type Aliases

- [AeAmountFormats](README.md#aeamountformats)

### Properties

- [Ae](README.md#ae)

### Variables

- [AE\_AMOUNT\_FORMATS](README.md#ae_amount_formats)
- [AccountBase](README.md#accountbase)
- [AccountMultiple](README.md#accountmultiple)
- [DENOMINATION\_MAGNITUDE](README.md#denomination_magnitude)
- [MemoryAccount](README.md#memoryaccount)
- [NodePool](README.md#nodepool)
- [VERSION](README.md#version)

### Functions

- [\_getPollInterval](README.md#_getpollinterval)
- [awaitHeight](README.md#awaitheight)
- [bigNumberToByteArray](README.md#bignumbertobytearray)
- [buildAuthTxHash](README.md#buildauthtxhash)
- [bytesToHex](README.md#bytestohex)
- [connectionProxy](README.md#connectionproxy)
- [createAensDelegationSignature](README.md#createaensdelegationsignature)
- [createGeneralizedAccount](README.md#creategeneralizedaccount)
- [createMetaTx](README.md#createmetatx)
- [createOracleDelegationSignature](README.md#createoracledelegationsignature)
- [decryptKey](README.md#decryptkey)
- [deriveChild](README.md#derivechild)
- [derivePathFromKey](README.md#derivepathfromkey)
- [derivePathFromSeed](README.md#derivepathfromseed)
- [dump](README.md#dump)
- [encodeContractAddress](README.md#encodecontractaddress)
- [encodeUnsigned](README.md#encodeunsigned)
- [encryptKey](README.md#encryptkey)
- [formatAmount](README.md#formatamount)
- [generateKeyPair](README.md#generatekeypair)
- [generateKeyPairFromSecret](README.md#generatekeypairfromsecret)
- [generateSaveHDWalletFromSeed](README.md#generatesavehdwalletfromseed)
- [getAccount](README.md#getaccount)
- [getAddressFromPriv](README.md#getaddressfrompriv)
- [getBalance](README.md#getbalance)
- [getContract](README.md#getcontract)
- [getContractByteCode](README.md#getcontractbytecode)
- [getContractInstance](README.md#getcontractinstance)
- [getCurrentGeneration](README.md#getcurrentgeneration)
- [getGeneration](README.md#getgeneration)
- [getHdWalletAccountFromSeed](README.md#gethdwalletaccountfromseed)
- [getKeyBlock](README.md#getkeyblock)
- [getKeyPair](README.md#getkeypair)
- [getMasterKeyFromSeed](README.md#getmasterkeyfromseed)
- [getMicroBlockHeader](README.md#getmicroblockheader)
- [getMicroBlockTransactions](README.md#getmicroblocktransactions)
- [getName](README.md#getname)
- [getSaveHDWalletAccounts](README.md#getsavehdwalletaccounts)
- [hash](README.md#hash)
- [height](README.md#height)
- [hexToBytes](README.md#hextobytes)
- [isAddressValid](README.md#isaddressvalid)
- [isGA](README.md#isga)
- [isValidKeypair](README.md#isvalidkeypair)
- [messageToHash](README.md#messagetohash)
- [poll](README.md#poll)
- [recover](README.md#recover)
- [resolveName](README.md#resolvename)
- [salt](README.md#salt)
- [sendTransaction](README.md#sendtransaction)
- [sha256hash](README.md#sha256hash)
- [sign](README.md#sign)
- [signMessage](README.md#signmessage)
- [str2buf](README.md#str2buf)
- [toAe](README.md#toae)
- [toAettos](README.md#toaettos)
- [toBytes](README.md#tobytes)
- [txDryRun](README.md#txdryrun)
- [verify](README.md#verify)
- [verifyMessage](README.md#verifymessage)
- [waitForTxConfirm](README.md#waitfortxconfirm)
- [walletDetector](README.md#walletdetector)

## References

### Aens

Renames and re-exports [Ae](README.md#ae)

___

### ContractCompilerHttp

Renames and re-exports [Ae](README.md#ae)

___

### Node

Renames and re-exports [Ae](README.md#ae)

___

### Oracle

Renames and re-exports [Ae](README.md#ae)

___

### RpcAepp

Renames and re-exports [Ae](README.md#ae)

___

### RpcWallet

Renames and re-exports [Ae](README.md#ae)

___

### Transaction

Renames and re-exports [Ae](README.md#ae)

___

### Tx

Renames and re-exports [Ae](README.md#ae)

___

### Universal

Renames and re-exports [Ae](README.md#ae)

___

### verifyTransaction

Renames and re-exports [Ae](README.md#ae)

## Type Aliases

### AeAmountFormats

Ƭ **AeAmountFormats**: ``"ae"`` \| ``"miliAE"`` \| ``"microAE"`` \| ``"nanoAE"`` \| ``"picoAE"`` \| ``"femtoAE"`` \| ``"aettos"``

#### Defined in

[src/utils/amount-formatter.ts:27](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/amount-formatter.ts#L27)

## Properties

### Ae

• **Ae**: `any`

## Variables

### AE\_AMOUNT\_FORMATS

• `Const` **AE\_AMOUNT\_FORMATS**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `AE` | ``"ae"`` |
| `AETTOS` | ``"aettos"`` |
| `FEMTO_AE` | ``"femtoAE"`` |
| `MICRO_AE` | ``"microAE"`` |
| `MILI_AE` | ``"miliAE"`` |
| `NANO_AE` | ``"nanoAE"`` |
| `PICO_AE` | ``"picoAE"`` |

#### Defined in

[src/utils/amount-formatter.ts:29](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/amount-formatter.ts#L29)

___

### AccountBase

• **AccountBase**: `Stamp`<`void`\>

AccountBase Stamp

Attempting to create instances from the Stamp without overwriting all
abstract methods using composition will result in an exception.

Account is one of the three basic building blocks of an
{@link module:@aeternity/aepp-sdk/es/ae--Ae} client and provides access to a
signing key pair.

**`function`**

**`alias`** module:@aeternity/aepp-sdk/es/account

**`rtype`** Stamp

**`param`** Initializer object

**`param`** NETWORK_ID using for signing transaction's

**`returns`** Account instance

#### Defined in

[src/account/base.ts:168](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/account/base.ts#L168)

___

### AccountMultiple

• **AccountMultiple**: `Stamp`<`Promise`<`void`\>\>

AccountMultiple stamp

The purpose of this stamp is to wrap up implementations of
{@link module:@aeternity/aepp-sdk/es/account/base--AccountBase} objects and provide a
common interface to all of them. List are a substantial part of
{@link module:@aeternity/aepp-sdk/es/ae/wallet--Wallet}s.

**`function`**

**`alias`** module:@aeternity/aepp-sdk/es/accounts/multiple

**`rtype`** Stamp

**`param`** Initializer object

**`param`** Accounts array

**`param`** Address of account to select

**`returns`** AccountMultiple instance

**`example`**
const accounts = await AccountMultiple({
  accounts: [MemoryAccount({ keypair: 'keypair_object' })]
})
await accounts.addAccount(account, { select: true }) // Add account and make it selected
accounts.removeAccount(address) // Remove account
accounts.selectAccount(address) // Select account
accounts.addresses() // Get available accounts

#### Defined in

[src/account/multiple.ts:141](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/account/multiple.ts#L141)

___

### DENOMINATION\_MAGNITUDE

• `Const` **DENOMINATION\_MAGNITUDE**: `Object`

DENOMINATION_MAGNITUDE

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ae` | `number` |
| `aettos` | `number` |
| `femtoAE` | `number` |
| `microAE` | `number` |
| `miliAE` | `number` |
| `nanoAE` | `number` |
| `picoAE` | `number` |

#### Defined in

[src/utils/amount-formatter.ts:42](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/amount-formatter.ts#L42)

___

### MemoryAccount

• **MemoryAccount**: `Stamp`<`void`\>

In-memory account stamp

**`function`**

**`alias`** module:@aeternity/aepp-sdk/es/account/memory

**`rtype`** Stamp

**`param`** Initializer object

**`param`** Key pair to use

**`param`** Public key

**`param`** Private key

**`returns`**

#### Defined in

[src/account/memory.ts:96](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/account/memory.ts#L96)

___

### NodePool

• **NodePool**: `Stamp`<`NodePool`\>

Node Pool Stamp
This stamp allow you to make basic manipulation (add, remove, select) on list of nodes

**`alias`** module:@aeternity/aepp-sdk/es/node-pool

**`param`** Initializer object

**`param`** Array with Node instances

**`returns`** NodePool instance

#### Defined in

[src/node-pool/index.ts:155](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/node-pool/index.ts#L155)

___

### VERSION

• `Const` **VERSION**: ``1``

#### Defined in

[src/utils/aepp-wallet-communication/schema.ts:4](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/schema.ts#L4)

## Functions

### \_getPollInterval

▸ **_getPollInterval**(`type`, `__namedParameters`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"block"`` \| ``"microblock"`` |
| `__namedParameters` | `Object` |

#### Returns

`number`

#### Defined in

[src/chain.ts:44](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/chain.ts#L44)

___

### awaitHeight

▸ **awaitHeight**(`height`, `options`): `Promise`<`number`\>

Wait for the chain to reach a specific height

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `height` | `number` | Height to wait for |
| `options` | { `attempts`: `number` ; `interval`: `number` ; `onNode`: `Node`  } & `Object` |  |

#### Returns

`Promise`<`number`\>

Current chain height

#### Defined in

[src/chain.ts:215](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/chain.ts#L215)

___

### bigNumberToByteArray

▸ **bigNumberToByteArray**(`x`): `Buffer`

Convert bignumber to byte array

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `BigNumber` | bignumber instance |

#### Returns

`Buffer`

Buffer

#### Defined in

[src/utils/bytes.ts:32](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/bytes.ts#L32)

___

### buildAuthTxHash

▸ **buildAuthTxHash**(`transaction`, `options`): `Uint8Array`

Build a transaction hash the same as `Auth.tx_hash`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transaction` | \`tx\_${string}\` | tx-encoded transaction |
| `options` | `Object` | Options |
| `options.onNode` | `Node` | Node to use |

#### Returns

`Uint8Array`

Transaction hash

#### Defined in

[src/contract/ga.ts:172](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/contract/ga.ts#L172)

___

### bytesToHex

▸ **bytesToHex**(`b`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `Uint8Array` |

#### Returns

`string`

#### Defined in

[src/utils/bytes.ts:76](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/bytes.ts#L76)

___

### connectionProxy

▸ **connectionProxy**(`con1`, `con2`): () => `void`

Browser connection proxy
Provide functionality to easily forward messages from one connection to another and back

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `con1` | `default` | first connection |
| `con2` | `default` | second connection |

#### Returns

`fn`

a function to stop proxying

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/utils/aepp-wallet-communication/connection-proxy.ts:27](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/connection-proxy.ts#L27)

___

### createAensDelegationSignature

▸ **createAensDelegationSignature**(`contractId`, `opt`): `Promise`<`string`\>

Helper to generate a signature to delegate pre-claim/claim/transfer/revoke of a name to
a contract.

**`example`**
const aeSdk = await Universal({ ... })
const contractId = 'ct_asd2ks...' // contract address
const name = 'example.chain' // AENS name
const onAccount = await aeSdk.address() // Sign with a specific account
// Preclaim signature
const preclaimSig = await aeSdk.createAensDelegationSignature(contractId, { onAccount: current })
// Claim, transfer and revoke signature
const aensDelegationSig = await contract.createAensDelegationSignature(
  contractId, { name, onAccount: current }
)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | \`ct\_${string}\` | Contract Id |
| `opt` | `any` | Options |

#### Returns

`Promise`<`string`\>

Signature for delegation

#### Defined in

[src/ae/contract.ts:84](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/ae/contract.ts#L84)

___

### createGeneralizedAccount

▸ **createGeneralizedAccount**(`authFnName`, `source`, `args`, `options`): `Promise`<`Readonly`<{ `gaContractId`: `EncodedData`<``"ct"``\> ; `owner`: `EncodedData`<``"ak"``\> ; `rawTx`: `EncodedData`<``"tx"``\> ; `transaction`: `EncodedData`<``"th"``\>  }\>\>

Convert current account to GA

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authFnName` | `string` | Authorization function name |
| `source` | `string` | Auth contract source code |
| `args` | `any`[] | init arguments |
| `options` | { `onAccount`: `_AccountBase` & { `Ae`: `any` ; `buildTx`: `any` ; `send`: `any`  } ; `onCompiler`: `any` ; `onNode`: `Node`  } & `object` | Options |

#### Returns

`Promise`<`Readonly`<{ `gaContractId`: `EncodedData`<``"ct"``\> ; `owner`: `EncodedData`<``"ak"``\> ; `rawTx`: `EncodedData`<``"tx"``\> ; `transaction`: `EncodedData`<``"th"``\>  }\>\>

General Account Object

#### Defined in

[src/contract/ga.ts:62](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/contract/ga.ts#L62)

___

### createMetaTx

▸ **createMetaTx**(`rawTransaction`, `authData`, `authFnName`, `options`): `Promise`<`EncodedData`<``"tx"``\>\>

Create a metaTx transaction

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rawTransaction` | \`tx\_${string}\` | Inner transaction |
| `authData` | `Object` | Object with gaMeta params |
| `authData.args?` | `any`[] | - |
| `authData.callData?` | \`cb\_${string}\` | - |
| `authData.gasLimit?` | `number` | - |
| `authData.source?` | `string` | - |
| `authFnName` | `string` | Authorization function name |
| `options` | { `onAccount`: `any`  } & `object` | Options |

#### Returns

`Promise`<`EncodedData`<``"tx"``\>\>

Transaction string

#### Defined in

[src/contract/ga.ts:110](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/contract/ga.ts#L110)

___

### createOracleDelegationSignature

▸ **createOracleDelegationSignature**(`contractId`, `opt`): `Promise`<`string`\>

Helper to generate a signature to delegate register/extend/respond of a Oracle to a contract.

**`example`**
const aeSdk = await Universal({ ... })
const contractId = 'ct_asd2ks...' // contract address
const queryId = 'oq_...' // Oracle Query Id
const onAccount = await aeSdk.address() // Sign with a specific account
// Oracle register and extend signature
const oracleDelegationSig = await aeSdk.createOracleDelegationSignature(contractId)
// Oracle respond signature
const respondSig = await aeSdk.createOracleDelegationSignature(contractId, { queryId })

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | \`ct\_${string}\` | Contract Id |
| `opt` | `any` | Options |

#### Returns

`Promise`<`string`\>

Signature for delegation

#### Defined in

[src/ae/contract.ts:115](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/ae/contract.ts#L115)

___

### decryptKey

▸ **decryptKey**(`password`, `encrypted`): `Uint8Array`

Decrypt given data using `password`

**`rtype`** (password: String, encrypted: String) => Uint8Array

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `password` | `string` | Password to decrypt with |
| `encrypted` | `Uint8Array` | Data to decrypt |

#### Returns

`Uint8Array`

Decrypted data

#### Defined in

[src/utils/crypto.ts:172](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/crypto.ts#L172)

___

### deriveChild

▸ **deriveChild**(`__namedParameters`, `index`): `KeyTreeNode`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `KeyTreeNode` |
| `index` | `number` |

#### Returns

`KeyTreeNode`

#### Defined in

[src/utils/hd-wallet.ts:83](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/hd-wallet.ts#L83)

___

### derivePathFromKey

▸ **derivePathFromKey**(`path`, `key`): `KeyTreeNode`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `Bip32Path`<``5``\> |
| `key` | `KeyTreeNode` |

#### Returns

`KeyTreeNode`

#### Defined in

[src/utils/hd-wallet.ts:42](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/hd-wallet.ts#L42)

___

### derivePathFromSeed

▸ **derivePathFromSeed**(`path`, `seed`): `KeyTreeNode`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | ``"m"`` \| ``"m/"`` \| \`m/${number}H\` \| \`m/${number}H/${number}H\` \| \`m/${number}H/${number}H/${number}H\` \| \`m/${number}H/${number}H/${number}H/${number}H\` \| \`m/${number}H/${number}H/${number}H/${number}H/${number}H\` \| \`m/${number}H/${number}H/${number}H/${number}H/${number}H/${number}H\` \| \`m/${number}H/${number}H/${number}H/${number}H/${number}H/${number}H/${number}H\` \| \`m/${number}h\` \| \`m/${number}h/${number}h\` \| \`m/${number}h/${number}h/${number}h\` \| \`m/${number}h/${number}h/${number}h/${number}h\` \| \`m/${number}h/${number}h/${number}h/${number}h/${number}h\` \| \`m/${number}h/${number}h/${number}h/${number}h/${number}h/${number}h\` \| \`m/${number}h/${number}h/${number}h/${number}h/${number}h/${number}h/${number}h\` \| \`m/${number}'\` \| \`m/${number}'/${number}'\` \| \`m/${number}'/${number}'/${number}'\` \| \`m/${number}'/${number}'/${number}'/${number}'\` \| \`m/${number}'/${number}'/${number}'/${number}'/${number}'\` \| \`m/${number}'/${number}'/${number}'/${number}'/${number}'/${number}'\` \| \`m/${number}'/${number}'/${number}'/${number}'/${number}'/${number}'/${number}'\` |
| `seed` | `Uint8Array` |

#### Returns

`KeyTreeNode`

#### Defined in

[src/utils/hd-wallet.ts:53](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/hd-wallet.ts#L53)

___

### dump

▸ **dump**(`name`, `password`, `privateKey`, `nonce?`, `salt?`, `options?`): `Promise`<[`Keystore`](interfaces/Keystore.md)\>

Export private key to keystore secret-storage format.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Key name. |
| `password` | `string` \| `Uint8Array` | User-supplied password. |
| `privateKey` | `string` \| `Uint8Array` | Private key as hex-string or a Buffer. |
| `nonce` | `Uint8Array` | Randomly generated 24byte nonce. |
| `salt` | `Uint8Array` | Randomly generated 16byte salt. |
| `options?` | `Partial`<{ `cipher_params`: { `nonce`: `string`  } ; `ciphertext`: `string` ; `kdf`: ``"argon2id"`` ; `kdf_params`: { `memlimit_kib`: `number` ; `opslimit`: `number` ; `parallelism`: `number` ; `salt`: `string`  } ; `secret_type`: ``"ed25519"`` ; `symmetric_alg`: ``"xsalsa20-poly1305"``  }\> | - |

#### Returns

`Promise`<[`Keystore`](interfaces/Keystore.md)\>

#### Defined in

[src/utils/keystore.ts:159](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/keystore.ts#L159)

___

### encodeContractAddress

▸ **encodeContractAddress**(`owner`, `nonce`): `string`

Compute contract address

**`rtype`** (owner: String, nonce: Number) => String

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | \`ak\_${string}\` | Address of contract owner |
| `nonce` | `number` | Round when contract was created |

#### Returns

`string`

- Contract address

#### Defined in

[src/utils/crypto.ts:105](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/crypto.ts#L105)

___

### encodeUnsigned

▸ **encodeUnsigned**(`value`): `Buffer`

Converts a positive integer to the smallest possible
representation in a binary digit representation

**`rtype`** (value: Number) => Buffer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | Value to encode |

#### Returns

`Buffer`

- Encoded data

#### Defined in

[src/utils/crypto.ts:81](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/crypto.ts#L81)

___

### encryptKey

▸ **encryptKey**(`password`, `binaryData`): `Uint8Array`

Encrypt given data using `password`

**`rtype`** (password: String, binaryData: Buffer) => Uint8Array

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `password` | `string` | Password to encrypt with |
| `binaryData` | `Uint8Array` | Data to encrypt |

#### Returns

`Uint8Array`

Encrypted data

#### Defined in

[src/utils/crypto.ts:159](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/crypto.ts#L159)

___

### formatAmount

▸ **formatAmount**(`value`, `[options={}]`): `string`

Convert amount from one to other denomination

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` \| `number` \| `bigint` \| `BigNumber` | amount to convert |
| `[options={}]` | `Object` | options |
| `[options={}].denomination?` | [`AeAmountFormats`](README.md#aeamountformats) | - |
| `[options={}].targetDenomination?` | [`AeAmountFormats`](README.md#aeamountformats) | - |

#### Returns

`string`

#### Defined in

[src/utils/amount-formatter.ts:85](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/amount-formatter.ts#L85)

___

### generateKeyPair

▸ **generateKeyPair**(`raw?`): `Object`

Generate a random ED25519 keypair

**`rtype`** (raw: Boolean) => {publicKey: String | Buffer, secretKey: String | Buffer}

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `raw` | `boolean` | `false` | Whether to return raw (binary) keys |

#### Returns

`Object`

Key pair

| Name | Type |
| :------ | :------ |
| `publicKey` | `string` \| `Buffer` |
| `secretKey` | `string` \| `Buffer` |

#### Defined in

[src/utils/crypto.ts:129](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/crypto.ts#L129)

___

### generateKeyPairFromSecret

▸ **generateKeyPairFromSecret**(`secret`): `SignKeyPair`

Generate keyPair from secret key

**`rtype`** (secret: Uint8Array) => KeyPair

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secret` | `Uint8Array` | secret key |

#### Returns

`SignKeyPair`

- Object with Private(privateKey) and Public(publicKey) keys

#### Defined in

[src/utils/crypto.ts:119](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/crypto.ts#L119)

___

### generateSaveHDWalletFromSeed

▸ **generateSaveHDWalletFromSeed**(`seed`, `password`): `HDWallet`

#### Parameters

| Name | Type |
| :------ | :------ |
| `seed` | `Uint8Array` |
| `password` | `string` |

#### Returns

`HDWallet`

#### Defined in

[src/utils/hd-wallet.ts:101](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/hd-wallet.ts#L101)

___

### getAccount

▸ **getAccount**(`address`, `options`): `Promise`<`TransformNodeType`<`AccountNode`\>\>

Get account by account public key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | \`ak\_${string}\` | Account address (public key) |
| `options` | `Object` |  |
| `options.hash?` | \`kh\_${string}\` \| \`mh\_${string}\` | Get account on specific block by micro block hash or key block hash |
| `options.height?` | `number` | Get account on specific block by block height |
| `options.onNode` | `Node` | Node to use |

#### Returns

`Promise`<`TransformNodeType`<`AccountNode`\>\>

#### Defined in

[src/chain.ts:170](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/chain.ts#L170)

___

### getAddressFromPriv

▸ **getAddressFromPriv**(`secret`): `string`

Generate address from secret key

**`rtype`** (secret: String) => tx: Promise[String]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secret` | `string` \| `Uint8Array` | Private key |

#### Returns

`string`

Public key

#### Defined in

[src/utils/crypto.ts:43](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/crypto.ts#L43)

___

### getBalance

▸ **getBalance**(`address`, `options`): `Promise`<`string`\>

Request the balance of specified account

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | \`ak\_${string}\` | The public account address to obtain the balance for |
| `options` | { `format`: [`AeAmountFormats`](README.md#aeamountformats)  } & { `hash?`: \`kh\_${string}\` \| \`mh\_${string}\` ; `height?`: `number` ; `onNode`: `Node`  } |  |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/chain.ts:188](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/chain.ts#L188)

___

### getContract

▸ **getContract**(`contractId`, `options`): `Promise`<`TransformNodeType`<`ContractObject`\>\>

Get contract entry

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | \`ct\_${string}\` | Contract address |
| `options` | `Object` |  |
| `options.onNode` | `Node` | Node to use |

#### Returns

`Promise`<`TransformNodeType`<`ContractObject`\>\>

#### Defined in

[src/chain.ts:409](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/chain.ts#L409)

___

### getContractByteCode

▸ **getContractByteCode**(`contractId`, `options`): `Promise`<`TransformNodeType`<`ByteCode`\>\>

Get contract byte code

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | \`ct\_${string}\` | Contract address |
| `options` | `Object` |  |
| `options.onNode` | `Node` | Node to use |

#### Returns

`Promise`<`TransformNodeType`<`ByteCode`\>\>

#### Defined in

[src/chain.ts:397](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/chain.ts#L397)

___

### getContractInstance

▸ **getContractInstance**(`options`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/ae/contract.ts:125](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/ae/contract.ts#L125)

___

### getCurrentGeneration

▸ **getCurrentGeneration**(`options`): `Promise`<`TransformNodeType`<`Generation`\>\>

Obtain current generation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` |  |
| `options.onNode` | `Node` | Node to use |

#### Returns

`Promise`<`TransformNodeType`<`Generation`\>\>

Current Generation

#### Defined in

[src/chain.ts:261](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/chain.ts#L261)

___

### getGeneration

▸ **getGeneration**(`hashOrHeight`, `options`): `Promise`<`TransformNodeType`<`Generation`\>\>

Get generation by hash or height

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hashOrHeight` | `number` \| \`kh\_${string}\` | Generation hash or height |
| `options` | `Object` |  |
| `options.onNode` | `Node` | Node to use |

#### Returns

`Promise`<`TransformNodeType`<`Generation`\>\>

Generation

#### Defined in

[src/chain.ts:274](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/chain.ts#L274)

___

### getHdWalletAccountFromSeed

▸ **getHdWalletAccountFromSeed**(`seed`, `accountIdx`): `Account` & { `idx`: `number`  }

#### Parameters

| Name | Type |
| :------ | :------ |
| `seed` | `Uint8Array` |
| `accountIdx` | `number` |

#### Returns

`Account` & { `idx`: `number`  }

#### Defined in

[src/utils/hd-wallet.ts:121](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/hd-wallet.ts#L121)

___

### getKeyBlock

▸ **getKeyBlock**(`hashOrHeight`, `options`): `Promise`<`TransformNodeType`<`KeyBlock`\>\>

Get key block

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hashOrHeight` | `number` \| \`kh\_${string}\` |  |
| `options` | `Object` |  |
| `options.onNode` | `Node` | Node to use |

#### Returns

`Promise`<`TransformNodeType`<`KeyBlock`\>\>

Key Block

#### Defined in

[src/chain.ts:301](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/chain.ts#L301)

___

### getKeyPair

▸ **getKeyPair**(`secretKey`): `nacl.SignKeyPair`

#### Parameters

| Name | Type |
| :------ | :------ |
| `secretKey` | `Uint8Array` |

#### Returns

`nacl.SignKeyPair`

#### Defined in

[src/utils/hd-wallet.ts:69](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/hd-wallet.ts#L69)

___

### getMasterKeyFromSeed

▸ **getMasterKeyFromSeed**(`seed`): `KeyTreeNode`

#### Parameters

| Name | Type |
| :------ | :------ |
| `seed` | `Uint8Array` |

#### Returns

`KeyTreeNode`

#### Defined in

[src/utils/hd-wallet.ts:73](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/hd-wallet.ts#L73)

___

### getMicroBlockHeader

▸ **getMicroBlockHeader**(`hash`, `options`): `Promise`<`TransformNodeType`<`MicroBlockHeader`\>\>

Get micro block header

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | \`mh\_${string}\` |  |
| `options` | `Object` |  |
| `options.onNode` | `Node` | Node to use |

#### Returns

`Promise`<`TransformNodeType`<`MicroBlockHeader`\>\>

Micro block header

#### Defined in

[src/chain.ts:315](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/chain.ts#L315)

___

### getMicroBlockTransactions

▸ **getMicroBlockTransactions**(`hash`, `options`): `Promise`<`TransformNodeType`<`SignedTx`[]\>\>

Get micro block transactions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | \`mh\_${string}\` |  |
| `options` | `Object` |  |
| `options.onNode` | `Node` | Node to use |

#### Returns

`Promise`<`TransformNodeType`<`SignedTx`[]\>\>

Transactions

#### Defined in

[src/chain.ts:288](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/chain.ts#L288)

___

### getName

▸ **getName**(`name`, `options`): `Promise`<`TransformNodeType`<`NameEntry`\>\>

Get name entry

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | \`${string}.chain\` |  |
| `options` | `Object` |  |
| `options.onNode` | `Node` | Node to use |

#### Returns

`Promise`<`TransformNodeType`<`NameEntry`\>\>

#### Defined in

[src/chain.ts:421](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/chain.ts#L421)

___

### getSaveHDWalletAccounts

▸ **getSaveHDWalletAccounts**(`saveHDWallet`, `password`, `accountCount`): `Account`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `saveHDWallet` | `HDWallet` |
| `password` | `string` |
| `accountCount` | `number` |

#### Returns

`Account`[]

#### Defined in

[src/utils/hd-wallet.ts:109](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/hd-wallet.ts#L109)

___

### hash

▸ **hash**(`input`): `Buffer`

Calculate 256bits Blake2b hash of `input`

**`rtype`** (input: String) => hash: String

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `Data` | Data to hash |

#### Returns

`Buffer`

Hash

#### Defined in

[src/utils/crypto.ts:93](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/crypto.ts#L93)

___

### height

▸ **height**(`__namedParameters`): `Promise`<`number`\>

Obtain current height of the chain

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.onNode` | `Node` |

#### Returns

`Promise`<`number`\>

Current chain height

#### Defined in

[src/chain.ts:202](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/chain.ts#L202)

___

### hexToBytes

▸ **hexToBytes**(`s`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`Uint8Array`

#### Defined in

[src/utils/bytes.ts:78](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/bytes.ts#L78)

___

### isAddressValid

▸ **isAddressValid**(`address`, `prefix?`): `boolean`

Check if address is valid

**`rtype`** (input: String) => valid: Boolean

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `address` | `string` | `undefined` | Address |
| `prefix` | `EncodingType` | `'ak'` | Transaction prefix. Default: 'ak' |

#### Returns

`boolean`

valid

#### Defined in

[src/utils/crypto.ts:56](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/crypto.ts#L56)

___

### isGA

▸ **isGA**(`address`, `options`): `Promise`<`boolean`\>

Check if account is GA

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | \`ak\_${string}\` | Account address |
| `options` | `Object` |  |
| `options.hash?` | \`kh\_${string}\` \| \`mh\_${string}\` | - |
| `options.height?` | `number` | - |
| `options.onNode` | `Node` | - |

#### Returns

`Promise`<`boolean`\>

if account is GA

#### Defined in

[src/contract/ga.ts:47](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/contract/ga.ts#L47)

___

### isValidKeypair

▸ **isValidKeypair**(`privateKey`, `publicKey`): `boolean`

Check key pair for validity

Sign a message, and then verifying that signature

**`rtype`** (privateKey: Buffer, publicKey: Buffer) => Boolean

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | `string` \| `Uint8Array` | Private key to verify |
| `publicKey` | `string` \| `Uint8Array` | Public key to verify |

#### Returns

`boolean`

Valid?

#### Defined in

[src/utils/crypto.ts:230](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/crypto.ts#L230)

___

### messageToHash

▸ **messageToHash**(`message`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`Buffer`

#### Defined in

[src/utils/crypto.ts:206](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/crypto.ts#L206)

___

### poll

▸ **poll**(`th`, `options`): `Promise`<`TransformNodeType`<`SignedTx`\>\>

Wait for a transaction to be mined

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `th` | \`th\_${string}\` | The hash of transaction to poll |
| `options` | { `blocks`: `number` ; `interval`: `number` ; `onNode`: `Node`  } & `Object` |  |

#### Returns

`Promise`<`TransformNodeType`<`SignedTx`\>\>

The transaction as it was mined

#### Defined in

[src/chain.ts:240](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/chain.ts#L240)

___

### recover

▸ **recover**(`password`, `keystore`): `Promise`<`string`\>

Recover plaintext private key from secret-storage key object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `password` | `string` \| `Uint8Array` | Keystore object password. |
| `keystore` | [`Keystore`](interfaces/Keystore.md) | Keystore object. |

#### Returns

`Promise`<`string`\>

Plaintext private key.

#### Defined in

[src/utils/keystore.ts:135](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/keystore.ts#L135)

___

### resolveName

▸ **resolveName**(`nameOrId`, `key`, `options`): `Promise`<`EncodedData`<``"ak"`` \| ``"nm"``\>\>

Resolve AENS name and return name hash

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nameOrId` | \`ak\_${string}\` \| \`${string}.chain\` |  |
| `key` | `string` | in AENS pointers record |
| `options` | `Object` |  |
| `options.onNode` | `Node` | Node to use |
| `options.resolveByNode` | `boolean` | Enables pointer resolving using node |
| `options.verify` | `boolean` | To ensure that name exist and have a corresponding pointer // TODO: avoid that to don't trust to current api gateway |

#### Returns

`Promise`<`EncodedData`<``"ak"`` \| ``"nm"``\>\>

Address or AENS name hash

#### Defined in

[src/chain.ts:438](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/chain.ts#L438)

___

### salt

▸ **salt**(): `number`

Generate a random salt (positive integer)

**`rtype`** () => salt: Number

#### Returns

`number`

random salt

#### Defined in

[src/utils/crypto.ts:70](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/crypto.ts#L70)

___

### sendTransaction

▸ **sendTransaction**(`tx`, `options`): `Promise`<{ `confirmationHeight?`: `number` ; `hash`: `EncodedData`<``"th"``\> \| `string` ; `rawTx`: `EncodedData`<``"tx"``\>  } & `Partial`<`TransformNodeType`<`SignedTx`\>\>\>

Submit a signed transaction for mining

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tx` | \`tx\_${string}\` | Transaction to submit |
| `options` | { `confirm?`: `number` \| `boolean` ; `onAccount`: `Account` ; `onNode`: `Node` ; `verify?`: `boolean` ; `waitMined?`: `boolean`  } & { `blocks`: `number` ; `interval`: `number` ; `onNode`: `Node`  } & `Object` & `Omit`<{ `confirm?`: `number` ; `onNode`: `Node`  } & { `attempts`: `number` ; `interval`: `number` ; `onNode`: `Node`  } & `Object`, ``"confirm"``\> |  |

#### Returns

`Promise`<{ `confirmationHeight?`: `number` ; `hash`: `EncodedData`<``"th"``\> \| `string` ; `rawTx`: `EncodedData`<``"tx"``\>  } & `Partial`<`TransformNodeType`<`SignedTx`\>\>\>

Transaction details

#### Defined in

[src/chain.ts:78](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/chain.ts#L78)

___

### sha256hash

▸ **sha256hash**(`input`): `Buffer`

Calculate SHA256 hash of `input`

**`rtype`** (input: String) => hash: String

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` \| `Uint8Array` | Data to hash |

#### Returns

`Buffer`

Hash

#### Defined in

[src/utils/encoder.ts:17](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/encoder.ts#L17)

___

### sign

▸ **sign**(`data`, `privateKey`): `Uint8Array`

Generate signature

**`rtype`** (data: String | Buffer, privateKey: Buffer) => Buffer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` \| `Uint8Array` | Data to sign |
| `privateKey` | `string` \| `Uint8Array` | Key to sign with |

#### Returns

`Uint8Array`

Signature

#### Defined in

[src/utils/crypto.ts:188](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/crypto.ts#L188)

___

### signMessage

▸ **signMessage**(`message`, `privateKey`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `privateKey` | `string` \| `Buffer` |

#### Returns

`Uint8Array`

#### Defined in

[src/utils/crypto.ts:212](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/crypto.ts#L212)

___

### str2buf

▸ **str2buf**(`str`, `enc?`): `Buffer`

Convert a string to a Buffer.  If encoding is not specified, hex-encoding
will be used if the input is valid hex.  If the input is valid base64 but
not valid hex, base64 will be used.  Otherwise, utf8 will be used.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | String to be converted. |
| `enc?` | `BufferEncoding` | - |

#### Returns

`Buffer`

Buffer containing the input data.

#### Defined in

[src/utils/bytes.ts:69](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/bytes.ts#L69)

___

### toAe

▸ **toAe**(`value`, `[options={}]?`): `string`

Convert amount to AE

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` \| `number` \| `BigNumber` | amount to convert |
| `[options={}]` | `Object` | options |
| `[options={}].denomination?` | [`AeAmountFormats`](README.md#aeamountformats) | - |

#### Returns

`string`

#### Defined in

[src/utils/amount-formatter.ts:59](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/amount-formatter.ts#L59)

___

### toAettos

▸ **toAettos**(`value`, `[options={}]?`): `string`

Convert amount to aettos

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` \| `number` \| `BigNumber` | amount to convert |
| `[options={}]` | `Object` | options |
| `[options={}].denomination?` | [`AeAmountFormats`](README.md#aeamountformats) | - |

#### Returns

`string`

#### Defined in

[src/utils/amount-formatter.ts:71](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/amount-formatter.ts#L71)

___

### toBytes

▸ **toBytes**(`val?`, `big?`): `Buffer`

Convert string, number, or BigNumber to byte array

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `val?` | ``null`` \| `string` \| `number` \| `BigNumber` | `undefined` |  |
| `big` | `boolean` | `false` | enables force conversion to BigNumber |

#### Returns

`Buffer`

Buffer

#### Defined in

[src/utils/bytes.ts:45](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/bytes.ts#L45)

___

### txDryRun

▸ **txDryRun**(`tx`, `accountAddress`, `options`): `Promise`<{ `txEvents?`: `TransformNodeType`<`DryRunResults`[``"txEvents"``]\>  } & `TransformNodeType`<`DryRunResult`\>\>

Transaction dry-run

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tx` | \`tx\_${string}\` | transaction to execute |
| `accountAddress` | \`ak\_${string}\` | address that will be used to execute transaction |
| `options` | `Object` |  |
| `options.combine?` | `boolean` | Enables combining of similar requests to a single dry-run call |
| `options.onNode` | `Node` | Node to use |
| `options.top?` | `number` | hash of block on which to make dry-run |
| `options.txEvents?` | `boolean` | collect and return on-chain tx events that would result from the call |

#### Returns

`Promise`<{ `txEvents?`: `TransformNodeType`<`DryRunResults`[``"txEvents"``]\>  } & `TransformNodeType`<`DryRunResult`\>\>

#### Defined in

[src/chain.ts:370](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/chain.ts#L370)

___

### verify

▸ **verify**(`data`, `signature`, `publicKey`): `boolean`

Verify that signature was signed by public key

**`rtype`** (data: Buffer, signature: Buffer, publicKey: Buffer) => Boolean

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | Data to verify |
| `signature` | `Uint8Array` | Signature to verify |
| `publicKey` | `string` \| `Uint8Array` | Key to verify against |

#### Returns

`boolean`

Valid?

#### Defined in

[src/utils/crypto.ts:200](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/crypto.ts#L200)

___

### verifyMessage

▸ **verifyMessage**(`str`, `signature`, `publicKey`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `signature` | `Uint8Array` |
| `publicKey` | `string` \| `Uint8Array` |

#### Returns

`boolean`

#### Defined in

[src/utils/crypto.ts:216](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/crypto.ts#L216)

___

### waitForTxConfirm

▸ **waitForTxConfirm**(`txHash`, `options`): `Promise`<`number`\>

Wait for transaction confirmation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txHash` | \`th\_${string}\` | Transaction hash |
| `options` | { `confirm?`: `number` ; `onNode`: `Node`  } & { `attempts`: `number` ; `interval`: `number` ; `onNode`: `Node`  } & `Object` |  |

#### Returns

`Promise`<`number`\>

Current Height

#### Defined in

[src/chain.ts:144](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/chain.ts#L144)

___

### walletDetector

▸ **walletDetector**(`connection?`, `onDetected`): () => `void`

A function to detect available wallets

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `connection` | `default` | connection to use to detect wallets |
| `onDetected` | (`__namedParameters`: { `newWallet?`: `Wallet` ; `wallets`: `Wallets`  }) => `void` | call-back function which trigger on new wallet |

#### Returns

`fn`

a function to stop scanning

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/utils/aepp-wallet-communication/wallet-detector.ts:39](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/wallet-detector.ts#L39)
