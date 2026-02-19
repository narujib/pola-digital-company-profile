import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Logo } from "@/components/logo";
import { footerContent } from "@/content/global/footer";

const iconMap: Record<string, React.ReactNode> = {
  Twitter: <Twitter className="size-4" />,
  Instagram: <Instagram className="size-4" />,
  LinkedIn: <Linkedin className="size-4" />,
  Facebook: <Facebook className="size-4" />,
};

export function SiteFooter() {
  return (
    <footer className="bg-[var(--pub-footer-bg)] text-white">
      <div className="pub-container">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-12 gap-6">
          <div>
            <Link href="/">
              <Logo size="2xl" className="text-white/60" />
            </Link>
            <p className="mt-4 text-white/60 text-base max-w-md leading-relaxed">
              {footerContent.description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {footerContent.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white hover:text-[var(--pub-dark)] transition-all duration-300"
                aria-label={social.label}
              >
                {iconMap[social.label]}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-white/10 text-center">
          <p className="text-base text-white/50">
            ©{new Date().getFullYear()}{" "}
            <span className="text-white">{footerContent.copyright}</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
