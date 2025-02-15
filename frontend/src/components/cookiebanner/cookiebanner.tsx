"use client";

import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Box, Typography, Slide, Link } from "@mui/material";
import styles from "./cookiebanner.module.css";
import { Button, ButtonStyle } from "../button/Button";

export default function Cookiebanner() {
  const [cookies, setCookie] = useCookies(["cookie-consent"]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!cookies["cookie-consent"]) {
      setIsVisible(true);
    }
  }, [cookies]);

  const handleAccept = () => {
    setCookie("cookie-consent", true, { path: "/" });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Slide direction="up" in={isVisible}>
      <Box className={styles.cookieBanner}>
        <Typography variant="body1" className={styles.text}>
          Wir verwenden Cookies, um Ihre Benutzerdaten und Einstellungen zu
          speichern.{" "}
          <Link href="/datenschutz" className={styles.link}>
            Mehr Informationen in unserer Datenschutzerklärung
          </Link>
        </Typography>
        <Box className={styles.buttonContainer}>
          <Button
            label="Akzeptieren"
            style={ButtonStyle.SECONDARY}
            onClick={handleAccept}
          />
        </Box>
      </Box>
    </Slide>
  );
}
