"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { BlogCard } from "@/components/ui/blog-card";
import { useBlogs } from "@/features/blog/blog.hooks";
import { mapBlogToPost } from "@/features/blog/blog.utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BlogSection() {
  const { blogs, loading, error } = useBlogs({ 
    limit: 3, 
    published: true,
    include: "categories,author",
    sort: "-createdAt" 
  });

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden" id="blog">
      <div className="pub-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div data-aos="fade-up" data-aos-delay="200" className="max-w-2xl">
            <SectionTitle
              subtitle="artikel terbaru"
              title="Temukan wawasan terbaru di blog kami"
              align="left"
              className="mb-0"
            />
          </div>
          <div data-aos="fade-up" data-aos-delay="300">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-[var(--pub-accent)] font-bold uppercase tracking-wider text-sm hover:gap-3 transition-all"
            >
              Lihat Semua Artikel <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-gray-50 aspect-[4/5] rounded-md" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10 text-gray-500">
            Gagal memuat artikel. Silakan coba lagi nanti.
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Belum ada artikel yang diterbitkan.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <BlogCard key={blog.id} post={mapBlogToPost(blog)} delayIndex={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

