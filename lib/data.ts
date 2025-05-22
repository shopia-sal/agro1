// Mock data for the marketplace

// Categories
export function getCategories() {
  return [
    {
      id: "pupuk_organik",
      name: "Pupuk Organik",
      image: "/categories/pupuk-organik-1.jpg",
      description: "Pupuk organik berkualitas tinggi untuk tanaman Anda",
    },
    {
      id: "biopestisida",
      name: "Biopestisida",
      image: "/categories/biopeptisida.png",
      description: "Biopestisida ramah lingkungan untuk pengendalian hama",
    },
    {
      id: "bibit_organik",
      name: "Bibit Organik",
      image: "/categories/bibit-organik.jpg",
      description: "Bibit tanaman organik berkualitas tinggi",
    },
    {
      id: "alat_pertanian",
      name: "Alat Pertanian",
      image: "/categories/alat-pertanian.jpg",
      description: "Peralatan pertanian modern untuk hasil maksimal",
    },
  ]
}

// Certifications
export function getCertifications() {
  return [
    {
      id: "organik_indonesia",
      name: "Organik Indonesia",
      logo: "/placeholder.svg?height=50&width=50&text=OI",
    },
    {
      id: "sucofindo",
      name: "Sucofindo",
      logo: "/placeholder.svg?height=50&width=50&text=SC",
    },
    {
      id: "bpom",
      name: "BPOM",
      logo: "/placeholder.svg?height=50&width=50&text=BPOM",
    },
    {
      id: "kementan",
      name: "Kementerian Pertanian",
      logo: "/placeholder.svg?height=50&width=50&text=KP",
    },
  ]
}

// Products
const products = [
  {
    id: "1",
    name: "Pupuk Organik Premium",
    description: "Pupuk organik premium untuk meningkatkan kesuburan tanah dan pertumbuhan tanaman",
    price: 75000,
    originalPrice: 85000,
    image: "/products/pupuk-organik-premium.png",
    category: "pupuk_organik",
    certifications: ["Organik Indonesia", "Kementerian Pertanian"],
    featured: true,
    rating: 4.8,
    reviewCount: 124,
    stock: 50,
    weight: 5,
    dimensions: "25 x 15 x 5 cm",
    manufacturer: "PT Agro Organik Indonesia",
    productionDate: "2023-05-15",
    shelfLife: "2 tahun",
    ingredients: ["Kompos daun", "Kotoran sapi terfermentasi", "Arang sekam", "Mikroba menguntungkan"],
    qualityRatings: {
      organic: 95,
      effectiveness: 90,
      safety: 98,
    },
    ratingDistribution: {
      5: 98,
      4: 20,
      3: 4,
      2: 1,
      1: 1,
    },
    reviews: [
      {
        author: "Budi Santoso",
        rating: 5,
        date: "15 Mei 2023",
        comment:
          "Pupuk organik terbaik yang pernah saya gunakan. Tanaman saya tumbuh subur dan hasil panen meningkat signifikan.",
      },
      {
        author: "Siti Aminah",
        rating: 4,
        date: "3 Juni 2023",
        comment: "Kualitas bagus, tanaman jadi lebih sehat. Hanya saja kemasannya agak mudah sobek.",
      },
      {
        author: "Ahmad Hidayat",
        rating: 5,
        date: "20 Juli 2023",
        comment:
          "Sangat puas dengan produk ini. Tanaman sayur di kebun saya tumbuh lebih cepat dan hasil panen meningkat.",
      },
    ],
    createdAt: "2023-01-15",
  },
  {
    id: "2",
    name: "Biopestisida Alami",
    description: "Biopestisida alami untuk mengendalikan hama tanpa merusak lingkungan",
    price: 65000,
    originalPrice: null,
    image: "/products/biopeptisida-alami.png",
    category: "biopestisida",
    certifications: ["BPOM", "Sucofindo"],
    featured: true,
    rating: 4.5,
    reviewCount: 89,
    stock: 35,
    weight: 1,
    dimensions: "10 x 5 x 20 cm",
    manufacturer: "CV Biopest Indonesia",
    productionDate: "2023-06-10",
    shelfLife: "1 tahun",
    ingredients: ["Ekstrak nimba", "Minyak serai wangi", "Ekstrak bawang putih", "Emulsifier alami"],
    qualityRatings: {
      organic: 90,
      effectiveness: 85,
      safety: 95,
    },
    ratingDistribution: {
      5: 60,
      4: 20,
      3: 7,
      2: 1,
      1: 1,
    },
    reviews: [
      {
        author: "Dian Purnama",
        rating: 5,
        date: "5 Juli 2023",
        comment: "Efektif mengendalikan hama ulat pada tanaman kubis saya. Sangat merekomendasikan produk ini!",
      },
      {
        author: "Rudi Hartono",
        rating: 4,
        date: "12 Agustus 2023",
        comment: "Bekerja dengan baik untuk mengusir hama, tapi perlu aplikasi ulang setelah hujan.",
      },
    ],
    createdAt: "2023-02-20",
  },
  {
    id: "3",
    name: "Bibit Tomat Organik",
    description: "Bibit tomat organik varietas unggul dengan hasil panen melimpah",
    price: 25000,
    originalPrice: 30000,
    image: "/products/bibit-tomat.jpg",
    category: "bibit_organik",
    certifications: ["Organik Indonesia"],
    featured: true,
    rating: 4.7,
    reviewCount: 56,
    stock: 100,
    weight: 0.1,
    dimensions: "5 x 5 x 10 cm",
    manufacturer: "PT Bibit Unggul Nusantara",
    productionDate: "2023-07-05",
    shelfLife: "6 bulan",
    ingredients: ["Benih tomat varietas Cherry", "Media tanam organik"],
    qualityRatings: {
      organic: 98,
      effectiveness: 92,
      safety: 100,
    },
    ratingDistribution: {
      5: 45,
      4: 8,
      3: 2,
      2: 1,
      1: 0,
    },
    reviews: [
      {
        author: "Rina Wijaya",
        rating: 5,
        date: "20 Juli 2023",
        comment: "Bibit tumbuh dengan sangat baik dan cepat berbuah. Rasa tomatnya manis dan segar.",
      },
    ],
    createdAt: "2023-03-10",
  },
  {
    id: "4",
    name: "Alat Penyiram Otomatis",
    description: "Alat penyiram otomatis dengan sensor kelembaban tanah untuk efisiensi pengairan",
    price: 350000,
    originalPrice: 400000,
    image: "/products/alatSemprot1.jpg",
    category: "alat_pertanian",
    certifications: ["Sucofindo"],
    featured: true,
    rating: 4.6,
    reviewCount: 42,
    stock: 15,
    weight: 2,
    dimensions: "30 x 20 x 15 cm",
    manufacturer: "PT Agro Tech Indonesia",
    productionDate: "2023-04-20",
    shelfLife: "5 tahun",
    ingredients: [],
    qualityRatings: {
      organic: 0,
      effectiveness: 95,
      safety: 90,
    },
    ratingDistribution: {
      5: 32,
      4: 8,
      3: 1,
      2: 1,
      1: 0,
    },
    reviews: [
      {
        author: "Hendra Gunawan",
        rating: 5,
        date: "15 Mei 2023",
        comment: "Sangat membantu menghemat waktu dan air. Tanaman selalu mendapatkan air yang cukup.",
      },
      {
        author: "Maya Sari",
        rating: 4,
        date: "2 Juni 2023",
        comment: "Bekerja dengan baik, tapi baterai cepat habis. Sebaiknya gunakan adaptor.",
      },
    ],
    createdAt: "2023-01-25",
  },
  {
    id: "5",
    name: "Kompos Organik",
    description: "Kompos organik berkualitas tinggi untuk memperbaiki struktur tanah",
    price: 45000,
    originalPrice: null,
    image: "/products/kompos-organik.jpg",
    category: "pupuk_organik",
    certifications: ["Organik Indonesia", "Kementerian Pertanian"],
    featured: false,
    rating: 4.4,
    reviewCount: 78,
    stock: 200,
    weight: 10,
    dimensions: "40 x 30 x 10 cm",
    manufacturer: "PT Kompos Nusantara",
    productionDate: "2023-06-15",
    shelfLife: "3 tahun",
    ingredients: ["Sisa tanaman terdekomposisi", "Kotoran hewan terfermentasi", "Mikroorganisme pengurai"],
    qualityRatings: {
      organic: 100,
      effectiveness: 88,
      safety: 95,
    },
    ratingDistribution: {
      5: 50,
      4: 20,
      3: 5,
      2: 2,
      1: 1,
    },
    reviews: [
      {
        author: "Agus Supriyanto",
        rating: 5,
        date: "10 Juli 2023",
        comment: "Kompos berkualitas bagus, tanah menjadi lebih gembur dan tanaman tumbuh subur.",
      },
    ],
    createdAt: "2023-02-15",
  },
  {
    id: "6",
    name: "Pestisida Nabati",
    description: "Pestisida nabati dari ekstrak tanaman untuk mengendalikan berbagai jenis hama",
    price: 55000,
    originalPrice: 60000,
    image: "/products/peptisida-nabati.png",
    category: "biopestisida",
    certifications: ["BPOM", "Organik Indonesia"],
    featured: false,
    rating: 4.3,
    reviewCount: 65,
    stock: 40,
    weight: 0.5,
    dimensions: "8 x 8 x 15 cm",
    manufacturer: "CV Nabati Indonesia",
    productionDate: "2023-05-25",
    shelfLife: "1 tahun",
    ingredients: ["Ekstrak daun nimba", "Ekstrak bawang putih", "Minyak cengkeh", "Emulsifier alami"],
    qualityRatings: {
      organic: 95,
      effectiveness: 85,
      safety: 90,
    },
    ratingDistribution: {
      5: 40,
      4: 15,
      3: 8,
      2: 1,
      1: 1,
    },
    reviews: [
      {
        author: "Dewi Lestari",
        rating: 4,
        date: "5 Juni 2023",
        comment: "Cukup efektif untuk mengendalikan kutu daun pada tanaman cabai saya.",
      },
    ],
    createdAt: "2023-03-20",
  },
  {
    id: "7",
    name: "Bibit Cabai Rawit Organik",
    description: "Bibit cabai rawit organik varietas unggul dengan tingkat kepedasan tinggi",
    price: 20000,
    originalPrice: null,
    image: "/products/bibit-cabaiRawit.png",
    category: "bibit_organik",
    certifications: ["Organik Indonesia"],
    featured: false,
    rating: 4.6,
    reviewCount: 48,
    stock: 80,
    weight: 0.1,
    dimensions: "5 x 5 x 10 cm",
    manufacturer: "PT Bibit Unggul Nusantara",
    productionDate: "2023-07-10",
    shelfLife: "6 bulan",
    ingredients: ["Benih cabai rawit varietas lokal", "Media tanam organik"],
    qualityRatings: {
      organic: 97,
      effectiveness: 90,
      safety: 100,
    },
    ratingDistribution: {
      5: 38,
      4: 8,
      3: 1,
      2: 1,
      1: 0,
    },
    reviews: [
      {
        author: "Joko Susilo",
        rating: 5,
        date: "25 Juli 2023",
        comment: "Bibit tumbuh dengan baik dan cepat berbuah. Cabainya pedas sekali!",
      },
    ],
    createdAt: "2023-04-05",
  },
  {
    id: "8",
    name: "Alat Pengolah Kompos",
    description: "Alat pengolah kompos untuk mengubah sampah organik menjadi pupuk berkualitas",
    price: 450000,
    originalPrice: 500000,
    image: "/products/alat-pengolahKompos.png",
    category: "alat_pertanian",
    certifications: ["Sucofindo"],
    featured: false,
    rating: 4.5,
    reviewCount: 35,
    stock: 10,
    weight: 5,
    dimensions: "50 x 40 x 30 cm",
    manufacturer: "PT Agro Tech Indonesia",
    productionDate: "2023-03-15",
    shelfLife: "10 tahun",
    ingredients: [],
    qualityRatings: {
      organic: 0,
      effectiveness: 92,
      safety: 95,
    },
    ratingDistribution: {
      5: 25,
      4: 8,
      3: 1,
      2: 1,
      1: 0,
    },
    reviews: [
      {
        author: "Bambang Sutrisno",
        rating: 5,
        date: "20 April 2023",
        comment: "Alat yang sangat berguna untuk mengolah sampah dapur menjadi kompos. Hasilnya bagus!",
      },
    ],
    createdAt: "2023-01-10",
  },
]

// Get all products
export function getAllProducts() {
  return products
}

// Get featured products
export function getFeaturedProducts() {
  return products.filter((product) => product.featured)
}

// Get product by ID
export function getProductById(id) {
  return products.find((product) => product.id === id)
}

// Get related products
export function getRelatedProducts(id) {
  const product = getProductById(id)
  if (!product) return []

  return products.filter((p) => p.id !== id && p.category === product.category).slice(0, 4)
}

// Fungsi untuk mendapatkan riwayat pesanan
export function getOrderHistory() {
  return [
    {
      id: "1",
      orderNumber: "ORD-12345",
      date: "2023-05-01",
      status: "delivered",
      total: 350000,
      subtotal: 320000,
      shipping: 15000,
      tax: 15000,
      discount: 0,
      payment_method: "bank_transfer",
      shipping_method: "regular",
      customer: {
        name: "Budi Santoso",
        email: "budi@example.com",
      },
      shipping_address: {
        name: "Budi Santoso",
        address: "Jl. Merdeka No. 123",
        city: "Jakarta",
        province: "DKI Jakarta",
        postal_code: "12345",
        phone: "081234567890",
      },
      items: [
        {
          id: "1",
          name: "Pupuk Organik Premium",
          price: 75000,
          quantity: 3,
          image: "/placeholder.svg?height=64&width=64&text=Pupuk+Organik",
        },
        {
          id: "2",
          name: "Biopestisida Alami",
          price: 65000,
          quantity: 1,
          image: "/placeholder.svg?height=64&width=64&text=Biopestisida",
        },
        {
          id: "3",
          name: "Bibit Tomat Organik",
          price: 25000,
          quantity: 2,
          image: "/placeholder.svg?height=64&width=64&text=Bibit+Tomat",
        },
      ],
      timeline: [
        {
          status: "Pesanan Selesai",
          date: "2023-05-05",
          time: "14:30",
          description: "Pesanan telah diterima oleh pelanggan",
        },
        {
          status: "Pesanan Dikirim",
          date: "2023-05-03",
          time: "09:15",
          description: "Pesanan dalam perjalanan ke alamat pengiriman",
        },
        {
          status: "Pesanan Diproses",
          date: "2023-05-02",
          time: "11:45",
          description: "Pesanan sedang disiapkan untuk pengiriman",
        },
        {
          status: "Pembayaran Diterima",
          date: "2023-05-01",
          time: "15:20",
          description: "Pembayaran telah dikonfirmasi",
        },
      ],
    },
    {
      id: "2",
      orderNumber: "ORD-12346",
      date: "2023-05-10",
      status: "shipped",
      total: 250000,
      subtotal: 220000,
      shipping: 15000,
      tax: 15000,
      discount: 0,
      payment_method: "e_wallet",
      shipping_method: "regular",
      customer: {
        name: "Siti Rahayu",
        email: "siti@example.com",
      },
      shipping_address: {
        name: "Siti Rahayu",
        address: "Jl. Pahlawan No. 45",
        city: "Bandung",
        province: "Jawa Barat",
        postal_code: "40123",
        phone: "081234567891",
      },
      items: [
        {
          id: "5",
          name: "Kompos Organik",
          price: 45000,
          quantity: 3,
          image: "/placeholder.svg?height=64&width=64&text=Kompos",
        },
        {
          id: "6",
          name: "Pestisida Nabati",
          price: 55000,
          quantity: 1,
          image: "/placeholder.svg?height=64&width=64&text=Pestisida+Nabati",
        },
        {
          id: "7",
          name: "Bibit Cabai Rawit Organik",
          price: 20000,
          quantity: 2,
          image: "/placeholder.svg?height=64&width=64&text=Bibit+Cabai",
        },
      ],
      timeline: [
        {
          status: "Pesanan Dikirim",
          date: "2023-05-12",
          time: "10:30",
          description: "Pesanan dalam perjalanan ke alamat pengiriman",
        },
        {
          status: "Pesanan Diproses",
          date: "2023-05-11",
          time: "14:20",
          description: "Pesanan sedang disiapkan untuk pengiriman",
        },
        {
          status: "Pembayaran Diterima",
          date: "2023-05-10",
          time: "09:45",
          description: "Pembayaran telah dikonfirmasi",
        },
      ],
    },
    {
      id: "3",
      orderNumber: "ORD-12347",
      date: "2023-05-15",
      status: "processing",
      total: 450000,
      subtotal: 420000,
      shipping: 15000,
      tax: 15000,
      discount: 0,
      payment_method: "credit_card",
      shipping_method: "express",
      customer: {
        name: "Ahmad Hidayat",
        email: "ahmad@example.com",
      },
      shipping_address: {
        name: "Ahmad Hidayat",
        address: "Jl. Sudirman No. 78",
        city: "Surabaya",
        province: "Jawa Timur",
        postal_code: "60123",
        phone: "081234567892",
      },
      items: [
        {
          id: "4",
          name: "Alat Penyiram Otomatis",
          price: 350000,
          quantity: 1,
          image: "/placeholder.svg?height=64&width=64&text=Alat+Penyiram",
        },
        {
          id: "1",
          name: "Pupuk Organik Premium",
          price: 75000,
          quantity: 1,
          image: "/placeholder.svg?height=64&width=64&text=Pupuk+Organik",
        },
      ],
      timeline: [
        {
          status: "Pesanan Diproses",
          date: "2023-05-16",
          time: "11:30",
          description: "Pesanan sedang disiapkan untuk pengiriman",
        },
        {
          status: "Pembayaran Diterima",
          date: "2023-05-15",
          time: "14:20",
          description: "Pembayaran telah dikonfirmasi",
        },
      ],
    },
    {
      id: "4",
      orderNumber: "ORD-12348",
      date: "2023-05-20",
      status: "pending",
      total: 150000,
      subtotal: 120000,
      shipping: 15000,
      tax: 15000,
      discount: 0,
      payment_method: "bank_transfer",
      shipping_method: "regular",
      customer: {
        name: "Dewi Lestari",
        email: "dewi@example.com",
      },
      shipping_address: {
        name: "Dewi Lestari",
        address: "Jl. Gatot Subroto No. 12",
        city: "Semarang",
        province: "Jawa Tengah",
        postal_code: "50123",
        phone: "081234567893",
      },
      items: [
        {
          id: "6",
          name: "Pestisida Nabati",
          price: 55000,
          quantity: 1,
          image: "/placeholder.svg?height=64&width=64&text=Pestisida+Nabati",
        },
        {
          id: "7",
          name: "Bibit Cabai Rawit Organik",
          price: 20000,
          quantity: 2,
          image: "/placeholder.svg?height=64&width=64&text=Bibit+Cabai",
        },
        {
          id: "3",
          name: "Bibit Tomat Organik",
          price: 25000,
          quantity: 1,
          image: "/placeholder.svg?height=64&width=64&text=Bibit+Tomat",
        },
      ],
      timeline: [
        {
          status: "Menunggu Pembayaran",
          date: "2023-05-20",
          time: "15:45",
          description: "Pesanan telah dibuat, menunggu pembayaran",
        },
      ],
    },
    {
      id: "5",
      orderNumber: "ORD-12349",
      date: "2023-05-25",
      status: "cancelled",
      total: 75000,
      subtotal: 45000,
      shipping: 15000,
      tax: 15000,
      discount: 0,
      payment_method: "bank_transfer",
      shipping_method: "regular",
      customer: {
        name: "Joko Susilo",
        email: "joko@example.com",
      },
      shipping_address: {
        name: "Joko Susilo",
        address: "Jl. Ahmad Yani No. 56",
        city: "Yogyakarta",
        province: "DI Yogyakarta",
        postal_code: "55123",
        phone: "081234567894",
      },
      items: [
        {
          id: "5",
          name: "Kompos Organik",
          price: 45000,
          quantity: 1,
          image: "/placeholder.svg?height=64&width=64&text=Kompos",
        },
      ],
      timeline: [
        {
          status: "Pesanan Dibatalkan",
          date: "2023-05-26",
          time: "10:15",
          description: "Pesanan dibatalkan oleh pelanggan",
        },
        {
          status: "Menunggu Pembayaran",
          date: "2023-05-25",
          time: "14:30",
          description: "Pesanan telah dibuat, menunggu pembayaran",
        },
      ],
    },
  ]
}

// Fungsi untuk mendapatkan pesanan berdasarkan ID
export function getOrderById(id) {
  const orders = getOrderHistory()
  return orders.find((order) => order.id === id)
}
