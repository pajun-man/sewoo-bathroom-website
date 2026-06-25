import { useState, useEffect } from 'react';
import SEO from '../components/seo/SEO';
import { Leaf, Droplets, Recycle, Sun, Heart, Award, TrendingUp, Globe } from 'lucide-react';
import seoConfig from '../data/seo-config.json';
import { useI18n } from '../contexts/I18nContext';

const iconMap: Record<string, typeof Leaf> = {
  Droplets,
  Leaf,
  Recycle,
  Sun,
  Heart,
  Award,
  Globe,
};

interface Commitment {
  icon: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  stat: string;
  statLabel: string;
  statLabelEn: string;
}

interface Initiative {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  image: string;
}

interface Goal {
  year: string;
  target: string;
  targetEn: string;
}

interface SustainabilityData {
  id: string;
  heroTitle: string;
  heroTitleEn: string;
  heroSubtitle: string;
  heroSubtitleEn: string;
  heroDescription: string;
  heroDescriptionEn: string;
  commitments: Commitment[];
  initiatives: Initiative[];
  socialTitle: string;
  socialTitleEn: string;
  socialDescription: string;
  socialDescriptionEn: string;
  goals: Goal[];
  stats: {
    certifications: string;
    certificationsLabel?: string;
    certificationsLabelEn?: string;
    greenProducts: string;
    greenProductsLabel?: string;
    greenProductsLabelEn?: string;
    carbonReduction: string;
    carbonReductionLabel?: string;
    carbonReductionLabelEn?: string;
    treesPlanted: string;
    treesPlantedLabel?: string;
    treesPlantedLabelEn?: string;
  };
}

const defaultSustainabilityData: SustainabilityData = {
  id: 'sustainability',
  heroTitle: '可持续发展',
  heroTitleEn: 'Sustainability',
  heroSubtitle: 'SEWOO 致力于可持续发展，创造更美好的未来',
  heroSubtitleEn: 'SEWOO is committed to sustainability for a better future',
  heroDescription: '我们相信，企业的成功应该与环境的可持续发展相辅相成',
  heroDescriptionEn: 'We believe business success should go hand in hand with environmental sustainability',
  commitments: [
    {
      icon: 'Droplets',
      title: '水资源保护',
      titleEn: 'Water Conservation',
      description: '开发节水型产品，帮助全球用户减少水资源消耗。我们的智能马桶和花洒产品可节省高达40%的用水量。',
      descriptionEn: 'Develop water-saving products to help users worldwide reduce water consumption. Our smart toilets and showers can save up to 40% water.',
      stat: '40%',
      statLabel: '节水率',
      statLabelEn: 'Water Saving Rate',
    },
    {
      icon: 'Leaf',
      title: '绿色生产',
      titleEn: 'Green Production',
      description: '采用环保材料和清洁生产工艺，减少碳排放。我们的工厂已实现100%可再生能源供电。',
      descriptionEn: 'Use eco-friendly materials and clean production processes to reduce carbon emissions. Our factories achieve 100% renewable energy power.',
      stat: '100%',
      statLabel: '可再生能源',
      statLabelEn: 'Renewable Energy',
    },
    {
      icon: 'Recycle',
      title: '循环经济',
      titleEn: 'Circular Economy',
      description: '推行产品全生命周期管理，从原材料采购到产品回收，实现资源的循环利用。',
      descriptionEn: 'Implement product lifecycle management, from raw material procurement to product recycling, achieving resource circularity.',
      stat: '95%',
      statLabel: '材料回收率',
      statLabelEn: 'Material Recovery Rate',
    },
    {
      icon: 'Sun',
      title: '清洁能源',
      titleEn: 'Clean Energy',
      description: '积极投资太阳能和风能项目，减少生产过程中的碳排放，为碳中和目标努力。',
      descriptionEn: 'Actively invest in solar and wind energy projects to reduce carbon emissions in production and work towards carbon neutrality.',
      stat: 'Zero',
      statLabel: '碳排放',
      statLabelEn: 'Carbon Emission',
    },
  ],
  initiatives: [
    {
      title: '节水技术研发',
      titleEn: 'Water Saving Technology R&D',
      description: '持续投入研发更高效的节水技术，开发智能感应和自动调节功能的卫浴产品。',
      descriptionEn: 'Continue investing in R&D of more efficient water-saving technologies and develop bathroom products with smart sensing and auto-adjustment features.',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600',
    },
    {
      title: '环保材料创新',
      titleEn: 'Eco-friendly Material Innovation',
      description: '使用可回收和生物降解材料，减少对环境的影响，推动行业绿色转型。',
      descriptionEn: 'Use recyclable and biodegradable materials to reduce environmental impact and promote green transformation in the industry.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d365f?w=600',
    },
    {
      title: '碳中和工厂',
      titleEn: 'Carbon Neutral Factories',
      description: '所有生产基地已实现碳中和，通过植树造林和清洁能源抵消碳排放。',
      descriptionEn: 'All production bases have achieved carbon neutrality by offsetting emissions through afforestation and clean energy.',
      image: 'https://images.unsplash.com/photo-1600612253971-1e7b7d365f0e?w=600',
    },
  ],
  socialTitle: '回馈社会，创造价值',
  socialTitleEn: 'Giving Back to Society',
  socialDescription: '我们不仅关注环境保护，也致力于改善社区生活。通过教育支持、公益捐赠和志愿者活动，我们正在积极回馈社会。',
  socialDescriptionEn: 'We not only focus on environmental protection but also strive to improve community life. Through education support, charitable donations, and volunteer activities, we are actively giving back to society.',
  goals: [
    { year: '2025', target: '所有产品实现节水认证', targetEn: 'All products achieve water-saving certification' },
    { year: '2027', target: '碳中和生产全面实现', targetEn: 'Full carbon neutral production achieved' },
    { year: '2030', target: '100%可回收包装材料', targetEn: '100% recyclable packaging materials' },
    { year: '2035', target: '零废弃物填埋', targetEn: 'Zero waste to landfill' },
  ],
  stats: {
    certifications: '50+',
    certificationsLabel: '环保认证',
    certificationsLabelEn: 'Eco Certifications',
    greenProducts: '100',
    greenProductsLabel: '绿色产品',
    greenProductsLabelEn: 'Green Products',
    carbonReduction: '500K',
    carbonReductionLabel: '吨碳排放减少',
    carbonReductionLabelEn: 'Tons CO2 Reduced',
    treesPlanted: '100K',
    treesPlantedLabel: '棵树种植',
    treesPlantedLabelEn: 'Trees Planted',
  },
};

const Dealers = () => {
  const { lang } = useI18n();
  const [sustainability, setSustainability] = useState<SustainabilityData>(defaultSustainabilityData);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sustainability');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) {
          setSustainability({ ...defaultSustainabilityData, ...parsed });
        }
      }
    } catch (error) {
      console.error('Failed to parse sustainability data:', error);
    }
  }, []);

  const sustainabilityPageConfig = seoConfig.pages.find(p => p.page === 'sustainability') || {
    title: lang === 'zh' ? sustainability.heroTitle : sustainability.heroTitleEn,
    description: lang === 'zh' ? sustainability.heroSubtitle : sustainability.heroSubtitleEn,
    keywords: lang === 'zh' ? ['可持续发展', '环保', '社会责任', '绿色生产'] : ['sustainability', 'environment', 'social responsibility', 'green production'],
  };

  return (
    <>
      <SEO
        title={sustainabilityPageConfig.title}
        description={sustainabilityPageConfig.description}
        keywords={sustainabilityPageConfig.keywords}
      />

      <div className="bg-gradient-to-br from-green-800 via-blue-900 to-green-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-8">
            <Leaf className="w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{lang === 'zh' ? sustainability.heroTitle : sustainability.heroTitleEn}</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
            {lang === 'zh' ? sustainability.heroSubtitle : sustainability.heroSubtitleEn}
          </p>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            {lang === 'zh' ? sustainability.heroDescription : sustainability.heroDescriptionEn}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            {lang === 'zh' ? '我们的承诺' : 'Our Commitments'}
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {lang === 'zh' ? '为地球做出改变' : 'Making a Difference for Earth'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {lang === 'zh' ? '通过创新技术和可持续实践，我们正在为更美好的未来奠定基础' : 'Through innovative technology and sustainable practices, we are laying the foundation for a better future'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sustainability.commitments.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-lg mb-6">
                {(() => {
                  const IconComponent = iconMap[item.icon] || Leaf;
                  return <IconComponent className="w-8 h-8 text-green-600" />;
                })()}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {lang === 'zh' ? item.title : item.titleEn}
              </h3>
              <p className="text-gray-600 mb-6">
                {lang === 'zh' ? item.description : item.descriptionEn}
              </p>
              <div className="border-t pt-4">
                <div className="text-3xl font-bold text-green-600">{item.stat}</div>
                <div className="text-sm text-gray-500">{lang === 'zh' ? item.statLabel : item.statLabelEn}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              {lang === 'zh' ? '重点项目' : 'Key Initiatives'}
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {lang === 'zh' ? '可持续发展行动' : 'Sustainability Actions'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {lang === 'zh' ? '我们正在实施多项举措，推动可持续发展目标的实现' : 'We are implementing multiple initiatives to achieve sustainability goals'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sustainability.initiatives.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225"%3E%3Crect fill="%23e5e7eb" width="400" height="225"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="16" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E图片加载中%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {lang === 'zh' ? item.title : item.titleEn}
                  </h3>
                  <p className="text-gray-600">
                    {lang === 'zh' ? item.description : item.descriptionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-4">
              {lang === 'zh' ? '社会责任' : 'Social Responsibility'}
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {lang === 'zh' ? sustainability.socialTitle : sustainability.socialTitleEn}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {lang === 'zh' ? sustainability.socialDescription : sustainability.socialDescriptionEn}
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Heart className="w-8 h-8 text-red-500" />
                <div>
                  <div className="font-semibold text-gray-900">{lang === 'zh' ? '公益捐赠' : 'Charitable Donations'}</div>
                  <div className="text-gray-600">{lang === 'zh' ? '每年投入1%利润用于慈善事业' : '1% of annual profits donated to charity'}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Award className="w-8 h-8 text-yellow-500" />
                <div>
                  <div className="font-semibold text-gray-900">{lang === 'zh' ? '员工培训' : 'Employee Training'}</div>
                  <div className="text-gray-600">{lang === 'zh' ? '持续提升员工技能和福利' : 'Continuous skill development and benefits'}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Globe className="w-8 h-8 text-blue-500" />
                <div>
                  <div className="font-semibold text-gray-900">{lang === 'zh' ? '社区建设' : 'Community Development'}</div>
                  <div className="text-gray-600">{lang === 'zh' ? '支持当地教育和基础设施建设' : 'Support local education and infrastructure'}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">{lang === 'zh' ? '可持续发展目标' : 'Sustainability Goals'}</h3>
            <div className="space-y-6">
              {sustainability.goals.map((goal, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-xl font-bold">{goal.year}</span>
                    </div>
                    <span>{lang === 'zh' ? goal.target : goal.targetEn}</span>
                  </div>
                  <TrendingUp className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">{sustainability.stats.certifications}</div>
              <div className="text-gray-400">{lang === 'zh' ? (sustainability.stats.certificationsLabel || '环保认证') : (sustainability.stats.certificationsLabelEn || 'Eco Certifications')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">{sustainability.stats.greenProducts}</div>
              <div className="text-gray-400">{lang === 'zh' ? (sustainability.stats.greenProductsLabel || '绿色产品') : (sustainability.stats.greenProductsLabelEn || 'Green Products')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">{sustainability.stats.carbonReduction}</div>
              <div className="text-gray-400">{lang === 'zh' ? (sustainability.stats.carbonReductionLabel || '吨碳排放减少') : (sustainability.stats.carbonReductionLabelEn || 'Tons CO2 Reduced')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">{sustainability.stats.treesPlanted}</div>
              <div className="text-gray-400">{lang === 'zh' ? (sustainability.stats.treesPlantedLabel || '棵树种植') : (sustainability.stats.treesPlantedLabelEn || 'Trees Planted')}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dealers;
