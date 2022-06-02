[api-reference](../README.md) / ContractError

# Class: ContractError

## Hierarchy

- [`BaseError`](BaseError.md)

  ↳ **`ContractError`**

  ↳↳ [`BytecodeMismatchError`](BytecodeMismatchError.md)

  ↳↳ [`DuplicateContractError`](DuplicateContractError.md)

  ↳↳ [`InactiveContractError`](InactiveContractError.md)

  ↳↳ [`InvalidMethodInvocationError`](InvalidMethodInvocationError.md)

  ↳↳ [`MissingContractAddressError`](MissingContractAddressError.md)

  ↳↳ [`MissingContractDefError`](MissingContractDefError.md)

  ↳↳ [`MissingFunctionNameError`](MissingFunctionNameError.md)

  ↳↳ [`NodeInvocationError`](NodeInvocationError.md)

  ↳↳ [`NoSuchContractFunctionError`](NoSuchContractFunctionError.md)

  ↳↳ [`NotPayableFunctionError`](NotPayableFunctionError.md)

  ↳↳ [`MissingEventDefinitionError`](MissingEventDefinitionError.md)

  ↳↳ [`AmbiguousEventDefinitionError`](AmbiguousEventDefinitionError.md)

## Table of contents

### Constructors

- [constructor](ContractError.md#constructor)

### Properties

- [message](ContractError.md#message)
- [name](ContractError.md#name)
- [stack](ContractError.md#stack)
- [prepareStackTrace](ContractError.md#preparestacktrace)
- [stackTraceLimit](ContractError.md#stacktracelimit)

### Methods

- [captureStackTrace](ContractError.md#capturestacktrace)

## Constructors

### constructor

• **new ContractError**(`message`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Overrides

[BaseError](BaseError.md).[constructor](BaseError.md#constructor)

#### Defined in

[src/utils/errors.ts:53](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/errors.ts#L53)

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
