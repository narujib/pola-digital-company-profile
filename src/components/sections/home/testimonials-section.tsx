"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { testimonials } from "@/content/home/testimonials";
import { TestimonialCard } from "@/components/ui/testimonial-card";

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-20 lg:py-28 bg-[#F5F7F7] overflow-hidden">
      <div className="pub-container">
        {/* Header with Nav */}
        <div
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <SectionTitle
            subtitle="TESTIMONI"
            title="Ulasan Klien Kami"
            align="left"
            className="mb-0"
          />

          {/* Navigation Buttons */}
          <div className="flex gap-4 shrink-0">
            <button
              type="button"
              aria-label="Previous Testimonial"
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[var(--pub-accent)] hover:border-[var(--pub-accent)] hover:text-white transition-all duration-300"
              onClick={scrollPrev}
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next Testimonial"
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[var(--pub-accent)] hover:border-[var(--pub-accent)] hover:text-white transition-all duration-300"
              onClick={scrollNext}
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="overflow-hidden"
          ref={emblaRef}
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="flex -ml-6">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-6"
              >
                <TestimonialCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
