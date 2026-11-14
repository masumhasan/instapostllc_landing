"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import authImg from "../../assets/auth.png";

export default function SignUp2Page() {
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
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
              href="/signup"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="text-sm">Back</span>
            </Link>
            <span className="text-sm text-blue-600 font-medium">Step :02</span>
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
              sessionStorage.setItem(
                "signup_step2",
                JSON.stringify({ companyName: companyName.trim(), companyEmail: companyEmail.trim(), phone: phone.trim(), address: address.trim() })
              );
              router.push("/choosePlan");
            }}
          >
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Company Name
              </label>
              <Input
                type="text"
                placeholder="Asadujjaman"
                value={companyName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
                required
                className={inputStyle}
              />
            </div>

            {/* Company Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Company Email
              </label>
              <Input
                type="email"
                placeholder="Asadujjaman@gmail.com"
                value={companyEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyEmail(e.target.value)}
                required
                className={inputStyle}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Phone
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
                  <span className="text-lg">🇧🇩</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <Input
                  type="tel"
                  placeholder="+1 111 467 378 399"
                  value={phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                  required
                  className={`${inputStyle} pl-16`}
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Dhaka ,Bangladesh"
                  value={address}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                  required
                  className={`${inputStyle} pl-10`}
                />
              </div>
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
