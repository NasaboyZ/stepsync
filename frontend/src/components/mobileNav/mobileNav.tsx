import Logo from "../logo/logo";
import Image from "next/image";
import BurgerIcon from "@/assets/svg/burger-menu-right-svgrepo-com.svg";
import Style from "./mobileNav.module.css";
import NavigationItem from "../navigationItems/navigationItems"; // Überprüfe den Pfad
import { useState } from "react";

interface MobileNavProps {
  items: { href: string; label: string }[];
}

export default function MobileNav({ items }: MobileNavProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <div className={Style["mobileNavWrapper"]}>
      <Logo />
      <div className={Style["mobileNavToggle"]} onClick={toggleMenu}>
        <Image src={BurgerIcon} width={30} height={30} alt="burger Icon" />
      </div>

      {isMenuOpen && (
        <nav className={Style["navItems"]}>
          <NavigationItem items={items} />
        </nav>
      )}
    </div>
  );
}
