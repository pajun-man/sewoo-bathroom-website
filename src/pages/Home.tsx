import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import ProductCard from '../components/ui/ProductCard';
import InspirationCard from '../components/ui/InspirationCard';
import Button from '../components/ui/Button';
import { ArrowRight, Droplets, Cpu, Sparkles, Leaf, Building, Award, Users, Globe, ChevronRight, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { products as defaultProducts, inspirations as defaultInspirations, seoConfig } from '../data/loader';
import defaultHomeConfig from '../data/home-config.json';
import defaultFactories from '../data/factories.json';
import { useI18n } from '../contexts/I18nContext';

const loadFromStorage = (key: string, defaultValue: any) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

interface BannerMedia {
  id: string;
  type: 'image' | 'video';
  title: string;
  url: string;
}

interface FeaturedProduct {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  image: string;
  type: 'image' | 'video';
}

interface Factory {
  id: string;
  name: string;
  nameEn: string;
  location: string;
  locationEn: string;
  image: string;
}

interface FactoryStats {
  capacity: { value: string; label: string; labelEn: string };
  patents: { value: string; label: string; labelEn: string };
  passRate: { value: string; label: string; labelEn: string };
  experience: { value: string; label: string; labelEn: string };
}

interface FactorySection {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  buttonText: string;
  buttonTextEn: string;
}

interface HomeConfig {
  hero: {
    title: string;
    titleEn: string;
    subtitle: string;
    subtitleEn: string;
    description: string;
    descriptionEn: string;
    buttonText: string;
    buttonTextEn: string;
    button2Text: string;
    button2TextEn: string;
    backgroundImage: string;
    media: BannerMedia[];
    useVideo: boolean;
  };
  factories: Factory[];
  factoryStats: FactoryStats;
  factorySection: FactorySection;
  featuredProducts: FeaturedProduct[];
  stats: { value: string; label: string; labelEn: string }[];
  certifications: string[];
}

const Home = () => {
  const { lang, t } = useI18n();
  const [featuredProducts, setFeaturedProducts] = useState(defaultProducts.slice(0, 3));
  const [featuredInspirations, setFeaturedInspirations] = useState(defaultInspirations.slice(0, 3));
  const [factories, setFactories] = useState<Factory[]>(defaultFactories.slice(0, 4));
  const [homeConfig, setHomeConfig] = useState<HomeConfig>({
    hero: {
      ...defaultHomeConfig.hero,
      media: defaultHomeConfig.hero.videos?.map(v => ({ ...v, type: 'video' as const })) || [],
      useVideo: false,
    },
    factories: [],
    factoryStats: defaultHomeConfig.factoryStats || {
      capacity: { value: "50万+", label: "年产能", labelEn: "Annual Capacity" },
      patents: { value: "30+", label: "专利技术", labelEn: "Patents" },
      passRate: { value: "99.8%", label: "合格率", labelEn: "Pass Rate" },
      experience: { value: "20+", label: "年行业经验", labelEn: "Years Experience" }
    },
    factorySection: defaultHomeConfig.factorySection || {
      title: "先进生产设施",
      titleEn: "Advanced Manufacturing Facilities",
      description: "SEWOO 在全国拥有多个现代化生产基地，配备先进的自动化生产线和严格的质量控制体系，确保每一件产品都达到最高品质标准。",
      descriptionEn: "SEWOO operates multiple modern manufacturing facilities nationwide, equipped with advanced automated production lines and strict quality control systems to ensure every product meets the highest quality standards.",
      buttonText: "参观我们的工厂",
      buttonTextEn: "Visit Our Factory"
    },
    featuredProducts: (defaultHomeConfig.featuredProducts || []).map(p => ({
      ...p,
      type: (p.type as 'image' | 'video') || 'image'
    })),
    stats: defaultHomeConfig.stats || [],
    certifications: defaultHomeConfig.certifications || [],
  });
  
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    const savedInspirations = localStorage.getItem('inspirations');
    const savedHomeConfig = localStorage.getItem('homeConfig');
    const savedFactories = localStorage.getItem('factories');
    const currentVersion = defaultHomeConfig.version || '1.0.0';
    
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts);
      setFeaturedProducts(parsed.slice(0, 3));
    }
    
    if (savedInspirations) {
      const parsed = JSON.parse(savedInspirations);
      setFeaturedInspirations(parsed.slice(0, 3));
    }
    
    if (savedFactories) {
      const parsedFactories = JSON.parse(savedFactories);
      if (Array.isArray(parsedFactories) && parsedFactories.length > 0) {
        setFactories(parsedFactories.slice(0, 4));
      }
    }
    
    if (savedHomeConfig) {
      const parsed = JSON.parse(savedHomeConfig);
      const savedVersion = parsed.version || '1.0.0';
      
      if (savedVersion === currentVersion) {
        const compatibleConfig = { 
          ...parsed,
          factories: [],
          factoryStats: parsed.factoryStats || defaultHomeConfig.factoryStats || {
            capacity: { value: "50万+", label: "年产能", labelEn: "Annual Capacity" },
            patents: { value: "30+", label: "专利技术", labelEn: "Patents" },
            passRate: { value: "99.8%", label: "合格率", labelEn: "Pass Rate" },
            experience: { value: "20+", label: "年行业经验", labelEn: "Years Experience" }
          },
          factorySection: parsed.factorySection || defaultHomeConfig.factorySection || {
            title: "先进生产设施",
            titleEn: "Advanced Manufacturing Facilities",
            description: "SEWOO 在全国拥有多个现代化生产基地，配备先进的自动化生产线和严格的质量控制体系，确保每一件产品都达到最高品质标准。",
            descriptionEn: "SEWOO operates multiple modern manufacturing facilities nationwide, equipped with advanced automated production lines and strict quality control systems to ensure every product meets the highest quality standards.",
            buttonText: "参观我们的工厂",
            buttonTextEn: "Visit Our Factory"
          },
          featuredProducts: ((parsed.featuredProducts || defaultHomeConfig.featuredProducts || []) as any[]).map(p => ({
            ...p,
            type: p.type as 'image' | 'video'
          }))
        };
        if (parsed.hero) {
          compatibleConfig.hero = {
            ...parsed.hero,
            media: parsed.hero.media || parsed.hero.videos?.map((v: any) => ({ ...v, type: 'video' as const })) || [],
            useVideo: parsed.hero.useVideo || false,
          };
        }
        setHomeConfig(compatibleConfig as HomeConfig);
      } else {
        localStorage.removeItem('homeConfig');
      }
    }
  }, []);

  const technologies = [
    {
      icon: Droplets,
      title: t('节水技术'),
      description: lang === 'zh' ? '高效设计减少用水，不牺牲性能。' : 'Efficient design reduces water consumption without sacrificing performance.',
    },
    {
      icon: Cpu,
      title: t('智能控制'),
      description: lang === 'zh' ? '直观技术，轻松控制，便捷生活。' : 'Intuitive technology for easy control and convenient life.',
    },
    {
      icon: Sparkles,
      title: t('高级饰面'),
      description: lang === 'zh' ? '耐用饰面保持美观，历久弥新。' : 'Durable finishes maintain beauty over time.',
    },
    {
      icon: Leaf,
      title: t('可持续制造'),
      description: lang === 'zh' ? '负责任流程，最大限度减少环境冲击。' : 'Responsible processes minimize environmental impact.',
    },
  ];

  const [partners, setPartners] = useState<{ id: string; name: string; nameEn: string; logo: string }[]>([
    { id: '1', name: '碧桂园', nameEn: 'Country Garden', logo: '' },
    { id: '2', name: '万科', nameEn: 'Vanke', logo: '' },
    { id: '3', name: '恒大', nameEn: 'Evergrande', logo: '' },
    { id: '4', name: '融创', nameEn: 'Sunac', logo: '' },
    { id: '5', name: '保利', nameEn: 'Poly', logo: '' },
    { id: '6', name: '龙湖', nameEn: 'Longfor', logo: '' },
  ]);

  useEffect(() => {
    const savedPartners = localStorage.getItem('partners');
    if (savedPartners) {
      try {
        setPartners(JSON.parse(savedPartners));
      } catch {
        console.error('Failed to parse partners');
      }
    }
  }, []);

  const homePageConfig = seoConfig.pages.find(p => p.page === 'home');

  const getActiveMedia = () => {
    if (homeConfig.hero.useVideo && homeConfig.hero.media.length > 0) {
      return homeConfig.hero.media.find(m => m.type === 'video');
    }
    return null;
  };

  const activeMedia = getActiveMedia();

  return (
    <>
      <SEO
        title={homePageConfig?.title || seoConfig.global.siteName}
        description={homePageConfig?.description || ''}
        keywords={homePageConfig?.keywords || []}
        canonical={homePageConfig?.canonical}
      />

      <div className="flex flex-col">
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
          
          {activeMedia && activeMedia.url ? (
            <div className="absolute inset-0">
              {activeMedia.url.match(/\.(mp4|webm|ogg|mov|avi)$/i) ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  crossOrigin="anonymous"
                  poster={homeConfig.hero.backgroundImage}
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.5 }}
                  onError={(e) => {
                    console.error('Video playback error:', e);
                    const video = e.target as HTMLVideoElement;
                    video.style.display = 'none';
                  }}
                  onLoadedData={(e) => {
                    const video = e.target as HTMLVideoElement;
                    if (video.paused) {
                      video.play().catch(err => console.error('Auto-play failed:', err));
                    }
                  }}
                >
                  <source src={activeMedia.url} type="video/mp4" />
                  <source src={activeMedia.url} type="video/webm" />
                </video>
              ) : activeMedia.url.includes('youtube') || activeMedia.url.includes('youtu.be') ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={activeMedia.url.replace('watch?v=', 'embed/') + '?autoplay=1&mute=1&loop=1&playlist=' + activeMedia.url.split('v=')[1]?.split('&')[0]}
                  title="Hero Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.5 }}
                />
              ) : activeMedia.url.includes('vimeo') ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={activeMedia.url.replace('vimeo.com/', 'player.vimeo.com/video/') + '?autoplay=1&muted=1&loop=1'}
                  title="Hero Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.5 }}
                />
              ) : (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  crossOrigin="anonymous"
                  poster={homeConfig.hero.backgroundImage}
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.5 }}
                  onError={(e) => {
                    console.error('Video playback error:', e);
                    const video = e.target as HTMLVideoElement;
                    video.style.display = 'none';
                  }}
                  onLoadedData={(e) => {
                    const video = e.target as HTMLVideoElement;
                    if (video.paused) {
                      video.play().catch(err => console.error('Auto-play failed:', err));
                    }
                  }}
                >
                  <source src={activeMedia.url} type="video/mp4" />
                </video>
              )}
            </div>
          ) : (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: homeConfig.hero.backgroundImage ? `url(${homeConfig.hero.backgroundImage})` : 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.35,
              }}
            />
          )}
          
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <div className="inline-flex items-center px-4 py-2 bg-blue-600/30 border border-blue-500/50 rounded-full mb-6">
                    <Award className="w-4 h-4 mr-2 text-yellow-400" />
                    <span className="text-sm font-medium">{t('高端卫浴领导者')}</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    {lang === 'zh' ? homeConfig.hero.title : homeConfig.hero.titleEn}<br />
                    <span className="text-blue-400">{lang === 'zh' ? homeConfig.hero.subtitle : homeConfig.hero.subtitleEn}</span>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
                    {lang === 'zh' ? homeConfig.hero.description : homeConfig.hero.descriptionEn}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <Link to="/products">
                      <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                        {lang === 'zh' ? homeConfig.hero.buttonText : homeConfig.hero.buttonTextEn}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link to="/about">
                      <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/50 text-white hover:bg-white/10">
                        {lang === 'zh' ? homeConfig.hero.button2Text : homeConfig.hero.button2TextEn}
                      </Button>
                    </Link>
                  </div>
                
                <div className="flex flex-wrap gap-6">
                  {homeConfig.certifications.slice(0, 3).map((cert, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 mr-1 text-green-400" />
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="hidden lg:block relative">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-yellow-500/20 rounded-3xl blur-2xl" />
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" 
                    alt="高端卫浴产品"
                    className="relative rounded-2xl shadow-2xl w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                  <div className="text-3xl font-bold text-blue-900">50+</div>
                  <div className="text-sm text-gray-600">{lang === 'zh' ? '国家信赖之选' : 'Countries Served'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-semibold tracking-wide text-sm uppercase mb-4 block">{t('核心技术')}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('创新技术，品质为先')}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {lang === 'zh' ? '我们致力于研发创新技术，为客户提供高品质的卫浴解决方案' : 'We are committed to developing innovative technologies to provide high-quality bathroom solutions for our customers.'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                    <tech.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {tech.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-blue-600 font-semibold tracking-wide text-sm uppercase mb-4 block">
                  {lang === 'zh' ? '生产基地' : 'Production Base'}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {lang === 'zh' ? homeConfig.factorySection?.title : homeConfig.factorySection?.titleEn}
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {lang === 'zh' ? homeConfig.factorySection?.description : homeConfig.factorySection?.descriptionEn}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="text-3xl font-bold text-blue-600">{homeConfig.factoryStats?.capacity?.value}</div>
                    <div className="text-sm text-gray-600">{lang === 'zh' ? homeConfig.factoryStats?.capacity?.label : homeConfig.factoryStats?.capacity?.labelEn}</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="text-3xl font-bold text-green-600">{homeConfig.factoryStats?.patents?.value}</div>
                    <div className="text-sm text-gray-600">{lang === 'zh' ? homeConfig.factoryStats?.patents?.label : homeConfig.factoryStats?.patents?.labelEn}</div>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4">
                    <div className="text-3xl font-bold text-yellow-600">{homeConfig.factoryStats?.passRate?.value}</div>
                    <div className="text-sm text-gray-600">{lang === 'zh' ? homeConfig.factoryStats?.passRate?.label : homeConfig.factoryStats?.passRate?.labelEn}</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="text-3xl font-bold text-purple-600">{homeConfig.factoryStats?.experience?.value}</div>
                    <div className="text-sm text-gray-600">{lang === 'zh' ? homeConfig.factoryStats?.experience?.label : homeConfig.factoryStats?.experience?.labelEn}</div>
                  </div>
                </div>
                <Link to="/factory" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  {lang === 'zh' ? homeConfig.factorySection?.buttonText : homeConfig.factorySection?.buttonTextEn}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {factories.length > 0 ? factories.map((factory) => (
                  <div key={factory.id} className="relative group overflow-hidden rounded-xl">
                    <img 
                      src={factory.image}
                      alt={lang === 'zh' ? factory.name : factory.nameEn}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className="text-white font-semibold">{lang === 'zh' ? factory.name : factory.nameEn}</h4>
                      <p className="text-gray-300 text-sm">{lang === 'zh' ? factory.location : factory.locationEn}</p>
                    </div>
                  </div>
                )) : homeConfig.factories?.map((factory) => (
                  <div key={factory.id} className="relative group overflow-hidden rounded-xl">
                    <img 
                      src={factory.image}
                      alt={lang === 'zh' ? factory.name : factory.nameEn}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className="text-white font-semibold">{lang === 'zh' ? factory.name : factory.nameEn}</h4>
                      <p className="text-gray-300 text-sm">{lang === 'zh' ? factory.location : factory.locationEn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {homeConfig.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {index === 0 && <Building className="w-8 h-8 text-white" />}
                    {index === 1 && <Globe className="w-8 h-8 text-white" />}
                    {index === 2 && <Award className="w-8 h-8 text-white" />}
                    {index === 3 && <Users className="w-8 h-8 text-white" />}
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-blue-200">{lang === 'zh' ? stat.label : stat.labelEn}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-semibold tracking-wide text-sm uppercase mb-4 block">{t('项目案例')}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('灵感画廊')}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {lang === 'zh' ? '探索我们的成功案例，获取浴室设计灵感' : 'Explore our successful cases and get bathroom design inspiration'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredInspirations.map((inspiration) => (
                <InspirationCard
                  key={inspiration.id}
                  id={inspiration.id}
                  slug={inspiration.slug}
                  style={inspiration.style}
                  title={inspiration.title}
                  titleEn={inspiration.titleEn}
                  image={inspiration.images[0]}
                  description={inspiration.description}
                  descriptionEn={inspiration.descriptionEn}
                  project={inspiration.project}
                  projectEn={inspiration.projectEn}
                  location={inspiration.location}
                  locationEn={inspiration.locationEn}
                />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link to="/inspiration">
                <Button variant="outline">
                  {lang === 'zh' ? '查看更多案例' : 'View More Cases'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-blue-600 font-semibold tracking-wide text-sm uppercase mb-4 block">{t('合作伙伴')}</span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {lang === 'zh' ? '深受知名企业信赖' : 'Trusted by Renowned Enterprises'}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {partners.map((partner) => (
                <div 
                  key={partner.id}
                  className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center h-24"
                >
                  {partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="h-12 w-auto object-contain mb-2"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                      <Building className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <span className="text-gray-600 font-semibold text-sm">
                    {lang === 'zh' ? partner.name : partner.nameEn}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {lang === 'zh' ? '准备好开始您的项目了吗？' : 'Ready to Start Your Project?'}
                  </h2>
                  <p className="text-blue-100 mb-6">
                    {lang === 'zh' ? '联系我们的专业团队，获取定制化卫浴解决方案' : 'Contact our professional team for customized bathroom solutions'}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact">
                    <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                      {lang === 'zh' ? '获取报价' : 'Get Quote'}
                    </Button>
                  </Link>
                  <Link to="/sustainability">
                    <Button variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/10">
                      {lang === 'zh' ? '可持续发展' : 'Sustainability'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
