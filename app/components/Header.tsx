'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useLanguage } from '../contexts/useLanguage';
import { SupportedLang, LANGUAGE_NAMES } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, Search, Menu, X, User, LogIn, LogOut 
} from 'lucide-react';
import CartIcon from './CartIcon';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const servicesMegaMenu = {
  consultations: {
    href: "/services/astrology",
    items: [
      { href: "/panchang", key: "panchang" },
      { href: "/kundali-matching", key: "kundali_matching" },
      { href: "/shop", key: "buy_products" },
      { href: "/daily-horoscope", key: "free_daily_horoscope" },
      { href: "/services/astrology", key: "astrology" },
      { href: "/services/chat-with-astrologer", key: "chat_with_astrologer" },
      { href: "/services/love-relationship", key: "love_relationship" },
      { href: "/services/career-guidance", key: "career_guidance" },
      { href: "/services/numerology", key: "numerology" },
    ],
  },
  puja_rituals: {
    href: "/online-puja",
    items: [
      { href: "/online-puja", key: "online_puja" },
      { href: "/services/grah-shanti", key: "grah_shanti" },
      { href: "/services/manokamna-pooja", key: "manokamna_pooja" },
    ],
  },
  horoscopes: {
    href: "/daily-horoscope",
    items: [
      { href: "/services/daily-horoscope", key: "daily_horoscope" },
      { href: "/services/monthly-horoscope", key: "monthly_horoscope" },
      { href: "/services/yearly-horoscope", key: "yearly_horoscope" },
    ],
  },
  learning: {
    href: "/courses",
    items: [
      { href: "/courses", key: "astrology_courses" },
      { href: "/blog", key: "blog" },
    ],
  },
};

export function Header() {
  const { lang, setLang, t } = useLanguage();
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileLangMenuOpen, setIsMobileLangMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => signOut({ callbackUrl: '/' });

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handlePopularSearch = (term: string) => {
    router.push(`/search?q=${encodeURIComponent(term)}`);
    setIsSearchOpen(false);
  };

  const languageList: SupportedLang[] = ['en', 'hi', 'es', 'fr', 'de', 'zh', 'ar', 'ru'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) setIsServicesOpen(false);
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) setIsUserMenuOpen(false);
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) setIsLangDropdownOpen(false);
      const hamburgerButton = document.getElementById('hamburger-button');
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && hamburgerButton && !hamburgerButton.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-6 left-0 right-0 mx-auto max-w-7xl z-50 bg-[#FAEBE6] shadow-md rounded-3xl py-2 px-6 flex items-center justify-between gap-4"
      >
        <div className="flex items-center flex-1 min-w-0">
          <div className="flex-shrink-0 mr-10">
            <Link href="/" className="flex items-center gap-3">
              <div className="text-center">
                <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6A0DAD] to-[#800080] whitespace-nowrap">{t('header.logo.line1')}</h1>
                <p className="text-xs text-purple-700 whitespace-nowrap">{t('header.logo.line2')}</p>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-5">
            <Link href="/" className={`font-semibold text-gray-700 hover:text-purple-600 transition-colors ${pathname === '/' ? 'text-purple-600' : ''}`}>{t('header.nav.home')}</Link>
            <Link href="/about" className={`font-semibold text-gray-700 hover:text-purple-600 transition-colors ${pathname === '/about' ? 'text-purple-600' : ''}`}>{t('header.nav.about')}</Link>
            <Link href="/courses" className={`font-semibold text-gray-700 hover:text-purple-600 transition-colors ${pathname === '/courses' ? 'text-purple-600' : ''}`}>{t('header.nav.courses')}</Link>
            <Link href="/contact" className={`font-semibold text-gray-700 hover:text-purple-600 transition-colors ${pathname === '/contact' ? 'text-purple-600' : ''}`}>{t('header.nav.contact')}</Link>
            <Link href="/blog" className={`font-semibold text-gray-700 hover:text-purple-600 transition-colors ${pathname?.startsWith('/blog') ? 'text-purple-600' : ''}`}>{t('header.nav.blog')}</Link>
            <Link href="/study" className={`font-semibold text-gray-700 hover:text-purple-600 transition-colors ${pathname?.startsWith('/study') ? 'text-purple-600' : ''}`}>{t('header.nav.study')}</Link>
            <div className="relative" ref={servicesMenuRef}>
              <button onClick={() => setIsServicesOpen(prev => !prev)} className="font-semibold text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-1">
                {t('header.nav.consultations')} 
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-1/2 -translate-x-1/2 mt-2 w-screen max-w-4xl bg-[#FAEBE6] rounded-lg shadow-lg border border-purple-200 z-50 p-6"
                  >
                    <div className="grid grid-cols-4 gap-x-8">
                      {Object.entries(servicesMegaMenu).map(([sectionKey, sectionValue]) => (
                        <div key={sectionKey}><h3 className="text-sm font-bold uppercase text-purple-900 bg-purple-100 rounded px-3 py-1 mb-4 inline-block shadow-sm border border-purple-200">{t(`header.mega_menu.${sectionKey}.title`)}</h3><ul className="space-y-3">{sectionValue.items.map((item) => (<li key={item.key}><Link href={item.href} onClick={() => setIsServicesOpen(false)} className="text-base text-gray-700 hover:text-purple-600 font-medium transition-colors">{t(`header.mega_menu.${sectionKey}.items.${item.key}`)}</Link></li>))}</ul></div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <button onClick={() => setIsSearchOpen(true)} className="p-2 rounded-full hover:bg-gray-200 transition-colors"><Search className="h-6 w-6 text-gray-600" /></button>
          <CartIcon />
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/astrologer/auth/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#FF8C00] to-[#6A0DAD] text-white font-semibold hover:from-[#6A0DAD] hover:to-[#FF8C00] transition-all whitespace-nowrap shadow"
              style={{ textDecoration: 'none' }}
            >
              Join us
            </a>
            {session?.user ? (
              <div className="relative" ref={userMenuRef}>
                <button onClick={() => setIsUserMenuOpen(prev => !prev)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-transparent bg-clip-text bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] hover:bg-gray-100 transition-all font-semibold whitespace-nowrap"><User className="w-4 h-4" /> {session.user.name || 'User'} <ChevronDown className="w-4 h-4" /></button>
                {isUserMenuOpen && (<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"><div className="py-1"><Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('header.auth.my_profile')}</Link><Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('header.auth.my_orders')}</Link><button onClick={handleLogout} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><LogOut className="w-4 h-4" /> {t('header.auth.logout')}</button></div></div>)}
              </div>
            ) : (
              <button onClick={() => signIn()} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-transparent bg-clip-text bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] hover:bg-gray-100 transition-all font-semibold whitespace-nowrap"><LogIn className="w-4 h-4" /> {t('header.auth.signin')}</button>
            )}
            <div className="relative" ref={langDropdownRef}>
              <button onClick={() => setIsLangDropdownOpen(prev => !prev)} className="px-4 py-2 rounded-lg bg-white text-transparent bg-clip-text bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] hover:bg-gray-100 transition-all font-semibold flex items-center gap-2 whitespace-nowrap" aria-haspopup="listbox" aria-expanded={isLangDropdownOpen}><span>{t('header.language_selector.button')}</span><ChevronDown className="w-4 h-4" /></button>
              {isLangDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full rounded-lg shadow-lg border border-purple-200 z-50 bg-[#FAEBE6] font-[Montserrat,sans-serif] drop-shadow-xl">
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs text-gray-500 font-semibold">{t('header.language_selector.dropdown_title')}</div>
                    {languageList.map((code) => (
                      <button 
                        key={code} 
                        onClick={() => { setLang(code); setIsLangDropdownOpen(false); }} 
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F3E8FF] ${lang === code ? 'font-bold text-[#7C3AED]' : 'text-gray-700'} font-[Montserrat,sans-serif]`}
                      >
                        {(LANGUAGE_NAMES as Record<string, string>)[code] || LANGUAGE_NAMES['en']}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <button id="hamburger-button" onClick={() => setIsMobileMenuOpen(prev => !prev)} className="md:hidden p-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 transition-colors" aria-label="Menu">{isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
        </div>
      </motion.header>
      
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="bg-[#FEF9E6]/90 backdrop-blur-lg border-purple-300 border rounded-2xl p-6 max-w-2xl shadow-2xl sm:rounded-3xl">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
              <Input
                id="search"
                placeholder="Search for services, products, or articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-32 rounded-full border-2 border-purple-400 focus-visible:ring-purple-500 text-lg bg-white/80 text-black"
              />
              <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold h-10 px-8 text-md">
                Search
              </Button>
            </div>
          </form>
          <div className="mt-5 pl-2">
            <p className="text-sm text-gray-700 font-semibold mb-2">Popular searches:</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <button onClick={() => handlePopularSearch('Horoscope')} className="text-purple-700 hover:text-purple-900 transition-colors">Horoscope</button>
              <button onClick={() => handlePopularSearch('Tarot Reading')} className="text-purple-700 hover:text-purple-900 transition-colors">Tarot Reading</button>
              <button onClick={() => handlePopularSearch('Meditation')} className="text-purple-700 hover:text-purple-900 transition-colors">Meditation</button>
              <button onClick={() => handlePopularSearch('Astrology Course')} className="text-purple-700 hover:text-purple-900 transition-colors">Astrology Course</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}