"use client";

import { Box, Typography, TextField } from "@mui/material";
import { RegisterFormSchema } from "@/validations/register-form-schema";
import { Control, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface Step4Props {
  form: {
    register: UseFormRegister<RegisterFormSchema>;
    formState: {
      errors: Partial<Record<keyof RegisterFormSchema, { message?: string }>>;
    };
    setValue: UseFormSetValue<RegisterFormSchema>;
    control: Control<RegisterFormSchema>;
  };
}

export const Step4: React.FC<Step4Props> = ({ form }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" gutterBottom>
        Wann wurdest du geboren?
      </Typography>
      <TextField
        type="date"
        label="Geburtsdatum"
        slotProps={{
          inputLabel: { shrink: true },
        }}
        onChange={(e) => {
          form.setValue("date_of_birth", e.target.value, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
        error={!!form.formState.errors.date_of_birth}
        helperText={form.formState.errors.date_of_birth?.message}
        sx={{
          backgroundColor: "white",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
              borderWidth: 1,
            },
          },
        }}
      />
    </Box>
  );
};
