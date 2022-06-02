[api-reference](../README.md) / TagNotFoundError

# Class: TagNotFoundError

## Hierarchy

- [`TransactionError`](TransactionError.md)

  ↳ **`TagNotFoundError`**

## Table of contents

### Constructors

- [constructor](TagNotFoundError.md#constructor)

### Properties

- [message](TagNotFoundError.md#message)
- [name](TagNotFoundError.md#name)
- [stack](TagNotFoundError.md#stack)
- [prepareStackTrace](TagNotFoundError.md#preparestacktrace)
- [stackTraceLimit](TagNotFoundError.md#stacktracelimit)

### Methods

- [captureStackTrace](TagNotFoundError.md#capturestacktrace)

## Constructors

### constructor

• **new TagNotFoundError**(`prefix`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string` |

#### Overrides

[TransactionError](TransactionError.md).[constructor](TransactionError.md#constructor)

#### Defined in

[src/utils/errors.ts:545](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/errors.ts#L545)

## Properties

### message

• **message**: `string`

#### Inherited from

[TransactionError](TransactionError.md).[message](TransactionError.md#message)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

___

### name

• **name**: `string`

#### Inherited from

[TransactionError](TransactionError.md).[name](TransactionError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[TransactionError](TransactionError.md).[stack](TransactionError.md#stack)

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

[TransactionError](TransactionError.md).[prepareStackTrace](TransactionError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[TransactionError](TransactionError.md).[stackTraceLimit](TransactionError.md#stacktracelimit)

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

[TransactionError](TransactionError.md).[captureStackTrace](TransactionError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:4
