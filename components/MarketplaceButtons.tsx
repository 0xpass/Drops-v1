import Image from "next/image";
import Link from "next/link";

const MarketplaceButtons = (props:any) => {

  return ( 
    <Link href={props.decentLink} target="_blank" rel="noreferrer">
    <Image className="hover:drop-shadow-lg" src="/images/decent-icon.png" height={36} width={36} alt="decent"/></Link>
  )
}

export default MarketplaceButtons;
