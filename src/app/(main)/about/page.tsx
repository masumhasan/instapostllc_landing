/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import aboutImg from "../../../assets/about.jpg";
import img1 from "../../../assets/Icon.png";
import img2 from "../../../assets/Icon (2).png";
import img3 from "../../../assets/ab1.png";
import { Arrow } from "radix-ui/internal";
import { ArrowRight } from "lucide-react";
const differentiators = [
  {
    icon: img1,
    title: "Operational First",
    description: "Built around real install → service → removal workflows.",
  },
  {
    icon: img2,
    title: "Photo-Verified Jobs",
    description: "Built around real install → service → removal workflows.",
  },
  {
    icon: img3,
    title: "Designed For Scale",
    description: "From small teams to multi-location companies.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen font-opensans">
      {/* Hero Section */}
      <section className="relative py-28 md:py-36 bg-linear-to-b from-[#fbf2f4] to-[#ecf7fe]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
           Built by a real sign installation company
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              InstaSign Tracker was created to solve real operational problems faced by real estate sign installation businesses.
              </p>
              <Link
                href="/signup"
                className="bg-primary text-white px-12 py-2 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 inline-flex items-center justify-center shadow-md cursor-pointer"
              >
                Sign Up
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="relative">
              <Image
                src={aboutImg}
                alt="Sign Installation Professional"
                className="rounded-2xl shadow-2xl w-full h-auto"
                width={600}
                height={400}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHY WE BUILT THIS Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            WHY WE <span className="text-primary">BUILT</span> THIS
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed text-center">
         We run a real estate sign installation business. Like many companies, we struggled with tracking installs, service calls, inventory, and billing across emails, texts, and spreadsheets.So we built a system to manage our own operations — and realized other sign companies needed the same thing.
          </p>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT Section */}
      <section className="py-20 bg-linear-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center">
            WHAT MAKES US <span className="text-primary">DIFFERENT</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="text-5xl mb-6 flex justify-center items-center">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={50}
                    height={50}
                  ></Image>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
