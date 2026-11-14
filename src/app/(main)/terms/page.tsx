/* eslint-disable react/no-unescaped-entities */
export const dynamic = "force-dynamic";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const FALLBACK_TERMS_HTML = `
<p class="mb-6">Welcome to InstaSign Tracker. By accessing or using our platform, mobile interfaces, or warehouse systems, you agree to comply with and be bound by the following terms and operational guidelines.</p>
<h3 class="text-xl font-bold text-gray-900 mt-6 mb-2">Service Execution & Dispatch</h3>
<p class="mb-4">Sign installation orders, removals, directional placements, and media shoots are fulfilled in accordance with client-selected turnaround options and property access permissions.</p>
<h3 class="text-xl font-bold text-gray-900 mt-6 mb-2">Billing & Subscriptions</h3>
<p>Invoices are generated based on published service rates, agreed package pricing, or trip charge formulas. Accounts past due may be subject to operational holds.</p>
`;

async function fetchTermsContent(): Promise<string> {
  try {
    const res = await fetch(`${API_BASE}/ops/settings/terms_condition`, { cache: "no-store" });
    if (!res.ok) return FALLBACK_TERMS_HTML;
    const json = await res.json();
    const val = json?.data?.value;
    if (typeof val === "string" && val.trim()) return val;
    if (val && typeof val === "object" && val.content && val.content.trim()) return val.content;
    return FALLBACK_TERMS_HTML;
  } catch {
    return FALLBACK_TERMS_HTML;
  }
}

export default async function TermsPage() {
  const contentHtml = await fetchTermsContent();

  return (
    <div className="min-h-screen bg-white py-20 md:py-28 font-opensans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
          Terms & Condition
        </h1>

        <div
          className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </div>
  );
}
