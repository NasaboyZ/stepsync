"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Box, LinearProgress } from "@mui/material";
import { ArrowBack, CheckCircle } from "@mui/icons-material";
import { handleSignup } from "@/actions/auth-actions";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  registerFormSchema,
  type RegisterFormSchema,
} from "@/validations/register-form-schema";
import { useRouter } from "next/navigation";
import { useSnackbarStore } from "@/store/snackbarStore";
import { Step1 } from "./registersteps/step1";
import { Step2 } from "./registersteps/step2";
import { Step3 } from "./registersteps/step3";
import { Step4 } from "./registersteps/step4";
import { Step5 } from "./registersteps/step5";
import { Step6 } from "./registersteps/step6";

export const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { openSnackbar } = useSnackbarStore();
  const getCurrentSchema = () => {
    switch (currentStep) {
      case 1:
        return step1Schema;
      case 2:
        return step2Schema;
      case 3:
        return step3Schema;
      case 4:
        return step4Schema;
      case 5:
        return step5Schema;
      case 6:
        return registerFormSchema;
      default:
        return step1Schema;
    }
  };

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(getCurrentSchema()),
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
      height: 0,
      weight: 0,
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
          "Registration successful! Redirecting to login...",
          "success"
        );
        router.push("/login");
      } else {
        openSnackbar(
          `Registration failed: ${response.message || "Unknown error"}`,
          "error"
        );
      }
    } catch (error) {
      console.error("Error during signup:", error);
      openSnackbar(
        "An unexpected error occurred. Please try again later.",
        "error"
      );
    }
  };

  const NextButton = () => {
    const isCurrentStepValid = () => {
      const values = form.getValues();
      switch (currentStep) {
        case 1:
          return (
            !form.formState.errors.first_name &&
            !form.formState.errors.last_name &&
            !form.formState.errors.email &&
            !form.formState.errors.password &&
            values.first_name &&
            values.last_name &&
            values.email &&
            values.password
          );
        case 2:
          return values.goal && !form.formState.errors.goal;
        case 3:
          return values.gender && !form.formState.errors.gender;
        case 4:
          return values.date_of_birth && !form.formState.errors.date_of_birth;
        case 5:
          return (
            values.height &&
            values.weight &&
            !form.formState.errors.height &&
            !form.formState.errors.weight
          );
        case 6:
          return values.username && !form.formState.errors.username;
        default:
          return false;
      }
    };

    return (
      <Button
        variant="contained"
        onClick={() => setCurrentStep((prev) => prev + 1)}
        fullWidth
        sx={{
          backgroundColor: "var(--brown-light)",
        }}
        endIcon={<CheckCircle />}
        disabled={!isCurrentStepValid()}
      >
        Weiter
      </Button>
    );
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
      case 4:
        return (
          <Step4
            form={{
              register: form.register,
              formState: form.formState,
              setValue: form.setValue,
              control: form.control,
            }}
          />
        );
      case 5:
        return (
          <Step5
            form={{
              register: form.register,
              formState: form.formState,
              setValue: form.setValue,
            }}
          />
        );
      case 6:
        return (
          <Step6
            form={{
              register: form.register,
              formState: form.formState,
              setValue: form.setValue,
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
          value={(currentStep / 6) * 100}
          sx={{
            mb: 4,
            "& .MuiLinearProgress-bar": { backgroundColor: "var(--red)" },
          }}
        />

        <form onSubmit={form.handleSubmit(onSubmit)}>
          {renderStepContent()}

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

            {currentStep < 6 ? (
              <NextButton />
            ) : (
              <Button type="submit" variant="contained" fullWidth>
                Registrierung abschliessen
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
};
