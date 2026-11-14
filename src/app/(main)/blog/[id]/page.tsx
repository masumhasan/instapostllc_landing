/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
const posts = [
  {
    id: 1,
    title: "10 Ways to Maximize Your Real Estate Sign ROI",
    excerpt: "Learn proven strategies to get the most out of your real estate signage investment and attract more qualified leads.",
    date: "Mar 5, 2026",
    image: "https://res.cloudinary.com/c1u8capm/image/upload/v1794320034/instapost/assets/mig_20ddfeb2ab30a7.jpg",
  },
  {
    id: 2,
    title: "The Future of Real Estate Marketing",
    excerpt: "Discover how technology is transforming the way agents market properties and engage with potential buyers.",
    date: "Mar 3, 2026",
    image: "https://res.cloudinary.com/c1u8capm/image/upload/v1794320035/instapost/assets/mig_8259436c717de9.jpg",
  },
  {
    id: 3,
    title: "Building a High-Performing Real Estate Team",
    excerpt: "Expert tips on recruiting, training, and managing assistants to grow your real estate business effectively.",
    date: "Feb 28, 2026",
    image: "https://res.cloudinary.com/c1u8capm/image/upload/v1794320036/instapost/assets/mig_c0a5707b2111c3.jpg",
  },
  {
    id: 4,
    title: "Seasonal Sign Placement Strategies",
    excerpt: "How to optimize your sign placement throughout the year to match market conditions and buyer behavior.",
    date: "Feb 25, 2026",
    image: "https://res.cloudinary.com/c1u8capm/image/upload/v1794320037/instapost/assets/mig_314fa2adbc7e7c.jpg",
  },
  {
    id: 5,
    title: "Digital vs. Traditional Marketing for Agents",
    excerpt: "Finding the right balance between online marketing and traditional methods like signage for maximum impact.",
    date: "Feb 20, 2026",
    image: "https://res.cloudinary.com/c1u8capm/image/upload/v1794320037/instapost/assets/mig_fa17f8e3a1b72a.jpg",
  },
  {
    id: 6,
    title: "Case Study: How One Agent Doubled Their Listings",
    excerpt: "An in-depth look at how strategic sign management helped transform a struggling agent's business.",
    date: "Feb 18, 2026",
    image: "https://res.cloudinary.com/c1u8capm/image/upload/v1794320038/instapost/assets/mig_a7b314e1a8df37.jpg",
  },
];
const topBlogs = [
  {
    id: 1,
    title: "How Real Estate Sign Companies Lose Inventory (Without Realizing It)",
    date: "20-01-2026",
  },
  {
    id: 2,
    title: "How Real Estate Sign Companies Lose Inventory (Without Realizing It)",
    date: "20-01-2026",
  },
  {
    id: 3,
    title: "How Real Estate Sign Companies Lose Inventory (Without Realizing It)",
    date: "20-01-2026",
  },
];

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#fdf2f2] via-white to-[#ecf7fe] py-8 md:py-28 font-opensans pt-28 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/blog" className="hover:text-gray-900 transition-colors">
            Blogs
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Blogs details</span>
        </nav>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden shadow-xl mb-8">
              <Image
                src={"https://res.cloudinary.com/c1u8capm/image/upload/v1794320034/instapost/assets/mig_d9d469d5057818.jpg"}
                alt="Blog Featured Image"
                className="w-full h-auto object-cover"
                width={900}
                height={500}
                priority
              />
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-gray-500 mb-6">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">20-01-2026</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              How Real Estate Sign Companies Lose Inventory (Without Realizing It)
            </h1>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                Managing real estate signs isn't just about placing posts in the ground. For most sign companies and brokerages, it involves tracking inventory, coordinating installers, handling service requests, billing agents, and ensuring nothing gets lost or damaged. Yet many businesses still rely on spreadsheets, phone calls, and manual processes — creating unnecessary delays and costly mistakes.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mb-4">Key Sections</h2>

              <ul className="space-y-2 text-gray-600 mb-6">
                <li>• Why sign installation becomes chaotic at scale</li>
                <li>
                  • Common operational problems:
                  <ul className="ml-6 mt-2 space-y-1">
                    <li>• Lost signs</li>
                    <li>• Missed service requests</li>
                    <li>• Manual invoicing</li>
                    <li>• No visibility into inventory</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* Top Blog Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Top Blog</h3>
              <div className="space-y-6">
                {topBlogs.map((blog) => (
                  <Link key={blog.id} href={`/blog/${blog.id}`} className="group block">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h4>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Calendar className="w-3 h-3" />
                      {blog.date}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}