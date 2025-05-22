"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import ProductCard from "@/components/product-card"
import FilterSidebar from "./filter-sidebar"
import { getAllProducts, getCategories, getCertifications } from "@/lib/data"
import { Search, SlidersHorizontal, X, Star, ArrowUpDown, LayoutGrid, List } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export default function ProductsPage() {
  const allProducts = getAllProducts()
  const categories = getCategories()
  const certifications = getCertifications()

  const [products, setProducts] = useState(allProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedCertifications, setSelectedCertifications] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [sortBy, setSortBy] = useState("featured")
  const [isFiltersVisible, setIsFiltersVisible] = useState(true)
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [activeTab, setActiveTab] = useState("all")

  // Get max price from all products for slider
  const maxPrice = Math.max(...allProducts.map((product) => product.price))

  // Filter products based on selected filters
  useEffect(() => {
    let filtered = allProducts

    // Tab filter
    if (activeTab === "featured") {
      filtered = filtered.filter((product) => product.featured)
    } else if (activeTab === "discounted") {
      filtered = filtered.filter((product) => product.originalPrice && product.originalPrice > product.price)
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category))
    }

    // Certification filter
    if (selectedCertifications.length > 0) {
      filtered = filtered.filter((product) =>
        product.certifications.some((cert) => selectedCertifications.includes(cert)),
      )
    }

    // Price range filter
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    setProducts(filtered)
  }, [searchTerm, selectedCategories, selectedCertifications, priceRange, sortBy, allProducts, activeTab])

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleCertificationChange = (certification) => {
    setSelectedCertifications((prev) =>
      prev.includes(certification) ? prev.filter((c) => c !== certification) : [...prev, certification],
    )
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedCertifications([])
    setPriceRange([0, maxPrice])
    setSearchTerm("")
    setActiveTab("all")
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (selectedCategories.length > 0) count += selectedCategories.length
    if (selectedCertifications.length > 0) count += selectedCertifications.length
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) count += 1
    return count
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <main className="flex-1 py-8">
      <div className="container px-4 md:px-6">
        <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-xl p-6 md:p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-yellow-400"></div>
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-yellow-400"></div>
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Semua Produk Organik</h1>
            <p className="text-green-100 max-w-2xl">
              Temukan produk organik berkualitas dengan sertifikasi resmi untuk kebutuhan pertanian Anda
            </p>
          </div>
        </div>

        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <Search className="h-4 w-4" />
            </div>
            <Input
              placeholder="Cari produk organik..."
              className="pl-10 border-green-200 focus-visible:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="flex gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px] border-green-200">
                <div className="flex items-center">
                  <ArrowUpDown className="mr-2 h-4 w-4 text-green-600" />
                  <SelectValue placeholder="Urutkan" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">
                  <div className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-yellow-500" />
                    <span>Unggulan</span>
                  </div>
                </SelectItem>
                <SelectItem value="price-low">Harga: Rendah ke Tinggi</SelectItem>
                <SelectItem value="price-high">Harga: Tinggi ke Rendah</SelectItem>
                <SelectItem value="rating">Rating Tertinggi</SelectItem>
                <SelectItem value="newest">Terbaru</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2 border border-green-200 rounded-md p-1">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-sm ${viewMode === "grid" ? "bg-green-100 text-green-700" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-sm ${viewMode === "list" ? "bg-green-100 text-green-700" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden relative border-green-200">
                  <SlidersHorizontal className="h-4 w-4 mr-2 text-green-600" />
                  Filter
                  {activeFiltersCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-green-600 text-white h-5 w-5 p-0 flex items-center justify-center">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] border-r-green-200">
                <div className="py-4">
                  <FilterSidebar
                    categories={categories}
                    certifications={certifications}
                    selectedCategories={selectedCategories}
                    selectedCertifications={selectedCertifications}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    handleCategoryChange={handleCategoryChange}
                    handleCertificationChange={handleCertificationChange}
                    clearAllFilters={clearAllFilters}
                    maxPrice={maxPrice}
                  />
                </div>
                <SheetClose asChild>
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">Terapkan Filter</Button>
                </SheetClose>
              </SheetContent>
            </Sheet>

            <Button
              variant="outline"
              className="hidden md:flex border-green-200"
              onClick={() => setIsFiltersVisible(!isFiltersVisible)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2 text-green-600" />
              {isFiltersVisible ? "Sembunyikan Filter" : "Tampilkan Filter"}
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          {isFiltersVisible && (
            <div className="hidden md:block w-72 flex-shrink-0">
              <div className="bg-white rounded-xl border border-green-100 p-5 shadow-sm sticky top-20">
                <FilterSidebar
                  categories={categories}
                  certifications={certifications}
                  selectedCategories={selectedCategories}
                  selectedCertifications={selectedCertifications}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  handleCategoryChange={handleCategoryChange}
                  handleCertificationChange={handleCertificationChange}
                  clearAllFilters={clearAllFilters}
                  maxPrice={maxPrice}
                />
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {products.length > 0 ? (
              <>
                <div className="mb-4 text-sm text-gray-500">
                  Menampilkan {products.length} dari {allProducts.length} produk
                </div>
                <div
                  className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
                >
                  {products.map((product) => (
                    <div key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-green-100 shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <Search className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">Tidak ada produk yang ditemukan</h3>
                <p className="text-muted-foreground mb-6">Coba ubah filter pencarian Anda</p>
                <Button variant="outline" onClick={clearAllFilters} className="border-green-200">
                  Hapus semua filter
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
