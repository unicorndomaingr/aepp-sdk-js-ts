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
 * Browser window Post Message connector module
 *
 * This is the complement to
 * {@link module:@aeternity/aepp-sdk/es/utils/aepp-wallet-communication/connection}.
 * @module @aeternity/aepp-sdk/es/utils/aepp-wallet-communication/connection/browser-window-message
 * @export BrowserWindowMessageConnection
 * @example
 * import BrowserWindowMessageConnection
 * from '@aeternity/aepp-sdk/es/utils/aepp-wallet-communication/connection/browser-window-message'
 */
import WalletConnection from '.'
import { v4 as uuid } from '@aeternity/uuid'
import { MESSAGE_DIRECTION } from '../schema'
import { getBrowserAPI, isInIframe } from '../helpers'
import {
  AlreadyConnectedError,
  NoWalletConnectedError,
  MessageDirectionError
} from '../../errors'

const getTarget = (): Window | undefined => {
  const isExtensionContext = typeof getBrowserAPI(true).extension === 'object'
  const isWeb = window?.location?.protocol.startsWith('http')
  const isContentScript = isExtensionContext && isWeb
  if (isContentScript) return window
  // When we is the main page we need to decide the target by our self
  // Probably can be implemented some algo for checking DOM for Iframes and somehow decide which
  // Iframe to talk
  return isInIframe() ? window.parent : undefined
}

/**
 * BrowserWindowMessageConnection
 * @alias module:@aeternity/aepp-sdk/es/utils/aepp-wallet-communication\
 * /connection/browser-window-message
 * @param {Object} [params={}] - Initializer object
 * @param {Object} [params.target=window.parent] - Target window for message
 * @param {Object} [params.self=window] - Host window for message
 * @param {Object} [params.origin] - Origin of receiver
 * @param {String} [params.sendDirection] Wrapping messages into additional struct
 * ({ type: 'to_aepp' || 'to_waellet', data })
 * Used for handling messages between content script and page
 * @param {String} [params.receiveDirection='to_aepp'] Unwrapping messages from additional struct
 * ({ type: 'to_aepp' || 'to_waellet', data })
 * Used for handling messages between content script and page
 * @param {Object} [params.connectionInfo={}] - Connection info object
 * @param {Boolean} [params.debug=false] - Debug flag
 * @return {Object}
 */
export default class BrowserWindowMessageConnection implements WalletConnection {
  connectionInfo: {
    id?: string
    description?: string
    origin?: string
  }

  origin?: string
  debug: boolean
  forceOrigin: boolean
  sendDirection?: string
  receiveDirection: string
  subscribeFn: (listener: (this: Window, ev: MessageEvent<any>) => any) => any
  unsubscribeFn: (listener: (this: Window, ev: MessageEvent<any>) => any) => any
  postFn: (msg: any) => any
  listener: ((this: Window, ev: MessageEvent<any>) => any) | null

  constructor ({
    connectionInfo = {},
    target = getTarget(),
    self = window,
    origin,
    sendDirection,
    receiveDirection = MESSAGE_DIRECTION.to_aepp,
    debug = false,
    forceOrigin = false
  }: {
    connectionInfo?: {
      id?: string
      description?: string
      origin?: string
    }
    target?: Window
    self?: Window
    origin?: string
    sendDirection?: string
    receiveDirection?: string
    debug?: boolean
    forceOrigin?: boolean
  } = {}) {
    if (sendDirection != null && !Object.keys(MESSAGE_DIRECTION).includes(sendDirection)) throw new MessageDirectionError(`sendDirection must be one of [${JSON.stringify(Object.keys(MESSAGE_DIRECTION))}]`)
    if (!Object.keys(MESSAGE_DIRECTION).includes(receiveDirection)) throw new MessageDirectionError(`receiveDirection must be one of [${JSON.stringify(Object.keys(MESSAGE_DIRECTION))}]`)
    this.connectionInfo = { id: uuid(), ...connectionInfo }

    const selfP = self
    const targetP = target
    this.origin = origin
    this.debug = debug
    this.forceOrigin = forceOrigin
    this.sendDirection = sendDirection
    this.receiveDirection = receiveDirection
    this.subscribeFn = (listener) => selfP.addEventListener('message', listener, false)
    this.unsubscribeFn = (listener) => selfP.removeEventListener('message', listener, false)
    this.postFn = (msg) => targetP?.postMessage(msg, this.origin ?? '*')
  }

  /**
 * Check if connected
 * @instance
 * @returns is connected
 */
  isConnected (): boolean {
    return this.listener != null
  }

  /**
 * Connect
 * @instance
 * @param onMessage - Message handler
 */
  connect (onMessage: Function): void {
    const origin = this.origin
    const receiveDirection = this.receiveDirection
    const debug = this.debug
    const forceOrigin = this.forceOrigin
    if (this.listener != null) throw new AlreadyConnectedError('You already connected')

    this.listener = (msg: any) => {
      if (msg == null || typeof msg.data !== 'object') return
      if (!forceOrigin && origin != null && origin !== msg.origin) return
      if (debug) console.log('Receive message: ', msg)
      if (msg.data.type != null) {
        if (msg.data.type !== receiveDirection) return
        onMessage(msg.data.data, msg.origin, msg.source)
      } else {
        onMessage(msg.data, msg.origin, msg.source)
      }
    }
    this.subscribeFn(this.listener)
  }

  /**
 * Disconnect
 * @instance
 */
  disconnect (): void {
    if (this.listener == null) throw new NoWalletConnectedError('You dont have connection. Please connect before')
    this.unsubscribeFn(this.listener)
    this.listener = null
  }

  /**
 * Send message
 * @instance
 * @param msg - Message
 */
  sendMessage (msg: any): void {
    const message = this.sendDirection != null ? { type: this.sendDirection, data: msg } : msg
    if (this.debug) console.log('Send message: ', message)
    this.postFn(message)
  }
}
