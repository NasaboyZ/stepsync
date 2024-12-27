"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { FaDumbbell } from "react-icons/fa";
import styles from "./cards.module.css";

interface CardProps {
  variant: "primary" | "secondary";
  initialData?: WorkoutData;
  readOnly?: boolean;
  onSave?: (data: WorkoutData) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}
interface WorkoutData {
  id?: number;
  category: string;
  description: string;
  weight: number;
  repetitions: number;
  user_id?: number;
}

interface ChallengeCardProps extends CardProps {
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

export function WorkoutCard({
  variant,
  initialData,
  readOnly = false,
  onSave,
  onEdit,
  onDelete,
}: CardProps) {
  const [category, setCategory] = useState(initialData?.category || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [weight, setWeight] = useState(initialData?.weight?.toString() || "");
  const [repetitions, setRepetitions] = useState(
    initialData?.repetitions?.toString() || ""
  );

  const handleSave = () => {
    if (onSave && initialData?.id) {
      onSave({
        id: initialData.id,
        category,
        description,
        weight: parseInt(weight),
        repetitions: parseInt(repetitions),
      });
    } else if (onSave) {
      onSave({
        category,
        description,
        weight: parseInt(weight),
        repetitions: parseInt(repetitions),
      });
    }
  };

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
          disabled={readOnly}
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
          disabled={readOnly}
        />
        <TextField
          label="Gewicht"
          variant="outlined"
          fullWidth
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className={styles.input}
          disabled={readOnly}
        />
        <TextField
          label="Wiederholungen"
          variant="outlined"
          fullWidth
          value={repetitions}
          onChange={(e) => setRepetitions(e.target.value)}
          className={styles.input}
          disabled={readOnly}
        />
        <div className={styles.buttonContainer}>
          {onSave && !readOnly && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              className={styles.button}
            >
              Speichern
            </Button>
          )}
          {onEdit && readOnly && (
            <Button
              variant="outlined"
              color="primary"
              onClick={onEdit}
              className={styles.button}
            >
              Bearbeiten
            </Button>
          )}
          {onDelete && readOnly && (
            <Button
              variant="outlined"
              color="error"
              onClick={onDelete}
              className={styles.button}
            >
              Löschen
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function ChallengeCard({ variant, challenge }: ChallengeCardProps) {
  const [status, setStatus] = useState<
    "pending" | "accepted" | "completed" | "failed"
  >("pending");

  return (
    <Card className={`${styles.card} ${styles[variant]}`}>
      <CardContent>
        <Typography variant="h5" className={styles.title}>
          {challenge.title}
        </Typography>
        <Typography variant="body2" className={styles.description}>
          {challenge.description}
        </Typography>
        <Typography variant="body2" className={styles.goal}>
          Ziel: {challenge.goal}
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
