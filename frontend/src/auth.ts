import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, Session, SessionStrategy, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authConfig: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt" as SessionStrategy, // using JWT as session strategy / management
  },
  pages: {
    signIn: "/auth/sign-in", // custom sign-in page
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const user = await response.json();

        if (response.ok && user) {
          return {
            email: user.email,
            accessToken: user.token,
          } as User;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};
