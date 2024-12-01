"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleSignup } from "@/actions/auth-actions";
import { FormWrapper } from "./form-wrapper";
import { Button, ButtonStyle } from "../button/button";
import { TextInput } from "./text-input";
import { registerFormSchema } from "@/validations/register-form-schema";
import { z } from "zod";

// Typ aus dem Schema ableiten
type RegisterFormInputs = z.infer<typeof registerFormSchema>;

const formFields: {
  [key in keyof RegisterFormInputs]: {
    type: "text" | "number" | "date" | "password";
    placeholder: string;
    required: boolean;
  };
} = {
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
  const form = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerFormSchema),
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

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const response = await handleSignup(data);

      console.log("Signup response:", response);

      if (response.status === 201) {
        console.log("Signup successful: ", response);

        // Weiterleitung zur Login-Seite
        window.location.href = "/login";
      } else {
        alert(`Signup failed: ${response.message || "Unknown error"}`);
        console.error("Signup failed:", response.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An unexpected error occurred. Check console for details.");
    }
  };

  return (
    <FormProvider {...form}>
      <FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
        {Object.entries(formFields).map(([name, config]) => (
          <TextInput
            key={name}
            placeholder={config.placeholder}
            name={name as keyof RegisterFormInputs}
            type={config.type}
            required={config.required}
          />
        ))}
        <div>
          <p>Already a member?</p>
          <Button style={ButtonStyle.SECONDARY} label="Login now" />
        </div>
        <Button type="submit" label="Register" style={ButtonStyle.PRIMARY} />
      </FormWrapper>
    </FormProvider>
  );
};
