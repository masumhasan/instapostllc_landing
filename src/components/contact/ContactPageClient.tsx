"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, User, MessageSquare, Send } from "lucide-react";

export interface ContactUsSettings {
  emails: string[];
  phones: string[];
  socials?: { platform: string; url: string; icon?: string }[];
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const normalizePhoneHref = (raw: string) => {
  const cleaned = raw.replace(/[^0-9+]/g, "");
  return cleaned.startsWith("+") ? `tel:${cleaned}` : `tel:+1${cleaned}`;
};

export function ContactPageClient({ initialContact }: { initialContact: ContactUsSettings }) {
  const [contact, setContact] = useState<ContactUsSettings>(initialContact);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`${API_BASE}/ops/settings/contact_us`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        const val = json?.data?.value;
        if (!active || !val) return;
        setContact({
          emails: Array.isArray(val.emails) ? val.emails : [],
          phones: Array.isArray(val.phones) ? val.phones : [],
          socials: Array.isArray(val.socials) ? val.socials : [],
        });
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const visibleEmails = (contact.emails || []).map((e) => e.trim()).filter(Boolean);
  const visiblePhones = (contact.phones || []).map((p) => p.trim()).filter(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFeedback({ type: "err", text: "Please fill out your name, email, and message." });
      return;
    }
    setSending(true);
    setFeedback(null);
    try {
      const res = await fetch(`${API_BASE}/notifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientRole: "Admin",
          title: `Contact Inquiry from ${name.trim()}`,
          message: `${email.trim()}: ${message.trim()}`,
          type: "system",
          createdBy: name.trim(),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setName("");
      setEmail("");
      setMessage("");
      setFeedback({ type: "ok", text: "Message sent! Our team will respond shortly." });
    } catch {
      setFeedback({ type: "err", text: "Could not send message. Please try again." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#fdf2f2] via-white to-[#ecf7fe] py-20 md:py-32 font-opensans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12">
          {visibleEmails.length > 0 && (
            <div className="flex items-start justify-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <div className="flex justify-center">
                <span className="text-primary font-medium">Email :</span>
                <div className="space-y-1 ml-1">
                  {visibleEmails.map((em, idx) => (
                    <a
                      key={`${em}-${idx}`}
                      href={`mailto:${em}`}
                      className="text-gray-600 hover:text-primary transition-colors block"
                    >
                      {em}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {visiblePhones.length > 0 && (
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <div className="flex justify-center">
                <span className="text-primary font-medium">Phone :</span>
                <div className="space-y-1 ml-1">
                  {visiblePhones.map((ph, idx) => (
                    <a
                      key={`${ph}-${idx}`}
                      href={normalizePhoneHref(ph)}
                      className="text-gray-600 hover:text-primary transition-colors block"
                    >
                      {ph}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Have a question?</h2>
          <p className="text-gray-600 mb-8">
            Tell us about your needs. We&apos;d love to see how we can help you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  placeholder="Tell us about your needs..."
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-primary hover:bg-primary text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/30 cursor-pointer disabled:opacity-60"
            >
              {sending ? "Sending..." : "Send"}
              <Send className="w-5 h-5" />
            </button>

            {feedback && (
              <p className={`text-sm font-medium text-center ${feedback.type === "ok" ? "text-green-600" : "text-red-500"}`}>
                {feedback.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

