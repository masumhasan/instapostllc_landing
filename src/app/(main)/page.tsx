import Link from "next/link";
import { ArrowRight, MapPin, BarChart3, Users, Shield, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Testimonials from "@/components/home/Testimonials";
import GetSTartedToday from "@/components/home/GetSTartedToday";
import Image from "next/image";

const features = [
  {
    icon: MapPin,
    title: "Real-time Tracking",
    description: "Track your real estate signs in real-time with GPS precision.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Get insights into sign performance and placement effectiveness.",
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Manage assistants and collaborate with your team seamlessly.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security to protect your data.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Smart Real Estate
                <span className="text-[#1E88E5]"> Sign </span>
                Management
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Streamline your real estate sign tracking with our innovative solution. 
                Manage placements, track performance, and collaborate with your team—all in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/features">Learn More</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  width={800}
                  height={800}
                  src="https://res.cloudinary.com/c1u8capm/image/upload/v1794320033/instapost/assets/mig_0703969062e80f.jpg"
                  alt="Real estate sign"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-[#1E88E5]/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose InstaSignTracker?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your real estate signs effectively
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-[#1E88E5]/10 flex items-center justify-center mb-4 group-hover:bg-[#1E88E5]/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-[#1E88E5]" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Get Started Today Section */}
      <GetSTartedToday />
    </div>
  );
}
