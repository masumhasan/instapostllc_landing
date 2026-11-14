"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import authImg from "../../assets/auth.png";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [howDidYouHear, setHowDidYouHear] = useState("");
  const router = useRouter();

  const inputStyle =
    "w-full h-11 text-gray-900 placeholder:text-gray-400 bg-white border-gray-300 focus-visible:border-primary focus-visible:ring-primary/20 dark:text-gray-900 dark:bg-white dark:border-gray-300 dark:placeholder:text-gray-400";

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
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="text-sm">Back</span>
            </Link>
            <span className="text-sm text-blue-600 font-medium">Step :01</span>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Request a new account
            </h1>
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-gray-900 hover:text-gray-700 font-medium"
              >
                Sign in
              </Link>
            </p>
            <p className="text-blue-600 text-sm mt-2">N.B. All fields are required</p>
          </div>

          {/* Form */}
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!firstName.trim() || !lastName.trim() || !email.trim() || password.length < 8) return;
              sessionStorage.setItem(
                "signup_step1",
                JSON.stringify({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim(), password })
              );
              router.push("/signup2");
            }}
          >
            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  First Name
                </label>
                <Input
                  type="text"
                  placeholder="Asadujjaman"
                  value={firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                  required
                  className={inputStyle}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Last Name
                </label>
                <Input
                  type="text"
                  placeholder="Asadujjaman"
                  value={lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                  required
                  className={inputStyle}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Email
              </label>
              <Input
                type="email"
                placeholder="Asadujjaman@gmail.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                className={inputStyle}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="**********"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                  className={`${inputStyle} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* How Did You Hear About Us? */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                How Did You Hear About Us?
              </label>
              <Input
                type="text"
                placeholder="Asadujjaman@gmail.com"
                value={howDidYouHear}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHowDidYouHear(e.target.value)}
                required
                className={inputStyle}
              />
            </div>

            {/* Next Button */}
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full h-12 text-base bg-primary hover:bg-blue-700 text-white font-semibold rounded-lg"
              >
                Next
              </Button>
            </div>
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
