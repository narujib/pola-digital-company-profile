import type { Metadata } from "next";
import { BreadcrumbBanner } from "@/components/ui/breadcrumb-banner";
import { ContactInfoSection } from "@/components/sections/contact/contact-info-section";
import { ContactFormSection } from "@/components/sections/contact/contact-form-section";

export const metadata: Metadata = {
  title: "Hubungi Kami - Pola Digital",
  description:
    "Hubungi Pola Digital untuk konsultasi gratis mengenai kebutuhan teknologi dan pengembangan sistem Anda.",
};

export default function ContactPage() {
  return (
    <main>
      <BreadcrumbBanner
        title="Hubungi Kami"
        paths={[{ label: "Beranda", href: "/" }, { label: "Hubungi Kami" }]}
      />
      <ContactInfoSection />
      <ContactFormSection />
    </main>
  );
}
