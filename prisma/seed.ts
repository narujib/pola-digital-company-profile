import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";
import bcrypt from "bcrypt";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = "admin@poladigital.com";

  // Cek apakah admin sudah ada
  let admin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (admin) {
    console.log("✅ Admin user sudah ada, skip seeding user.");
  } else {
    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Buat admin user
    admin = await prisma.user.create({
      data: {
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
      },
    });

    console.log(`✅ Admin user berhasil dibuat:`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Name: ${admin.name}`);
  }

  // ==========================================
  // Blog Seeder
  // ==========================================

  const existingBlogs = await prisma.blog.count();

  if (existingBlogs > 0) {
    console.log(`✅ ${existingBlogs} blog sudah ada, skip seeding blog.`);
    return;
  }

  const topics = [
    { category: "Web Development", subjects: ["Next.js", "React", "Vue.js", "Angular", "Svelte", "Astro", "Remix", "Nuxt.js"] },
    { category: "Mobile Development", subjects: ["Flutter", "React Native", "Swift", "Kotlin", "Ionic", "Capacitor"] },
    { category: "DevOps", subjects: ["Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Terraform", "Ansible"] },
    { category: "Design", subjects: ["Figma", "UI/UX", "Design System", "Tailwind CSS", "CSS Grid", "Animasi Web"] },
    { category: "Data", subjects: ["PostgreSQL", "MongoDB", "Redis", "Prisma ORM", "GraphQL", "REST API"] },
    { category: "Security", subjects: ["JWT Authentication", "OAuth 2.0", "CORS", "HTTPS", "Input Validation"] },
    { category: "Cloud", subjects: ["AWS", "Google Cloud", "Vercel", "Supabase", "Firebase", "Cloudflare"] },
    { category: "AI & ML", subjects: ["Machine Learning", "ChatGPT API", "TensorFlow.js", "LangChain", "AI Agents"] },
  ];

  const templates = [
    { prefix: "Panduan Lengkap", excerpt: "Panduan komprehensif untuk memahami dan menggunakan" },
    { prefix: "Memulai dengan", excerpt: "Langkah awal untuk memulai menggunakan" },
    { prefix: "Best Practices", excerpt: "Kumpulan best practices dalam penggunaan" },
    { prefix: "Tips & Trik", excerpt: "Tips dan trik praktis untuk mengoptimalkan penggunaan" },
    { prefix: "Studi Kasus:", excerpt: "Studi kasus nyata dalam implementasi" },
    { prefix: "Perbandingan", excerpt: "Analisis mendalam membandingkan" },
    { prefix: "Optimasi Performa", excerpt: "Cara mengoptimalkan performa dengan" },
  ];

  function slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  const blogs: {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    isPublished: boolean;
    createdAt: Date;
  }[] = [];

  for (let i = 0; i < 50; i++) {
    const topic = topics[i % topics.length];
    const subject = topic.subjects[i % topic.subjects.length];
    const template = templates[i % templates.length];

    const title = `${template.prefix} ${subject} di ${topic.category}`;
    const slug = slugify(title) + `-${i + 1}`;
    const isPublished = i % 10 < 7; // 70% published, 30% draft

    // Stagger creation dates over the last 6 months
    const daysAgo = Math.floor((50 - i) * 3.6);
    const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    blogs.push({
      title,
      slug,
      content: `${subject} adalah teknologi penting dalam ${topic.category}.\n\n## Pendahuluan\n\nDalam artikel ini kita akan membahas tentang ${subject} secara mendalam, termasuk cara penggunaan, best practices, dan tips praktis.\n\n## Mengapa ${subject}?\n\n1. **Populer** — Banyak digunakan oleh developer di seluruh dunia\n2. **Powerful** — Fitur lengkap untuk kebutuhan ${topic.category.toLowerCase()}\n3. **Community** — Komunitas aktif dan dokumentasi yang baik\n4. **Scalable** — Cocok untuk proyek kecil hingga enterprise\n\n## Kesimpulan\n\n${subject} adalah pilihan yang solid untuk ${topic.category.toLowerCase()}. Dengan memahami konsep dasar dan best practices, Anda bisa memaksimalkan potensi teknologi ini dalam proyek Anda.`,
      excerpt: `${template.excerpt} ${subject} dalam ${topic.category.toLowerCase()}. Cocok untuk pemula maupun developer berpengalaman.`,
      isPublished,
      createdAt,
    });
  }

  for (const blog of blogs) {
    await prisma.blog.create({
      data: {
        ...blog,
        authorId: admin.id,
      },
    });
  }

  const published = blogs.filter((b) => b.isPublished).length;
  const draft = blogs.length - published;
  console.log(`✅ ${blogs.length} blog berhasil dibuat (${published} published, ${draft} draft).`);
}

main()
  .catch((e) => {
    console.error("❌ Seed gagal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
