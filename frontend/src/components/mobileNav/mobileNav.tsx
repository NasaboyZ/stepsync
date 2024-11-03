import Logo from "../logo/logo";
import Image from "next/image";
import { motion } from "framer-motion";
import BurgerIcon from "@/assets/svg/burger-menu-right-svgrepo-com.svg";
import closingBurger from "@/assets/svg/closingicon.svg";
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
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: -45 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={closingBurger}
              width={30}
              height={30}
              alt="close icon"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.4 }}
          >
            <Image src={BurgerIcon} width={30} height={30} alt="burger icon" />
          </motion.div>
        )}
      </div>

      {isMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={Style["navItems"]}
        >
          <NavigationItem items={items} />
        </motion.nav>
      )}
    </div>
  );
}
