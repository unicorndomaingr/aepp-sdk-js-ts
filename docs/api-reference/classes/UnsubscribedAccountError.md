[api-reference](../README.md) / UnsubscribedAccountError

# Class: UnsubscribedAccountError

## Hierarchy

- [`AeppError`](AeppError.md)

  ↳ **`UnsubscribedAccountError`**

## Table of contents

### Constructors

- [constructor](UnsubscribedAccountError.md#constructor)

### Properties

- [message](UnsubscribedAccountError.md#message)
- [name](UnsubscribedAccountError.md#name)
- [stack](UnsubscribedAccountError.md#stack)
- [prepareStackTrace](UnsubscribedAccountError.md#preparestacktrace)
- [stackTraceLimit](UnsubscribedAccountError.md#stacktracelimit)

### Methods

- [captureStackTrace](UnsubscribedAccountError.md#capturestacktrace)

## Constructors

### constructor

• **new UnsubscribedAccountError**()

#### Overrides

[AeppError](AeppError.md).[constructor](AeppError.md#constructor)

#### Defined in

[src/utils/errors.ts:260](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/errors.ts#L260)

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
