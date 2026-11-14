"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Sun, Moon, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/components/theme-provider";
import { useAuth, getPortalUrl } from "@/components/auth-provider";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "../assets/logo.png";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/features", label: "Features" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About us" },
];

export function MainNavbar() {
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between bg-white/60 backdrop-blur-md rounded-xl px-4 sm:px-6 py-4 shadow-accent-foreground border border-white/60 font-opensans">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="Logo" width={160} height={40} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2  font-medium rounded-full transition-colors",
                  pathname === item.href
                    ? "bg-[#2196F3] text-white"
                    : "text-black hover:text-gray-900 hover:bg-gray-100",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden sm:flex rounded-full  h-9 w-9"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5 text-neutral-900" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button> */}

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full p-0"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-[#2196F3] text-white ">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl">
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-[#2196F3] text-white">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user?.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <a href={getPortalUrl(user?.role)}>
                      <User className="mr-2 h-4 w-4" />
                      Open Portal
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <button
                  className="hidden sm:inline-flex text-lg border px-6 py-2 rounded-xl border-blue-400 text-blue-500 bg-transparent 
    hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <Link href="/login">Sign In</Link>
                </button>

                <button
                  type="submit"
                  className="hidden sm:inline-flex px-6 py-2 rounded-xl text-lg font-medium text-white 
    bg-linear-to-b from-[#42A5F5] to-[#1E88E5] 
    hover:from-[#64B5F6] hover:to-[#1976D2] 
    shadow-md transition"
                >
                  <Link href="/signup">Sign Up</Link>
                </button>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-full h-9 w-9"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 rounded-l-2xl">
                <div className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="flex items-center gap-2">
                    <Image src={logo} alt="Logo" width={160} height={40} />
                  </Link>

                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "px-3 py-2  font-medium rounded-lg transition-colors",
                          pathname === item.href
                            ? "bg-[#2196F3] text-white"
                            : "text-muted-foreground hover:text-foreground hover:bg-gray-100",
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="border-t pt-4 flex flex-col gap-2">
                    {/* <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleTheme}
                      className="justify-start rounded-lg"
                    >
                      {resolvedTheme === "dark" ? (
                        <>
                          <Sun className="mr-2 h-4 w-4" /> Light Mode
                        </>
                      ) : (
                        <>
                          <Moon className="mr-2 h-4 w-4" /> Dark Mode
                        </>
                      )}
                    </Button> */}
                    {!isAuthenticated && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="rounded-lg"
                        >
                          <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                          >
                            Sign In
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          asChild
                          className="rounded-lg bg-[#2196F3] hover:bg-[#1976D2]"
                        >
                          <Link
                            href="/signup"
                            onClick={() => setIsOpen(false)}
                          >
                            Sign Up
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
