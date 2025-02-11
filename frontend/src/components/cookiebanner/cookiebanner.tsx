"use client";

import React from "react";
import { useCookies } from "react-cookie";
import { Button, Box, Typography } from "@mui/material";
import styles from "./cookiebanner.module.css";

const CookieConsent = () => {
  const [cookies, setCookie] = useCookies(["cookieConsent"]);

  const giveCookieConsent = () => {
    setCookie("cookieConsent", true, { path: "/" });
  };

  if (cookies.cookieConsent) {
    return null;
  }

  return (
    <Box className={styles["cookie-banner"]}>
      <div className={styles["cookie-content"]}>
        <Typography variant="body2">
          We use cookies to enhance your user experience. By using our website,
          you agree to our use of cookies.{" "}
          <a href={"/datenschutz"} className={styles["cookie-link"]}>
            Learn more.
          </a>
        </Typography>
        <Button
          variant="contained"
          onClick={giveCookieConsent}
          className={styles["cookie-button"]}
        >
          Accept
        </Button>
      </div>
    </Box>
  );
};

export default CookieConsent;
