import FooterNav from "@/layout/footer/footerNav";
import Header from "@/layout/header/Header";

import { ReactNode } from "react";

export default function UnauthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="unauthenticated-container h-screen w-full flex items-center justify-center">
      {" "}
      <Header />
      {children}
      <FooterNav />
    </div>
  );
}
