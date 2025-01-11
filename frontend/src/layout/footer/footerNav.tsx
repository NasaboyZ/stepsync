import Logo from "@/components/logo/logo";
import Style from "./footerNav.module.css";

import { FaGithub, FaInstagram } from "react-icons/fa";

import Link from "next/link";

const NavigationItem = () => {
  // Array mit Links und Labels für Hauptnavigation
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/product", label: "Product" },
  ];

  return (
    <>
      <ul className={Style["navLinks"]}>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default function FooterNav() {
  const legalItems = [
    { href: "/privacy-policy", label: "Datenschutzerklärung" },
    { href: "/terms-and-conditions", label: "AGB" },
  ];

  return (
    <footer>
      <div className={Style["footerContent"]}>
        <Logo className={Style["footerLogo"]} />
        <NavigationItem />

        <div className={Style["socialMedia"]}>
          <a href="https://instagram.com" target="_blank" rel="github link">
            <FaInstagram className={Style["SocialMediaIcon"]} />
          </a>
          <a
            href="https://github.com/NasaboyZ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className={Style["SocialMediaIcon"]} />
          </a>
        </div>
      </div>

      <div className={Style["copyright"]}>
        <p> © Copyright 2024, All Rights Reserved</p>

        <ul className={Style["legalLinks"]}>
          {legalItems.map((item, index) => (
            <li key={index}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
