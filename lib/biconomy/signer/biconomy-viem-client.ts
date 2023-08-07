import {Address, WalletClient} from "@wagmi/core";
import {GetAddressesReturnType, SendTransactionReturnType} from "viem";
import { BiconomySmartAccount } from "@biconomy/account";

export const biconomyToViemClient = (walletClient: WalletClient, account: BiconomySmartAccount): WalletClient => {

    const handler = {
        get(originalClient: WalletClient, prop: keyof WalletClient, proxy: any) {
            console.log("Handler was called")
            console.log(originalClient)
            // If the property is not a function, return it directly
            if (typeof originalClient[prop] !== "function") {
                return Reflect.get(originalClient, prop);
            }

            return (...args: any[]) => {
                switch (prop) {
                    case "sendTransaction":
                        return handleSendTransaction(args?.[0]);
                    case "getAddresses":
                        return handleGetAddresses();
                    default:
                        return (originalClient[prop] as Function).apply(originalClient, args);
                }
            }
        }
    };

    async function handleGetAddresses(): Promise<GetAddressesReturnType> {
        const address = await account.getSmartAccountAddress()
        console.log(" I am called")
        console.log(address)
        return [address as Address]
    }


    async function handleSendTransaction(transactionArgs: any): Promise<SendTransactionReturnType> {
        try {
            const transaction = {
                to: transactionArgs.to,
                value: transactionArgs.value,
                data: transactionArgs.data
            };

            const userOp = await account.buildUserOp([transaction]);
            const userOpResponse = await account.sendUserOp(userOp);
            return userOpResponse.userOpHash as SendTransactionReturnType;

        } catch (error: any) {
            console.error(`Error handling sendTransaction: ${error.message}`);
            throw error;
        }
    }

    return new Proxy(walletClient, handler);
};
