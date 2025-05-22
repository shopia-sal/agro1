import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
  Leaf,
  ArrowRight,
  ChevronRight,
} from "lucide-react"

export default function Footer() {
  return (
    <>
      {/* Top Navigation Bar */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 px-4">
        <div className="container mx-auto">
          <ul className="flex flex-wrap justify-center md:justify-between gap-6 font-medium text-sm">
            <li>
              <Link href="#" className="flex items-center gap-1.5 hover:underline transition-all">
                <span className="bg-green-800 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  1
                </span>
                Produk unggulan
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-1.5 hover:underline transition-all">
                <span className="bg-green-800 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  2
                </span>
                Sertifikasi Organik
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-1.5 hover:underline transition-all">
                <span className="bg-green-800 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  3
                </span>
                Rating & Ulasan
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-1.5 hover:underline transition-all">
                <span className="bg-green-800 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  4
                </span>
                Kemitraan Petani
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Pre-Footer CTA */}
      <div className="bg-gradient-to-b from-green-900 to-[#001800] py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-r from-green-800 to-green-700 rounded-xl p-6 md:p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white">Bergabung dengan Komunitas Organik</h3>
                <p className="text-gray-200">
                  Dapatkan update terbaru, tips bertani organik, dan penawaran khusus langsung ke email Anda.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Masukkan email Anda"
                  type="email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 h-12 rounded-lg"
                />
                <Button className="h-12 px-6 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg">
                  Berlangganan <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-[#001800] bg-[url('/placeholder.svg?height=200&width=200')] bg-opacity-95 bg-blend-overlay text-white">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {/* Column 1: Brand & Description */}
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-green-700 to-green-600 p-2 rounded-lg">
                  <Leaf className="h-6 w-6 text-yellow-400" />
                </div>
                <span className="text-2xl font-bold text-white">AgroOrganik</span>
              </Link>
              <p className="text-gray-300 leading-relaxed">
                Marketplace khusus produk agroorganik dan biopestisida lokal dengan sertifikasi dan rating kualitas dari
                lembaga terpercaya.
              </p>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Youtube, label: "Youtube" },
                ].map((social, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="h-10 w-10 rounded-full bg-gradient-to-br from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <social.icon className="h-5 w-5 text-white" />
                    <span className="sr-only">{social.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Categories */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white relative pl-4 border-l-4 border-yellow-400">Kategori</h3>
              <ul className="space-y-3 text-gray-300">
                {[
                  { name: "Pupuk Organik", href: "/products?category=pupuk_organik" },
                  { name: "Biopestisida", href: "/products?category=biopestisida" },
                  { name: "Bibit Organik", href: "/products?category=bibit_organik" },
                  { name: "Alat Pertanian", href: "/products?category=alat_pertanian" },
                  { name: "Produk Olahan", href: "/products?category=produk_olahan" },
                ].map((category, i) => (
                  <li key={i}>
                    <Link
                      href={category.href}
                      className="flex items-center group hover:text-yellow-400 transition-colors duration-300"
                    >
                      <ChevronRight className="h-4 w-4 mr-2 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white relative pl-4 border-l-4 border-yellow-400">Informasi</h3>
              <ul className="space-y-3 text-gray-300">
                {[
                  { name: "Tentang Kami", href: "/about" },
                  { name: "Hubungi Kami", href: "/contact" },
                  { name: "FAQ", href: "/faq" },
                  { name: "Syarat & Ketentuan", href: "/terms" },
                  { name: "Kebijakan Privasi", href: "/privacy" },
                ].map((info, i) => (
                  <li key={i}>
                    <Link
                      href={info.href}
                      className="flex items-center group hover:text-yellow-400 transition-colors duration-300"
                    >
                      <ChevronRight className="h-4 w-4 mr-2 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {info.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Newsletter */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white relative pl-4 border-l-4 border-yellow-400">
                Hubungi Kami
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3 group">
                  <div className="bg-green-800 p-2 rounded-lg mt-0.5 group-hover:bg-yellow-400 transition-colors duration-300">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <span className="leading-tight">Jl. Agro Organik No. 123, Bogor, Jawa Barat, Indonesia</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="bg-green-800 p-2 rounded-lg group-hover:bg-yellow-400 transition-colors duration-300">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <span>+62 812 3456 7890</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="bg-green-800 p-2 rounded-lg group-hover:bg-yellow-400 transition-colors duration-300">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <span>info@agroorganik.com</span>
                </li>
              </ul>

              <div className="space-y-3 pt-2">
                <h4 className="font-medium text-white">Berlangganan Newsletter</h4>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Email Anda"
                      type="email"
                      className="bg-green-800/50 border-green-700 text-white placeholder:text-gray-400 pr-10 rounded-lg"
                    />
                    <Button
                      className="absolute right-0 top-0 h-full aspect-square rounded-r-lg bg-yellow-400 hover:bg-yellow-500 text-black"
                      aria-label="Subscribe"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-12 pt-8 border-t border-green-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} AgroOrganik. Hak Cipta Dilindungi.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/terms" className="hover:text-white transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">
                Peta Situs
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
