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
import { Search, Filter, MoreHorizontal, ArrowUpDown, UserPlus } from "lucide-react"
import AdminLayout from "@/components/admin-layout"

export default function AdminUsers() {
  const { toast } = useToast()

  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  // Mock user data
  const users = [
    {
      id: "1",
      name: "Ahmad Fauzi",
      email: "ahmad@example.com",
      role: "admin",
      status: "active",
      registeredDate: "2023-01-15",
      lastLogin: "2023-05-08",
      orderCount: 12,
    },
    {
      id: "2",
      name: "Siti Rahayu",
      email: "siti@example.com",
      role: "customer",
      status: "active",
      registeredDate: "2023-02-20",
      lastLogin: "2023-05-07",
      orderCount: 8,
    },
    {
      id: "3",
      name: "Budi Santoso",
      email: "budi@example.com",
      role: "customer",
      status: "active",
      registeredDate: "2023-03-10",
      lastLogin: "2023-05-05",
      orderCount: 5,
    },
    {
      id: "4",
      name: "Dewi Lestari",
      email: "dewi@example.com",
      role: "customer",
      status: "inactive",
      registeredDate: "2023-04-05",
      lastLogin: "2023-04-20",
      orderCount: 2,
    },
    {
      id: "5",
      name: "Joko Widodo",
      email: "joko@example.com",
      role: "customer",
      status: "active",
      registeredDate: "2023-04-15",
      lastLogin: "2023-05-06",
      orderCount: 3,
    },
  ]

  // Filter and sort users
  const filteredUsers = users
    .filter(
      (user) =>
        (searchTerm === "" ||
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (roleFilter === "" || user.role === roleFilter),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "email":
          return a.email.localeCompare(b.email)
        case "orders":
          return b.orderCount - a.orderCount
        case "oldest":
          return new Date(a.registeredDate) - new Date(b.registeredDate)
        default: // newest
          return new Date(b.registeredDate) - new Date(a.registeredDate)
      }
    })

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-600">Admin</Badge>
      case "customer":
        return <Badge variant="outline">Pelanggan</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Aktif
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            Tidak Aktif
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleUpdateStatus = (userId, userName, newStatus) => {
    toast({
      title: "Status pengguna diperbarui",
      description: `Status ${userName} telah diperbarui menjadi "${newStatus}".`,
    })
  }

  const handleUpdateRole = (userId, userName, newRole) => {
    toast({
      title: "Peran pengguna diperbarui",
      description: `Peran ${userName} telah diperbarui menjadi "${newRole}".`,
    })
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Kelola Pengguna</h1>
          <Button asChild>
            <Link href="/admin/users/add">
              <UserPlus className="h-4 w-4 mr-2" />
              Tambah Pengguna
            </Link>
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari nama atau email..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Peran" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Peran</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="customer">Pelanggan</SelectItem>
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
                <SelectItem value="name">Nama (A-Z)</SelectItem>
                <SelectItem value="email">Email (A-Z)</SelectItem>
                <SelectItem value="orders">Jumlah Pesanan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Users Table */}
        <div className="border rounded-md">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">Nama</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Peran</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Terdaftar</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Login Terakhir</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Pesanan</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle font-medium">{user.name}</td>
                    <td className="p-4 align-middle">{user.email}</td>
                    <td className="p-4 align-middle">{getRoleBadge(user.role)}</td>
                    <td className="p-4 align-middle">{getStatusBadge(user.status)}</td>
                    <td className="p-4 align-middle">{user.registeredDate}</td>
                    <td className="p-4 align-middle">{user.lastLogin}</td>
                    <td className="p-4 align-middle">{user.orderCount}</td>
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
                            <Link href={`/admin/users/${user.id}`}>Lihat Detail</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/users/edit/${user.id}`}>Edit</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Ubah Status</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(user.id, user.name, user.status === "active" ? "Tidak Aktif" : "Aktif")
                            }
                          >
                            {user.status === "active" ? "Nonaktifkan" : "Aktifkan"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Ubah Peran</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateRole(user.id, user.name, user.role === "admin" ? "Pelanggan" : "Admin")
                            }
                          >
                            {user.role === "admin" ? "Jadikan Pelanggan" : "Jadikan Admin"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Tidak ada pengguna ditemukan</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || roleFilter ? "Coba ubah filter pencarian Anda" : "Belum ada pengguna yang terdaftar"}
              </p>
              <Button asChild>
                <Link href="/admin/users/add">Tambah Pengguna</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
