import { TheBox } from "@decent.xyz/the-box";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useState } from "react";
import NumberTicker from "./NumberTicker";
import { useAccount } from "wagmi";
import { getContractFee } from "../lib/getContractFee";
import {useEthersSigner} from "../lib/walletClientToSigner";

{/* IMPORTANT UPDATE: need to make sure the mint params are valid for your NFT.  The information below is works for all Decent NFTs & should serve as a good example of what correct inputs look like.  If you are using a Decent NFT, you do not need to change this!  If you are not, then you do need to update the abi and params -- the rest of the information SHOULD be set in getStaticProps on index.tsx, but be sure to double check. */}

const Box = (props:any):JSX.Element => {
  const { address: account } = useAccount();
  const signer = useEthersSigner();
  const [quantity, setQuantity] = useState(1);

  return <div>
    <div className='text-xl font-[400] pb-4'><b>Mint: </b></div>
      {account && <div className="pb-6">
          <p><b>ERC4337 Wallet</b>:
              <br/>
              <span className="text-purple-500">
                  <a href={`https://polygonscan.com/address/${account}#tokentxnsErc721`}>
                {account}
              </a>
              </span>

          </p>
      </div>}

    {/* Can delete maxQuantity if you do not want to limit the number of NFTs a person can mint at once */}
    <div className="pb-6">
      <NumberTicker quantity={quantity} setQuantity={setQuantity} maxQuantity={1} />
    </div>
    {/* ----------------------------------------------------------- */}
    <TheBox
      className={`${props.className}`}
      signer={signer || null}
      nftParams={{
        address: props.constants.address,
        chainId: props.constants.chainId,
        paymentToken: ethers.constants.AddressZero,
        mintParams: {
          abi: "function mint(address to,uint256 numberOfTokens) payable",
          params: [account, 1],
          cost: ethers.utils.parseEther(props.constants.mintPrice).add(getContractFee(props.constants.chainId) || 0).mul(quantity),
          endSupply: {// only need one of the below
            maxCap: 3000
          }
        },
        displayCost: `${props.constants.mintPrice}${' '}${props.constants.chainId === 137 ? 'MATIC' : "ETH"}`
      }}
      options={{
          allowSecondary: false,
          allowPrimary: true,
          allowBridging: false,
          allowSwapping: false
      }}
      onTxReceipt={() => toast.success("Successfully minted!")}
      apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
    />
    {/* ----------------------------------------------------------- */}
      <div className="pb-6 text-center">
          <button
              onClick={() => {window.location.href = `https://polygonscan.com/address/${account}#tokentxnsErc721`}}
              className="bg-purple-400 text-white font-bold py-2 px-4 rounded mr-2" >View my NFT </button>
          <button
              onClick={() => {window.location.href = `https://polygonscan.com/address/0x6e1D870451a02e64C08f65B2829Db67b4CfD24bD`}}
              className="bg-purple-400 text-white font-bold py-2 px-4 rounded" >View NFT Contract </button>

      </div>

      <div className="pb-6 text-center">
              </div>

  </div>

};

export default Box;