import FooterNav from "@/layout/footer/footerNav";
import Header from "@/layout/header/Header";
import styles from "./layout.module.css";
import Cookiebanner from "@/components/cookiebanner/cookiebanner";
import { ReactNode } from "react";

export default function UnauthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles["unauthenticated-container"]}>
      <Header />

      {children}
      <Cookiebanner />
      <FooterNav />
    </div>
  );
}
