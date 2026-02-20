import Link from "next/link";
import Image from "next/image";
import { User, Calendar, Tag } from "lucide-react";
import type { BlogPost } from "@/content/blog";

interface BlogCardProps {
  post: BlogPost;
  delayIndex?: number;
}

export function BlogCardDetailed({ post, delayIndex = 0 }: BlogCardProps) {
  return (
    <div
      className="flex flex-col gap-4 mb-12 last:mb-0"
      data-aos="fade-up"
      data-aos-delay={delayIndex * 150}
    >
      {/* Featured Image */}
      <Link
        href={`/blog/${post.slug}`}
        className="block relative aspect-[830/480] rounded-md overflow-hidden group"
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-5 text-sm">
        <div className="flex items-center gap-2 text-[var(--pub-body)]">
          <User className="size-4 text-[var(--pub-accent)]" />
          <span className="font-medium whitespace-nowrap">
            By {post.author.name}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[var(--pub-body)]">
          <Tag className="size-4 text-[var(--pub-accent)]" />
          <span className="font-medium whitespace-nowrap">{post.category}</span>
        </div>

        <div className="flex items-center gap-2 text-[var(--pub-body)]">
          <Calendar className="size-4 text-[var(--pub-accent)]" />
          <span className="font-medium whitespace-nowrap">{post.date}</span>
        </div>
      </div>

      {/* Title */}
      <Link href={`/blog/${post.slug}`} className="block">
        <h2 className="text-2xl lg:text-3xl font-extrabold text-[var(--pub-dark)] uppercase leading-tight hover:text-[var(--pub-accent)] transition-colors">
          {post.title}
        </h2>
      </Link>

      {/* Excerpt */}
      <p className="text-[var(--pub-body)] text-base leading-relaxed max-w-4xl">
        {post.excerpt}
      </p>

      {/* Button */}
      <div>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-block bg-[var(--pub-accent)] text-white font-bold uppercase tracking-wider px-7 py-3.5 rounded-md text-xs hover:bg-[var(--pub-dark)] transition-all"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
