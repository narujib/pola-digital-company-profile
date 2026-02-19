import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbBannerProps {
  title: string;
  items: BreadcrumbItem[];
}

export function BreadcrumbBanner({ title, items }: BreadcrumbBannerProps) {
  return (
    <section className="bg-[var(--pub-light-bg)] pt-36 pb-16 lg:pt-44 lg:pb-20">
      <div className="pub-container">
        <div className="text-center">
          <h2
            className="text-3xl lg:text-5xl font-bold uppercase text-[var(--pub-dark)] mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {title}
          </h2>
          <ul className="flex items-center justify-center gap-2 text-sm">
            {items.map((item, index) => (
              <li key={item.label} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight className="size-3 text-[var(--pub-body)]" />
                )}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-[var(--pub-dark)] hover:text-[var(--pub-accent)] transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="text-[var(--pub-accent)]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
