import "@decent.xyz/the-box/dist/the-box-base.css";
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/react";
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import {polygon} from "wagmi/chains"
import {walletConnectWallet, metaMaskWallet, socialMagicWallet, emailMagicWallet} from "0xpass/wallets"
import { PassProvider, createClient, connectorsForWallets } from "0xpass"
import { WagmiConfig, configureChains, createConfig } from "wagmi"
import {smartWalletWithBiconomy} from "../lib/biconomy/wallet";


const apiKey = "pk_live_CB6C83195F3FFCC3";
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

const bundlerUrl = process.env.NEXT_PUBLIC_BUNDLER_URL as string;
const paymasterUrl = process.env.NEXT_PUBLIC_PAYMASTER_URL as string;

const biconomyConfig = {
  bundlerUrl,
  paymasterUrl
}

const {chains, publicClient } = configureChains(
  [
    polygon
  ],
  [
    alchemyProvider({
      apiKey: `${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    }),
    publicProvider(),
  ]
);

const passClient = createClient({ apiKey, chains });


const connectors = connectorsForWallets([
  {
    groupName: "Email",
    wallets: [
      smartWalletWithBiconomy(
          emailMagicWallet({ apiKey: apiKey, chains, shimDisconnect: true }),
          biconomyConfig
      )
    ]
  },
  {
    groupName: "Social",
    wallets: [
      smartWalletWithBiconomy(
          socialMagicWallet({ apiKey: apiKey, chains, provider: "google" }),
          biconomyConfig
      )
    ]
  },
  {
    groupName: "Others",
    wallets: [
      smartWalletWithBiconomy(
        metaMaskWallet({projectId, chains}),
        biconomyConfig
      ),
      smartWalletWithBiconomy(
          walletConnectWallet({projectId, chains}),
          biconomyConfig
      ),
    ],
  }
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <WagmiConfig config={wagmiConfig}>
        <PassProvider client={passClient}>
          <Navbar />
          <Component {...pageProps} />
          <Analytics />
          <ToastContainer />
        </PassProvider>
      </WagmiConfig>
  );
}

export default MyApp;