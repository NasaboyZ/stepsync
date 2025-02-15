"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFormSchema,
  LoginFormInputs,
} from "@/validations/login-form-schema";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Box, Typography, Container, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./login-form.module.css";
import { CustomTextField } from "@/components/ui/customTextField";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const formFieldAnimation = {
  hidden: { x: -20, opacity: 0 },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.1, duration: 0.5 },
  }),
};

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setError(null);

    const response = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (response?.error) {
      form.setError("email", { message: "Ungültige Anmeldedaten" });
      form.setError("password", { message: "Ungültige Anmeldedaten" });
    } else {
      const token = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => data.token);

      if (token) {
        localStorage.setItem("authToken", token);
      }

      router.push("/dashboard");
    }
  };

  return (
    <Container maxWidth="xs">
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <Box className={styles["form-container"]}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              component="h1"
              variant="h4"
              className={styles["form-title"]}
            >
              Anmelden
            </Typography>
          </motion.div>

          <FormProvider {...form}>
            <Box
              component="form"
              onSubmit={form.handleSubmit(onSubmit)}
              sx={{ width: "100%" }}
            >
              <motion.div custom={0} variants={formFieldAnimation}>
                <CustomTextField
                  margin="normal"
                  required
                  id="email"
                  label="E-Mail-Adresse"
                  autoComplete="email"
                  autoFocus
                  error={!!form.formState.errors.email}
                  helperText={form.formState.errors.email?.message}
                  {...form.register("email")}
                  className={styles["text-field"]}
                />
              </motion.div>

              <motion.div custom={1} variants={formFieldAnimation}>
                <CustomTextField
                  margin="normal"
                  required
                  id="password"
                  label="Passwort"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  error={!!form.formState.errors.password}
                  helperText={form.formState.errors.password?.message}
                  {...form.register("password")}
                  className={styles["text-field"]}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: "#fff" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    },
                  }}
                />
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography color="error" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                </motion.div>
              )}

              <motion.div custom={2} variants={formFieldAnimation}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={styles["submit-button"]}
                  type="submit"
                >
                  Anmelden
                </motion.button>
              </motion.div>

              <motion.div
                custom={3}
                variants={formFieldAnimation}
                className={styles["login-links"]}
              >
                <Typography variant="body2">
                  Noch kein Konto?
                  <Link href="/registration">Hier registrieren</Link>
                </Typography>
              </motion.div>
            </Box>
          </FormProvider>
        </Box>
      </motion.div>
    </Container>
  );
};
