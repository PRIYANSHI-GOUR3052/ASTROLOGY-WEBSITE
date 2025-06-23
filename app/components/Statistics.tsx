import Image from 'next/image'; 

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
  ];

  return (
    <section 
      className="py-16 rounded-3xl text-white relative overflow-hidden"
      style={{
        background: '#000', // Background changed to black
      }}
    >
      <div className="px-8 md:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <span className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#a084ee] to-[#f857a6] bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="text-base text-center font-medium text-white">
                {stat.label}
              </span>
              <span className="text-sm text-center text-white/80 mt-1">
                {stat.subLabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
