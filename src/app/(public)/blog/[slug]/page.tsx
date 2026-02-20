"use client";

import { BreadcrumbBanner } from "@/components/ui/breadcrumb-banner";
import { BlogSidebar } from "@/components/sections/blog/blog-sidebar";
import { BlogDetailsContent } from "@/components/sections/blog/blog-details-content";
import { useBlogBySlug } from "@/features/blog/blog.hooks";
import { mapBlogToPost } from "@/features/blog/blog.utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { blog, loading, error } = useBlogBySlug(slug, "categories,author");

  if (loading) {
    return (
      <main>
        <div className="h-[400px] w-full bg-gray-50 animate-pulse" />
        <section className="py-20 lg:py-28 bg-[#fdfdfd]">
          <div className="pub-container flex flex-col lg:flex-row gap-12 xl:gap-20">
            <div className="w-full lg:w-2/3 h-[600px] bg-gray-50 animate-pulse rounded-md" />
            <div className="w-full lg:w-1/3 h-[400px] bg-gray-50 animate-pulse rounded-md" />
          </div>
        </section>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center bg-[#fdfdfd] px-4 text-center">
        <h1 className="text-6xl font-bold text-[var(--pub-dark)] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[var(--pub-body)] mb-8">
          Artikel Tidak Ditemukan
        </h2>
        <p className="text-gray-500 max-w-md mb-8">
          Maaf, artikel yang Anda cari mungkin telah dihapus, diubah namanya,
          atau tidak pernah ada.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 bg-[var(--pub-accent)] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all font-semibold"
        >
          <ArrowLeft className="size-5" /> Kembali ke Daftar Blog
        </Link>
      </main>
    );
  }

  const post = mapBlogToPost(blog);

  return (
    <main>
      <BreadcrumbBanner
        title={post.title}
        paths={[
          { label: "Beranda", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Detail Artikel" },
        ]}
      />

      <section className="py-20 lg:py-28 bg-[#fdfdfd]">
        <div className="pub-container">
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
            {/* Main Content */}
            <div className="w-full lg:w-2/3">
              <BlogDetailsContent post={post} />

              {/* Author Box - matching template */}
              <div className="bg-white border border-gray-100 p-8 lg:p-10 rounded-md flex flex-col md:flex-row gap-8 mt-16 shadow-sm">
                <div className="relative size-24 lg:size-32 shrink-0 rounded-md overflow-hidden">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="pub-h4 text-[var(--pub-dark)]">
                    {post.author.name}
                  </h4>
                  <p className="text-[var(--pub-body)] leading-relaxed">
                    {post.author.bio ||
                      "Penulis ahli yang berfokus pada konten berkualitas tinggi untuk audiens modern. Berdedikasi untuk berbagi pengetahuan dan wawasan terbaru."}
                  </p>
                </div>
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
