"use client";

import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://instapost-backend.vercel.app";

/** First phone number from the public `contact_us` setting (managed by staff). Empty string until loaded or when none is set. */
export function useContactPhone(): string {
  const [phone, setPhone] = useState("");
  useEffect(() => {
    let active = true;
    fetch(`${API_BASE}/ops/settings/contact_us`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        const phones: unknown = json?.data?.value?.phones;
        const first = Array.isArray(phones) ? phones.map((p) => String(p).trim()).find(Boolean) : "";
        if (active && first) setPhone(first.replace(/^#/, ""));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  return phone;
}

export const phoneHref = (raw: string) => {
  const cleaned = raw.replace(/[^0-9+]/g, "");
  return cleaned.startsWith("+") ? `tel:${cleaned}` : `tel:+1${cleaned}`;
};
