"use client";

import Link from "next/link";
import Image from "next/image";
import { benefits } from "@/content/home/benefits";
import { chooseContent } from "@/content/home/choose";
import { BenefitItem } from "@/components/ui/benefit-item";
import { cn } from "@/lib/utils";

interface ChooseSectionProps {
  className?: string;
}

export function ChooseSection({ className }: ChooseSectionProps) {
  return (
    <section className={cn("py-20 lg:py-28 bg-[#063231] overflow-hidden", className)}>
      <div className="pub-container">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Side */}
          <div 
            className="xl:col-span-7 lg:col-span-6 flex flex-col justify-between"
            data-aos="fade-right"
            data-aos-delay="200"
          >
             <div className="mb-10">
                <h2 className="pub-h2 text-white mb-6">
                  {chooseContent.title}
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
                  {chooseContent.description}
                </p>
                <Link href={chooseContent.ctaLink} className="pub-btn-accent">
                  {chooseContent.ctaText}
                </Link>
             </div>
             
             <div className="rounded-2xl overflow-hidden mt-auto w-full aspect-[770/400]">
               <Image 
                 src={chooseContent.image} 
                 alt="Choose Us" 
                 width={770} 
                 height={400} 
                 className="w-full h-full object-cover"
               />
             </div>
          </div>

          {/* Right Side (Benefits List) */}
          <div className="xl:col-span-5 lg:col-span-6 flex flex-col gap-6 justify-center">
             {benefits.map((benefit, index) => (
                <BenefitItem key={index} {...benefit} delayIndex={index} />
             ))}
          </div>

        </div>
      </div>
    </section>
  );
}
