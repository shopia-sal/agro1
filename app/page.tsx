import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import WhyChooseUs from "@/components/why-choose-us"
import CategorySection from "@/components/category-section"
import HeroSection from "@/components/hero-section"
import { getFeaturedProducts, getCategories } from "@/lib/data"
import { Leaf, Star, ChevronRight, Shield, Award, CheckCircle, BadgeCheck } from "lucide-react" 

export default function Home() {
  const featuredProducts = getFeaturedProducts()
  const categories = getCategories()

  return (
    <main className="flex-1">
      <HeroSection />

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
              <Leaf className="w-4 h-4 mr-2" />
              Kategori Produk
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Temukan Produk <span className="text-green-600">Sesuai Kebutuhan</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl">
              Kami menyediakan berbagai kategori produk organik berkualitas untuk kebutuhan pertanian Anda
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {categories.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium mb-4">
                <Star className="w-4 h-4 mr-2 fill-yellow-500 text-yellow-500" />
                Produk Unggulan
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Produk <span className="text-green-600">Terbaik Kami</span>
              </h2>
              <p className="mt-2 text-gray-600 max-w-2xl">
                Produk pilihan dengan kualitas terbaik dan sertifikasi lengkap
              </p>
            </div>
            <Link
              href="/products"
              className="mt-4 md:mt-0 group inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors"
            >
              Lihat Semua Produk
              <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

{/* Certification Partners - Redesigned */}
      <section className="relative py-24 overflow-hidden">
        {/* Background with multiple layers */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a2e0a] via-[#164b15] to-[#2f7f3b]"></div>

          {/* Decorative patterns */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>

          {/* Light effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full filter blur-[150px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400 rounded-full filter blur-[150px] opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>

          {/* Horizontal accent lines */}
          <div className="absolute top-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
          <div className="absolute bottom-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
        </div>

        <div className="relative container px-4 md:px-6 z-10">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-900/50 backdrop-blur-sm rounded-full border border-green-500/30 text-green-300 text-sm font-medium mb-6">
              <BadgeCheck className="w-4 h-4" />
              <span>Kualitas Terjamin</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Lembaga Sertifikasi <span className="text-green-300">Terpercaya</span>
            </h2>

            <p className="text-green-100/80 text-lg max-w-2xl mx-auto">
              Produk kami telah mendapatkan sertifikasi dari lembaga-lembaga terkemuka yang menjamin kualitas dan
              keamanan
            </p>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
            {[
              { icon: <Shield className="w-5 h-5" />, text: "Produk Tersertifikasi" },
              { icon: <Award className="w-5 h-5" />, text: "Standar Kualitas Tinggi" },
              { icon: <CheckCircle className="w-5 h-5" />, text: "Teruji Laboratorium" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white"
              >
                {item.icon}
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Certification logos - Hexagon layout */}
          <div className="relative max-w-4xl mx-auto">
            {/* Center hexagon */}
            <div className="relative mx-auto w-48 h-48 mb-8 md:mb-0 md:absolute md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 z-20">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800 rounded-full opacity-20"></div>
              <div className="absolute inset-2 bg-white/95 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center p-4 border border-green-200/30">
                <div className="text-center">
                  <div className="text-green-700 font-bold text-lg mb-1">100%</div>
                  <div className="text-green-800 font-medium text-sm">Produk Organik</div>
                  <div className="text-green-600 text-xs mt-2">Tersertifikasi</div>
                </div>
              </div>
            </div>

            {/* Surrounding certification logos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { src: "/certification/logo-organik.png", alt: "Organik Indonesia", desc: "Sertifikasi Organik" },
                { src: "/certification/logo-sucofindo.png", alt: "Sucofindo", desc: "Pengujian Kualitas" },
                { src: "/certification/logo-bpom.png", alt: "BPOM", desc: "Keamanan Produk" },
                {
                  src: "/certification/logo-pertanian.png",
                  alt: "Kementerian Pertanian",
                  desc: "Standar Pertanian",
                },
              ].map((cert, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="group relative bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 w-full aspect-square flex items-center justify-center transition-all duration-500 hover:shadow-2xl hover:shadow-green-900/20 overflow-hidden border border-green-200/30">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-100/40 to-green-200/20 rounded-full transform translate-x-1/3 -translate-y-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <img
                      src={cert.src || "/placeholder.svg?height=100&width=200"}
                      alt={cert.alt}
                      className="max-h-[70%] max-w-[70%] object-contain grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full"></div>

                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                      <BadgeCheck className="w-3 h-3" />
                      <span>{cert.desc}</span>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <h3 className="text-green-200 font-medium text-sm">{cert.alt}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-green-200/80 text-sm max-w-2xl mx-auto mb-6">
              Kami berkomitmen untuk menyediakan produk organik berkualitas tinggi yang telah melalui proses sertifikasi
              ketat
            </p>
          </div>

          <div className="absolute -left-24 top-1/4 w-48 h-48 border border-green-500/20 rounded-full"></div>
          <div className="absolute -right-12 bottom-1/4 w-24 h-24 border border-green-500/20 rounded-full"></div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-[#f0fdf4] via-[#e3fcec] to-[#d2f5e3]">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-extrabold text-center mb-12 text-[#14532d] tracking-tight">
            Mengapa Memilih AgroOrganik?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Produk Tersertifikasi",
                desc: "Semua produk telah melalui proses sertifikasi ketat dari lembaga terpercaya.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Kualitas Terjamin",
                desc: "Rating kualitas transparan dari lembaga independen untuk setiap produk.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                ),
              },
              {
                title: "Produk Lokal Berkualitas",
                desc: "Mendukung petani dan produsen lokal dengan produk unggulan.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                ),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group bg-white border border-green-100 rounded-2xl shadow-md p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-l font-bold text-[#166534] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* why choose us */}
      <WhyChooseUs/>
    </main>
  )
}
