"use client";

import { useFormContext } from "react-hook-form";
import { RegisterFormInputs } from "@/actions/auth-actions";
import TextField from "@mui/material/TextField";
import * as React from "react";

interface TextInputProps {
  label: string; // Beschriftung des Eingabefelds
  name: keyof RegisterFormInputs; // Name des Feldes (Schlüssel in RegisterFormInputs)
  type: "text" | "number" | "date" | "password"; // Typ des Eingabefelds
  required?: boolean; // Gibt an, ob das Feld erforderlich ist
  placeholder?: string; // Platzhaltertext
  className?: string; // CSS-Klassen für die Komponente
  defaultValue?: string | number; // Standardwert (optional)
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Änderungs-Handler (optional)
}

export const TextInput = ({
  label,
  name,
  type,
  required,
  placeholder,
  defaultValue,
  onChange,
  className,
  ...rest // Zusätzliche Material-UI-Props
}: TextInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterFormInputs>();

  // Fehlermeldung basierend auf Fehlerart
  const error =
    errors[name]?.type === "required"
      ? `${label} is required`
      : errors[name]?.message;

  return (
    <div className={className} style={{ marginBottom: "16px" }}>
      <TextField
        id={`filled-${name}`}
        label={label}
        type={type}
        variant="filled"
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue} // Standardwert festlegen
        {...register(name, { required })} // Registrierung des Feldes
        error={!!error} // Fehlerstatus
        helperText={error || ""} // Fehlermeldung anzeigen
        onChange={onChange} // Änderungs-Handler
        fullWidth
        {...rest} // Zusätzliche Material-UI-Props weitergeben
      />
    </div>
  );
};
