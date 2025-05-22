import type React from "react"
import { Shield, Award, BadgeCheck } from "lucide-react"

interface FeatureProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureProps) {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-green-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-green-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  )
}

export default function WhyChooseUs() {
  const features = [
    {
      icon: <BadgeCheck className="h-8 w-8 text-green-600" />,
      title: "Produk Tersertifikasi",
      description: "Semua produk telah melalui proses sertifikasi ketat dari lembaga terpercaya.",
    },
    {
      icon: <Award className="h-8 w-8 text-green-600" />,
      title: "Kualitas Terjamin",
      description: "Rating kualitas transparan dari lembaga independen untuk setiap produk.",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Produk Lokal Berkualitas",
      description: "Mendukung petani dan produsen lokal dengan produk unggulan.",
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-80 z-0"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20')] bg-repeat opacity-5 z-0"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-800 font-medium text-sm rounded-full mb-3">
            Keunggulan Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mengapa Memilih <span className="text-green-600">AgroOrganik</span>?
          </h2>
          <p className="text-lg text-gray-600">
            Kami berkomitmen menyediakan produk organik terbaik dengan standar kualitas tertinggi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center p-1 rounded-lg bg-white shadow-md">
            <div className="flex items-center space-x-1 px-4 py-2 bg-green-100 rounded-md">
              <span className="text-green-800 font-medium">100%</span>
            </div>
            <div className="px-4 py-2 text-gray-700">Organik</div>
            <div className="px-4 py-2 text-gray-700">Tersertifikasi</div>
            <div className="px-4 py-2 text-gray-700">Berkualitas</div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-green-200 opacity-20 z-0"></div>
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-green-300 opacity-10 z-0"></div>
    </section>
  )
}
