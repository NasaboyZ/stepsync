"use client";

import { Box, Typography, Button } from "@mui/material";
import {
  RegisterFormSchema,
  step2Schema,
} from "@/validations/register-form-schema";
import {
  type FormState,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";
import styles from "../register.module.css";
import { TextField } from "@mui/material";

interface Step2Props {
  form: {
    formState: FormState<RegisterFormSchema>;
    setValue: UseFormSetValue<RegisterFormSchema>;
    watch: UseFormWatch<RegisterFormSchema>;
  };
}

export const Step2 = ({
  form: {
    formState: { errors },
    setValue,
    watch,
  },
}: Step2Props) => {
  const selectedGender = watch("gender");

  const validateAndSetGender = (value: string) => {
    try {
      step2Schema.pick({ gender: true }).parse({ gender: value });
      setValue("gender", value, { shouldValidate: true });
    } catch (error) {
      console.error("Validierungsfehler:", error);
    }
  };

  const validateAndSetDate = (value: string) => {
    try {
      step2Schema.pick({ date_of_birth: true }).parse({ date_of_birth: value });
      setValue("date_of_birth", value, { shouldValidate: true });
    } catch (error) {
      console.error("Validierungsfehler:", error);
    }
  };

  return (
    <Box className={styles.stepContainer}>
      <Typography variant="h5" gutterBottom>
        Personalisiere dein Konto
      </Typography>
      <Typography variant="body1" color="white">
        Lass uns deine Erfahrung besser machen. Erzähl uns mehr über dich.
      </Typography>

   
      <Box className={styles.genderButtonContainer}>
        {[
          { id: "female", label: "Weiblich" },
          { id: "male", label: "Männlich" },
          { id: "other", label: "Non-binary" },
        ].map((option) => (
          <Button
            key={option.id}
            variant={selectedGender === option.id ? "contained" : "outlined"}
            onClick={() => validateAndSetGender(option.id)}
            className={`${styles.genderButton} ${
              selectedGender === option.id ? styles.selected : styles.unselected
            }`}
          >
            {option.label}
          </Button>
        ))}
      </Box>
      {errors.gender && (
        <Typography color="error" variant="caption">
          {errors.gender.message?.toString() || "Ungültige Eingabe"}
        </Typography>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Geburtsdatum
        </Typography>
        <TextField
          type="date"
          value={watch("date_of_birth") || ""}
          onChange={(e) => validateAndSetDate(e.target.value)}
          error={!!errors.date_of_birth}
          helperText={errors.date_of_birth?.message?.toString() || ""}
          fullWidth
          className={styles.dateField}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      </Box>
    </Box>
  );
};
