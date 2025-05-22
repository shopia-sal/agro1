"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/components/auth-provider"
import { User, Package, Heart, Settings, Menu } from "lucide-react"

export default function AccountLayout({ children }) {
  const { user } = useAuth()
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  // Redirect if not logged in
  useEffect(() => {
    setIsMounted(true)
    if (isMounted && !user) {
      window.location.href = "/login?redirect=" + pathname
    }
  }, [user, pathname, isMounted])

  if (!isMounted || !user) {
    return null
  }

  const navigation = [
    {
      name: "Profil Saya",
      href: "/account/profile",
      icon: User,
      current: pathname === "/account/profile",
    },
    {
      name: "Pesanan Saya",
      href: "/account/orders",
      icon: Package,
      current: pathname === "/account/orders" || pathname.startsWith("/account/orders/"),
    },
    {
      name: "Wishlist",
      href: "/account/wishlist",
      icon: Heart,
      current: pathname === "/account/wishlist",
    },
    {
      name: "Pengaturan",
      href: "/account/settings",
      icon: Settings,
      current: pathname === "/account/settings",
    },
  ]

  return (
    <div className="flex-1 flex">
      <div className="container px-4 md:px-6 py-8 grid md:grid-cols-[240px_1fr] gap-10">
        {/* Sidebar for desktop */}
        <div className="hidden md:block space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
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
          </nav>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
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
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-semibold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
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
