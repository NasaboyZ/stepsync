"use server";

interface ResponseReturn {
  message?: string;
  status: number;
}

interface SignUpError {
  field: string;
  message: string;
}

interface User {
  id: number;
  email: string;
  username: string;
  created_at: string;
  updated_at: string;
}

interface SignUpResponse extends ResponseReturn {
  email?: string;
  updated_at?: string;
  created_at?: string;
  id?: number;
  user?: User;
  errors?: SignUpError[];
}

// Funktion für die Registrierung
export async function handleSignup(
  email: string,
  first_name: string,
  last_name: string,
  weight: number,
  height: number,
  username: string,
  goal: string,
  gender: string,
  date_of_birth: string,
  password: string
): Promise<SignUpResponse> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        first_name,
        last_name,
        weight,
        height,
        username,
        goal,
        gender,
        date_of_birth,
        password,
      }),
    });

    // console.log("Response status:", response.status);

    const data = await response.json();
    // console.log("Raw API Response:", data);

    // Erfolgreicher Registrierungsversuch
    if (response.status === 201 && data.user) {
      console.log("User created successfully:", data.user);
      return {
        status: response.status,
        message: data.message || "User created successfully",
        user: data.user,
      };
    }

    // Unerwartete oder fehlerhafte Response
    // console.error("Unexpected response format or error:", data);
    return {
      ...data,
      status: response.status,
      message: data.message || "Unexpected error occurred",
      errors: data.errors || [],
    };
  } catch (error) {
    // Fehler während der Anfrage
    // console.error("Error occurred during signup:", error);

    return {
      status: 500,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
