"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Skip protection for login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !isAuthenticated && !isLoginPage) {
      router.replace("/admin/login");
    }
    if (!loading && isAuthenticated && isLoginPage) {
      router.replace("/admin/dashboard");
    }
  }, [isAuthenticated, loading, isLoginPage, router]);

  // Login page — render without sidebar shell
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Not authenticated — show nothing while redirecting
  if (!isAuthenticated) {
    return null;
  }

  // Authenticated — render admin shell
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
