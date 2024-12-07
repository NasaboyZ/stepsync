"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleSignup } from "@/actions/auth-actions";
import { FormWrapper } from "./form-wrapper";
import { Button, ButtonStyle } from "../button/button";
import { TextInput } from "./text-input";
import { registerFormSchema } from "@/validations/register-form-schema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useSnackbarStore } from "@/store/snackbarStore"; // Snackbar hinzufügen

import style from "./register.module.css";

// Typen aus dem Schema ableiten
type RegisterFormInputs = z.infer<typeof registerFormSchema>;

// Formularfeld-Konfiguration
const formFields: Record<
  keyof RegisterFormInputs,
  {
    type: "text" | "number" | "date" | "password";
    placeholder: string;
    required: boolean;
  }
> = {
  email: { type: "text", placeholder: "E-mail", required: true },
  first_name: { type: "text", placeholder: "First Name", required: true },
  last_name: { type: "text", placeholder: "Last Name", required: true },
  weight: { type: "number", placeholder: "Weight (kg)", required: true },
  height: { type: "number", placeholder: "Height (cm)", required: true },
  username: { type: "text", placeholder: "Username", required: true },
  goal: { type: "text", placeholder: "Goal", required: true },
  gender: { type: "text", placeholder: "Gender", required: true },
  date_of_birth: { type: "date", placeholder: "Date of Birth", required: true },
  password: { type: "password", placeholder: "Password", required: true },
};

export const RegisterForm = () => {
  const router = useRouter();
  const { openSnackbar } = useSnackbarStore(); // Snackbar verwenden

  // Formular-Setup
  const form = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerFormSchema), // Validierung mit zod
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      weight: 0,
      height: 0,
      username: "",
      goal: "",
      gender: "",
      date_of_birth: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  // Formular-Submit-Handler
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const response = await handleSignup(data);

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

  return (
    <FormProvider {...form}>
      <FormWrapper
        onSubmit={form.handleSubmit(onSubmit)}
        className={style["formWrapper"]}
      >
        {Object.entries(formFields).map(([name, config]) => (
          <TextInput
            key={name}
            label={config.placeholder}
            placeholder={config.placeholder}
            name={name as keyof RegisterFormInputs}
            type={config.type}
            required={config.required}
            className={style["input"]}
          />
        ))}
        <div className={style["alreadyMember"]}>
          <p>Already a member?</p>
          <Button
            style={ButtonStyle.SECONDARY}
            label="Login now"
            onClick={() => router.push("/login")}
          />
        </div>
        <Button type="submit" label="Register" style={ButtonStyle.PRIMARY} />
      </FormWrapper>
    </FormProvider>
  );
};
