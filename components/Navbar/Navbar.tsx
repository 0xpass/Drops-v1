import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";
import ConnectWallet from "./ConnectWallet";

interface NavItemProps {
  href: string;
  children: string | JSX.Element;
  openInNewTab?: boolean;
}

const Navbar = () => {

  function NavItem({ href, openInNewTab, children }: NavItemProps): JSX.Element {
    return (
      <Link passHref href={href} target={openInNewTab ? "_blank" : undefined} rel={openInNewTab ? "noreferrer" : undefined}>
        <p
          className={`uppercase tracking-widest font-[500] text-base hover:text-black text-white p-2`}
        >
          {children}
        </p>
      </Link>
    );
  }

  return (
    <>
      <nav className={`${styles.navbar} w-full flex flex-wrap items-center sm:justify-between justify-center border-b border-black drop-shadow-md`} >
        <NavItem href="https://decent.xyz" openInNewTab><Image width={150} height={60} src="/images/decent.png" alt="decent" /></NavItem>
        <div className="flex items-center gap-4">
          <ConnectWallet />
          <Link href='https://github.com/decentxyz/Minting-Page' target='_blank'>
            <div className="p-1 rounded-full bg-black">
              <Image src='/images/github-mark-white.svg' height={20} width={20} alt='link to repository' />
            </div>
          </Link>
          </div>
      </nav>
    </>

  );
};

export default Navbar;