import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Shield, Award } from "lucide-react"
import { Sprout } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-[#030f05] to-[#063c11] overflow-hidden">

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-green-500 blur-[150px] opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-yellow-500 blur-[150px] opacity-10"></div>
      </div>


      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          <div className="w-full lg:w-1/2 text-white space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-green-900/40 border border-green-500/30 rounded-full">
              <span className="mr-2 text-green-400">
                <Leaf className="w-4 h-4" />
              </span>
              <span className="text-sm font-medium text-green-200 tracking-wide uppercase">
                We Are Producing Natural Product
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-white">Produk AgroOrganik</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-300">&</span>
              <br />
              <span className="text-white">Biopestisida Berkualitas</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed">
              Temukan produk agroorganik dan biopestisida lokal terbaik dengan sertifikasi dan rating kualitas dari
              lembaga terpercaya untuk hasil pertanian yang lebih sehat dan berkelanjutan.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 bg-green-900/30 px-3 py-1.5 rounded-full border border-green-700/30">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-200">100% Organik</span>
              </div>
              <div className="flex items-center gap-2 bg-green-900/30 px-3 py-1.5 rounded-full border border-green-700/30">
                <Award className="w-4 h-4 text-yellow-300" />
                <span className="text-sm text-green-200">Tersertifikasi</span>
              </div>
              <div className="flex items-center gap-2 bg-green-900/30 px-3 py-1.5 rounded-full border border-green-700/30">
                <Leaf className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-200">Ramah Lingkungan</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-semibold rounded-full px-8 py-6 text-base shadow-lg shadow-green-900/30 border border-green-500/20"
              >
                <Link href="/products" className="flex items-center gap-2">
                  Jelajahi Product <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="border border-yellow-500/30 text-yellow-200 bg-yellow-900/10 hover:bg-yellow-600/20 hover:text-yellow-100 font-semibold rounded-full px-8 py-6 transition-colors duration-300"
              >
                <Link href="/about" className="flex items-center gap-2">
                  Pelajari Lebih Lanjut <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-square max-w-[500px] mx-auto">
              {/* Main product image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[100%] h-[100%] rounded-full bg-gradient-to-b from-green-500/20 to-green-800/20 border border-green-500/10 flex items-center justify-center shadow-2xl">
                  <Image
                    src="/main-image.png"
                    alt="Produk AgroOrganik"
                    width={400}
                    height={400}
                    className="object-contain p-8"
                  />
                </div>
              </div>

<div className="absolute top-0 left-0 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-xl transform -translate-x-1/4 -translate-y-1/4 w-32 h-32 flex flex-col items-center justify-center">
  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
    <Sprout className="w-8 h-8 text-green-600" />
  </div>
  <span className="text-xs text-white font-medium">Biopestisida</span>
</div>

<div className="absolute bottom-0 right-0 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-xl transform translate-x-1/4 translate-y-1/4 w-32 h-32 flex flex-col items-center justify-center">
  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
    <Leaf className="w-8 h-8 text-yellow-600" />
  </div>
  <span className="text-xs text-white font-medium">AgroOrganik</span>
</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
