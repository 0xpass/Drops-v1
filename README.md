# Minting Page Starter for NFTs for Smart Wallets

Custom NFT minting page starter repo built on [0xpass](https://0xpass.io/), [Biconomy](https://www.biconomy.io/), and [Decent](http://decent.xyz/), deployed on [Vercel](https://vercel.com/).


## Deployment Instructions

We recommend starting with a Decent NFT, which you can deploy here: [Decent NFT](https://hq.decent.xyz/).  You will also need a [Decent API Key](https://docs.google.com/forms/d/e/1FAIpQLSdPBORZGU-JsMxwlhan9aUl01QCTgu2KJMEEPjhHC_9v1PQqA/viewform) and [Alchemy API Key](https://www.alchemy.com/) to use this starter. Run this repo locally by:

1. Forking this repo and cloning it to your local machine.

2. Fill in the env variables from .env.example file
 
- Request a [Decent API Key](https://docs.google.com/forms/d/e/1FAIpQLSdPBORZGU-JsMxwlhan9aUl01QCTgu2KJMEEPjhHC_9v1PQqA/viewform) and add it to your .env file.  Once inputted, your minting page will automatically populate with your NFT's data and metadata.  If you would like to add or swap information, please visit [Decent's API Documentation](https://docs.decent.xyz/reference/get_contracts-chainid-address) to query for your contract and view the JSON response to see the available information.
- Create an Alchemy account and visit [your dashboard](https://dashboard.alchemy.com/) to create an Alchemy API key. Alchemy facilitates the connection between your application and the chain of your choice.
- Request [Magic API Key](https://dashboard.magic.link/signup) and add it to your .env file. Magic is a passwordless authentication SDK that enables you to authenticate users with their email or social login.

3. Replace NFT configuration on index.tsx file

```angular2html
  let constants = {
    decentNft: false,
    address: '0x6e1D870451a02e64C08f65B2829Db67b4CfD24bD',
    chainId: 137,
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

## Demo

https://drops.0xpass.io
