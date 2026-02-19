export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    bio?: string;
  };
  category: string;
  commentsCount: number;
}

export const categories = [
  "Digital Marketing",
  "Technology",
  "Bussiness",
  "Development",
  "Social Media",
];


export const blogPosts: BlogPost[] = [
  {
    title: "Strategi Pemasaran Digital untuk Bisnis Kecil",
    slug: "strategi-pemasaran-digital-bisnis-kecil",
    excerpt:
      "Bagaimana bisnis kecil dapat bersaing di dunia digital dengan anggaran terbatas namun tetap efektif dan efisien.",
    content: `
      <p>Pemasaran digital tidak selalu membutuhkan anggaran jutaan rupiah. Fokuslah pada konten yang relevan dan pembangunan komunitas di media sosial.</p>
      <blockquote>Konsistensi adalah kunci utama dalam membangun kehadiran digital yang kuat di mata pasar.</blockquote>
      <h3>1. Optimasi SEO Lokal</h3>
      <p>Pastikan bisnis Anda terdaftar di Google Maps dan memiliki profil Google Business yang lengkap.</p>
      <h3>2. Konten Media Sosial yang Autentik</h3>
      <p>Gunakan video pendek (Reels/TikTok) untuk menunjukkan proses di balik layar bisnis Anda.</p>
      <p>Dengan strategi yang tepat, bisnis kecil pun bisa memiliki jangkauan yang luas dan profesional.</p>
    `,
    image: "/images/blog/1.jpg",
    date: "20 Mei 2025",
    author: {
      name: "Admin",
      avatar: "/images/testimonials/1.jpg",
      bio: "Pakar strategi digital dengan pengalaman lebih dari 10 tahun membantu UMKM go-digital.",
    },
    category: "Digital Marketing",
    commentsCount: 3,
  },
  {
    title: "Pentingnya Keamanan Data untuk Perusahaan Modern",
    slug: "pentingnya-keamanan-data-perusahaan-modern",
    excerpt:
      "Memahami risiko keamanan siber di era transformasi digital dan bagaimana cara melindungi aset berharga perusahaan Anda.",
    content: `
      <p>Di era di mana data adalah emas baru, melindunginya adalah prioritas utama bagi setiap pemilik bisnis.</p>
      <h3>Risiko yang Mengintai</h3>
      <p>Serangan ransomware dan pencurian database pelanggan bisa menghancurkan reputasi bisnis dalam sekejap.</p>
      <h3>Langkah Pencegahan</h3>
      <p>Gunakan autentikasi dua faktor (2FA) dan pastikan sistem cadangan data Anda bekerja dengan sempurna setiap harinya.</p>
    `,
    image: "/images/blog/1.jpg",
    date: "18 Mei 2025",
    author: {
      name: "Admin",
      avatar: "/images/testimonials/1.jpg",
    },
    category: "Technology",
    commentsCount: 5,
  },
  {
    title: "Mengapa Desain UI/UX Sangat Berpengaruh pada Konversi",
    slug: "desain-ui-ux-berpengaruh-konversi",
    excerpt:
      "Tampilan bukan segalanya, namun pengalaman pengguna yang lancar akan membuat pengunjung betah dan melakukan pembelian.",
    content: `
      <p>Desain yang baik bukan hanya tentang warna yang cantik, tapi bagaimana pengguna bisa mencapai tujuannya dengan usaha minimal.</p>
      <h3>Analisis Psikologi Pengguna</h3>
      <p>Memahami hierarki informasi membantu menuntun mata pengguna ke arah tombol CTA yang tepat.</p>
      <p>Uji coba berkala dan pengumpulan feedback user adalah keharusan dalam fase pengembangan produk digital apa pun.</p>
    `,
    image: "/images/blog/1.jpg",
    date: "15 Mei 2025",
    author: {
      name: "Admin",
      avatar: "/images/testimonials/1.jpg",
    },
    category: "Digital Marketing",
    commentsCount: 2,
  },
];

export const blogContent = {
  listing: {
    title: "Artikel & Blog",
    breadcrumb: [{ label: "Beranda", href: "/" }, { label: "Blog" }],
  },
  sidebar: {
    searchTitle: "Cari",
    recentPostsTitle: "Postingan Terbaru",
    categoriesTitle: "Kategori",
    searchPlaceholder: "Ketik untuk mencari...",
  },
};
