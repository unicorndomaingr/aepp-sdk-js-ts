export interface AccountBase {
    networkId: string
    readonly signTransaction: (tx: string, opt?: { innerTx?: boolean }) => Promise<string>
    /**
     * Get network Id
     * @instance
     * @function getNetworkId
     * @category async
     * @rtype () => networkId: String
     * @return {String} Network Id
     */
    readonly getNetworkId: (opt?: { networkId?: string, force?: boolean }) => string
    readonly signMessage: (message: string, opt?: { returnHex?: boolean }) => Promise<string>
    readonly verifyMessage: (message: string, signature: string, opt?: { onAccount?: object }) => Promise<boolean>

    /**
     * Sign data blob
     * @function sign
     * @instance
     * @abstract
     * @category async
     * @rtype (data: String) => data: Promise[String]
     * @param {String} data - Data blob to sign
     * @return {String} Signed data blob
     */
    readonly sign: (data: string | Buffer, opt?: any) => Promise<string>

    /**
     * Obtain account address
     * @function address
     * @instance
     * @abstract
     * @category async
     * @rtype () => address: Promise[String]
     * @return {String} Public account address
     */
    readonly address: (opt?: object) => Promise<string>
}