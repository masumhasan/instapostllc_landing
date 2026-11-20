"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Final sign-up step. Online payments are not enabled yet, so no card details are collected here:
 * the account is registered and waits for approval (status pending_approval).
 */
export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleComplete = async () => {
    setErrorMessage("");
    setLoading(true);
    try {
      const step1 = JSON.parse(sessionStorage.getItem("signup_step1") || "{}");
      const step2 = JSON.parse(sessionStorage.getItem("signup_step2") || "{}");

      if (!step1.email || !step1.password) {
        setErrorMessage("Registration details missing. Please start at Sign Up.");
        return;
      }

      const payload = {
        name: `${step1.firstName || ""} ${step1.lastName || ""}`.trim() || step1.email,
        email: step1.email,
        password: step1.password,
        company: step2.companyName || "",
        phone: step2.phone || "",
        role: "Agent",
        howDidYouHear: step1.howDidYouHear || "",
      };

      const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://instapost-backend.vercel.app";
      const res = await fetch(`${apiBase}/auth/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message || "Failed to complete account registration.");
        return;
      }

      sessionStorage.removeItem("signup_step1");
      sessionStorage.removeItem("signup_step2");
      router.push("/login");
    } catch {
      setErrorMessage("Network error connecting to backend service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-opensans">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Complete registration</h1>
          <button
            onClick={() => router.push("/")}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-gray-600">
            Submit your details to request an account. Online payment is not required at this step. Our team reviews every
            new account, and you can sign in once it has been approved.
          </p>

          {errorMessage && <p className="text-xs text-red-500 font-medium">{errorMessage}</p>}

          <Button
            onClick={handleComplete}
            disabled={loading}
            className="w-full h-11 bg-primary hover:bg-blue-700 text-white font-semibold rounded-lg"
          >
            {loading ? "Submitting..." : "Submit registration"}
          </Button>
        </div>
      </div>
    </div>
  );
}
