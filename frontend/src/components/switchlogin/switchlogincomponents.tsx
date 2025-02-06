import React from "react";
import styles from "./switchlogincomponents.module.css";
import Link from "next/link";

interface SwitchLoginComponentsProps {
  onNavigate?: () => void; // Neue Props für die Schließ-Funktion
}

const SwitchLoginComponents: React.FC<SwitchLoginComponentsProps> = ({
  onNavigate,
}) => {
  const handleClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <div className={styles.switchContainer}>
      <div className={`${styles.switchBackground}`} />
      <div
        className={`${styles.switchLabel} ${styles.active}`}
        onClick={handleClick}
      >
        <Link href="/login">Login</Link>
      </div>
      <div className={styles.switchLabel} onClick={handleClick}>
        <Link href="/registration">Sign-up</Link>
      </div>
    </div>
  );
};

export default SwitchLoginComponents;
