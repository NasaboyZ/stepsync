"use client";

import AuthenticatedHeader from "@/layout/authenticated-header/authenticated-header";
import AuthenticatedNav from "@/layout/authenticatedNav/authenticatedNav";
import styles from "./layout.module.css";
import { useState } from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <AuthenticatedNav isOpen={isOpen} onClose={handleClose} />
      <div className={styles.contentWrapper}>
        <main className={styles.main}>
          <AuthenticatedHeader />
          {children}
        </main>
      </div>
    </div>
  );
}
