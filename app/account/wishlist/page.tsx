"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Star, Search, ShoppingCart, Trash2, Heart } from "lucide-react"
import { useWishlist } from "@/components/wishlist-provider"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import AccountLayout from "@/components/account-layout"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredWishlist = wishlist.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddToCart = (product) => {
    addToCart(product, 1)
    toast({
      title: "Produk ditambahkan",
      description: `${product.name} telah ditambahkan ke keranjang.`,
    })
  }

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId)
    toast({
      title: "Produk dihapus",
      description: "Produk telah dihapus dari wishlist Anda.",
    })
  }

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Wishlist Saya</h1>
          <p className="text-muted-foreground">Produk yang Anda simpan untuk dibeli nanti</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari produk..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {wishlist.length > 0 && (
            <Button variant="outline" onClick={clearWishlist}>
              Kosongkan Wishlist
            </Button>
          )}
        </div>

        {filteredWishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWishlist.map((product) => (
              <div
                key={product.id}
                className="group relative border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href={`/products/${product.id}`} className="absolute inset-0 z-10">
                  <span className="sr-only">Lihat detail {product.name}</span>
                </Link>

                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={product.image || "/placeholder.svg?height=300&width=300"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />

                  {product.featured && <Badge className="absolute top-2 left-2 bg-green-600">Unggulan</Badge>}

                  {product.discount && (
                    <Badge className="absolute top-2 right-2 bg-red-600">-{product.discount}%</Badge>
                  )}

                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute bottom-2 right-2 z-20"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleRemoveFromWishlist(product.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
                  </div>

                  <h3 className="font-medium line-clamp-1">{product.name}</h3>

                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Rp{product.price.toLocaleString()}</div>
                      {product.originalPrice && (
                        <div className="text-xs text-muted-foreground line-through">
                          Rp{product.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="z-20 relative"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleAddToCart(product)
                      }}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span className="sr-only">Tambahkan ke keranjang</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Wishlist Anda kosong</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm
                ? "Tidak ada produk yang cocok dengan pencarian Anda"
                : "Simpan produk favorit Anda untuk dibeli nanti"}
            </p>
            <Button asChild>
              <Link href="/products">Jelajahi Produk</Link>
            </Button>
          </div>
        )}
      </div>
    </AccountLayout>
  )
}
