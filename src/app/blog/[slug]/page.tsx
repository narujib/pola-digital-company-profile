import Link from "next/link";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Blog Detail</h1>
      <p className="text-lg text-gray-600">
        Slug: <code className="bg-gray-100 px-2 py-1 rounded">{slug}</code>
      </p>
      <Link href="/blog" className="mt-6 text-blue-600 hover:underline">← Kembali ke Blog</Link>
    </main>
  );
}
