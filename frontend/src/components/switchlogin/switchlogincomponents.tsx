import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./switchlogincomponents.module.css";


type SelectedOption = "signup" | "login";

export default function SwitchLoginComponent() {
  const [selected, setSelected] = useState<SelectedOption>("signup");

  const handleSwitch = (value: SelectedOption) => {
    setSelected(value);
  };

  return (
    <div className={styles.switchContainer}>
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`${styles.switchBackground} ${
          selected === "login" ? styles.login : styles.signup
        }`}
      />
      <label
        onClick={() => handleSwitch("login")}
        className={`${styles.switchLabel} ${
          selected === "login" ? styles.active : ""
        }`}
      >
        Login
      </label>
      <label
        onClick={() => handleSwitch("signup")}
        className={`${styles.switchLabel} ${
          selected === "signup" ? styles.active : ""
        }`}
      >
        Sign-up
      </label>
    </div>
  );
}
