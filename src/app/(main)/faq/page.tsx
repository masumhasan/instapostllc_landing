import Image from "next/image";
import faqImg from "../../../assets/faq.jpg";
import { HelpCircle } from "lucide-react";
import { FaqAccordionList, type LandingFaqItem } from "@/components/faq/FaqAccordionList";

export const dynamic = "force-dynamic";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function fetchFaqs(): Promise<LandingFaqItem[]> {
  try {
    const res = await fetch(`${API_BASE}/catalog/items/faq`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    const list = Array.isArray(json?.data) ? json.data : [];
    return list.map((item: any, idx: number) => ({
      id: String(item.id || item._id || idx),
      question: item.question || item.name || "",
      answer: item.answer || item.description || "",
    }));
  } catch {
    return [];
  }
}

export default async function FAQPage() {
  const faqs = await fetchFaqs();

  return (
    <div className="min-h-screen bg-linear-to-b from-[#fdf2f2] via-white to-[#ecf7fe] py-20 md:py-28 font-opensans pt-10 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Answers to common questions about InstaSign Tracker and how it works.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Accordion */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaqAccordionList initialFaqs={faqs} />
          </div>

          {/* Image */}
          <div className="relative lg:sticky lg:top-8">
            <Image
              src={faqImg}
              alt="Real Estate Sign"
              className="rounded-2xl shadow-xl w-full h-auto object-cover"
              width={600}
              height={500}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
