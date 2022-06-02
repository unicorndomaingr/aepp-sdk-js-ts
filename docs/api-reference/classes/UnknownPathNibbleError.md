[api-reference](../README.md) / UnknownPathNibbleError

# Class: UnknownPathNibbleError

## Hierarchy

- [`CryptographyError`](CryptographyError.md)

  ↳ **`UnknownPathNibbleError`**

## Table of contents

### Constructors

- [constructor](UnknownPathNibbleError.md#constructor)

### Properties

- [message](UnknownPathNibbleError.md#message)
- [name](UnknownPathNibbleError.md#name)
- [stack](UnknownPathNibbleError.md#stack)
- [prepareStackTrace](UnknownPathNibbleError.md#preparestacktrace)
- [stackTraceLimit](UnknownPathNibbleError.md#stacktracelimit)

### Methods

- [captureStackTrace](UnknownPathNibbleError.md#capturestacktrace)

## Constructors

### constructor

• **new UnknownPathNibbleError**(`nibble`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `nibble` | `number` |

#### Overrides

[CryptographyError](CryptographyError.md).[constructor](CryptographyError.md#constructor)

#### Defined in

[src/utils/errors.ts:445](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/errors.ts#L445)

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
