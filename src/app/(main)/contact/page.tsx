import { ContactPageClient, type ContactUsSettings } from "@/components/contact/ContactPageClient";

export const dynamic = "force-dynamic";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function fetchContactSettings(): Promise<ContactUsSettings> {
  try {
    const res = await fetch(`${API_BASE}/ops/settings/contact_us`, { cache: "no-store" });
    if (!res.ok) return { emails: [], phones: [], socials: [] };
    const json = await res.json();
    const val = json?.data?.value;
    return {
      emails: Array.isArray(val?.emails) ? val.emails : [],
      phones: Array.isArray(val?.phones) ? val.phones : [],
      socials: Array.isArray(val?.socials) ? val.socials : [],
    };
  } catch {
    return { emails: [], phones: [], socials: [] };
  }
}

export default async function ContactPage() {
  const contact = await fetchContactSettings();
  return <ContactPageClient initialContact={contact} />;
}
