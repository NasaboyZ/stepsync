"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  LinearProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  ArrowBack,
  CheckCircle,
} from "@mui/icons-material";
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

  const goalCards = [
    {
      id: "muscle",
      title: "Muskelaufbau",
      description: "Baue Muskelmasse auf und werde stärker und gesünder",
      icon: "💪",
    },
    {
      id: "weight_loss",
      title: "Gewicht verlieren",
      description:
        "Fokussiere dich auf kalorienverbrennende Übungen, um Gewicht zu verlieren und definiert zu werden",
      icon: "🏃",
    },
  ];

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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h5" gutterBottom>
              Lass uns deine Reise beginnen
            </Typography>
            <TextField
              fullWidth
              label="Vorname"
              {...form.register("first_name")}
              error={!!form.formState.errors.first_name}
              helperText={form.formState.errors.first_name?.message}
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
              helperText={form.formState.errors.last_name?.message}
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
              helperText={form.formState.errors.email?.message}
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
              helperText={form.formState.errors.password?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
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

      case 2:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h5" gutterBottom>
              Wähle dein Ziel
            </Typography>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              {goalCards.map((card) => (
                <Card
                  key={card.id}
                  sx={{
                    cursor: "pointer",
                    border: form.watch("goal") === card.id ? 2 : 1,
                    borderColor: form.formState.errors.goal
                      ? "error.main"
                      : form.watch("goal") === card.id
                      ? "primary.main"
                      : "grey.300",
                    "&:hover": { borderColor: "primary.main" },
                    position: "relative",
                  }}
                  onClick={() => {
                    form.setValue("goal", card.id, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                >
                  <CardContent>
                    {form.watch("goal") === card.id && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          color: "primary.main",
                        }}
                      >
                        <CheckCircle />
                      </Box>
                    )}
                    <Typography variant="h6">{card.title}</Typography>
                    <Typography variant="body2">{card.description}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
            {form.formState.errors.goal && (
              <Typography color="error" variant="caption">
                {form.formState.errors.goal.message}
              </Typography>
            )}
          </Box>
        );

      case 3:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h5" gutterBottom>
              Wähle dein Geschlecht
            </Typography>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              {[
                { id: "male", label: "Männlich", icon: "👨" },
                { id: "female", label: "Weiblich", icon: "👩" },
              ].map((option) => (
                <Card
                  key={option.id}
                  sx={{
                    cursor: "pointer",
                    border: form.watch("gender") === option.id ? 2 : 1,
                    borderColor:
                      form.watch("gender") === option.id
                        ? "primary.main"
                        : "grey.300",
                    "&:hover": { borderColor: "primary.main" },
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
                </Card>
              ))}
            </Box>
          </Box>
        );

      case 4:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h5" gutterBottom>
              Wann wurdest du geboren?
            </Typography>
            <TextField
              fullWidth
              type="date"
              {...form.register("date_of_birth")}
              error={!!form.formState.errors.date_of_birth}
              helperText={form.formState.errors.date_of_birth?.message}
              slotProps={{
                inputLabel: { shrink: true },
              }}
              onChange={(e) => {
                form.setValue("date_of_birth", e.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
          </Box>
        );

      case 5:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h5" gutterBottom>
              Wie groß und schwer bist du?
            </Typography>
            <TextField
              fullWidth
              type="number"
              label="Größe (cm)"
              {...form.register("height", { valueAsNumber: true })}
              error={!!form.formState.errors.height}
              helperText={form.formState.errors.height?.message}
              onChange={(e) => {
                form.setValue("height", Number(e.target.value), {
                  shouldValidate: true,
                  shouldDirty: true,
                });
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
            />
          </Box>
        );

      case 6:
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
            />
          </Box>
        );
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <LinearProgress
          variant="determinate"
          value={(currentStep / 6) * 100}
          sx={{ mb: 4 }}
        />

        <form onSubmit={form.handleSubmit(onSubmit)}>
          {renderStepContent()}

          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            {currentStep > 1 && (
              <Button
                variant="outlined"
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
                Registrierung abschließen
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
};
