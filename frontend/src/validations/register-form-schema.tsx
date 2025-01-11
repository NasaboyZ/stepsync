import { z } from "zod";

export const step1Schema = z.object({
  first_name: z.string().min(1, "Vorname ist erforderlich"),
  last_name: z.string().min(1, "Nachname ist erforderlich"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(
      /[@$!%*#?&]/,
      "Password must contain at least one special character"
    ),
  username: z
    .string()
    .min(3, "Benutzername muss mindestens 3 Zeichen lang sein"),
});

export const step2Schema = z.object({
  goal: z.string().min(1, "Ziele sind erforderlich"),
});

export const step3Schema = z.object({
  gender: z
    .string()
    .refine((val) => ["male", "female", "other"].includes(val.toLowerCase()), {
      message: "Ungültiges Geschlecht. Zulässige Werte: male, female, other",
    }),
});

export const step4Schema = z.object({
  date_of_birth: z
    .string()
    .min(1, "Bitte geben Sie Ihr Geburtsdatum ein")
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      const minDate = new Date();
      minDate.setFullYear(today.getFullYear() - 100); // Minimum 100 Jahre alt

      return date <= today && date >= minDate;
    }, "Das Geburtsdatum darf nicht in der Zukunft liegen und muss realistisch sein"),
});

export const step5Schema = z.object({
  height: z
    .union([z.string(), z.number()])
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value) && value >= 50 && value <= 300, {
      message: "Größe muss zwischen 50 und 300 cm liegen",
    }),
  weight: z
    .union([z.string(), z.number()])
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value) && value >= 20 && value <= 500, {
      message: "Gewicht muss zwischen 20 und 500 kg liegen",
    }),
});

export const registerFormSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
  ...step4Schema.shape,
  ...step5Schema.shape,
});

// Types für jeden Step
export type Step1Schema = z.infer<typeof step1Schema>;
export type Step2Schema = z.infer<typeof step2Schema>;
export type Step3Schema = z.infer<typeof step3Schema>;
export type Step4Schema = z.infer<typeof step4Schema>;
export type Step5Schema = z.infer<typeof step5Schema>;
export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
