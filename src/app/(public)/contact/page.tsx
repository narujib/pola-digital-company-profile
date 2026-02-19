import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hubungi Kami - Pola Digital",
  description: "Hubungi Pola Digital untuk konsultasi gratis mengenai kebutuhan teknologi dan pengembangan sistem Anda.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Contact</h1>
      <p className="text-lg text-gray-600">Hubungi Pola Digital.</p>
      <Link href="/" className="mt-6 text-blue-600 hover:underline">← Kembali ke Home</Link>
    </main>
  );
}
