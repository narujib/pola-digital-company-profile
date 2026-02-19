import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tentang Kami - Pola Digital",
  description: "Pelajari lebih lanjut tentang Pola Digital, visi kami, dan tim profesional yang siap membantu transformasi digital bisnis Anda.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">About</h1>
      <p className="text-lg text-gray-600">Halaman tentang Pola Digital.</p>
      <Link href="/" className="mt-6 text-blue-600 hover:underline">← Kembali ke Home</Link>
    </main>
  );
}
