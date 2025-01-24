export function Statistics() {
  const stats = [
    {
      value: "200k",
      label: "Kundli Served",
      subLabel: "कुंडली सेवा"
    },
    {
      value: "50+",
      label: "Year's Of Legacy",
      subLabel: "वर्षों की विरासत"
    },
    {
      value: "100k+",
      label: "Consultations Given",
      subLabel: "परामर्श दिए गए"
    },
    {
      value: "20+",
      label: "Awards in the field of Occult",
      subLabel: "गूढ़ विद्या के क्षेत्र में पुरस्कार"
    }
  ]

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cosmic-purple/30 to-celestial-blue/30 rounded-3xl"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-lavender flex flex-col items-center justify-center p-4 transform hover:scale-105 transition-transform">
                <span className="text-4xl font-bold text-cosmic-purple mb-2">{stat.value}</span>
                <span className="text-base text-center text-midnight-blue font-medium">{stat.label}</span>
                <span className="text-sm text-center text-midnight-blue/80 mt-1">{stat.subLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

