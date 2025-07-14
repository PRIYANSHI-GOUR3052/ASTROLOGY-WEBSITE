"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { useLanguage } from "../contexts/useLanguage";
import { SupportedLang, LANGUAGE_NAMES } from "../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Search,
  Menu,
  X,
  User,
  LogIn,
  LogOut,
} from "lucide-react";
import CartIcon from "./CartIcon";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const [isMobileStudyDropdownOpen, setIsMobileStudyDropdownOpen] = useState(false);
  const [isMobileConsultationsDropdownOpen, setIsMobileConsultationsDropdownOpen] = useState(false);
  const [isMobileLangMenuOpen, setIsMobileLangMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isStudyDropdownOpen, setIsStudyDropdownOpen] = useState(false);

  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => signOut({ callbackUrl: "/" });

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const handlePopularSearch = (term: string) => {
    router.push(`/search?q=${encodeURIComponent(term)}`);
    setIsSearchOpen(false);
  };

  const languageList: SupportedLang[] = [
    "en",
    "hi",
    "es",
    "fr",
    "de",
    "zh",
    "ar",
    "ru",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesMenuRef.current &&
        !servicesMenuRef.current.contains(event.target as Node)
      )
        setIsServicesOpen(false);
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      )
        setIsUserMenuOpen(false);
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      )
        setIsLangDropdownOpen(false);
      const hamburgerButton = document.getElementById("hamburger-button");
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        hamburgerButton &&
        !hamburgerButton.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-6 left-0 right-0 w-full z-50 bg-[#FEFBF2] shadow-lg rounded-3xl py-2 px-10 flex items-center justify-center"
        style={{ boxShadow: '0 4px 16px 0 rgba(184, 156, 106, 0.08)' }}
      >
        <div className="flex items-center flex-1 min-w-0">
          <div className="flex-shrink-0 mr-10">
            <Link href="/" className="flex items-center gap-3">
              <div className="text-center">
                <h1 className="text-xl font-bold whitespace-nowrap" style={{ color: '#B89C6A', fontFamily: 'serif' }}>
                  {t("header.logo.line1")}
                </h1>
                <p className="text-xs whitespace-nowrap" style={{ color: '#E2CFA5', fontFamily: 'serif' }}>
                  {t("header.logo.line2")}
                </p>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex items-center flex-nowrap gap-x-8">
            <Link
              href="/"
              className={`font-semibold transition-colors ${pathname === "/" ? "text-[#77A656] underline" : "text-[#232323] hover:text-[#77A656]"}`}
              style={{ fontWeight: 600 }}
            >
              {t("header.nav.home")}
            </Link>
            <Link
              href="/about"
              className={`font-semibold transition-colors ${pathname === "/about" ? "text-[#77A656] underline" : "text-[#232323] hover:text-[#77A656]"}`}
              style={{ fontWeight: 600 }}
            >
              {t("header.nav.about")}
            </Link>
            {/* Study Dropdown Integration */}
            <div className="relative" onBlur={() => setIsStudyDropdownOpen(false)} tabIndex={0}>
              <button
                onClick={() => setIsStudyDropdownOpen((prev) => !prev)}
                className={`font-semibold flex items-center transition-colors relative px-2 py-1 ${pathname?.startsWith('/study') || pathname === '/courses' ? 'text-[#77A656] underline' : 'text-[#232323] hover:text-[#77A656]'} `}
                type="button"
                aria-haspopup="true"
                aria-expanded={isStudyDropdownOpen}
                style={{ fontWeight: 600 }}
              >
                {t('header.nav.study')}
              </button>
              <AnimatePresence>
                {isStudyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute left-0 mt-2 min-w-[180px] bg-white rounded-xl shadow-lg border border-gray-100 z-50 py-2 px-2 flex flex-col gap-1"
                  >
                    <Link href="/study" className="block px-4 py-2 rounded-lg font-medium transition-colors text-[#232323] hover:text-[#77A656]" onClick={() => setIsStudyDropdownOpen(false)}>Study</Link>
                    <Link href="/courses" className="block px-4 py-2 rounded-lg font-medium transition-colors text-[#232323] hover:text-[#77A656]" onClick={() => setIsStudyDropdownOpen(false)}>Courses</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link
              href="/contact"
              className={`font-semibold transition-colors ${pathname === "/contact" ? "text-[#77A656] underline" : "text-[#232323] hover:text-[#77A656]"}`}
              style={{ fontWeight: 600 }}
            >
              {t("header.nav.contact")}
            </Link>
            <Link
              href="/blog"
              className={`font-semibold transition-colors ${pathname?.startsWith("/blog") ? "text-[#77A656] underline" : "text-[#232323] hover:text-[#77A656]"}`}
              style={{ fontWeight: 600 }}
            >
              {t("header.nav.blog")}
            </Link>
            {/* Add Talk to Astrologer */}
            <Link
              href="/talk-to-astrologer"
              className={`font-semibold transition-colors ${pathname === "/talk-to-astrologer" ? "text-[#77A656] underline" : "text-[#232323] hover:text-[#77A656]"}`}
              style={{ fontWeight: 600 }}
            >
              {t("header.nav.talk_to_astrologer")}
            </Link>
            {/* Add Chat with Astrologer */}
            <Link
              href="/chat-with-astrologer"
              className={`font-semibold transition-colors ${pathname === "/chat-with-astrologer" ? "text-[#77A656] underline" : "text-[#232323] hover:text-[#77A656]"}`}
              style={{ fontWeight: 600 }}
            >
              {t("header.nav.chat_with_astrologer")}
            </Link>
            {/* Add Buy Products (if not already present) */}
            <Link
              href="/shop"
              className={`font-semibold transition-colors ${pathname === "/shop" ? "text-[#77A656] underline" : "text-[#232323] hover:text-[#77A656]"}`}
              style={{ fontWeight: 600 }}
            >
              {t("header.nav.buy_products")}
            </Link>
            {/* Add Our Services */}
            <Link
              href="/services"
              className={`font-semibold transition-colors ${pathname === "/services" ? "text-[#77A656] underline" : "text-[#232323] hover:text-[#77A656]"}`}
              style={{ fontWeight: 600 }}
            >
              {t("header.nav.our_services")}
            </Link>
            {/* Consultations Mega Menu (already present, keep as is) */}
            <div className="relative" ref={servicesMenuRef} tabIndex={0} onBlur={() => setIsServicesOpen(false)}>
              <button
                onClick={() => setIsServicesOpen((prev) => !prev)}
                className="font-semibold flex items-center gap-1 transition-colors bg-[#77A656] text-white rounded-lg px-4 py-2 shadow-sm hover:bg-[#5e8e45]"
                type="button"
                aria-haspopup="true"
                aria-expanded={isServicesOpen}
                style={{ fontWeight: 700 }}
              >
                {t("header.nav.consultations")}
              </button>
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute left-1/2 -translate-x-1/2 mt-2 w-screen max-w-4xl bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-6"
                  >
                    <div className="grid grid-cols-4 gap-x-8">
                      {Object.entries(servicesMegaMenu).map(
                        ([sectionKey, sectionValue]) => (
                          <div key={sectionKey}>
                            <h3 className="text-sm font-bold uppercase rounded px-3 py-1 mb-4 inline-block shadow-sm border" style={{ color: '#77A656', background: '#F3F8F2', borderColor: '#77A656' }}>
                              {t(`header.mega_menu.${sectionKey}.title`)}
                            </h3>
                            <ul className="space-y-3">
                              {sectionValue.items.map((item) => (
                                <li key={item.key}>
                                  <Link
                                    href={item.href}
                                    onClick={() => setIsServicesOpen(false)}
                                    className="text-base font-medium transition-colors text-[#232323] hover:text-[#77A656]"
                                  >
                                    {t(
                                      `header.mega_menu.${sectionKey}.items.${item.key}`
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Search className="h-6 w-6" style={{ color: '#232323' }} />
          </button>
          <CartIcon iconColor="#232323" />
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/astrologer/auth/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold hover:scale-105 hover:shadow-lg ease-in-out whitespace-nowrap shadow bg-[#77A656] text-white"
              style={{ textDecoration: 'none', fontWeight: 700 }}
            >
              {t('header.nav.join_us')}
            </a>

            {session?.user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#5e8e45] transition-all font-semibold whitespace-nowrap bg-[#77A656] text-white"
                  style={{ fontWeight: 700 }}
                >
                  <User className="w-4 h-4" style={{ color: 'white' }} /> {session.user.name || "User"} {" "}
                  <ChevronDown className="w-4 h-4" style={{ color: 'white' }} />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50" style={{ borderColor: '#77A656' }}>
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm hover:bg-[#F3F8F2] text-[#232323] hover:text-[#77A656]"
                      >
                        {t("header.auth.my_profile")}
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm hover:bg-[#F3F8F2] text-[#232323] hover:text-[#77A656]"
                      >
                        {t("header.auth.my_orders")}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#F3F8F2] text-[#232323] hover:text-[#77A656]"
                      >
                        <LogOut className="w-4 h-4" style={{ color: '#232323' }} /> {t("header.auth.logout")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#5e8e45] transition-all font-semibold whitespace-nowrap bg-[#77A656] text-white"
                style={{ fontWeight: 700 }}
              >
                <LogIn className="w-4 h-4" style={{ color: 'white' }} /> {t("header.auth.signin")}
              </button>
            )}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangDropdownOpen((prev) => !prev)}
                className="px-4 py-2 rounded-lg hover:bg-[#5e8e45] transition-all font-semibold flex items-center gap-2 whitespace-nowrap bg-[#77A656] text-white"
                aria-haspopup="listbox"
                aria-expanded={isLangDropdownOpen}
                style={{ fontWeight: 700 }}
              >
                <span>{t("header.language_selector.button")}</span>
                <ChevronDown className="w-4 h-4" style={{ color: 'white' }} />
              </button>
              {isLangDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full rounded-lg shadow-lg border z-50 bg-white font-[Montserrat,sans-serif] drop-shadow-xl" style={{ borderColor: '#77A656' }}>
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs font-semibold" style={{ color: '#77A656' }}>
                      {t("header.language_selector.dropdown_title")}
                    </div>
                    {languageList.map((code) => (
                      <button
                        key={code}
                        onClick={() => {
                          setLang(code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm font-[Montserrat,sans-serif] text-[#232323] hover:text-[#77A656] ${lang === code ? 'font-bold' : ''}`}
                        style={{ fontWeight: lang === code ? 700 : 400 }}
                      >
                        {(LANGUAGE_NAMES as Record<string, string>)[code] ||
                          LANGUAGE_NAMES["en"]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            id="hamburger-button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-full bg-white transition-colors ml-2"
            aria-label="Menu"
            style={{ color: '#232323' }}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" style={{ color: '#232323' }} /> : <Menu className="w-5 h-5" style={{ color: '#232323' }} />}
          </button>
        </div>
      </motion.header>

      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="bg-black/90 backdrop-blur-lg border rounded-2xl p-6 max-w-2xl shadow-2xl sm:rounded-3xl" style={{ borderColor: '#D6FA25' }}>
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none" style={{ color: '#D6FA25' }} />
              <Input
                id="search"
                placeholder="Search for services, products, or articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-32 rounded-full border-2 focus-visible:ring text-lg bg-white/80"
                style={{ color: '#D6FA25', borderColor: '#D6FA25' }}
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full font-bold h-10 px-8 text-md"
                style={{ background: '#D6FA25', color: '#23244a' }}
              >
                Search
              </Button>
            </div>
          </form>
          <div className="mt-5 pl-2">
            <p className="text-sm font-semibold mb-2" style={{ color: '#D6FA25' }}>
              Popular searches:
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <button
                onClick={() => handlePopularSearch("Horoscope")}
                style={{ color: '#D6FA25' }}
                className="hover:underline"
              >
                Horoscope
              </button>
              <button
                onClick={() => handlePopularSearch("Tarot Reading")}
                style={{ color: '#D6FA25' }}
                className="hover:underline"
              >
                Tarot Reading
              </button>
              <button
                onClick={() => handlePopularSearch("Meditation")}
                style={{ color: '#D6FA25' }}
                className="hover:underline"
              >
                Meditation
              </button>
              <button
                onClick={() => handlePopularSearch("Astrology Course")}
                style={{ color: '#D6FA25' }}
                className="hover:underline"
              >
                Astrology Course
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-xs bg-black z-[999] shadow-2xl flex flex-col p-6 gap-6 md:hidden"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="self-end mb-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              aria-label="Close menu"
              style={{ color: '#D6FA25' }}
            >
              <X className="w-6 h-6" style={{ color: '#D6FA25' }} />
            </button>
            <nav className="flex flex-col gap-4">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-lg" style={{ color: '#D6FA25' }}>Home</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-lg" style={{ color: '#D6FA25' }}>About</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-lg" style={{ color: '#D6FA25' }}>Contact</Link>
              <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-lg" style={{ color: '#D6FA25' }}>Blog</Link>
              {/* Mobile Study Dropdown */}
              <div className="flex flex-col">
                <button
                  onClick={() => setIsMobileStudyDropdownOpen((prev) => !prev)}
                  className="font-semibold text-lg text-left flex items-center justify-between w-full"
                  style={{ color: '#D6FA25' }}
                >
                  Study
                </button>
                <AnimatePresence>
                  {isMobileStudyDropdownOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col pl-4"
                    >
                      <Link href="/study" onClick={() => { setIsMobileMenuOpen(false); setIsMobileStudyDropdownOpen(false); }} className="py-1" style={{ color: '#D6FA25' }}>Study</Link>
                      <Link href="/courses" onClick={() => { setIsMobileMenuOpen(false); setIsMobileStudyDropdownOpen(false); }} className="py-1" style={{ color: '#D6FA25' }}>Courses</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Mobile Consultations Dropdown */}
              <div className="flex flex-col">
                <button
                  onClick={() => setIsMobileConsultationsDropdownOpen((prev) => !prev)}
                  className="font-semibold text-lg text-left flex items-center justify-between w-full"
                  style={{ color: '#D6FA25' }}
                >
                  Consultations
                </button>
                <AnimatePresence>
                  {isMobileConsultationsDropdownOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col pl-4"
                    >
                      {Object.entries(servicesMegaMenu).map(([sectionKey, sectionValue]) => (
                        <div key={sectionKey} className="mb-2">
                          <div className="text-xs font-bold uppercase mb-1" style={{ color: '#D6FA25' }}>{t(`header.mega_menu.${sectionKey}.title`)}</div>
                          {sectionValue.items.map((item) => (
                            <Link key={item.key} href={item.href} onClick={() => { setIsMobileMenuOpen(false); setIsMobileConsultationsDropdownOpen(false); }} className="block py-1 text-base" style={{ color: '#D6FA25' }}>{t(`header.mega_menu.${sectionKey}.items.${item.key}`)}</Link>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link href="/talk-to-astrologer" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-lg" style={{ color: '#D6FA25' }}>{t('header.nav.talk_to_astrologer')}</Link>
              <Link href="/chat-with-astrologer" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-lg" style={{ color: '#D6FA25' }}>{t('header.nav.chat_with_astrologer')}</Link>
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-lg" style={{ color: '#D6FA25' }}>{t('header.nav.buy_products')}</Link>
              <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-lg" style={{ color: '#D6FA25' }}>{t('header.nav.our_services')}</Link>
              {/* Mobile Language Selector */}
              <div className="flex flex-col mt-4">
                <button
                  onClick={() => setIsMobileLangMenuOpen((prev) => !prev)}
                  className="font-semibold text-lg text-left flex items-center justify-between w-full"
                  style={{ color: '#D6FA25' }}
                >
                  {t('header.language_selector.button')}
                </button>
                <AnimatePresence>
                  {isMobileLangMenuOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col pl-4 bg-black"
                    >
                      {languageList.map((code) => (
                        <button
                          key={code}
                          onClick={() => { setLang(code); setIsMobileLangMenuOpen(false); setIsMobileMenuOpen(false); }}
                          className={`text-left py-1 font-bold`}
                          style={{ color: '#D6FA25' }}
                        >
                          {(LANGUAGE_NAMES as Record<string, string>)[code] || LANGUAGE_NAMES['en']}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
