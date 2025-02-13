"use client";
import { Button, Container, Typography, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  UserProfile,
  UpdateUserProfileData,
} from "@/types/interfaces/userProfile";
import { fetchUserData } from "@/utils/api";
import { updateUserProfile } from "@/services/servicesUserprofile";
import { useRouter } from "next/navigation";
import { useSnackbarStore } from "@/store/snackbarStore";
import { CustomTextField } from "../ui/customTextField";
import { Avatar } from "../avtar/avatar";
import styles from "./profile-settings.module.css";

export function ProfileSettings() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const { showSnackbar } = useSnackbarStore();

  useEffect(() => {
    if (session?.accessToken) {
      fetchUserData(session.accessToken)
        .then(setUserProfile)
        .catch(() => showSnackbar("Fehler beim Laden des Profils", "error"));
    }
  }, [session, showSnackbar]);

  const handleInputChange =
    (field: keyof UserProfile) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (userProfile) {
        setUserProfile({ ...userProfile, [field]: event.target.value });
      }
    };

  const handleSave = async () => {
    if (!userProfile || !session?.accessToken) return;

    try {
      const originalProfile = await fetchUserData(session.accessToken);
      const updateData: Record<string, string | number> = {};

      const fields = [
        "firstName",
        "lastName",
        "email",
        "height",
        "weight",
      ] as const;
      fields.forEach((field) => {
        if (userProfile[field] !== originalProfile[field]) {
          const value = ["height", "weight"].includes(field)
            ? Number(userProfile[field]) || undefined
            : userProfile[field];

          const key =
            field === "firstName"
              ? "first_name"
              : field === "lastName"
              ? "last_name"
              : field;

          if (value !== undefined) {
            updateData[key] = value;
          }
        }
      });

      if (Object.keys(updateData).length > 0) {
        await updateUserProfile(
          updateData as UpdateUserProfileData,
          session.accessToken
        );
        showSnackbar("Profil erfolgreich aktualisiert", "success");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Profils:", error);
      showSnackbar("Fehler beim Aktualisieren des Profils", "error");
    }
  };

  return (
    <Container maxWidth="lg" className={styles.profileContainer}>
      <Paper elevation={3} className={styles.paper}>
        <Typography className={styles.title} variant="h4">
          Profil bearbeiten
        </Typography>

        <div className={styles.mainGrid}>
          <div className={styles.formSection}>
            {["firstName", "lastName", "height", "weight", "email"].map(
              (field) => (
                <CustomTextField
                  key={field}
                  fullWidth
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  type={
                    ["height", "weight"].includes(field)
                      ? "number"
                      : field === "email"
                      ? "email"
                      : "text"
                  }
                  value={userProfile?.[field as keyof UserProfile] || ""}
                  onChange={handleInputChange(field as keyof UserProfile)}
                />
              )
            )}
            <Button
              className={styles.saveButton}
              variant="contained"
              fullWidth
              onClick={handleSave}
            >
              Speichern
            </Button>
          </div>

          <div className={styles.avatarSection}>
            <Avatar />
          </div>
        </div>
      </Paper>
    </Container>
  );
}
