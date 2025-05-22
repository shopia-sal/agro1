"use client"
import React from "react";
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
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, Menu, User, LogOut, Heart, Package, Settings, Leaf } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { getCategories } from "@/lib/data"

export default function Header() {
  const { cart } = useCart()
  const { user, logout } = useAuth()
  const categories = getCategories()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white shadow-sm" : "bg-white"
      }`}
    >
      {/* Top Bar */}
      <div className="border-b">
        <div className="container flex h-10 items-center justify-between px-4 md:px-6">
          <p className="text-sm text-muted-foreground">Pengiriman gratis untuk pembelian di atas Rp500.000</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
              Tentang Kami
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="grid gap-6 py-6">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                  <Leaf className="h-6 w-6 text-green-600" />
                  <span>AgroOrganik</span>
                </Link>
                <div className="grid gap-4">
                  <h4 className="font-medium">Kategori</h4>
                  <nav className="grid gap-2">
                    {categories.map((category) => (
                      <SheetClose asChild key={category.id}>
                        <Link
                          href={`/products?category=${category.id}`}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {category.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                </div>
                <div className="grid gap-4">
                  <h4 className="font-medium">Halaman</h4>
                  <nav className="grid gap-2">
                    <SheetClose asChild>
                      <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                        Beranda
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                        Semua Produk
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                        Tentang Kami
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                        Hubungi Kami
                      </Link>
                    </SheetClose>
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold hidden sm:inline-block">AgroOrganik</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-green-600 transition-colors">
              Beranda
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="text-sm font-medium p-0 h-auto">
                  Kategori
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link href={`/products?category=${category.id}`}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/products" className="text-sm font-medium hover:text-green-600 transition-colors">
              Semua Produk
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-green-600 transition-colors">
              Tentang Kami
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-green-600 transition-colors">
              Hubungi Kami
            </Link>
          </nav>

          {/* Search, Cart, Account */}
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari produk..."
                className="w-[200px] pl-8 rounded-full bg-muted border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-32">
                <form onSubmit={handleSearch} className="flex w-full max-w-md mx-auto mt-6">
                  <Input
                    type="search"
                    placeholder="Cari produk..."
                    className="flex-1"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <SheetClose asChild>
                    <Button type="submit" className="ml-2">
                      Cari
                    </Button>
                  </SheetClose>
                </form>
              </SheetContent>
            </Sheet>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemCount}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profil Saya</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders" className="cursor-pointer">
                      <Package className="mr-2 h-4 w-4" />
                      <span>Pesanan Saya</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/wishlist" className="cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Wishlist</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Pengaturan</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Keluar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
