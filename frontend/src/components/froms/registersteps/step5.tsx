"use client";

import { Box, TextField, Typography } from "@mui/material";
import { RegisterFormSchema } from "@/validations/register-form-schema";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

interface Step5Props {
  form: {
    register: UseFormRegister<RegisterFormSchema>;
    formState: {
      errors: Partial<Record<keyof RegisterFormSchema, { message?: string }>>;
    };
    setValue: UseFormSetValue<RegisterFormSchema>;
  };
}

export const Step5: React.FC<Step5Props> = ({ form }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" gutterBottom>
        Wie gross und schwer bist du?
      </Typography>
      <TextField
        fullWidth
        type="number"
        label="Grösse (cm)"
        {...form.register("height", { valueAsNumber: true })}
        error={!!form.formState.errors.height}
        helperText={form.formState.errors.height?.message}
        onChange={(e) => {
          form.setValue("height", Number(e.target.value), {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
          },
        }}
      />
      <TextField
        fullWidth
        type="number"
        label="Gewicht (kg)"
        {...form.register("weight", { valueAsNumber: true })}
        error={!!form.formState.errors.weight}
        helperText={form.formState.errors.weight?.message}
        onChange={(e) => {
          form.setValue("weight", Number(e.target.value), {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
          },
        }}
      />
    </Box>
  );
};
