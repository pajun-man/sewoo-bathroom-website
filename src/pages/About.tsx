import SEO from '../components/seo/SEO';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Award, Users, Globe, Lightbulb } from 'lucide-react';
import seoConfig from '../data/seo-config.json';
import { useI18n } from '../contexts/I18nContext';

const About = () => {
  const { lang, t } = useI18n();
  const aboutPageConfig = seoConfig.pages.find(p => p.page === 'about');
  
  const savedPages = localStorage.getItem('pages');
  const pages = savedPages ? JSON.parse(savedPages) : [];
  const aboutPage = pages.find((p: any) => p.name === '关于我们' || p.id === '2');

  const seoTitle = lang === 'zh'
    ? (aboutPage?.title || aboutPageConfig?.title || '关于我们')
    : (aboutPage?.titleEn || aboutPageConfig?.titleEn || 'About Us');
  
  const seoDescription = lang === 'zh'
    ? (aboutPage?.description || aboutPageConfig?.description || '')
    : (aboutPage?.descriptionEn || aboutPageConfig?.descriptionEn || '');

  const seoKeywords = lang === 'zh'
    ? (aboutPage?.keywords || aboutPageConfig?.keywords || [])
    : (aboutPage?.keywordsEn || aboutPageConfig?.keywords || []);

  const milestones = [
    { year: '2003', event: lang === 'zh' ? 'SEWOO 成立，首个生产基地投产' : 'SEWOO Founded, First Production Base' },
    { year: '2010', event: lang === 'zh' ? '整合产业链，成立供应链集合体' : 'Supply Chain Integration' },
    { year: '2015', event: lang === 'zh' ? '五大生产基地布局完成' : 'Five Production Bases Established' },
    { year: '2020', event: lang === 'zh' ? '智能卫浴生产基地投产' : 'Smart Bathroom Factory Launched' },
    { year: '2024', event: lang === 'zh' ? '年产能突破500万件' : 'Annual Capacity Exceeded 5 Million' },
  ];

  const values = [
    {
      icon: Award,
      title: t('品质至上'),
      description: t('严格质量管控体系，确保每件产品达到国际标准。'),
    },
    {
      icon: Lightbulb,
      title: t('技术创新'),
      description: t('持续研发投入，掌握核心技术，提供OEM/ODM定制服务。'),
    },
    {
      icon: Users,
      title: t('客户为本'),
      description: t('以客户需求为导向，提供一站式供应链解决方案。'),
    },
    {
      icon: Globe,
      title: t('全球布局'),
      description: t('五大生产基地，覆盖全球50+国家市场。'),
    },
  ];

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonical={aboutPageConfig?.canonical}
      />

      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">{lang === 'zh' ? '关于 SEWOO' : 'About SEWOO'}</h1>
          <p className="text-xl opacity-90">
            {lang === 'zh' ? '工厂供应链集合体，整合五大生产基地' : 'Factory Supply Chain Collective, Integrating Five Production Bases'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {lang === 'zh' ? '我们的故事' : 'Our Story'}
            </h2>
            {aboutPage?.content ? (
              <div dangerouslySetInnerHTML={{ __html: lang === 'zh' ? aboutPage.content : (aboutPage.contentEn || aboutPage.content) }} className="text-lg text-gray-600 space-y-4" />
            ) : (
              <>
                <p className="text-lg text-gray-600 mb-4">
                  {lang === 'zh' ? 'SEWOO工厂供应链集合体成立于2003年，是中国领先的高端卫浴制造商之一。21年来，我们整合五大专业生产基地，致力于为全球客户提供高品质卫浴产品OEM/ODM定制服务。' : 'Founded in 2003, SEWOO Factory Supply Chain Collective is one of China\'s leading premium bathroom manufacturers. For 21 years, we have integrated five specialized production bases, committed to providing OEM/ODM customization services for global customers.'}
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  {lang === 'zh' ? '我们在广东佛山、江西景德镇、浙江杭州、福建厦门、江苏苏州等地设有专业生产基地，涵盖淋浴房、陶瓷洁具、智能卫浴、花洒、浴室家具等全品类卫浴产品制造。' : 'We have specialized production bases in Foshan, Jingdezhen, Hangzhou, Xiamen, and Suzhou, covering shower enclosures, ceramic ware, smart bathroom, shower heads, and bathroom furniture manufacturing.'}
                </p>
                <p className="text-lg text-gray-600">
                  {lang === 'zh' ? '我们的产品远销欧洲、北美、东南亚等50多个国家和地区，为全球客户提供一站式供应链解决方案，赢得了广泛信赖与好评。' : 'Our products are exported to over 50 countries in Europe, North America, and Southeast Asia, providing one-stop supply chain solutions for global customers and earning widespread trust and praise.'}
                </p>
              </>
            )}
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800"
              alt="SEWOO 工厂"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl font-bold mb-1">21+</div>
              <div className="text-sm">年行业经验</div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            {lang === 'zh' ? '发展历程' : 'Milestones'}
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`w-5/12 bg-white p-6 rounded-lg shadow-md ${
                      index % 2 === 0 ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div className="text-3xl font-bold text-blue-900 mb-2">
                      {milestone.year}
                    </div>
                    <div className="text-gray-700">{milestone.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20" id="technology">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            {t('技术创新')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('节水技术')}
              </h3>
              <p className="text-gray-600">
                {lang === 'zh' ? '我们研发的节水花洒采用先进的空气注入技术，在保证淋浴体验的同时，可节水50%以上。产品通过欧盟节水认证，为环保事业贡献力量。' : 'Our water-saving shower heads use advanced air injection technology, reducing water consumption by over 50% while maintaining shower experience. Certified by EU water-saving standards.'}
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('智能控制')}
              </h3>
              <p className="text-gray-600">
                {lang === 'zh' ? '智能马桶系列搭载自主研发的控制系统，支持手机APP远程控制、语音控制等多种交互方式，为用户带来便捷的使用体验。' : 'Smart toilet series features self-developed control system, supporting mobile APP remote control, voice control and other interaction methods for convenient user experience.'}
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('高级饰面')}
              </h3>
              <p className="text-gray-600">
                {lang === 'zh' ? '采用PVD真空镀膜技术，显著提升产品表面硬度和耐腐蚀性，确保产品长期使用仍保持亮丽如新。多种颜色和纹理可选，满足个性化需求。' : 'Using PVD vacuum coating technology, significantly improves surface hardness and corrosion resistance. Various colors and textures available for personalized needs.'}
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('抗菌技术')}
              </h3>
              <p className="text-gray-600">
                {lang === 'zh' ? '在陶瓷釉料中添加纳米银离子，有效抑制细菌滋生，经权威机构检测，抗菌率高达99.9%，守护家人健康。' : 'Nano silver ions added to ceramic glaze effectively inhibit bacterial growth. Tested by authoritative institutions with 99.9% antibacterial rate.'}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-20" id="sustainability">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            {t('核心价值观')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-10 h-10 text-blue-900" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-900 text-white rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {lang === 'zh' ? '期待与您合作' : 'Looking Forward to Cooperating With You'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {lang === 'zh' ? '无论您是终端消费者还是商业合作伙伴，我们都期待为您提供优质的产品和服务' : 'Whether you are an end consumer or business partner, we look forward to providing you with quality products and services'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto">
                {t('联系我们')}
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-900">
                {lang === 'zh' ? '浏览产品' : 'Browse Products'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
