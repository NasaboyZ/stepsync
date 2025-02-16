"use client";

import { Avatar as MuiAvatar, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import styles from "./avatar.module.css";
import { useEffect } from "react";
import { fetchUserAvatar } from "@/utils/api";
import { useSession } from "next-auth/react";
import { uploadAvatar, deleteAvatar } from "@/services/servicesAvatar";
import { useRouter } from "next/navigation";
import { avatarSchema } from "@/validations/avatarShema";
import { z } from "zod";
import { useAvatar } from "@/context/avatar-context-provider";

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
  const { avatarUrl, setAvatarUrl } = useAvatar();
  const { data: session } = useSession();
  const router = useRouter();

  {
    /*
      returns: Lädt das Benutzeravatar-Bild, falls eine aktive Session mit einem accessToken vorhanden ist.
      - Wenn ein accessToken existiert, ruft die Funktion `fetchUserAvatar` die Avatar-URL vom Server ab.
      - Falls erfolgreich, wird die `avatarUrl` mit dem Pfad des Avatars aktualisiert.
      - Falls ein Fehler auftritt, wird dieser in der Konsole ausgegeben, und die Funktion gibt `null` zurück.
    */
  }
  useEffect(() => {
    const loadAvatar = async () => {
      try {
        if (session?.accessToken) {
          const avatarData = await fetchUserAvatar(session.accessToken);
          setAvatarUrl(avatarData.path || undefined);
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    };

    loadAvatar();
  }, [session, setAvatarUrl]);

  {
    /*
     returns:
      - Aktualisiert die `avatarUrl`, wenn der Upload erfolgreich ist.
      - Gibt eine Fehlermeldung in der Konsole aus, falls ein Fehler auftritt.
    */
  }
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && session?.accessToken) {
      try {
        const validatedFile = avatarSchema.parse({ file });
        const response = await uploadAvatar(
          validatedFile.file,
          session.accessToken,
          router
        );
        if (response?.path) {
          setAvatarUrl(response.path);
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

  {
    /*
    returns:
    - Setzt `avatarUrl` auf `undefined`, wenn das Löschen erfolgreich war.
    - Gibt eine Fehlermeldung in der Konsole aus, falls ein Fehler auftritt.
    */
  }
  const handleDeleteAvatar = async () => {
    if (session?.accessToken) {
      try {
        await deleteAvatar(session.accessToken, router);
        setAvatarUrl(undefined);
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
        src={avatarUrl || undefined}
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
            accept="image/png,image/jpeg,image/jpg, image/webp"
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
        Erlaubte Formate: PNG, JPEG, JPG, WEBP
      </Typography>
    </div>
  );
}
