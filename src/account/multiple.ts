/*
 * ISC License (ISC)
 * Copyright (c) 2018 aeternity developers
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
 * AccountMultiple module
 * @module @aeternity/aepp-sdk/es/accounts/multiple
 * @export AccountMultiple
 */

// @ts-ignore TODO: remove me
import AsyncInit from '../utils/async-init'
import MemoryAccount from './memory'
// @ts-ignore TODO: remove me
import { decode } from '../tx/builder/helpers'
import AccountBase, { isAccountBase } from './base'
import { AccountBase as IAccountBase } from './base.types'
import { UnavailableAccountError, TypeError } from '../utils/errors'
import { Multiple } from './multiple.types'
import stampit from '@stamp/it'

/**
 * AccountMultiple stamp
 *
 * The purpose of this stamp is to wrap up implementations of
 * {@link module:@aeternity/aepp-sdk/es/account/base--AccountBase} objects and provide a
 * common interface to all of them. List are a substantial part of
 * {@link module:@aeternity/aepp-sdk/es/ae/wallet--Wallet}s.
 * @function
 * @alias module:@aeternity/aepp-sdk/es/accounts/multiple
 * @rtype Stamp
 * @param {Object} [options={}] - Initializer object
 * @param {Array} [options.accounts] - Accounts array
 * @param {String} [options.address] - Address of account to select
 * @return {Object} AccountMultiple instance
 * @example
 * const accounts = await AccountMultiple({
 *   accounts: [MemoryAccount({ keypair: 'keypair_object' })]
 * })
 * await accounts.addAccount(account, { select: true }) // Add account and make it selected
 * accounts.removeAccount(address) // Remove account
 * accounts.selectAccount(address) // Select account
 * accounts.addresses() // Get available accounts
 */
export default AccountBase.compose<Multiple>(AsyncInit, {
  async init (this:Multiple, {
    accounts = [],
    address
  }: {
    accounts: Multiple['accounts'];
    address?: string;
  }) {
    this.accounts = Object.fromEntries(
      await Promise.all(accounts.map(async (a) => [await a.address(), a]))
    )
    address = address || Object.keys(this.accounts)[0]
    if (address) this.selectAccount(address)
  },
  props: {
    accounts: {}
  },
  deepProps: {
    selectedAddress: null
  },
  methods: {
    async address (this: Multiple, { onAccount = this.selectedAddress } = {}) {
      if (onAccount) { return this._resolveAccount(onAccount).address() }
    },
    async sign (
      this: Multiple,
      data,
      { onAccount = this.selectedAddress } = {}
    ) {
      if (onAccount) return this._resolveAccount(onAccount).sign(data)
    },
    addresses (this:Multiple) {
      return Object.keys(this.accounts)
    },
    async addAccount (this:Multiple, account, { select }: { select?: boolean } = {}) {
      const address = await account.address();
      (this.accounts[address as keyof Multiple['accounts']] as IAccountBase) = account
      if (select) this.selectAccount(address)
    },
    removeAccount (this:Multiple, address) {
      if (!this.accounts[address as keyof Multiple['accounts']]) {
        console.warn(`removeAccount: Account for ${address} not available`)
        return
      }
      delete this.accounts[address as keyof Multiple['accounts']]
      if (this.selectedAddress === address) delete this.selectedAddress
    },
    selectAccount (this:Multiple, address) {
      decode(address, 'ak')
      if (!this.accounts[address as keyof Multiple['accounts']]) throw new UnavailableAccountError(address)
      this.selectedAddress = address
    },
    _resolveAccount (this: Multiple, account) {
      if (account === null) {
        throw new TypeError(
          'Account should be an address (ak-prefixed string), ' +
            'keypair, or instance of account base, got null instead'
        )
      } else {
        switch (typeof account) {
          case 'string':
            decode(account, 'ak')
            if (!this.accounts[account as keyof Multiple['accounts']]) { throw new UnavailableAccountError(account) }
            return this.accounts[account as keyof Multiple['accounts']]
          case 'object':
            return isAccountBase(account)
              ? account
              : MemoryAccount({ keypair: account })
          default:
            throw new TypeError(
              'Account should be an address (ak-prefixed string), ' +
                `keypair, or instance of account base, got ${account} instead`
            )
        }
      }
    }
  } as Pick<
    Multiple,
    | 'address'
    | 'sign'
    | 'addresses'
    | 'addAccount'
    | 'removeAccount'
    | 'selectAccount'
    | '_resolveAccount'
  >
}) as stampit.Stamp<Multiple>
