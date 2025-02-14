"use client";

import { Box, Typography, Card, CardContent, Slider } from "@mui/material";
import { RegisterFormSchema } from "@/validations/register-form-schema";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FormState,
} from "react-hook-form";
import styles from "../register.module.css";
import { step3Schema } from "@/validations/register-form-schema";

interface Step3Props {
  form: {
    register: UseFormRegister<RegisterFormSchema>;
    formState: FormState<RegisterFormSchema>;
    setValue: UseFormSetValue<RegisterFormSchema>;
    watch: UseFormWatch<RegisterFormSchema>;
  };
}

export const Step3: React.FC<Step3Props> = ({
  form: {
    formState: { errors },
    setValue,
    watch,
  },
}) => {
  const selectedGoal = watch("goal");
  const weight = watch("weight") || 70;
  const height = watch("height") || 170;

  const validateAndSetHeight = (value: number) => {
    try {
      step3Schema.pick({ height: true }).parse({ height: value });
      setValue("height", value, { shouldValidate: true });
    } catch (error) {
      console.error("Validierungsfehler:", error);
    }
  };

  const validateAndSetWeight = (value: number) => {
    try {
      step3Schema.pick({ weight: true }).parse({ weight: value });
      setValue("weight", value, { shouldValidate: true });
    } catch (error) {
      console.error("Validierungsfehler:", error);
    }
  };

  const validateAndSetGoal = (value: string) => {
    try {
      step3Schema.pick({ goal: true }).parse({ goal: value });
      setValue("goal", value, { shouldValidate: true });
    } catch (error) {
      console.error("Validierungsfehler:", error);
    }
  };

  return (
    <Box className={styles.stepContainer}>
      <Box>
        <Typography variant="h5" gutterBottom>
          Grösse und Gewicht
        </Typography>

        <Box className={styles.sliderContainer}>
          <Typography gutterBottom>Grösse</Typography>
          <Slider
            value={height}
            onChange={(_, value) => validateAndSetHeight(value as number)}
            min={100}
            max={300}
            className={styles.slider}
          />
          <Box className={styles.sliderValueContainer}>
            <Typography color="error" variant="caption">
              {errors.height?.message}
            </Typography>
            <Typography>{height} cm</Typography>
          </Box>
        </Box>

        <Box className={styles.sliderContainer}>
          <Typography gutterBottom>Gewicht</Typography>
          <Slider
            value={weight}
            onChange={(_, value) => validateAndSetWeight(value as number)}
            min={20}
            max={290}
            className={styles.slider}
          />
          <Box className={styles.sliderValueContainer}>
            <Typography color="error" variant="caption">
              {errors.weight?.message}
            </Typography>
            <Typography>{weight} kg</Typography>
          </Box>
        </Box>
      </Box>

      <Typography variant="h5" gutterBottom>
        Was ist dein Ziel?
      </Typography>
      <Box className={styles.goalCardsContainer}>
        {[
          {
            id: "lose_weight",
            label: "Gewicht verlieren",
            description:
              "Starte deine Reise zum Gewichtsverlust mit personalisierten Trainingsplänen und Ernährungsberatung.",
            icon: "🎯",
          },
          {
            id: "build_muscle",
            label: "Muskelaufbau",
            description:
              "Werde stärker und baue Muskeln auf mit maßgeschneiderten Übungen und Ernährungsplänen.",
            icon: "💪",
          },
        ].map((goal) => (
          <Card
            key={goal.id}
            onClick={() => validateAndSetGoal(goal.id)}
            className={`${styles.goalCard} ${
              selectedGoal === goal.id ? styles.selected : styles.unselected
            }`}
          >
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Typography variant="h6">{goal.icon}</Typography>
                <Typography variant="h6">{goal.label}</Typography>
              </Box>
              <Typography variant="body2">{goal.description}</Typography>
              {selectedGoal === goal.id && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "var(--green, #4CAF50)",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    border: "2px solid currentColor",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✓
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
      {errors.goal && (
        <Typography
          color="error"
          variant="caption"
          sx={{ mt: 1, display: "block" }}
        >
          {errors.goal.message}
        </Typography>
      )}
    </Box>
  );
};
