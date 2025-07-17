import Image from 'next/image'; 

export function Statistics() {
  const stats = [
    {
      value: "150k+",
      label: 'Kundli Served',
    },
    {
      value: "40+",
      label: "Year's Of Legacy",
    },
    {
      value: "100k+",
      label: 'Consultations Given',
    },
    {
      value: "20+",
      label: 'Awards in the field of Occult',
    }
  ];

  return (
    <section 
      className="py-16 relative overflow-hidden"
      style={{ background: 'linear-gradient(90deg, #f7f7fa 0%, #e9eafc 100%)' }}
    >
      <div className="px-8 md:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-center">
          {/* Stats */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-2 md:grid-cols-4 divide-x divide-black/10">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center px-4">
                <span className="text-6xl font-bold mb-2 text-black">
                  {stat.value}
                </span>
                <span className="text-base text-center font-medium text-black/80">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
          {/* Illustration Placeholder replaces description/CTA */}
         <div className="col-span-1 flex flex-col items-center justify-center h-full">
           <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed border-[#5fa143] bg-[#e9f5e1]">
             <span className="text-xs text-[#5fa143] font-semibold">Add GIF here</span>
           </div>
         </div>
        </div>
      </div>
    </section>
  );
}
