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
 * Wallet Detector
 *
 * This is the complement to {@link module:@aeternity/aepp-sdk/es/utils}.
 * @module @aeternity/aepp-sdk/es/utils/aepp-wallet-communication/wallet-detector
 * @export WalletDetector
 */
// @ts-expect-error TODO remove
import BrowserWindowMessageConnection from './connection/browser-window-message'
import { MESSAGE_DIRECTION, METHODS } from './schema'
import { UnsupportedPlatformError } from '../errors'
// @ts-expect-error TODO remove
import { WalletConnection } from '../aepp-wallet-communication/connection'

type FixAny = any

/**
 * WalletDetector
 * @function
 * @alias module:@aeternity/aepp-sdk/es/utils/aepp-wallet-communication/wallet-detector
 * @rtype Class
 * @param params - Initializer object
 * @returns WalletDetector
 */
export default class WalletDetector {
  connection: WalletConnection
  wallets: FixAny

  constructor ({ connection }: { connection: WalletConnection }) {
    if (window != null) throw new UnsupportedPlatformError('Window object not found, you can run wallet detector only in browser')
    this.connection = connection ?? BrowserWindowMessageConnection({ connectionInfo: { id: 'spy' } })
    this.wallets = {}
  }

  /**
   * Start scanning
   * @function scan
   * @instance
   * @param onDetected Call-back function which trigger on new wallet
   */
  scan (onDetected: Function): void {
    const { wallets } = this
    this.connection.connect(({ method, params }: {
      method: string
      params: any },
    origin: string,
    source: string) => {
      if (
        method == null || params == null ||
        method !== METHODS.readyToConnect || wallets[params.id] != null
      ) return

      const wallet = {
        ...params,
        async getConnection () {
          // if detect extension wallet or page wallet
          const isExtension = this.type === 'extension'
          const origin = isExtension ? window.origin : this.origin
          return BrowserWindowMessageConnection({
            connectionInfo: this,
            sendDirection: isExtension ? MESSAGE_DIRECTION.to_waellet : undefined,
            receiveDirection: isExtension ? MESSAGE_DIRECTION.to_aepp : undefined,
            target: source,
            origin
          })
        }
      }
      wallets[wallet.id] = wallet
      onDetected({ wallets, newWallet: wallet })
    })
    if (Object.keys(wallets).length > 0) onDetected({ wallets })
  }

  /**
  * Stop scanning
  * @function stopScan
  * @instance
  */
  stopScan (): void {
    this.connection.disconnect()
  }
}
