import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { servicesData, servicesContent } from "@/content/services";
import { cn } from "@/lib/utils";

interface ServiceSidebarProps {
  activeSlug: string;
}

export function ServiceSidebar({ activeSlug }: ServiceSidebarProps) {
  const { details } = servicesContent;

  return (
    <div className="flex flex-col gap-10">
      {/* Services List Widget */}
      <div className="bg-[#F5F7F7] p-8 lg:p-10 rounded-[20px]">
        <h4 className="pub-h5 text-[var(--pub-dark)] mb-8">{details.sidebarTitle}</h4>
        <ul className="flex flex-col gap-4">
          {servicesData.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className={cn(
                  "flex items-center justify-between p-5 rounded-xl transition-all duration-300 group",
                  activeSlug === service.slug
                    ? "bg-[var(--pub-accent)] text-white"
                    : "bg-white text-[var(--pub-dark)] hover:bg-[var(--pub-accent)] hover:text-white"
                )}
              >
                <span className="font-semibold">{service.title}</span>
                <ArrowRight className={cn(
                  "size-5 transition-transform duration-300 group-hover:translate-x-1",
                  activeSlug === service.slug ? "text-white" : "text-[var(--pub-accent)] group-hover:text-white"
                )} />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Widget */}
      <div className="bg-[var(--pub-dark)] p-8 lg:p-10 rounded-[20px] text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center mb-6">
             <Image 
               src={details.contactWidget.icon} 
               alt="Contact" 
               width={32} 
               height={32} 
               className="w-8 h-8 brightness-0 invert" 
             />
          </div>
          <h3 className="pub-h5 mb-4 text-white">{details.contactWidget.title}</h3>
          <p className="text-gray-300 mb-8">
            {details.contactWidget.description}
          </p>
          <Link href="/contact" className="pub-btn-accent w-full text-center">
            {details.contactWidget.btnText}
          </Link>
        </div>
        
        {/* Decorative mask/shape if needed can be added here */}
      </div>
    </div>
  );
}
