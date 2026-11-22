import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { TailoredExperienceSection } from "@/components/home/tailored-experience-section";
import PlatformManage from "@/components/home/platformManage";
import WhyChoose from "@/components/home/WhyChoose";
import WeManage from "@/components/home/WeManage";
import GetSTartedToday from "@/components/home/GetSTartedToday";
import ReviewsSection from "@/components/home/ReviewsSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <TailoredExperienceSection />
        <PlatformManage />
        <WhyChoose />
        <WeManage />
        <ReviewsSection />
        <GetSTartedToday />
      </main>
      
    </div>
  );
}
