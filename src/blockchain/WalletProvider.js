import WalletConnectProvider from "@walletconnect/web3-provider"

export const provider = new WalletConnectProvider({
    rpc: {
        1: "https://eth-mainnet.public.blastapi.io",
        56: "https://bsc-dataseed.binance.org/",
        88: "https://rpc.tomochain.com",
    },
    chainId: 1,
    // infuraId: "75f5a6b0e4514c50858504adf83ed5e1",
}); 
