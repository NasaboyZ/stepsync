import Image from "next/image";
import { motion } from "framer-motion";
import BurgerIcon from "@/assets/svg/burger-menu-right-svgrepo-com.svg";
import closingBurger from "@/assets/svg/closingicon.svg";
import Style from "./mobileNav.module.css";

import { useState } from "react";
import Logo from "@/components/logo/Logo";
import NavigationItem from "../navigationItems/NavigationItems";
import SwitchLoginComponent from "@/components/switchlogin/switchlogincomponents";

interface MobileNavProps {
  items: { href: string; label: string }[];
}

const menuVariants = {
  closed: {
    x: "100%",
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
    },
  },
};

export default function MobileNav({ items }: MobileNavProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <div className={Style["mobileNavWrapper"]}>
      <Logo />

      <div className={Style["mobileNavToggle"]} onClick={toggleMenu}>
        {!isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={BurgerIcon}
              width={30}
              height={30}
              alt="Burger-Symbol"
            />
          </motion.div>
        ) : null}
      </div>

      {isMenuOpen && (
        <motion.nav
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className={Style["mobileNavOpen"]}
        >
          <div className={Style["closeIcon"]} onClick={toggleMenu}>
            <Image
              src={closingBurger}
              width={30}
              height={30}
              alt="Schließen-Symbol"
            />
          </div>

          {items.map((item) => (
            <NavigationItem key={item.href} items={[item]} />
          ))}
          <div className={Style["switch-login"]}>
            <SwitchLoginComponent />
          </div>
        </motion.nav>
      )}
    </div>
  );
}
