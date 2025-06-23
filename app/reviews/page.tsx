import { Testimonials } from '../components/Testimonials';

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-indigo-900 mb-12 drop-shadow-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
          Client Reviews & Testimonials
        </h1>
        <Testimonials />
      </div>
    </main>
  );
} 