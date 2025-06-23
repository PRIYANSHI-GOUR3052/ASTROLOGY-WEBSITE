import Image from 'next/image';

export default function HeroTestFlorist() {
  return (
    <section className="relative w-full min-h-[70vh] flex flex-col md:flex-row items-center justify-between bg-[#fdf6f2] px-6 py-16 overflow-hidden">
      {/* Abstract shapes */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-orange-200 rounded-full opacity-60 z-0" style={{transform: 'translate(40%,-40%)'}} />
      <div className="absolute bottom-0 left-0 w-40 h-10 bg-orange-100 rounded-full opacity-60 z-0" style={{transform: 'translate(-30%,30%)'}} />
      {/* Left: Headline, description, button */}
      <div className="relative z-10 flex-1 max-w-xl flex flex-col items-start justify-center gap-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#4b2e1e] leading-tight mb-2">We are your online<br />eco florist</h1>
        <p className="text-base md:text-lg text-[#6b4c36] mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra, velit vitae placerat fringilla, arcu arcu faucibus nibh, vel venenatis odio justo eu urna. Sed viverra lacus.</p>
        <button className="px-8 py-3 rounded-lg bg-[#4b2e1e] text-white text-lg font-semibold shadow hover:bg-[#6b4c36] transition-all">Explore</button>
      </div>
      {/* Right: Image and stats */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center mt-12 md:mt-0 md:ml-12">
        <div className="relative w-80 h-96 bg-white rounded-[40px] overflow-hidden shadow-xl flex items-center justify-center">
          <Image src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" alt="Florist" fill className="object-cover" />
        </div>
        {/* Stats */}
        <div className="absolute right-[-120px] top-1/2 -translate-y-1/2 flex flex-col gap-8 text-right">
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-[#4b2e1e]">100%</div>
            <div className="text-xs text-[#6b4c36] tracking-wide">PROXIMITY<br />PRODUCTS</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-[#4b2e1e]">420+</div>
            <div className="text-xs text-[#6b4c36] tracking-wide">COLLECTION</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-extrabold text-[#4b2e1e]">1200+</div>
            <div className="text-xs text-[#6b4c36] tracking-wide">ECOLOGICAL<br />DELIVERIES</div>
          </div>
        </div>
      </div>
    </section>
  );
} 