[api-reference](../README.md) / InvalidAensNameError

# Class: InvalidAensNameError

## Hierarchy

- [`AensError`](AensError.md)

  ↳ **`InvalidAensNameError`**

## Table of contents

### Constructors

- [constructor](InvalidAensNameError.md#constructor)

### Properties

- [message](InvalidAensNameError.md#message)
- [name](InvalidAensNameError.md#name)
- [stack](InvalidAensNameError.md#stack)
- [prepareStackTrace](InvalidAensNameError.md#preparestacktrace)
- [stackTraceLimit](InvalidAensNameError.md#stacktracelimit)

### Methods

- [captureStackTrace](InvalidAensNameError.md#capturestacktrace)

## Constructors

### constructor

• **new InvalidAensNameError**(`message`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Overrides

[AensError](AensError.md).[constructor](AensError.md#constructor)

#### Defined in

[src/utils/errors.ts:224](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/errors.ts#L224)

## Properties

### message

• **message**: `string`

#### Inherited from

[AensError](AensError.md).[message](AensError.md#message)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

___

### name

• **name**: `string`

#### Inherited from

[AensError](AensError.md).[name](AensError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[AensError](AensError.md).[stack](AensError.md#stack)

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

[AensError](AensError.md).[prepareStackTrace](AensError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[AensError](AensError.md).[stackTraceLimit](AensError.md#stacktracelimit)

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

[AensError](AensError.md).[captureStackTrace](AensError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:4
