[api-reference](../README.md) / BrowserRuntimeConnection

# Class: BrowserRuntimeConnection

BrowserRuntimeConnection
Handle browser runtime communication

## Hierarchy

- `default`

  ↳ **`BrowserRuntimeConnection`**

## Table of contents

### Constructors

- [constructor](BrowserRuntimeConnection.md#constructor)

### Properties

- [debug](BrowserRuntimeConnection.md#debug)
- [port](BrowserRuntimeConnection.md#port)

### Methods

- [connect](BrowserRuntimeConnection.md#connect)
- [disconnect](BrowserRuntimeConnection.md#disconnect)
- [isConnected](BrowserRuntimeConnection.md#isconnected)
- [receiveMessage](BrowserRuntimeConnection.md#receivemessage)
- [sendMessage](BrowserRuntimeConnection.md#sendmessage)

## Constructors

### constructor

• **new BrowserRuntimeConnection**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.debug` | `boolean` |
| `__namedParameters.port` | `Port` |

#### Overrides

BrowserConnection.constructor

#### Defined in

[src/utils/aepp-wallet-communication/connection/BrowserRuntime.ts:28](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/connection/BrowserRuntime.ts#L28)

## Properties

### debug

• **debug**: `boolean`

#### Inherited from

BrowserConnection.debug

#### Defined in

[src/utils/aepp-wallet-communication/connection/Browser.ts:24](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/connection/Browser.ts#L24)

___

### port

• **port**: `Port`

#### Defined in

[src/utils/aepp-wallet-communication/connection/BrowserRuntime.ts:26](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/connection/BrowserRuntime.ts#L26)

## Methods

### connect

▸ **connect**(`onMessage`, `onDisconnect`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `onMessage` | (`message`: `any`, `origin`: `string`, `source`: `Port`) => `void` |
| `onDisconnect` | () => `void` |

#### Returns

`void`

#### Overrides

BrowserConnection.connect

#### Defined in

[src/utils/aepp-wallet-communication/connection/BrowserRuntime.ts:38](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/connection/BrowserRuntime.ts#L38)

___

### disconnect

▸ **disconnect**(): `void`

#### Returns

`void`

#### Overrides

BrowserConnection.disconnect

#### Defined in

[src/utils/aepp-wallet-communication/connection/BrowserRuntime.ts:33](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/connection/BrowserRuntime.ts#L33)

___

### isConnected

▸ **isConnected**(): `boolean`

#### Returns

`boolean`

#### Overrides

BrowserConnection.isConnected

#### Defined in

[src/utils/aepp-wallet-communication/connection/BrowserRuntime.ts:55](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/connection/BrowserRuntime.ts#L55)

___

### receiveMessage

▸ `Protected` **receiveMessage**(`message`): `void`

Send message

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `any` |

#### Returns

`void`

#### Inherited from

BrowserConnection.receiveMessage

#### Defined in

[src/utils/aepp-wallet-communication/connection/Browser.ts:52](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/connection/Browser.ts#L52)

___

### sendMessage

▸ **sendMessage**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `any` |

#### Returns

`void`

#### Overrides

BrowserConnection.sendMessage

#### Defined in

[src/utils/aepp-wallet-communication/connection/BrowserRuntime.ts:50](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/connection/BrowserRuntime.ts#L50)
