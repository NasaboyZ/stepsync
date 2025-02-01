"use client";

import { Box, Typography, TextField, Button } from "@mui/material";
import { RegisterFormSchema } from "@/validations/register-form-schema";
import {
  type UseFormRegister,
  type FormState,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";

interface Step2Props {
  form: {
    register: UseFormRegister<RegisterFormSchema>;
    formState: FormState<RegisterFormSchema>;
    setValue: UseFormSetValue<RegisterFormSchema>;
    watch: UseFormWatch<RegisterFormSchema>;
  };
}

export const Step2 = ({
  form: {
    register,
    formState: { errors },
    setValue,
    watch,
  },
}: Step2Props) => {
  const selectedGender = watch("gender");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h5" gutterBottom>
        Personalisiere dein Konto
      </Typography>
      <Typography variant="body1" color="white">
        Lass uns deine Erfahrung besser machen. Erzähl uns mehr über dich.
      </Typography>

      {/* Gender Selection */}
      <Box sx={{ display: "flex", gap: 2 }}>
        {[
          { id: "female", label: "Weiblich" },
          { id: "male", label: "Männlich" },
          { id: "other", label: "Non-binary" },
        ].map((option) => (
          <Button
            key={option.id}
            variant={selectedGender === option.id ? "contained" : "outlined"}
            onClick={() =>
              setValue("gender", option.id, { shouldValidate: true })
            }
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              px: 3,
              py: 1,
              backgroundColor:
                selectedGender === option.id ? "var(--brown-light)" : "white",
              borderColor: "var(--brown-light)",
              color: selectedGender === option.id ? "white" : "black",
              "&:hover": {
                backgroundColor:
                  selectedGender === option.id ? "var(--brown-light)" : "white",
                borderColor: "var(--brown-light)",
              },
            }}
          >
            {option.label}
          </Button>
        ))}
      </Box>
      {errors.gender && (
        <Typography color="error" variant="caption">
          {errors.gender.message}
        </Typography>
      )}

      {/* Birthdate */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Geburtsdatum
        </Typography>
        <TextField
          {...register("date_of_birth")}
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!errors.date_of_birth}
          helperText={errors.date_of_birth?.message}
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "var(--brown-light)",
              },
              "&:hover fieldset": {
                borderColor: "var(--brown-light)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--brown-light)",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};
