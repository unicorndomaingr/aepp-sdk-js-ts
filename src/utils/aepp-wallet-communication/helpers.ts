/**
 * Browser helper functions
 */
import { NoBrowserFoundError } from '../errors'
// @ts-expect-error TODO remove when RPC migration is merged
import RpcClient from './rpc/rpc-client'

export const getBrowserAPI = (force = false): object => {
  const { chrome, browser } = window
  // Chrome, Opera support
  if (typeof chrome !== 'undefined' && chrome === Object(chrome)) return chrome
  // Firefox support
  if (typeof browser !== 'undefined' && browser === Object(browser)) return browser
  if (!force) throw new NoBrowserFoundError()
  return {}
}

export const isInIframe = (): boolean => window !== window.parent

// TODO remove and import from RPC when RPC migration is merged
interface Connection {
  sendMessage: (msg: Partial<Message>) => void
  isConnected: () => boolean
  disconnect: (forceConnectionClose?: boolean) => void
  connect: (
    handleMessage: (msg: any, origin: string) => void,
    disconnect: (connection: Connection) => void
  ) => void
  connectionInfo: {id: string}
  id: string
  origin?: string
  debug: boolean
  forceOrigin: boolean
  sendDirection?: string
  receiveDirection: string
  subscribeFn: Function
  unsubscribeFn: Function
  postFn: Function
  listener?: Function
}
// TODO remove and import from RPC when RPC migration is merged
interface Message {
  jsonrpc: string
  id: number
  method: string
  version: number
  params?: any
  result?: any
  error?: {
    code: number
    data?: any
    message: string
  }
}
// TODO remove and import from RPC when RPC migration is merged
interface Accounts {
  connected?: { [pub: string]: {} }
  current?: { [pub: string]: {} }
}

type SendMessage = (
  { id, method, params, result, error }: Message, isNotificationOrResponse?: boolean) => number

/**
 * RPC helper functions
 */
export const sendMessage = (connection: Connection): SendMessage => {
  let messageId = 0

  return ({
    id,
    method,
    params,
    result,
    error
  }: Message, isNotificationOrResponse: boolean = false): number => {
    // Increment id for each request
    isNotificationOrResponse || (messageId += 1)
    id = isNotificationOrResponse ? (id ?? null) : messageId
    const msgData = params != null
      ? { params }
      : result != null
        ? { result }
        : { error }
    connection.sendMessage({
      jsonrpc: '2.0',
      ...id != null ? { id } : {},
      method,
      ...msgData
    })
    return id
  }
}

export const getHandler = (
  schema: {[key: string]: Function},
  msg: Message,
  { debug = false } = {}): Function => {
  const handler = schema[msg.method]
  if (handler == null || typeof handler !== 'function') {
    debug && console.log(`Unknown message method ${msg.method}`)
    return () => async () => true
  }
  return handler
}

export const message = (method: string, params: object = {}): {
  method: string
  params: object
} => ({ method, params })

export const responseMessage = (id: number,
  method: string,
  { error, result }: { error?: any, result?: any} = {}): Partial<Message> =>
  ({ id, method, ...(error != null ? { error } : { result }) })

export const sendResponseMessage = (client: RpcClient) => (id: number, method: string, data: any) =>
  client.sendMessage(responseMessage(id, method, data), true)

export const isValidAccounts = (accounts: Accounts): boolean => {
  return (typeof accounts === 'object') &&
  (typeof accounts.connected === 'object') &&
  (typeof accounts.current === 'object')
}
