[api-reference](../README.md) / NodeError

# Class: NodeError

## Hierarchy

- [`BaseError`](BaseError.md)

  ↳ **`NodeError`**

  ↳↳ [`DisconnectedError`](DisconnectedError.md)

  ↳↳ [`DuplicateNodeError`](DuplicateNodeError.md)

  ↳↳ [`NodeNotFoundError`](NodeNotFoundError.md)

## Table of contents

### Constructors

- [constructor](NodeError.md#constructor)

### Properties

- [message](NodeError.md#message)
- [name](NodeError.md#name)
- [stack](NodeError.md#stack)
- [prepareStackTrace](NodeError.md#preparestacktrace)
- [stackTraceLimit](NodeError.md#stacktracelimit)

### Methods

- [captureStackTrace](NodeError.md#capturestacktrace)

## Constructors

### constructor

• **new NodeError**(`message`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Overrides

[BaseError](BaseError.md).[constructor](BaseError.md#constructor)

#### Defined in

[src/utils/errors.ts:67](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/errors.ts#L67)

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
