"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, Typography, Button } from "@mui/material";
import styles from "./challengesCard.module.css";

interface ChallengeCardProps {
  variant: "primary" | "secondary";
  challenge: {
    id: number;
    title: string;
    description: string;
    goal: string;
    status: boolean;
    start_date: string;
    end_date: string;
  };
}

export function ChallengesCard({ variant, challenge }: ChallengeCardProps) {
  const [status, setStatus] = useState<
    "pending" | "accepted" | "completed" | "failed"
  >("pending");

  const handleAccept = () => {
    setStatus("accepted");
    // Hier könnte API-Call erfolgen
  };

  const handleReject = () => {
    setStatus("failed");
    // Hier könnte API-Call erfolgen
  };

  const handleComplete = () => {
    setStatus("completed");
    // Hier könnte API-Call erfolgen
  };

  const handleFail = () => {
    setStatus("failed");
    // Hier könnte API-Call erfolgen
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`${styles.card} ${styles[variant]}`}>
        <CardContent>
          <Typography variant="h5" className={styles.title}>
            {challenge.title}
          </Typography>
          <Typography variant="body2" className={styles.description}>
            {challenge.description}
          </Typography>
          <Typography variant="body2" className={styles.goal}>
            {challenge.goal}
          </Typography>

          {status === "pending" && (
            <motion.div
              className={styles.buttonContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant="contained"
                onClick={handleAccept}
                className={styles.button}
                sx={{ backgroundColor: "var(--brown-light)" }}
              >
                Annehmen
              </Button>
              <Button
                variant="outlined"
                onClick={handleReject}
                className={styles.button}
                sx={{
                  borderColor: "var(--brown-light)",
                  color: "var(--brown-light)",
                }}
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
                variant="contained"
                onClick={handleComplete}
                className={styles.button}
                sx={{ backgroundColor: "var(--brown-light)" }}
              >
                Geschafft
              </Button>
              <Button
                variant="contained"
                onClick={handleFail}
                className={styles.button}
                sx={{ backgroundColor: "var(--red)" }}
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
              <Typography variant="body1" className={styles.statusText}>
                🎉 Challenge gemeistert!
              </Typography>
            </motion.div>
          )}

          {status === "failed" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Typography variant="body1" className={styles.statusText}>
                Vielleicht klappt es beim nächsten Mal! 💪
              </Typography>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
