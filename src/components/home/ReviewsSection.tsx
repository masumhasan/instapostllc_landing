"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://instapost-backend.vercel.app";

interface TaggedUser {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  company: string;
}

interface Review {
  id: string;
  reviewerName: string;
  reviewerTitle: string;
  imageUrl: string;
  rating: number;
  text: string;
  taggedUser: TaggedUser | null;
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

function Avatar({ src, name, size }: { src?: string; name: string; size: number }) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center shrink-0"
      style={{ width: size, height: size, fontSize: size / 2.8 }}
    >
      {initials(name)}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const tagged = review.taggedUser;
  return (
    <article className="w-[300px] sm:w-[360px] shrink-0 bg-white rounded-xl shadow-md p-6 flex flex-col gap-4 text-left">
      <div className="flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={`h-4 w-4 ${n <= review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
          />
        ))}
      </div>
      <p className="text-gray-700 text-sm leading-relaxed line-clamp-6 flex-1">&ldquo;{review.text}&rdquo;</p>
      <div className="flex items-center gap-3">
        <Avatar src={review.imageUrl} name={review.reviewerName} size={44} />
        <div className="min-w-0">
          <p className="font-semibold text-black truncate">{review.reviewerName}</p>
          {review.reviewerTitle && <p className="text-xs text-gray-500 truncate">{review.reviewerTitle}</p>}
        </div>
      </div>
      {tagged && (
        <div className="flex items-center gap-2 border-t pt-3">
          <Avatar src={tagged.imageUrl} name={tagged.name} size={28} />
          <p className="text-xs text-gray-600 truncate">
            <span className="text-gray-400">About </span>
            <span className="font-medium text-black">{tagged.name}</span>
            <span className="text-gray-400"> · {tagged.role}</span>
          </p>
        </div>
      )}
    </article>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    let active = true;
    fetch(`${API_BASE}/ops/reviews/public`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (active && Array.isArray(json?.data)) setReviews(json.data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Nothing published yet: leave the section out rather than show placeholders.
  if (reviews.length === 0) return null;

  // The list is rendered twice so the strip can loop without a gap.
  const loop = [...reviews, ...reviews];
  const duration = `${Math.max(20, reviews.length * 8)}s`;

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto font-opensans px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
          What Our <span className="text-primary">Clients Say</span>
        </h2>
        <p className="text-gray-600 mb-10">Reviews from agents, brokerages and teams using the platform.</p>
      </div>
      <div className="reviews-marquee-outer overflow-hidden">
        <div
          className="reviews-marquee flex gap-6 w-max px-3 py-2"
          style={{ ["--reviews-duration" as string]: duration }}
        >
          {loop.map((review, idx) => (
            <div key={`${review.id}-${idx}`} aria-hidden={idx >= reviews.length}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
