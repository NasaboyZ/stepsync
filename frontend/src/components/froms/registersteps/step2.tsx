"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import {
  type UseFormRegister,
  type FormState,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";
import { RegisterFormSchema } from "@/validations/register-form-schema";

interface Step2Props {
  form: {
    register: UseFormRegister<RegisterFormSchema>;
    formState: FormState<RegisterFormSchema>;
    setValue: UseFormSetValue<RegisterFormSchema>;
    watch: UseFormWatch<RegisterFormSchema>;
  };
}

const goalOptions = [
  {
    id: "muscle",
    title: "Muskelaufbau",
    description: "Baue Muskelmasse auf und werde stärker und gesünder",
    icon: "💪",
  },
  {
    id: "weight_loss",
    title: "Gewicht verlieren",
    description:
      "Fokussiere dich auf kalorienverbrennende Übungen, um Gewicht zu verlieren und definiert zu werden",
    icon: "🏃",
  },
];

export const Step2 = ({
  form: {
    formState: { errors },
    setValue,
    watch,
  },
}: Step2Props) => {
  const selectedGoal = watch("goal");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" gutterBottom>
        Wähle dein Ziel
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        {goalOptions.map((option) => (
          <Card
            key={option.id}
            sx={{
              cursor: "pointer",
              border: selectedGoal === option.id ? 2 : 1,
              borderColor:
                selectedGoal === option.id ? "primary.main" : "grey.300",
              "&:hover": { borderColor: "primary.main" },
              position: "relative",
            }}
            onClick={() =>
              setValue("goal", option.id, { shouldValidate: true })
            }
          >
            <CardContent>
              {selectedGoal === option.id && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "primary.main",
                  }}
                >
                  <CheckCircle />
                </Box>
              )}
              <Typography variant="h6">{option.title}</Typography>
              <Typography variant="body2">{option.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      {errors.goal && (
        <Typography color="error" variant="caption">
          {errors.goal.message}
        </Typography>
      )}
    </Box>
  );
};
