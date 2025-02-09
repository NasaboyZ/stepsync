"use client";
import { Button, Container, Typography, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserProfile } from "@/types/interfaces/userProfile";
import { fetchUserData } from "@/utils/api";
import { updateUserProfile } from "@/services/servicesUserprofile";
import { UpdateUserProfileData } from "@/types/interfaces/userProfile";

import styles from "./profile-settings.module.css";

import { Avatar } from "../avtar/avatar";
import { CustomTextField } from "../ui/customTextField";

import { useRouter } from "next/navigation";
import { useSnackbarStore } from "@/store/snackbarStore";

export function ProfileSettings() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const { showSnackbar } = useSnackbarStore();

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
  const handleSave = async () => {
    if (userProfile && session?.accessToken) {
      try {
        const originalProfile = await fetchUserData(session.accessToken);
        const updateData: Partial<UpdateUserProfileData> = {};

        if (userProfile.firstName !== originalProfile.firstName) {
          updateData.first_name = userProfile.firstName;
        }
        if (userProfile.lastName !== originalProfile.lastName) {
          updateData.last_name = userProfile.lastName;
        }
        if (userProfile.email !== originalProfile.email) {
          updateData.email = userProfile.email;
        }
        if (userProfile.height !== originalProfile.height) {
          updateData.height = userProfile.height
            ? Number(userProfile.height)
            : undefined;
        }
        if (userProfile.weight !== originalProfile.weight) {
          updateData.weight = userProfile.weight
            ? Number(userProfile.weight)
            : undefined;
        }

        if (Object.keys(updateData).length > 0) {
          const updatedProfile = await updateUserProfile(
            updateData,
            session.accessToken
          );
          setUserProfile(updatedProfile);
          showSnackbar("Profil erfolgreich aktualisiert", "success");
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Fehler beim Speichern:", error);
        showSnackbar("Fehler beim Aktualisieren des Profils", "error");
      }
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
                  onClick={handleSave}
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
