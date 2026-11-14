import Image from "next/image";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    id: 1,
    title: "10 Ways to Maximize Your Real Estate Sign ROI",
    excerpt:
      "Learn proven strategies to get the most out of your real estate signage investment and attract more qualified leads.",
    date: "Mar 5, 2026",
    image:
      "https://res.cloudinary.com/c1u8capm/image/upload/v1794320034/instapost/assets/mig_20ddfeb2ab30a7.jpg",
  },
  {
    id: 2,
    title: "The Future of Real Estate Marketing",
    excerpt:
      "Discover how technology is transforming the way agents market properties and engage with potential buyers.",
    date: "Mar 3, 2026",
    image:
      "https://res.cloudinary.com/c1u8capm/image/upload/v1794320035/instapost/assets/mig_8259436c717de9.jpg",
  },
  {
    id: 3,
    title: "Building a High-Performing Real Estate Team",
    excerpt:
      "Expert tips on recruiting, training, and managing assistants to grow your real estate business effectively.",
    date: "Feb 28, 2026",
    image:
      "https://res.cloudinary.com/c1u8capm/image/upload/v1794320036/instapost/assets/mig_c0a5707b2111c3.jpg",
  },
  {
    id: 4,
    title: "Seasonal Sign Placement Strategies",
    excerpt:
      "How to optimize your sign placement throughout the year to match market conditions and buyer behavior.",
    date: "Feb 25, 2026",
    image:
      "https://res.cloudinary.com/c1u8capm/image/upload/v1794320037/instapost/assets/mig_314fa2adbc7e7c.jpg",
  },
  {
    id: 5,
    title: "Digital vs. Traditional Marketing for Agents",
    excerpt:
      "Finding the right balance between online marketing and traditional methods like signage for maximum impact.",
    date: "Feb 20, 2026",
    image:
      "https://res.cloudinary.com/c1u8capm/image/upload/v1794320037/instapost/assets/mig_fa17f8e3a1b72a.jpg",
  },
  {
    id: 6,
    title: "Case Study: How One Agent Doubled Their Listings",
    excerpt:
      "An in-depth look at how strategic sign management helped transform a struggling agent's business.",
    date: "Feb 18, 2026",
    image:
      "https://res.cloudinary.com/c1u8capm/image/upload/v1794320038/instapost/assets/mig_a7b314e1a8df37.jpg",
  },
];

const topBlogs = [
  {
    id: 1,
    title:
      "How Real Estate Sign Companies Lose Inventory (Without Realizing It)",
    date: "20-01-2026",
  },
  {
    id: 2,
    title:
      "How Real Estate Sign Companies Lose Inventory (Without Realizing It)",
    date: "20-01-2026",
  },
  {
    id: 3,
    title:
      "How Real Estate Sign Companies Lose Inventory (Without Realizing It)",
    date: "20-01-2026",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#fdf2f2] via-white to-[#ecf7fe] py-20 md:py-28 font-opensans pt-10 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FileText className="w-4 h-4" />
            Blog
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 max-w-4xl mx-auto leading-tight">
            Insights for Real Estate Sign & Field Service Businesses
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practical guides, product updates, and industry insights from Insta
            Sign Tracker®
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Blog Cards - 3 columns */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group">
                <div className=" rounded-2xl overflow-hidden  transition-shadow duration-300">
                  <div className="aspect-4/3 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      width={400}
                      height={300}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-2 text-gray-900 font-semibold text-sm group-hover:text-primary transition-colors">
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Top Blog Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Top Blog</h3>
              <div className="space-y-6">
                {topBlogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blog/${blog.id}`}
                    className="group block"
                  >
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors">
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
