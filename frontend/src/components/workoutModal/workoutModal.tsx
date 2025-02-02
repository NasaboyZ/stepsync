import {
  Modal,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { WorkoutCard } from "../workoutCard/workoutCard";
import { WorkoutData } from "@/types/interfaces/workoutData";
import styles from "./workoutModal.module.css";
import { useState } from "react";

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
  const [cardioData, setCardioData] = useState<CardioFormData>({
    title: editingWorkout?.title || "",
    description: editingWorkout?.description || "",
    distance: editingWorkout?.distance || 0,
    distanceUnit: "kilometer",
    repetitions: editingWorkout?.repetitions || 0,
  });

  const handleCardioSave = () => {
    onSave({
      category: "cardio",
      title: cardioData.title,
      description: cardioData.description,
      distance: cardioData.distance,
      distance_unit: cardioData.distanceUnit,
      repetitions: cardioData.repetitions,
      weight: null,
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
              setSelectedType(e.target.value as "krafttraining" | "cardio")
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
              editingWorkout || {
                category: "krafttraining",
                title: "",
                description: "",
                weight: 0,
                repetitions: 0,
                distance: null,
                distance_unit: null,
              }
            }
            isEditing={true}
            onSave={onSave}
          />
        ) : (
          <div className={styles.cardioForm}>
            <TextField
              fullWidth
              label="Titel"
              value={cardioData.title}
              onChange={(e) =>
                setCardioData((prev) => ({ ...prev, title: e.target.value }))
              }
              className={styles.inputField}
              sx={{
                mb: 2,
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
            />
            <TextField
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
              sx={{
                mb: 2,
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "& .Mui-focused fieldset": {
                  borderColor: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <div className={styles.distanceContainer}>
              <TextField
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
            <TextField
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
              sx={{
                mt: 2,
                mb: 2,
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
