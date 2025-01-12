"use client";

import { LoginForm } from "@/components/froms/login-form";
import Typography from "@/components/typography/typography";

export default function LoginPage() {
  return (
    <div>
      <Typography variant="h1">Login</Typography>
      <LoginForm />
    </div>
  );
}
