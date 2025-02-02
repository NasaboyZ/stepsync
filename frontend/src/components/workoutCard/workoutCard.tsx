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
  Box,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import styles from "./workoutCard.module.css";
import { WorkoutCardProps, WorkoutData } from "@/types/interfaces/workoutData";

export function WorkoutCard({
  initialData,
  isEditing = false,
  onEdit,
  onDelete,
  onSave,
}: WorkoutCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [category, setCategory] = useState<WorkoutData["category"]>(
    initialData?.category || "krafttraining"
  );
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [weight, setWeight] = useState(initialData?.weight?.toString() || "");
  const [repetitions, setRepetitions] = useState(
    initialData?.repetitions?.toString() || ""
  );
  const [isCompleted, setIsCompleted] = useState(false);

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
        category,
        title,
        description,
        weight: Number(weight),
        repetitions: Number(repetitions),
      });
    }
  };

  const handleToggleComplete = () => {
    setIsCompleted(!isCompleted);
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
                value={category}
                label="Trainingsart"
                onChange={(e) =>
                  setCategory(e.target.value as WorkoutData["category"])
                }
              >
                <MenuItem value="krafttraining">Krafttraining</MenuItem>
                <MenuItem value="cardio">Cardio</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Titel"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            {category === "krafttraining" ? "Krafttraining" : "Cardio"}
          </Typography>
          <Typography variant="h6" className={styles.category}>
            {title}
          </Typography>
          <Typography variant="body2" className={styles.details}>
            {description} - {weight}kg × {repetitions} Wdh.
          </Typography>
        </div>

        <div className={styles.dateInfo}>
          {initialData?.created_at && (
            <Typography variant="body2">
              {new Date(initialData.created_at).toLocaleDateString()}
            </Typography>
          )}
        </div>

        <div
          className={styles.checkboxContainer}
          onClick={handleToggleComplete}
        >
          <Box
            sx={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              border: "2px solid #fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: isCompleted ? "var(--green, #4CAF50)" : "#fff",
              borderColor: isCompleted ? "var(--green, #4CAF50)" : "#fff",
              marginRight: "12px",
            }}
          >
            ✓
          </Box>
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
