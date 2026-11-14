"use client";

import React, { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
const m1 = "https://res.cloudinary.com/c1u8capm/image/upload/v1794320004/instapost/assets/assets_m1_png.png";
const m2 = "https://res.cloudinary.com/c1u8capm/image/upload/v1794320005/instapost/assets/assets_m2_png.png";
const m3 = "https://res.cloudinary.com/c1u8capm/image/upload/v1794320005/instapost/assets/assets_m3_png.png";
const logo = "https://res.cloudinary.com/c1u8capm/image/upload/v1794320003/instapost/assets/assets_logo_png.png";

const testimonials = [
  {
    id: 1,
    quote:
      "Insta Sign Tracker completely changed how we manage installations and inventory. Routing, billing, and approvals are all in one place now.",
    author: "Nm sujon",
    role: "Operation manager, InstaSignTracker",
    image: m1,
  },
  {
    id: 2,
    quote:
      "Insta Sign Tracker completely changed how we manage installations and inventory. Routing, billing, and approvals are all in one place now.",
    author: "Nm sujon",
    role: "Operation manager, InstaSignTracker",
    image: m2,
  },
  {
    id: 3,
    quote:
      "Insta Sign Tracker completely changed how we manage installations and inventory. Routing, billing, and approvals are all in one place now.",
    author: "Nm sujon",
    role: "Operation manager, InstaSignTracker",
    image: m3,
  },
  {
    id: 4,
    quote:
      "Insta Sign Tracker completely changed how we manage installations and inventory. Routing, billing, and approvals are all in one place now.",
    author: "Sarah Johnson",
    role: "Real Estate Agent, LA",
    image: m1,
  },
  {
    id: 5,
    quote:
      "Insta Sign Tracker completely changed how we manage installations and inventory. Routing, billing, and approvals are all in one place now.",
    author: "Michael Chen",
    role: "Property Manager, NYC",
    image: m2,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  }, []);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff =
      ((diff + testimonials.length) % testimonials.length) -
      (testimonials.length > 3 ? Math.floor(testimonials.length / 2) : 1);

    if (normalizedDiff === 0) {
      return {
        transform: "translateX(0) scale(1)",
        opacity: 1,
        zIndex: 30,
      };
    } else if (
      normalizedDiff === -1 ||
      normalizedDiff === testimonials.length - 1
    ) {
      return {
        transform: "translateX(-110%) scale(0.9)",
        opacity: 0.7,
        zIndex: 20,
      };
    } else if (
      normalizedDiff === 1 ||
      normalizedDiff === -(testimonials.length - 1)
    ) {
      return {
        transform: "translateX(110%) scale(0.9)",
        opacity: 0.7,
        zIndex: 20,
      };
    }
    return {
      transform: `translateX(${normalizedDiff * 220}%) scale(0.8)`,
      opacity: 0,
      zIndex: 10,
    };
  };

  return (
    <section className="py-16 md:py-24 bg-[#eff7fc] font-opensans overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Trusted by Real Estate Professionals
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Sign companies and brokerages rely on InstaSignTracker to run their
            daily operations.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative container mx-auto">
          {/* Cards Container */}
          <div className="relative h-70 md:h-65 flex items-center justify-center">
            {testimonials.map((testimonial, index) => {
              const style = getCardStyle(index);
              return (
                <div
                  key={testimonial.id}
                  className="absolute w-full max-w-md transition-all duration-500 hover:scale-105 cursor-pointer ease-out"
                  style={{
                    transform: style.transform,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                  }}
                >
                  <div
                    className={`rounded-2xl p-6 transition-all duration-300  ${
                      index === activeIndex
                        ? ""
                        : "bg-white border border-r-teal-500 border-l-teal-500 shadow-md"
                    }`}
                  >
                    {/* Logo */}
                    <div className="mb-4">
                      <Image
                        src={logo}
                        alt="InstaSignTracker"
                        width={100}
                        height={24}
                        className="h-6 w-auto"
                      />
                    </div>

                    {/* Quote */}
                    <p className="text-gray-600 leading-relaxed mb-6">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-100">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {testimonial.author}
                        </p>
                        <p className="text-xs text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors duration-200 border border-blue-100"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-blue-500" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors duration-200 border border-blue-100"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-blue-500" />
            </button>
          </div>

          {/* Dots Indicator */}
          {/* <div className="flex items-center justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-blue-500 w-6"
                    : "bg-blue-200 hover:bg-blue-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
