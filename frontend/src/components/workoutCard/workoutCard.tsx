"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { FaDumbbell } from "react-icons/fa";
import styles from "./workoutCard.module.css";

interface WorkoutCardProps {
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

export function WorkoutCard({
  variant,
  initialData,
  readOnly = false,
  onSave,
  onEdit,
  onDelete,
}: WorkoutCardProps) {
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
