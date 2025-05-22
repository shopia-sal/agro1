import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Leaf, Tag, CircleDollarSign, ChevronDown, ChevronUp, X, RefreshCw, ShieldCheck } from 'lucide-react'

export default function FilterSidebar({
  categories,
  certifications,
  selectedCategories,
  selectedCertifications,
  priceRange,
  setPriceRange,
  handleCategoryChange,
  handleCertificationChange,
  clearAllFilters,
  maxPrice = 1000000,
  className = "",
}) {
  const [openSections, setOpenSections] = useState({
    categories: true,
    certifications: true,
    price: true,
  })

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const activeFiltersCount =
    selectedCategories.length +
    selectedCertifications.length +
    (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0)

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with filter count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-green-100 p-2 rounded-full">
            <Tag className="h-5 w-5 text-green-700" />
          </div>
          <h3 className="text-lg font-semibold">Filter Produk</h3>
          {activeFiltersCount > 0 && (
            <Badge className="bg-green-600 hover:bg-green-700 ml-2">{activeFiltersCount}</Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-green-700 hover:text-green-800 hover:bg-green-50 h-8 gap-1"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset
          </Button>
        )}
      </div>

      {/* Active filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-1.5 pb-3">
          {selectedCategories.map((catId) => {
            const category = categories.find((c) => c.id === catId)
            return (
              <Badge
                key={`cat-${catId}`}
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 py-1.5 pl-1.5 pr-1"
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full overflow-hidden bg-green-100 flex-shrink-0">
                    <Image
                      src={category?.image || "/placeholder.svg?height=16&width=16"}
                      alt=""
                      width={16}
                      height={16}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs">{category?.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 rounded-full hover:bg-green-200/50"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleCategoryChange(catId)
                    }}
                  >
                    <X className="h-2.5 w-2.5" />
                  </Button>
                </div>
              </Badge>
            )
          })}
          {selectedCertifications.map((certId) => {
            const cert = certifications.find((c) => c.id === certId)
            return (
              <Badge
                key={`cert-${certId}`}
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 py-1.5 pl-1.5 pr-1"
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full overflow-hidden bg-green-100 flex-shrink-0">
                    <Image
                      src={cert?.logo || "/placeholder.svg?height=16&width=16"}
                      alt=""
                      width={16}
                      height={16}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs">{cert?.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 rounded-full hover:bg-green-200/50"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleCertificationChange(certId)
                    }}
                  >
                    <X className="h-2.5 w-2.5" />
                  </Button>
                </div>
              </Badge>
            )
          })}
          {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 py-1.5 pl-1.5 pr-1"
            >
              <div className="flex items-center gap-1.5">
                <CircleDollarSign className="h-3.5 w-3.5 text-green-600" />
                <span className="text-xs">
                  Rp{priceRange[0].toLocaleString()} - Rp{priceRange[1].toLocaleString()}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 rounded-full hover:bg-green-200/50"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setPriceRange([0, maxPrice])
                  }}
                >
                  <X className="h-2.5 w-2.5" />
                </Button>
              </div>
            </Badge>
          )}
        </div>
      )}

      <Separator className="bg-green-100" />

      {/* Categories */}
      <Collapsible open={openSections.categories} onOpenChange={() => toggleSection("categories")}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-1.5 rounded-lg">
                <Leaf className="h-4 w-4 text-green-700" />
              </div>
              <h4 className="font-medium group-hover:text-green-700 transition-colors">Kategori</h4>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 p-0">
              {openSections.categories ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <div className="space-y-1 max-h-[240px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  selectedCategories.includes(category.id)
                    ? "bg-green-50 border-green-100"
                    : "hover:bg-gray-50"
                }`}
              >
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                  className="text-green-600 border-green-300 data-[state=checked]:bg-green-600"
                />
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={category.image || "/placeholder.svg?height=32&width=32"}
                      alt={category.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="font-medium text-sm cursor-pointer hover:text-green-700 transition-colors line-clamp-1"
                    >
                      {category.name}
                    </Label>
                    <p className="text-xs text-gray-500 line-clamp-1">{category.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator className="bg-green-100" />

      {/* Certifications */}
      <Collapsible open={openSections.certifications} onOpenChange={() => toggleSection("certifications")}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-1.5 rounded-lg">
                <ShieldCheck className="h-4 w-4 text-green-700" />
              </div>
              <h4 className="font-medium group-hover:text-green-700 transition-colors">Sertifikasi</h4>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 p-0">
              {openSections.certifications ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <div className="grid grid-cols-2 gap-2">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                  selectedCertifications.includes(cert.id)
                    ? "border-green-300 bg-green-50 shadow-sm"
                    : "border-gray-200 hover:border-green-200 hover:bg-gray-50"
                }`}
                onClick={() => handleCertificationChange(cert.id)}
              >
                <div className="relative w-10 h-10">
                  <Image
                    src={cert.logo || "/placeholder.svg?height=40&width=40"}
                    alt={cert.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  {selectedCertifications.includes(cert.id) && (
                    <div className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full p-0.5">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>
                <span className="text-xs text-center font-medium">{cert.name}</span>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator className="bg-green-100" />

      {/* Price Range */}
      <Collapsible open={openSections.price} onOpenChange={() => toggleSection("price")}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer group">
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-1.5 rounded-lg">
                <CircleDollarSign className="h-4 w-4 text-green-700" />
              </div>
              <h4 className="font-medium group-hover:text-green-700 transition-colors">Rentang Harga</h4>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 p-0">
              {openSections.price ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="bg-white border border-green-100 rounded-md px-3 py-1.5 w-[45%]">
                <div className="text-xs text-gray-500 mb-1">Minimum</div>
                <div className="font-medium">Rp{priceRange[0].toLocaleString()}</div>
              </div>
              <div className="border-t border-gray-300 w-[10%]"></div>
              <div className="bg-white border border-green-100 rounded-md px-3 py-1.5 w-[45%]">
                <div className="text-xs text-gray-500 mb-1">Maksimum</div>
                <div className="font-medium">Rp{priceRange[1].toLocaleString()}</div>
              </div>
            </div>

            <div className="px-1">
              <Slider
                defaultValue={[0, maxPrice]}
                max={maxPrice}
                step={10000}
                value={priceRange}
                onValueChange={setPriceRange}
                className="[&>span]:bg-green-600 [&>span]:h-2 [&>span]:rounded-full"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { value: 50000, label: "50rb" },
                { value: 100000, label: "100rb" },
                { value: 250000, label: "250rb" },
                { value: maxPrice, label: "Max" },
              ].map((preset) => (
                <Button
                  key={preset.value}
                  variant="outline"
                  size="sm"
                  className={`text-xs h-8 ${
                    priceRange[1] === preset.value
                      ? "bg-green-50 border-green-200 text-green-700"
                      : "border-gray-200"
                  }`}
                  onClick={() => setPriceRange([0, preset.value])}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="pt-2">
        <Button className="w-full bg-green-600 hover:bg-green-700">
          Terapkan Filter
        </Button>
      </div>
    </div>
  )
}

// Check icon component
function Check(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
