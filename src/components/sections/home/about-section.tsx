"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/ui/section-title";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { aboutContent } from "@/content/home/about";

export function AboutSection() {
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
                src={aboutContent.image}
                alt="About Company"
                width={636}
                height={700}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute top-10 right-10 md:right-20 bg-[var(--pub-accent)] text-white p-6 rounded-xl shadow-xl float-bob-y max-w-[150px] text-center">
              <div className="text-4xl font-bold mb-1">
                <AnimatedCounter end={aboutContent.clientReviewCount} suffix={aboutContent.clientReviewSuffix} />
              </div>
              <p className="text-sm font-medium uppercase tracking-wide">
                {aboutContent.clientReviewText}
              </p>
            </div>
          </div>

          {/* Right Content */}
          <div
            className="w-full lg:w-1/2"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <SectionTitle
              subtitle={aboutContent.subtitle}
              title={aboutContent.title}
              className="mb-8 text-left"
              align="left"
            />
            <p className="text-[var(--pub-body)] text-lg leading-relaxed mb-10 max-w-lg">
              {aboutContent.description}
            </p>

            {/* Review Stats */}
            <div className="grid grid-cols-2 gap-8 mb-10 border-t border-b border-gray-100 py-4">
              {aboutContent.stats.map((stat, index) => (
                <div key={index}>
                  <div className="pub-h4 text-[var(--pub-dark)] mb-2">
                    <AnimatedCounter end={stat.count} suffix={stat.suffix} />
                  </div>
                  <p className="text-gray-500 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            <Link href={aboutContent.ctaLink} className="pub-btn">
              {aboutContent.ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
