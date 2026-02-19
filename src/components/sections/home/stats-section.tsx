import { stats } from "@/content/home/stats";
import { StatItem } from "@/components/ui/stat-item";

export function StatsSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#063231] overflow-hidden text-white">
      <div className="pub-container relative z-10">
        <div
          className="bg-white/10 rounded-3xl p-12 lg:p-16"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            {stats.map((stat, index) => (
              <StatItem key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
