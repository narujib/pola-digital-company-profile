import { servicesData } from "@/content/services";
import { ServiceCard } from "@/components/ui/service-card";

export function ServicesGrid() {
  return (
    <section className="py-20 lg:py-28 bg-[#F5F7F7]">
      <div className="pub-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={service.slug} 
              {...service} 
              delayIndex={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
