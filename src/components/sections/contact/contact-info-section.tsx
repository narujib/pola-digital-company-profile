import { contactInfo } from "@/content/contact";
import { ContactInfoCard } from "@/components/ui/contact-info-card";

export function ContactInfoSection() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="pub-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {contactInfo.map((info, index) => (
            <ContactInfoCard key={index} {...info} delayIndex={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
