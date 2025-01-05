import { z } from "zod";

export const workoutSchema = z.object({
  category: z
    .string()
    .min(1, "Eine Kategorie muss angegeben werden")
    .max(50, "Die Kategorie darf maximal 50 Zeichen lang sein")
    .regex(
      /^[a-zA-ZäöüÄÖÜß\s]+$/,
      "Die Kategorie darf nur Buchstaben und Leerzeichen enthalten"
    ),

  description: z
    .string()
    .min(1, "Eine Beschreibung muss angegeben werden")
    .max(500, "Die Beschreibung darf maximal 500 Zeichen lang sein")
    .regex(
      /^[a-zA-Z0-9äöüÄÖÜß\s.,!?]+$/,
      "Die Beschreibung darf nur Buchstaben, Zahlen und einfache Satzzeichen enthalten"
    ),

  weight: z
    .string()
    .refine((val) => !isNaN(Number(val)), "Nur Zahlen sind erlaubt")
    .refine((val) => val !== "", "Gewicht muss angegeben werden")
    .transform(Number)
    .refine((val) => val >= 0, "Gewicht darf nicht negativ sein"),

  repetitions: z
    .string()
    .refine((val) => !isNaN(Number(val)), "Nur Zahlen sind erlaubt")
    .refine((val) => val !== "", "Wiederholungen müssen angegeben werden")
    .transform(Number)
    .refine((val) => val >= 0, "Wiederholungen dürfen nicht negativ sein"),
});

export type WorkoutSchema = z.infer<typeof workoutSchema>;
