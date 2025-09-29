import React from 'react';
import { useLanguage } from '../LanguageContext';

const About = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">{t.about.title}</h2>
            <p className="about-description">
              {t.about.description1}
            </p>
            <p className="about-description">
              {t.about.description2}
            </p>
            
            <div className="features">
              <div className="feature">
                <h3>{t.about.feature1Title}</h3>
                <p>{t.about.feature1Description}</p>
              </div>
              <div className="feature">
                <h3>{t.about.feature2Title}</h3>
                <p>{t.about.feature2Description}</p>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <div className="flavor-section">
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;