"use client";

import { Box, Typography, Card, CardContent } from "@mui/material";
import { RegisterFormSchema } from "@/validations/register-form-schema";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

interface Step3Props {
  form: {
    register: UseFormRegister<RegisterFormSchema>;
    formState: {
      errors: Partial<Record<keyof RegisterFormSchema, { message?: string }>>;
    };
    setValue: (
      name: keyof RegisterFormSchema,
      value: string,
      options: { shouldValidate: boolean; shouldDirty: boolean }
    ) => void;
    watch: UseFormWatch<RegisterFormSchema>;
  };
}

export const Step3: React.FC<Step3Props> = ({ form }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" gutterBottom>
        Wähle dein Geschlecht
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 2,
        }}
      >
        {[
          { id: "male", label: "Männlich", icon: "👨" },
          { id: "female", label: "Weiblich", icon: "👩" },
          { id: "other", label: "Divers", icon: "🧑" },
        ].map((option) => (
          <Card
            key={option.id}
            sx={{
              cursor: "pointer",
              border: form.watch("gender") === option.id ? 2 : 1,
              borderColor:
                form.watch("gender") === option.id
                  ? "var(--brown-light)"
                  : "grey.300",
              "&:hover": { borderColor: "var(--brown-light)" },
              position: "relative",
            }}
            onClick={() => {
              form.setValue("gender", option.id, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          >
            <CardContent>
              <Typography variant="h6">
                {option.icon} {option.label}
              </Typography>
            </CardContent>
            {form.watch("gender") === option.id && (
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
          </Card>
        ))}
      </Box>
    </Box>
  );
};
