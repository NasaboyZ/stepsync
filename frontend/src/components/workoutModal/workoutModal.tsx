import {
  Modal,
  Box,
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
import { Button, ButtonStyle } from "../button/Button";

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
      className={styles.modal}
    >
      <Box className={styles.modalContent}>
        <FormControl className={styles.formControl}>
          <InputLabel className={styles.inputLabel}>Trainingsart</InputLabel>
          <Select
            value={selectedType}
            label="Trainingsart"
            onChange={(e) =>
              handleTypeChange(e.target.value as "krafttraining" | "cardio")
            }
            className={styles.select}
            MenuProps={{
              PaperProps: {
                className: styles.menuPaper,
              },
              classes: {
                root: styles.menuItem,
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
              className={`${styles.inputField} ${styles.textField}`}
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
              className={`${styles.inputField} ${styles.textField}`}
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
                className={`${styles.distanceInput} ${styles.textField}`}
              />
              <FormControl className={styles.unitSelect}>
                <InputLabel
                  id="distance-unit-label"
                  className={styles.inputLabel}
                >
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
                  className={styles.select}
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
              className={`${styles.inputField} ${styles.textField}`}
            />
            <Button
              label="Speichern"
              onClick={handleCardioSave}
              style={ButtonStyle.PRIMARY_DARK}
            />
          </div>
        )}
      </Box>
    </Modal>
  );
};
