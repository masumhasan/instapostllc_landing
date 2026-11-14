"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import authImg from "../../assets/auth.png";
import logo from "../../assets/logo.png";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const inputStyle =
    "w-full h-11 text-gray-900 placeholder:text-gray-400 bg-white border-gray-300 focus-visible:border-primary focus-visible:ring-primary/20 dark:text-gray-900 dark:bg-white dark:border-gray-300 dark:placeholder:text-gray-400 transition-colors";

  const passwordsMatch = password && confirmPassword ? password === confirmPassword : true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    const resetToken = sessionStorage.getItem("reset_token") || "";
    if (!resetToken) {
      setErrorMessage("Reset session expired. Please request a new OTP code.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken, newPassword: password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message || "Failed to reset password.");
        return;
      }
      sessionStorage.removeItem("reset_token");
      sessionStorage.removeItem("reset_email");
      router.push("/login");
    } catch {
      setErrorMessage("Network error connecting to backend service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 font-opensans">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src={authImg}
          alt="Real Estate Sign"
          className="object-cover"
          fill
          priority
        />
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 sm:px-12 lg:px-16 xl:px-24 bg-white text-gray-900">
        <div className="max-w-md w-full mx-auto">
          {/* Header with Back button */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/login"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </Link>
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <Image
              src={logo}
              alt="Insta Sign Tracker"
              width={400}
              height={400}
              className="w-56 h-auto"
              priority
            />
          </div>

          {/* Title & subtitle */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Reset Password
            </h1>
            <p className="text-gray-600 text-sm">
              Enter your new password below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  required
                  className={`${inputStyle} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                  className={`${inputStyle} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="mt-1 text-xs text-red-600">
                  Passwords do not match.
                </p>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-xs text-red-500 font-medium">{errorMessage}</p>
            )}

            {/* Reset Password Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading || !passwordsMatch}
                className="w-full h-12 text-base bg-primary hover:bg-blue-700 active:scale-[0.99] text-white font-semibold rounded-lg shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </div>

            {/* Back to Login Link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline font-semibold"
              >
                Back to sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Mobile background - visible on mobile */}
      <div
        className="lg:hidden absolute inset-0 -z-10 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url(${authImg.src})`,
        }}
      />
    </div>
  );
}
