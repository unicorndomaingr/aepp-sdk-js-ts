[api-reference](../README.md) / UnsupportedVersionError

# Class: UnsupportedVersionError

## Hierarchy

- [`BaseError`](BaseError.md)

  ↳ **`UnsupportedVersionError`**

## Table of contents

### Constructors

- [constructor](UnsupportedVersionError.md#constructor)

### Properties

- [message](UnsupportedVersionError.md#message)
- [name](UnsupportedVersionError.md#name)
- [stack](UnsupportedVersionError.md#stack)
- [prepareStackTrace](UnsupportedVersionError.md#preparestacktrace)
- [stackTraceLimit](UnsupportedVersionError.md#stacktracelimit)

### Methods

- [captureStackTrace](UnsupportedVersionError.md#capturestacktrace)

## Constructors

### constructor

• **new UnsupportedVersionError**(`dependency`, `version`, `geVersion`, `ltVersion`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dependency` | `string` |
| `version` | `string` |
| `geVersion` | `string` |
| `ltVersion` | `string` |

#### Overrides

[BaseError](BaseError.md).[constructor](BaseError.md#constructor)

#### Defined in

[src/utils/errors.ts:180](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/errors.ts#L180)

## Properties

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
