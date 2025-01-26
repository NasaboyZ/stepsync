"use client";

import React, { useState } from "react";
import {
  Card,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import styles from "./workoutCard.module.css";

const WORKOUT_TYPES = ["Krafttraining", "Cardio"] as const;
type WorkoutType = (typeof WORKOUT_TYPES)[number];

interface WorkoutCardProps {
  variant: "primary" | "secondary";
  initialData?: {
    workoutType: WorkoutType;
    category: string;
    description: string;
    weight: number;
    repetitions: number;
    created_at?: string;
  };
  isEditing?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: (data: {
    workoutType: WorkoutType;
    category: string;
    description: string;
    weight: number;
    repetitions: number;
  }) => void;
}

export function WorkoutCard({
  initialData,
  isEditing = false,
  onEdit,
  onDelete,
  onSave,
}: WorkoutCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [workoutType, setWorkoutType] = useState<WorkoutType>(
    initialData?.workoutType || "Krafttraining"
  );
  const [category, setCategory] = useState(initialData?.category || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [weight, setWeight] = useState(initialData?.weight?.toString() || "");
  const [repetitions, setRepetitions] = useState(
    initialData?.repetitions?.toString() || ""
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    if (onEdit) onEdit();
  };

  const handleDelete = () => {
    handleClose();
    if (onDelete) onDelete();
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        workoutType,
        category,
        description,
        weight: Number(weight),
        repetitions: Number(repetitions),
      });
    }
  };

  // Formular für das Modal
  if (isEditing) {
    return (
      <Card className={styles.listCard}>
        <div className={styles.editContainer}>
          <Typography variant="h6" className={styles.category}>
            {initialData ? "Workout bearbeiten" : "Neues Workout"}
          </Typography>

          <div className={styles.editForm}>
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>Trainingsart</InputLabel>
              <Select
                value={workoutType}
                label="Trainingsart"
                onChange={(e) => setWorkoutType(e.target.value as WorkoutType)}
              >
                {WORKOUT_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Titel"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                "& fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
              }}
              fullWidth
              placeholder="z.B. Legpress, Squats, Benchpress..."
            />

            <TextField
              label="Beschreibung"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Beschreibe dein Workout..."
            />

            <div className={styles.numberInputs}>
              <TextField
                label="Gewicht (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                type="number"
                variant="outlined"
                size="small"
              />
              <TextField
                label="Wiederholungen"
                value={repetitions}
                onChange={(e) => setRepetitions(e.target.value)}
                type="number"
                variant="outlined"
                size="small"
              />
            </div>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              fullWidth
              size="small"
            >
              Speichern
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={styles.listCard}>
      <div className={styles.workoutInfo}>
        <div className={styles.mainInfo}>
          <Typography variant="body2" className={styles.workoutType}>
            {initialData?.workoutType}
          </Typography>
          <Typography variant="h6" className={styles.category}>
            {initialData?.category}
          </Typography>
          <Typography variant="body2" className={styles.details}>
            {initialData?.description} - {initialData?.weight}kg ×{" "}
            {initialData?.repetitions} Wdh.
          </Typography>
        </div>

        <div className={styles.dateInfo}>
          {initialData?.created_at && (
            <Typography variant="body2">
              {new Date(initialData.created_at).toLocaleDateString()}
            </Typography>
          )}
        </div>

        <div className={styles.actions}>
          <IconButton onClick={handleClick}>
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>Bearbeiten</MenuItem>
            <MenuItem onClick={handleDelete}>Löschen</MenuItem>
          </Menu>
        </div>
      </div>
    </Card>
  );
}
