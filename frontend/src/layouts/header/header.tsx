"use client";
import HeaderNav from "@/components/headerNav/HeaderNav";
import MobileNav from "@/components/mobileNav/mobileNav";
import { useMediaQuery } from "@uidotdev/usehooks";

const headerItem = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/product", label: "Product" },
];

export function Header() {
  const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");

  return (
    <header className={isSmallDevice ? "mobile-header" : "desktop-header"}>
      {isSmallDevice ? (
        <MobileNav items={headerItem} />
      ) : (
        <HeaderNav items={headerItem} />
      )}
    </header>
  );
}

export default Header;
