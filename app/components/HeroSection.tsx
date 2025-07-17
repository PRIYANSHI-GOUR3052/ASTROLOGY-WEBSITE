import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Example images (replace with your own Cloudinary/local images as needed)
const productImg = 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80';
const serviceImg = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80';
const profile1 = 'https://randomuser.me/api/portraits/men/32.jpg';
const profile2 = 'https://randomuser.me/api/portraits/women/44.jpg';
const profile3 = 'https://randomuser.me/api/portraits/men/54.jpg';

// Card Components with fixed sizes
const LogoCard = () => (
  <div className="card logo-card bg-[#F4C542] rounded-2xl transition-transform hover:scale-105 w-full h-full min-h-[330px] min-w-[210px] overflow-hidden relative aspect-square">
    <Image
      src="https://res.cloudinary.com/dxwspucxw/image/upload/v1752049127/gemstones_wztxzb.jpg"
      alt="Gemstone Powers"
      fill
      style={{ objectFit: 'cover' }}
      className="rounded-2xl"
      priority
    />
  </div>
);

const PostTaskCard = () => (
  <div className="card post-task-card bg-[#B3D0FF] rounded-2xl transition-transform hover:scale-105 w-full h-full min-h-[180px] min-w-[290px] overflow-hidden relative aspect-square">
    <Image
      src="https://res.cloudinary.com/dxwspucxw/image/upload/v1752042873/cosmiccalendar_v8ndoq.png"
      alt="Cosmic Calendar"
      fill
      style={{ objectFit: 'cover' }}
      className="rounded-2xl"
      priority
    />
  </div>
);

const IconCard = () => (
  <div className="card icon-card bg-[#FF7F3F] rounded-2xl transition-transform hover:scale-105 w-full h-full min-h-[180px] min-w-[210px] overflow-hidden relative aspect-square">
    <Image
      src="https://res.cloudinary.com/dxwspucxw/image/upload/v1752042879/zodiac_decoder_aphuoz.avif"
      alt="Zodiac Decoder"
      fill
      style={{ objectFit: 'cover' }}
      className="rounded-2xl"
      priority
    />
  </div>
);

const CenterImageCard = () => (
  <div className="card center-image-card bg-[#F7B7D7] rounded-2xl transition-transform hover:scale-105 w-full h-full min-h-[180px] min-w-[290px] overflow-hidden relative aspect-square">
    <Image
      src="https://res.cloudinary.com/dxwspucxw/image/upload/v1752042871/astrowellness_qltouz.jpg"
      alt="Astro Wellness"
      fill
      style={{ objectFit: 'cover' }}
      className="rounded-2xl"
      priority
    />
  </div>
);

const ProfileCard = () => (
  <div className="card profile-card bg-[#5B2A00] rounded-2xl p-4 mx-2 transition-transform hover:scale-105 w-full h-full min-h-[300px] min-w-[210px] overflow-hidden relative aspect-square">
    <Image
      src="https://res.cloudinary.com/dxwspucxw/image/upload/v1752042872/birth_chart_mockup_beesbo.jpg"
      alt="Profile Card"
      fill
      style={{ objectFit: 'cover' }}
      className="rounded-2xl"
      priority
    />
  </div>
);

const PriceCard = () => (
  <div className="card price-card bg-[#5B2A00] rounded-2xl transition-transform hover:scale-105 w-full h-full min-h-[180px] min-w-[210px] overflow-hidden relative aspect-square">
    <Image
      src="https://res.cloudinary.com/dxwspucxw/image/upload/v1752042872/course-1_lwqxsr.jpg"
      alt="Astrology Course"
      fill
      style={{ objectFit: 'cover' }}
      className="rounded-2xl"
      priority
    />
  </div>
);

const ServiceListCard = () => (
  <div className="card service-list-card bg-[#D6E86A] rounded-2xl transition-transform hover:scale-105 w-full h-full min-h-[180px] min-w-[210px] overflow-hidden relative aspect-square">
    <Image
      src="https://res.cloudinary.com/dxwspucxw/image/upload/v1752042872/course-3_h9xwl3.jpg"
      alt="Numerology Course"
      fill
      style={{ objectFit: 'cover' }}
      className="rounded-2xl"
      priority
    />
  </div>
);

const SloganCard = () => (
  <div className="card slogan-card bg-[#F4C542] rounded-2xl transition-transform hover:scale-105 w-full h-full min-h-[320px] min-w-[500px] overflow-hidden relative aspect-square">
    <Image
      src="https://res.cloudinary.com/dxwspucxw/image/upload/v1752042876/myth_h93fku.jpg"
      alt="Myth Legend"
      fill
      style={{ objectFit: 'cover' }}
      className="rounded-2xl"
      priority
    />
  </div>
);

const BlankCard = () => (
  <div className="card blank-card bg-[#F3F1EB] rounded-2xl"></div>
);

// Main Grid Layout with improved spans and sizing
export function HeroSection() {
  return (
    <section className="w-full flex justify-center items-center bg-white py-0 mt-[-32px]">
      <div className="flex justify-center w-full">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-3xl shadow-lg mx-auto max-w-5xl w-full overflow-hidden bg-white p-12"
        >
          {/* Top left: Logo */}
          <div style={{ gridColumn: '1', gridRow: '1 / span 2' }}><LogoCard /></div>
          {/* Top right: Post your task (taller) */}
          <div style={{ gridColumn: '2', gridRow: '1' }}><PostTaskCard /></div>
          {/* Middle right: Pink card, starts where post task ends, taller */}
          <div style={{ gridColumn: '2', gridRow: '2' }}><CenterImageCard /></div>
          {/* Top/mid left: Icon card, same height as pink card */}
          <div style={{ gridColumn: '1', gridRow: '3' }}><IconCard /></div>
          {/* Bottom left: Price card, same height as green card */}
          <div style={{ gridColumn: '1', gridRow: '3' }}><PriceCard /></div>
          {/* Bottom middle: Service list, same height as price card */}
          <div style={{ gridColumn: '2', gridRow: '3' }}><ServiceListCard /></div>
          {/* Right: Profile cards (taller, wider) */}
          <div style={{ gridColumn: '3', gridRow: '1 / span 2', display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'stretch', justifyContent: 'center' }}>
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
          </div>
          {/* Bottom right: Slogan card, larger */}
          <div style={{ gridColumn: '3', gridRow: '3' }}><SloganCard /></div>
        </div>
      </div>
    </section>
  );
} 