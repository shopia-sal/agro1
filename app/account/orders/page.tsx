"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { getOrderHistory } from "@/lib/data"
import AccountLayout from "@/components/account-layout"

export default function OrdersPage() {
  const { user } = useAuth()
  const orders = getOrderHistory()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = activeTab === "all" || order.status.toLowerCase() === activeTab

    return matchesSearch && matchesStatus
  })

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
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pesanan Saya</h1>
          <p className="text-muted-foreground">Lihat dan kelola riwayat pesanan Anda</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="pending">Menunggu Pembayaran</TabsTrigger>
              <TabsTrigger value="processing">Diproses</TabsTrigger>
              <TabsTrigger value="shipped">Dikirim</TabsTrigger>
              <TabsTrigger value="delivered">Selesai</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari pesanan..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-4 flex flex-col md:flex-row gap-2 md:items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Pesanan #{order.orderNumber}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Tanggal: {order.date} | Total: Rp{order.total.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/account/orders/${order.id}`}>Detail</Link>
                    </Button>
                    {order.status.toLowerCase() === "delivered" && <Button size="sm">Beli Lagi</Button>}
                  </div>
                </div>

                <div className="p-4 divide-y">
                  {order.items.slice(0, 2).map((item, index) => (
                    <div key={index} className="py-3 first:pt-0 last:pb-0 flex gap-4">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg?height=64&width=64"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <div className="text-sm text-muted-foreground">
                          {item.quantity} x Rp{item.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <div className="pt-3 text-sm text-muted-foreground">+{order.items.length - 2} produk lainnya</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg">
            <h3 className="text-lg font-medium mb-2">Tidak ada pesanan ditemukan</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? "Coba ubah kata kunci pencarian Anda" : "Anda belum memiliki pesanan"}
            </p>
            <Button asChild>
              <Link href="/products">Mulai Belanja</Link>
            </Button>
          </div>
        )}
      </div>
    </AccountLayout>
  )
}
