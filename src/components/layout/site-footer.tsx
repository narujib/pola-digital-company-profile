import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Logo } from "@/components/logo";

const socialLinks = [
  { label: "Twitter", href: "#", icon: <Twitter className="size-4" /> },
  { label: "Instagram", href: "#", icon: <Instagram className="size-4" /> },
  { label: "LinkedIn", href: "#", icon: <Linkedin className="size-4" /> },
  { label: "Facebook", href: "#", icon: <Facebook className="size-4" /> },
];

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
              Mitra digital terpercaya Anda. Kami menghadirkan solusi inovatif untuk
              mentransformasi bisnis Anda ke level berikutnya dengan teknologi terkini.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white hover:text-[var(--pub-dark)] transition-all duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-white/10 text-center">
          <p className="text-base text-white/50">
            ©{new Date().getFullYear()}{" "}
            <span className="text-white">Pola Digital</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
