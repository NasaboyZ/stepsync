import { authConfig } from "@/auth";
import NextAuth from "next-auth";


export const GET = NextAuth(authConfig);
export const POST = NextAuth(authConfig);
