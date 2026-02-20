# Website Profil Perusahaan (Pola Digital)

Website Profil Perusahaan dinamis yang dibangun dengan pendekatan **Backend-First Architecture** menggunakan Next.js. Proyek ini mencakup situs publik dan Panel Admin (CMS) internal untuk mengelola konten blog.

---

## 📋 Ringkasan Proyek

Tujuan dari proyek ini adalah menyediakan website profil perusahaan yang skalabel dan terstruktur dengan baik. Proyek ini mencakup halaman publik standar dan area admin yang aman untuk pengelolaan konten dinamis.

### Teknologi yang Digunakan

- **Frontend & Backend**: [Next.js 16](https://nextjs.org/) (App Router)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Autentikasi**: [JSON Web Token (JWT)](https://jwt.io/)
- **Validasi**: [Zod](https://zod.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)

---

## 🏗️ Arsitektur

Proyek ini mengikuti pola **Modular Clean Architecture** (pola Controller-Service-Repository) untuk memastikan pemisahan logika yang jelas dan kemudahan pemeliharaan.

### Alur Kerja

1. **Frontend**: Dibangun dengan React Server Components (RSC) dan Client Components untuk interaktivitas.
2. **Interaksi API**: Frontend berkomunikasi dengan backend melalui Next.js Route Handlers (`/api/*`).
3. **Lapisan Backend**:
   - **Controller**: Menangani pemetaan request/response dan serialisasi (Standar JSON:API).
   - **Service**: Berisi logika bisnis utama.
   - **Repository**: Berinteraksi langsung dengan database menggunakan Prisma.

### Struktur Folder

```text
/src
  /app           # Next.js App Router (Halaman & Rute API)
  /modules       # Logika Bisnis Inti (Auth, Blog, Contact, Category)
    /[module]
      *.controller.ts
      *.service.ts
      *.repository.ts
      *.validation.ts
  /lib           # Konfigurasi pustaka pihak ketiga (Prisma, JWT, dll.)
  /utils         # Helper global (Standar response, slug generator, dll.)
  /middlewares   # Middleware untuk Auth & Penanganan Error
  /components    # Komponen UI bersama (shadcn/ui)
```

---

## ⚙️ Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

- **Node.js**: v18.x atau yang terbaru
- **npm** atau **yarn** sebagai pengelola paket
- **PostgreSQL**: Instance database PostgreSQL yang sudah berjalan

---

## 🛠️ Setup Lokal & Instalasi

Ikuti langkah-langkah berikut untuk menyiapkan proyek secara lokal:

1. **Clone repositori**

   ```bash
   git clone https://github.com/narujib/pola-digital-company-profile.git
   cd pola-digital-company-profile
   ```

2. **Instal dependensi**

   ```bash
   npm install
   ```

3. **Konfigurasi Variabel Lingkungan (Environment Variables)**
   Buat file `.env` dari contoh yang tersedia:

   ```bash
   cp .env.example .env
   ```

   Buka file `.env` dan konfigurasikan `DATABASE_URL` serta `JWT_SECRET`:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/pola_digital?schema=public"
   JWT_SECRET="kode_rahasia_anda_di_sini"
   ```

4. **Inisialisasi Database**
   Jalankan migrasi Prisma untuk membuat tabel:
   ```bash
   npx prisma migrate dev --name init
   ```
   (Opsional) Isi database dengan data demo (seeding):
   ```bash
   npm run prisma:seed
   ```

---

## 🚀 Menjalankan Aplikasi

Jalankan server pengembangan:

```bash
npm run dev
```

Aplikasi akan tersedia di [http://localhost:3000](http://localhost:3000).

---

## 📡 Dokumentasi API

Semua respons API mengikuti standar **JSON:API (ECMA-404 Standard)**.

### Endpoint Utama

- **Publik**:
  - `GET /api/blogs`: Mengambil data blog dengan dukungan pagination, pencarian, dan filtering.
  - `GET /api/blogs/:slug`: Mengambil satu blog berdasarkan slug-nya.
  - `POST /api/contact`: Mengirim pesan kontak.
- **Autentikasi**:
  - `POST /api/auth/login`: Login untuk akses admin.
- **Admin (Terproteksi)**:
  - `GET/POST/PUT/DELETE /api/admin/blogs`: Operasi CRUD untuk konten blog.

---

## 🌐 Deploy

Proyek ini dioptimalkan untuk dideploy di **Vercel**.

- **Website Live**: [https://poladigital.vercel.app/](https://poladigital.vercel.app/)
- **Dashboard Admin**: [https://poladigital.vercel.app/admin/login](https://poladigital.vercel.app/admin/login)

### Kredensial Admin (Demo)

- **Email**: `admin@poladigital.com`
- **Password**: `admin123`

---
