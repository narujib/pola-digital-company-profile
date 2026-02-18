import Link from "next/link";

export default function BlogPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-lg text-gray-600">Daftar artikel dari Pola Digital.</p>
      <Link href="/" className="mt-6 text-blue-600 hover:underline">← Kembali ke Home</Link>
    </main>
  );
}
