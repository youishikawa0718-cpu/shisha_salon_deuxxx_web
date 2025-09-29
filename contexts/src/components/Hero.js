import React from 'react';
import { useLanguage } from '../LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section id="home" className="hero" style={{backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(/360037772_1445157892887126_8471699513699891941_n.jpg)`}}>
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Shisha Salon<br />
            <span className="brand-name">Deuxxx</span>
          </h1>
          <p className="hero-subtitle">
            {t.hero.subtitle}
          </p>
          <div className="hero-buttons">
            <a href="#menu" className="btn btn-primary">{t.hero.menuButton}</a>
            <a href="#contact" className="btn btn-secondary">{t.hero.contactButton}</a>
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <span>{t.hero.scrollDown}</span>
        <div className="scroll-indicator"></div>
      </div>
    </section>
  );
};

export default Hero;