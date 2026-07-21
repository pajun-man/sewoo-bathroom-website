import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import { Factory, Building2, Truck, Award, ArrowRight, Box, Globe, CheckCircle, Building, Users } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import factoriesData from '../data/factories.json';
import defaultHomeConfig from '../data/home-config.json';

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

interface FactoryStat {
  id: string;
  value: string;
  label: string;
  labelEn: string;
  icon: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Factory,
  Box,
  Globe,
  Award,
  Building,
  Users,
  CheckCircle,
  Building2,
  Truck,
};

const FactoryPage = () => {
  const { lang } = useI18n();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [factories, setFactories] = useState<Factory[]>(defaultFactories);
  const [factoryCategories, setFactoryCategories] = useState<{ id: string; name: string; nameEn: string }[]>([]);
  const [factoryStats, setFactoryStats] = useState<FactoryStat[]>((defaultHomeConfig.factoryStats as FactoryStat[]) || [
    { id: "bases", value: "5+", label: "生产基地", labelEn: "Production Bases", icon: "Factory" },
    { id: "capacity", value: "2.8M", label: "年产能（件）", labelEn: "Annual Capacity (pcs)", icon: "Box" },
    { id: "countries", value: "50+", label: "出口国家", labelEn: "Export Countries", icon: "Globe" },
    { id: "certification", value: "ISO9001", label: "质量认证", labelEn: "Quality Certified", icon: "Award" }
  ]);

  useEffect(() => {
    try {
      const savedHomeConfig = localStorage.getItem('homeConfig');
      if (savedHomeConfig) {
        const parsed = JSON.parse(savedHomeConfig);
        if (parsed.factoryStats && Array.isArray(parsed.factoryStats) && parsed.factoryStats.length > 0) {
          setFactoryStats(parsed.factoryStats as FactoryStat[]);
        }
      }
    } catch (error) {
      console.error('Failed to parse homeConfig from localStorage:', error);
    }

    try {
      const savedFactories = localStorage.getItem('factories');
      if (savedFactories) {
        const parsed = JSON.parse(savedFactories);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const validFactories = parsed.map((factory: any) => {
            const defaultFactory = defaultFactories.find((df: Factory) => df.id === factory.id);
            return { ...defaultFactory, ...factory };
          }).filter((f: any) => f && typeof f === 'object' && f.id && f.name && f.category);
          if (validFactories.length > 0) {
            setFactories(validFactories as Factory[]);
          }
        }
      }
    } catch (error) {
      console.error('Failed to parse factories from localStorage:', error);
    }

    try {
      const savedCategories = localStorage.getItem('factoryCategories');
      if (savedCategories) {
        const parsed = JSON.parse(savedCategories);
        if (Array.isArray(parsed)) {
          setFactoryCategories(parsed);
        }
      } else {
        setFactoryCategories([
          { id: 'cat-1', name: '淋浴房', nameEn: 'Showers' },
          { id: 'cat-2', name: '马桶/盆', nameEn: 'Toilets/Basins' },
          { id: 'cat-3', name: '智能马桶', nameEn: 'Smart Toilets' },
          { id: 'cat-4', name: '花洒', nameEn: 'Shower Heads' },
          { id: 'cat-5', name: '其他产品', nameEn: 'Others' },
        ]);
      }
    } catch (error) {
      console.error('Failed to parse factory categories from localStorage:', error);
    }
  }, []);

  const categories = [
    { zh: '全部', en: 'All' },
    ...factoryCategories.map(cat => ({ zh: cat.name, en: cat.nameEn })),
  ];

  const activeCategoryKey = activeCategory || (lang === 'zh' ? '全部' : 'All');
  const filteredFactories = activeCategoryKey !== (lang === 'zh' ? '全部' : 'All')
    ? factories.filter(f => lang === 'zh' ? f.category === activeCategoryKey : f.categoryEn === activeCategoryKey)
    : factories;

  return (
    <>
      <SEO
        title={lang === 'zh' ? '工厂介绍 - SEWOO 高端卫浴' : 'Factory Introduction - SEWOO Premium Bathroom'}
        description={lang === 'zh' ? '了解SEWOO的生产基地和工厂设施，我们拥有多个专业生产基地，确保产品品质和交付能力。' : 'Learn about SEWOO\'s production bases and factory facilities. We have multiple specialized production bases to ensure product quality and delivery capacity.'}
        keywords={lang === 'zh' ? ['工厂介绍', '生产基地', '卫浴制造', 'SEWOO'] : ['factory', 'production', 'bathroom', 'SEWOO']}
      />

      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">{lang === 'zh' ? '工厂介绍' : 'Factory Introduction'}</h1>
          <p className="text-xl opacity-90">
            {lang === 'zh' ? '了解我们的生产基地和制造能力' : 'Learn about our production bases and manufacturing capabilities'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const label = lang === 'zh' ? category.zh : category.en;
            return (
              <button
                key={category.zh}
                onClick={() => setActiveCategory(activeCategory === category.zh ? null : category.zh)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === category.zh
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFactories.map((factory) => (
            <Link key={factory.id} to={`/factory/${factory.id}`} className="group">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                <div className="aspect-video overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                  <img
                    src={factory.image}
                    alt={factory.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                      {lang === 'zh' ? factory.category : factory.categoryEn}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {lang === 'zh' ? factory.location : factory.locationEn}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                    {lang === 'zh' ? factory.name : factory.nameEn}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {lang === 'zh' ? factory.description : factory.descriptionEn}
                  </p>
                  <div className="flex items-center text-yellow-600 font-semibold mb-4">
                    <Factory className="w-5 h-5 mr-2" />
                    {lang === 'zh' ? factory.capacity : factory.capacityEn}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {factory.features.map((feature, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        {lang === 'zh' ? feature.zh : feature.en}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">{lang === 'zh' ? '了解更多' : 'Learn More'}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {factoryStats.map((stat) => {
            const IconComponent = iconMap[stat.icon] || Factory;
            return (
              <div key={stat.id} className="bg-blue-900 text-white rounded-xl p-8 text-center">
                <IconComponent className="w-12 h-12 mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-200">{lang === 'zh' ? stat.label : stat.labelEn}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FactoryPage;
