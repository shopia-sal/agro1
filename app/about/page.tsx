import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  Users,
  Leaf,
  Shield,
  Globe,
  Award,
  Heart,
  ChevronRight,
  ArrowRight,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  Star,
  Sprout,
  Zap,
  Sparkles,
} from "lucide-react"

export default function AboutPage() {
  const milestones = [
    {
      year: "2020",
      title: "Awal Mula",
      description: "AgroOrganik didirikan oleh sekelompok petani dan ahli pertanian yang peduli dengan keberlanjutan.",
    },
    {
      year: "2021",
      title: "Pertumbuhan",
      description: "Bermitra dengan 50+ petani lokal dan memperluas jangkauan ke 10 provinsi di Indonesia.",
    },
    {
      year: "2022",
      title: "Inovasi",
      description: "Meluncurkan sistem sertifikasi dan rating kualitas untuk semua produk di platform.",
    },
    {
      year: "2023",
      title: "Ekspansi",
      description: "Mencapai 10.000+ pelanggan dan memperluas kategori produk ke peralatan pertanian organik.",
    },
  ]

  const stats = [
    { value: "100+", label: "Petani Mitra", icon: Users },
    { value: "500+", label: "Produk Organik", icon: Leaf },
    { value: "10K+", label: "Pelanggan Puas", icon: Heart },
    { value: "15+", label: "Provinsi Terjangkau", icon: Globe },
  ]

  const values = [
    {
      icon: Leaf,
      title: "Keberlanjutan",
      description:
        "Kami berkomitmen untuk mempromosikan praktik pertanian yang berkelanjutan dan ramah lingkungan untuk generasi mendatang.",
    },
    {
      icon: Shield,
      title: "Transparansi",
      description:
        "Kami percaya pada transparansi dalam setiap aspek bisnis kami, dari sumber produk hingga proses sertifikasi.",
    },
    {
      icon: Award,
      title: "Kualitas",
      description:
        "Kami hanya menawarkan produk berkualitas tinggi yang telah melalui proses seleksi dan sertifikasi ketat.",
    },
    {
      icon: Users,
      title: "Komunitas",
      description: "Kami membangun komunitas yang mendukung pertanian organik dan gaya hidup berkelanjutan.",
    },
  ]

  const team = [
    {
      name: "Ahmad Fauzi",
      role: "Pendiri & CEO",
      image: "/placeholder.svg?height=300&width=300&text=AF",
      bio: "Berpengalaman 15 tahun di bidang pertanian organik dan manajemen agribisnis.",
      social: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
      },
    },
    {
      name: "Siti Rahayu",
      role: "Kepala Operasional",
      image: "/placeholder.svg?height=300&width=300&text=SR",
      bio: "Ahli dalam manajemen rantai pasok dan pengembangan bisnis berkelanjutan.",
      social: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
      },
    },
    {
      name: "Budi Santoso",
      role: "Ahli Pertanian",
      image: "/placeholder.svg?height=300&width=300&text=BS",
      bio: "Doktor di bidang pertanian organik dengan fokus pada biopestisida alami.",
      social: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
      },
    },
    {
      name: "Dewi Lestari",
      role: "Manajer Kualitas",
      image: "/placeholder.svg?height=300&width=300&text=DL",
      bio: "Spesialis sertifikasi organik dengan pengalaman di berbagai lembaga sertifikasi.",
      social: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
      },
    },
  ]

  const certifications = [
    {
      name: "Organik Indonesia",
      logo: "/placeholder.svg?height=80&width=160&text=Organik+Indonesia",
      description: "Sertifikasi nasional untuk produk pertanian organik di Indonesia.",
    },
    {
      name: "Sucofindo",
      logo: "/placeholder.svg?height=80&width=160&text=Sucofindo",
      description: "Lembaga inspeksi, pengawasan, pengujian, dan sertifikasi di Indonesia.",
    },
    {
      name: "BPOM",
      logo: "/placeholder.svg?height=80&width=160&text=BPOM",
      description: "Badan Pengawas Obat dan Makanan yang menjamin keamanan produk.",
    },
    {
      name: "Kementerian Pertanian",
      logo: "/placeholder.svg?height=80&width=160&text=Kementerian+Pertanian",
      description: "Sertifikasi resmi dari Kementerian Pertanian Republik Indonesia.",
    },
  ]

  return (
    <main className="flex-1 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center">
        {/* Background with layered design */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-green-950 via-green-900 to-green-800"></div>


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

          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-green-400 opacity-10 blur-[100px]"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-yellow-400 opacity-10 blur-[100px]"></div>


          <div className="absolute inset-0 bg-gradient-to-r from-green-950/80 to-green-800/60"></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-green-700/40 backdrop-blur-sm border border-green-500/30 rounded-full">
                <Leaf className="w-4 h-4 mr-2 text-green-300" />
                <span className="text-sm font-medium text-green-200">Sejak 2020</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                Membangun Masa Depan <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-yellow-300">
                  Pertanian Organik
                </span>{" "}
                Indonesia
              </h1>

              <p className="text-lg md:text-xl text-green-100/90 leading-relaxed max-w-xl">
                Marketplace khusus produk agroorganik dan biopestisida lokal dengan sertifikasi dan rating kualitas dari
                lembaga terpercaya untuk hasil pertanian yang lebih sehat dan berkelanjutan.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-full px-8 shadow-lg shadow-green-900/30"
                >
                  Jelajahi Produk <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-400 text-green-200 hover:bg-green-700/30 rounded-full px-8"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Main circular container */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-green-500/20 to-green-800/20 border border-green-500/10 flex items-center justify-center shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=500&width=500&text=Organic+Farming"
                    alt="Pertanian Organik"
                    width={400}
                    height={400}
                    className="object-contain p-8 rounded-full"
                  />
                </div>

                <div className="absolute top-0 left-0 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-xl transform -translate-x-1/4 -translate-y-1/4 w-32 h-32 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <Sprout className="h-8 w-8 text-green-600" />
                  </div>
                  <span className="text-xs text-white font-medium">Organik</span>
                </div>

                <div className="absolute bottom-0 right-0 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-xl transform translate-x-1/4 translate-y-1/4 w-32 h-32 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                    <Shield className="h-8 w-8 text-yellow-600" />
                  </div>
                  <span className="text-xs text-white font-medium">Tersertifikasi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

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

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-sm border border-green-100 hover:shadow-md transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-200/40 to-green-300/20 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>

                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                    {stat.icon && <stat.icon className="h-7 w-7 text-white" />}
                  </div>
                  <h3 className="text-3xl font-bold text-green-800 mb-1">{stat.value}</h3>
                  <p className="text-green-700">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Tabs Section */}
      <section className="py-24 bg-gradient-to-b from-white to-green-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-4">
              <Sparkles className="w-4 h-4 mr-2 text-green-600" />
              <span className="text-sm font-medium text-green-800">Tentang Kami</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Mengenal Lebih Dekat <span className="text-green-600">AgroOrganik</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pelajari perjalanan kami dalam membangun ekosistem pertanian organik yang berkelanjutan di Indonesia.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="story" className="w-full">
              <TabsList className="grid grid-cols-3 mb-12 bg-green-100/50 p-1.5 rounded-full">
                <TabsTrigger
                  value="story"
                  className="text-base py-3 rounded-full data-[state=active]:bg-white data-[state=active]:text-green-800 data-[state=active]:shadow-sm"
                >
                  Cerita Kami
                </TabsTrigger>
                <TabsTrigger
                  value="mission"
                  className="text-base py-3 rounded-full data-[state=active]:bg-white data-[state=active]:text-green-800 data-[state=active]:shadow-sm"
                >
                  Misi & Visi
                </TabsTrigger>
                <TabsTrigger
                  value="journey"
                  className="text-base py-3 rounded-full data-[state=active]:bg-white data-[state=active]:text-green-800 data-[state=active]:shadow-sm"
                >
                  Perjalanan
                </TabsTrigger>
              </TabsList>

              <TabsContent value="story" className="mt-0">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl">
                    <Image
                      src="/placeholder.svg?height=600&width=600&text=Cerita+Kami"
                      alt="Tim AgroOrganik"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <Badge className="bg-yellow-500 text-white mb-3 px-3 py-1">Didirikan 2020</Badge>
                      <h3 className="text-2xl font-bold text-white">Dari Petani untuk Petani</h3>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-6 text-green-800">
                      Berawal dari Kepedulian terhadap Pertanian Berkelanjutan
                    </h3>
                    <div className="space-y-4 text-gray-600">
                      <p>
                        AgroOrganik didirikan pada tahun 2020 oleh sekelompok petani dan ahli pertanian yang peduli
                        dengan keberlanjutan dan kesehatan lingkungan. Kami melihat adanya kesenjangan antara produsen
                        produk pertanian organik lokal yang berkualitas dengan konsumen yang mencari produk-produk
                        tersebut.
                      </p>
                      <p>
                        Visi kami adalah menjadi platform terdepan yang menghubungkan petani dan produsen lokal dengan
                        konsumen yang peduli akan kesehatan dan lingkungan. Kami berkomitmen untuk menyediakan produk
                        agroorganik dan biopestisida berkualitas tinggi yang telah tersertifikasi oleh lembaga
                        terpercaya.
                      </p>
                      <p>
                        Melalui AgroOrganik, kami tidak hanya menyediakan marketplace, tetapi juga membangun ekosistem
                        pertanian organik yang berkelanjutan di Indonesia. Kami bekerja sama dengan petani lokal,
                        lembaga sertifikasi, dan komunitas pertanian untuk memastikan produk yang kami tawarkan memenuhi
                        standar kualitas tertinggi.
                      </p>
                    </div>
                    <Button className="mt-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full px-6 py-6 shadow-md">
                      Baca Selengkapnya <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mission" className="mt-0">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-6 text-green-800">
                      Misi dan Visi yang Menginspirasi Kami
                    </h3>
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-3xl border border-green-200/50 shadow-sm">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mr-3">
                            <Zap className="h-5 w-5 text-green-700" />
                          </div>
                          <h4 className="text-xl font-semibold text-green-800">Visi</h4>
                        </div>
                        <p className="text-gray-700">
                          Menjadi platform terdepan yang menghubungkan petani dan produsen lokal dengan konsumen yang
                          peduli akan kesehatan dan lingkungan, serta menjadi katalisator pertanian organik
                          berkelanjutan di Indonesia.
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-3xl border border-green-200/50 shadow-sm">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mr-3">
                            <Star className="h-5 w-5 text-green-700" />
                          </div>
                          <h4 className="text-xl font-semibold text-green-800">Misi</h4>
                        </div>
                        <ul className="space-y-4">
                          {[
                            "Menyediakan akses ke produk pertanian organik berkualitas tinggi bagi semua orang",
                            "Memberdayakan petani lokal melalui pelatihan, pendampingan, dan akses pasar",
                            "Memastikan transparansi dan kualitas melalui sistem sertifikasi dan rating",
                            "Mengedukasi masyarakat tentang manfaat pertanian organik dan berkelanjutan",
                          ].map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="mt-1 bg-green-200 p-1 rounded-full">
                                <CheckCircle className="h-4 w-4 text-green-700" />
                              </div>
                              <p className="text-gray-700">{item}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((num) => (
                      <div
                        key={num}
                        className="aspect-square rounded-3xl overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
                      >
                        <Image
                          src={`/placeholder.svg?height=300&width=300&text=Misi+${num}`}
                          alt={`Misi AgroOrganik ${num}`}
                          width={300}
                          height={300}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="journey" className="mt-0">
                <div className="relative pb-12">
                  {/* Timeline line */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-300 to-green-500 rounded-full" />

                  {milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className={`relative flex flex-col md:flex-row gap-8 mb-16 ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div className="md:w-1/2 flex md:justify-end">
                        <div
                          className={`bg-white p-8 rounded-3xl shadow-lg ${
                            index % 2 === 0 ? "border-l-[6px] border-green-500" : "border-l-[6px] border-yellow-500"
                          } max-w-md hover:shadow-xl transition-shadow duration-300`}
                        >
                          <Badge
                            className={`${
                              index % 2 === 0
                                ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                                : "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
                            } mb-3 px-3 py-1`}
                          >
                            {milestone.year}
                          </Badge>
                          <h3 className="text-xl font-bold mb-3 text-gray-900">{milestone.title}</h3>
                          <p className="text-gray-600">{milestone.description}</p>
                        </div>
                      </div>

                      <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                        <div
                          className={`w-8 h-8 rounded-full border-4 ${
                            index % 2 === 0 ? "border-green-500 bg-white" : "border-yellow-500 bg-white"
                          } shadow-md z-10`}
                        />
                      </div>

                      <div className="md:w-1/2" />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full opacity-20 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200 rounded-full opacity-20 blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-4">
              <Leaf className="w-4 h-4 mr-2 text-green-600" />
              <span className="text-sm font-medium text-green-800">Nilai-Nilai Kami</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Prinsip yang <span className="text-green-600">Mendasari</span> Langkah Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nilai-nilai ini menjadi fondasi dalam setiap keputusan dan langkah yang kami ambil untuk membangun
              ekosistem pertanian organik yang berkelanjutan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-3xl shadow-md border border-green-100 hover:shadow-xl hover:border-green-200 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100/40 to-green-200/20 rounded-full transform translate-x-1/3 -translate-y-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-md transition-all duration-300">
                    {value.icon && <value.icon className="h-8 w-8 text-green-600" />}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-green-800">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-4">
              <Users className="w-4 h-4 mr-2 text-green-600" />
              <span className="text-sm font-medium text-green-800">Tim Kami</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Bertemu dengan <span className="text-green-600">Para Ahli</span> di Balik AgroOrganik
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tim berdedikasi yang bersemangat untuk mendukung pertanian organik dan berkelanjutan di Indonesia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl">
                  <div className="relative h-96 overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-base mb-6">{member.bio}</p>
                      <div className="flex gap-4">
                        <Link
                          href={member.social.instagram}
                          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                        >
                          <Instagram className="h-5 w-5" />
                        </Link>
                        <Link
                          href={member.social.facebook}
                          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                        >
                          <Facebook className="h-5 w-5" />
                        </Link>
                        <Link
                          href={member.social.twitter}
                          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                        >
                          <Twitter className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-green-800 mb-1">{member.name}</h3>
                    <p className="text-green-600">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-white to-green-50 relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-yellow-200 rounded-full opacity-20 blur-3xl"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-4">
              <Award className="w-4 h-4 mr-2 text-green-600" />
              <span className="text-sm font-medium text-green-800">Mitra Kami</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Lembaga <span className="text-green-600">Sertifikasi</span> Terpercaya
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kami bekerja sama dengan lembaga sertifikasi terpercaya untuk memastikan kualitas produk yang kami
              tawarkan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-3xl shadow-md border border-green-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100/40 to-green-200/20 rounded-full transform translate-x-1/3 -translate-y-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="h-28 flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 bg-green-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Image
                    src={cert.logo || "/placeholder.svg"}
                    alt={cert.name}
                    width={160}
                    height={80}
                    className="object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-lg font-bold mb-3 text-green-800">{cert.name}</h3>
                <p className="text-gray-600 text-sm">{cert.description}</p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-green-800"></div>

          <div className="absolute inset-0 opacity-5">
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


          <div className="absolute inset-0 bg-gradient-to-r from-green-950/80 to-green-800/60"></div>

          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-green-400 opacity-10 blur-[100px]"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-yellow-400 opacity-10 blur-[100px]"></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center px-4 py-2 bg-green-700/40 backdrop-blur-sm border border-green-500/30 rounded-full mb-6">
                <Leaf className="w-4 h-4 mr-2 text-green-300" />
                <span className="text-sm font-medium text-green-200">Bergabung dengan Kami</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Jadilah Bagian dari Gerakan{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-yellow-300">
                  Pertanian Organik
                </span>
              </h2>

              <p className="text-lg text-green-100/90 mb-8 max-w-xl">
                Temukan produk berkualitas tinggi atau daftarkan produk Anda di AgroOrganik. Bersama-sama, kita dapat
                membangun masa depan pertanian yang lebih sehat dan berkelanjutan.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-full px-8 shadow-lg shadow-green-900/30"
                >
                  Jelajahi Produk <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-400 text-[#044a17] hover:bg-green-700/30 rounded-full px-8"
                >
                  Hubungi Kami
                </Button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-8">Hubungi Kami</h3>
              <div className="space-y-6 text-green-50">
                {[
                  { icon: MapPin, title: "Alamat", content: "Jl. Agro Organik No. 123, Bogor, Jawa Barat, Indonesia" },
                  { icon: Mail, title: "Email", content: "info@agroorganik.com" },
                  { icon: Phone, title: "Telepon", content: "+62 812 3456 7890" },
                  { icon: Calendar, title: "Jam Operasional", content: "Senin - Jumat: 08.00 - 17.00 WIB" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-green-500/30 to-green-600/30 p-4 rounded-2xl">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-green-200">{item.title}</h4>
                      <p>{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
