"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
import styles from "./challengesCard.module.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { updateChallenge } from "@/services/servicesChallenge";
import { Challenge } from "@/types/interfaces/challenges";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useSnackbarStore } from "@/store/snackbarStore";
import { useChallenges } from "@/context/challenges-context-proivder";

interface ChallengeCardProps {
  challenge: Challenge;
  variant: "primary" | "secondary";
  onEdit: () => void;
}

export function ChallengesCard({ challenge, onEdit }: ChallengeCardProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { updateChallengeInState } = useChallenges();
  const { showSnackbar } = useSnackbarStore();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    onEdit();
  };

  const handleStatusUpdate = async (
    newStatus: "accepted" | "completed" | "failed"
  ) => {
    if (!session?.accessToken || !challenge.id) return;

    try {
      const updatedChallenge = {
        ...challenge,
        status: newStatus,
      };

      await updateChallenge(
        {
          id: challenge.id.toString(),
          title: challenge.title,
          description: challenge.description,
          status: newStatus,
        },
        session.accessToken,
        router,
        () => {
          updateChallengeInState(updatedChallenge);
          handleClose();

          switch (newStatus) {
            case "completed":
              showSnackbar(
                "Challenge erfolgreich abgeschlossen! 🎉",
                "success"
              );
              break;
            case "failed":
              showSnackbar(
                "Challenge nicht geschafft. Beim nächsten Mal klappt es bestimmt! 💪",
                "info"
              );
              break;
            case "accepted":
              showSnackbar("Challenge angenommen! Viel Erfolg! 💪", "success");
              break;
          }
        }
      );
    } catch (error) {
      console.error("Fehler beim Status-Update:", error);
      showSnackbar("Fehler beim Aktualisieren der Challenge", "error");
    }
  };

  return (
    <div className={styles.listItem}>
      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <div className={styles.infoContainer}>
            <div className={styles.infoGroup}>
              <span className={styles.label}>Titel:</span>
              <span className={styles.title}>{challenge.title}</span>
            </div>
            <div className={styles.infoGroup}>
              <span className={styles.label}>Beschreibung:</span>
              <span className={styles.description}>
                {challenge.description}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          {challenge.status === "pending" && (
            <>
              <Button
                onClick={() => handleStatusUpdate("accepted")}
                className={styles.acceptButton}
                variant="contained"
              >
                Annehmen
              </Button>
              <Button
                onClick={() => handleStatusUpdate("failed")}
                className={styles.rejectButton}
                variant="contained"
              >
                Ablehnen
              </Button>
            </>
          )}

          {challenge.status === "accepted" && (
            <>
              <Button
                onClick={() => handleStatusUpdate("completed")}
                className={styles.completedButton}
                variant="contained"
              >
                Geschafft
              </Button>
              <Button
                onClick={() => handleStatusUpdate("failed")}
                className={styles.rejectButton}
                variant="contained"
              >
                Nicht geschafft
              </Button>
            </>
          )}

          <IconButton onClick={handleClick} className={styles.menuButton}>
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>Bearbeiten</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
