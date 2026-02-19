import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Layanan Kami - Pola Digital",
  description: "Jelajahi layanan unggulan kami: Pengembangan Web, Mobile App, Sistem Informasi, dan Konsultasi IT.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Services</h1>
      <p className="text-lg text-gray-600">Halaman layanan Pola Digital.</p>
      <Link href="/" className="mt-6 text-blue-600 hover:underline">← Kembali ke Home</Link>
    </main>
  );
}
