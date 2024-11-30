import React from "react";
import styles from "./switchlogincomponents.module.css";
import Link from "next/link";

const SwitchLoginComponents: React.FC = () => {
  return (
    <div className={styles.switchContainer}>
      <div className={`${styles.switchBackground}`} />
      <div className={`${styles.switchLabel} ${styles.active}`}>
        <Link href="/login">Login</Link>
      </div>
      <div className={styles.switchLabel}>
        <Link href="/registration">Sign-up</Link>
      </div>
    </div>
  );
};

export default SwitchLoginComponents;
