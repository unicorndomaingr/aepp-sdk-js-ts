[api-reference](../README.md) / RpcError

# Class: RpcError

## Hierarchy

- [`BaseError`](BaseError.md)

  ↳ **`RpcError`**

  ↳↳ [`RpcInvalidTransactionError`](RpcInvalidTransactionError.md)

  ↳↳ [`RpcBroadcastError`](RpcBroadcastError.md)

  ↳↳ [`RpcRejectedByUserError`](RpcRejectedByUserError.md)

  ↳↳ [`RpcUnsupportedProtocolError`](RpcUnsupportedProtocolError.md)

  ↳↳ [`RpcConnectionDenyError`](RpcConnectionDenyError.md)

  ↳↳ [`RpcNotAuthorizeError`](RpcNotAuthorizeError.md)

  ↳↳ [`RpcPermissionDenyError`](RpcPermissionDenyError.md)

  ↳↳ [`RpcInternalError`](RpcInternalError.md)

  ↳↳ [`RpcMethodNotFoundError`](RpcMethodNotFoundError.md)

## Table of contents

### Constructors

- [constructor](RpcError.md#constructor)

### Properties

- [code](RpcError.md#code)
- [data](RpcError.md#data)
- [message](RpcError.md#message)
- [name](RpcError.md#name)
- [stack](RpcError.md#stack)
- [code](RpcError.md#code-1)
- [prepareStackTrace](RpcError.md#preparestacktrace)
- [stackTraceLimit](RpcError.md#stacktracelimit)

### Methods

- [toJSON](RpcError.md#tojson)
- [captureStackTrace](RpcError.md#capturestacktrace)
- [deserialize](RpcError.md#deserialize)

## Constructors

### constructor

• **new RpcError**(`message`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Inherited from

[BaseError](BaseError.md).[constructor](BaseError.md#constructor)

#### Defined in

[src/utils/errors.ts:11](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/errors.ts#L11)

## Properties

### code

• **code**: `number`

#### Defined in

[src/utils/aepp-wallet-communication/schema.ts:48](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/schema.ts#L48)

___

### data

• `Optional` **data**: `any`

#### Defined in

[src/utils/aepp-wallet-communication/schema.ts:49](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/schema.ts#L49)

___

### message

• **message**: `string`

#### Inherited from

[BaseError](BaseError.md).[message](BaseError.md#message)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

___

### name

• **name**: `string`

#### Inherited from

[BaseError](BaseError.md).[name](BaseError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[BaseError](BaseError.md).[stack](BaseError.md#stack)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1024

___

### code

▪ `Static` **code**: `number`

#### Defined in

[src/utils/aepp-wallet-communication/schema.ts:47](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/schema.ts#L47)

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

Optional override for formatting stack traces

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

[BaseError](BaseError.md).[prepareStackTrace](BaseError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[BaseError](BaseError.md).[stackTraceLimit](BaseError.md#stacktracelimit)

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### toJSON

▸ **toJSON**(): `RpcErrorAsJson`

#### Returns

`RpcErrorAsJson`

#### Defined in

[src/utils/aepp-wallet-communication/schema.ts:51](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/schema.ts#L51)

___

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

[BaseError](BaseError.md).[captureStackTrace](BaseError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:4

___

### deserialize

▸ `Static` **deserialize**(`json`): [`RpcError`](RpcError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `RpcErrorAsJson` |

#### Returns

[`RpcError`](RpcError.md)

#### Defined in

[src/utils/aepp-wallet-communication/schema.ts:59](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/schema.ts#L59)
