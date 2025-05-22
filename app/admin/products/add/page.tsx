"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Plus, Trash2, Upload } from "lucide-react"
import { getCategories, getCertifications } from "@/lib/data"
import AdminLayout from "@/components/admin-layout"

export default function AddProduct() {
  const { toast } = useToast()
  const categories = getCategories()
  const certifications = getCertifications()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    stock: "",
    weight: "",
    dimensions: "",
    manufacturer: "",
    productionDate: "",
    shelfLife: "",
    featured: false,
    certifications: [],
    ingredients: [""],
    images: [],
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (name, checked) => {
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCertificationChange = (certId, checked) => {
    if (checked) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, certId],
      })
    } else {
      setFormData({
        ...formData,
        certifications: formData.certifications.filter((id) => id !== certId),
      })
    }
  }

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...formData.ingredients]
    updatedIngredients[index] = value
    setFormData({
      ...formData,
      ingredients: updatedIngredients,
    })
  }

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ""],
    })
  }

  const removeIngredient = (index) => {
    const updatedIngredients = [...formData.ingredients]
    updatedIngredients.splice(index, 1)
    setFormData({
      ...formData,
      ingredients: updatedIngredients,
    })
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      // In a real app, you would upload these files to a server
      // For now, we'll just create object URLs
      const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
      }))

      setFormData({
        ...formData,
        images: [...formData.images, ...newImages],
      })
    }
  }

  const removeImage = (index) => {
    const updatedImages = [...formData.images]
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(updatedImages[index].preview)
    updatedImages.splice(index, 1)
    setFormData({
      ...formData,
      images: updatedImages,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate form
    if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.stock) {
      toast({
        title: "Form belum lengkap",
        description: "Harap lengkapi semua field yang diperlukan.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Produk ditambahkan",
        description: `Produk "${formData.name}" telah berhasil ditambahkan.`,
      })
      setIsLoading(false)
      // In a real app, you would redirect to the product list page
    }, 1500)
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/products">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tambah Produk Baru</h1>
            <p className="text-muted-foreground">Tambahkan produk baru ke katalog</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList>
              <TabsTrigger value="basic">Informasi Dasar</TabsTrigger>
              <TabsTrigger value="details">Detail Produk</TabsTrigger>
              <TabsTrigger value="images">Gambar</TabsTrigger>
              <TabsTrigger value="certifications">Sertifikasi & Kualitas</TabsTrigger>
            </TabsList>

            {/* Basic Information */}
            <TabsContent value="basic" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Produk *</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Kategori *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Deskripsi Produk *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Harga (Rp) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Harga Asli (Rp) (Opsional)</Label>
                  <Input
                    id="originalPrice"
                    name="originalPrice"
                    type="number"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">Isi jika produk sedang diskon</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Stok *</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Checkbox
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleCheckboxChange("featured", checked)}
                    />
                    <span>Tampilkan sebagai Produk Unggulan</span>
                  </Label>
                  <p className="text-xs text-muted-foreground ml-6">
                    Produk unggulan akan ditampilkan di halaman utama
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Product Details */}
            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="weight">Berat (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.01"
                    value={formData.weight}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dimensions">Dimensi (p x l x t cm)</Label>
                  <Input
                    id="dimensions"
                    name="dimensions"
                    placeholder="contoh: 20 x 15 x 10"
                    value={formData.dimensions}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manufacturer">Produsen</Label>
                  <Input
                    id="manufacturer"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productionDate">Tanggal Produksi</Label>
                  <Input
                    id="productionDate"
                    name="productionDate"
                    type="date"
                    value={formData.productionDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shelfLife">Masa Simpan</Label>
                  <Input
                    id="shelfLife"
                    name="shelfLife"
                    placeholder="contoh: 2 tahun"
                    value={formData.shelfLife}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Komposisi / Bahan</Label>
                <div className="space-y-3">
                  {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={ingredient}
                        onChange={(e) => handleIngredientChange(index, e.target.value)}
                        placeholder={`Bahan ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeIngredient(index)}
                        disabled={formData.ingredients.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addIngredient} className="mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Bahan
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Product Images */}
            <TabsContent value="images" className="space-y-6">
              <div className="space-y-2">
                <Label>Gambar Produk</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Label htmlFor="images" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="font-medium">Klik untuk mengunggah gambar</p>
                      <p className="text-sm text-muted-foreground">atau seret dan lepas file di sini</p>
                      <p className="text-xs text-muted-foreground mt-2">PNG, JPG, atau WEBP (Maks. 5MB)</p>
                    </div>
                  </Label>
                </div>
              </div>

              {formData.images.length > 0 && (
                <div className="space-y-2">
                  <Label>Gambar yang Diunggah</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border">
                          <img
                            src={image.preview || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1 truncate">{image.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Certifications & Quality */}
            <TabsContent value="certifications" className="space-y-6">
              <div className="space-y-2">
                <Label>Sertifikasi</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-lg p-4">
                  {certifications.map((cert) => (
                    <Label key={cert.id} className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.certifications.includes(cert.id)}
                        onCheckedChange={(checked) => handleCertificationChange(cert.id, checked)}
                      />
                      <span>{cert.name}</span>
                    </Label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Rating Kualitas</Label>
                <div className="space-y-4 border rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="organic">Kandungan Organik</Label>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Input id="organic" type="range" min="0" max="100" defaultValue="85" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="effectiveness">Efektivitas</Label>
                      <span className="text-sm font-medium">90%</span>
                    </div>
                    <Input id="effectiveness" type="range" min="0" max="100" defaultValue="90" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="safety">Keamanan</Label>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                    <Input id="safety" type="range" min="0" max="100" defaultValue="95" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" asChild>
              <Link href="/admin/products">Batal</Link>
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan Produk"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
