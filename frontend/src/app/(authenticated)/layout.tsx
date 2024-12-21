import AuthenticatedNav from "@/layout/authenticatedNav/authenticatedNav";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="authenticated-container">
      <AuthenticatedNav />
      {children}
    </div>
  );
}
