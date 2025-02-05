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
  Box,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import styles from "./workoutCard.module.css";
import { WorkoutCardProps, WorkoutData } from "@/types/interfaces/workoutData";

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
  const [isCompleted, setIsCompleted] = useState(false);

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
      };
      onSave(workoutData);
    }
  };

  const handleToggleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  // Formatierte Details für die Anzeige
  const getWorkoutDetails = () => {
    if (initialData.category === "cardio") {
      const distanceUnit = formatDistanceUnit(initialData.distance_unit);
      return `${initialData.description} - ${initialData.distance} ${distanceUnit} × ${initialData.repetitions} Wdh.`;
    }
    return `${initialData.description} - ${initialData.weight}kg × ${initialData.repetitions} Wdh.`;
  };

  if (isEditing) {
    return (
      <Card className={styles.listCard}>
        <div className={styles.editContainer}>
          <Typography variant="h6" className={styles.category}>
            {initialData ? "Workout bearbeiten" : "Neues Workout"}
          </Typography>

          <div className={styles.editForm}>
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
                "&:hover fieldset": {
                  borderColor: "white ",
                },
                "& .Mui-focused fieldset": {
                  borderColor: "white ",
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
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
              sx={{
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white ",
                },
                "& .Mui-focused fieldset": {
                  borderColor: "white ",
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
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
                sx={{
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldsset": {
                    borderColor: "white ",
                  },
                  "& .Mui-focused fieldset": {
                    borderColor: "white ",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />
              <TextField
                label="Wiederholungen"
                value={repetitions}
                onChange={(e) => setRepetitions(e.target.value)}
                type="number"
                variant="outlined"
                size="small"
                sx={{
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white ",
                  },
                  "& .Mui-focused fieldset": {
                    borderColor: "white ",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
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
              color: isCompleted ? "var(--green, #4CAF50)" : "#433b3b",
              borderColor: isCompleted ? "var(--green, #4CAF50)" : "#433b3b",
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
