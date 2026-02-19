import { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/content/services";
import { BreadcrumbBanner } from "@/components/ui/breadcrumb-banner";
import { ServiceSidebar } from "@/components/sections/services/service-sidebar";
import { ServiceDetailsContent } from "@/components/sections/services/service-content";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: "Layanan Tidak Ditemukan" };

  return {
    title: `${service.title} - Pola Digital`,
    description: service.description,
  };
}

export default async function ServiceDetailsPage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <BreadcrumbBanner
        title={service.title}
        paths={[
          { label: "Beranda", href: "/" },
          { label: "Layanan", href: "/services" },
          { label: service.title },
        ]}
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="pub-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Sidebar */}
            <div className="lg:col-span-4 order-2 lg:order-1">
              <ServiceSidebar activeSlug={service.slug} />
            </div>

            {/* Content */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <ServiceDetailsContent service={service} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

