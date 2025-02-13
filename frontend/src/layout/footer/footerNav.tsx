import { FaGithub, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Logo from "@/components/logo/logo";
import styles from "./footerNav.module.css";

const NavigationItem = () => {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/product", label: "Product" },
  ];

  return (
    <nav className={styles.navigationContainer}>
      {navItems.map((item, index) => (
        <Link key={index} href={item.href} className={styles.navigationItem}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default function FooterNav() {
  const legalItems = [
    { href: "/datenschutz", label: "Datenschutzerklärung" },
    { href: "/impressum", label: "Impressum" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div className={styles.logoSection}>
            <Logo className={styles.logo} />
          </div>

          <div className={styles.navSection}>
            <NavigationItem />
          </div>

          <div className={styles.socialSection}>
            <div className={styles.socialIcons}>
              <a
                href="https://instagram.com"
                target="_blank"
                aria-label="instagram"
                className={styles.iconButton}
              >
                <FaInstagram />
              </a>
              <a
                href="https://github.com/NasaboyZ"
                target="_blank"
                aria-label="github"
                className={styles.iconButton}
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © Copyright 2024, All Rights Reserved
          </p>

          <div className={styles.legalLinks}>
            {legalItems.map((item, index) => (
              <Link key={index} href={item.href} className={styles.legalLink}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
