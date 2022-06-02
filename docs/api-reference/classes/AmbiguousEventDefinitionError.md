[api-reference](../README.md) / AmbiguousEventDefinitionError

# Class: AmbiguousEventDefinitionError

## Hierarchy

- [`ContractError`](ContractError.md)

  ↳ **`AmbiguousEventDefinitionError`**

## Table of contents

### Constructors

- [constructor](AmbiguousEventDefinitionError.md#constructor)

### Properties

- [message](AmbiguousEventDefinitionError.md#message)
- [name](AmbiguousEventDefinitionError.md#name)
- [stack](AmbiguousEventDefinitionError.md#stack)
- [prepareStackTrace](AmbiguousEventDefinitionError.md#preparestacktrace)
- [stackTraceLimit](AmbiguousEventDefinitionError.md#stacktracelimit)

### Methods

- [captureStackTrace](AmbiguousEventDefinitionError.md#capturestacktrace)

## Constructors

### constructor

• **new AmbiguousEventDefinitionError**(`eventAddress`, `matchedEvents`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventAddress` | `string` |
| `matchedEvents` | [`string`, `string`][] |

#### Overrides

[ContractError](ContractError.md).[constructor](ContractError.md#constructor)

#### Defined in

[src/utils/errors.ts:398](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/errors.ts#L398)

## Properties

### message

• **message**: `string`

#### Inherited from

[ContractError](ContractError.md).[message](ContractError.md#message)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

___

### name

• **name**: `string`

#### Inherited from

[ContractError](ContractError.md).[name](ContractError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[ContractError](ContractError.md).[stack](ContractError.md#stack)

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

[ContractError](ContractError.md).[prepareStackTrace](ContractError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[ContractError](ContractError.md).[stackTraceLimit](ContractError.md#stacktracelimit)

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

[ContractError](ContractError.md).[captureStackTrace](ContractError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:4
