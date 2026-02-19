import { Metadata } from "next";
import { BreadcrumbBanner } from "@/components/ui/breadcrumb-banner";
import { MissionSection } from "@/components/sections/about/mission-section";
import { StatsSection } from "@/components/sections/home/stats-section";
import { ChooseSection } from "@/components/sections/home/choose-section";
import { TestimonialsSection } from "@/components/sections/home/testimonials-section";

export const metadata: Metadata = {
  title: "Tentang Kami - Pola Digital",
  description: "Pelajari lebih lanjut tentang Pola Digital, visi kami, dan tim profesional yang siap membantu transformasi digital bisnis Anda.",
};

export default function AboutPage() {
  return (
    <main>
      <BreadcrumbBanner
        title="Tentang Kami"
        paths={[
          { label: "Beranda", href: "/" },
          { label: "Tentang Kami" }
        ]}
      />
      <MissionSection />
      {/* Reduced vertical spacing between sections with the same background */}
      <StatsSection className="pb-10 lg:pb-14" />
      <ChooseSection className="pt-10 lg:pt-14" />
      <TestimonialsSection />
    </main>
  );
}
