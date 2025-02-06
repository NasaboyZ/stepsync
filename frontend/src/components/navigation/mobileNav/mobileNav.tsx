import { Drawer, IconButton, Box } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import BurgerIcon from "@/assets/svg/burger-menu-right-svgrepo-com.svg";
import closingBurger from "@/assets/svg/closingicon.svg";
import Style from "./mobileNav.module.css";
import { useState } from "react";
import Logo from "@/components/logo/logo";
import NavigationItem from "../navigationItems/navigationItems";
import SwitchLoginComponent from "@/components/switchlogin/switchlogincomponents";

interface MobileNavProps {
  items: { href: string; label: string }[];
}

export default function MobileNav({ items }: MobileNavProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);

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
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            backgroundColor: "var(--brown-light)",
            borderRadius: "0",
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "2rem",
            position: "relative",
          }}
        >
          <IconButton
            onClick={toggleMenu}
            sx={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
            }}
          >
            <Image
              src={closingBurger}
              width={30}
              height={30}
              alt="Schließen-Symbol"
            />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
              marginTop: "4rem",
            }}
          >
            {items.map((item) => (
              <div key={item.href} onClick={handleNavItemClick}>
                <NavigationItem items={[item]} />
              </div>
            ))}
            <SwitchLoginComponent onNavigate={handleNavItemClick} />
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}
