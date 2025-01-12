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
import {
  TextField,
  Box,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
      setError("login fehlgeschlagen");
      console.log(error);
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
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "var(--brown-light)",
            borderRadius: 2,
            p: 4,
            boxShadow: 3,
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{
                mb: 4,
                fontWeight: "bold",
                color: "white",
              }}
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="E-Mail-Adresse"
                  autoComplete="email"
                  autoFocus
                  error={!!form.formState.errors.email}
                  helperText={form.formState.errors.email?.message}
                  {...form.register("email")}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "black",
                      },
                      "&:hover fieldset": {
                        borderColor: "black",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "black",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "black",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: "black",
                    },
                  }}
                />
              </motion.div>

              <motion.div custom={1} variants={formFieldAnimation}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Passwort"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  error={!!form.formState.errors.password}
                  helperText={form.formState.errors.password?.message}
                  {...form.register("password")}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "black",
                      },
                      "&:hover fieldset": {
                        borderColor: "black",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "black",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "black",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: "black",
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
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
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginTop: "24px",
                    border: "none",
                    borderRadius: "8px",
                    background: "var(--brown-dark)",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.2)",
                  }}
                  type="submit"
                >
                  Anmelden
                </motion.button>
              </motion.div>
            </Box>
          </FormProvider>
        </Box>
      </motion.div>
    </Container>
  );
};
