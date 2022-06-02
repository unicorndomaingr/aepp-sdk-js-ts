[api-reference](../README.md) / IllegalArgumentError

# Class: IllegalArgumentError

## Hierarchy

- [`CryptographyError`](CryptographyError.md)

  ↳ **`IllegalArgumentError`**

## Table of contents

### Constructors

- [constructor](IllegalArgumentError.md#constructor)

### Properties

- [message](IllegalArgumentError.md#message)
- [name](IllegalArgumentError.md#name)
- [stack](IllegalArgumentError.md#stack)
- [prepareStackTrace](IllegalArgumentError.md#preparestacktrace)
- [stackTraceLimit](IllegalArgumentError.md#stacktracelimit)

### Methods

- [captureStackTrace](IllegalArgumentError.md#capturestacktrace)

## Constructors

### constructor

• **new IllegalArgumentError**(`message`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Overrides

[CryptographyError](CryptographyError.md).[constructor](CryptographyError.md#constructor)

#### Defined in

[src/utils/errors.ts:96](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/errors.ts#L96)

## Properties

### message

• **message**: `string`

#### Inherited from

[CryptographyError](CryptographyError.md).[message](CryptographyError.md#message)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

___

### name

• **name**: `string`

#### Inherited from

[CryptographyError](CryptographyError.md).[name](CryptographyError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[CryptographyError](CryptographyError.md).[stack](CryptographyError.md#stack)

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

[CryptographyError](CryptographyError.md).[prepareStackTrace](CryptographyError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[CryptographyError](CryptographyError.md).[stackTraceLimit](CryptographyError.md#stacktracelimit)

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

[CryptographyError](CryptographyError.md).[captureStackTrace](CryptographyError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:4
