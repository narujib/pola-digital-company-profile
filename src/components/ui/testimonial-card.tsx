import Image from "next/image";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  text: string;
  name: string;
  role: string;
  image: string;
}

export function TestimonialCard({ text, name, role, image }: TestimonialCardProps) {
  return (
    <div className="bg-white p-10 rounded-2xl h-full flex flex-col shadow-sm">
      <div className="flex gap-1 text-[#FFB800] mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className="size-4 fill-current" />
        ))}
      </div>

      <p className="text-[var(--pub-body)] text-lg leading-relaxed italic mb-8 flex-1">
        &quot;{text}&quot;
      </p>

      <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
        <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 aspect-square">
          <Image
            src={image}
            alt={name}
            width={56}
            height={56}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h5 className="pub-h6 !normal-case mb-1">{name}</h5>
          <p className="text-sm text-[var(--pub-body)] opacity-80">{role}</p>
        </div>
      </div>
    </div>
  );
}
