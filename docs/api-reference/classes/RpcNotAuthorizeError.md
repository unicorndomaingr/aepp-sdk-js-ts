[api-reference](../README.md) / RpcNotAuthorizeError

# Class: RpcNotAuthorizeError

## Hierarchy

- [`RpcError`](RpcError.md)

  ↳ **`RpcNotAuthorizeError`**

## Table of contents

### Constructors

- [constructor](RpcNotAuthorizeError.md#constructor)

### Properties

- [code](RpcNotAuthorizeError.md#code)
- [data](RpcNotAuthorizeError.md#data)
- [message](RpcNotAuthorizeError.md#message)
- [name](RpcNotAuthorizeError.md#name)
- [stack](RpcNotAuthorizeError.md#stack)
- [code](RpcNotAuthorizeError.md#code-1)
- [prepareStackTrace](RpcNotAuthorizeError.md#preparestacktrace)
- [stackTraceLimit](RpcNotAuthorizeError.md#stacktracelimit)

### Methods

- [toJSON](RpcNotAuthorizeError.md#tojson)
- [captureStackTrace](RpcNotAuthorizeError.md#capturestacktrace)
- [deserialize](RpcNotAuthorizeError.md#deserialize)

## Constructors

### constructor

• **new RpcNotAuthorizeError**()

#### Overrides

[RpcError](RpcError.md).[constructor](RpcError.md#constructor)

#### Defined in

[src/utils/aepp-wallet-communication/schema.ts:122](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/schema.ts#L122)

## Properties

### code

• **code**: `number` = `10`

#### Overrides

[RpcError](RpcError.md).[code](RpcError.md#code)

#### Defined in

[src/utils/aepp-wallet-communication/schema.ts:121](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/schema.ts#L121)

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

▪ `Static` **code**: `number` = `10`

#### Overrides

[RpcError](RpcError.md).[code](RpcError.md#code-1)

#### Defined in

[src/utils/aepp-wallet-communication/schema.ts:120](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/schema.ts#L120)

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
