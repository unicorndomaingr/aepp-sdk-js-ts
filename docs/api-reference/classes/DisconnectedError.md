[api-reference](../README.md) / DisconnectedError

# Class: DisconnectedError

## Hierarchy

- [`NodeError`](NodeError.md)

  ↳ **`DisconnectedError`**

## Table of contents

### Constructors

- [constructor](DisconnectedError.md#constructor)

### Properties

- [message](DisconnectedError.md#message)
- [name](DisconnectedError.md#name)
- [stack](DisconnectedError.md#stack)
- [prepareStackTrace](DisconnectedError.md#preparestacktrace)
- [stackTraceLimit](DisconnectedError.md#stacktracelimit)

### Methods

- [captureStackTrace](DisconnectedError.md#capturestacktrace)

## Constructors

### constructor

• **new DisconnectedError**()

#### Overrides

[NodeError](NodeError.md).[constructor](NodeError.md#constructor)

#### Defined in

[src/utils/errors.ts:453](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/errors.ts#L453)

## Properties

### message

• **message**: `string`

#### Inherited from

[NodeError](NodeError.md).[message](NodeError.md#message)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

___

### name

• **name**: `string`

#### Inherited from

[NodeError](NodeError.md).[name](NodeError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[NodeError](NodeError.md).[stack](NodeError.md#stack)

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

[NodeError](NodeError.md).[prepareStackTrace](NodeError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[NodeError](NodeError.md).[stackTraceLimit](NodeError.md#stacktracelimit)

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

[NodeError](NodeError.md).[captureStackTrace](NodeError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:4
