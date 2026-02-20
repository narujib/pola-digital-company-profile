"use client";

import { BreadcrumbBanner } from "@/components/ui/breadcrumb-banner";
import { BlogCardDetailed } from "@/components/ui/blog-card-detailed";
import { BlogSidebar } from "@/components/sections/blog/blog-sidebar";
import { useBlogs } from "@/features/blog/blog.hooks";
import { mapBlogToPost } from "@/features/blog/blog.utils";
import { blogContent } from "@/content/blog";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Suspense } from "react";

function BlogListingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { listing } = blogContent;

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const { blogs, totalPages, loading, error } = useBlogs({
    page,
    limit: 6,
    search,
    category,
    published: true,
    include: "categories,author",
    sort: "-createdAt",
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <main>
      <BreadcrumbBanner title={listing.title} paths={listing.breadcrumb} />

      <section className="py-20 lg:py-28 bg-[#fdfdfd]">
        <div className="pub-container">
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
            {/* Main Content (Posts) */}
            <div className="w-full lg:w-2/3 flex flex-col gap-10">
              {loading ? (
                <div className="flex flex-col gap-12">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="animate-pulse bg-gray-50 h-[400px] rounded-md"
                    />
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-20 bg-white rounded-md border border-gray-100 italic text-gray-400">
                  Terjadi kesalahan saat memuat artikel.
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-md border border-gray-100 italic text-gray-400">
                  Tidak ada artikel ditemukan
                  {search ? ` untuk "${search}"` : ""}.
                </div>
              ) : (
                <div className="flex flex-col gap-10">
                  {blogs.map((blog, idx) => (
                    <BlogCardDetailed
                      key={blog.id}
                      post={mapBlogToPost(blog)}
                      delayIndex={idx}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!loading && totalPages > 1 && (
                <div className="flex items-center justify-center lg:justify-start gap-3 mt-8">
                  <button
                    type="button"
                    aria-label="Halaman Sebelumnya"
                    onClick={() => handlePageChange(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="size-12 rounded-md bg-white border border-gray-100 text-[var(--pub-body)] font-bold flex items-center justify-center hover:bg-[var(--pub-accent)] hover:text-white hover:border-accent transition-all disabled:opacity-30"
                  >
                    <ChevronLeft className="size-5" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        type="button"
                        aria-label={`Halaman ${p}`}
                        aria-current={p === page ? "page" : undefined}
                        onClick={() => handlePageChange(p)}
                        className={`size-12 rounded-md font-bold flex items-center justify-center transition-all ${
                          p === page
                            ? "bg-[var(--pub-accent)] text-white shadow-lg shadow-accent/20"
                            : "bg-white border border-gray-100 text-[var(--pub-body)] hover:bg-[var(--pub-accent)] hover:text-white hover:border-accent"
                        }`}
                      >
                        {String(p).padStart(2, "0")}
                      </button>
                    ),
                  )}

                  <button
                    type="button"
                    aria-label="Halaman Selanjutnya"
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, page + 1))
                    }
                    disabled={page === totalPages}
                    className="size-12 rounded-md bg-white border border-gray-100 text-[var(--pub-body)] font-bold flex items-center justify-center hover:bg-[var(--pub-accent)] hover:text-white hover:border-accent transition-all disabled:opacity-30"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>
              )}
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

export default function BlogListingPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#fdfdfd] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-32 bg-gray-200 rounded-md"></div>
          <div className="text-gray-400">Memuat halaman...</div>
        </div>
      </main>
    }>
      <BlogListingContent />
    </Suspense>
  );
}
