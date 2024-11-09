import Style from "./footerNav.module.css";
import Logo from "../logo/logo";
import { FaGithub, FaInstagram } from "react-icons/fa";

// TODO: Footer Resopnisive machen (josef)
// TODO: Footer icons wie Instagram und Github einfügen (josef)
// TODO: Text im Footer anpassen und ebben falls Responsive (josef)
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
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default function FooterNav() {
  const legalItems = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-and-conditions", label: "Terms & Conditions" },
  ];

  return (
    <>
      <div className={Style["footerContent"]}>
        <Logo />
        <NavigationItem />

        <div className={Style["socialMedia"]}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className={Style["SocialMediaIcon"]} />
          </a>
          <a
            href="https://github.com"
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
    </>
  );
}
