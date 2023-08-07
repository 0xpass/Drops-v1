import { Connector, ConnectorData, WalletClient } from "@wagmi/core";
import { Address } from "viem";
import {BiconomySmartAccount, BiconomySmartAccountConfig, DEFAULT_ENTRYPOINT_ADDRESS} from "@biconomy/account";
import {Bundler, IBundler} from "@biconomy/bundler";
import {biconomyToViemClient} from "./signer/biconomy-viem-client";
import {BiconomyPaymaster} from "@biconomy/paymaster";
import {walletClientToSigner} from "../walletClientToSigner";



export type SmartBiconomyConfig = {
  bundlerUrl: string,
  paymasterUrl: string
}

export const BiconomySmartConnector = (connector: Connector, config: SmartBiconomyConfig) => {

  const chain = connector.chains[0];

  const bundler: IBundler = new Bundler({
    bundlerUrl: config.bundlerUrl,
    chainId: chain.id,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
  });

  const paymaster = new BiconomyPaymaster({
    paymasterUrl: config.paymasterUrl
  })

  let biconomyAccount: BiconomySmartAccount | undefined;

  const handler = {
    get(original: Connector, prop: keyof Connector, proxy: any) {
      if (typeof original[prop] !== "function") {
        return prop === "chains" ? [chain] : Reflect.get(original, prop, proxy);
      }

      return (...args: any[]) => {
        switch (prop) {
          case "connect": return handleConnect(original, proxy);
          case "getChainId": return chain.id;
          case "getProvider": return handleGetProvider(original, args?.[0]);
          case "getWalletClient": return handleGetWalletClient(original, proxy, args?.[0]);
          case "getAccount": return handleGetAccount();
          case "disconnect": return handleDisconnect(original);
          case "switchChain": throw Error("Chain Switch not supported");
          default: return original[prop].apply(original, args);
        }
      };
    },
  };

  async function handleGetProvider(original: Connector, args: any): Promise<any> {
    return original.getProvider(args);
  }

  async function handleGetWalletClient(original: Connector, proxy: any, options: any): Promise<WalletClient> {
    console.log("Get wallet client was called")
    const [ walletClient] = await Promise.all([
      original.getWalletClient(),
    ]);
    console.log("Got provider and wallet client")
    console.log(walletClient)

      if (!biconomyAccount) {
        const ethersSigner = walletClientToSigner(walletClient)
        console.log(ethersSigner)
        // @ts-ignore
        const config: BiconomySmartAccountConfig = {
          signer: ethersSigner,
          chainId: chain.id,
          bundler,
          paymaster
        };
        biconomyAccount = await new BiconomySmartAccount(config).init();
      }
      console.log(biconomyAccount)

    return biconomyToViemClient(walletClient, biconomyAccount);
  }

  async function handleGetAccount(): Promise<Address> {
    if (!biconomyAccount) {
      throw Error("Biconomy Account not connected");
    }
    return (await biconomyAccount.getSmartAccountAddress(0)) as Address;
  }

  async function handleConnect(original: Connector, proxy: any): Promise<Required<ConnectorData>> {
    console.log("Connect was called")
    await original.connect({ chainId: chain.id });
    const walletClient = await proxy.getWalletClient();
    console.log(walletClient)
    console.log("I am now calling addresses function")
    const addresses = await walletClient?.getAddresses()
    console.log(addresses)
    return {
      account: addresses?.[0],
      chain: {
        id: chain.id,
        unsupported: false,
      },
    };
  }

  async function handleDisconnect(original: Connector): Promise<void> {
    await original.disconnect();
    biconomyAccount = undefined;
  }

  const enhanced = new Proxy(connector, handler);

  enhanced["onAccountsChanged"] = async () => enhanced.connect().then(res => connector["onAccountsChanged"]([res.account]));
  enhanced["onDisconnect"] = async (error: Error) => {
    await enhanced.disconnect();
    connector["onDisconnect"](error);
  };

  return enhanced;
};


