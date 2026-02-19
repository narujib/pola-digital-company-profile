import type { Metadata } from "next";
import { BreadcrumbBanner } from "@/components/ui/breadcrumb-banner";
import { BlogCardDetailed } from "@/components/ui/blog-card-detailed";
import { BlogSidebar } from "@/components/sections/blog/blog-sidebar";
import { blogPosts, blogContent } from "@/content/blog";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Artikel & Blog - Pola Digital",
  description: "Dapatkan wawasan terbaru seputar dunia teknologi, strategi bisnis, dan pemasaran digital di blog Pola Digital.",
};

export default function BlogListingPage() {
  const { listing } = blogContent;

  return (
    <main>
      <BreadcrumbBanner
        title={listing.title}
        paths={listing.breadcrumb}
      />

      <section className="py-20 lg:py-28 bg-[#fdfdfd]">
        <div className="pub-container">
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
            {/* Main Content (Posts) */}
            <div className="w-full lg:w-2/3 flex flex-col gap-10">
              <div className="flex flex-col gap-10">
                {blogPosts.map((post, idx) => (
                  <BlogCardDetailed key={post.slug} post={post} delayIndex={idx} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center lg:justify-start gap-3 mt-8">
                <button 
                  type="button"
                  className="size-12 rounded-md bg-[var(--pub-accent)] text-white font-bold flex items-center justify-center shadow-lg shadow-accent/20"
                >
                  01
                </button>
                <button 
                  type="button"
                  className="size-12 rounded-md bg-white border border-gray-100 text-[var(--pub-body)] font-bold flex items-center justify-center hover:bg-[var(--pub-accent)] hover:text-white hover:border-accent transition-all"
                >
                  02
                </button>
                <button 
                  type="button"
                  className="size-12 rounded-md bg-white border border-gray-100 text-[var(--pub-body)] font-bold flex items-center justify-center hover:bg-[var(--pub-accent)] hover:text-white hover:border-accent transition-all"
                >
                  03
                </button>
                <button 
                  type="button"
                  aria-label="Halaman Selanjutnya"
                  className="size-12 rounded-md bg-white border border-gray-100 text-[var(--pub-body)] font-bold flex items-center justify-center hover:bg-[var(--pub-accent)] hover:text-white hover:border-accent transition-all"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-1/3">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
