"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAuth } from "@/components/auth-provider";
import authImg from "../../assets/auth.png";
import logo from "../../assets/logo.png";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();

  const inputStyle =
    "w-full h-11 text-gray-900 placeholder:text-gray-400 bg-white border-gray-300 focus-visible:border-primary focus-visible:ring-primary/20 dark:text-gray-900 dark:bg-white dark:border-gray-300 dark:placeholder:text-gray-400 transition-colors";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (err: any) {
      setErrorMessage(err?.message || "Invalid email or password");
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
              href="/"
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
              Sign in to your account
            </h1>
            <p className="text-gray-600 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-primary hover:underline font-semibold"
              >
                Join here
              </Link>
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
                placeholder="asadujjaman@gmail.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
                className={inputStyle}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">
                Password
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

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/forget-password"
                className="text-sm text-gray-600 hover:text-primary transition-colors font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-sm text-red-500 font-medium text-center">{errorMessage}</p>
            )}

            {/* Sign In Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base bg-primary hover:bg-blue-700 active:scale-[0.99] text-white font-semibold rounded-lg shadow-sm transition-all duration-200 cursor-pointer"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </div>

            {/* Terms and Privacy Policy */}
            <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
              By joining, you agree to the{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and please read our{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{" "}
              to learn how we use your personal data.
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
