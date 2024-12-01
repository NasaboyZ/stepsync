"use client";

import { useFormContext } from "react-hook-form";
import { RegisterFormInputs } from "@/actions/auth-actions";

interface TextInputProps {
  placeholder: string;
  name: keyof RegisterFormInputs;
  type: "text" | "number" | "date" | "password";
  required?: boolean;
}

export const TextInput = ({
  placeholder,
  name,
  type,
  required,
}: TextInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterFormInputs>();

  const error = errors[name]?.message;

  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { required })}
      />
      {error && <p>{error}</p>}
    </div>
  );
};
