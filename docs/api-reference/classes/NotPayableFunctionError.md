[api-reference](../README.md) / NotPayableFunctionError

# Class: NotPayableFunctionError

## Hierarchy

- [`ContractError`](ContractError.md)

  ↳ **`NotPayableFunctionError`**

## Table of contents

### Constructors

- [constructor](NotPayableFunctionError.md#constructor)

### Properties

- [message](NotPayableFunctionError.md#message)
- [name](NotPayableFunctionError.md#name)
- [stack](NotPayableFunctionError.md#stack)
- [prepareStackTrace](NotPayableFunctionError.md#preparestacktrace)
- [stackTraceLimit](NotPayableFunctionError.md#stacktracelimit)

### Methods

- [captureStackTrace](NotPayableFunctionError.md#capturestacktrace)

## Constructors

### constructor

• **new NotPayableFunctionError**(`amount`, `fn`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `string` |
| `fn` | `string` |

#### Overrides

[ContractError](ContractError.md).[constructor](ContractError.md#constructor)

#### Defined in

[src/utils/errors.ts:379](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/errors.ts#L379)

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
