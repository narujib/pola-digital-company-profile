import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/content/blog";

interface BlogCardProps {
  post: BlogPost;
  delayIndex?: number;
}

export function BlogCard({ post, delayIndex = 0 }: BlogCardProps) {
  const { image, date, category, title, slug } = post;

  return (
    <div
      className="bg-white p-6 rounded-md transition-all duration-300 border border-gray-100 h-full flex flex-col group"
      data-aos="fade-up"
      data-aos-delay={delayIndex * 200 + 200}
    >
      <div className="relative aspect-[400/280] rounded-md overflow-hidden mb-6">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-[var(--pub-accent)] text-white text-xs font-bold uppercase px-3 py-1 rounded-md tracking-wider">
          {category}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 uppercase font-medium tracking-wide">
          <span>{date}</span>
        </div>

        <Link href={`/blog/${slug}`} className="block mb-4">
          <h3 className="pub-h5 hover:text-[var(--pub-accent)] transition-colors mb-4 line-clamp-2">
            {title}
          </h3>
        </Link>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <Link
            href={`/blog/${slug}`}
            className="pub-h6 !text-sm tracking-wider hover:text-[var(--pub-accent)] transition-colors inline-flex items-center gap-2"
          >
            Baca Selengkapnya <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
