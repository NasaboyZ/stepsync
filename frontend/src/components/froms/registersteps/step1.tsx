import React from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { RegisterFormInputs } from "@/types/interfaces/registerForm";
import { UseFormRegister } from "react-hook-form";

interface Step1Props {
  form: {
    register: UseFormRegister<RegisterFormInputs>;
    formState: {
      errors: Partial<Record<keyof RegisterFormInputs, { message?: string }>>;
    };
    setValue: (
      name: keyof RegisterFormInputs,
      value: string,
      options: { shouldValidate: boolean; shouldDirty: boolean }
    ) => void;
  };
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export const Step1: React.FC<Step1Props> = ({
  form,
  showPassword,
  setShowPassword,
}) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    <Typography variant="h5" gutterBottom>
      Lass uns deine Reise beginnen
    </Typography>
    <TextField
      fullWidth
      
      label="Vorname"
      {...form.register("first_name")}
      error={!!form.formState.errors.first_name}
      helperText={form.formState.errors.first_name?.message || ""}
      sx={{ backgroundColor: "white" }}
      onChange={(e) => {
        form.setValue("first_name", e.target.value, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }}
    />
    <TextField
      fullWidth
      label="Nachname"
      {...form.register("last_name")}
      error={!!form.formState.errors.last_name}
      helperText={form.formState.errors.last_name?.message || ""}
      sx={{ backgroundColor: "white" }}
      onChange={(e) => {
        form.setValue("last_name", e.target.value, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }}
    />
    <TextField
      fullWidth
      label="E-Mail"
      type="email"
      {...form.register("email")}
      error={!!form.formState.errors.email}
      helperText={form.formState.errors.email?.message || ""}
      sx={{ backgroundColor: "white" }}
      onChange={(e) => {
        form.setValue("email", e.target.value, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }}
    />
    <TextField
      fullWidth
      label="Passwort"
      type={showPassword ? "text" : "password"}
      {...form.register("password")}
      error={!!form.formState.errors.password}
      helperText={form.formState.errors.password?.message || ""}
      sx={{ backgroundColor: "white" }}
      slotProps={{
        input: {
          endAdornment: (
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        },
      }}
      onChange={(e) => {
        form.setValue("password", e.target.value, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }}
    />
  </Box>
);
