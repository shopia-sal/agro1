"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  CreditCard,
  Clock,
  Leaf,
  ChevronLeft,
  Plus,
  Minus,
  RefreshCw,
  CheckCircle,
  Lock,
} from "lucide-react"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const { toast } = useToast()
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 500000 ? 0 : subtotal > 0 ? 15000 : 0
  const discount = 0 // Will be calculated based on coupon code
  const total = subtotal + shipping - discount

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  const handleRemove = (productId) => {
    removeFromCart(productId)
    toast({
      title: "Produk dihapus",
      description: "Produk telah dihapus dari keranjang belanja Anda.",
    })
  }

  const applyCoupon = () => {
    if (!couponCode) return

    setIsApplyingCoupon(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Kode kupon tidak valid",
        description: "Kode kupon yang Anda masukkan tidak valid atau telah kadaluarsa.",
        variant: "destructive",
      })
      setIsApplyingCoupon(false)
    }, 1000)

    // If coupon is valid, would update discount state here
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Keranjang kosong",
        description: "Tambahkan produk ke keranjang sebelum melanjutkan ke pembayaran.",
        variant: "destructive",
      })
      return
    }

    // Gunakan router untuk navigasi
    window.location.href = "/checkout"
  }

  return (
    <main className="flex-1 bg-gradient-to-b from-green-50/50 to-white">
      <div className="container px-4 md:px-6 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Keranjang Belanja</h1>
            <p className="text-gray-500 mt-2">
              {cart.length > 0 ? `${cart.length} produk dalam keranjang Anda` : "Keranjang belanja Anda kosong"}
            </p>
          </div>
          <Link
            href="/products"
            className="mt-4 md:mt-0 inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Lanjutkan Belanja
          </Link>
        </div>

        {cart.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items */}
              <Card className="overflow-hidden border-0 shadow-md">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white">
                    <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium">
                      <div className="col-span-6 md:col-span-7">Produk</div>
                      <div className="col-span-2 text-center">Harga</div>
                      <div className="col-span-2 text-center">Jumlah</div>
                      <div className="col-span-2 md:col-span-1 text-right">Aksi</div>
                    </div>
                  </div>

                  <div className="divide-y">
                    {cart.map((item) => (
                      <div key={item.id} className="px-6 py-6 grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6 md:col-span-7 flex items-center gap-4">
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 bg-white">
                            <Image
                              src={item.image || "/placeholder.svg?height=80&width=80"}
                              alt={item.name}
                              fill
                              className="object-cover p-1"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 hover:text-green-600 transition-colors">
                              <Link href={`/products/${item.id}`} className="hover:underline">
                                {item.name}
                              </Link>
                            </h3>
                            <div className="text-sm text-gray-500 mt-1">{item.unit && <span>{item.unit}</span>}</div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.certifications?.slice(0, 2).map((cert) => (
                                <Badge
                                  key={cert}
                                  variant="outline"
                                  className="bg-green-50 text-green-700 border-green-200 text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1"
                                >
                                  <ShieldCheck className="h-3 w-3" />
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="col-span-2 text-center font-medium text-gray-900">
                          Rp{item.price.toLocaleString()}
                        </div>

                        <div className="col-span-2 flex justify-center">
                          <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="col-span-2 md:col-span-1 flex justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleRemove(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommended Products */}
              <Card className="border-0 shadow-md overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Rekomendasi untuk Anda</h3>
                    <Link href="/products" className="text-green-600 hover:text-green-700 text-sm font-medium">
                      Lihat Semua
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="group">
                        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-2">
                          <Image
                            src={`/placeholder.svg?height=200&width=200&text=Produk+${i}`}
                            alt={`Produk Rekomendasi ${i}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Button
                              size="sm"
                              className="bg-white text-green-700 hover:bg-green-50 rounded-full text-xs px-3"
                            >
                              + Tambah
                            </Button>
                          </div>
                        </div>
                        <h4 className="font-medium text-sm text-gray-900 line-clamp-1">Produk Organik {i}</h4>
                        <p className="text-green-600 text-sm font-medium mt-1">Rp120.000</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-full"
                  onClick={clearCart}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Kosongkan Keranjang
                </Button>
                <div className="text-sm text-gray-500">Harga belum termasuk pajak (jika berlaku)</div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="border-0 shadow-md overflow-hidden">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Ringkasan Pesanan</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-900">Rp{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pengiriman</span>
                      <span className="font-medium text-gray-900">
                        {shipping > 0 ? `Rp${shipping.toLocaleString()}` : "Gratis"}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Diskon</span>
                        <span className="font-medium">-Rp{discount.toLocaleString()}</span>
                      </div>
                    )}
                    <Separator className="my-2" />
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-bold text-xl text-gray-900">Rp{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Masukkan kode kupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="rounded-full border-gray-300 focus:border-green-500 focus:ring-green-500"
                      />
                      <Button
                        variant="outline"
                        className="rounded-full border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                        onClick={applyCoupon}
                        disabled={isApplyingCoupon}
                      >
                        {isApplyingCoupon ? "Memeriksa..." : "Terapkan"}
                      </Button>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full h-12 text-base shadow-md"
                      onClick={handleCheckout}
                    >
                      Lanjutkan ke Pembayaran
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ShieldCheck className="h-4 w-4 text-green-600" />
                      <span>Transaksi aman & terenkripsi</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Truck className="h-4 w-4 text-green-600" />
                      <span>Pengiriman cepat ke seluruh Indonesia</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Leaf className="h-4 w-4 text-green-600" />
                      <span>100% produk organik tersertifikasi</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card className="border-0 shadow-md overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Metode Pembayaran</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {["VISA", "MC", "BCA", "BNI", "BRI", "MANDIRI", "OVO", "GOPAY", "DANA", "QRIS"].map((method) => (
                      <div
                        key={method}
                        className="border border-gray-200 rounded-lg p-2 h-12 flex items-center justify-center bg-white hover:border-green-500 hover:shadow-sm transition-all cursor-pointer"
                      >
                        <span className="text-xs font-medium text-gray-700">{method}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Lock className="h-3 w-3" />
                    <span>Pembayaran aman dengan enkripsi SSL</span>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Info */}
              <Card className="border-0 shadow-md overflow-hidden bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      <Truck className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Informasi Pengiriman</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Estimasi pengiriman 2-5 hari kerja tergantung lokasi Anda.
                      </p>
                      <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                        <CheckCircle className="h-4 w-4" />
                        <span>Gratis ongkir untuk pembelian di atas Rp500.000</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="border-0 shadow-md overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <ShoppingBag className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Belanja Kosong</h2>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  Anda belum menambahkan produk ke keranjang belanja. Jelajahi produk-produk berkualitas kami dan
                  temukan yang sesuai dengan kebutuhan Anda.
                </p>
                <div className="space-y-4">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full px-8 py-6 shadow-md"
                  >
                    <Link href="/products">
                      Jelajahi Produk
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <div className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Produk Organik Berkualitas</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Tersertifikasi Resmi</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Pengiriman Cepat</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Trust Badges */}
        {cart.length > 0 && (
          <div className="mt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                {
                  icon: ShieldCheck,
                  title: "Produk Tersertifikasi",
                  description: "Semua produk telah melalui proses sertifikasi ketat",
                },
                {
                  icon: Truck,
                  title: "Pengiriman Cepat",
                  description: "Dikirim langsung dari petani ke rumah Anda",
                },
                {
                  icon: CreditCard,
                  title: "Pembayaran Aman",
                  description: "Berbagai metode pembayaran yang aman",
                },
                {
                  icon: Clock,
                  title: "Layanan Pelanggan",
                  description: "Dukungan pelanggan 7 hari seminggu",
                },
              ].map((item, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <item.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
