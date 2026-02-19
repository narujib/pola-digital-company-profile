import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbBannerProps {
  title: string;
  paths: {
    label: string;
    href?: string;
  }[];
}

export function BreadcrumbBanner({ title, paths }: BreadcrumbBannerProps) {
  return (
    <section className="bg-[#E7F3F1] pt-32 pb-20 lg:pt-48 lg:pb-28 relative overflow-hidden">
      <div className="pub-container relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="pub-h3 text-[var(--pub-dark)] mb-4">{title}</h1>
        <ul className="flex items-center gap-2 text-[var(--pub-body)] text-base font-medium">
          {paths.map((path, index) => {
            const isLast = index === paths.length - 1;

            return (
              <li key={index} className="flex items-center gap-2">
                {path.href ? (
                  <Link
                    href={path.href}
                    className="hover:text-[var(--pub-accent)] transition-colors"
                  >
                    {path.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-[var(--pub-accent)]" : ""}>
                    {path.label}
                  </span>
                )}

                {!isLast && <ChevronRight className="size-4 opacity-50" />}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
