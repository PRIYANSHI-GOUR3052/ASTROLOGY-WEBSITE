
export function Statistics() {
  const stats = [
    {
      value: "150k+",
      label: 'Kundli Served',
    },
    {
      value: "40+",
      label: "Years Of Legacy",
    },
    {
      value: "100k+",
      label: 'Consultations Given',
    },
    {
      value: "20+",
      label: 'Awards in Occult',
    }
  ];

  return (
    <section className="w-full py-8 md:py-16" style={{ backgroundColor: '#F5F5DC' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-row justify-between items-center gap-2 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center flex-1">
              <div className="text-2xl md:text-4xl lg:text-6xl font-bold text-green-800 mb-1 md:mb-2" 
                   style={{ fontFamily: 'Inter, sans-serif' }}>
                {stat.value}
              </div>
              <p className="text-xs md:text-sm lg:text-base text-green-700 font-medium uppercase tracking-wide leading-tight"
                 style={{ fontFamily: 'Inter, sans-serif' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
