import { useParams, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, User, Download, Share2, ChevronRight } from 'lucide-react';
import SEO from '../components/seo/SEO';
import { inspirations as defaultInspirations, seoConfig } from '../data/loader';
import { useI18n } from '../contexts/I18nContext';

const InspirationDetail = () => {
  const { lang, t } = useI18n();
  const { style, slug } = useParams();
  const location = useLocation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [currentInspiration, setCurrentInspiration] = useState<any>(null);

  useEffect(() => {
    setActiveImageIndex(0);
    window.scrollTo(0, 0);
    
    const savedInspirations = localStorage.getItem('inspirations');
    const dataSource = savedInspirations ? JSON.parse(savedInspirations) : defaultInspirations;
    const found = dataSource.find(
      (i: any) => i.slug === slug && i.style === style
    );
    setCurrentInspiration(found);
  }, [location.pathname, style, slug]);

  if (!currentInspiration) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">{lang === 'zh' ? '案例未找到' : 'Case Not Found'}</h1>
        <Link to="/inspiration">
          <button className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
            {t('返回灵感画廊')}
          </button>
        </Link>
      </div>
    );
  }

  const styleLabels: Record<string, { zh: string; en: string }> = {
    modern: { zh: '现代风格', en: 'Modern Style' },
    classic: { zh: '经典风格', en: 'Classic Style' },
    minimalist: { zh: '极简风格', en: 'Minimalist Style' },
  };

  const inspirationPageConfig = seoConfig.pages.find(p => p.page === 'inspiration');

  return (
    <>
      <SEO
        title={currentInspiration.seo?.title || currentInspiration.title || inspirationPageConfig?.title || ''}
        description={currentInspiration.seo?.description || currentInspiration.description || inspirationPageConfig?.description || ''}
        keywords={currentInspiration.seo?.keywords || inspirationPageConfig?.keywords || []}
      />

      <div className="min-h-screen">
        <div className="bg-gray-100 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center text-gray-600 text-sm">
              <Link to="/" className="hover:text-blue-900">{t('首页')}</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to="/inspiration" className="hover:text-blue-900">{t('灵感画廊')}</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-gray-900">{styleLabels[style || ''] ? (lang === 'zh' ? styleLabels[style || ''].zh : styleLabels[style || ''].en) : style}</span>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-gray-900">{currentInspiration.title}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center mb-8">
            <Link to="/inspiration" className="flex items-center text-gray-600 hover:text-blue-900 transition-colors mr-6">
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t('返回灵感画廊')}
            </Link>
            <div className="flex gap-3">
              <button 
                onClick={() => currentInspiration.shareUrl && window.open(currentInspiration.shareUrl, '_blank')}
                disabled={!currentInspiration.shareUrl}
                className={`flex items-center px-4 py-2 border rounded-lg transition-colors ${
                  currentInspiration.shareUrl 
                    ? 'border-gray-300 hover:bg-gray-50 text-gray-600' 
                    : 'border-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Share2 className="w-4 h-4 mr-2" />
                {lang === 'zh' ? '分享' : 'Share'}
              </button>
              <button 
                onClick={() => currentInspiration.downloadUrl && window.open(currentInspiration.downloadUrl, '_blank')}
                disabled={!currentInspiration.downloadUrl}
                className={`flex items-center px-4 py-2 border rounded-lg transition-colors ${
                  currentInspiration.downloadUrl 
                    ? 'border-gray-300 hover:bg-gray-50 text-gray-600' 
                    : 'border-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Download className="w-4 h-4 mr-2" />
                {lang === 'zh' ? '下载资料' : 'Download'}
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="relative rounded-2xl overflow-hidden mb-4 bg-gray-200">
                <img
                  src={currentInspiration.images[activeImageIndex]}
                  alt={currentInspiration.title}
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              <div className="flex gap-2">
                {currentInspiration.images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIndex === index ? 'border-blue-900 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${currentInspiration.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-900 text-white text-sm rounded-full mb-6">
                {styleLabels[currentInspiration.style] ? (lang === 'zh' ? styleLabels[currentInspiration.style].zh : styleLabels[currentInspiration.style].en) : currentInspiration.style}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {lang === 'zh' ? currentInspiration.title : (currentInspiration.titleEn || currentInspiration.title)}
              </h1>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {lang === 'zh' ? currentInspiration.description : (currentInspiration.descriptionEn || currentInspiration.description)}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {currentInspiration.project && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center text-gray-500 mb-2">
                      <User className="w-5 h-5 mr-2" />
                      <span className="text-sm">{lang === 'zh' ? '项目名称' : 'Project'}</span>
                    </div>
                    <p className="text-gray-900 font-semibold">{lang === 'zh' ? currentInspiration.project : (currentInspiration.projectEn || currentInspiration.project)}</p>
                  </div>
                )}
                {currentInspiration.location && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center text-gray-500 mb-2">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="text-sm">{lang === 'zh' ? '项目地点' : 'Location'}</span>
                    </div>
                    <p className="text-gray-900 font-semibold">{lang === 'zh' ? currentInspiration.location : (currentInspiration.locationEn || currentInspiration.location)}</p>
                  </div>
                )}
              </div>

              {currentInspiration.details && (
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{lang === 'zh' ? '项目详情' : 'Project Details'}</h3>
                  <div className="space-y-3">
                    {currentInspiration.details.map((detail: { label: string; labelEn?: string; value: string; valueEn?: string }, index: number) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-500">{lang === 'zh' ? detail.label : (detail.labelEn || detail.label)}</span>
                        <span className="text-gray-900 font-medium">{lang === 'zh' ? detail.value : (detail.valueEn || detail.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentInspiration.features && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{lang === 'zh' ? '设计亮点' : 'Design Highlights'}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {currentInspiration.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InspirationDetail;
