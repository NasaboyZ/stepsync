"use client";
import dynamic from "next/dynamic";

const DashboardItems = dynamic(
  () => import("@/components/dashboardItems/dashboarditems"),
  { ssr: false } // Dies verhindert Server-Side Rendering
);

export default function DashboardPage() {
  return (
    <>
      <DashboardItems />
    </>
  );
}
