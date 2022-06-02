[api-reference](../README.md) / MissingCallbackError

# Class: MissingCallbackError

## Hierarchy

- [`AeppError`](AeppError.md)

  ↳ **`MissingCallbackError`**

## Table of contents

### Constructors

- [constructor](MissingCallbackError.md#constructor)

### Properties

- [message](MissingCallbackError.md#message)
- [name](MissingCallbackError.md#name)
- [stack](MissingCallbackError.md#stack)
- [prepareStackTrace](MissingCallbackError.md#preparestacktrace)
- [stackTraceLimit](MissingCallbackError.md#stacktracelimit)

### Methods

- [captureStackTrace](MissingCallbackError.md#capturestacktrace)

## Constructors

### constructor

• **new MissingCallbackError**(`id`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Overrides

[AeppError](AeppError.md).[constructor](AeppError.md#constructor)

#### Defined in

[src/utils/errors.ts:239](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/errors.ts#L239)

## Properties

### message

• **message**: `string`

#### Inherited from

[AeppError](AeppError.md).[message](AeppError.md#message)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

___

### name

• **name**: `string`

#### Inherited from

[AeppError](AeppError.md).[name](AeppError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[AeppError](AeppError.md).[stack](AeppError.md#stack)

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

[AeppError](AeppError.md).[prepareStackTrace](AeppError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[AeppError](AeppError.md).[stackTraceLimit](AeppError.md#stacktracelimit)

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

[AeppError](AeppError.md).[captureStackTrace](AeppError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:4
