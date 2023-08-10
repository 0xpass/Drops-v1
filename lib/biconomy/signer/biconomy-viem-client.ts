import { Address, WalletClient } from "@wagmi/core";
import { GetAddressesReturnType, SendTransactionReturnType } from "viem";
import { BiconomySmartAccount } from "@biconomy/account";

export const biconomySigner = (walletClient: WalletClient, account: BiconomySmartAccount): WalletClient => {

    const actionHandlers: Record<string, Function> = {
        getAddresses: handleGetAddresses,
        sendTransaction: handleSendTransaction
    };


    const proxyHandler = {
        get(target: WalletClient, prop: keyof WalletClient, proxy: any) {
            console.log("proxy was invoked")
            console.log(prop)
            if (typeof target[prop] !== "function" || !(prop in actionHandlers)) {
                return Reflect.get(target, prop);
            }

            return (...args: any[]) => actionHandlers[prop](...args);
        }
    };

    async function handleGetAddresses(): Promise<GetAddressesReturnType> {
        console.log("handleGetAddresses was called")
        const address = await account.getSmartAccountAddress();
        return [address as Address];
    }

    async function handleSendTransaction({ to, value, data }: any): Promise<SendTransactionReturnType> {
        try {
            const userOp = await account.buildUserOp([{ to, value, data }]);
            const userOpResponse = await account.sendUserOp(userOp);
            return userOpResponse.userOpHash as SendTransactionReturnType;
        } catch (error: any) {
            console.error(`Error handling sendTransaction: ${error.message}`);
            throw error;
        }
    }

    return new Proxy(walletClient, proxyHandler);
};
