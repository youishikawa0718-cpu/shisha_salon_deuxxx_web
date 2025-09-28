import React from 'react';
import './App.css';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import PhotoExperience from './components/PhotoExperience';
import Menu from './components/Menu';
import Reservation from './components/Reservation';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <Header />
        <Hero />
        <About />
        <PhotoExperience />
        <Menu />
        <Reservation />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;