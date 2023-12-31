import type { NextPage } from 'next';
import { useRef, useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import MarketplaceButtons from '../components/MarketplaceButtons';
import { getDecentNftDetails, getNftDetails } from '../lib/getReleaseDetails';
import CountdownText from '../components/CountdownText';
import Box from "../components/Box";

const Home: NextPage = (props: any) => {
  const blurRef = useRef<HTMLDivElement | null>(null);
  const endDate = new Date(1691539200 * 1000);
  const [nftsMinted, setNftsMinted] = useState("");
  const [isVideo, setIsVideo] = useState(false);

  function checkVideo() {
    if (props.nftDetails.metadata.mimeType.indexOf("mp4") !== -1) {
      setIsVideo(true);
    } else {
      return;
    };
  };

  useEffect(() => {
    checkVideo();
    async function loadMints() {
      if (props.constants.decentNft) {
        let contract = await getNftDetails(props.constants.chainId, props.constants.address);
        if (contract) setNftsMinted(contract.data.totalSupply?.toLocaleString() || "0");
      }
    }
    loadMints();
  }, [props.constants.address, props.constants.chainId, props.constants.decentNft])

  useEffect(() => {
    if (blurRef.current) blurRef.current.style.display = "none";
    setTimeout(() => blurRef.current && (blurRef.current.style.display = "block"))
  }, []);

  const paragraphs = props.nftDetails.metadata.description.split('\n\n');
  const renderedParagraphs = paragraphs.map((paragraph: string, index: number) => (
    <p className='py-2' key={index}>{paragraph}</p>
  ));

  return <>
    <Head>
      <title>{"A 4337 Future"}</title>
      <meta
        name="description"
        content={props.nftDetails.metadata.description}
      />
      <link rel="icon" href={props.nftDetails.metadata.image} />
      <meta property='og:type' content="website" />
      <meta property='og:url' content={"https://featured.decent.xyz/"} />
      <meta property='og:image' content={props.nftDetails.metadata.image} />
      <meta property='og:title' content={"A 4337 Future"} />
      <meta property='og:description' content={props.nftDetails.metadata.description} />
      <meta name='twitter:card' content={"summary_large_image"} />
      <meta name='twitter:url' content={"https://featured.decent.xyz/"} />
      <meta name='twitter:title' content={props.nftDetails.metadata.name} />
      <meta name='twitter:description' content={props.nftDetails.metadata.description} />
      <meta name='twitter:image' content={props.nftDetails.metadata.image} />
    </Head>

    <main className={`${styles.main} md:mt-0 sm:mt-16 mt-28`}>
      <br/>
      <br/>
      <div className='w-full flex flex-wrap'>


        <div className='md:border-r border-black w-full md:w-2/5 relative md:h-[80vh] overflow-y-auto'>
          <h1 className='px-8 2xl:text-6xl md:text-7xl text-6xl flex-items-center text-purple-500 pb-4 pt-8 md:mb-0 mb-4'>{"A 4337 Future"}</h1>
          <div className='p-8'>
            {renderedParagraphs}
          </div>
          <div className='px-8 border-black border-t pt-8 md:inline-block w-full hidden pb-16'>
            <div className='w-full'> 
            {/* -------------------------MAKE SURE TO UPDATE THE BOX-------------------------- */}
            <Box constants={props.constants} nftDetails={props.nftDetails} />
            {/* ------------------------------------------------------------------------------ */}
            </div>
          </div>
        </div>

        <div className='md:w-3/5 collectionBannerFlex flex items-center relative'>
          {isVideo ? 
            <video className="drop-shadow-lg rounded-lg absolute inset-0 w-full h-full object-cover" src={props.nftDetails?.metadata.media} autoPlay loop playsInline muted />
            : <Image className="drop-shadow-lg rounded-lg" src={props.nftDetails.metadata?.image} fill alt={'nft'} />
          }
          <div ref={blurRef} className="blurrer"></div>
          <div className='space-y-3'>
            <div className='flex justify-center'>
              {isVideo ? 
                <div style={{ height: "85%", width: "85%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                  <video className="drop-shadow-lg rounded-lg" src={props.nftDetails?.metadata.media} autoPlay loop playsInline muted style={{ width: "100%", height: "100%" }} />
                </div>
                : <Image className="drop-shadow-lg rounded-lg" src={props.nftDetails?.metadata.image} height={600} width={600} alt={'nft'} />
              }
            </div>
          </div>
        </div>
        <div className='w-full flex justify-center my-12 md:hidden'>
          {/* -------------------------THE BOX-------------------------- */}
          <Box constants={props.constants} nftDetails={props.nftDetails} />
          {/* ----------------------------------------------------------- */}
        </div>
      </div>
    </main>

    {/*<footer className='md:fixed bottom-0 w-full h-[10vh] border-t border-black justify-center flex items-center bg-white relative gap-12'>
      <div className='flex gap-4'>
        <p>Claimed:</p>
        <p className='text-right text-purple-500'>{props.constants.decentNft ? nftsMinted : props.nftDetails.data.totalSupply} | {props.constants.maxTokens > 999999 ? "Open" : props.constants.maxTokens}</p>
      </div>
      <div className='hidden sm:inline-block'>
        <MarketplaceButtons decentLink={"https://decent.xyz"} />
      </div>
      <div className='flex gap-4'>
        <p>Sale Ends:</p>
        <CountdownText className='text-purple-500 sm:w-40' dropTime={endDate} />
      </div>
    </footer>*/}
  </>
};

export default Home;

export async function getStaticProps() {
  {/* -------------------------NFT Settings-------------------------- */}
  // change constants to fetch your NFT & set data that cannot be determined dynamically
  let constants = {
    decentNft: false,
    address: '0x6e1D870451a02e64C08f65B2829Db67b4CfD24bD',
    chainId: 137,
    mintPrice: "0.0",
    maxTokens: 3000,
    sellOutDate: 1691539200
  }
  {/* --------------------------------------------------------------- */}


  console.log("I am fetching this data")
  // NOTE: to retrieve metadata for non-Decent NFTs, at least 1 NFT from the collection must already be minted!!
  let nftDetails;
  if (constants.decentNft) {
    nftDetails = await getDecentNftDetails(constants.chainId, constants.address);
  } else {
    nftDetails = await getNftDetails(constants.chainId, constants.address);
  };

  return {
    props: {
      nftDetails,
      constants
    }
  };
};
