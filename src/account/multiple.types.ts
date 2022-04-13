import { AccountBase } from './base.types'
import { Memory } from './memory.types'

export interface Multiple extends Memory {
  readonly address: (this: Multiple, opts?:{onAccount?:string})=> Promise<string>;
  readonly sign: (data:string | Buffer,
    opts?:{onAccount?:string})=> Promise<Buffer|Uint8Array>;
  accounts: AccountBase[];
  selectedAddress?: string;

  /**
   * Get accounts addresses
   * @alias module:@aeternity/aepp-sdk/es/accounts/multiple
   * @function
   * @rtype () => String[]
   * @return {String[]}
   * @example addresses()
   */
  readonly addresses: () => string[];

  /**
   * Add specific account
   * @alias module:@aeternity/aepp-sdk/es/accounts/multiple
   * @function
   * @category async
   * @rtype (account: Account, { select: Boolean }) => void
   * @param {Object} account - Account instance
   * @param {Object} [options={}] - Options
   * @param {Boolean} [options.select] - Select account
   * @return {void}
   * @example addAccount(account)
   */
  readonly addAccount: (account: AccountBase, { select }: { select?: boolean }) => Promise<void>;

  /**
   * Remove specific account
   * @alias module:@aeternity/aepp-sdk/es/accounts/multiple
   * @function
   * @rtype (address: String) => void
   * @param {String} address - Address of account to remove
   * @return {void}
   * @example removeAccount(address)
   */
  readonly removeAccount: (address: string) => void;

  /**
   * Select specific account
   * @alias module:@aeternity/aepp-sdk/es/account/selector
   * @instance
   * @rtype (address: String) => void
   * @param {String} address - Address of account to select
   * @example selectAccount('ak_xxxxxxxx')
   */
  readonly selectAccount: (address: string) => void;

  /**
   * Resolves an account
   * @param account account address (should exist in sdk instance), MemoryAccount or keypair
   * @returns {AccountBase}
   * @private
   */
  readonly _resolveAccount:(account: string | AccountBase)=> AccountBase;
}
