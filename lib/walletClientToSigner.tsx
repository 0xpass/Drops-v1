// see https://wagmi.sh/react/ethers-adapters

import { providers } from "ethers";
import { useMemo } from "react";
import { type WalletClient, useWalletClient } from "wagmi";

export function walletClientToSigner(walletClient: WalletClient) {
    const { account, chain, transport } = walletClient;
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    };
    // @ts-ignore
    const provider = new providers.Web3Provider(transport, network);
    return provider.getSigner(account.address);
}

// /** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
    const { data: walletClient } = useWalletClient({ chainId });
    return useMemo(
        () => (walletClient ? walletClientToSigner(walletClient) : undefined),
        [walletClient]
    );
}