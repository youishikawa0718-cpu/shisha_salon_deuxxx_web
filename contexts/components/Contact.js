import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">{t.contact.title}</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <h3>{t.contact.businessHours}</h3>
              <p>{t.contact.businessHours1}</p>
              <p>{t.contact.businessHours2}</p>
              <p>{t.contact.closedDay}</p>
            </div>
            
            <div className="info-item">
              <h3>{t.contact.address}</h3>
              <p>{t.contact.addressDetail}</p>
            </div>
            
            <div className="info-item">
              <h3>{t.contact.phone}</h3>
              <p>{t.contact.phoneNumber}</p>
            </div>
            
            <div className="info-item">
              <h3>{t.contact.access}</h3>
              <p>{t.contact.access1}</p>
              <p>{t.contact.access2}</p>
            </div>
          </div>
          
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13294.756936463528!2d130.390584!3d33.583220!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe520f705b7443cf!2sShisha%20Salon%20Deuxxx!5e0!3m2!1sja!2sjp!4v1693456789123!5m2!1sja!2sjp"
              width="100%" 
              height="300" 
              style={{border: 0, borderRadius: '15px'}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Shisha Salon Deuxxx - 福岡市中央区春吉"
            ></iframe>
          </div>
        </div>
        
        <div className="reservation-note">
          <h3>{t.contact.usage}</h3>
          <p>{t.contact.seating}</p>
          <p>{t.contact.shareCharge}</p>
          <p>{t.contact.payment}</p>
          <p>{t.contact.reservation}</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;