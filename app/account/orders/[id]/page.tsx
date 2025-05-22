"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Truck, Calendar, CreditCard } from "lucide-react"
import { getOrderById } from "@/lib/data"
import AccountLayout from "@/components/account-layout"

export default function OrderDetailPage({ params }) {
  const { id } = params
  const order = getOrderById(id)

  if (!order) {
    return (
      <AccountLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Pesanan tidak ditemukan</h1>
          <p className="mb-6">Pesanan yang Anda cari tidak tersedia atau telah dihapus.</p>
          <Button asChild>
            <Link href="/account/orders">Kembali ke Daftar Pesanan</Link>
          </Button>
        </div>
      </AccountLayout>
    )
  }

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            Menunggu Pembayaran
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            Diproses
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="text-purple-600 border-purple-600">
            Dikirim
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Selesai
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            Dibatalkan
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account/orders">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Detail Pesanan #{order.orderNumber}</h1>
            <p className="text-muted-foreground">Tanggal pesanan: {order.date}</p>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">Status:</span>
              {getStatusBadge(order.status)}
            </div>

            <div className="flex flex-wrap gap-4">
              {order.status.toLowerCase() === "pending" && <Button>Bayar Sekarang</Button>}
              {order.status.toLowerCase() === "shipped" && <Button>Lacak Pengiriman</Button>}
              {order.status.toLowerCase() === "delivered" && <Button>Beli Lagi</Button>}
              {order.status.toLowerCase() !== "cancelled" && order.status.toLowerCase() !== "delivered" && (
                <Button variant="outline">Batalkan Pesanan</Button>
              )}
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="font-semibold mb-4">Status Pengiriman</h2>
          <div className="space-y-4">
            {order.timeline.map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${index === 0 ? "bg-green-600" : "bg-gray-200"}`}></div>
                  {index < order.timeline.length - 1 && <div className="w-0.5 h-full bg-gray-200"></div>}
                </div>
                <div className="pb-4">
                  <div className="font-medium">{event.status}</div>
                  <div className="text-sm text-muted-foreground">
                    {event.date} {event.time}
                  </div>
                  {event.description && <div className="text-sm mt-1">{event.description}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 border rounded-lg overflow-hidden">
            <div className="bg-muted p-4">
              <h2 className="font-semibold">Produk yang Dibeli</h2>
            </div>
            <div className="divide-y">
              {order.items.map((item, index) => (
                <div key={index} className="p-4 flex gap-4">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg?height=64&width=64"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{item.name}</h4>
                      <span className="font-medium">Rp{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {item.quantity} x Rp{item.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-4">Ringkasan Pesanan</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>Rp{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pengiriman</span>
                  <span>Rp{order.shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pajak</span>
                  <span>Rp{order.tax.toLocaleString()}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Diskon</span>
                    <span>-Rp{order.discount.toLocaleString()}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>Rp{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <div>
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Truck className="h-4 w-4" />
                  <h3>Informasi Pengiriman</h3>
                </div>
                <div className="text-sm space-y-1">
                  <p className="font-medium">{order.shipping_address.name}</p>
                  <p>{order.shipping_address.address}</p>
                  <p>
                    {order.shipping_address.city}, {order.shipping_address.province}{" "}
                    {order.shipping_address.postal_code}
                  </p>
                  <p>{order.shipping_address.phone}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <CreditCard className="h-4 w-4" />
                  <h3>Metode Pembayaran</h3>
                </div>
                <p className="text-sm capitalize">{order.payment_method.replace("_", " ")}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Calendar className="h-4 w-4" />
                  <h3>Tanggal Pesanan</h3>
                </div>
                <p className="text-sm">{order.date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  )
}
