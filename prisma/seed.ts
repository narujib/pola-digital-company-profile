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
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("✅ Admin user sudah ada, skip seeding.");
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // Buat admin user
  const admin = await prisma.user.create({
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

main()
  .catch((e) => {
    console.error("❌ Seed gagal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
