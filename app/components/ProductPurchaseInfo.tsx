import React from 'react';
import Link from 'next/link';

const ICON_COLOR = '#FFD600';
const LINE_COLOR = '#FFD600';

const policies = [
  {
    icon: (
      
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" stroke={ICON_COLOR} strokeWidth="1.5" fill="none"/><path d="M10 22h12M16 10v12" stroke={ICON_COLOR} strokeWidth="1.2"/></svg>
    ),
    title: 'SHIPPING',
    desc: (
      <ul className="list-disc ml-6 text-base" style={{fontFamily: 'Lora, Georgia, serif', color: 'black'}}>
        <li>Complimentary delivery across India</li>
        <li>Cash on Delivery available for all orders</li>
      </ul>
    ),
    link: '/shipping-policy',
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" stroke={ICON_COLOR} strokeWidth="1.5" fill="none"/><rect x="12" y="12" width="8" height="8" stroke={ICON_COLOR} strokeWidth="1.2" fill="none"/></svg>
    ),
    title: 'RETURNS',
    desc: (
      <ul className="list-disc ml-6 text-base" style={{fontFamily: 'Lora, Georgia, serif', color: 'black'}}>
        <li>7-day easy return on loose gemstones</li>
        <li>Taxes, duties, and shipping are non-refundable</li>
      </ul>
    ),
    link: '/return-policy',
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" stroke={ICON_COLOR} strokeWidth="1.5" fill="none"/><path d="M10 18l3.5 3.5L22 13" stroke={ICON_COLOR} strokeWidth="1.5" fill="none"/></svg>
    ),
    title: 'PAYMENT',
    desc: (
      <ul className="list-disc ml-6 text-base" style={{fontFamily: 'Lora, Georgia, serif', color: 'black'}}>
        <li>All major credit & debit cards accepted</li>
        <li>Net Banking & UPI available</li>
      </ul>
    ),
    link: null,
  },
];

export default function ProductPurchaseInfo() {
  return (
    <section className="w-screen flex flex-col items-center py-12" style={{background:'#F9F6F2', marginLeft:'calc(50% - 50vw)', marginRight:'calc(50% - 50vw)'}}>
      <h2 className="text-2xl md:text-3xl font-bold mb-10 text-black text-center tracking-wide uppercase" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.08em' }}>
        BEFORE YOU BUY: OUR PROMISE
      </h2>
      <div className="flex w-full max-w-none justify-between items-stretch px-0 md:px-8">
        {policies.reduce<React.ReactNode[]>((acc, p, idx) => {
          acc.push(
            <div key={p.title} className="flex flex-col items-center flex-1 min-w-0 px-8">
              <div className="flex flex-col items-center">
                {p.icon}
                <div className="mt-3 text-lg font-bold text-black tracking-wide uppercase" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.08em' }}>{p.title}</div>
                <div className="mt-2 mb-4 text-black w-full">{p.desc}</div>
                {p.link && (
                  <Link href={p.link} legacyBehavior>
                    <a className="mt-auto px-6 py-2 border border-black text-black rounded transition hover:bg-black hover:text-white text-sm font-medium" style={{minWidth:120, fontFamily: 'Inter, Montserrat, Playfair Display, Arial, sans-serif'}}>
                      Learn More
                    </a>
                  </Link>
                )}
              </div>
            </div>
          );
          if (idx < policies.length - 1) {
            acc.push(
              <div key={`sep-${idx}`} className="hidden md:flex items-center" style={{height:180, width:0, marginLeft:0, marginRight:0}}>
                <div className="h-32 border-r" style={{borderColor: LINE_COLOR, marginLeft:0, marginRight:0}} />
              </div>
            );
          }
          return acc;
        }, [])}
      </div>
    </section>
  );
} 