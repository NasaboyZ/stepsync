"use client";
import { Button, Container, Typography, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserProfile } from "@/types/interfaces/userProfile";
import { fetchUserData } from "@/utils/api";

import styles from "./profile-settings.module.css";

import { Avatar } from "../avtar/avatar";
import { CustomTextField } from "../ui/customTextField";

export function ProfileSettings() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { data: session } = useSession();

  const handleInputChange =
    (field: keyof UserProfile) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (userProfile) {
        setUserProfile({
          ...userProfile,
          [field]: event.target.value,
        });
      }
    };

  useEffect(() => {
    async function fetchUserProfile() {
      if (session?.accessToken) {
        try {
          const profileData = await fetchUserData(session.accessToken);
          setUserProfile(profileData);
        } catch (error) {
          console.error("Fehler beim Laden des Benutzerprofils:", error);
        }
      }
    }

    fetchUserProfile();
  }, [session]);

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
                <CustomTextField
                  fullWidth
                  label="First Name"
                  value={userProfile?.firstName || ""}
                  onChange={handleInputChange("firstName")}
                />
              </div>
              <div className={styles.inputGroup}>
                <CustomTextField
                  fullWidth
                  label="Last Name"
                  value={userProfile?.lastName || ""}
                  onChange={handleInputChange("lastName")}
                />
              </div>
              <div className={styles.inputGroup}>
                <CustomTextField
                  fullWidth
                  label="Height (cm)"
                  type="number"
                  value={userProfile?.height || ""}
                  onChange={handleInputChange("height")}
                />
              </div>
              <div className={styles.inputGroup}>
                <CustomTextField
                  fullWidth
                  label="Weight (kg)"
                  type="number"
                  value={userProfile?.weight || ""}
                  onChange={handleInputChange("weight")}
                />
              </div>
              <div className={styles.fullWidth}>
                <CustomTextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={userProfile?.email || ""}
                  onChange={handleInputChange("email")}
                />
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
