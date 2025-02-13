"use client";

import dynamic from "next/dynamic";

const DashboardItems = dynamic(
  () => import("@/components/dashboardItems/dashboarditems"),
  { ssr: false }
);

export default function DashboardWrapper() {
  return <DashboardItems />;
} 