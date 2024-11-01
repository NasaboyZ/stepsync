import Style from "./footerNav.module.css";
import Logo from "../logo/logo";

const NavigationItem = () => {
  // Array mit Links und Labels für Hauptnavigation
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/product", label: "Product" },
  ];

  return (
    <>
      {/* Dynamische Navigation für Hauptlinks */}
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
            <img src="/instagram-icon.png" alt="Instagram" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/github-icon.png" alt="GitHub" />
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
