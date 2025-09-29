import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="header">
      <div className="container">
        <div className="nav-brand">
          <h1>Deuxxx</h1>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-links">
            <li><a href="#home">{t.nav.home}</a></li>
            <li><a href="#about">{t.nav.about}</a></li>
            <li><a href="#menu">{t.nav.menu}</a></li>
            <li><a href="#reservation">{t.nav.reservation}</a></li>
            <li><a href="#contact">{t.nav.contact}</a></li>
          </ul>
        </nav>

        <div className="language-toggle">
          <button 
            className={`lang-btn ${language === 'ja' ? 'active' : ''}`}
            onClick={() => language !== 'ja' && toggleLanguage()}
          >
            JP
          </button>
          <button 
            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => language !== 'en' && toggleLanguage()}
          >
            EN
          </button>
        </div>

        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;