[api-reference](../README.md) / MissingEventDefinitionError

# Class: MissingEventDefinitionError

## Hierarchy

- [`ContractError`](ContractError.md)

  ↳ **`MissingEventDefinitionError`**

## Table of contents

### Constructors

- [constructor](MissingEventDefinitionError.md#constructor)

### Properties

- [message](MissingEventDefinitionError.md#message)
- [name](MissingEventDefinitionError.md#name)
- [stack](MissingEventDefinitionError.md#stack)
- [prepareStackTrace](MissingEventDefinitionError.md#preparestacktrace)
- [stackTraceLimit](MissingEventDefinitionError.md#stacktracelimit)

### Methods

- [captureStackTrace](MissingEventDefinitionError.md#capturestacktrace)

## Constructors

### constructor

• **new MissingEventDefinitionError**(`eventNameHash`, `eventAddress`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventNameHash` | `string` |
| `eventAddress` | `string` |

#### Overrides

[ContractError](ContractError.md).[constructor](ContractError.md#constructor)

#### Defined in

[src/utils/errors.ts:388](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/errors.ts#L388)

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
