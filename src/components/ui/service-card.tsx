import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  slug: string;
  title: string;
  description: string;
  icon: string;
  delayIndex: number;
}

export function ServiceCard({
  slug,
  title,
  description,
  icon,
  delayIndex,
}: ServiceCardProps) {
  return (
    <div
      className="group bg-white p-8 lg:p-10 rounded-[20px] transition-all duration-300 border border-gray-100 h-full flex flex-col"
      data-aos="fade-up"
      data-aos-delay={delayIndex * 200 + 200}
    >
      <div className="w-16 h-16 rounded-full bg-[#F5F7F7] flex items-center justify-center mb-10 transition-colors duration-300 group-hover:bg-[var(--pub-accent)]">
        <Image
          src={icon}
          alt={title}
          width={32}
          height={32}
          className="w-8 h-8 transition-all duration-300 group-hover:brightness-0 group-hover:invert"
        />
      </div>

      <Link href={`/services/${slug}`} className="inline-block">
        <h3 className="pub-h5 text-[var(--pub-dark)] mb-4 flex items-center justify-between gap-4 group-hover:text-[var(--pub-accent)] transition-colors">
          {title}
          <ArrowUpRight className="size-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </h3>
      </Link>

      <p className="pub-text text-base opacity-80 line-clamp-3">
        {description}
      </p>
    </div>
  );
}
