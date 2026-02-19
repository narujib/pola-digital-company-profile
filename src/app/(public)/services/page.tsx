import { Metadata } from "next";
import { BreadcrumbBanner } from "@/components/ui/breadcrumb-banner";
import { ServicesGrid } from "@/components/sections/services/services-grid";
import { servicesContent } from "@/content/services";

export const metadata: Metadata = {
  title: `${servicesContent.listing.title} - Pola Digital`,
  description: servicesContent.listing.description,
};

export default function ServicesPage() {
  return (
    <main>
      <BreadcrumbBanner 
        title={servicesContent.listing.title} 
        paths={[
          { label: "Beranda", href: "/" },
          { label: servicesContent.listing.title }
        ]}
      />
      <ServicesGrid />
    </main>
  );
}
