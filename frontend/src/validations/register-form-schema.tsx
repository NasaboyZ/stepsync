import { z } from "zod";

export const step1Schema = z.object({
  first_name: z.string().min(1, "Vorname ist erforderlich"),
  last_name: z.string().min(1, "Nachname ist erforderlich"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  username: z
    .string()
    .min(3, "Benutzername muss mindestens 3 Zeichen lang sein"),
  password: z
    .string()
    .min(8, "Passwort muss mindestens 8 Zeichen lang sein")
    .regex(/[A-Z]/, "Passwort muss mindestens einen Grossbuchstaben enthalten")
    .regex(/[a-z]/, "Passwort muss mindestens einen Kleinbuchstaben enthalten")
    .regex(/[0-9]/, "Passwort muss mindestens eine Ziffer enthalten")
    .regex(
      /[@$!%*#?&_-]/,
      "Passwort muss mindestens ein Sonderzeichen enthalten"
    ),
});

export const step2Schema = z.object({
  gender: z
    .string()
    .refine((val) => ["male", "female", "other"].includes(val.toLowerCase()), {
      message: "Bitte wählen Sie ein Geschlecht aus",
    }),
  date_of_birth: z
    .string()
    .min(1, "Bitte geben Sie Ihr Geburtsdatum ein")
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      const minDate = new Date();
      minDate.setFullYear(today.getFullYear() - 100);
      return date <= today && date >= minDate;
    }, "Das Geburtsdatum darf nicht in der Zukunft liegen und muss realistisch sein"),
});

export const step3Schema = z.object({
  height: z
    .number({
      required_error: "Größe ist erforderlich",
      invalid_type_error: "Größe muss eine Zahl sein",
    })
    .min(50, "Grösse muss mindestens 50 cm sein")
    .max(300, "Grösse kann nicht mehr als 300 cm sein"),
  weight: z
    .number({
      required_error: "Gewicht ist erforderlich",
      invalid_type_error: "Gewicht muss eine Zahl sein",
    })
    .min(20, "Gewicht muss mindestens 20 kg sein")
    .max(500, "Gewicht kann nicht mehr als 500 kg sein"),
  goal: z
    .string()
    .refine((val) => ["lose_weight", "build_muscle"].includes(val), {
      message: "Bitte wählen Sie ein gültiges Ziel aus",
    }),
});

export const registerFormSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
});

export type Step1Schema = z.infer<typeof step1Schema>;
export type Step2Schema = z.infer<typeof step2Schema>;
export type Step3Schema = z.infer<typeof step3Schema>;
export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
