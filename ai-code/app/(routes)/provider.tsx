"use client";
import { useRouter } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";

import AppHeader from "../_components/AppHeader";

function DashboardProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <SidebarProvider>
      <main className="w-full">
        <AppHeader />

        <div className="p-10">{children}</div>
      </main>
    </SidebarProvider>
  );
}

export default DashboardProvider;
