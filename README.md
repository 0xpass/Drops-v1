# Minting Page Starter – Decent NFTs

Custom NFT minting page starter repo built on [Next.js](https://nextjs.org/), [Tailwind](https://tailwindcss.com/docs/customizing-colors), and [Decent](http://decent.xyz/), deployed on [Vercel](https://vercel.com/).

![](/public/images/example.png)

The purpose of this repository is to get you up & running quickly with a custom NFT minting page using [The Box](https://decent.xyz/box).  **The Box enables 1-click transactions using any token on any chain.  In this repo, The Box enables 1-click checkout for NFTs across primary and secondary sales.**  This repository is setup to handle any NFT, whether it was deployed through Decent or not - non-Decent NFTs are more likely to present UX bugs.

## Deployment Instructions

We recommend starting with a Decent NFT, which you can deploy here: [Decent NFT](https://hq.decent.xyz/).  You will also need a [Decent API Key](https://docs.google.com/forms/d/e/1FAIpQLSdPBORZGU-JsMxwlhan9aUl01QCTgu2KJMEEPjhHC_9v1PQqA/viewform) and [Alchemy API Key](https://www.alchemy.com/) to use this starter. Run this repo locally by:

1. Go to https://hq.decent.xyz/create/Editions and create a new NFT (skip to step 3 if you have an existing NFT you'd like to use)

2. From the success page, copy the contract address and note the chain ID number.  You can deploy your NFT to Ethereum, Polygon, Arbitrum or Optimism.  These chains have the following IDs:

| Chain       | ID Number   |
| ----------- | ----------- |
| Ethereum    | 1           |
| Polygon     | 137         |
| Arbitrum    | 42161       |
| Optimism    | 10          |

The example uses an NFT on Optimism.  On the `index.tsx` page, enter your NFT's chain ID, contract address, token price, sale end date, and NFT max cap in `constants` within the `getStaticProps` request.

3. Request a [Decent API Key](https://docs.google.com/forms/d/e/1FAIpQLSdPBORZGU-JsMxwlhan9aUl01QCTgu2KJMEEPjhHC_9v1PQqA/viewform) and add it to your .env file.  Once inputted, your minting page will automatically populate with your NFT's data and metadata.  If you would like to add or swap information, please visit [Decent's API Documentation](https://docs.decent.xyz/reference/get_contracts-chainid-address) to query for your contract and view the JSON response to see the available information.

4. If you are using a Decent NFT, you will not need to update the props in the `Box.tsx` component.  If you are NOT using a Decent NFT, you will need to enter your contract's mint method signature in the `abi` and its corresponding parameters in `params`.  In either case, double check that the `nftParams` are correct for your contract & please visit our [Box Documentation](https://docs.decent.xyz/docs/overview) for further guidance on how to correctly install The Box.

5. Create an Alchemy account and visit [your dashboard](https://dashboard.alchemy.com/) to create an Alchemy API key. Alchemy facilitates the connection between your application and the chain of your choice.

Reach out to [@cdurbinxyz](https://twitter.com/cdurbinxyz) on Twitter if you run into any issues.

## To Run

First, install dependencies using npm:

```bash
npm i
```

Next, run `cp .env.example .env.local` to create your file to enter the information detailed above.  It should look like:

```bash
NEXT_PUBLIC_DECENT_API_KEY=<your-decent-api-key>
NEXT_PUBLIC_ALCHEMY_API_KEY=<your-alchemy-api-key>
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=<your-wallet-connect-project-id>
```

Lastly, run the development server:

```bash
npm run dev
```

## Demo

https://minting-page-decent-webapp.vercel.app/

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DecentSDK](https://www.npmjs.com/package/@decent.xyz/sdk)
- [Decent API](https://docs.decent.xyz/reference/get_allowlists-merkleroot)
- [Alchemy RPC + NFT API](https://docs.alchemy.com/reference/getnftmetadata)
