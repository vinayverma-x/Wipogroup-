import HeroSection from "@/components/landing/HeroSection";
import FeaturedProperties from "@/components/landing/FeaturedProperties";
import WhyWipo from "@/components/landing/WhyWipo";
import InvestmentPreview from "@/components/landing/InvestmentPreview";


import CTASection from "@/components/landing/CTASection";
import HowItWorks from "@/components/landing/Howwork";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <WhyWipo />
      <InvestmentPreview />
      <HowItWorks />
      <CTASection />
    </>
  );
}
