import React from "react";

interface FormWrapperProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  onSubmit,
  className,
}) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {" "}
      {children}
    </form>
  );
};
