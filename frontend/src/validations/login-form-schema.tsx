import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  password: z.string().min(8, "email oder password stimmt nicht"),
});

export type LoginFormInputs = z.infer<typeof loginFormSchema>;
