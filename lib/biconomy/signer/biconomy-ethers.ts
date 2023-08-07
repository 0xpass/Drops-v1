import {BiconomySmartAccount, BiconomySmartAccountConfig, DEFAULT_ENTRYPOINT_ADDRESS} from "@biconomy/account";
import {providers} from "ethers";
import {polygon} from "wagmi/chains";
import {Bundler, IBundler, UserOpResponse} from "@biconomy/bundler";
import {BiconomyPaymaster, IHybridPaymaster, PaymasterMode, SponsorUserOperationDto} from "@biconomy/paymaster";

export const biconomyEthers = (signer: providers.JsonRpcSigner): providers.JsonRpcSigner => {

    const handler = {
        get(originalSigner: providers.JsonRpcSigner, prop: keyof providers.JsonRpcSigner, proxy: any) {
            // If the property is not a function, return it directly
            if (typeof originalSigner[prop] !== "function") {
                return Reflect.get(originalSigner, prop);
            }

            return (...args: any[]) => {
                switch (prop) {
                    case "sendTransaction":
                        return handleSendTransaction(args?.[0]);
                    default:
                        return (originalSigner[prop] as Function).apply(originalSigner, args);
                }
            }
        }
    };

    async function handleSendTransaction(transactionArgs: any): Promise<UserOpResponse> {
        try {

            const biconomyBundler: IBundler = new Bundler({
                bundlerUrl: process.env.NEXT_PUBLIC_BUNDLER_URL as string,
                chainId: polygon.id,
                entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
            });

            const paymaster = new BiconomyPaymaster({
                paymasterUrl: process.env.NEXT_PUBLIC_PAYMASTER_URL as string
            })

            const config: BiconomySmartAccountConfig = {
                signer: signer,
                chainId: polygon.id,
                bundler: biconomyBundler,
                paymaster
            };

            const account = await new BiconomySmartAccount(config).init();

            const transaction = {
                to: transactionArgs.to,
                value: transactionArgs.value,
                data: transactionArgs.data
            };

            let userOp = await account.buildUserOp([transaction]);
            const biconomyPaymaster = account.paymaster as IHybridPaymaster<SponsorUserOperationDto>;

            let paymasterServiceData: SponsorUserOperationDto = {
                mode: PaymasterMode.SPONSORED,
            };

            const paymasterAndDataResponse = await biconomyPaymaster.getPaymasterAndData(userOp, paymasterServiceData);
            userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;

            const userOpResponse = await account.sendUserOp(userOp);
            return userOpResponse;

        } catch (error: any) {
            console.error(`Error handling sendTransaction: ${error.message}`);
            throw error;
        }
    }

    return new Proxy(signer, handler);
};
