[api-reference](../README.md) / BaseError

# Class: BaseError

aepp-sdk originated error

## Hierarchy

- `Error`

  ↳ **`BaseError`**

  ↳↳ [`RpcError`](RpcError.md)

  ↳↳ [`AccountError`](AccountError.md)

  ↳↳ [`AensError`](AensError.md)

  ↳↳ [`AeppError`](AeppError.md)

  ↳↳ [`ChannelError`](ChannelError.md)

  ↳↳ [`CompilerError`](CompilerError.md)

  ↳↳ [`ContractError`](ContractError.md)

  ↳↳ [`CryptographyError`](CryptographyError.md)

  ↳↳ [`NodeError`](NodeError.md)

  ↳↳ [`TransactionError`](TransactionError.md)

  ↳↳ [`WalletError`](WalletError.md)

  ↳↳ [`ArgumentError`](ArgumentError.md)

  ↳↳ [`ArgumentCountMismatchError`](ArgumentCountMismatchError.md)

  ↳↳ [`InsufficientBalanceError`](InsufficientBalanceError.md)

  ↳↳ [`MissingParamError`](MissingParamError.md)

  ↳↳ [`NoSerializerFoundError`](NoSerializerFoundError.md)

  ↳↳ [`RequestTimedOutError`](RequestTimedOutError.md)

  ↳↳ [`TxTimedOutError`](TxTimedOutError.md)

  ↳↳ [`TypeError`](TypeError.md)

  ↳↳ [`UnsupportedPlatformError`](UnsupportedPlatformError.md)

  ↳↳ [`UnsupportedProtocolError`](UnsupportedProtocolError.md)

  ↳↳ [`NotImplementedError`](NotImplementedError.md)

  ↳↳ [`UnsupportedVersionError`](UnsupportedVersionError.md)

  ↳↳ [`InternalError`](InternalError.md)

## Table of contents

### Constructors

- [constructor](BaseError.md#constructor)

### Properties

- [message](BaseError.md#message)
- [name](BaseError.md#name)
- [stack](BaseError.md#stack)
- [prepareStackTrace](BaseError.md#preparestacktrace)
- [stackTraceLimit](BaseError.md#stacktracelimit)

### Methods

- [captureStackTrace](BaseError.md#capturestacktrace)

## Constructors

### constructor

• **new BaseError**(`message`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Overrides

Error.constructor

#### Defined in

[src/utils/errors.ts:11](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/errors.ts#L11)

## Properties

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1024

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
