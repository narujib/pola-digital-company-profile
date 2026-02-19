import { AnimatedCounter } from "@/components/ui/animated-counter";

interface StatItemProps {
  count: number;
  suffix: string;
  title: string;
  desc: string;
}

export function StatItem({ count, suffix, title, desc }: StatItemProps) {
  return (
    <div className="flex flex-col items-center px-4 py-8 md:py-0">
      <div className="pub-h1 text-white mb-4 flex items-center justify-center lg:text-7xl">
        <AnimatedCounter end={count} duration={2500} />
        <span className="ml-[2px]">{suffix}</span>
      </div>
      <h4 className="pub-h6 text-white mb-3">{title}</h4>
      <p className="text-gray-300 text-base max-w-xs mx-auto leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
