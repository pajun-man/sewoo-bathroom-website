import { useState, useEffect } from 'react';
import SEO from '../components/seo/SEO';
import InspirationCard from '../components/ui/InspirationCard';
import Button from '../components/ui/Button';
import defaultInspirations from '../data/inspirations.json';
import seoConfig from '../data/seo-config.json';
import { useI18n } from '../contexts/I18nContext';
import { loadFromStorage } from '../data/loader';

interface Inspiration {
  id: string;
  slug: string;
  style: string;
  title: string;
  titleEn: string;
  project?: string;
  projectEn?: string;
  location: string;
  locationEn?: string;
  images: string[];
  description: string;
  descriptionEn: string;
  seo?: {
    title?: string;
    titleEn?: string;
    description?: string;
    descriptionEn?: string;
    keywords?: string[];
  };
  styleEn?: string;
  area?: string;
  createdAt?: string;
  updatedAt?: string;
}

const Inspiration = () => {
  const { lang, t } = useI18n();
  const [activeStyle, setActiveStyle] = useState('all');
  const [inspirations, setInspirations] = useState<Inspiration[]>(defaultInspirations);
  const [designStyles, setDesignStyles] = useState<{ key: string; name: string; nameEn: string }[]>([
    { key: 'modern', name: '现代风格', nameEn: 'Modern style' },
    { key: 'classic', name: '经典风格', nameEn: 'Classic style' },
    { key: 'minimalist', name: '极简风格', nameEn: 'Minimalist style' },
  ]);

  useEffect(() => {
    const loadData = () => {
      try {
        const loadedInspirations = loadFromStorage('inspirations', defaultInspirations);
        setInspirations(loadedInspirations);
        
        const savedStyles = localStorage.getItem('designStyles');
        if (savedStyles) {
          const parsed = JSON.parse(savedStyles);
          if (Array.isArray(parsed) && parsed.length > 0) {
            if (typeof parsed[0] === 'string') {
              const migrated = parsed.map((s: string) => ({ key: s.toLowerCase().replace(/\s+/g, '-'), name: s, nameEn: s }));
              setDesignStyles(migrated);
            } else {
              const migrated = parsed.map((style: any) => ({
                key: style.key || style.name.toLowerCase().replace(/\s+/g, '-'),
                name: style.name,
                nameEn: style.nameEn || style.name
              }));
              setDesignStyles(migrated);
            }
          }
        }
      } catch (error) {
        console.error('Failed to parse from localStorage:', error);
      }
    };

    loadData();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'inspirations' || e.key === 'designStyles') {
        loadData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const styles = [
    { key: 'all', label: lang === 'zh' ? '全部风格' : 'All Styles' },
    ...designStyles.map(style => ({
      key: style.key,
      label: lang === 'zh' ? style.name : style.nameEn,
    })),
  ];

  const filteredInspirations = activeStyle === 'all'
    ? inspirations
    : inspirations.filter(i => {
        if (i.style === activeStyle) return true;
        const matchedStyle = designStyles.find(s => s.key === activeStyle);
        if (matchedStyle && (i.style === matchedStyle.name || i.style === matchedStyle.nameEn)) return true;
        return false;
      });

  const inspirationPageConfig = seoConfig.pages.find(p => p.page === 'inspiration');

  return (
    <>
      <SEO
        title={inspirationPageConfig?.title || '灵感画廊'}
        description={inspirationPageConfig?.description || ''}
        keywords={inspirationPageConfig?.keywords || []}
        canonical={inspirationPageConfig?.canonical}
      />

      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">{lang === 'zh' ? '灵感画廊' : 'Inspiration Gallery'}</h1>
          <p className="text-xl opacity-90">
            {lang === 'zh' ? '探索现代浴室设计灵感，激发您的创意' : 'Explore modern bathroom design inspirations'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {styles.map((style) => (
            <button
              key={style.key}
              onClick={() => setActiveStyle(style.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeStyle === style.key
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInspirations.map((inspiration) => (
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

        {filteredInspirations.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              {lang === 'zh' ? '该风格暂无案例' : 'No cases found for this style'}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Inspiration;
