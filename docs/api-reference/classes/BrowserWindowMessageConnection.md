[api-reference](../README.md) / BrowserWindowMessageConnection

# Class: BrowserWindowMessageConnection

Browser window Post Message connector module

**`param`** Initializer object

**`param`** Target window for message

**`param`** Host window for message

**`param`** Origin of receiver

**`param`** Wrapping messages into additional struct
({ type: 'to_aepp' || 'to_waellet', data })
Used for handling messages between content script and page

**`param`** Unwrapping messages from additional struct

## Hierarchy

- `default`

  ↳ **`BrowserWindowMessageConnection`**

## Table of contents

### Constructors

- [constructor](BrowserWindowMessageConnection.md#constructor)

### Properties

- [debug](BrowserWindowMessageConnection.md#debug)
- [listener](BrowserWindowMessageConnection.md#listener)
- [origin](BrowserWindowMessageConnection.md#origin)
- [receiveDirection](BrowserWindowMessageConnection.md#receivedirection)
- [sendDirection](BrowserWindowMessageConnection.md#senddirection)

### Methods

- [connect](BrowserWindowMessageConnection.md#connect)
- [disconnect](BrowserWindowMessageConnection.md#disconnect)
- [isConnected](BrowserWindowMessageConnection.md#isconnected)
- [receiveMessage](BrowserWindowMessageConnection.md#receivemessage)
- [sendMessage](BrowserWindowMessageConnection.md#sendmessage)

## Constructors

### constructor

• **new BrowserWindowMessageConnection**(`__namedParameters?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.debug?` | `boolean` |
| `__namedParameters.origin?` | `string` |
| `__namedParameters.receiveDirection?` | [`MESSAGE_DIRECTION`](../enums/MESSAGE_DIRECTION.md) |
| `__namedParameters.self?` | `Window` |
| `__namedParameters.sendDirection?` | [`MESSAGE_DIRECTION`](../enums/MESSAGE_DIRECTION.md) |
| `__namedParameters.target?` | `Window` |

#### Overrides

BrowserConnection.constructor

#### Defined in

[src/utils/aepp-wallet-communication/connection/BrowserWindowMessage.ts:42](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/connection/BrowserWindowMessage.ts#L42)

## Properties

### debug

• **debug**: `boolean`

#### Inherited from

BrowserConnection.debug

#### Defined in

[src/utils/aepp-wallet-communication/connection/Browser.ts:24](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/connection/Browser.ts#L24)

___

### listener

• `Optional` **listener**: (`this`: `Window`, `ev`: `MessageEvent`<`any`\>) => `void`

#### Type declaration

▸ (`this`, `ev`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `Window` |
| `ev` | `MessageEvent`<`any`\> |

##### Returns

`void`

#### Defined in

[src/utils/aepp-wallet-communication/connection/BrowserWindowMessage.ts:37](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/connection/BrowserWindowMessage.ts#L37)

___

### origin

• `Optional` **origin**: `string`

#### Defined in

[src/utils/aepp-wallet-communication/connection/BrowserWindowMessage.ts:34](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/connection/BrowserWindowMessage.ts#L34)

___

### receiveDirection

• **receiveDirection**: [`MESSAGE_DIRECTION`](../enums/MESSAGE_DIRECTION.md)

#### Defined in

[src/utils/aepp-wallet-communication/connection/BrowserWindowMessage.ts:36](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/connection/BrowserWindowMessage.ts#L36)

___

### sendDirection

• `Optional` **sendDirection**: [`MESSAGE_DIRECTION`](../enums/MESSAGE_DIRECTION.md)

#### Defined in

[src/utils/aepp-wallet-communication/connection/BrowserWindowMessage.ts:35](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/connection/BrowserWindowMessage.ts#L35)

## Methods

### connect

▸ **connect**(`onMessage`, `onDisconnect`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `onMessage` | (`message`: `any`, `origin`: `string`, `source`: ``null`` \| `MessageEventSource`) => `void` |
| `onDisconnect` | () => `void` |

#### Returns

`void`

#### Overrides

BrowserConnection.connect

#### Defined in

[src/utils/aepp-wallet-communication/connection/BrowserWindowMessage.ts:69](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/connection/BrowserWindowMessage.ts#L69)

___

### disconnect

▸ **disconnect**(): `void`

#### Returns

`void`

#### Overrides

BrowserConnection.disconnect

#### Defined in

[src/utils/aepp-wallet-communication/connection/BrowserWindowMessage.ts:90](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/connection/BrowserWindowMessage.ts#L90)

___

### isConnected

▸ **isConnected**(): `boolean`

#### Returns

`boolean`

#### Overrides

BrowserConnection.isConnected

#### Defined in

[src/utils/aepp-wallet-communication/connection/BrowserWindowMessage.ts:65](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/connection/BrowserWindowMessage.ts#L65)

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

▸ **sendMessage**(`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `MessageEvent`<`any`\> |

#### Returns

`void`

#### Overrides

BrowserConnection.sendMessage

#### Defined in

[src/utils/aepp-wallet-communication/connection/BrowserWindowMessage.ts:101](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/aepp-wallet-communication/connection/BrowserWindowMessage.ts#L101)
