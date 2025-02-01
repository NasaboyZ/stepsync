"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Box, LinearProgress } from "@mui/material";
import { ArrowBack, CheckCircle } from "@mui/icons-material";
import { handleSignup } from "@/actions/auth-actions";
import {
  registerFormSchema,
  type RegisterFormSchema,
} from "@/validations/register-form-schema";
import { useRouter } from "next/navigation";
import { useSnackbarStore } from "@/store/snackbarStore";
import { Step1 } from "./registersteps/step1";
import { Step2 } from "./registersteps/step2";
import { Step3 } from "./registersteps/step3";

export const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { openSnackbar } = useSnackbarStore();

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      username: "",
      goal: "",
      gender: "",
      date_of_birth: "",
      height: 170,
      weight: 70,
    },
  });

  const onSubmit = async (data: RegisterFormSchema) => {
    try {
      const response = await handleSignup(
        data.email,
        data.first_name,
        data.last_name,
        data.weight,
        data.height,
        data.username,
        data.goal,
        data.gender,
        data.date_of_birth,
        data.password
      );

      if (response.status === 201) {
        openSnackbar(
          "Registration erfolgreich! Weiterleitung zum Login...",
          "success"
        );
        router.push("/login");
      } else {
        openSnackbar(
          `Registrierung fehlgeschlagen: ${
            response.message || "Unbekannter Fehler"
          }`,
          "error"
        );
      }
    } catch (error) {
      console.error("Fehler bei der Registrierung:", error);
      openSnackbar(
        "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
        "error"
      );
    }
  };

  const isCurrentStepValid = () => {
    const values = form.getValues();
    const errors = form.formState.errors;

    switch (currentStep) {
      case 1:
        return (
          values.first_name &&
          values.last_name &&
          values.email &&
          values.username &&
          values.password &&
          !errors.first_name &&
          !errors.last_name &&
          !errors.email &&
          !errors.username &&
          !errors.password
        );
      case 2:
        return (
          values.gender &&
          values.date_of_birth &&
          !errors.gender &&
          !errors.date_of_birth
        );
      case 3:
        return (
          values.height &&
          values.weight &&
          values.goal &&
          !errors.height &&
          !errors.weight &&
          !errors.goal
        );
      default:
        return false;
    }
  };

  const handleNextStep = async () => {
    const isValid = await form.trigger(getFieldsForStep(currentStep));
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const getFieldsForStep = (step: number): Array<keyof RegisterFormSchema> => {
    switch (step) {
      case 1:
        return ["first_name", "last_name", "email", "username", "password"];
      case 2:
        return ["gender", "date_of_birth"];
      case 3:
        return ["height", "weight", "goal"];
      default:
        return [];
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            form={{
              register: form.register,
              formState: form.formState,
              setValue: form.setValue,
            }}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        );
      case 2:
        return (
          <Step2
            form={{
              register: form.register,
              formState: form.formState,
              setValue: form.setValue,
              watch: form.watch,
            }}
          />
        );
      case 3:
        return (
          <Step3
            form={{
              register: form.register,
              formState: form.formState,
              setValue: form.setValue,
              watch: form.watch,
            }}
          />
        );
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <LinearProgress
          variant="determinate"
          value={(currentStep / 3) * 100}
          sx={{
            mb: 4,
            "& .MuiLinearProgress-bar": { backgroundColor: "var(--red)" },
          }}
        />

        <form onSubmit={form.handleSubmit(onSubmit)}>
          {renderStepContent()}
x
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            {currentStep > 1 && (
              <Button
                variant="outlined"
                sx={{ color: "white", borderColor: "white" }}
                onClick={() => setCurrentStep((prev) => prev - 1)}
                startIcon={<ArrowBack />}
              >
                Zurück
              </Button>
            )}

            {currentStep < 3 ? (
              <Button
                variant="contained"
                onClick={handleNextStep}
                fullWidth={currentStep === 1}
                sx={{
                  backgroundColor: "var(--brown-light)",
                }}
                endIcon={<CheckCircle />}
                disabled={!isCurrentStepValid()}
              >
                Weiter
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!isCurrentStepValid()}
                sx={{
                  backgroundColor: "var(--brown-light)",
                }}
              >
                Registrierung abschliessen
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
};
