import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "404 - Halaman Tidak Ditemukan | Pola Digital",
  description: "Maaf, halaman yang Anda cari tidak ditemukan di Pola Digital.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow flex items-center justify-center bg-[#fdfdfd] pt-32 pb-20">
        <div className="pub-container">
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
            {/* Illustration */}
            <div 
              className="relative w-full max-w-md aspect-square mb-8"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <Image
                src="/images/404.png"
                alt="404 Not Found"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Content */}
            <div data-aos="fade-up" data-aos-delay="200" className="flex flex-col items-center">
              <h1 className="pub-h2 text-[var(--pub-accent)] mb-4">404</h1>
              <h2 className="pub-h4 text-[var(--pub-dark)] mb-6">
                OPSS! HALAMAN TIDAK DITEMUKAN
              </h2>
              <p className="pub-text mb-10 text-gray-600 max-w-lg">
                Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan. 
                Pastikan alamat yang Anda masukkan benar atau klik tombol di bawah untuk kembali ke beranda.
              </p>
              
              <Link href="/" className="pub-btn-accent min-w-[240px]">
                KEMBALI KE BERANDA
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
