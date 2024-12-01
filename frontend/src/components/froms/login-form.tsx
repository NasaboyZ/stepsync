"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/router";

import {
  loginFormSchema,
  LoginFormInputs,
} from "@/validations/login-form-schema";
import { handleLogin } from "@/actions/auth-actions";
import { FormWrapper } from "./form-wrapper";
import { Button, ButtonStyle } from "../button/button";
import { TextInput } from "./text-input";
import { useRouter } from "next/navigation";

const formFields: Record<
  keyof LoginFormInputs,
  { type: "text" | "password"; placeholder: string; required: boolean }
> = {
  email: { type: "text", placeholder: "Email", required: true },
  password: { type: "password", placeholder: "Password", required: true },
};

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await handleLogin(data);

      if (response.status === 200) {
        console.log("Login successful:", response);

        // Token speichern
        localStorage.setItem("auth_token", response.token || "");

        // Weiterleitung ins Dashboard
        if (router) {
          router.push("/dashboard");
        } else {
          console.error("Router not available");
        }
      } else {
        alert(`Login failed: ${response.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
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
            name={name as keyof LoginFormInputs}
            type={config.type}
            required={config.required}
          />
        ))}
        <Button type="submit" label="Login" style={ButtonStyle.PRIMARY} />
      </FormWrapper>
    </FormProvider>
  );
};
