import UnauthenticatedLayout from "../(unauthenticated)/layout";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UnauthenticatedLayout>{children}</UnauthenticatedLayout>;
}
