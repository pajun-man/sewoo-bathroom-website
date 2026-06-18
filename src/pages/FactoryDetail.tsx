import { useParams, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ArrowLeft, MapPin, Factory, Building2, Truck, Award, CheckCircle, Phone, Mail, Clock } from 'lucide-react';
import SEO from '../components/seo/SEO';
import { useI18n } from '../contexts/I18nContext';
import VideoPlayer from '../components/VideoPlayer';
import factoriesData from '../data/factories.json';

interface Factory {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  location: string;
  locationEn: string;
  description: string;
  descriptionEn: string;
  capacity: string;
  capacityEn: string;
  image: string;
  features: { zh: string; en: string }[];
  galleryImages: string[];
  videos: { id: string; title: string; titleEn: string; url: string; urlZh?: string; urlEn?: string; poster?: string }[];
  phone?: string;
  phoneEn?: string;
  email?: string;
  emailEn?: string;
  workingHours?: string;
  workingHoursEn?: string;
  certifications?: { name: string; nameEn: string; icon: string }[];
  factoryArea?: string;
  factoryAreaEn?: string;
  technicalStaff?: string;
  technicalStaffEn?: string;
  exportCountries?: string;
  exportCountriesEn?: string;
  patentTechnologies?: string;
  patentTechnologiesEn?: string;
  factoryStrengthTitle?: string;
  factoryStrengthTitleEn?: string;
  [key: string]: any;
}

const defaultFactories: Factory[] = factoriesData as Factory[];

const FactoryDetail = () => {
  const { lang, t } = useI18n();
  const { id } = useParams();
  const location = useLocation();
  const [currentFactory, setCurrentFactory] = useState<Factory | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    let dataSource = defaultFactories;
    try {
      const savedFactories = localStorage.getItem('factories');
      if (savedFactories) {
        const parsed = JSON.parse(savedFactories);
        if (Array.isArray(parsed)) {
          dataSource = parsed.map((factory: any) => {
            const defaultFactory = defaultFactories.find((df: Factory) => df.id === factory.id);
            return { ...defaultFactory, ...factory };
          });
        }
      }
    } catch (e) {
      console.error('Failed to parse saved factories:', e);
      localStorage.removeItem('factories');
    }
    
    const found = dataSource.find((f: Factory) => f.id === id);
    setCurrentFactory(found);
  }, [location.pathname, id]);

  if (!currentFactory) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">{lang === 'zh' ? '工厂未找到' : 'Factory Not Found'}</h1>
        <Link to="/factory">
          <button className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
            {lang === 'zh' ? '返回工厂介绍' : 'Back to Factories'}
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${currentFactory.name} - SEWOO ${lang === 'zh' ? '工厂介绍' : 'Factory'}`}
        description={currentFactory.description}
        keywords={[lang === 'zh' ? '工厂介绍' : 'Factory', currentFactory.category, currentFactory.name, 'SEWOO']}
      />

      <div className="min-h-screen">
        <div className="bg-gray-100 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center text-gray-600 text-sm">
              <Link to="/" className="hover:text-blue-900">{t('首页')}</Link>
              <span className="mx-2">/</span>
              <Link to="/factory" className="hover:text-blue-900">{lang === 'zh' ? '工厂介绍' : 'Factories'}</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{lang === 'zh' ? currentFactory.name : currentFactory.nameEn}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center mb-8">
            <Link to="/factory" className="flex items-center text-gray-600 hover:text-blue-900 transition-colors mr-6">
              <ArrowLeft className="w-5 h-5 mr-2" />
              {lang === 'zh' ? '返回工厂介绍' : 'Back to Factories'}
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="relative rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-gray-200 to-gray-300 min-h-[300px]">
                <div className="absolute inset-0 flex items-center justify-center" id={`loader-${currentFactory.id}`}>
                  <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                <img
                  src={currentFactory.image}
                  alt={currentFactory.name}
                  className="w-full aspect-video object-cover transition-opacity duration-500"
                  loading="eager"
                  onLoad={(e) => {
                    const loader = document.getElementById(`loader-${currentFactory.id}`);
                    if (loader) {
                      loader.style.display = 'none';
                    }
                  }}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    const loader = document.getElementById(`loader-${currentFactory.id}`);
                    if (loader) {
                      loader.style.display = 'none';
                    }
                    img.src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80';
                  }}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <Factory className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900">{lang === 'zh' ? currentFactory.capacity : currentFactory.capacityEn}</div>
                  <div className="text-sm text-gray-500">{lang === 'zh' ? '年产能' : 'Annual Capacity'}</div>
                </div>
                <div className="bg-green-50 rounded-xl p-6 text-center">
                  <Award className="w-10 h-10 mx-auto mb-3 text-green-600" />
                  <div className="text-2xl font-bold text-gray-900">{currentFactory.certifications.length > 0 ? (lang === 'zh' ? currentFactory.certifications[0].name : currentFactory.certifications[0].nameEn) : 'ISO9001'}</div>
                  <div className="text-sm text-gray-500">{lang === 'zh' ? '质量认证' : 'Quality Certified'}</div>
                </div>
              </div>
              
              {currentFactory.certifications.length > 1 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{lang === 'zh' ? '资质认证' : 'Certifications'}</h3>
                  <div className="flex flex-wrap gap-3">
                    {currentFactory.certifications.map((cert, index) => (
                      <div key={index} className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        <Award className="w-4 h-4 mr-2" />
                        {lang === 'zh' ? cert.name : cert.nameEn}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-900 text-white text-sm rounded-full mb-6">
                {lang === 'zh' ? currentFactory.category : currentFactory.categoryEn}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {lang === 'zh' ? currentFactory.name : currentFactory.nameEn}
              </h1>
              
              <div className="flex items-center text-gray-500 mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{lang === 'zh' ? '工厂地址：' : 'Location: '}{lang === 'zh' ? currentFactory.location : currentFactory.locationEn}</span>
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8 whitespace-pre-wrap">
                {lang === 'zh' ? currentFactory.description : currentFactory.descriptionEn}
              </p>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{lang === 'zh' ? '核心优势' : 'Core Advantages'}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {currentFactory.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                      <span className="text-gray-700">{lang === 'zh' ? feature.zh : feature.en}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('联系我们')}</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-3 text-blue-600" />
                    <span>{lang === 'zh' ? (currentFactory.phone || '400-888-8888') : (currentFactory.phoneEn || currentFactory.phone || '+86 400-888-8888')}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-3 text-blue-600" />
                    <span>{lang === 'zh' ? (currentFactory.email || 'factory@sewoo.com') : (currentFactory.emailEn || currentFactory.email || 'factory@sewoo.com')}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-3 text-blue-600" />
                    <span>{lang === 'zh' ? (currentFactory.workingHours || '周一至周六 8:00-18:00') : (currentFactory.workingHoursEn || currentFactory.workingHours || 'Mon-Sat 8:00-18:00')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-blue-900 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              {lang === 'zh' ? (currentFactory.factoryStrengthTitle || '工厂实力展示') : (currentFactory.factoryStrengthTitleEn || 'Factory Strength')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-blue-300" />
                <div className="text-4xl font-bold text-white mb-2">{currentFactory.factoryArea || '50,000'}</div>
                <div className="text-blue-200">{lang === 'zh' ? (currentFactory.factoryAreaEn || '平方米厂房面积') : 'sqm Factory Area'}</div>
              </div>
              <div className="text-center">
                <Factory className="w-12 h-12 mx-auto mb-4 text-blue-300" />
                <div className="text-4xl font-bold text-white mb-2">{currentFactory.technicalStaff || '200+'}</div>
                <div className="text-blue-200">{lang === 'zh' ? (currentFactory.technicalStaffEn || '专业技术人员') : 'Technical Staff'}</div>
              </div>
              <div className="text-center">
                <Truck className="w-12 h-12 mx-auto mb-4 text-blue-300" />
                <div className="text-4xl font-bold text-white mb-2">{currentFactory.exportCountries || '50+'}</div>
                <div className="text-blue-200">{lang === 'zh' ? (currentFactory.exportCountriesEn || '出口国家') : 'Export Countries'}</div>
              </div>
              <div className="text-center">
                <Award className="w-12 h-12 mx-auto mb-4 text-blue-300" />
                <div className="text-4xl font-bold text-white mb-2">{currentFactory.patentTechnologies || '100+'}</div>
                <div className="text-blue-200">{lang === 'zh' ? (currentFactory.patentTechnologiesEn || '专利技术') : 'Patent Technologies'}</div>
              </div>
            </div>
          </div>

          {currentFactory.galleryImages && currentFactory.galleryImages.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{lang === 'zh' ? '工厂图片画廊' : 'Factory Gallery'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentFactory.galleryImages.map((img, index) => (
                  <div 
                    key={index} 
                    className="group relative rounded-xl overflow-hidden aspect-video cursor-pointer bg-gray-200"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={img}
                      alt={`${currentFactory.name} ${lang === 'zh' ? '图片' : 'Image'} ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        const imgEl = e.target as HTMLImageElement;
                        imgEl.src = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d365f?w=600';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-medium">{lang === 'zh' ? '查看大图' : 'View Large'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedImage && (
            <div 
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button 
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedImage}
                alt={lang === 'zh' ? '大图查看' : 'Large View'}
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {currentFactory.videos && currentFactory.videos.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{lang === 'zh' ? '工厂视频' : 'Factory Videos'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {currentFactory.videos.map((video) => {
                  const videoUrl = lang === 'zh' ? video.urlZh : video.urlEn;
                  return (
                    <div key={video.id} className="bg-gray-900 rounded-xl overflow-hidden">
                      <div className="aspect-video relative">
                        {videoUrl && videoUrl.match(/\.(mp4|webm|ogg|mov|avi|mkv|flv|wmv)$/i) ? (
                          <VideoPlayer 
                            url={videoUrl} 
                            poster={video.poster || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'}
                          />
                        ) : videoUrl ? (
                          <div className="relative w-full h-full bg-gray-800">
                            <iframe
                              width="100%"
                              height="100%"
                              src={videoUrl}
                              title={video.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                              loading="lazy"
                            ></iframe>
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-800">
                            <p className="text-gray-400">{lang === 'zh' ? '暂无视频链接' : 'No video link'}</p>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="text-white font-semibold">{lang === 'zh' ? video.title : video.titleEn}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FactoryDetail;
