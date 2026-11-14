/* eslint-disable react/no-unescaped-entities */
export const dynamic = "force-dynamic";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const FALLBACK_PRIVACY_HTML = `
<p class="mb-6">At InstaSign Tracker, accessible from instasigntracker.com, one of our main priorities is the privacy of our visitors and users. This Privacy Policy document outlines the types of information collected and how we use it.</p>
<h3 class="text-xl font-bold text-gray-900 mt-6 mb-2">Information We Collect</h3>
<p class="mb-4">We collect information including account credentials, signage addresses, property locations, billing details, and photo upload verifications needed to fulfill real estate signage and media operations.</p>
<h3 class="text-xl font-bold text-gray-900 mt-6 mb-2">Data Security</h3>
<p>We employ enterprise-grade TLS encryption, strict role-based access control, and compliant database storage to protect your assets and operational records.</p>
`;

async function fetchPrivacyContent(): Promise<string> {
  try {
    const res = await fetch(`${API_BASE}/ops/settings/privacy_policy`, { cache: "no-store" });
    if (!res.ok) return FALLBACK_PRIVACY_HTML;
    const json = await res.json();
    const val = json?.data?.value;
    if (typeof val === "string" && val.trim()) return val;
    if (val && typeof val === "object" && val.content && val.content.trim()) return val.content;
    return FALLBACK_PRIVACY_HTML;
  } catch {
    return FALLBACK_PRIVACY_HTML;
  }
}

export default async function PrivacyPage() {
  const contentHtml = await fetchPrivacyContent();

  return (
    <div className="min-h-screen bg-white py-20 md:py-28 font-opensans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
          Privacy Policy
        </h1>

        <div
          className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </div>
  );
}
