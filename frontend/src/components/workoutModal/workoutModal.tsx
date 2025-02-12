import {
  Modal,
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { WorkoutCard } from "../workoutCard/workoutCard";
import { WorkoutData } from "@/types/interfaces/workoutData";
import styles from "./workoutModal.module.css";
import { useState, useEffect } from "react";
import { CustomTextField } from "../ui/customTextField";

type DistanceUnit = "meter" | "kilometer";

interface CardioFormData {
  title: string;
  description: string;
  distance: number;
  distanceUnit: DistanceUnit;
  repetitions: number;
}

interface WorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workoutData: WorkoutData) => void;
  editingWorkout: WorkoutData | null;
  modalType?: "krafttraining" | "cardio";
}

export const WorkoutModal = ({
  isOpen,
  onClose,
  onSave,
  editingWorkout,
  modalType = "krafttraining",
}: WorkoutModalProps) => {
  const [selectedType, setSelectedType] = useState(modalType);
  const [localEditingWorkout, setLocalEditingWorkout] =
    useState<WorkoutData | null>(editingWorkout);
  const [cardioData, setCardioData] = useState<CardioFormData>({
    title: editingWorkout?.title || "",
    description: editingWorkout?.description || "",
    distance: editingWorkout?.distance || 0,
    distanceUnit: "kilometer",
    repetitions: editingWorkout?.repetitions || 0,
  });

  useEffect(() => {
    setLocalEditingWorkout(editingWorkout);
    if (editingWorkout) {
      setSelectedType(editingWorkout.category as "krafttraining" | "cardio");
      if (editingWorkout.category === "cardio") {
        setCardioData({
          title: editingWorkout.title || "",
          description: editingWorkout.description || "",
          distance: editingWorkout.distance || 0,
          distanceUnit:
            (editingWorkout.distance_unit as DistanceUnit) || "kilometer",
          repetitions: editingWorkout.repetitions || 0,
        });
      }
    }
  }, [editingWorkout]);

  const handleTypeChange = (newType: "krafttraining" | "cardio") => {
    setSelectedType(newType);
    setLocalEditingWorkout({
      category: newType,
      title: "",
      description: "",
      weight: newType === "krafttraining" ? 0 : null,
      repetitions: 0,
      distance: newType === "cardio" ? 0 : null,
      distance_unit: newType === "cardio" ? "kilometer" : null,
      is_completed: false,
    });

    if (newType === "krafttraining") {
      setCardioData({
        title: "",
        description: "",
        distance: 0,
        distanceUnit: "kilometer",
        repetitions: 0,
      });
    }
  };

  const handleCardioSave = () => {
    onSave({
      category: "cardio",
      title: cardioData.title,
      description: cardioData.description,
      distance: cardioData.distance,
      distance_unit: cardioData.distanceUnit,
      repetitions: cardioData.repetitions,
      weight: null,
      is_completed: false,
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="workout-modal"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "var(--brown-light)",
          borderRadius: "8px",
          padding: "24px",
          maxWidth: "90%",
          width: "500px",
        }}
      >
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "white" }}>Trainingsart</InputLabel>
          <Select
            value={selectedType}
            label="Trainingsart"
            onChange={(e) =>
              handleTypeChange(e.target.value as "krafttraining" | "cardio")
            }
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "var(--brown-light)",
                  "& .MuiMenuItem-root": {
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      },
                    },
                  },
                },
              },
            }}
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
          >
            <MenuItem value="krafttraining">Krafttraining</MenuItem>
            <MenuItem value="cardio">Cardio</MenuItem>
          </Select>
        </FormControl>

        {selectedType === "krafttraining" ? (
          <WorkoutCard
            variant="primary"
            initialData={
              localEditingWorkout || {
                category: "krafttraining",
                title: "",
                description: "",
                weight: 0,
                repetitions: 0,
                distance: null,
                distance_unit: null,
                is_completed: false,
              }
            }
            isEditing={true}
            onSave={onSave}
          />
        ) : (
          <div className={styles.cardioForm}>
            <CustomTextField
              fullWidth
              label="Titel"
              value={cardioData.title}
              onChange={(e) =>
                setCardioData((prev) => ({ ...prev, title: e.target.value }))
              }
              className={styles.inputField}
              sx={{ mb: 2 }}
            />
            <CustomTextField
              fullWidth
              label="Beschreibung"
              value={cardioData.description}
              onChange={(e) =>
                setCardioData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              multiline
              rows={3}
              className={styles.inputField}
              sx={{ mb: 2 }}
            />
            <div className={styles.distanceContainer}>
              <CustomTextField
                label="Distanz"
                type="number"
                value={cardioData.distance}
                onChange={(e) =>
                  setCardioData((prev) => ({
                    ...prev,
                    distance: Number(e.target.value),
                  }))
                }
                className={styles.distanceInput}
              />
              <FormControl className={styles.unitSelect}>
                <InputLabel id="distance-unit-label" sx={{ color: "white" }}>
                  Einheit
                </InputLabel>
                <Select
                  labelId="distance-unit-label"
                  value={cardioData.distanceUnit}
                  label="Einheit"
                  onChange={(e) =>
                    setCardioData((prev) => ({
                      ...prev,
                      distanceUnit: e.target.value as DistanceUnit,
                    }))
                  }
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white ",
                    },
                    "& .Mui-focused fieldset": {
                      borderColor: "white ",
                    },

                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                  }}
                >
                  <MenuItem value="meter">Meter</MenuItem>
                  <MenuItem value="kilometer">Kilometer</MenuItem>
                </Select>
              </FormControl>
            </div>
            <CustomTextField
              fullWidth
              label="Wiederholungen"
              type="number"
              value={cardioData.repetitions}
              onChange={(e) =>
                setCardioData((prev) => ({
                  ...prev,
                  repetitions: Number(e.target.value),
                }))
              }
              className={styles.inputField}
              sx={{ mt: 2, mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleCardioSave}
              className={styles.saveButton}
              fullWidth
            >
              Speichern
            </Button>
          </div>
        )}
      </Box>
    </Modal>
  );
};
