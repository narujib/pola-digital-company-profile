import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/home/hero-section";
import { StatsSection } from "@/components/sections/home/stats-section";
import { AboutSection } from "@/components/sections/home/about-section";
import { ChooseSection } from "@/components/sections/home/choose-section";
import { TestimonialsSection } from "@/components/sections/home/testimonials-section";
import { BlogSection } from "@/components/sections/home/blog-section";

export const metadata: Metadata = {
  title: "Pola Digital - Mitra Transformasi Digital Terpercaya",
  description: "Pola Digital membantu bisnis Anda berkembang dengan solusi teknologi inovatif, pengembangan software, dan strategi digital yang efektif.",
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ChooseSection />
      <TestimonialsSection />
      <BlogSection />
    </main>
  );
}
