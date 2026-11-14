"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface LandingFaqItem {
  id: string;
  question: string;
  answer: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function FaqAccordionList({ initialFaqs }: { initialFaqs: LandingFaqItem[] }) {
  const [faqs, setFaqs] = useState<LandingFaqItem[]>(initialFaqs);

  useEffect(() => {
    let active = true;
    fetch(`${API_BASE}/catalog/items/faq`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!active || !Array.isArray(json?.data)) return;
        setFaqs(
          json.data.map((item: any, idx: number) => ({
            id: String(item.id || item._id || idx),
            question: item.question || item.name || "",
            answer: item.answer || item.description || "",
          }))
        );
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  if (faqs.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-gray-500">
        No FAQs published yet.
      </p>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.id || index} value={`item-${faq.id || index}`} className="border-b border-gray-100 last:border-0">
          <AccordionTrigger className="text-left text-gray-900 font-semibold hover:no-underline py-4">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 pb-4">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

