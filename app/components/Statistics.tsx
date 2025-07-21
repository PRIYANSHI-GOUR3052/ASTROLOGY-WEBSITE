
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
    <section className="w-full py-16" style={{ backgroundColor: '#F5F5DC' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-6xl font-bold text-green-800 mb-2" 
                   style={{ fontFamily: 'Inter, sans-serif' }}>
                {stat.value}
              </div>
              <p className="text-sm md:text-base text-green-700 font-medium uppercase tracking-wide"
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
