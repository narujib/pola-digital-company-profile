"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/ui/section-title";
import { missionContent } from "@/content/about/mission";

export function MissionSection() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="pub-container">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Image */}
          <div
            className="w-full lg:w-1/2 relative flex justify-center lg:justify-start"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <div className="relative rounded-2xl overflow-hidden max-w-lg w-full aspect-[636/700]">
              <Image
                src={missionContent.image}
                alt="Mission"
                width={636}
                height={700}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div
            className="w-full lg:w-1/2"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <SectionTitle
              subtitle={missionContent.subtitle}
              title={missionContent.title}
              className="mb-8 text-left"
              align="left"
            />
            <p className="text-[var(--pub-body)] text-lg leading-relaxed mb-10 max-w-lg">
              {missionContent.description}
            </p>

            <Link href={missionContent.ctaLink} className="pub-btn">
              {missionContent.ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
