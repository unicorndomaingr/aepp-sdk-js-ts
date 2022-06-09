/*
 * ISC License (ISC)
 * Copyright (c) 2022 aeternity developers
 *
 *  Permission to use, copy, modify, and/or distribute this software for any
 *  purpose with or without fee is hereby granted, provided that the above
 *  copyright notice and this permission notice appear in all copies.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 *  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 *  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 *  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 *  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 *  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 *  PERFORMANCE OF THIS SOFTWARE.
 */

/**
 * Wallet module
 * @module @aeternity/aepp-sdk/es/ae/wallet
 * @export Wallet
 * @example import { RpcWallet } from '@aeternity/aepp-sdk'
 */

import stampit from '@stamp/it'
import Ae from '.'
import WalletRpc from '../utils/aepp-wallet-communication/rpc/wallet-rpc'

/**
 * Wallet Stamp
 * @alias module:@aeternity/aepp-sdk/es/ae/wallet
 * @param options - Initializer object
 * @param options.url - Node instance to connect to
 * @param options.accounts - Accounts to initialize with
 * @param options.account - Public key of account to preselect
 * @return Wallet instance
 * @example
 * Wallet({
 * url: 'https://testnet.aeternity.io/',
 * accounts: [MemoryAccount({keypair})],
 * address: keypair.publicKey,
 * })
 */
export default stampit.compose(Ae, WalletRpc)
