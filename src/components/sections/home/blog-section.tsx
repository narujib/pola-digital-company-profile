"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { blogPosts } from "@/content/home/blog-posts";
import { BlogCard } from "@/components/ui/blog-card";

export function BlogSection() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="pub-container">
        <div 
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <SectionTitle 
            subtitle="artikel terbaru"
            title="Temukan wawasan terbaru di blog kami"
            align="center"
            className="mb-12 max-w-2xl mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {blogPosts.map((post, index) => (
             <BlogCard key={index} {...post} delayIndex={index} />
           ))}
        </div>
      </div>
    </section>
  );
}
