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
            onChange={(_, value) =>
              setValue("height", value as number, { shouldValidate: true })
            }
            min={50}
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
            onChange={(_, value) =>
              setValue("weight", value as number, { shouldValidate: true })
            }
            min={20}
            max={500}
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
            onClick={() => setValue("goal", goal.id, { shouldValidate: true })}
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
