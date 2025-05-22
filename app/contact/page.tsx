"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Leaf,
  MessageSquare,
  CheckCircle,
  HelpCircle,
  ArrowRight,
} from "lucide-react"

export default function ContactPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Pesan terkirim",
        description: "Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda.",
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      setIsLoading(false)
    }, 1500)
  }

  const faqs = [
    {
      question: "Bagaimana cara memesan produk?",
      answer:
        "Anda dapat memesan produk dengan memilih produk yang diinginkan, menambahkannya ke keranjang, dan mengikuti proses checkout.",
    },
    {
      question: "Berapa lama waktu pengiriman?",
      answer:
        "Waktu pengiriman bervariasi tergantung lokasi Anda, biasanya antara 2-5 hari kerja untuk pengiriman reguler.",
    },
    {
      question: "Apakah semua produk tersertifikasi?",
      answer:
        "Ya, semua produk di AgroOrganik telah melalui proses sertifikasi oleh lembaga terpercaya dan memiliki rating kualitas.",
    },
    {
      question: "Bagaimana jika saya tidak puas dengan produk?",
      answer:
        "Kami memiliki kebijakan pengembalian 7 hari. Jika Anda tidak puas dengan produk, silakan hubungi kami untuk proses pengembalian.",
    },
    {
      question: "Apakah ada biaya pengiriman?",
      answer:
        "Ya, biaya pengiriman dihitung berdasarkan berat produk dan lokasi pengiriman. Gratis ongkir untuk pembelian di atas Rp500.000.",
    },
    {
      question: "Bagaimana cara menjadi mitra petani?",
      answer:
        "Untuk menjadi mitra petani, silakan hubungi kami melalui formulir kontak dengan subjek 'Kerjasama' atau kirim email ke partnership@agroorganik.com.",
    },
  ]

  return (
    <main className="flex-1 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center">
        {/* Background with layered design */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-green-950 via-green-900 to-green-800"></div>

          {/* Decorative patterns */}
          <div className="absolute inset-0 opacity-5">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="leaf-pattern" patternUnits="userSpaceOnUse" width="50" height="50">
                  <path
                    d="M25,0 C35,15 40,25 25,40 C10,25 15,15 25,0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
            </svg>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-green-400 opacity-10 blur-[100px]"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-yellow-400 opacity-10 blur-[100px]"></div>

          {/* Overlay image with gradient */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay">
            <Image
              src="/contact/main-banner.jpg"
              alt="Contact Us"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-green-950/80 to-green-800/60"></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center text-white space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-green-700/40 backdrop-blur-sm border border-green-500/30 rounded-full">
              <MessageSquare className="w-4 h-4 mr-2 text-green-300" />
              <span className="text-sm font-medium text-green-200">Hubungi Kami</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Kami Siap{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-yellow-300">
                Membantu
              </span>{" "}
              Anda
            </h1>

            <p className="text-lg md:text-xl text-green-100/90 leading-relaxed max-w-2xl mx-auto">
              Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan atau membutuhkan bantuan terkait produk
              agroorganik dan biopestisida.
            </p>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="space-y-10">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
                  <Leaf className="w-4 h-4 mr-2" />
                  Informasi Kontak
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Hubungi Kami</h2>
                <p className="text-gray-600 max-w-md">
                  Hubungi kami melalui informasi di bawah ini atau isi formulir kontak. Tim kami siap membantu Anda
                  dengan segala pertanyaan.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  {
                    icon: MapPin,
                    title: "Alamat",
                    content: "Jl. Agro Organik No. 123, Bogor, Jawa Barat, Indonesia",
                    color: "from-green-500 to-green-600",
                  },
                  {
                    icon: Phone,
                    title: "Telepon",
                    content: "+62 812 3456 7890",
                    color: "from-blue-500 to-blue-600",
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    content: "info@agroorganik.com",
                    color: "from-yellow-500 to-yellow-600",
                  },
                  {
                    icon: Clock,
                    title: "Jam Operasional",
                    content: (
                      <>
                        <p>Senin - Jumat: 08.00 - 17.00</p>
                        <p>Sabtu: 09.00 - 15.00</p>
                        <p>Minggu: Tutup</p>
                      </>
                    ),
                    color: "from-purple-500 to-purple-600",
                  },
                ].map((item, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`bg-gradient-to-br ${item.color} p-4 rounded-2xl text-white`}>
                          <item.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                          <div className="text-gray-600">{item.content}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="pt-6">
                <h3 className="font-semibold text-lg mb-4">Ikuti Kami</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, href: "#", label: "Facebook" },
                    { icon: Instagram, href: "#", label: "Instagram" },
                    { icon: Twitter, href: "#", label: "Twitter" },
                    { icon: Youtube, href: "#", label: "Youtube" },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-full hover:shadow-md transition-shadow duration-300"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5 text-green-600" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-green-100 relative overflow-hidden">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-100/40 to-green-200/20 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>

                <div className="relative">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
                    <Send className="w-4 h-4 mr-2" />
                    Formulir Kontak
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight mb-6">Kirim Pesan</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-base">
                          Nama Lengkap
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="rounded-xl border-green-200 focus:border-green-500 h-12"
                          placeholder="Masukkan nama lengkap"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-base">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="rounded-xl border-green-200 focus:border-green-500 h-12"
                          placeholder="Masukkan alamat email"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-base">
                          Nomor Telepon (Opsional)
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="rounded-xl border-green-200 focus:border-green-500 h-12"
                          placeholder="Masukkan nomor telepon"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-base">
                          Subjek
                        </Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) => handleSelectChange("subject", value)}
                        >
                          <SelectTrigger
                            id="subject"
                            className="rounded-xl border-green-200 focus:border-green-500 h-12"
                          >
                            <SelectValue placeholder="Pilih subjek" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">Pertanyaan Umum</SelectItem>
                            <SelectItem value="product">Informasi Produk</SelectItem>
                            <SelectItem value="order">Status Pesanan</SelectItem>
                            <SelectItem value="partnership">Kerjasama</SelectItem>
                            <SelectItem value="other">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-base">
                        Pesan
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="rounded-xl border-green-200 focus:border-green-500 resize-none"
                        placeholder="Tulis pesan Anda di sini..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl h-12 text-base"
                      disabled={isLoading}
                    >
                      {isLoading ? "Mengirim..." : "Kirim Pesan"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full opacity-20 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200 rounded-full opacity-20 blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              Lokasi
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Temukan Kami</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kunjungi kantor kami untuk konsultasi langsung dengan tim ahli kami atau untuk melihat produk-produk
              organik berkualitas.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-green-100 bg-white">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100/40 to-green-200/20 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>

            <div className="relative aspect-[21/9] w-full overflow-hidden">
              {/* Placeholder for map - replace with actual map implementation */}
              <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <p className="text-green-800 font-medium text-lg">Peta Lokasi AgroOrganik</p>
                  <p className="text-gray-600">Jl. Agro Organik No. 123, Bogor, Jawa Barat, Indonesia</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white">
              <div className="flex flex-wrap gap-4 justify-center">
                <Badge className="bg-green-100 text-green-800 px-3 py-1 text-sm rounded-full">Parkir Tersedia</Badge>
                <Badge className="bg-green-100 text-green-800 px-3 py-1 text-sm rounded-full">
                  Akses Transportasi Umum
                </Badge>
                <Badge className="bg-green-100 text-green-800 px-3 py-1 text-sm rounded-full">Toko Fisik</Badge>
                <Badge className="bg-green-100 text-green-800 px-3 py-1 text-sm rounded-full">
                  Konsultasi Langsung
                </Badge>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full px-6">
              Dapatkan Petunjuk Arah <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Temukan jawaban untuk pertanyaan umum tentang produk, pengiriman, dan layanan kami.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-green-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <AccordionTrigger className="px-6 py-4 text-left font-medium text-lg hover:no-underline hover:text-green-700">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="flex gap-3 text-gray-600">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p>{faq.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">Masih punya pertanyaan lain?</p>
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full px-6">
                Hubungi Tim Kami <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-green-200 rounded-full opacity-20 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-yellow-200 rounded-full opacity-20 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-green-900 to-green-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-8 md:p-12 relative">
              {/* Decorative patterns */}
              <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="leaf-pattern-small" patternUnits="userSpaceOnUse" width="30" height="30">
                      <path
                        d="M15,0 C25,10 20,15 15,25 C10,15 5,10 15,0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#leaf-pattern-small)" />
                </svg>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-white">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-green-100 text-sm font-medium mb-4">
                    <Leaf className="w-4 h-4 mr-2" />
                    Newsletter
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight mb-4">Dapatkan Kabar Terbaru</h2>
                  <p className="text-green-100/90 mb-6">
                    Berlangganan newsletter kami untuk mendapatkan informasi terbaru tentang produk, tips pertanian
                    organik, dan promo eksklusif.
                  </p>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <p className="text-green-100">Artikel tentang pertanian organik</p>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <p className="text-green-100">Tips dan trik dari para ahli</p>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                    <p className="text-green-100">Promo dan diskon eksklusif</p>
                  </div>
                </div>

                <div>
                  <form className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="newsletter-name" className="text-white">
                          Nama
                        </Label>
                        <Input
                          id="newsletter-name"
                          placeholder="Masukkan nama Anda"
                          className="bg-white/20 border-white/30 text-white placeholder:text-white/50 rounded-xl focus:border-green-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newsletter-email" className="text-white">
                          Email
                        </Label>
                        <Input
                          id="newsletter-email"
                          type="email"
                          placeholder="Masukkan email Anda"
                          className="bg-white/20 border-white/30 text-white placeholder:text-white/50 rounded-xl focus:border-green-300"
                        />
                      </div>
                      <Button className="w-full bg-white text-green-800 hover:bg-green-100 rounded-xl">
                        Berlangganan
                      </Button>
                    </div>
                    <p className="text-xs text-green-100/70 mt-4 text-center">
                      Dengan berlangganan, Anda menyetujui kebijakan privasi kami.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
