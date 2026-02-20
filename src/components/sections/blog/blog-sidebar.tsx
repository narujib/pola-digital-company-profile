"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight } from "lucide-react";
import { useBlogs, useCategories } from "@/features/blog/blog.hooks";
import { mapBlogToPost } from "@/features/blog/blog.utils";
import { blogContent } from "@/content/blog";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function BlogSidebarInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { sidebar } = blogContent;

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );
  const currentCategory = searchParams.get("category") || "";

  const {
    blogs: recentBlogs,
    loading: recentLoading,
    total: totalPublishedBlogs,
  } = useBlogs({
    limit: 4,
    published: true,
    sort: "-createdAt",
  });

  const { categories, loading: categoriesLoading } = useCategories();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams(searchParams);
    
    // Always clear category when starting a new search
    params.delete("category");
    
    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    // Always route to the main blog listing page so search works from details page
    router.push(`/blog?${params.toString()}`);
  };


  const handleCategoryClick = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    if (currentCategory === slug) {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    params.set("page", "1");
    // Always route to the main blog listing page so filtering works from details page
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <aside className="flex flex-col gap-10 sticky top-32 lg:self-start">
      {/* Search Widget */}
      <div className="bg-white p-8 rounded-md shadow-sm border border-gray-50">
        <h4 className="pub-h5 text-[var(--pub-dark)] mb-6">

          {sidebar.searchTitle}
        </h4>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={sidebar.searchPlaceholder}
            className="w-full bg-gray-50 border border-gray-100 rounded-md py-4 pl-5 pr-12 text-sm focus:outline-none focus:border-[var(--pub-accent)] transition-colors"
          />
          <button
            type="submit"
            aria-label="Cari artikel"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--pub-body)] hover:text-[var(--pub-accent)] transition-colors"
          >
            <Search className="size-5" />
          </button>
        </form>
      </div>

      {/* Recent Posts Widget */}
      <div className="bg-white p-8 rounded-md shadow-sm border border-gray-50">
        <h4 className="pub-h5 text-[var(--pub-dark)] mb-8">
          {sidebar.recentPostsTitle}
        </h4>
        <div className="flex flex-col gap-6">
          {recentLoading
            ? [1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex gap-4">
                  <div className="size-20 shrink-0 bg-gray-50 rounded-md" />
                  <div className="flex-1 flex flex-col gap-2 justify-center">
                    <div className="h-4 bg-gray-50 w-full" />
                    <div className="h-3 bg-gray-50 w-1/2" />
                  </div>
                </div>
              ))
            : recentBlogs.map((blog) => {
                const post = mapBlogToPost(blog);
                return (
                  <div key={blog.id} className="flex gap-4 group">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="relative size-20 shrink-0 rounded-md overflow-hidden"
                    >
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                    </Link>
                    <div className="flex flex-col justify-center gap-1">
                      <Link href={`/blog/${post.slug}`}>
                        <h5 className="text-[var(--pub-dark)] text-sm font-bold line-clamp-2 hover:text-[var(--pub-accent)] transition-colors leading-snug">
                          {post.title}
                        </h5>
                      </Link>
                      <span className="text-[var(--pub-body)] text-xs uppercase tracking-wider font-semibold">
                        {post.date}
                      </span>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>

      {/* Categories Widget */}
      <div className="bg-white p-8 rounded-md shadow-sm border border-gray-50">
        <h4 className="pub-h5 text-[var(--pub-dark)] mb-6">
          {sidebar.categoriesTitle}
        </h4>
        <ul className="flex flex-col divide-y divide-gray-100">
          <li key="all-categories">
            <button
              type="button"
              onClick={() => handleCategoryClick("")}
              className={`flex items-center justify-between py-4 w-full text-left transition-colors group ${
                currentCategory === ""
                  ? "text-[var(--pub-accent)]"
                  : "text-[var(--pub-body)] hover:text-[var(--pub-accent)]"
              }`}
            >
              <span className="font-medium">Semua Kategori</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  ({totalPublishedBlogs || 0})
                </span>
                <ArrowRight
                  className={`size-4 transition-all ${
                    currentCategory === ""
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                  }`}
                />
              </div>
            </button>
          </li>
          {categoriesLoading
            ? [1, 2, 3, 4, 5].map((i) => (
                <li key={i} className="py-4 animate-pulse">
                  <div className="h-5 bg-gray-50 w-2/3" />
                </li>
              ))
            : categories.map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(category.slug)}
                    className={`flex items-center justify-between py-4 w-full text-left transition-colors group ${
                      currentCategory === category.slug
                        ? "text-[var(--pub-accent)]"
                        : "text-[var(--pub-body)] hover:text-[var(--pub-accent)]"
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        ({category.blogCount})
                      </span>
                      <ArrowRight
                        className={`size-4 transition-all ${
                          currentCategory === category.slug
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                      />
                    </div>
                  </button>
                </li>
              ))}
        </ul>
      </div>
    </aside>
  );
}

export function BlogSidebar() {
  return (
    <Suspense
      fallback={
        <aside className="w-full flex justify-center py-20 bg-white border border-gray-50 rounded-md">
          <div className="animate-pulse text-gray-400 text-sm">Memuat sidebar...</div>
        </aside>
      }
    >
      <BlogSidebarInner />
    </Suspense>
  );
}
