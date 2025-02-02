import { z } from "zod";

export const challengesSchema = z.object({
  title: z
    .string()
    .min(3, "Der Titel muss mindestens 3 Zeichen lang sein")
    .max(50, "Der Titel darf maximal 50 Zeichen lang sein")
    .regex(
      /^[a-zA-ZäöüÄÖÜß\s0-9]+$/,
      "Der Titel darf nur Buchstaben, Zahlen und Leerzeichen enthalten"
    ),
  description: z
    .string()
    .min(3, "Die Beschreibung muss mindestens 3 Zeichen lang sein")
    .max(500, "Die Beschreibung darf maximal 500 Zeichen lang sein")
    .regex(
      /^[a-zA-ZäöüÄÖÜß\s0-9.,!?]+$/,
      "Die Beschreibung darf nur Buchstaben, Zahlen, Leerzeichen und einfache Satzzeichen (.,!?) enthalten"
    ),
});

export type ChallengesSchema = z.infer<typeof challengesSchema>;
