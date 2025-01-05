"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import styles from "./challengesCard.module.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { updateChallengeStatus } from "@/services/servicesChallenge";
import { Challenge } from "@/types/interfaces/challenges";
import { FaEdit } from "react-icons/fa";

interface ChallengeCardProps {
  challenge: Challenge;
  variant: "primary" | "secondary";
}

export function ChallengesCard({ challenge }: ChallengeCardProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [status, setStatus] = useState<
    "pending" | "accepted" | "completed" | "failed"
  >(challenge.status);

  const handleStatusUpdate = async (
    newStatus: "accepted" | "completed" | "failed"
  ) => {
    if (!session?.accessToken || !challenge.id) return;

    try {
      await updateChallengeStatus(
        {
          id: challenge.id,
          title: challenge.title,
          description: challenge.description,
          goal: challenge.goal,
          status: newStatus,
        },
        session.accessToken,
        router,
        () => {
          setStatus(newStatus);
          router.refresh();
        }
      );
    } catch (error) {
      console.error("Fehler beim Status-Update:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.title}>{challenge.title}</div>
          <motion.button
            className={styles.editButton}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => console.log("Edit clicked")}
          >
            <FaEdit />
          </motion.button>
        </div>
        <div className={styles.description}>{challenge.description}</div>
        <div className={styles.goal}>{challenge.goal}</div>

        {status === "pending" && (
          <motion.div
            className={styles.buttonContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={() => handleStatusUpdate("accepted")}
              className={`${styles.button} ${styles.primary}`}
            >
              Annehmen
            </Button>
            <Button
              onClick={() => handleStatusUpdate("failed")}
              className={`${styles.button} ${styles.secondary}`}
            >
              Ablehnen
            </Button>
          </motion.div>
        )}

        {status === "accepted" && (
          <motion.div
            className={styles.buttonContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={() => handleStatusUpdate("completed")}
              className={`${styles.button} ${styles.primary}`}
            >
              Geschafft
            </Button>
            <Button
              onClick={() => handleStatusUpdate("failed")}
              className={`${styles.button} ${styles.secondary}`}
            >
              Nicht geschafft
            </Button>
          </motion.div>
        )}

        {status === "completed" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.statusText}>🎉 Challenge gemeistert!</div>
          </motion.div>
        )}

        {status === "failed" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.statusText}>
              Vielleicht klappt es beim nächsten Mal! 💪
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
