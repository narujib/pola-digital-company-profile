"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight } from "lucide-react";
import { blogPosts, categories, blogContent } from "@/content/blog";

export function BlogSidebar() {
  const { sidebar } = blogContent;
  const recentPosts = blogPosts.slice(0, 4);

  return (
    <aside className="flex flex-col gap-10">
      {/* Search Widget */}
      <div className="bg-white p-8 rounded-md shadow-sm border border-gray-50">
        <h4 className="pub-h5 text-[var(--pub-dark)] mb-6">
          {sidebar.searchTitle}
        </h4>
        <div className="relative">
          <input
            type="text"
            placeholder={sidebar.searchPlaceholder}
            className="w-full bg-gray-50 border border-gray-100 rounded-md py-4 pl-5 pr-12 text-sm focus:outline-none focus:border-[var(--pub-accent)] transition-colors"
          />
          <button
            type="button"
            aria-label="Cari artikel"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--pub-body)] hover:text-[var(--pub-accent)] transition-colors"
          >
            <Search className="size-5" />
          </button>
        </div>
      </div>

      {/* Recent Posts Widget */}
      <div className="bg-white p-8 rounded-md shadow-sm border border-gray-50">
        <h4 className="pub-h5 text-[var(--pub-dark)] mb-8">
          {sidebar.recentPostsTitle}
        </h4>
        <div className="flex flex-col gap-6">
          {recentPosts.map((post, idx) => (
            <div key={idx} className="flex gap-4 group">
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
          ))}
        </div>
      </div>

      {/* Categories Widget */}
      <div className="bg-white p-8 rounded-md shadow-sm border border-gray-50">
        <h4 className="pub-h5 text-[var(--pub-dark)] mb-6">
          {sidebar.categoriesTitle}
        </h4>
        <ul className="flex flex-col divide-y divide-gray-100">
          {categories.map((category, idx) => (
            <li key={idx}>
              <Link
                href="#"
                className="flex items-center justify-between py-4 text-[var(--pub-body)] hover:text-[var(--pub-accent)] transition-colors group"
              >
                <span className="font-medium">{category}</span>
                <ArrowRight className="size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
