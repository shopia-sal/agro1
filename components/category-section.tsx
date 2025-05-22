import Link from "next/link"
import Image from "next/image"
import { Leaf, Bug, Sprout, Wrench, ChevronRight } from "lucide-react"

function getCategoryIcon(categoryId: string) {
  switch (categoryId) {
    case "pupuk_organik":
      return <Leaf className="w-6 h-6" />
    case "biopestisida":
      return <Bug className="w-6 h-6" />
    case "bibit_organik":
      return <Sprout className="w-6 h-6" />
    case "alat_pertanian":
      return <Wrench className="w-6 h-6" />
    default:
      return <Leaf className="w-6 h-6" />
  }
}

function getCategoryColor(categoryId: string) {
  switch (categoryId) {
    case "pupuk_organik":
      return "from-green-500 to-emerald-600"
    case "biopestisida":
      return "from-red-500 to-rose-600"
    case "bibit_organik":
      return "from-emerald-500 to-teal-600"
    case "alat_pertanian":
      return "from-yellow-500 to-amber-600"
    default:
      return "from-green-500 to-emerald-600"
  }
}

export default function CategorySection({ category }) {
  const iconColor = getCategoryColor(category.id)

  return (
    <Link
      href={`/products?category=${category.id}`}
      className="group relative flex flex-col h-full rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-500"
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full opacity-70"></div>

      {/* Image container */}
      <div className="relative w-full aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500 z-10"></div>
        <Image
          src={category.image || `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(category.name)}`}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-20">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-green-100 group-hover:bg-white transition-all duration-300`}
          >
            <span className={`text-xs font-medium text-green-800`}>{category.name}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-5 flex-1 flex flex-col">
        {/* Icon */}
        <div
          className={`absolute -top-8 right-4 w-16 h-16 rounded-full bg-gradient-to-br ${iconColor} flex items-center justify-center shadow-lg border-4 border-white group-hover:scale-110 transition-transform duration-300`}
        >
          <div className="text-white">{getCategoryIcon(category.id)}</div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2 group-hover:text-green-700 transition-colors">
          {category.name}
        </h3>

        <p className="text-sm text-gray-500 mb-4 flex-grow">
          Produk {category.name} berkualitas tinggi dengan sertifikasi organik
        </p>

        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm font-medium text-green-600">Lihat semua produk</span>
          <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
