import Image from "next/image";

interface ContactInfoCardProps {
  icon: string;
  label: string;
  value: string;
  href: string | null;
  delayIndex: number;
}

export function ContactInfoCard({
  icon,
  label,
  value,
  href,
  delayIndex,
}: ContactInfoCardProps) {
  return (
    <div
      className="bg-[#F5F7F7] p-10 rounded-md transition-all duration-300 group min-h-full"
      data-aos="fade-up"
      data-aos-delay={delayIndex * 300 + 300}
    >
      <div className="w-20 h-20 rounded-md bg-[rgba(247,87,9,0.1)] flex items-center justify-center transition-all duration-400 group-hover:bg-[#F75709]">
        <Image
          src={icon}
          alt={label}
          width={32}
          height={32}
          className="w-8 h-8 transition-all duration-400 group-hover:brightness-0 group-hover:invert"
        />
      </div>
      <div className="flex flex-col">
        <span className="block text-[var(--pub-dark)] font-medium mt-16 mb-2.5 font-body text-base">
          {label}
        </span>
        {href ? (
          <a
            href={href}
            className="text-2xl lg:text-[28px] font-bold text-[var(--pub-dark)] leading-tight hover:text-[var(--pub-accent)] transition-all break-words font-heading"
          >
            {value}
          </a>
        ) : (
          <h4 className="text-2xl lg:text-[28px] font-bold text-[var(--pub-dark)] leading-tight m-0 font-heading">
            {value}
          </h4>
        )}
      </div>
    </div>
  );
}
