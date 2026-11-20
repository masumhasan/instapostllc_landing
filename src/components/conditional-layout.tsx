"use client";

import { usePathname } from "next/navigation";
import { MainNavbar } from "@/components/main-navbar";
import { MainFooter } from "@/components/main-footer";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/signup2") ||
    pathname?.startsWith("/payment") ||
    pathname?.startsWith("/forget-password") ||
    pathname?.startsWith("/otp-verification") ||
    pathname?.startsWith("/reset-password");

  return (
    <>
      {!isAuthPage && <MainNavbar />}
      {children}
      {!isAuthPage && <MainFooter />}
    </>
  );
}
