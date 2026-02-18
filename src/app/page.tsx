import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Pola Digital</h1>
      <p className="text-lg text-gray-600 mb-8">Company Profile</p>
      <nav className="flex flex-col gap-3 text-center">
        <Link href="/about" className="text-blue-600 hover:underline">About</Link>
        <Link href="/services" className="text-blue-600 hover:underline">Services</Link>
        <Link href="/blog" className="text-blue-600 hover:underline">Blog</Link>
        <Link href="/contact" className="text-blue-600 hover:underline">Contact</Link>
      </nav>
    </main>
  );
}
