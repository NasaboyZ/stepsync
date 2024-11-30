"use client";
import HeaderNav from "@/components/navigation/headerNav/HeaderNav";
import MobileNav from "@/components/navigation/mobileNav/mobileNav";
import { useClientMediaQuery } from "@/hooks/useClientMediaQuery";
const headerItem = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/product", label: "Product" },
];

export function Header() {
  // Use the custom client-only media query hook
  const isSmallDevice = useClientMediaQuery(
    "only screen and (max-width: 768px)"
  );


  return (
    <>
      <header className={isSmallDevice ? "mobile-header" : "desktop-header"}>
        {isSmallDevice ? (
          <MobileNav items={headerItem} />
        ) : (
          <HeaderNav items={headerItem} />
        )}
      </header>
    </>
  );
}

export default Header;
