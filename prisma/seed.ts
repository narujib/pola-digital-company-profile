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

  const blogs = [
    {
      title: "Membangun Aplikasi Web Modern dengan Next.js",
      slug: "membangun-aplikasi-web-modern-dengan-nextjs",
      content:
        "Next.js adalah framework React yang powerful untuk membangun aplikasi web modern. Dengan fitur seperti Server-Side Rendering (SSR), Static Site Generation (SSG), dan API Routes, Next.js menjadi pilihan utama bagi banyak developer.\n\nDalam artikel ini, kita akan membahas mengapa Next.js menjadi begitu populer dan bagaimana memulai proyek pertama Anda dengan framework ini.\n\n## Mengapa Next.js?\n\n1. **Performance** - Optimasi otomatis untuk kecepatan loading\n2. **SEO Friendly** - SSR dan SSG untuk indexing yang lebih baik\n3. **Developer Experience** - Hot reload, TypeScript support built-in\n4. **Deployment Mudah** - Deploy ke Vercel dengan satu klik",
      excerpt:
        "Pelajari cara membangun aplikasi web modern dengan Next.js, framework React yang powerful dengan fitur SSR, SSG, dan API Routes.",
      isPublished: true,
    },
    {
      title: "Panduan Lengkap Tailwind CSS untuk Pemula",
      slug: "panduan-lengkap-tailwind-css-untuk-pemula",
      content:
        "Tailwind CSS adalah utility-first CSS framework yang memungkinkan Anda membangun desain custom tanpa meninggalkan HTML.\n\nBerbeda dengan framework CSS tradisional seperti Bootstrap, Tailwind memberikan kebebasan penuh dalam mendesain UI tanpa perlu menulis CSS custom.\n\n## Keunggulan Tailwind CSS\n\n- Utility-first approach\n- Highly customizable\n- Responsive design built-in\n- Dark mode support\n- Active community",
      excerpt:
        "Mulai belajar Tailwind CSS dari dasar. Panduan lengkap untuk pemula yang ingin menguasai utility-first CSS framework.",
      isPublished: true,
    },
    {
      title: "Best Practices dalam Pengembangan REST API",
      slug: "best-practices-pengembangan-rest-api",
      content:
        "REST API adalah fondasi dari komunikasi antara frontend dan backend di aplikasi modern. Membangun API yang baik memerlukan pemahaman tentang best practices.\n\n## Prinsip Dasar\n\n1. Gunakan HTTP methods dengan benar (GET, POST, PUT, DELETE)\n2. Konsisten dalam penamaan endpoint\n3. Gunakan status code yang tepat\n4. Implementasi pagination untuk list endpoints\n5. Validasi input di sisi server",
      excerpt:
        "Pelajari best practices dalam membangun REST API yang bersih, konsisten, dan mudah digunakan oleh tim frontend.",
      isPublished: true,
    },
    {
      title: "Mengenal TypeScript: Superset JavaScript yang Type-Safe",
      slug: "mengenal-typescript-superset-javascript-type-safe",
      content:
        "TypeScript menambahkan static typing ke JavaScript, membantu developer mendeteksi error lebih awal dan menulis kode yang lebih maintainable.\n\n## Fitur Utama TypeScript\n\n- Static type checking\n- Interface dan type aliases\n- Generics\n- Enums\n- Decorators",
      excerpt:
        "Pengenalan TypeScript untuk developer JavaScript. Pelajari mengapa TypeScript menjadi standar baru dalam pengembangan web.",
      isPublished: false,
    },
    {
      title: "Optimasi Performa Database PostgreSQL",
      slug: "optimasi-performa-database-postgresql",
      content:
        "PostgreSQL adalah salah satu database relasional paling powerful. Namun, tanpa optimasi yang tepat, performa bisa menurun seiring pertumbuhan data.\n\n## Tips Optimasi\n\n1. Gunakan indexing dengan bijak\n2. Analisis query plan dengan EXPLAIN ANALYZE\n3. Partitioning untuk tabel besar\n4. Connection pooling\n5. Vacuum dan maintenance rutin",
      excerpt:
        "Tips dan trik untuk mengoptimalkan performa database PostgreSQL agar aplikasi Anda tetap cepat dan responsif.",
      isPublished: false,
    },
  ];

  for (const blog of blogs) {
    await prisma.blog.create({
      data: {
        ...blog,
        authorId: admin.id,
      },
    });
  }

  console.log(`✅ ${blogs.length} blog berhasil dibuat (3 published, 2 draft).`);
}

main()
  .catch((e) => {
    console.error("❌ Seed gagal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
