"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { getCategories } from "@/lib/data"
import {
  Search,
  ShoppingCart,
  Menu,
  User,
  Leaf,
  ChevronDown,
  Phone,
  Info,
  LogOut,
  Heart,
  Package,
  Clock,
  MapPin,
} from "lucide-react"

export default function Header() {
  const { cart } = useCart()
  const { user, logout } = useAuth()
  const categories = getCategories()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900">
        <div className="container flex h-10 items-center justify-between px-4 md:px-6">
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center text-xs font-medium">
              <Clock className="mr-1.5 h-3.5 w-3.5" />
              <span>Senin - Jumat: 08:00 - 17:00</span>
            </div>
            <div className="flex items-center text-xs font-medium">
              <Phone className="mr-1.5 h-3.5 w-3.5" />
              <span>+62 812 3456 7890</span>
            </div>
            <div className="flex items-center text-xs font-medium">
              <MapPin className="mr-1.5 h-3.5 w-3.5" />
              <span>Jl. Organik No. 123, Jakarta</span>
            </div>
          </div>
          <p className="text-xs md:text-sm font-medium md:hidden">Gratis Ongkir Min. Rp500.000</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-xs font-medium hover:text-green-800 transition-colors">
              Tentang Kami
            </Link>
            <Link href="/contact" className="text-xs font-medium hover:text-green-800 transition-colors">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#001800]/95 backdrop-blur-md shadow-md py-2"
            : "bg-gradient-to-r from-[#001800] to-[#003300] py-4"
        }`}
      >
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 z-10">
              <div className="relative h-10 w-10 overflow-hidden">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold text-white">
                  Agro<span className="text-green-400">Organik</span>
                </span>
                <span className="hidden md:block text-[10px] text-green-300 -mt-1">Produk Organik Terpercaya</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className="relative px-3 py-2 text-sm font-medium text-white hover:text-green-300 transition-colors group"
              >
                Beranda
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="link"
                    className="relative px-3 py-2 text-sm font-medium h-auto text-white hover:text-green-300 transition-colors group"
                  >
                    <span className="flex items-center">
                      Kategori
                      <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="w-56 bg-[#002200]/95 backdrop-blur-md border-green-900 text-white rounded-xl p-2 shadow-xl"
                >
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category.id}
                      asChild
                      className="rounded-lg hover:bg-green-800/50 focus:bg-green-800/50 py-2"
                    >
                      <Link href={`/products?category=${category.id}`} className="flex items-center">
                        <span className="h-7 w-7 rounded-full bg-green-900/50 flex items-center justify-center mr-2">
                          {category.icon || <Leaf className="h-4 w-4 text-green-400" />}
                        </span>
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="bg-green-800/50 my-2" />
                  <DropdownMenuItem asChild className="rounded-lg hover:bg-green-800/50 focus:bg-green-800/50">
                    <Link href="/products" className="flex items-center justify-center text-green-400 font-medium">
                      Lihat Semua Kategori
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/products"
                className="relative px-3 py-2 text-sm font-medium text-white hover:text-green-300 transition-colors group"
              >
                Semua Produk
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                href="/about"
                className="relative px-3 py-2 text-sm font-medium text-white hover:text-green-300 transition-colors group"
              >
                Tentang Kami
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                href="/contact"
                className="relative px-3 py-2 text-sm font-medium text-white hover:text-green-300 transition-colors group"
              >
                Hubungi Kami
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Search, Cart, Account */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Desktop Search */}
              <form onSubmit={handleSearch} className="hidden md:flex relative">
                <Input
                  type="search"
                  placeholder="Cari produk organik..."
                  className="w-[250px] pl-9 h-9 rounded-full bg-white/10 border-green-900/30 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-green-500/50 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </form>

              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden relative text-white hover:bg-green-800/50 hover:text-green-300"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>


              {/* Cart */}
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-white hover:bg-green-800/50 hover:text-green-300"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-green-500 text-xs font-medium text-white">
                      {cartItemCount}
                    </span>
                  )}
                  <span className="sr-only">Cart</span>
                </Button>
              </Link>

              {/* User Account */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-green-800/50 hover:text-green-300"
                    >
                      <User className="h-5 w-5" />
                      <span className="sr-only">Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-[#002200]/95 backdrop-blur-md border-green-900 text-white rounded-xl p-2 shadow-xl"
                  >
                    <div className="flex items-center justify-start gap-3 p-3 border-b border-green-800/50 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-700">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate max-w-[150px]">{user.email}</p>
                      </div>
                    </div>

                    <DropdownMenuItem asChild className="rounded-lg hover:bg-green-800/50 focus:bg-green-800/50 py-2">
                      <Link href="/account/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-green-400" />
                        <span>Profil Saya</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="rounded-lg hover:bg-green-800/50 focus:bg-green-800/50 py-2">
                      <Link href="/account/orders" className="flex items-center">
                        <Package className="mr-2 h-4 w-4 text-green-400" />
                        <span>Pesanan Saya</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="rounded-lg hover:bg-green-800/50 focus:bg-green-800/50 py-2">
                      <Link href="/wishlist" className="flex items-center">
                        <Heart className="mr-2 h-4 w-4 text-green-400" />
                        <span>Wishlist</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-green-800/50 my-2" />

                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="rounded-lg hover:bg-green-800/50 focus:bg-green-800/50 py-2 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4 text-green-400" />
                      <span>Keluar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:bg-green-800/50 hover:text-green-300 text-sm">
                    <User className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Login</span>
                  </Button>
                </Link>
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-white hover:bg-green-800/50 hover:text-green-300 ml-1"
                  >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-gradient-to-b from-[#001800] to-[#002800] text-white border-green-900 w-[85vw] sm:max-w-md"
                >
                  <div className="grid gap-6 py-6 h-full overflow-y-auto">
                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                      <div className="relative h-10 w-10 overflow-hidden">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                          <Leaf className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <span className="text-xl font-bold text-white">
                          Agro<span className="text-green-400">Organik</span>
                        </span>
                        <span className="block text-[10px] text-green-300 -mt-1">Produk Organik Terpercaya</span>
                      </div>
                    </Link>

                    <form onSubmit={handleSearch} className="flex w-full">
                      <Input
                        type="search"
                        placeholder="Cari produk organik..."
                        className="flex-1 bg-white/10 border-green-900/30 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-green-500/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <SheetClose asChild>
                        <Button type="submit" className="ml-2 bg-green-600 hover:bg-green-700">
                          <Search className="h-4 w-4" />
                        </Button>
                      </SheetClose>
                    </form>

                    <div className="grid gap-4">
                      <h4 className="font-medium text-green-400 text-sm uppercase tracking-wider">Menu</h4>
                      <nav className="grid gap-3">
                        <SheetClose asChild>
                          <Link
                            href="/"
                            className="flex items-center py-2 text-white hover:text-green-300 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center mr-3">
                              <Leaf className="h-4 w-4 text-green-400" />
                            </div>
                            <span>Beranda</span>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="/products"
                            className="flex items-center py-2 text-white hover:text-green-300 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center mr-3">
                              <Package className="h-4 w-4 text-green-400" />
                            </div>
                            <span>Semua Produk</span>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="/about"
                            className="flex items-center py-2 text-white hover:text-green-300 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center mr-3">
                              <Info className="h-4 w-4 text-green-400" />
                            </div>
                            <span>Tentang Kami</span>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="/contact"
                            className="flex items-center py-2 text-white hover:text-green-300 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center mr-3">
                              <Phone className="h-4 w-4 text-green-400" />
                            </div>
                            <span>Hubungi Kami</span>
                          </Link>
                        </SheetClose>
                      </nav>
                    </div>

                    <div className="grid gap-4">
                      <h4 className="font-medium text-green-400 text-sm uppercase tracking-wider">Kategori</h4>
                      <nav className="grid gap-2">
                        {categories.map((category) => (
                          <SheetClose asChild key={category.id}>
                            <Link
                              href={`/products?category=${category.id}`}
                              className="flex items-center py-2 text-white hover:text-green-300 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center mr-3">
                                {category.icon || <Leaf className="h-4 w-4 text-green-400" />}
                              </div>
                              <span>{category.name}</span>
                            </Link>
                          </SheetClose>
                        ))}
                      </nav>
                    </div>

                    {user && (
                      <div className="grid gap-4 mt-auto">
                        <h4 className="font-medium text-green-400 text-sm uppercase tracking-wider">Akun Saya</h4>
                        <nav className="grid gap-2">
                          <SheetClose asChild>
                            <Link
                              href="/account/profile"
                              className="flex items-center py-2 text-white hover:text-green-300 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center mr-3">
                                <User className="h-4 w-4 text-green-400" />
                              </div>
                              <span>Profil Saya</span>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link
                              href="/account/orders"
                              className="flex items-center py-2 text-white hover:text-green-300 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center mr-3">
                                <Package className="h-4 w-4 text-green-400" />
                              </div>
                              <span>Pesanan Saya</span>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <button
                              onClick={handleLogout}
                              className="flex items-center py-2 text-white hover:text-green-300 transition-colors w-full text-left"
                            >
                              <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center mr-3">
                                <LogOut className="h-4 w-4 text-green-400" />
                              </div>
                              <span>Keluar</span>
                            </button>
                          </SheetClose>
                        </nav>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar - Expandable */}
      {isMobileSearchOpen && (
        <div className="md:hidden bg-[#002200] py-3 px-4 shadow-md">
          <form onSubmit={handleSearch} className="flex w-full">
            <Input
              type="search"
              placeholder="Cari produk organik..."
              className="flex-1 bg-white/10 border-green-900/30 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-green-500/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <Button type="submit" className="ml-2 bg-green-600 hover:bg-green-700">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </header>
  )
}
