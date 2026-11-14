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

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.getElementById(
        `otp-${index + 1}`
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(
        `otp-${index - 1}`
      ) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      setErrorMessage("Please enter all 6 digits.");
      return;
    }
    const email = sessionStorage.getItem("reset_email") || "";
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message || "Invalid or expired OTP code.");
        return;
      }
      if (data?.data?.resetToken) {
        sessionStorage.setItem("reset_token", data.data.resetToken);
      }
      router.push("/reset-password");
    } catch {
      setErrorMessage("Network error verifying code.");
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
              href="/forget-password"
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
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2">
              OTP Verification
            </h1>
            <p className="text-gray-600 text-sm">
              Enter the 6-digit code sent to your email address.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Inputs */}
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((value, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(index, e.target.value)
                  }
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-11 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold text-gray-900 bg-white border border-gray-300 rounded-lg focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 dark:text-gray-900 dark:bg-white dark:border-gray-300 transition-all shadow-xs"
                />
              ))}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-xs text-red-500 font-medium text-center">{errorMessage}</p>
            )}

            {/* Verify Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base bg-primary hover:bg-blue-700 active:scale-[0.99] text-white font-semibold rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </Button>
            </div>

            {/* Resend Code */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                className="text-primary hover:underline font-semibold cursor-pointer"
              >
                Resend code
              </button>
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
