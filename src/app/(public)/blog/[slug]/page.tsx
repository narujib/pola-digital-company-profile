import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/modules/blog/blog.service";
import { formatDate } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const blog = await getBlogBySlug(slug, "author") as unknown as {
      title: string;
      excerpt: string;
      createdAt: Date;
      thumbnail: string | null;
      author: { name: string };
    };
    
    return {
      title: blog.title,
      description: blog.excerpt,
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        type: "article",
        publishedTime: blog.createdAt.toISOString(),
        authors: [blog.author.name],
        images: blog.thumbnail ? [blog.thumbnail] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.excerpt,
        images: blog.thumbnail ? [blog.thumbnail] : [],
      },
    };
  } catch {
    return {
      title: "Blog Not Found",
    };
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;

  let blog;
  try {
    // Assert type since dynamic include is tricky for TS inference here without generics
    blog = await getBlogBySlug(slug, "author") as unknown as {
      title: string;
      content: string;
      createdAt: Date;
      thumbnail: string | null;
      author: { name: string };
    };
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <Link
            href="/blog"
            className="text-sm font-medium text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1"
          >
            ← Kembali ke Blog
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <time dateTime={blog.createdAt.toISOString()}>
              {formatDate(blog.createdAt)}
            </time>
            <span>•</span>
            <span>{blog.author.name}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4">
            {blog.title}
          </h1>
          {blog.thumbnail && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8 bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </header>

        {/* Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none break-words"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </main>
  );
}
