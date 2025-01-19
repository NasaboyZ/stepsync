"use client";

import { Box, TextField, Typography } from "@mui/material";
import { RegisterFormSchema } from "@/validations/register-form-schema";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

interface Step6Props {
  form: {
    register: UseFormRegister<RegisterFormSchema>;
    formState: {
      errors: Partial<Record<keyof RegisterFormSchema, { message?: string }>>;
    };
    setValue: UseFormSetValue<RegisterFormSchema>;
  };
}

export const Step6: React.FC<Step6Props> = ({ form }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" gutterBottom>
        Wähle deinen Benutzernamen
      </Typography>
      <TextField
        fullWidth
        label="Benutzername"
        {...form.register("username")}
        error={!!form.formState.errors.username}
        helperText={form.formState.errors.username?.message}
        onChange={(e) => {
          form.setValue("username", e.target.value, {
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
