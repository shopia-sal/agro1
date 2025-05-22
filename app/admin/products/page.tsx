"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Search, Plus, MoreHorizontal, Filter, ArrowUpDown, Star } from "lucide-react"
import { getAllProducts, getCategories } from "@/lib/data"
import AdminLayout from "@/components/admin-layout"

export default function AdminProducts() {
  const products = getAllProducts()
  const categories = getCategories()
  const { toast } = useToast()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedProducts, setSelectedProducts] = useState([])

  const filteredProducts = products
    .filter(
      (product) =>
        (searchTerm === "" ||
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategory === "" || product.category === selectedCategory),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "stock-low":
          return a.stock - b.stock
        case "stock-high":
          return b.stock - a.stock
        default: // newest
          return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })

  const handleSelectAllProducts = (checked) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map((product) => product.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleSelectProduct = (productId, checked) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId])
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    }
  }

  const handleDeleteSelected = () => {
    if (selectedProducts.length === 0) return

    if (confirm(`Apakah Anda yakin ingin menghapus ${selectedProducts.length} produk terpilih?`)) {
      toast({
        title: "Produk dihapus",
        description: `${selectedProducts.length} produk telah berhasil dihapus.`,
      })
      setSelectedProducts([])
    }
  }

  const handleDeleteProduct = (productId, productName) => {
    if (confirm(`Apakah Anda yakin ingin menghapus produk "${productName}"?`)) {
      toast({
        title: "Produk dihapus",
        description: `Produk "${productName}" telah berhasil dihapus.`,
      })
    }
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Kelola Produk</h1>
          <Button asChild>
            <Link href="/admin/products/add">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Produk
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari produk..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Kategori" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
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
                <SelectItem value="name-asc">Nama (A-Z)</SelectItem>
                <SelectItem value="name-desc">Nama (Z-A)</SelectItem>
                <SelectItem value="price-low">Harga: Rendah ke Tinggi</SelectItem>
                <SelectItem value="price-high">Harga: Tinggi ke Rendah</SelectItem>
                <SelectItem value="rating">Rating Tertinggi</SelectItem>
                <SelectItem value="stock-low">Stok: Rendah ke Tinggi</SelectItem>
                <SelectItem value="stock-high">Stok: Tinggi ke Rendah</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedProducts.length > 0 && (
          <div className="bg-muted p-2 rounded-md flex items-center justify-between">
            <span className="text-sm ml-2">{selectedProducts.length} produk dipilih</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Ubah Kategori
              </Button>
              <Button variant="outline" size="sm">
                Ubah Harga
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                Hapus
              </Button>
            </div>
          </div>
        )}
        <div className="border rounded-md">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    <Checkbox
                      onCheckedChange={handleSelectAllProducts}
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    />
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Produk</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Kategori</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Harga</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Stok</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Rating</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={(checked) => handleSelectProduct(product.id, checked)}
                      />
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded">
                          <Image
                            src={product.image || "/placeholder.svg?height=40&width=40"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      {categories.find((c) => c.id === product.category)?.name || product.category}
                    </td>
                    <td className="p-4 align-middle">
                      <div className="font-medium">Rp{product.price.toLocaleString()}</div>
                      {product.originalPrice && (
                        <div className="text-xs text-muted-foreground line-through">
                          Rp{product.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="p-4 align-middle">
                      <div className={`${product.stock < 10 ? "text-red-500 font-medium" : ""}`}>{product.stock}</div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span>{product.rating}</span>
                        <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      {product.featured ? (
                        <Badge className="bg-green-600">Unggulan</Badge>
                      ) : (
                        <Badge variant="outline">Reguler</Badge>
                      )}
                    </td>
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
                            <Link href={`/admin/products/edit/${product.id}`}>Edit</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/products/${product.id}`} target="_blank">
                              Lihat
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                          >
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Tidak ada produk ditemukan</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || selectedCategory
                  ? "Coba ubah filter pencarian Anda"
                  : "Belum ada produk yang ditambahkan"}
              </p>
              <Button asChild>
                <Link href="/admin/products/add">Tambah Produk</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
