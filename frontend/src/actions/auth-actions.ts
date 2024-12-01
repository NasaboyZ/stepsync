"use server";

import { ReactNode } from "react";

interface SignUpResponse {
  message?: string;
  status: number;
  errors?: string[];
  email?: string;
  updated_at?: string;
  created_at?: string;
  id?: number;
}

// Typ für die Antwort der Login-Funktion
interface LoginResponse {
  message?: string;
  status: number;
  token?: string; // Authentifizierungstoken, falls benötigt
  user?: {
    id: number;
    email: string;
    username: string;
    [key: string]: ReactNode; // Für weitere Felder im User-Objekt
  };
  errors?: string[];
}

export interface RegisterFormInputs {
  email: string;
  first_name: string;
  last_name: string;
  weight: number;
  height: number;
  username: string;
  goal: string;
  gender: string;
  date_of_birth: string;
  password: string;
}

export interface LoginFormInputs {
  email: string;
  password: string;
}

// Funktion für die Registrierung
export async function handleSignup(
  data: RegisterFormInputs
): Promise<SignUpResponse> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error response data:", errorResponse);
      return {
        message: errorResponse.message || "Unknown error",
        status: response.status,
      };
    }

    const responseData = await response.json();
    console.log("Response data:", responseData);

    return {
      ...responseData,
      status: response.status,
    };
  } catch (error) {
    console.error("Error occurred during signup:", error);

    if (error instanceof Error) {
      return {
        message: error.message,
        status: 400,
      };
    }

    return {
      message: "An unexpected error occurred",
      status: 400,
    };
  }
}

// Funktion für den Login
export async function handleLogin(
  data: LoginFormInputs
): Promise<LoginResponse> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error response data:", errorResponse);
      return {
        message: errorResponse.message || "Unknown error",
        status: response.status,
      };
    }

    const responseData = await response.json();
    console.log("Response data:", responseData);

    return {
      ...responseData,
      status: response.status,
    };
  } catch (error) {
    console.error("Error occurred during login:", error);

    if (error instanceof Error) {
      return {
        message: error.message,
        status: 400,
      };
    }

    return {
      message: "An unexpected error occurred",
      status: 400,
    };
  }
}
