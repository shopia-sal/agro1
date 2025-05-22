"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/components/auth-provider"
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, BarChart, Menu, LogOut, Leaf } from "lucide-react"

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  // Redirect if not admin
  useEffect(() => {
    setIsMounted(true)
    if (isMounted && (!user || user.role !== "admin")) {
      window.location.href = "/"
    }
  }, [user, isMounted])

  if (!isMounted || !user) {
    return null
  }

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      current: pathname === "/admin",
    },
    {
      name: "Produk",
      href: "/admin/products",
      icon: Package,
      current: pathname === "/admin/products" || pathname.startsWith("/admin/products/"),
    },
    {
      name: "Pesanan",
      href: "/admin/orders",
      icon: ShoppingBag,
      current: pathname === "/admin/orders" || pathname.startsWith("/admin/orders/"),
    },
    {
      name: "Pengguna",
      href: "/admin/users",
      icon: Users,
      current: pathname === "/admin/users" || pathname.startsWith("/admin/users/"),
    },
    {
      name: "Analitik",
      href: "/admin/analytics",
      icon: BarChart,
      current: pathname === "/admin/analytics",
    },
    {
      name: "Pengaturan",
      href: "/admin/settings",
      icon: Settings,
      current: pathname === "/admin/settings",
    },
  ]

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <div className="flex-1 flex">
      <div className="container px-4 md:px-6 py-8 grid md:grid-cols-[240px_1fr] gap-10">
        {/* Sidebar for desktop */}
        <div className="hidden md:block space-y-6">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">Admin Panel</span>
          </div>

          <nav className="flex flex-col space-y-1">
            {navigation.map((item) => (
              <Button key={item.name} variant={item.current ? "default" : "ghost"} className="justify-start" asChild>
                <Link href={item.href}>
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.name}
                </Link>
              </Button>
            ))}
            <Button
              variant="ghost"
              className="justify-start text-red-600 hover:text-red-600 hover:bg-red-100"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Keluar
            </Button>
          </nav>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">Admin Panel</span>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="py-4">
                <div className="flex items-center gap-2 mb-6">
                  <Leaf className="h-6 w-6 text-green-600" />
                  <span className="text-xl font-bold">Admin Panel</span>
                </div>

                <nav className="flex flex-col space-y-1">
                  {navigation.map((item) => (
                    <Button
                      key={item.name}
                      variant={item.current ? "default" : "ghost"}
                      className="justify-start"
                      asChild
                    >
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-5 w-5" />
                        {item.name}
                      </Link>
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    className="justify-start text-red-600 hover:text-red-600 hover:bg-red-100"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Keluar
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
