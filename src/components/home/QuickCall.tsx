"use client";

import { useState } from "react";
import { Calendar, Phone } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/logo.png";

const QuickCall = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="relative bg-white/70 backdrop-blur-sm font-opensans px-3 sm:px-6 py-2 sm:py-3 shadow-lg border-t border-gray-200">
        <div className="flex items-center justify-between gap-2 sm:gap-4 bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 container mx-auto">
          {/* Call Button */}
          <a href="tel:404-694-6924">
            <button className="inline-flex items-center gap-1 sm:gap-2 bg-primary hover:bg-primary/80 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className=" xs:inline">Call Us Now</span>
              {/* <span className="xs:hidden">Call</span> */}
            </button>
          </a>

          {/* Logo - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-1 sm:gap-2">
            <Image
              src={logo}
              alt="InstaSignTracker"
              width={80}
              height={80}
              className="h-8 sm:h-12 w-auto"
            />
          </div>

          {/* Schedule Demo Button */}
          <a href="https://calendly.com/instasigntracker" target="_blank" rel="noopener noreferrer">
            <button className="inline-flex items-center gap-1 sm:gap-2 bg-primary hover:bg-primary/80 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all shadow-md whitespace-nowrap">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="xs:inline">Schedule Demo</span>
              {/* <span className="xs:hidden">Demo</span> */}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default QuickCall;
