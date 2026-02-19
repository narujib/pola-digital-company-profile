import Image from "next/image";

interface BenefitItemProps {
  title: string;
  desc: string;
  icon: string;
  delayIndex: number;
}

export function BenefitItem({ title, desc, icon, delayIndex }: BenefitItemProps) {
  return (
    <div
      className="flex gap-5 items-start bg-white/10 p-8 rounded-md transition-all duration-300 hover:bg-[var(--pub-accent)] group"
      data-aos="fade-left"
      data-aos-delay={delayIndex * 200 + 200}
    >
      <div className="shrink-0">
        <Image
          src={icon}
          alt={title}
          width={50}
          height={50}
          className="brightness-0 invert w-12 h-12"
        />
      </div>
      <div>
        <h3 className="pub-h5 text-white mb-2">{title}</h3>
        <p className="text-white text-base leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
