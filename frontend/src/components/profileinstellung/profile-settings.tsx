"use client";
import { Button, Container, Typography, Paper } from "@mui/material";

import styles from "./profile-settings.module.css";

import { Avatar } from "../avtar/avatar";
import { CustomTextField } from "../ui/customTextField";

export function ProfileSettings() {
  return (
    <Container maxWidth="lg" className={styles.profileContainer}>
      <Paper elevation={3} className={styles.paper}>
        <Typography variant="h4" className={styles.title}>
          Edit Profile
        </Typography>

        <div className={styles.mainGrid}>
          <div className={styles.formSection}>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <CustomTextField fullWidth label="First Name" />
              </div>
              <div className={styles.inputGroup}>
                <CustomTextField fullWidth label="Last Name" />
              </div>
              <div className={styles.inputGroup}>
                <CustomTextField fullWidth label="Height (cm)" type="number" />
              </div>
              <div className={styles.inputGroup}>
                <CustomTextField fullWidth label="Weight (kg)" type="number" />
              </div>
              <div className={styles.fullWidth}>
                <CustomTextField fullWidth label="Email" type="email" />
              </div>
              <div className={styles.fullWidth}>
                <CustomTextField fullWidth label="Password" type="password" />
              </div>
              <div className={styles.fullWidth}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  className={styles.saveButton}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.avatarSection}>
            <Avatar />
          </div>
        </div>
      </Paper>
    </Container>
  );
}
