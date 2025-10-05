'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'ja' ? 'en' : 'ja';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="text-2xl font-bold text-gray-800">
            <a href="#home">Deuxxx</a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-gray-900 transition">
              {t('home')}
            </a>
            <a href="#about" className="text-gray-700 hover:text-gray-900 transition">
              {t('about')}
            </a>
            <a href="#menu" className="text-gray-700 hover:text-gray-900 transition">
              {t('menu')}
            </a>
            <a href="#reservation" className="text-gray-700 hover:text-gray-900 transition">
              {t('reservation')}
            </a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900 transition">
              {t('contact')}
            </a>
          </nav>

          {/* Language Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className={`px-3 py-1 rounded transition ${
                locale === 'ja'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              JP
            </button>
            <button
              onClick={toggleLanguage}
              className={`px-3 py-1 rounded transition ${
                locale === 'en'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col space-y-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-800 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-800 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <a
              href="#home"
              className="block py-2 text-gray-700 hover:text-gray-900 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('home')}
            </a>
            <a
              href="#about"
              className="block py-2 text-gray-700 hover:text-gray-900 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('about')}
            </a>
            <a
              href="#menu"
              className="block py-2 text-gray-700 hover:text-gray-900 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('menu')}
            </a>
            <a
              href="#reservation"
              className="block py-2 text-gray-700 hover:text-gray-900 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('reservation')}
            </a>
            <a
              href="#contact"
              className="block py-2 text-gray-700 hover:text-gray-900 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('contact')}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
