"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Star, ShoppingCart, Plus, Check, Leaf } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAdding(true)

    // Simulate a small delay for the animation
    setTimeout(() => {
      addToCart(product, 1)
      toast({
        title: "Produk ditambahkan",
        description: `${product.name} telah ditambahkan ke keranjang.`,
      })
      setIsAdding(false)
    }, 500)
  }

  // Calculate discount percentage if not provided but originalPrice exists
  const discountPercentage =
    product.discount || (product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0)

  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 
      ${product.featured ? "ring-2 ring-green-500 shadow-lg shadow-green-100" : "border border-gray-200 hover:shadow-md"}`}
    >
      <Link href={`/products/${product.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">Lihat detail {product.name}</span>
      </Link>

      {/* Featured badge - top ribbon */}
      {product.featured && (
        <div className="absolute -right-12 top-7 z-20 rotate-45 bg-gradient-to-r from-green-600 to-green-500 text-white py-1 px-12 text-xs font-semibold shadow-md">
          UNGGULAN
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-105">
          <Image
            src={product.image || "/placeholder.svg?height=300&width=300&text=No+Image"}
            alt={product.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        </div>

        {/* Discount badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 z-20">
            <div className="bg-red-600 text-white text-xs font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
              <span>-{discountPercentage}%</span>
            </div>
          </div>
        )}

        {/* Quick add button - visible on hover */}
        <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            className={`rounded-full bg-white text-green-700 hover:bg-green-50 shadow-lg ${isAdding ? "scale-90" : "scale-100"} transition-all duration-200`}
            onClick={handleAddToCart}
          >
            {isAdding ? <Check className="h-4 w-4 mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
            <span className="text-xs font-medium">Keranjang</span>
          </Button>
        </div>

        {/* Certifications */}
        {product.certifications?.length > 0 && (
          <div className="absolute bottom-3 left-3 z-20 flex flex-wrap gap-1">
            {product.certifications?.slice(0, 2).map((cert) => (
              <Badge
                key={cert}
                variant="outline"
                className="bg-white/80 backdrop-blur-sm text-[10px] px-1.5 py-0.5 font-medium text-gray-700 flex items-center gap-1 border-green-100"
              >
                <ShieldCheck className="h-2.5 w-2.5 text-green-600" />
                {cert}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        {product.category && (
          <div className="mb-1">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Leaf className="h-3 w-3 text-green-500" />
              {product.category}
            </span>
          </div>
        )}

        {/* Product name */}
        <h3 className="font-medium text-gray-900 line-clamp-2 min-h-[2.5rem] group-hover:text-green-700 transition-colors">
          {product.name}
        </h3>

        {/* Ratings */}
        <div className="mt-2 flex items-center gap-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviewCount || 0})</span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-end justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-gray-900">Rp{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">Rp{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            {product.unit && <span className="text-xs text-gray-500">per {product.unit}</span>}
          </div>

          {/* Cart button */}
          <Button
            size="icon"
            variant="ghost"
            className="z-20 relative h-8 w-8 rounded-full bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Tambahkan ke keranjang</span>
          </Button>
        </div>
      </div>

      {/* Bottom accent for featured products */}
      {product.featured && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
      )}
    </div>
  )
}
