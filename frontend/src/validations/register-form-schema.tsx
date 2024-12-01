import { z } from "zod";

export const registerFormSchema = z.object({
  username: z.string().min(1, "Benutzername ist erforderlich"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  first_name: z.string().min(1, "Vorname ist erforderlich"),
  last_name: z.string().min(1, "Nachname ist erforderlich"),
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
  goal: z.string().min(1, "Ziele sind erforderlich"),
  gender: z
    .string()
    .refine((val) => ["male", "female", "other"].includes(val.toLowerCase()), {
      message: "Ungültiges Geschlecht. Zulässige Werte: male, female, other",
    }),
  date_of_birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Geburtsdatum muss im Format YYYY-MM-DD sein")
    .refine(
      (val) => new Date(val) < new Date(),
      "Datum darf nicht in der Zukunft liegen"
    ),
});
