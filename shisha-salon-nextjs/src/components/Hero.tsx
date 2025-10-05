import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(/360037772_1445157892887126_8471699513699891941_n.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 z-10">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Shisha Salon
            <br />
            <span className="text-6xl md:text-8xl bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Deuxxx
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#menu"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-semibold transition-colors"
            >
              {t('menuButton')}
            </a>
            <a
              href="#contact"
              className="px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full font-semibold transition-colors border border-white/50"
            >
              {t('contactButton')}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-center">
        <span className="text-sm mb-2 block">{t('scrollDown')}</span>
        <div className="w-6 h-10 border-2 border-white rounded-full mx-auto flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
