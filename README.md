# Minting Page Starter for NFTs for Smart Wallets

Custom NFT minting page starter repo built on [0xpass](https://0xpass.io/), [Biconomy](https://www.biconomy.io/), and [Decent](http://decent.xyz/), deployed on [Vercel](https://vercel.com/).


## Link to live website

https://drops.0xpass.io


## Deployment Instructions

We recommend starting with a Decent NFT, which you can deploy here: [Decent NFT](https://hq.decent.xyz/).  You will also need a [Decent API Key](https://docs.google.com/forms/d/e/1FAIpQLSdPBORZGU-JsMxwlhan9aUl01QCTgu2KJMEEPjhHC_9v1PQqA/viewform) and [Alchemy API Key](https://www.alchemy.com/) to use this starter. Run this repo locally by:

### 1. Forking this repo and cloning it to your local machine.

### 2. Fill in the env variables from .env.example file
```angular2html
NEXT_PUBLIC_0xPASS_KEY=
NEXT_PUBLIC_BUNDLER_URL=
NEXT_PUBLIC_PAYMASTER_URL=
NEXT_PUBLIC_DECENT_API_KEY=
NEXT_PUBLIC_ALCHEMY_API_KEY=
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=
NEXT_PUBLIC_MAGIC_API_KEY=
``` 
- Request [0xpass Api Key](https://0xpass.io/register)
- Request [Biconomy Paymaster and Bundler URL](https://dashboard.biconomy.io/)
- Request a [Decent API Key](https://docs.google.com/forms/d/e/1FAIpQLSdPBORZGU-JsMxwlhan9aUl01QCTgu2KJMEEPjhHC_9v1PQqA/viewform)
- Create an Alchemy account and visit [your dashboard](https://dashboard.alchemy.com/) to create an Alchemy API key. 
- Request [Magic API Key](https://dashboard.magic.link/signup) 



### 3. Replace NFT configuration on index.tsx file

```react
  let constants = {
    decentNft: false,
    address: '${YOUR_NFT_CONTRACT}',
    chainId: '${YOUR_CHAIN_ID}',
    mintPrice: "0.0",
    maxTokens: 3000,
    sellOutDate: 1691539200
  }
```

## To Run

Install dependencies using npm:

```bash
yarn i
```

Lastly, run the development server:

```bash
yarn run dev
```

