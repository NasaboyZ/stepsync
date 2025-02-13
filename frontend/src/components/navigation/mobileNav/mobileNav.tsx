import { Drawer, IconButton } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import BurgerIcon from "@/assets/svg/burger-menu-right-svgrepo-com.svg";
import closingBurger from "@/assets/svg/closingicon.svg";
import Style from "./mobileNav.module.css";
import { useState } from "react";
import Logo from "@/components/logo/logo";
import NavigationItem from "../navigationItems/navigationItems";

import { Button, ButtonStyle } from "@/components/button/Button";
import { useSession } from "next-auth/react";

interface MobileNavProps {
  items: { href: string; label: string }[];
}

export default function MobileNav({ items }: MobileNavProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { status } = useSession();
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const handleNavItemClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className={Style["mobileNavWrapper"]}>
      <Logo />

      <IconButton
        className={Style["mobileNavToggle"]}
        onClick={toggleMenu}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.4 }}
        >
          <Image src={BurgerIcon} width={30} height={30} alt="Burger-Symbol" />
        </motion.div>
      </IconButton>

      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={toggleMenu}
        classes={{
          paper: Style.drawer,
        }}
      >
        <div className={Style.drawerContent}>
          <IconButton onClick={toggleMenu} className={Style.closeButton}>
            <Image
              src={closingBurger}
              width={30}
              height={30}
              alt="Schließen-Symbol"
            />
          </IconButton>

          <div className={Style.navigationContainer}>
            {items.map((item) => (
              <div key={item.href} onClick={handleNavItemClick}>
                <NavigationItem items={[item]} />
              </div>
            ))}
            <div className={Style.loginButton}>
              {status === "unauthenticated" ? (
                <Button
                  label="Anmelden"
                  style={ButtonStyle.PRIMARY}
                  href="/login"
                />
              ) : (
                <Button
                  label="Dashboard"
                  style={ButtonStyle.PRIMARY}
                  href="/dashboard"
                />
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
