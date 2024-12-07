// form-wrapper.tsx

import React from "react";

// Wenn eine Props-Schnittstelle existiert:
interface FormWrapperProps {
  children: React.ReactNode; // Dies sind die Elemente, die innerhalb des Formulars gerendert werden
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // Die onSubmit Funktion
  className?: string; // Neu hinzugefügt: Optionaler className für Styles
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  onSubmit,
  className, // Neu hinzugefügt
}) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {" "}
      {/* className wird hier angewendet */}
      {children}
    </form>
  );
};
