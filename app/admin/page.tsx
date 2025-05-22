"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { BarChart, LineChart, PieChart, Users, ShoppingBag, DollarSign, Package, Search } from "lucide-react"
import AdminLayout from "@/components/admin-layout"

export default function AdminDashboard() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")

  if (user?.role !== "admin") {
    if (typeof window !== "undefined") {
      window.location.href = "/"
    }
    return null
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari..."
                className="w-[200px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>Refresh</Button>
          </div>
        </div>
   
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp 45.231.890</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+12.5%</span> dari bulan lalu
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pesanan Baru</CardTitle>
              <ShoppingBag className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+8.2%</span> dari bulan lalu
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pengguna Baru</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+32.1%</span> dari bulan lalu
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Produk Terjual</CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">892</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+18.7%</span> dari bulan lalu
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
            <TabsTrigger value="analytics">Analitik</TabsTrigger>
            <TabsTrigger value="reports">Laporan</TabsTrigger>
            <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              {/* Sales Chart */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Penjualan Bulanan</CardTitle>
                  <CardDescription>Perbandingan penjualan bulanan tahun ini vs tahun lalu</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                    <LineChart className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Grafik Penjualan Bulanan</span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Aktivitas Terbaru</CardTitle>
                  <CardDescription>10 aktivitas terbaru di platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          {i % 3 === 0 ? (
                            <Users className="h-4 w-4 text-green-600" />
                          ) : i % 3 === 1 ? (
                            <ShoppingBag className="h-4 w-4 text-green-600" />
                          ) : (
                            <Package className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {i % 3 === 0
                              ? "Pengguna baru terdaftar"
                              : i % 3 === 1
                                ? "Pesanan baru dibuat"
                                : "Produk baru ditambahkan"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {i % 3 === 0 ? "Ahmad Fauzi" : i % 3 === 1 ? "Pesanan #ORD-12345" : "Pupuk Organik Premium"}
                          </p>
                          <p className="text-xs text-muted-foreground">Baru saja</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              {/* Top Products */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Produk Terlaris</CardTitle>
                  <CardDescription>5 produk dengan penjualan tertinggi bulan ini</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Pupuk Organik Premium", sales: 124, revenue: 9300000 },
                      { name: "Biopestisida Alami", sales: 98, revenue: 6370000 },
                      { name: "Bibit Tomat Organik", sales: 87, revenue: 2175000 },
                      { name: "Kompos Organik", sales: 76, revenue: 3420000 },
                      { name: "Alat Penyiram Otomatis", sales: 65, revenue: 22750000 },
                    ].map((product, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-4">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm">Rp {product.revenue.toLocaleString()}</p>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full mt-1 overflow-hidden">
                            <div
                              className="h-full bg-green-600 rounded-full"
                              style={{ width: `${(product.sales / 124) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{product.sales} terjual</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Sales by Category */}
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Penjualan per Kategori</CardTitle>
                  <CardDescription>Distribusi penjualan berdasarkan kategori produk</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center bg-muted rounded-md">
                    <PieChart className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Grafik Kategori</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
                      <span className="text-sm">Pupuk Organik (35%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                      <span className="text-sm">Biopestisida (25%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-600 mr-2"></div>
                      <span className="text-sm">Bibit Organik (20%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-sm">Alat Pertanian (20%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analitik Penjualan</CardTitle>
                <CardDescription>Analisis mendalam tentang performa penjualan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted rounded-md">
                  <BarChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Grafik Analitik Penjualan</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Laporan</CardTitle>
                <CardDescription>Laporan penjualan dan kinerja</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">Laporan Penjualan Bulanan</h3>
                      <p className="text-sm text-muted-foreground">Laporan lengkap penjualan bulan Mei 2023</p>
                    </div>
                    <Button variant="outline">Unduh</Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">Laporan Inventaris</h3>
                      <p className="text-sm text-muted-foreground">Status inventaris produk terkini</p>
                    </div>
                    <Button variant="outline">Unduh</Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">Laporan Pelanggan</h3>
                      <p className="text-sm text-muted-foreground">Analisis demografi dan perilaku pelanggan</p>
                    </div>
                    <Button variant="outline">Unduh</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Laporan Keuangan</h3>
                      <p className="text-sm text-muted-foreground">Ringkasan keuangan kuartal kedua 2023</p>
                    </div>
                    <Button variant="outline">Unduh</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifikasi</CardTitle>
                <CardDescription>Notifikasi dan pemberitahuan sistem</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          i % 3 === 0 ? "bg-red-500" : i % 3 === 1 ? "bg-yellow-500" : "bg-green-500"
                        }`}
                      ></div>
                      <div>
                        <p className="font-medium">
                          {i % 3 === 0
                            ? "Stok produk hampir habis"
                            : i % 3 === 1
                              ? "Pesanan memerlukan perhatian"
                              : "Pembayaran baru diterima"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {i % 3 === 0
                            ? "Pupuk Organik Premium tersisa 5 stok"
                            : i % 3 === 1
                              ? "Pesanan #ORD-12345 menunggu konfirmasi"
                              : "Pembayaran untuk pesanan #ORD-54321 telah diterima"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">2 jam yang lalu</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        Tandai Dibaca
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
