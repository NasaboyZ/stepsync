import AuthenticatedHeader from "@/layout/authenticated-header/authenticated-header";
import AuthenticatedNav from "@/layout/authenticatedNav/authenticatedNav";
import styles from "./layout.module.css";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <AuthenticatedNav />
      <div className={styles.contentWrapper}>
        <main className={styles.main}>
          <AuthenticatedHeader />
          {children}
        </main>
      </div>
    </div>
  );
}
