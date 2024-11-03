"use client";
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa"; // Beispiel-Icon-Bibliothek (alternativ eigenes Icon)
import Style from "./scrollToTop.module.css"; // Style für Button optional

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll-Ereignis, um die Sichtbarkeit des Buttons zu kontrollieren
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300); // Sichtbar ab 300px Scrollhöhe
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`${Style["scroll-to-top"]}`}
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
}
