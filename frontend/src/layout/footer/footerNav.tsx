import { Box, Container,  Typography, IconButton, Stack } from '@mui/material';
import Logo from "@/components/logo/logo";
import { FaGithub, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import styles from './footerNav.module.css';

const NavigationItem = () => {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/product", label: "Product" },
  ];

  return (
    <Stack direction="row" spacing={3} className={styles.navigationContainer}>
      {navItems.map((item, index) => (
        <Link key={index} href={item.href} className={styles.navigationItem}>
          <Typography>
            {item.label}
          </Typography>
        </Link>
      ))}
    </Stack>
  );
};

export default function FooterNav() {
  const legalItems = [
    { href: "/datenschutz", label: "Datenschutzerklärung" },
    { href: "/impressum", label: "Impressum" },
  ];

  return (
    <Box component="footer" className={styles.footer}>
      <Container maxWidth="lg">
        <div className={styles.footerGrid}>
          <div className={styles.logoSection}>
            <Logo className={styles.logo} />
          </div>
          
          <div className={styles.navSection}>
            <NavigationItem />
          </div>

          <div className={styles.socialSection}>
            <Stack direction="row" spacing={1} className={styles.socialIcons}>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                aria-label="instagram"
                className={styles.iconButton}
              >
                <FaInstagram />
              </IconButton>
              <IconButton
                href="https://github.com/NasaboyZ"
                target="_blank"
                aria-label="github"
                className={styles.iconButton}
              >
                <FaGithub />
              </IconButton>
            </Stack>
          </div>
        </div>

        <Box className={styles.footerBottom}>
          <Typography className={styles.copyright}>
            © Copyright 2024, All Rights Reserved
          </Typography>

          <Stack direction="row" className={styles.legalLinks}>
            {legalItems.map((item, index) => (
              <Link key={index} href={item.href} className={styles.legalLink}>
                <Typography>
                  {item.label}
                </Typography>
              </Link>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
