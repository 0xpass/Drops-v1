import "@decent.xyz/the-box/dist/the-box-base.css";
import '@rainbow-me/rainbowkit/styles.css'; 
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/react";
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import {polygon, polygonMumbai} from "wagmi/chains"
import {walletConnectWallet, metaMaskWallet, socialMagicWallet} from "0xpass/wallets"
import { PassProvider, createClient, connectorsForWallets } from "0xpass"
import { WagmiConfig, configureChains, createConfig } from "wagmi"


const apiKey = "my-api-key";
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

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
    groupName: "Social",
    wallets: [
      socialMagicWallet({ apiKey: "magic api key", chains, provider: "google" })
    ]
  },
  {
    groupName: "Others",
    wallets: [
      metaMaskWallet({projectId, chains}),
      walletConnectWallet({projectId, chains}),
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