export interface ServiceDetail {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  image: string;
  subImages: string[];
  features: string[];
  fullDescription: string;
  centerText: string;
  allDetailsText: string;
}

export const servicesContent = {
  listing: {
    title: "Layanan Kami",
    description:
      "Pola Digital menyediakan layanan perencanaan keuangan, strategi bisnis, pemasaran digital, dan ide investasi untuk membantu bisnis Anda tumbuh di era digital.",
  },
  details: {
    sidebarTitle: "Layanan Lainnya",
    contactWidget: {
      title: "Butuh Konsultasi Gratis?",
      description:
        "Tim kami siap membantu Anda merancang fondasi digital masa depan. Hubungi kami sekarang untuk diskusi lebih lanjut.",
      btnText: "Hubungi Kami",
      icon: "/images/icon/phone.svg",
    },
  },
};

export const servicesData: ServiceDetail[] = [
  {
    slug: "finance-planning",
    title: "Finance Planning",
    subtitle: "Perencanaan Keuangan",
    description:
      "Kami membantu Anda merancang strategi keuangan yang kokoh untuk pertumbuhan bisnis yang berkelanjutan.",
    icon: "/images/icon/1.svg",
    image: "/images/service/1.jpg",
    subImages: ["/images/service/2.jpg", "/images/service/3.jpg"],
    features: [
      "Analisis arus kas mendalam",
      "Optimasi anggaran operasional",
      "Perencanaan investasi jangka panjang",
      "Manajemen risiko keuangan",
      "Pelaporan keuangan transparan",
    ],
    fullDescription:
      "Tim kami mengutamakan kegunaan dan aksesibilitas untuk memastikan bahwa setiap klien mendapatkan solusi keuangan yang intuitif dan mudah dipahami. Kami menganalisis struktur biaya Anda dan menemukan peluang penghematan tanpa mengorbankan kualitas operasional.",
    centerText:
      "Dengan pengalaman lebih dari satu dekade, kami telah memantapkan diri sebagai salah satu agensi perintis di wilayah ini. Struktur dan proses kami yang kecil, fleksibel, tangkas, dan dipimpin oleh desain memungkinkan responsivitas tinggi dan inovasi.",
    allDetailsText:
      "Kami menggabungkan strategi, pemasaran, dan desain untuk menciptakan ekosistem keuangan yang mendukung visi besar perusahaan Anda. Setiap langkah dalam workflow kami dilaporkan secara berkala untuk organisasi konten yang lebih baik.",
  },
  {
    slug: "business-strategy",
    title: "Business Strategy",
    subtitle: "Strategi Bisnis",
    description:
      "Transformasi ide menjadi eksekusi nyata dengan strategi bisnis yang adaptif dan berorientasi pada hasil.",
    icon: "/images/icon/2.svg",
    image: "/images/service/3.jpg",
    subImages: ["/images/service/2.jpg", "/images/service/1.jpg"],
    features: [
      "Riset pasar & kompetitor",
      "Pengembangan model bisnis baru",
      "Strategi ekspansi pasar",
      "Audit efisiensi internal",
      "Visi & misi perusahaan",
    ],
    fullDescription:
      "Strategi bisnis bukan hanya soal rencana di atas kertas, tapi bagaimana rencana tersebut bisa dijalankan di lapangan. Kami membantu Anda menavigasi tantangan pasar digital dengan pendekatan berbasis data.",
    centerText:
      "Para pemimpin, pakar strategi, manajer, pengembang, animator, dan desainer kami bekerja bersama di bawah satu payung untuk memberikan solusi kreatif yang dipimpin secara digital.",
    allDetailsText:
      "Kami fokus pada skalabilitas dan performa analisis untuk memastikan bahwa bisnis Anda tidak hanya bertahan, tapi juga memimpin di industrinya.",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    subtitle: "Pemasaran Digital",
    description:
      "Tingkatkan visibilitas brand Anda dan jangkau audiens yang tepat melalui kampanye digital yang terukur.",
    icon: "/images/icon/3.svg",
    image: "/images/service/2.jpg",
    subImages: ["/images/service/1.jpg", "/images/service/3.jpg"],
    features: [
      "Manajemen Media Sosial",
      "Kampanye Iklan Berbayar (SEM)",
      "Optimasi Mesin Pencari (SEO)",
      "Pemasaran Konten Kreatif",
      "Analitik & Insight Audiens",
    ],
    fullDescription:
      "Di era digital, kehadiran online adalah segalanya. Kami memastikan brand Anda muncul di depan mata calon pelanggan saat mereka paling membutuhkan solusi Anda.",
    centerText:
      "Kami menggabungkan elemen psikologi konsumen dengan teknologi terkini untuk menghasilkan konversi tinggi dari setiap pengunjung situs Anda.",
    allDetailsText:
      "Fleksibilitas, skalabilitas, serta analisis performa adalah kunci utama dari setiap kampanye pemasaran yang kami luncurkan.",
  },
  {
    slug: "investment-idea",
    title: "Investment Idea",
    subtitle: "Ide Investasi",
    description:
      "Menemukan peluang investasi teknologi terbaik untuk mengamankan masa depan digital perusahaan Anda.",
    icon: "/images/icon/4.svg",
    image: "/images/service/2.jpg",
    subImages: ["/images/service/3.jpg", "/images/service/1.jpg"],
    features: [
      "Evaluasi startup teknologi",
      "Analisis ROI digital",
      "Manajemen portofolio aset",
      "Tren pasar modal digital",
      "Diversifikasi strategi investasi",
    ],
    fullDescription:
      "Investasi yang cerdas dimulai dengan ide yang matang. Kami memberikan wawasan mendalam tentang di mana perusahaan harus menempatkan sumber dayanya untuk keuntungan maksimal.",
    centerText:
      "Agensi kami yang kreatif dan digerakkan secara digital menggabungkan strategi dengan wawasan data untuk ide investasi yang visioner.",
    allDetailsText:
      "Keamanan dan administrasi berbasis peran memastikan setiap data investasi Anda tetap terlindungi dengan standar keamanan tertinggi.",
  },
];
