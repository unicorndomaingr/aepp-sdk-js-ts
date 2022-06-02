[api-reference](../README.md) / RpcPermissionDenyError

# Class: RpcPermissionDenyError

## Hierarchy

- [`RpcError`](RpcError.md)

  ↳ **`RpcPermissionDenyError`**

## Table of contents

### Constructors

- [constructor](RpcPermissionDenyError.md#constructor)

### Properties

- [code](RpcPermissionDenyError.md#code)
- [data](RpcPermissionDenyError.md#data)
- [message](RpcPermissionDenyError.md#message)
- [name](RpcPermissionDenyError.md#name)
- [stack](RpcPermissionDenyError.md#stack)
- [code](RpcPermissionDenyError.md#code-1)
- [prepareStackTrace](RpcPermissionDenyError.md#preparestacktrace)
- [stackTraceLimit](RpcPermissionDenyError.md#stacktracelimit)

### Methods

- [toJSON](RpcPermissionDenyError.md#tojson)
- [captureStackTrace](RpcPermissionDenyError.md#capturestacktrace)
- [deserialize](RpcPermissionDenyError.md#deserialize)

## Constructors

### constructor

• **new RpcPermissionDenyError**(`address`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | \`ak\_${string}\` |

#### Overrides

[RpcError](RpcError.md).[constructor](RpcError.md#constructor)

#### Defined in

[src/utils/aepp-wallet-communication/schema.ts:131](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/schema.ts#L131)

## Properties

### code

• **code**: `number` = `11`

#### Overrides

[RpcError](RpcError.md).[code](RpcError.md#code)

#### Defined in

[src/utils/aepp-wallet-communication/schema.ts:130](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/schema.ts#L130)

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

▪ `Static` **code**: `number` = `11`

#### Overrides

[RpcError](RpcError.md).[code](RpcError.md#code-1)

#### Defined in

[src/utils/aepp-wallet-communication/schema.ts:129](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/schema.ts#L129)

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
