"use client";

import Link from "next/link";
import Image from "next/image";

import { heroContent } from "@/content/home/hero";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#F5F7F7]">
      <div className="pub-container">
        <div className="hero-wrapper">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
            {/* Content */}
            <div className="w-full lg:w-6/12">
              <div className="ht-hero-content style-2 flex flex-col gap-6 lg:pr-12">
                <h1 className="pub-h1" data-aos="fade-up" data-aos-delay="200">
                  {heroContent.title}
                </h1>
                <p
                  className="text-[var(--pub-body)] text-lg leading-relaxed max-w-lg"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  {heroContent.description}
                </p>
                <div className="pt-4" data-aos="fade-up" data-aos-delay="600">
                  <Link href={heroContent.ctaLink} className="pub-btn">
                    {heroContent.ctaText}
                  </Link>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="w-full lg:w-6/12 relative">
              <div
                className="hero-img two relative z-10 mx-auto lg:mr-0"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="relative rounded-md overflow-hidden shadow-xl aspect-[636/650]">
                  <Image
                    src={heroContent.mainImage}
                    alt="Hero Image"
                    width={636}
                    height={650}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>

                {/* Floating Small Image */}
                <div
                  className="absolute -bottom-10 -left-10 md:bottom-10 md:-left-20 w-[200px] md:w-[280px] rounded-md overflow-hidden border-4 border-white shadow-2xl float-bob-y z-20 hidden md:block aspect-[324/214]"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <Image
                    src={heroContent.smallImage}
                    alt="Hero Small"
                    width={324}
                    height={214}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
