"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import {
  CheckCircle,
  ChevronLeft,
  CreditCard,
  Truck,
  MapPin,
  Phone,
  Mail,
  User,
  Home,
  Clock,
  ShieldCheck,
  Lock,
  AlertCircle,
  Copy,
  Download,
  Share2,
  ArrowRight,
  Wallet,
  CreditCardIcon,
  Banknote,
  Package,
} from "lucide-react"

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()
  const [orderComplete, setOrderComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [orderNumber, setOrderNumber] = useState("AGO12345")

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 500000 ? 0 : subtotal > 0 ? 15000 : 0
  const tax = Math.round(subtotal * 0.11) // 11% tax
  const total = subtotal + shipping + tax

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    postalCode: user?.postalCode || "",
    province: user?.province || "",
    notes: "",
    paymentMethod: "bank_transfer",
    shippingMethod: "regular",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (cart.length === 0) {
      toast({
        title: "Keranjang kosong",
        description: "Tambahkan produk ke keranjang sebelum melanjutkan ke pembayaran.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Validate form
    const requiredFields = ["fullName", "email", "phone", "address", "city", "postalCode", "province"]
    const emptyFields = requiredFields.filter((field) => !formData[field])

    if (emptyFields.length > 0) {
      toast({
        title: "Form belum lengkap",
        description: "Harap lengkapi semua field yang diperlukan.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Process order
    try {
      // Simulate API call
      setTimeout(() => {
        setOrderComplete(true)
        clearCart()
        setIsLoading(false)
        // Generate random order number
        setOrderNumber(`AGO${Math.floor(10000 + Math.random() * 90000)}`)
      }, 1500)
    } catch (error) {
      console.error("Error processing order:", error)
      toast({
        title: "Terjadi kesalahan",
        description: "Gagal memproses pesanan. Silakan coba lagi.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // Redirect to cart if cart is empty
  if (cart.length === 0 && !orderComplete) {
    return (
      <main className="flex-1 bg-gradient-to-b from-green-50/50 to-white py-16">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <Card className="border-0 shadow-md overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Package className="h-12 w-12 text-green-600" />
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
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  if (orderComplete) {
    return (
      <main className="flex-1 bg-gradient-to-b from-green-50/50 to-white py-16">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <Card className="border-0 shadow-md overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col items-center justify-center text-center mb-10">
                <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Pesanan Berhasil!</h1>
                <p className="text-gray-600 max-w-md mx-auto">
                  Terima kasih telah berbelanja di AgroOrganik. Pesanan Anda telah berhasil diproses dan sedang
                  disiapkan untuk pengiriman.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-green-700 font-medium">Nomor Pesanan</p>
                  <h2 className="text-2xl font-bold text-green-800">#{orderNumber}</h2>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-green-300 text-green-700 hover:bg-green-100"
                    onClick={() => {
                      navigator.clipboard.writeText(orderNumber)
                      toast({
                        title: "Nomor pesanan disalin",
                        description: "Nomor pesanan telah disalin ke clipboard.",
                      })
                    }}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Salin
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-green-300 text-green-700 hover:bg-green-100"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Invoice
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-green-300 text-green-700 hover:bg-green-100"
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Bagikan
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="border border-gray-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <MapPin className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-lg">Detail Pengiriman</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Nama</span>
                        <span className="font-medium text-gray-900">{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Alamat</span>
                        <span className="font-medium text-gray-900 text-right">{formData.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Kota</span>
                        <span className="font-medium text-gray-900">{formData.city}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Provinsi</span>
                        <span className="font-medium text-gray-900">
                          {formData.province.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Kode Pos</span>
                        <span className="font-medium text-gray-900">{formData.postalCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Telepon</span>
                        <span className="font-medium text-gray-900">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Metode Pengiriman</span>
                        <span className="font-medium text-gray-900 capitalize">
                          {formData.shippingMethod.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CreditCard className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-lg">Metode Pembayaran</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Metode</span>
                        <span className="font-medium text-gray-900 capitalize">
                          {formData.paymentMethod.replace("_", " ")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status</span>
                        <span className="font-medium text-yellow-600">Menunggu Pembayaran</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
                      <h4 className="font-medium text-yellow-800 mb-2 flex items-center gap-1.5">
                        <AlertCircle className="h-4 w-4" />
                        Instruksi Pembayaran
                      </h4>
                      <div className="space-y-3 text-sm text-yellow-700">
                        <p>
                          Silakan transfer ke rekening berikut sebesar{" "}
                          <span className="font-semibold">Rp{total.toLocaleString()}</span> dalam 24 jam:
                        </p>
                        <div className="bg-white p-3 rounded-lg border border-yellow-200">
                          <div className="flex justify-between mb-1">
                            <span>Bank</span>
                            <span className="font-medium">BCA</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span>No. Rekening</span>
                            <span className="font-medium">1234567890</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Atas Nama</span>
                            <span className="font-medium">PT AgroOrganik Indonesia</span>
                          </div>
                        </div>
                        <p className="text-xs">
                          Setelah melakukan pembayaran, pesanan Anda akan diproses dalam 1x24 jam.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-8">
                <div className="bg-gray-50 px-6 py-4">
                  <h3 className="font-semibold">Ringkasan Pesanan</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {[1, 2].map((item) => (
                      <div key={item} className="flex gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                          <Image
                            src={`/placeholder.svg?height=64&width=64&text=Produk+${item}`}
                            alt={`Produk ${item}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Produk Organik {item}</h4>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-sm text-gray-500">2 x Rp120.000</span>
                            <span className="font-medium">Rp240.000</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Subtotal</span>
                      <span>Rp480.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Pengiriman</span>
                      <span>Rp15.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Pajak (11%)</span>
                      <span>Rp52.800</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>Rp547.800</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                >
                  <Link href="/account/orders">
                    <Package className="mr-2 h-4 w-4" />
                    Lihat Pesanan Saya
                  </Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full shadow-md"
                >
                  <Link href="/products">
                    Lanjutkan Belanja
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 bg-gradient-to-b from-green-50/50 to-white py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Checkout</h1>
            <p className="text-gray-500 mt-2">Selesaikan pesanan Anda dengan mengisi informasi di bawah ini</p>
          </div>
          <Link
            href="/cart"
            className="mt-4 md:mt-0 inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Kembali ke Keranjang
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <Card className="border-0 shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white flex items-center gap-3">
                    <MapPin className="h-5 w-5" />
                    <h2 className="text-lg font-semibold">Informasi Pengiriman</h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-gray-700">
                          Nama Lengkap <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="pl-10 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700">
                          Nomor Telepon <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pl-10 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address" className="text-gray-700">
                          Alamat <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="pl-10 rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="province" className="text-gray-700">
                          Provinsi <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.province}
                          onValueChange={(value) => handleSelectChange("province", value)}
                        >
                          <SelectTrigger
                            id="province"
                            className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                          >
                            <SelectValue placeholder="Pilih provinsi" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="jawa_barat">Jawa Barat</SelectItem>
                            <SelectItem value="jawa_tengah">Jawa Tengah</SelectItem>
                            <SelectItem value="jawa_timur">Jawa Timur</SelectItem>
                            <SelectItem value="dki_jakarta">DKI Jakarta</SelectItem>
                            <SelectItem value="banten">Banten</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-gray-700">
                          Kota/Kabupaten <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postalCode" className="text-gray-700">
                          Kode Pos <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                          required
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="notes" className="text-gray-700">
                          Catatan (opsional)
                        </Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          placeholder="Instruksi khusus untuk pengiriman"
                          value={formData.notes}
                          onChange={handleInputChange}
                          className="rounded-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Method */}
              <Card className="border-0 shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white flex items-center gap-3">
                    <Truck className="h-5 w-5" />
                    <h2 className="text-lg font-semibold">Metode Pengiriman</h2>
                  </div>
                  <div className="p-6">
                    <RadioGroup
                      value={formData.shippingMethod}
                      onValueChange={(value) => handleSelectChange("shippingMethod", value)}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 border border-gray-200 rounded-xl p-4 hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer">
                        <RadioGroupItem value="regular" id="regular" className="text-green-600" />
                        <Label htmlFor="regular" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">Reguler (2-3 hari)</div>
                              <div className="text-sm text-gray-500">Pengiriman standar ke seluruh Indonesia</div>
                            </div>
                            <div className="font-semibold text-gray-900">Rp15.000</div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 border border-gray-200 rounded-xl p-4 hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer">
                        <RadioGroupItem value="express" id="express" className="text-green-600" />
                        <Label htmlFor="express" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">Express (1-2 hari)</div>
                              <div className="text-sm text-gray-500">Pengiriman cepat dengan prioritas</div>
                            </div>
                            <div className="font-semibold text-gray-900">Rp30.000</div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 border border-gray-200 rounded-xl p-4 hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer">
                        <RadioGroupItem value="same_day" id="same_day" className="text-green-600" />
                        <Label htmlFor="same_day" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">Same Day (Hari ini)</div>
                              <div className="text-sm text-gray-500">Pengiriman di hari yang sama (area tertentu)</div>
                            </div>
                            <div className="font-semibold text-gray-900">Rp50.000</div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-0 shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white flex items-center gap-3">
                    <CreditCard className="h-5 w-5" />
                    <h2 className="text-lg font-semibold">Metode Pembayaran</h2>
                  </div>
                  <div className="p-6">
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 border border-gray-200 rounded-xl p-4 hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer">
                        <RadioGroupItem value="bank_transfer" id="bank_transfer" className="text-green-600" />
                        <Label htmlFor="bank_transfer" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-blue-100 p-2 rounded-full">
                                <Banknote className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Transfer Bank</div>
                                <div className="text-sm text-gray-500">BCA, BNI, BRI, Mandiri</div>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {["BCA", "BNI", "BRI"].map((bank) => (
                                <div
                                  key={bank}
                                  className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-medium"
                                >
                                  {bank}
                                </div>
                              ))}
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 border border-gray-200 rounded-xl p-4 hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer">
                        <RadioGroupItem value="e_wallet" id="e_wallet" className="text-green-600" />
                        <Label htmlFor="e_wallet" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-purple-100 p-2 rounded-full">
                                <Wallet className="h-5 w-5 text-purple-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">E-Wallet</div>
                                <div className="text-sm text-gray-500">OVO, GoPay, DANA, LinkAja</div>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {["OVO", "GOPAY", "DANA"].map((wallet) => (
                                <div
                                  key={wallet}
                                  className="w-12 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-medium"
                                >
                                  {wallet}
                                </div>
                              ))}
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 border border-gray-200 rounded-xl p-4 hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer">
                        <RadioGroupItem value="credit_card" id="credit_card" className="text-green-600" />
                        <Label htmlFor="credit_card" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-red-100 p-2 rounded-full">
                                <CreditCardIcon className="h-5 w-5 text-red-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Kartu Kredit</div>
                                <div className="text-sm text-gray-500">Visa, Mastercard, JCB</div>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {["VISA", "MC", "JCB"].map((card) => (
                                <div
                                  key={card}
                                  className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-medium"
                                >
                                  {card}
                                </div>
                              ))}
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 border border-gray-200 rounded-xl p-4 hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer">
                        <RadioGroupItem value="cod" id="cod" className="text-green-600" />
                        <Label htmlFor="cod" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-yellow-100 p-2 rounded-full">
                                <Package className="h-5 w-5 text-yellow-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Bayar di Tempat (COD)</div>
                                <div className="text-sm text-gray-500">Hanya tersedia untuk area tertentu</div>
                              </div>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="border-0 shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white">
                    <h2 className="text-lg font-semibold">Ringkasan Pesanan</h2>
                  </div>
                  <div className="p-6">
                    <div className="max-h-60 overflow-y-auto space-y-4 mb-6">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                            <Image
                              src={item.image || "/placeholder.svg?height=64&width=64"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-sm text-gray-500">
                                {item.quantity} x Rp{item.price.toLocaleString()}
                              </span>
                              <span className="font-medium text-gray-900">
                                Rp{(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-3">
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
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pajak (11%)</span>
                        <span className="font-medium text-gray-900">Rp{tax.toLocaleString()}</span>
                      </div>
                      <Separator className="my-3" />
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="font-bold text-xl text-gray-900">Rp{total.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full h-12 text-base shadow-md"
                      disabled={isLoading}
                    >
                      {isLoading ? "Memproses..." : "Selesaikan Pesanan"}
                    </Button>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <ShieldCheck className="h-4 w-4 text-green-600" />
                        <span>Transaksi aman & terenkripsi</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span>Proses pesanan dalam 24 jam</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Lock className="h-4 w-4 text-green-600" />
                        <span>Pembayaran aman dengan SSL</span>
                      </div>
                    </div>

                    <div className="mt-6 text-xs text-center text-gray-500">
                      Dengan melanjutkan, Anda menyetujui{" "}
                      <Link href="/terms" className="text-green-600 hover:underline">
                        Syarat dan Ketentuan
                      </Link>{" "}
                      serta{" "}
                      <Link href="/privacy" className="text-green-600 hover:underline">
                        Kebijakan Privasi
                      </Link>{" "}
                      kami.
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md overflow-hidden bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                      <ShieldCheck className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Belanja dengan Aman</h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    AgroOrganik menjamin keamanan transaksi Anda. Semua data pribadi dilindungi dengan enkripsi SSL
                    256-bit.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["VISA", "MC", "BCA", "BNI", "OVO", "GOPAY"].map((method) => (
                      <div
                        key={method}
                        className="border border-green-200 bg-white rounded-md p-1 h-6 flex items-center justify-center"
                      >
                        <span className="text-xs font-medium text-gray-700">{method}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
