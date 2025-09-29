import React from 'react';
import { useLanguage } from '../LanguageContext';

const PhotoExperience = () => {
  const { t } = useLanguage();
  
  return (
    <section className="photo-experience">
      <div className="container">
        
        {/* Shisha Experience */}
        <div className="experience-item">
          <div className="experience-content">
            <div className="experience-text">
              <h2 className="experience-title">{t.photoExperience.shisha.title}</h2>
              <p className="experience-description">
                {t.photoExperience.shisha.description1}
              </p>
              <p className="experience-description">
                {t.photoExperience.shisha.description2}
              </p>
            </div>
          </div>
          <div className="experience-image">
            <img src="/assets/images/flavor.jpg" alt="Premium Shisha Experience" />
          </div>
        </div>

        {/* Drinks Experience */}
        <div className="experience-item reverse">
          <div className="experience-image">
            <img src="/assets/images/drink.jpg" alt="Premium Drinks & Atmosphere" />
          </div>
          <div className="experience-content">
            <div className="experience-text">
              <h2 className="experience-title">{t.photoExperience.drinks.title}</h2>
              <p className="experience-description">
                {t.photoExperience.drinks.description1}
              </p>
              <p className="experience-description">
                {t.photoExperience.drinks.description2}
              </p>
            </div>
          </div>
        </div>

        {/* Day Experience */}
        <div className="experience-item">
          <div className="experience-content">
            <div className="experience-text">
              <h2 className="experience-title">{t.photoExperience.day.title}</h2>
              <p className="experience-description">
                {t.photoExperience.day.description1}
              </p>
              <p className="experience-description">
                {t.photoExperience.day.description2}
              </p>
            </div>
          </div>
          <div className="experience-image">
            <img src="/assets/images/lunch.jpg" alt="Luxury Ambiance & River View" />
          </div>
        </div>

        {/* Night Experience */}
        <div className="experience-item reverse">
          <div className="experience-image">
            <img src="/assets/images/dark.jpg" alt="Premium Drinks & Atmosphere" />
          </div>
          <div className="experience-content">
            <div className="experience-text">
              <h2 className="experience-title">{t.photoExperience.night.title}</h2>
              <p className="experience-description">
                {t.photoExperience.night.description1}
              </p>
              <p className="experience-description">
                {t.photoExperience.night.description2}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PhotoExperience;