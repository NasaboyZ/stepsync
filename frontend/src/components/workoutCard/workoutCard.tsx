"use client";

import React, { useState, useEffect } from "react";
import { Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import styles from "./workoutCard.module.css";
import { WorkoutCardProps, WorkoutData } from "@/types/interfaces/workoutData";
import { CustomTextField } from "../ui/customTextField";
import { Button, ButtonStyle } from "../button/Button";

const formatDistanceUnit = (unit: string | null | undefined): string => {
  if (!unit) return "";
  switch (unit) {
    case "kilometer":
      return "km";
    case "meter":
      return "m";
    case "Runde":
      return "Runde(n)";
    default:
      return "";
  }
};

export function WorkoutCard({
  initialData,
  isEditing = false,
  onEdit,
  onDelete,
  onSave,
  onStatusChange,
}: WorkoutCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [weight, setWeight] = useState(initialData?.weight?.toString() || "");
  const [repetitions, setRepetitions] = useState(
    initialData?.repetitions?.toString() || ""
  );
  const [isCompleted, setIsCompleted] = useState(
    initialData?.is_completed || false
  );

  useEffect(() => {
    setTitle(initialData?.title || "");
    setIsCompleted(initialData?.is_completed || false);
  }, [initialData?.title, initialData?.is_completed]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    if (typeof onEdit === "function") {
      onEdit();
    }
  };

  const handleDelete = () => {
    handleClose();
    if (typeof onDelete === "function") {
      onDelete();
    }
  };

  {/* 
      returns:
     - Kein Rückgabewert, löst aber die Speicherung des Workouts aus.  
  */}

  const handleSave = () => {
    if (typeof onSave === "function" && initialData) {
      const workoutData: WorkoutData = {
        category: initialData.category,
        title,
        description,
        weight: Number(weight),
        repetitions: Number(repetitions),
        distance: initialData.distance,
        distance_unit: initialData.distance_unit,
        is_completed: isCompleted,
      };
      onSave(workoutData);
    }
  };

  {/* 
   returns:
  - Kein Rückgabewert, aktualisiert jedoch den Status des Workouts.
  */}
  const handleToggleComplete = async () => {
    try {
      if (initialData.id && onStatusChange) {
        const newStatus = !isCompleted;
        await onStatusChange(newStatus);
        setIsCompleted(newStatus);
      }
    } catch (error) {
      console.error("Fehler:", error);
    }
  };

  {/*   
    returns:
    - Eine formatierte Zeichenkette mit relevanten Workout-Details, abhängig von der Workout-Kategorie.
  */}

  const getWorkoutDetails = () => {
    if (initialData.category === "cardio") {
      const distanceUnit = formatDistanceUnit(initialData.distance_unit);
      return `${initialData.description} - ${initialData.distance} ${distanceUnit} × ${initialData.repetitions} Wdh.`;
    }
    return `${initialData.description} - ${initialData.weight}kg × ${initialData.repetitions} Wdh.`;
  };

  if (isEditing) {
    return (
      <div className={styles.editContainer}>
        <Typography variant="h6" className={styles.category}>
          {initialData ? "Workout bearbeiten" : "Neues Workout"}
        </Typography>

        <div className={styles.editForm}>
          <CustomTextField
            label="Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            className={styles.inputField}
            sx={{ mb: 2 }}
            placeholder="z.B. Legpress, Squats, Benchpress..."
          />

          <CustomTextField
            label="Beschreibung"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            className={styles.inputField}
            sx={{ mb: 2 }}
            placeholder="Beschreibe dein Workout..."
          />

          <div className={styles.numberInputs}>
            <CustomTextField
              label="Gewicht (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              type="number"
              className={styles.weightInput}
            />
            <CustomTextField
              label="Wiederholungen"
              value={repetitions}
              onChange={(e) => setRepetitions(e.target.value)}
              type="number"
              className={styles.repsInput}
            />
          </div>

          <Button
            label="Speichern"
            style={ButtonStyle.PRIMARY_DARK}
            onClick={handleSave}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.workoutInfo}>
      <div className={styles.mainInfo}>
        <Typography variant="body2" className={styles.workoutType}>
          {initialData?.category === "krafttraining"
            ? "Krafttraining"
            : "Cardio"}
        </Typography>
        <Typography variant="h6" className={styles.category}>
          {title}
        </Typography>
        <Typography variant="body2" className={styles.details}>
          {getWorkoutDetails()}
        </Typography>
      </div>

      <div className={styles.dateInfo}>
        {initialData?.created_at && (
          <Typography variant="body2">
            {new Date(initialData.created_at).toLocaleDateString()}
          </Typography>
        )}
      </div>

      <div className={styles.rightControls}>
        <div
          className={styles.checkboxContainer}
          onClick={handleToggleComplete}
        >
          <div
            className={`${styles.checkbox} ${
              isCompleted ? styles.completed : ""
            }`}
          >
            ✓
          </div>
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
    </div>
  );
}
