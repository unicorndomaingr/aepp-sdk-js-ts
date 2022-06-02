[api-reference](../README.md) / Keystore

# Interface: Keystore

## Table of contents

### Properties

- [crypto](Keystore.md#crypto)
- [id](Keystore.md#id)
- [name](Keystore.md#name)
- [public\_key](Keystore.md#public_key)
- [version](Keystore.md#version)

## Properties

### crypto

• **crypto**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `cipher_params` | { `nonce`: `string`  } |
| `cipher_params.nonce` | `string` |
| `ciphertext` | `string` |
| `kdf` | ``"argon2id"`` |
| `kdf_params` | { `memlimit_kib`: `number` ; `opslimit`: `number` ; `parallelism`: `number` ; `salt`: `string`  } |
| `kdf_params.memlimit_kib` | `number` |
| `kdf_params.opslimit` | `number` |
| `kdf_params.parallelism` | `number` |
| `kdf_params.salt` | `string` |
| `secret_type` | ``"ed25519"`` |
| `symmetric_alg` | ``"xsalsa20-poly1305"`` |

#### Defined in

[src/utils/keystore.ts:50](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/keystore.ts#L50)

___

### id

• **id**: `string`

#### Defined in

[src/utils/keystore.ts:49](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/keystore.ts#L49)

___

### name

• **name**: `string`

#### Defined in

[src/utils/keystore.ts:46](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/keystore.ts#L46)

___

### public\_key

• **public\_key**: `string`

#### Defined in

[src/utils/keystore.ts:48](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/keystore.ts#L48)

___

### version

• **version**: ``1``

#### Defined in

[src/utils/keystore.ts:47](https://github.com/unicorndomaingr/aepp-sdk-js-ts/blob/e06cc9f0/src/utils/keystore.ts#L47)
