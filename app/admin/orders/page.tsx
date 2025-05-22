"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { Search, Filter, MoreHorizontal, ArrowUpDown } from "lucide-react"
import { getOrderHistory } from "@/lib/data"
import AdminLayout from "@/components/admin-layout"

export default function AdminOrders() {
  const orders = getOrderHistory()
  const { toast } = useToast()

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  const filteredOrders = orders
    .filter(
      (order) =>
        (searchTerm === "" ||
          order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === "" || order.status.toLowerCase() === statusFilter.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date) - new Date(b.date)
        case "total-high":
          return b.total - a.total
        case "total-low":
          return a.total - b.total
        default: // newest
          return new Date(b.date) - new Date(a.date)
      }
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

  const handleUpdateStatus = (orderId, orderNumber, newStatus) => {
    toast({
      title: "Status pesanan diperbarui",
      description: `Pesanan #${orderNumber} telah diperbarui menjadi "${newStatus}".`,
    })
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Kelola Pesanan</h1>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari pesanan atau pelanggan..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Menunggu Pembayaran</SelectItem>
                <SelectItem value="processing">Diproses</SelectItem>
                <SelectItem value="shipped">Dikirim</SelectItem>
                <SelectItem value="delivered">Selesai</SelectItem>
                <SelectItem value="cancelled">Dibatalkan</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Urutkan" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Terbaru</SelectItem>
                <SelectItem value="oldest">Terlama</SelectItem>
                <SelectItem value="total-high">Total: Tinggi ke Rendah</SelectItem>
                <SelectItem value="total-low">Total: Rendah ke Tinggi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="border rounded-md">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">No. Pesanan</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Tanggal</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Pelanggan</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Total</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Metode Pembayaran</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle font-medium">#{order.orderNumber}</td>
                    <td className="p-4 align-middle">{order.date}</td>
                    <td className="p-4 align-middle">
                      <div>
                        <div className="font-medium">{order.customer.name}</div>
                        <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">Rp{order.total.toLocaleString()}</td>
                    <td className="p-4 align-middle">{getStatusBadge(order.status)}</td>
                    <td className="p-4 align-middle capitalize">{order.payment_method.replace("_", " ")}</td>
                    <td className="p-4 align-middle">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Buka menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/orders/${order.id}`}>Lihat Detail</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Ubah Status</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, order.orderNumber, "Diproses")}>
                            Diproses
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, order.orderNumber, "Dikirim")}>
                            Dikirim
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, order.orderNumber, "Selesai")}>
                            Selesai
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleUpdateStatus(order.id, order.orderNumber, "Dibatalkan")}
                          >
                            Batalkan
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Tidak ada pesanan ditemukan</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || statusFilter ? "Coba ubah filter pencarian Anda" : "Belum ada pesanan yang dibuat"}
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
