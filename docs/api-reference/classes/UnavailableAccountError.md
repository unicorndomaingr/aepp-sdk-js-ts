[api-reference](../README.md) / UnavailableAccountError

# Class: UnavailableAccountError

## Hierarchy

- [`AccountError`](AccountError.md)

  ↳ **`UnavailableAccountError`**

## Table of contents

### Constructors

- [constructor](UnavailableAccountError.md#constructor)

### Properties

- [message](UnavailableAccountError.md#message)
- [name](UnavailableAccountError.md#name)
- [stack](UnavailableAccountError.md#stack)
- [prepareStackTrace](UnavailableAccountError.md#preparestacktrace)
- [stackTraceLimit](UnavailableAccountError.md#stacktracelimit)

### Methods

- [captureStackTrace](UnavailableAccountError.md#capturestacktrace)

## Constructors

### constructor

• **new UnavailableAccountError**(`address`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Overrides

[AccountError](AccountError.md).[constructor](AccountError.md#constructor)

#### Defined in

[src/utils/errors.ts:202](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/errors.ts#L202)

## Properties

### message

• **message**: `string`

#### Inherited from

[AccountError](AccountError.md).[message](AccountError.md#message)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

___

### name

• **name**: `string`

#### Inherited from

[AccountError](AccountError.md).[name](AccountError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[AccountError](AccountError.md).[stack](AccountError.md#stack)

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

[AccountError](AccountError.md).[prepareStackTrace](AccountError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[AccountError](AccountError.md).[stackTraceLimit](AccountError.md#stacktracelimit)

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

[AccountError](AccountError.md).[captureStackTrace](AccountError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:4
