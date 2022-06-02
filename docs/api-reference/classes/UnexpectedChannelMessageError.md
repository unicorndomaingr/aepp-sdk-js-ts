[api-reference](../README.md) / UnexpectedChannelMessageError

# Class: UnexpectedChannelMessageError

## Hierarchy

- [`ChannelError`](ChannelError.md)

  ↳ **`UnexpectedChannelMessageError`**

## Table of contents

### Constructors

- [constructor](UnexpectedChannelMessageError.md#constructor)

### Properties

- [message](UnexpectedChannelMessageError.md#message)
- [name](UnexpectedChannelMessageError.md#name)
- [stack](UnexpectedChannelMessageError.md#stack)
- [prepareStackTrace](UnexpectedChannelMessageError.md#preparestacktrace)
- [stackTraceLimit](UnexpectedChannelMessageError.md#stacktracelimit)

### Methods

- [captureStackTrace](UnexpectedChannelMessageError.md#capturestacktrace)

## Constructors

### constructor

• **new UnexpectedChannelMessageError**(`message`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Overrides

[ChannelError](ChannelError.md).[constructor](ChannelError.md#constructor)

#### Defined in

[src/utils/errors.ts:289](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/errors.ts#L289)

## Properties

### message

• **message**: `string`

#### Inherited from

[ChannelError](ChannelError.md).[message](ChannelError.md#message)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

___

### name

• **name**: `string`

#### Inherited from

[ChannelError](ChannelError.md).[name](ChannelError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[ChannelError](ChannelError.md).[stack](ChannelError.md#stack)

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

[ChannelError](ChannelError.md).[prepareStackTrace](ChannelError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[ChannelError](ChannelError.md).[stackTraceLimit](ChannelError.md#stacktracelimit)

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

[ChannelError](ChannelError.md).[captureStackTrace](ChannelError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:4
