import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { RegisterFormSchema } from "@/validations/register-form-schema";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { CustomTextField } from "@/components/ui/customTextField";

interface Step1Props {
  form: {
    register: UseFormRegister<RegisterFormSchema>;
    formState: {
      errors: Partial<Record<keyof RegisterFormSchema, { message?: string }>>;
    };
    setValue: UseFormSetValue<RegisterFormSchema>;
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
    <CustomTextField
      fullWidth
      label="Vorname"
      {...form.register("first_name")}
      error={!!form.formState.errors.first_name}
      helperText={form.formState.errors.first_name?.message || ""}
    />
    <CustomTextField
      fullWidth
      label="Nachname"
      {...form.register("last_name")}
      error={!!form.formState.errors.last_name}
      helperText={form.formState.errors.last_name?.message || ""}
    />
    <CustomTextField
      fullWidth
      label="E-Mail"
      type="email"
      {...form.register("email")}
      error={!!form.formState.errors.email}
      helperText={form.formState.errors.email?.message || ""}
    />
    <CustomTextField
      fullWidth
      label="Benutzername"
      {...form.register("username")}
      error={!!form.formState.errors.username}
      helperText={form.formState.errors.username?.message || ""}
    />
    <CustomTextField
      fullWidth
      label="Passwort"
      type={showPassword ? "text" : "password"}
      {...form.register("password")}
      error={!!form.formState.errors.password}
      helperText={form.formState.errors.password?.message || ""}
      slotProps={{
        input: {
          endAdornment: (
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
              sx={{ color: "#fff" }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        },
      }}
    />
  </Box>
);
