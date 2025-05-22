"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Truck, ShieldCheck, Leaf } from "lucide-react"
import { getProductById, getRelatedProducts } from "@/lib/data"
import ProductCard from "@/components/product-card"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"

export default function ProductPage({ params }) {
  const { id } = params
  const product = getProductById(id)
  const relatedProducts = getRelatedProducts(id)
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="container px-4 md:px-6 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h1>
        <p className="mb-6">Produk yang Anda cari tidak tersedia atau telah dihapus.</p>
        <Button asChild>
          <a href="/products">Kembali ke Daftar Produk</a>
        </Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast({
      title: "Produk ditambahkan ke keranjang",
      description: `${quantity} x ${product.name} telah ditambahkan ke keranjang belanja Anda.`,
    })
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <main className="flex-1 py-8">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border">
              <Image
                src={product.image || "/placeholder.svg?height=600&width=600"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-md border cursor-pointer">
                  <Image
                    src={`/placeholder.svg?height=150&width=150&text=Image ${i}`}
                    alt={`Product image ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} ulasan)
                </span>
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="text-3xl font-bold">Rp{product.price.toLocaleString()}</div>
              {product.originalPrice && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground line-through">
                    Rp{product.originalPrice.toLocaleString()}
                  </span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Hemat {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </Badge>
                </div>
              )}
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2">
              {product.certifications.map((cert) => (
                <Badge key={cert} variant="secondary" className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {cert}
                </Badge>
              ))}
            </div>

            {/* Quality Rating */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <h3 className="font-semibold flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                Rating Kualitas
              </h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Kandungan Organik</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: `${product.qualityRatings.organic}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{product.qualityRatings.organic}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Efektivitas</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: `${product.qualityRatings.effectiveness}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{product.qualityRatings.effectiveness}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Keamanan</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: `${product.qualityRatings.safety}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{product.qualityRatings.safety}%</span>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                  -
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={increaseQuantity}>
                  +
                </Button>
              </div>
              <Button className="flex-1" onClick={handleAddToCart}>
                Tambahkan ke Keranjang
              </Button>
            </div>

            {/* Shipping Info */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="h-4 w-4" />
              <span>Pengiriman ke seluruh Indonesia</span>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Deskripsi</TabsTrigger>
            <TabsTrigger value="specifications">Spesifikasi</TabsTrigger>
            <TabsTrigger value="reviews">Ulasan</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="p-4 border rounded-md mt-2">
            <div className="prose max-w-none">
              <h3>Tentang Produk</h3>
              <p>{product.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies
                lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies
                lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Nulla facilisi.
              </p>
              <h3>Manfaat</h3>
              <ul>
                <li>Ramah lingkungan dan aman bagi ekosistem</li>
                <li>Meningkatkan kesuburan tanah secara alami</li>
                <li>Bebas dari bahan kimia berbahaya</li>
                <li>Hasil panen lebih sehat dan berkualitas</li>
              </ul>
              <h3>Cara Penggunaan</h3>
              <p>
                Ikuti petunjuk penggunaan yang tertera pada kemasan. Untuk hasil optimal, gunakan secara rutin sesuai
                dengan jadwal yang direkomendasikan.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="p-4 border rounded-md mt-2">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Informasi Produk</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-muted-foreground">Berat</span>
                    <span>{product.weight} kg</span>
                    <span className="text-muted-foreground">Dimensi</span>
                    <span>{product.dimensions}</span>
                    <span className="text-muted-foreground">Produsen</span>
                    <span>{product.manufacturer}</span>
                    <span className="text-muted-foreground">Tanggal Produksi</span>
                    <span>{product.productionDate}</span>
                    <span className="text-muted-foreground">Masa Simpan</span>
                    <span>{product.shelfLife}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Komposisi</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {product.ingredients?.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Sertifikasi</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {product.certifications.map((cert) => (
                    <div key={cert} className="p-3 border rounded-md text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                        <ShieldCheck className="h-6 w-6 text-green-600" />
                      </div>
                      <span className="text-sm font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="p-4 border rounded-md mt-2">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{product.rating}</div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{product.reviewCount} ulasan</div>
                </div>
                <div className="flex-1 space-y-1">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const percentage = Math.round(
                      ((product.ratingDistribution?.[star] || 0) / product.reviewCount) * 100,
                    )
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-sm w-6">{star}</span>
                        <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${percentage}%` }}></div>
                        </div>
                        <span className="text-sm w-8">{percentage}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Review List */}
              <div className="space-y-4">
                {product.reviews?.map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          {review.author.charAt(0)}
                        </div>
                        <span className="font-medium">{review.author}</span>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">{review.date}</div>
                    <p className="mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Produk Terkait</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
