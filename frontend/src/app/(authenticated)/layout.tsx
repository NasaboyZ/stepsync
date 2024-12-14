export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="authenticated-container">{children}</div>;
}
