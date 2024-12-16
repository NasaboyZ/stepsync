import { authConfig } from "@/auth";
import NextAuth from "next-auth";
import { signOut } from "next-auth/react";

// export named handler for each HTTP method (GET, POST, etc.)
export const GET = NextAuth(authConfig);
export const POST = NextAuth(authConfig);

export const signOutHandler = async () => {
  try {
    await signOut({
      callbackUrl: "/login",  // Weiterleitung zur Login-Seite nach dem Logout
    });
  } catch (error) {
    console.error("Fehler beim Abmelden:", error);
  }
};
