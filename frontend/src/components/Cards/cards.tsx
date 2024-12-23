"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CardMedia,
} from "@mui/material";
import { motion } from "framer-motion";
import { FaDumbbell } from "react-icons/fa";
import styles from "./cards.module.css";

interface CardProps {
  variant: "primary" | "secondary";
}

export function WorkoutCard({ variant }: CardProps) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [repetitions, setRepetitions] = useState("");

  return (
    <Card className={`${styles.card} ${styles[variant]}`}>
      <CardContent>
        <Typography variant="h5" className={styles.title}>
          <FaDumbbell /> Workout
        </Typography>
        <TextField
          label="Kategorie"
          variant="outlined"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.input}
        />
        <TextField
          label="Beschreibung"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.input}
        />
        <TextField
          label="Gewicht"
          variant="outlined"
          fullWidth
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className={styles.input}
        />
        <TextField
          label="Wiederholungen"
          variant="outlined"
          fullWidth
          value={repetitions}
          onChange={(e) => setRepetitions(e.target.value)}
          className={styles.input}
        />
      </CardContent>
    </Card>
  );
}

export function ChallengeCard({ variant }: CardProps) {
  const [status, setStatus] = useState<
    "pending" | "accepted" | "completed" | "failed"
  >("pending");

  return (
    <Card className={`${styles.card} ${styles[variant]}`}>
      <CardContent>
        <Typography variant="h5" className={styles.title}>
          30 Tage Plank Challenge
        </Typography>
        <CardMedia
          component="img"
          height="140"
          image="/path-to-challenge-image.jpg"
          alt="Plank Challenge"
          className={styles.media}
        />
        <Typography variant="body2" className={styles.description}>
          Halte eine Plank-Position für mindestens 5 Minuten täglich. Stärkt
          deinen Kern und steigert deine Ausdauer!
        </Typography>
        {status === "pending" && (
          <motion.div className={styles.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setStatus("accepted")}
              className={styles.button}
            >
              Annehmen
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setStatus("failed")}
              className={styles.button}
            >
              Ablehnen
            </Button>
          </motion.div>
        )}
        {status === "accepted" && (
          <motion.div className={styles.buttonContainer}>
            <Button
              variant="contained"
              color="success"
              onClick={() => setStatus("completed")}
              className={styles.button}
            >
              Geschafft
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setStatus("failed")}
              className={styles.button}
            >
              Nicht geschafft
            </Button>
          </motion.div>
        )}
        {status === "completed" && (
          <Typography variant="body1" className={styles.statusText}>
            Glückwunsch! Du hast die Challenge gemeistert!
          </Typography>
        )}
        {status === "failed" && (
          <Typography variant="body1" className={styles.statusText}>
            Schade! Vielleicht klappt es beim nächsten Mal.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
