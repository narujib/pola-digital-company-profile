import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreadcrumbBanner } from "@/components/ui/breadcrumb-banner";
import { BlogSidebar } from "@/components/sections/blog/blog-sidebar";
import { BlogDetailsContent } from "@/components/sections/blog/blog-details-content";
import { blogPosts } from "@/content/blog";

interface BlogDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan",
    };
  }

  return {
    title: `${post.title} - Blog Pola Digital`,
    description: post.excerpt,
  };
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

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
                  <h4 className="pub-h4 text-[var(--pub-dark)]">{post.author.name}</h4>
                  <p className="text-[var(--pub-body)] leading-relaxed">
                    {post.author.bio || "Penulis ahli yang berfokus pada konten berkualitas tinggi untuk audiens modern. Berdedikasi untuk berbagi pengetahuan dan wawasan terbaru."}
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

// Add Next.js Image import which was missing in the implementation
import Image from "next/image";
