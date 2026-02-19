import Image from "next/image";
import { User, Calendar, Tag, Quote } from "lucide-react";
import type { BlogPost } from "@/content/blog";

interface BlogDetailsContentProps {
  post: BlogPost;
}

export function BlogDetailsContent({ post }: BlogDetailsContentProps) {
  return (
    <div className="flex flex-col gap-10">
      {/* Featured Header */}
      <div className="flex flex-col gap-8">
        <div className="relative aspect-[800/450] rounded-md overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--pub-body)]">
          <div className="flex items-center gap-2">
            <User className="size-4 text-[var(--pub-accent)]" />
            <span>Oleh {post.author.name}</span>
          </div>
          <div className="flex items-center gap-2 border-l border-gray-200 pl-6">
            <Calendar className="size-4 text-[var(--pub-accent)]" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2 border-l border-gray-200 pl-6 text-[var(--pub-body)]">
            <Tag className="size-4 text-[var(--pub-accent)]" />
            <span className="font-medium">{post.category}</span>
          </div>
        </div>

        <h1 className="pub-h2 text-[var(--pub-dark)]">{post.title}</h1>
      </div>

      {/* Article Body */}
      <div
        className="prose prose-lg max-w-none text-[var(--pub-body)] prose-headings:text-[var(--pub-dark)] prose-headings:font-bold prose-blockquote:border-l-[var(--pub-accent)] prose-blockquote:bg-gray-50 prose-blockquote:p-8 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-xl prose-blockquote:font-medium"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Quote Style */}
      <div className="bg-[var(--pub-dark)] text-white p-8 lg:p-10 rounded-md relative overflow-hidden group">
        <Quote className="absolute -top-4 -right-4 size-24 text-white/5 -rotate-12 transition-transform group-hover:rotate-0" />
        <p className="text-lg lg:text-xl font-medium leading-relaxed italic relative z-10">
          &ldquo;Kami sangat menghargai kualitas layanan yang konsisten dan
          dedikasi tim dalam memberikan solusi terbaik bagi setiap kendala
          teknologi kami.&rdquo;
        </p>
      </div>
    </div>
  );
}
