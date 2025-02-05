"use client";
import { Avatar as MuiAvatar, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import styles from "./avatar.module.css";
import { useEffect, useState } from "react";
import { fetchUserAvatar } from "@/utils/api";
import { useSession } from "next-auth/react";
import { uploadAvatar, deleteAvatar } from "@/services/servicesAvatar";
import { useRouter } from "next/navigation";
import { avatarSchema } from "@/validations/avatarShema";
import { z } from "zod";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export function Avatar() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarId, setAvatarId] = useState<number | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const loadAvatar = async () => {
      try {
        if (session?.accessToken) {
          const avatarData = await fetchUserAvatar(session.accessToken);
          if (avatarData?.url) {
            setAvatarUrl(avatarData.url);
            setAvatarId(avatarData.id);
          }
        }
      } catch (error) {
        console.error("Fehler beim Laden des Avatars:", error);
      }
    };

    loadAvatar();
  }, [session]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && session?.accessToken) {
      try {
        const validatedFile = avatarSchema.parse({ file });
        await uploadAvatar(validatedFile.file, session.accessToken, router);

        try {
          const avatarData = await fetchUserAvatar(session.accessToken);
          if (avatarData?.url) {
            setAvatarUrl(avatarData.url);
            setAvatarId(avatarData.id);
          }
        } catch (fetchError) {
          console.error(
            "Fehler beim Abrufen des aktualisierten Avatars:",
            fetchError
          );
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("Validierungsfehler:", error.errors[0].message);
        } else {
          console.error("Fehler beim Upload des Avatars:", error);
        }
      }
    }
  };

  const handleDeleteAvatar = async () => {
    if (session?.accessToken && avatarId !== null) {
      try {
        await deleteAvatar(avatarId, session.accessToken, router);
        setAvatarUrl(null);
        setAvatarId(null);
      } catch (error) {
        console.error("Fehler beim Löschen des Avatars:", error);
      }
    }
  };

  return (
    <div className={styles.avatarContainer}>
      <MuiAvatar
        className={styles.avatar}
        alt="Profile Picture"
        src={avatarUrl || undefined} // Fallback auf undefined, wenn avatarUrl null ist
      />
      <div className={styles.buttonGroup}>
        <Button
          component="label"
          variant="outlined"
          className={styles.uploadButton}
        >
          Upload
          <VisuallyHiddenInput
            type="file"
            onChange={handleFileChange}
            accept="image/png,image/jpeg,image/webp"
          />
        </Button>
        {avatarUrl && (
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteAvatar}
            className={styles.deleteButton}
          >
            Löschen
          </Button>
        )}
      </div>
      <Typography variant="caption" color="white" style={{ marginTop: "4px" }}>
        Erlaubte Formate: PNG, JPEG, WebP
      </Typography>
    </div>
  );
}
