"use client";

import { ReactNode, FormEvent } from "react";

interface FormWrapperProps {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const FormWrapper = ({ children, onSubmit }: FormWrapperProps) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};
