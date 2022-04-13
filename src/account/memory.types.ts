import { AccountBase } from './base.types'
/**
 * In-memory account interface
 * @alias module:@aeternity/aepp-sdk/es/account/memory
 */
export interface Memory extends AccountBase{
  readonly options: {
    keypair: {
      publicKey: string;
      secretKey: string;
    };
    gaId?: string;
  };
  isGa: boolean;
  readonly sign: (data: string|Buffer) => Promise<Buffer|Uint8Array|String>;
  readonly address: () => Promise<string>;
}
