"use client";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { MainNavbar } from "@/components/main-navbar";
import { Open_Sans } from "next/font/google";
import { MainFooter } from "@/components/main-footer";
import { usePathname } from "next/navigation";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-opensans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/login') || 
                    pathname?.startsWith('/signup') || 
                    pathname?.startsWith('/signup2') || 
                    pathname?.startsWith('/payment') || 
                    pathname?.startsWith('/forget-password') || 
                    pathname?.startsWith('/otp-verification') || 
                    pathname?.startsWith('/reset-password');

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            {!isAuthPage && <MainNavbar />}
            {children}
            {!isAuthPage && <MainFooter />}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
