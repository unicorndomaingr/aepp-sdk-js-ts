[api-reference](../README.md) / RpcBroadcastError

# Class: RpcBroadcastError

## Hierarchy

- [`RpcError`](RpcError.md)

  ↳ **`RpcBroadcastError`**

## Table of contents

### Constructors

- [constructor](RpcBroadcastError.md#constructor)

### Properties

- [code](RpcBroadcastError.md#code)
- [data](RpcBroadcastError.md#data)
- [message](RpcBroadcastError.md#message)
- [name](RpcBroadcastError.md#name)
- [stack](RpcBroadcastError.md#stack)
- [code](RpcBroadcastError.md#code-1)
- [prepareStackTrace](RpcBroadcastError.md#preparestacktrace)
- [stackTraceLimit](RpcBroadcastError.md#stacktracelimit)

### Methods

- [toJSON](RpcBroadcastError.md#tojson)
- [captureStackTrace](RpcBroadcastError.md#capturestacktrace)
- [deserialize](RpcBroadcastError.md#deserialize)

## Constructors

### constructor

• **new RpcBroadcastError**(`data?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data?` | `any` |

#### Overrides

[RpcError](RpcError.md).[constructor](RpcError.md#constructor)

#### Defined in

[src/utils/aepp-wallet-communication/schema.ts:83](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/schema.ts#L83)

## Properties

### code

• **code**: `number` = `3`

#### Overrides

[RpcError](RpcError.md).[code](RpcError.md#code)

#### Defined in

[src/utils/aepp-wallet-communication/schema.ts:82](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/schema.ts#L82)

___

### data

• `Optional` **data**: `any`

#### Inherited from

[RpcError](RpcError.md).[data](RpcError.md#data)

#### Defined in

[src/utils/aepp-wallet-communication/schema.ts:49](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/schema.ts#L49)

___

### message

• **message**: `string`

#### Inherited from

[RpcError](RpcError.md).[message](RpcError.md#message)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

___

### name

• **name**: `string`

#### Inherited from

[RpcError](RpcError.md).[name](RpcError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[RpcError](RpcError.md).[stack](RpcError.md#stack)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1024

___

### code

▪ `Static` **code**: `number` = `3`

#### Overrides

[RpcError](RpcError.md).[code](RpcError.md#code-1)

#### Defined in

[src/utils/aepp-wallet-communication/schema.ts:81](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/schema.ts#L81)

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

[RpcError](RpcError.md).[prepareStackTrace](RpcError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[RpcError](RpcError.md).[stackTraceLimit](RpcError.md#stacktracelimit)

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### toJSON

▸ **toJSON**(): `RpcErrorAsJson`

#### Returns

`RpcErrorAsJson`

#### Inherited from

[RpcError](RpcError.md).[toJSON](RpcError.md#tojson)

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

[RpcError](RpcError.md).[captureStackTrace](RpcError.md#capturestacktrace)

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

#### Inherited from

[RpcError](RpcError.md).[deserialize](RpcError.md#deserialize)

#### Defined in

[src/utils/aepp-wallet-communication/schema.ts:59](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/schema.ts#L59)
