"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Search, Filter, Star, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/playfair-display/600.css";

const API_URL = "/api/user/chatwithastrologer";

function useDynamicCardAnimation() {
  const [style, setStyle] = useState({});
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * -8;
    setStyle({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`,
      boxShadow: `0 8px 32px 0 rgba(255, 200, 80, 0.18), 0 1.5px 8px 0 rgba(80,80,120,0.10), 0 0 0 4px #ffe06633`,
      transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s cubic-bezier(.4,2,.6,1)'
    });
  }, []);
  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
      boxShadow: '',
      transition: 'transform 0.28s cubic-bezier(.4,2,.6,1), box-shadow 0.28s cubic-bezier(.4,2,.6,1)'
    });
  }, []);
  return { style, handleMouseMove, handleMouseLeave };
}

// Define the sort options
const SORT_OPTIONS = [
  { label: "Popularity", value: "popularity" },
  { label: "Experience: High to Low", value: "exp_high" },
  { label: "Experience: Low to High", value: "exp_low" },
  { label: "Total Orders: High to Low", value: "orders_high" },
  { label: "Total Orders: Low to High", value: "orders_low" },
  { label: "Price: High to Low", value: "price_high" },
  { label: "Price: Low to High", value: "price_low" },
  { label: "Rating: High to Low", value: "rating_high" },
];

// Astrologer type for fetched data
interface Astrologer {
  id: number;
  name: string;
  skills: string[];
  languages: string[];
  experience: number;
  price: number;
  rating: number;
  orders: number;
  isNew: boolean;
  img: string;
}

function AstrologerCard({ astrologer }: { astrologer: Astrologer }) {
  const { style, handleMouseMove, handleMouseLeave } = useDynamicCardAnimation();
  const { t } = useTranslation();
  const a = astrologer;
  return (
    <motion.div
      key={a.id}
      initial={{ opacity: 0, y: 60, scale: 0.92, rotateX: 12, rotateY: -12 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0 }}
      exit={{ opacity: 0, y: 60, scale: 0.92, rotateX: 12, rotateY: -12 }}
      transition={{ duration: 0.38, delay: 0, type: 'spring', stiffness: 700, damping: 32, mass: 0.7 }}
      whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(255, 200, 80, 0.18), 0 1.5px 8px 0 rgba(80,80,120,0.10), 0 0 0 4px #ffe06633' }}
      whileTap={{ scale: 0.97, rotateZ: -2 }}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="block"
    >
      <Link href={`/astrologer/${a.id}`} className="block h-full">
        <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-2 cursor-pointer h-full border border-transparent transition-all max-w-md mx-auto" style={{ fontFamily: 'Poppins, Inter, Montserrat, Arial, sans-serif' }}>
          <div className="flex items-start gap-8 flex-1">
            <img src={a.img} alt={a.name} className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-xl text-[#23244a] truncate" style={{ fontFamily: 'Playfair Display, Poppins, Inter, Montserrat, Arial, sans-serif' }}>{a.name}</span>
                {a.isNew && <span className="text-xs text-red-500 font-bold ml-2 flex-shrink-0">{t('chatWithAstrologer.new', 'New!')}</span>}
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              </div>
              <div className="text-base text-gray-700 font-medium mb-1 line-clamp-2">{a.skills.join(", ")}</div>
              <div className="text-base text-gray-600 font-medium mb-1 line-clamp-2">{a.languages.join(", ")}</div>
              <div className="text-base text-gray-500 font-medium">{t('chatWithAstrologer.experience', 'Exp:')} {a.experience} {t('chatWithAstrologer.years', 'Years')}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-auto pt-4">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-5 h-5" />
              <span className="font-bold text-lg">{a.rating}</span>
            </div>
            {a.orders > 0 && <span className="text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded shadow-sm">{a.orders} {t('chatWithAstrologer.orders', 'orders')}</span>}
            <span className="text-base text-gray-700 ml-auto font-bold">₹ {a.price}/min</span>
            <Link href={`/astrologers/${a.id}`} className="ml-4">
              <button className="border-2 border-green-500 text-green-600 font-bold py-2 px-6 rounded-lg hover:bg-green-50 transition min-w-fit" style={{ fontFamily: 'Poppins, Inter, Montserrat, Arial, sans-serif' }}>{t('chatWithAstrologer.chat', 'Chat')}</button>
            </Link>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ChatWithAstrologer() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [astrologers, setAstrologers] = useState<Astrologer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch astrologers from API
  useEffect(() => {
    setLoading(true);
    setError("");
    const params = new URLSearchParams();
    if (selectedSkill) params.append("skill", selectedSkill);
    if (selectedLanguage) params.append("language", selectedLanguage);
    if (sortBy) params.append("sortBy", sortBy);
    if (search) params.append("search", search);
    fetch(`${API_URL}?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setAstrologers(data.astrologers || []);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load astrologers");
        setLoading(false);
      });
  }, [selectedSkill, selectedLanguage, sortBy, search]);

  // Extract skills and languages from fetched data
  const SKILLS = useMemo(() => Array.from(new Set(astrologers.flatMap(a => a.skills))), [astrologers]);
  const LANGUAGES = useMemo(() => Array.from(new Set(astrologers.flatMap(a => a.languages))), [astrologers]);

  // Use fetched astrologers directly
  const filteredAstrologers = astrologers;

  return (
    <motion.div
      className="min-h-screen bg-[#fafbfc] py-8 px-2 md:px-8 xl:px-12 mt-16 md:mt-24 font-poppins"
      style={{ fontFamily: 'Poppins, Inter, Montserrat, Arial, sans-serif' }}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#23244a] bg-[#ffe066] px-6 py-3 rounded-lg shadow inline-block" style={{ fontFamily: 'Playfair Display, Poppins, Inter, Montserrat, Arial, sans-serif', letterSpacing: '0.01em' }}>{t('chatWithAstrologer.title', 'Chat with Astrologer')}</h1>
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-gray-700 font-medium" style={{ fontFamily: 'Poppins, Inter, Montserrat, Arial, sans-serif' }}>{t('chatWithAstrologer.balance', 'Available balance:')} <span className="font-bold">₹ 0</span></span>
          <button className="bg-green-500 text-white px-4 py-2 rounded font-bold shadow hover:bg-green-600 transition" style={{ fontFamily: 'Poppins, Inter, Montserrat, Arial, sans-serif' }}>{t('chatWithAstrologer.recharge', 'Recharge')}</button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        {/* Filter */}
        <div className="flex gap-2 items-center w-full md:w-auto">
          <Filter className="w-5 h-5 text-gray-500" />
          <select value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-[#f3f4f6] focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-all shadow-sm text-[#23244a]" style={{ fontFamily: 'Poppins, Inter, Montserrat, Arial, sans-serif', color: '#23244a' }}>
            <option value="">{t('chatWithAstrologer.allSkills', 'All Skills')}</option>
            {SKILLS.map(skill => <option key={skill} value={skill}>{skill}</option>)}
          </select>
          <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-[#f3f4f6] focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-all shadow-sm text-[#23244a]" style={{ fontFamily: 'Poppins, Inter, Montserrat, Arial, sans-serif', color: '#23244a' }}>
            <option value="">{t('chatWithAstrologer.allLanguages', 'All Languages')}</option>
            {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>
        </div>
        {/* Sort By */}
        <div className="flex gap-2 items-center w-full md:w-auto">
          <span className="text-gray-700 font-medium" style={{ fontFamily: 'Poppins, Inter, Montserrat, Arial, sans-serif' }}>{t('chatWithAstrologer.sortBy', 'Sort by:')}</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-[#f3f4f6] focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-all shadow-sm text-[#23244a]" style={{ fontFamily: 'Poppins, Inter, Montserrat, Arial, sans-serif', color: '#23244a' }}>
            {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{t(`chatWithAstrologer.sort.${opt.value}`, opt.label)}</option>)}
          </select>
        </div>
        {/* Search */}
        <form className="flex gap-2 items-center flex-1 md:justify-end w-full" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            placeholder={t('chatWithAstrologer.searchPlaceholder', 'Search name...')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-[#f3f4f6] focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-all shadow-sm text-[#23244a]" style={{ fontFamily: 'Poppins, Inter, Montserrat, Arial, sans-serif', color: '#23244a' }}
          />
          <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-[#23244a] rounded-lg px-3 py-2 shadow font-bold" style={{ fontFamily: 'Poppins, Inter, Montserrat, Arial, sans-serif', color: '#23244a' }}>
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>
      {/* Astrologer List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
        {loading ? (
          <div className="col-span-full text-center py-12 text-lg font-semibold text-gray-500">{t('chatWithAstrologer.loading', 'Loading astrologers...')}</div>
        ) : error ? (
          <div className="col-span-full text-center py-12 text-lg font-semibold text-red-500">{error}</div>
        ) : (
          <AnimatePresence>
            {filteredAstrologers.map((a, idx) => (
              <AstrologerCard key={a.id} astrologer={a} />
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
} 