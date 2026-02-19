"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/about" },
  { label: "Layanan", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Kontak", href: "/contact" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full z-50">
      {/* Main Header */}
      <div
        className={cn(
          "w-full transition-all duration-300",
          isScrolled
            ? "fixed top-0 left-0 bg-white shadow-md z-fixed"
            : "absolute top-0 left-0 bg-transparent"
        )}
      >
        <div className="pub-container">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/">
              <Logo size="lg" className="text-[var(--pub-dark)]" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              <nav>
                <ul className="flex items-center gap-8">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={cn(
                            "text-sm font-semibold uppercase tracking-wider transition-colors",
                            isActive ? "text-[var(--pub-accent)]" : "text-[var(--pub-dark)] hover:text-[var(--pub-accent)]"
                          )}
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <Link href="/contact" className="pub-btn">
                Hubungi Kami
              </Link>
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 text-[var(--pub-dark)]" aria-label="Open menu">
                    <Menu className="size-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-white p-6">
                  <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
                  <div className="flex items-center justify-between mb-10">
                    <Logo size="xl" />
                  </div>
                  <nav>
                    <ul className="flex flex-col gap-4">
                      {navLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                        return (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={() => setMobileOpen(false)}
                              className={cn(
                                "block text-base font-semibold uppercase tracking-wider transition-colors py-2",
                                isActive ? "text-[var(--pub-accent)]" : "text-[var(--pub-dark)] hover:text-[var(--pub-accent)]"
                              )}
                              style={{ fontFamily: "var(--font-heading)" }}
                            >
                              {link.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="pub-btn mt-8 w-full text-center"
                  >
                    Hubungi Kami
                  </Link>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
