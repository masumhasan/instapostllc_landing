"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Facebook, Globe, Instagram, Youtube } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const ICON_MAP: Record<string, typeof Facebook> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
};

export function FooterSocialLinks() {
  const [socials, setSocials] = useState([
    { platform: "Facebook", url: "#", icon: "facebook" },
    { platform: "Instagram", url: "#", icon: "instagram" },
    { platform: "YouTube", url: "#", icon: "youtube" },
  ]);

  useEffect(() => {
    fetch(`${API_BASE}/ops/settings/contact_us`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        const list = json?.data?.value?.socials;
        if (Array.isArray(list) && list.length > 0) setSocials(list);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex items-center gap-4">
      {socials.map((social, idx) => {
        const key = (social.icon || social.platform || "").toLowerCase();
        const Icon = ICON_MAP[key] || Globe;
        const href = social.url?.trim() || "#";
        const external = href.startsWith("http");
        return external ? (
          <a
            key={`${social.platform}-${idx}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label={social.platform}
          >
            <Icon className="h-5 w-5" />
          </a>
        ) : (
          <Link
            key={`${social.platform}-${idx}`}
            href={href}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label={social.platform}
          >
            <Icon className="h-5 w-5" />
          </Link>
        );
      })}
    </div>
  );
}

