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
import { workoutSchema } from "../../validations/workout-shema";
import { z } from "zod";

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
  const [errors, setErrors] = useState<{
    category?: string;
    description?: string;
    weight?: string;
    repetitions?: string;
  }>({});

  const handleSave = () => {
    try {
      const validatedData = workoutSchema.parse({
        category,
        description,
        weight,
        repetitions,
      });

      setErrors({});

      if (onSave && initialData?.id) {
        onSave({
          id: initialData.id,
          ...validatedData,
        });
      } else if (onSave) {
        onSave(validatedData);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: {
          [key: string]: string;
        } = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as string;
          formattedErrors[path] = err.message;
        });
        setErrors(formattedErrors);
      }
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
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
          error={!!errors.category}
          helperText={errors.category}
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
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          label="Gewicht"
          variant="outlined"
          fullWidth
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className={styles.input}
          disabled={readOnly}
          error={!!errors.weight}
          helperText={errors.weight}
        />
        <TextField
          label="Wiederholungen"
          variant="outlined"
          fullWidth
          value={repetitions}
          onChange={(e) => setRepetitions(e.target.value)}
          className={styles.input}
          disabled={readOnly}
          error={!!errors.repetitions}
          helperText={errors.repetitions}
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
              onClick={handleEdit}
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
