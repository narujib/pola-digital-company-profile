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
  // Cleanup Existing Data
  // ==========================================
  console.log("🧹 Membersihkan data blog dan kategori lama...");
  await prisma.blog.deleteMany({});
  await prisma.category.deleteMany({});

  function slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  // ==========================================

  // Category Seeder
  // ==========================================

  const categoryNames = ["Technology", "Business", "Lifestyle", "Design", "Marketing"];
  const categories = [];

  for (const name of categoryNames) {
    const slug = slugify(name);
    const category = await prisma.category.upsert({
      where: { slug },
      update: {},
      create: {
        name,
        slug,
      },
    });
    categories.push(category);
    console.log(`✅ Kategori ${name} siap.`);
  }

  // ==========================================
  // Blog Seeder
  // ==========================================

  const subjects = [
    "Next.js", "React", "Tailwind CSS", "Prisma ORM", "TypeScript", 
    "Digital Marketing", "UI/UX Design", "Business Strategy", "Content Creation", "SEO Basics"
  ];

  const templates = [
    { prefix: "Panduan Lengkap", excerpt: "Panduan komprehensif untuk memahami" },
    { prefix: "Tips & Trik Menguasai", excerpt: "Beberapa tips praktis untuk" },
    { prefix: "Pentingnya", excerpt: "Mengapa kita harus peduli dengan" },
    { prefix: "Masa Depan", excerpt: "Bagaimana tren mendatang terkait" },
    { prefix: "Mengenal Lebih Dekat", excerpt: "Analisis mendalam mengenai" },
  ];

  console.log("🚀 Membuat 50 blog baru...");

  for (let i = 0; i < 50; i++) {
    const subject = subjects[i % subjects.length];
    // Use Math.floor to get 50 unique combinations before repeating
    const templateIndex = Math.floor(i / subjects.length) % templates.length;
    const template = templates[templateIndex];
    
    // Pilih 1-3 kategori secara acak
    const numCategories = Math.floor(Math.random() * 3) + 1;
    const shuffledCategories = [...categories].sort(() => 0.5 - Math.random());
    const selectedCategories = shuffledCategories.slice(0, numCategories);

    // Tambahkan nomor seri agar 100% dipastikan tidak ada judul yang sama
    const title = `${template.prefix} ${subject} di Tahun 2026 #${i + 1}`;
    const uniqueSuffix = Math.random().toString(36).substring(2, 7);
    const slug = `${slugify(title)}-${uniqueSuffix}`;
    
    const isPublished = Math.random() > 0.2; // 80% published
    
    // Rentang waktu: 1 bulan lalu (30 hari) sampai kemaren (1 hari)
    const minDays = 1;
    const maxDays = 30;
    const daysAgo = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
    
    const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
    // updatedAt secara acak setelah atau sama dengan createdAt, tapi maksimal kemaren
    const updatedDaysAgo = Math.floor(Math.random() * daysAgo) + 1;
    const updatedAt = new Date(Date.now() - updatedDaysAgo * 24 * 60 * 60 * 1000);

    await prisma.blog.create({
      data: {
        title,
        slug,
        content: `Ini adalah konten untuk artikel mengenai ${subject}. Dalam era digital saat ini, ${subject} memegang peranan penting. Artikel ini mencakup topik ${selectedCategories.map(c => c.name).join(", ")}.\n\n## Poin Utama\n1. Efisiensi kerja meningkat\n2. Kualitas output lebih terjamin\n3. Relevansi industri jangka panjang`,
        excerpt: `${template.excerpt} ${subject} dalam konteks industri saat ini.`,
        thumbnail: null,
        isPublished,
        authorId: admin.id,
        createdAt,
        updatedAt,
        categories: {
          connect: selectedCategories.map(c => ({ id: c.id }))
        }
      },
    });
  }

  console.log(`✅ Berhasil menambahkan 50 blog baru dengan relasi multi-kategori.`);



}

main()
  .catch((e) => {
    console.error("❌ Seed gagal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
