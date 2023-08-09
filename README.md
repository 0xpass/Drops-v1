# Minting Page Starter for NFTs for Smart Wallets

Custom NFT minting page starter repo built on [0xpass](https://0xpass.io/), [Biconomy](https://www.biconomy.io/), and [Decent](http://decent.xyz/), deployed on [Vercel](https://vercel.com/).


## Link to live website

https://drops.0xpass.io


## Deployment Instructions


### 1. Clone the NFT Repo

```shell
https://github.com/0xpass/Drops-v1.git
```

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


### 3. Deploy NFT Contract

Before you proceed, make sure you deploy your own contract. 

#### Here's a sample contract for your reference - 

Here is a quick contract to deploy your NFT (use deployDCNT721A)
```shell
https://polygonscan.com/address/0xbe41713a34c28de907c045e64458aeb616b293c4#writeContract#F2
```
Here is a sample of args to be passed

```shell
Function: deployDCNT721A((string,string,bool,bool,uint32,uint32,uint32,uint32,uint32,uint32,uint16,uint96,address,address,bytes32), (string,string,bytes,address), (address,uint88,uint8))
#	Name	Type	Data
0	_editionConfig.name	string	A 4337 Future
0	_editionConfig.symbol	string	0xPASS
0	_editionConfig.hasAdjustableCap	bool	false
0	_editionConfig.isSoulbound	bool	false
0	_editionConfig.maxTokens	uint32	4294967295
0	_editionConfig.maxTokenPurchase	uint32	0
0	_editionConfig.presaleStart	uint32	0
0	_editionConfig.presaleEnd	uint32	0
0	_editionConfig.saleStart	uint32	1691413200
0	_editionConfig.saleEnd	uint32	4294967295
0	_editionConfig.royaltyBPS	uint16	0
0	_editionConfig.tokenPrice	uint96	0
0	_editionConfig.feeManager	address	0x0000000000000000000000000000000000000000
0	_editionConfig.payoutAddress	address	0x0000000000000000000000000000000000000000
0	_editionConfig.presaleMerkleRoot	bytes32	0x0000000000000000000000000000000000000000000000000000000000000000
1	_metadataConfig.contractURI	string	
1	_metadataConfig.metadataURI	string	
1	_metadataConfig.metadataRendererInit	bytes	0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001c00000000000000000000000000000000000000000000000000000000000000240000000000000000000000000000000000000000000000000000000000000012d307850617373206973206578636974656420746f20636f6c6c61626f72617465207769746820446563656e7420616e64204269636f6e6f6d7920746f206c61756e63682074686973206761736c65737320636f6d6d656d6f726174697665204e4654206f6e20506f6c79676f6e2c2073686f77636173696e672074686520667574757265206f662077656233206170702055582e5c6e5c6e457870657269656e636520616e64206275696c64206f6e20746f70206f662074686520555820666c6f7720656e61626c6564206279203078506173732773206c6f67696e20666c6f772c204269636f6e6f6d79277320736d6172742077616c6c65742c20616e6420446563656e742773207061796d656e74732026204e465420696e66726173747275637475726520746f6f6c732e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000051697066733a2f2f6261667962656965346868716c33616835616f763761636d7a68376372647636637476727461333472716c716468776e786c6632786a796f6a32752f3078506173735f4e46542e6769660000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
1	_metadataConfig.parentIP	address	0x0000000000000000000000000000000000000000
2	_tokenGateConfig.tokenAddress	address	0x0000000000000000000000000000000000000000
2	_tokenGateConfig.minBalance	uint88	0
2	_tokenGateConfig.saleType	uint8	0

```


### 4. Replace NFT configuration on index.tsx file

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

## Run App

Install dependencies using npm:

```bash
yarn install
```

Lastly, run the development server:

```bash
yarn run dev
```

