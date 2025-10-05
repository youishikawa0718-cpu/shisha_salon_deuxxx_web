import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              {t('title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('description1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('description2')}
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6 pt-6">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('feature1Title')}
                </h3>
                <p className="text-gray-600">
                  {t('feature1Description')}
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('feature2Title')}
                </h3>
                <p className="text-gray-600">
                  {t('feature2Description')}
                </p>
              </div>
            </div>
          </div>

          {/* Image/Placeholder */}
          <div className="relative h-96 bg-gray-300 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-700/20" />
            {/* TODO: Add actual image */}
          </div>
        </div>
      </div>
    </section>
  );
}
