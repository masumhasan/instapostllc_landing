"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import authImg from "../../assets/auth.png";
import logo from "../../assets/logo.png";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const inputStyle =
    "w-full h-11 text-gray-900 placeholder:text-gray-400 bg-white border-gray-300 focus-visible:border-primary focus-visible:ring-primary/20 dark:text-gray-900 dark:bg-white dark:border-gray-300 dark:placeholder:text-gray-400 transition-colors";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    try {
      sessionStorage.setItem("reset_email", email);
      await fetch("http://localhost:5000/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      router.push("/otp-verification");
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
              Forgot Password
            </h1>
            <p className="text-gray-600 text-sm">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
                className={inputStyle}
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-xs text-red-500 font-medium">{errorMessage}</p>
            )}

            {/* Send Reset Link Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base bg-primary hover:bg-blue-700 active:scale-[0.99] text-white font-semibold rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
              >
                {loading ? "Sending..." : "Send Reset Link"}
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
