import Image from "next/image";
import { Check } from "lucide-react";
import { ServiceDetail } from "@/content/services";

interface ServiceDetailsContentProps {
  service: ServiceDetail;
}

export function ServiceDetailsContent({ service }: ServiceDetailsContentProps) {
  return (
    <article className="service-details-content">
      {/* Main Image */}
      <div className="rounded-[40px] overflow-hidden mb-12 aspect-[870/500]" data-aos="fade-up">
        <Image
          src={service.image}
          alt={service.title}
          width={870}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Description */}
      <h2 className="pub-h3 text-[var(--pub-dark)] mb-6" data-aos="fade-up">
        Deskripsi {service.title}
      </h2>
      <div className="pub-text mb-10 space-y-6" data-aos="fade-up">
        <p>{service.fullDescription}</p>
      </div>

      {/* Center Text Section */}
      <h3 className="pub-h4 text-[var(--pub-dark)] mb-6" data-aos="fade-up">Pusat Layanan</h3>
      <div className="pub-text mb-10" data-aos="fade-up">
        <p>{service.centerText}</p>
      </div>

      {/* Image Grid (Sub Services) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {service.subImages.map((img, idx) => (
          <div 
            key={idx} 
            className="rounded-3xl overflow-hidden aspect-[420/280]" 
            data-aos="zoom-in" 
            data-aos-delay={idx * 200}
          >
            <Image
              src={img}
              alt={`${service.title} detail ${idx + 1}`}
              width={420}
              height={280}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Full Details Section */}
      <h3 className="pub-h4 text-[var(--pub-dark)] mb-6" data-aos="fade-up">Detail Lengkap Layanan</h3>
      <div className="pub-text mb-8" data-aos="fade-up">
        <p>{service.allDetailsText}</p>
      </div>

      {/* Features List */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {service.features.map((feature, idx) => (
          <li 
            key={idx} 
            className="flex items-center gap-4 bg-[#F5F7F7] p-4 rounded-xl"
            data-aos="fade-up"
            data-aos-delay={idx * 100}
          >
            <div className="w-8 h-8 rounded-full bg-[var(--pub-accent)] flex items-center justify-center shrink-0">
              <Check className="size-4 text-white" />
            </div>
            <span className="font-semibold text-[var(--pub-dark)]">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
