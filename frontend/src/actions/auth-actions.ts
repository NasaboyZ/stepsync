"use server";

interface ResponseReturn {
  message?: string;
  status: number;
}

interface SignUpError {
  field: string;
  message: string;
}

interface SignUpResponse extends ResponseReturn {
  email?: string;
  updated_at?: string;
  created_at?: string;
  id?: number;
  errors?: SignUpError[]; // | {key: string}:string | string;
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

    console.log("Response status:", response.status);

    const data = await response.json();
    console.log("Response data:", data);

    return {
      ...data,
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
