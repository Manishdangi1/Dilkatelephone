import type { ReactNode } from "react";
import { DashboardNav } from "@/components/dilka/dashboard-nav";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen pb-10">
      <DashboardNav />
      <div className="mx-auto w-full max-w-6xl px-4 pt-7 md:px-8 md:pt-10">{children}</div>
    </main>
  );
}
