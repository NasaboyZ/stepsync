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
