import { ReactNode } from "react";

export interface TypographyProps {
  children: ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "body1" | "body2" | "caption";
  className?: string;
  [key: string]: ReactNode | string | undefined;
}
