"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFormSchema,
  LoginFormInputs,
} from "@/validations/login-form-schema";
import { FormWrapper } from "./form-wrapper";
import { Button, ButtonStyle } from "../button/button"; 
import { TextInput } from "./text-input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

const formFields: Record<
  keyof LoginFormInputs,
  { type: "text" | "password"; placeholder: string; required: boolean }
> = {
  email: { type: "text", placeholder: "Email", required: true },
  password: { type: "password", placeholder: "Password", required: true },
};

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

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
    setError(null);

    const response = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (response?.error) {
      setError("login fehlgeschlagen");
      console.log(error);
    } else {
  
      const token = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      }).then(res => res.json())
        .then(data => data.token);

      if (token) {
        localStorage.setItem('authToken', token);
      }
      
      router.push("/dashboard");
    }
  };

  return (
    <FormProvider {...form}>
      <FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
        {Object.entries(formFields).map(([name, config]) => (
          <TextInput
            label={name}
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
