import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Email oder Passwort ist falsch"),
  password: z.string().min(8, "Email oder Passwort ist falsch"),
});

export type LoginFormInputs = z.infer<typeof loginFormSchema>;
