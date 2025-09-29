import React from 'react';
import { useLanguage } from '../LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Shisha Salon Deuxxx</h3>
            <p>Deuxxx合同会社</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4>{t.footer.businessHours}</h4>
              <p>{t.footer.businessHours1}</p>
              <p>{t.footer.businessHours2}</p>
            </div>
            
            <div className="footer-section">
              <h4>{t.footer.contact}</h4>
              <p>TEL: 050-3186-4609</p>
              <p>Instagram: @salon_by_deux</p>
            </div>
            
            <div className="footer-section">
              <h4>{t.footer.access}</h4>
              <p>{t.footer.accessDetail1}</p>
              <p>{t.footer.accessDetail2}</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Shisha Salon Deuxxx. {t.footer.rightsReserved}</p>
          <div className="social-links">
            <a href="https://instagram.com/salon_by_deux" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://twitter.com/shisha_deuxxx" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://deuxxx.com/" target="_blank" rel="noopener noreferrer">{t.footer.officialSite}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;