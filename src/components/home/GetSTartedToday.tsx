"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  User,
  MessageSquare,
  Heart,
  Calendar,
  Sparkle,
  Send,
} from "lucide-react";
import Image from "next/image";

const GetSTartedToday = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="py-12 md:py-16 bg-[#eaf2f7] font-opensans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl my-20">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="relative bg-primary rounded-2xl p-6 md:p-8 text-white overflow-hidden">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-xl px-3 py-1  mb-4">
              <Sparkle className="w-4 h-4 " />
              Enterprise Solutions
            </div>

            <h3 className="text-2xl md:text-4xl font-bold mb-2">Get Started</h3>
            <h4 className="text-2xl md:text-4xl font-bold mb-4">Today</h4>

            <p className="text-sm text-gray-300 mb-6 mt-3">
              Join hundreds of real estate professionals using InstaSignTracker
              to streamline their sign management.
            </p>

            {/* Phone Number Card */}
            <div className="bg-white/20 rounded-xl p-4 flex items-center justify-between mb-6">
              <div className="">
                <div className="  flex items-center justify-start gap-3">
                  <Phone className="w-5 h-5 text-white" />
                  <p className="text-lg text-blue-100">Call us directly</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">404-694-6924</p>
                </div>
              </div>
          
            </div>

            {/* Bullet Points */}
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className=" mt-0.5">●</span>
                <span className="text-gray-300">
                  Manage single or multiple locations effortlessly
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className=" mt-0.5">●</span>
                <span className="text-gray-300">
                  Get a personalized demonstration today
                </span>
              </li>
            </ul>
          </div>

          <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 overflow-hidden">
          

            <h3 className="text-xl md:text-3xl font-bold text-primary mb-3">
              Have a question?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Tell us about your needs. We&apos;d love to see how we can help
              you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-black"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Phone number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="+1234567890"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    placeholder="Tell us about your needs..."
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-linear-to-r from-[#0988dd] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#2563eb] text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Send
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

  
    
      </div>
    </section>
  );
};

export default GetSTartedToday;
