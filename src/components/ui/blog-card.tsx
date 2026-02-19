import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  title: string;
  date: string;
  category: string;
  image: string;
  slug: string;
  delayIndex: number;
}

export function BlogCard({ title, date, category, image, slug, delayIndex }: BlogCardProps) {
  return (
    <div
      className="group flex flex-col h-full"
      data-aos="fade-up"
      data-aos-delay={delayIndex * 200 + 200}
    >
      <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[416/300]">
        <Image
          src={image}
          alt={title}
          width={416}
          height={300}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-[var(--pub-accent)] text-white text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wider">
          {category}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 uppercase font-medium tracking-wide">
          <span>{date}</span>
        </div>

        <Link href={`/blog/${slug}`} className="block mb-4">
          <h3 className="pub-h5 hover:text-[var(--pub-accent)] transition-colors mb-4">
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
