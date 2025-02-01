"use client";

import { Box, Typography, Card, CardContent, Slider } from "@mui/material";
import { RegisterFormSchema } from "@/validations/register-form-schema";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FormState,
} from "react-hook-form";

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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box>
        <Typography variant="h5" gutterBottom>
          Gewicht und Grösse
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Gewicht</Typography>
            <Slider
              value={weight}
              onChange={(_, value) => {
                setValue("weight", value as number, {
                  shouldValidate: true,
                });
              }}
              min={20}
              max={200}
              sx={{
                color: "var(--brown-light)",
                "& .MuiSlider-rail": {
                  backgroundColor: "white",
                },
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography color="error" variant="caption">
                {errors.weight?.message}
              </Typography>
              <Typography>{weight} kg</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Grösse</Typography>
            <Slider
              value={height}
              onChange={(_, value) => {
                setValue("height", value as number, {
                  shouldValidate: true,
                });
              }}
              min={50}
              max={250}
              sx={{
                color: "var(--brown-light)",
                "& .MuiSlider-rail": {
                  backgroundColor: "white",
                },
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography color="error" variant="caption">
                {errors.height?.message}
              </Typography>
              <Typography>{height} cm</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Fitness Goals */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Dein Fitness Ziel
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
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
              onClick={() =>
                setValue("goal", goal.id, { shouldValidate: true })
              }
              sx={{
                cursor: "pointer",
                backgroundColor:
                  selectedGoal === goal.id ? "var(--brown-light)" : "grey.700",
                color: "white",
                position: "relative",
                "&:hover": {
                  backgroundColor:
                    selectedGoal === goal.id
                      ? "var(--brown-light)"
                      : "grey.600",
                },
              }}
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
                      color: "var(--red)",
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
    </Box>
  );
};
