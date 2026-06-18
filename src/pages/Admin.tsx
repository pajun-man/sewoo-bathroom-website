import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Package, Palette, FileText, Building, Upload, X, Plus, Save, Edit2, Trash2, Mail, MessageSquare, FolderOpen, Download, FileImage, Phone, Calendar, Share2, Check, ChevronDown, ChevronRight, Leaf, Menu, Image as ImageIcon, Tags, Pencil, Database, RefreshCw, Copy as CopyIcon } from 'lucide-react';
import defaultFactories from '../data/factories.json';

interface Product {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  category: string;
  subcategory: string;
  description: string;
  descriptionEn: string;
  images: string[];
  features: string[];
  featuresEn: string[];
  specifications: Record<string, string>;
  specificationsEn: Record<string, string>;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  documents: {
    manual: string;
    technicalData: string;
    imagesDownload: string;
    quote: string;
    appointment: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Inspiration {
    id: string;
    slug: string;
    title: string;
    titleEn: string;
    style: string;
    description: string;
    descriptionEn: string;
    images: string[];
    videos: string[];
    project: string;
    projectEn: string;
    location: string;
    locationEn: string;
    area: string;
    shareUrl: string;
    downloadUrl: string;
    createdAt: string;
    updatedAt: string;
}

interface Page {
  id: string;
  name: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
}

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
  videos: { id: string; title: string; titleEn: string; urlZh: string; urlEn: string; poster?: string }[];
  phone: string;
  phoneEn: string;
  email: string;
  emailEn: string;
  workingHours: string;
  workingHoursEn: string;
  certifications: { name: string; nameEn: string; icon: string }[];
  factoryArea: string;
  factoryAreaEn: string;
  technicalStaff: string;
  technicalStaffEn: string;
  exportCountries: string;
  exportCountriesEn: string;
  patentTechnologies: string;
  patentTechnologiesEn: string;
  factoryStrengthTitle: string;
  factoryStrengthTitleEn: string;
}

interface Category {
  id: string;
  name: string;
  nameEn: string;
  subcategories: { id: string; name: string; nameEn: string }[];
}

interface FactoryCategory {
  id: string;
  name: string;
  nameEn: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
}

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [productList, setProductList] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [inspirationList, setInspirationList] = useState<Inspiration[]>([]);
  const [editingInspiration, setEditingInspiration] = useState<Inspiration | null>(null);
  const [pageList, setPageList] = useState<Page[]>([]);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [factoryList, setFactoryList] = useState<Factory[]>([]);
  const [editingFactory, setEditingFactory] = useState<Factory | null>(null);
  const [factoryCategories, setFactoryCategories] = useState<FactoryCategory[]>([]);
  const [editingFactoryCategory, setEditingFactoryCategory] = useState<FactoryCategory | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [siteLogo, setSiteLogo] = useState<string>('');
  const [siteTitle, setSiteTitle] = useState<string>('');
  const [siteTitleEn, setSiteTitleEn] = useState<string>('');
  const [designStyles, setDesignStyles] = useState<{ name: string; nameEn: string }[]>([
    { name: '现代风格', nameEn: 'Modern' },
    { name: '古典风格', nameEn: 'Classic' },
    { name: '简约风格', nameEn: 'Minimalist' },
    { name: '奢华风格', nameEn: 'Luxury' },
  ]);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [newFeature, setNewFeature] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [newFeatureEn, setNewFeatureEn] = useState('');
  const [newSpecKeyEn, setNewSpecKeyEn] = useState('');
  const [newSpecValueEn, setNewSpecValueEn] = useState('');
  const [newFactoryFeature, setNewFactoryFeature] = useState('');
  const [newFactoryFeatureEn, setNewFactoryFeatureEn] = useState('');
  const [newFactoryVideoTitle, setNewFactoryVideoTitle] = useState('');
  const [newFactoryVideoTitleEn, setNewFactoryVideoTitleEn] = useState('');
  const [newFactoryVideoUrlZh, setNewFactoryVideoUrlZh] = useState('');
  const [newFactoryVideoUrlEn, setNewFactoryVideoUrlEn] = useState('');
  const [newFactoryCertName, setNewFactoryCertName] = useState('');
  const [newFactoryCertNameEn, setNewFactoryCertNameEn] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newFactoryImageUrl, setNewFactoryImageUrl] = useState('');
  const [newInspirationImageUrl, setNewInspirationImageUrl] = useState('');
  const [newStyle, setNewStyle] = useState('');
  const [newStyleEn, setNewStyleEn] = useState('');
  
  const [sustainabilityData, setSustainabilityData] = useState({
    id: 'sustainability',
    heroTitle: '可持续发展',
    heroSubtitle: 'SEWOO 致力于可持续发展，创造更美好的未来',
    heroDescription: '我们相信，企业的成功应该与环境的可持续发展相辅相成',
    commitments: [
      { icon: 'Droplets', title: '水资源保护', description: '开发节水型产品，帮助全球用户减少水资源消耗。', stat: '40%', statLabel: '节水率' },
      { icon: 'Leaf', title: '绿色生产', description: '采用环保材料和清洁生产工艺，减少碳排放。', stat: '100%', statLabel: '可再生能源' },
      { icon: 'Recycle', title: '循环经济', description: '推行产品全生命周期管理，实现资源的循环利用。', stat: '95%', statLabel: '材料回收率' },
      { icon: 'Sun', title: '清洁能源', description: '积极投资太阳能和风能项目，为碳中和目标努力。', stat: '零', statLabel: '碳排放' },
    ],
    initiatives: [
      { title: '节水技术研发', description: '持续投入研发更高效的节水技术。', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600' },
      { title: '环保材料创新', description: '使用可回收和生物降解材料。', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d365f?w=600' },
      { title: '碳中和工厂', description: '所有生产基地已实现碳中和。', image: 'https://images.unsplash.com/photo-1600612253971-1e7b7d365f0e?w=600' },
    ],
    socialTitle: '回馈社会，创造价值',
    socialDescription: '我们不仅关注环境保护，也致力于改善社区生活。',
    goals: [
      { year: '2025', target: '所有产品实现节水认证' },
      { year: '2027', target: '碳中和生产全面实现' },
      { year: '2030', target: '100%可回收包装材料' },
      { year: '2035', target: '零废弃物填埋' },
    ],
    stats: {
      certifications: '50+',
      certificationsLabel: '环保认证',
      greenProducts: '100',
      greenProductsLabel: '绿色产品',
      carbonReduction: '50万',
      carbonReductionLabel: '碳排放减少',
      treesPlanted: '10万',
      treesPlantedLabel: '树种植',
    },
  });
  const [newSubcategory, setNewSubcategory] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const [partners, setPartners] = useState<{ id: string; name: string; nameEn: string; logo: string; isEditing?: boolean }[]>([
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

  const [contactInfo, setContactInfo] = useState({
    companyName: 'SEWOO',
    slogan: '工厂供应链集合体，专注高端卫浴制造二十余年，为全球客户提供优质产品与服务。',
    sloganEn: 'Factory Supply Chain Collective, specializing in premium bathroom manufacturing for over 20 years, providing quality products and services worldwide.',
    address: '广东省佛山市禅城区',
    addressEn: 'Chancheng District, Foshan City, Guangdong Province',
    addressLine2: '卫浴产业园区88号',
    addressLine2En: 'No. 88, Bathroom Industrial Park',
    phone: '+86 400-888-9999',
    phoneHours: '周一至周六 9:00-18:00',
    phoneHoursEn: 'Mon-Sat 9:00-18:00',
    emails: ['info@sewoo-bath.com', 'support@sewoo-bath.com'],
    workTime: {
      weekday: '周一至周五: 9:00 - 18:00',
      weekdayEn: 'Monday-Friday: 9:00 - 18:00',
      saturday: '周六: 9:00 - 17:00',
      saturdayEn: 'Saturday: 9:00 - 17:00',
      sunday: '周日: 休息',
      sundayEn: 'Sunday: Closed',
    },
  });

  const [footerInfo, setFooterInfo] = useState({
    companyName: 'SEWOO',
    slogan: '工厂供应链集合体，专注高端卫浴制造二十余年，为全球客户提供优质产品与服务。',
    address: '广东省佛山市禅城区',
    addressLine2: '卫浴产业园区88号',
    phone: '+86 400-888-9999',
    email: 'info@sewoo-bath.com',
    instagramUrl: 'https://instagram.com/sewoobath',
    facebookUrl: 'https://facebook.com/sewoobath',
    youtubeUrl: 'https://youtube.com/sewoobath',
  });

  const [navItems, setNavItems] = useState([
    { path: '/', label: '首页', labelEn: 'Home' },
    { 
      path: '/products', 
      label: '产品中心', 
      labelEn: 'Products', 
      hasDropdown: true,
      dropdownItems: [
        { label: '淋浴房', labelEn: 'Showers', subItems: ['整体淋浴房', '淋浴屏风', '淋浴底座'] },
        { label: '马桶', labelEn: 'Toilets', subItems: ['连体马桶', '分体马桶', '壁挂马桶'] },
        { label: '盆', labelEn: 'Basins', subItems: ['台上盆', '台下盆', '立柱盆', '一体盆'] },
        { label: '智能马桶', labelEn: 'Smart Toilets', subItems: ['全自动智能马桶', '智能马桶盖', '智能小便斗'] },
        { label: '花洒', labelEn: 'Showers', subItems: ['淋浴花洒套装', '手持花洒', '头顶花洒', '淋浴龙头'] },
        { label: '其他产品', labelEn: 'Others', subItems: ['浴室家具', '地板', '五金配件', '浴室柜'] },
      ]
    },
    { path: '/inspiration', label: '灵感画廊', labelEn: 'Inspiration' },
    { path: '/factory', label: '工厂介绍', labelEn: 'Factory' },
    { path: '/about', label: '关于我们', labelEn: 'About' },
    { path: '/dealers', label: '可持续发展', labelEn: 'Sustainability' },
    { path: '/contact', label: '联系我们', labelEn: 'Contact' },
  ]);

  const [homeConfig, setHomeConfig] = useState({
    version: '2.0.0',
    hero: {
      title: '工厂供应链',
      titleEn: 'Factory Supply Chain',
      subtitle: '集合体',
      subtitleEn: 'Collective',
      description: 'SEWOO工厂供应链集合体，整合多个现代化生产基地，为全球客户提供高品质卫浴产品OEM/ODM定制服务，一站式供应链解决方案。',
      descriptionEn: 'SEWOO Factory Supply Chain Collective integrates multiple modern production bases, providing premium bathroom products OEM/ODM customization services and one-stop supply chain solutions for global customers.',
      buttonText: '探索产品',
      buttonTextEn: 'Explore Products',
      button2Text: '参观工厂',
      button2TextEn: 'Visit Factory',
      backgroundImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1920',
      media: [],
      useVideo: false,
    },
    stats: [
      { value: '5', label: '生产基地', labelEn: 'Production Bases' },
      { value: '50+', label: '出口国家', labelEn: 'Export Countries' },
      { value: '20+', label: '年行业经验', labelEn: 'Years Experience' },
      { value: '500万+', label: '年产能', labelEn: 'Annual Capacity' },
    ],
    certifications: ['ISO 9001', 'ISO 14001', 'CE认证'],
  });

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    const savedInspirations = localStorage.getItem('inspirations');
    const savedPages = localStorage.getItem('pages');
    const savedCategories = localStorage.getItem('categories');
    const savedMessages = localStorage.getItem('contactMessages');
    const savedStyles = localStorage.getItem('designStyles');

    if (savedProducts) setProductList(JSON.parse(savedProducts));
    if (savedInspirations) setInspirationList(JSON.parse(savedInspirations));
    if (savedPages) {
      const parsedPages = JSON.parse(savedPages);
      const filteredPages = parsedPages.filter((p: any) => p.name !== '经销商' && p.name !== 'Dealers');
      setPageList(filteredPages);
      if (filteredPages.length !== parsedPages.length) {
        localStorage.setItem('pages', JSON.stringify(filteredPages));
      }
    }
    if (savedMessages) setContactMessages(JSON.parse(savedMessages));
    if (savedStyles) {
      const parsed = JSON.parse(savedStyles);
      if (Array.isArray(parsed) && parsed.length > 0) {
        if (typeof parsed[0] === 'string') {
          const migrated = parsed.map((s: string) => ({ name: s, nameEn: s }));
          setDesignStyles(migrated);
          localStorage.setItem('designStyles', JSON.stringify(migrated));
        } else {
          setDesignStyles(parsed);
        }
      }
    } else {
      const defaultStyles = [
        { name: '现代风格', nameEn: 'Modern' },
        { name: '经典风格', nameEn: 'Classic' },
        { name: '极简风格', nameEn: 'Minimalist' },
      ];
      setDesignStyles(defaultStyles);
      localStorage.setItem('designStyles', JSON.stringify(defaultStyles));
    }

    initCategories();
    
    function initCategories() {
      const defaultCategories: Category[] = [
        { id: 'cat-1', name: '淋浴房', nameEn: 'Shower Enclosures', subcategories: [
          { id: 'sub-1-1', name: '整体淋浴房', nameEn: 'Integrated Shower' },
          { id: 'sub-1-2', name: '淋浴屏风', nameEn: 'Shower Screen' },
          { id: 'sub-1-3', name: '淋浴房底座', nameEn: 'Shower Base' },
        ]},
        { id: 'cat-2', name: '马桶', nameEn: 'Toilets', subcategories: [
          { id: 'sub-2-1', name: '连体马桶', nameEn: 'One-Piece Toilet' },
          { id: 'sub-2-2', name: '分体马桶', nameEn: 'Two-Piece Toilet' },
          { id: 'sub-2-3', name: '壁挂马桶', nameEn: 'Wall Hung Toilet' },
        ]},
        { id: 'cat-3', name: '盆', nameEn: 'Basins', subcategories: [
          { id: 'sub-3-1', name: '台上盆', nameEn: 'Countertop Basin' },
          { id: 'sub-3-2', name: '台下盆', nameEn: 'Undermount Basin' },
          { id: 'sub-3-3', name: '立柱盆', nameEn: 'Pedestal Basin' },
          { id: 'sub-3-4', name: '一体盆', nameEn: 'Integrated Basin' },
        ]},
        { id: 'cat-4', name: '智能马桶', nameEn: 'Smart Toilets', subcategories: [
          { id: 'sub-4-1', name: '全自动智能马桶', nameEn: 'All-in-One Smart Toilet' },
          { id: 'sub-4-2', name: '智能马桶盖', nameEn: 'Smart Seat Cover' },
          { id: 'sub-4-3', name: '智能小便斗', nameEn: 'Smart Urinal' },
        ]},
        { id: 'cat-5', name: '花洒', nameEn: 'Showers', subcategories: [
          { id: 'sub-5-1', name: '淋浴花洒套装', nameEn: 'Shower Set' },
          { id: 'sub-5-2', name: '手持花洒', nameEn: 'Handheld Shower' },
          { id: 'sub-5-3', name: '头顶花洒', nameEn: 'Rain Shower' },
          { id: 'sub-5-4', name: '淋浴龙头', nameEn: 'Shower Mixer' },
        ]},
        { id: 'cat-6', name: '其他产品', nameEn: 'Other Products', subcategories: [
          { id: 'sub-6-1', name: '浴室家具', nameEn: 'Bathroom Furniture' },
          { id: 'sub-6-2', name: '浴室柜', nameEn: 'Bathroom Cabinet' },
          { id: 'sub-6-3', name: '镜柜', nameEn: 'Mirror Cabinet' },
          { id: 'sub-6-4', name: '五金配件', nameEn: 'Hardware Accessories' },
          { id: 'sub-6-5', name: '地漏', nameEn: 'Floor Drain' },
        ]},
      ];
      setCategories(defaultCategories);
      localStorage.setItem('categories', JSON.stringify(defaultCategories));
    }

    if (!localStorage.getItem('pages')) {
      const defaultPages: Page[] = [
        { id: '1', name: '首页', title: 'SEWOO - 高端卫浴解决方案', titleEn: 'SEWOO - Premium Bathroom Solutions', content: '<h2>欢迎来到 SEWOO 卫浴</h2><p>我们提供高品质的卫浴产品...</p>', contentEn: '<h2>Welcome to SEWOO Bathroom</h2><p>We provide premium bathroom products...</p>' },
        { id: '2', name: '关于我们', title: '关于 SEWOO', titleEn: 'About SEWOO', content: '<h2>关于我们</h2><p>SEWOO 成立于2003年，是中国高端卫浴品牌的代表之一...</p>', contentEn: '<h2>About Us</h2><p>Founded in 2003, SEWOO is one of China\'s leading premium bathroom brands...</p>' },
        { id: '3', name: '可持续发展', title: '可持续发展', titleEn: 'Sustainability', content: '<h2>我们的可持续发展承诺</h2><p>SEWOO 致力于环保和可持续发展...</p>', contentEn: '<h2>Our Sustainability Commitment</h2><p>SEWOO is committed to environmental protection and sustainability...</p>' },
      ];
      setPageList(defaultPages);
      localStorage.setItem('pages', JSON.stringify(defaultPages));
    }

    const savedSustainability = localStorage.getItem('sustainability');
    if (savedSustainability) {
      try {
        setSustainabilityData(JSON.parse(savedSustainability));
      } catch {
        console.error('Failed to parse sustainability data');
      }
    }
    const savedFactories = localStorage.getItem('factories');
    if (savedFactories) {
      try {
        const parsed = JSON.parse(savedFactories);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const cleanedFactories = parsed.map((factory: any) => {
            const defaultFactory = defaultFactories.find((df: any) => df.id === factory.id);
            const mergedFactory = {
              ...defaultFactory,
              ...factory,
              videos: Array.isArray(factory.videos) 
                ? factory.videos.filter((video: any) => video && video.url && video.url !== 'https://cdn.jsdelivr.net/gh/pajun-man/my-img-bed@main/img/3.mp4')
                : (defaultFactory?.videos || []),
              features: Array.isArray(factory.features) ? factory.features : (defaultFactory?.features || []),
              galleryImages: Array.isArray(factory.galleryImages) ? factory.galleryImages : (defaultFactory?.galleryImages || []),
              certifications: Array.isArray(factory.certifications) ? factory.certifications : (defaultFactory?.certifications || []),
            };
            return mergedFactory;
          });
          setFactoryList(cleanedFactories);
          localStorage.setItem('factories', JSON.stringify(cleanedFactories));
        } else {
          throw new Error('Invalid factories format');
        }
      } catch {
        setFactoryList(defaultFactories);
        localStorage.setItem('factories', JSON.stringify(defaultFactories));
      }
    } else {
      setFactoryList(defaultFactories);
      localStorage.setItem('factories', JSON.stringify(defaultFactories));
    }

    const defaultFactoryCategories: FactoryCategory[] = [
      { id: 'cat-1', name: '淋浴房', nameEn: 'Showers' },
      { id: 'cat-2', name: '马桶/盆', nameEn: 'Toilets/Basins' },
      { id: 'cat-3', name: '智能马桶', nameEn: 'Smart Toilets' },
      { id: 'cat-4', name: '花洒', nameEn: 'Shower Heads' },
      { id: 'cat-5', name: '其他产品', nameEn: 'Other Products' },
    ];

    const savedFactoryCategories = localStorage.getItem('factoryCategories');
    if (savedFactoryCategories) {
      try {
        const parsed = JSON.parse(savedFactoryCategories);
        if (Array.isArray(parsed)) {
          setFactoryCategories(parsed);
        } else {
          throw new Error('Invalid factory categories format');
        }
      } catch {
        setFactoryCategories(defaultFactoryCategories);
        localStorage.setItem('factoryCategories', JSON.stringify(defaultFactoryCategories));
      }
    } else {
      setFactoryCategories(defaultFactoryCategories);
      localStorage.setItem('factoryCategories', JSON.stringify(defaultFactoryCategories));
    }

    const savedContactInfo = localStorage.getItem('contactInfo');
    if (savedContactInfo) {
      try {
        setContactInfo(JSON.parse(savedContactInfo));
      } catch {
        console.error('Failed to parse contact info');
      }
    }

    const savedFooterInfo = localStorage.getItem('footerInfo');
    if (savedFooterInfo) {
      try {
        setFooterInfo(JSON.parse(savedFooterInfo));
      } catch {
        console.error('Failed to parse footer info');
      }
    }

    const savedNavItems = localStorage.getItem('navItems');
    if (savedNavItems) {
      try {
        setNavItems(JSON.parse(savedNavItems));
      } catch {
        console.error('Failed to parse nav items');
      }
    }

    const savedHomeConfig = localStorage.getItem('homeConfig');
    if (savedHomeConfig) {
      try {
        const parsed = JSON.parse(savedHomeConfig);
        const savedVersion = parsed.version || '1.0.0';
        const currentVersion = '2.0.0';
        
        if (savedVersion === currentVersion) {
          setHomeConfig({
            ...parsed,
            hero: {
              ...parsed.hero,
              media: parsed.hero.media || [],
              useVideo: parsed.hero.useVideo || false,
            },
          });
        } else {
          localStorage.removeItem('homeConfig');
        }
      } catch {
        console.error('Failed to parse home config');
      }
    }

    const savedLogo = localStorage.getItem('siteLogo');
    if (savedLogo) {
      setSiteLogo(savedLogo);
    }

    const savedTitle = localStorage.getItem('siteTitle');
    if (savedTitle) {
      try {
        const parsed = JSON.parse(savedTitle);
        setSiteTitle(parsed.zh || '');
        setSiteTitleEn(parsed.en || '');
      } catch {
        console.error('Failed to parse site title');
      }
    }
  }, []);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
      .replace(/^-|-$/g, '')
      .replace(/--+/g, '-');
  };

  const handleSaveProduct = () => {
    if (!editingProduct) return;
    
    const isNewProduct = !productList.some(p => p.id === editingProduct.id);
    const productWithSlug = {
      ...editingProduct,
      slug: editingProduct.slug || generateSlug(editingProduct.name),
      updatedAt: new Date().toISOString().split('T')[0],
      createdAt: isNewProduct ? new Date().toISOString().split('T')[0] : editingProduct.createdAt,
    };

    const updatedList = isNewProduct 
      ? [...productList, productWithSlug]
      : productList.map(p => p.id === editingProduct.id ? productWithSlug : p);
    
    setProductList(updatedList);
    localStorage.setItem('products', JSON.stringify(updatedList));
    setEditingProduct(null);
    alert('产品保存成功！');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('确定要删除这个产品吗？')) {
      const updatedList = productList.filter(p => p.id !== id);
      setProductList(updatedList);
      localStorage.setItem('products', JSON.stringify(updatedList));
    }
  };

  const handleSaveInspiration = () => {
    if (!editingInspiration) return;
    
    const isNew = !inspirationList.some(i => i.id === editingInspiration.id);
    const inspirationWithSlug = {
      ...editingInspiration,
      slug: editingInspiration.slug || generateSlug(editingInspiration.title),
      updatedAt: new Date().toISOString().split('T')[0],
      createdAt: isNew ? new Date().toISOString().split('T')[0] : editingInspiration.createdAt,
    };

    const updatedList = isNew 
      ? [...inspirationList, inspirationWithSlug]
      : inspirationList.map(i => i.id === editingInspiration.id ? inspirationWithSlug : i);
    
    try {
      setInspirationList(updatedList);
      localStorage.setItem('inspirations', JSON.stringify(updatedList));
      setEditingInspiration(null);
      alert('案例保存成功！');
    } catch (e) {
      console.error('保存失败:', e);
      alert('保存失败，请尝试减少图片大小或联系管理员');
    }
  };

  const handleDeleteInspiration = (id: string) => {
    if (confirm('确定要删除这个案例吗？')) {
      const updatedList = inspirationList.filter(i => i.id !== id);
      setInspirationList(updatedList);
      localStorage.setItem('inspirations', JSON.stringify(updatedList));
    }
  };

  const handleSavePage = () => {
    if (!editingPage) return;

    const updatedList = pageList.map(p => p.id === editingPage.id ? editingPage : p);
    setPageList(updatedList);
    localStorage.setItem('pages', JSON.stringify(updatedList));
    setEditingPage(null);
    alert('页面保存成功！');
  };

  const handleDeletePage = (id: string) => {
    if (confirm('确定要删除这个页面吗？')) {
      const updatedList = pageList.filter(p => p.id !== id);
      setPageList(updatedList);
      localStorage.setItem('pages', JSON.stringify(updatedList));
    }
  };

  const handleSaveSustainability = () => {
    localStorage.setItem('sustainability', JSON.stringify(sustainabilityData));
    alert('可持续发展数据保存成功！');
  };

  const handleSaveContactInfo = () => {
    localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
    alert('联系信息保存成功！');
  };

  const handleSaveFooterInfo = () => {
    localStorage.setItem('footerInfo', JSON.stringify(footerInfo));
    alert('页脚设置保存成功！');
  };

  const handleSaveNavItems = () => {
    localStorage.setItem('navItems', JSON.stringify(navItems));
    alert('导航设置保存成功！');
  };

  const handleSaveHomeConfig = () => {
    localStorage.setItem('homeConfig', JSON.stringify(homeConfig));
    alert('主页Banner设置保存成功！');
  };

  const handleSaveFactory = () => {
    if (!editingFactory) return;
    
    const isNew = !factoryList.some(f => f.id === editingFactory.id);
    const updatedList = isNew 
      ? [...factoryList, editingFactory]
      : factoryList.map(f => f.id === editingFactory.id ? editingFactory : f);
    
    setFactoryList(updatedList);
    localStorage.setItem('factories', JSON.stringify(updatedList));
    setEditingFactory(null);
    alert('工厂信息保存成功！');
  };

  const handleDeleteFactory = (id: string) => {
    if (confirm('确定要删除这个工厂吗？')) {
      const updatedList = factoryList.filter(f => f.id !== id);
      setFactoryList(updatedList);
      localStorage.setItem('factories', JSON.stringify(updatedList));
    }
  };

  const handleSaveCategory = () => {
    if (!editingCategory) return;
    
    const isNew = !categories.some(c => c.id === editingCategory.id);
    const updatedList = isNew 
      ? [...categories, editingCategory]
      : categories.map(c => c.id === editingCategory.id ? editingCategory : c);
    
    setCategories(updatedList);
    localStorage.setItem('categories', JSON.stringify(updatedList));
    setEditingCategory(null);
    alert('分类保存成功！');
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('确定要删除这个分类吗？相关产品也会被删除！')) {
      const updatedList = categories.filter(c => c.id !== id);
      setCategories(updatedList);
      localStorage.setItem('categories', JSON.stringify(updatedList));
      
      const updatedProducts = productList.filter(p => p.category !== categories.find(c => c.id === id)?.name);
      setProductList(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }
  };

  const handleDeleteSubcategory = (categoryId: string, subcategoryId: string) => {
    const updatedCategories = categories.map(c => {
      if (c.id === categoryId) {
        return { ...c, subcategories: c.subcategories.filter(s => s.id !== subcategoryId) };
      }
      return c;
    });
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const handleMarkMessageRead = (id: string) => {
    const updatedMessages = contactMessages.map(m => 
      m.id === id ? { ...m, status: 'read' as const } : m
    );
    setContactMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm('确定要删除这条留言吗？')) {
      const updatedMessages = contactMessages.filter(m => m.id !== id);
      setContactMessages(updatedMessages);
      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    }
  };

  const addStyle = () => {
    if (newStyle.trim() && !designStyles.some(s => s.name === newStyle.trim())) {
      const updatedStyles = [...designStyles, { name: newStyle.trim(), nameEn: newStyleEn.trim() || newStyle.trim() }];
      setDesignStyles(updatedStyles);
      localStorage.setItem('designStyles', JSON.stringify(updatedStyles));
      setNewStyle('');
      setNewStyleEn('');
    }
  };

  const deleteStyle = (styleName: string) => {
    if (confirm('确定要删除这个风格吗？')) {
      const updatedStyles = designStyles.filter(s => s.name !== styleName);
      setDesignStyles(updatedStyles);
      localStorage.setItem('designStyles', JSON.stringify(updatedStyles));
    }
  };

  const addSubcategory = () => {
    if (newSubcategory.trim() && editingCategory) {
      const newSub = { id: `${editingCategory.id}-${Date.now()}`, name: newSubcategory.trim(), nameEn: '' };
      const updatedCategory = { ...editingCategory, subcategories: [...editingCategory.subcategories, newSub] };
      setEditingCategory(updatedCategory);
      setNewSubcategory('');
    }
  };

  const addFeature = () => {
    if (newFeature.trim() && editingProduct) {
      setEditingProduct({ ...editingProduct, features: [...editingProduct.features, newFeature.trim()] });
      setNewFeature('');
    }
  };

  const addFeatureEn = () => {
    if (newFeatureEn.trim() && editingProduct) {
      setEditingProduct({ ...editingProduct, featuresEn: [...(editingProduct.featuresEn || []), newFeatureEn.trim()] });
      setNewFeatureEn('');
    }
  };

  const removeSpecification = (key: string) => {
    if (editingProduct) {
      const newSpecs = { ...editingProduct.specifications };
      delete newSpecs[key];
      setEditingProduct({ ...editingProduct, specifications: newSpecs });
    }
  };

  const removeSpecificationEn = (key: string) => {
    if (editingProduct) {
      const newSpecs = { ...(editingProduct.specificationsEn || {}) };
      delete newSpecs[key];
      setEditingProduct({ ...editingProduct, specificationsEn: newSpecs });
    }
  };

  const addSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim() && editingProduct) {
      setEditingProduct({ 
        ...editingProduct, 
        specifications: { ...editingProduct.specifications, [newSpecKey.trim()]: newSpecValue.trim() }
      });
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const addSpecificationEn = () => {
    if (newSpecKeyEn.trim() && newSpecValueEn.trim() && editingProduct) {
      setEditingProduct({ 
        ...editingProduct, 
        specificationsEn: { ...(editingProduct.specificationsEn || {}), [newSpecKeyEn.trim()]: newSpecValueEn.trim() }
      });
      setNewSpecKeyEn('');
      setNewSpecValueEn('');
    }
  };

  const addFactoryFeature = () => {
    if (newFactoryFeature.trim() && editingFactory) {
      setEditingFactory({ ...editingFactory, features: [...(editingFactory.features || []), { zh: newFactoryFeature.trim(), en: newFactoryFeatureEn.trim() || newFactoryFeature.trim() }] });
      setNewFactoryFeature('');
      setNewFactoryFeatureEn('');
    }
  };

  const addFactoryCert = () => {
    if (newFactoryCertName.trim() && editingFactory) {
      setEditingFactory({ ...editingFactory, certifications: [...(editingFactory.certifications || []), { name: newFactoryCertName.trim(), nameEn: newFactoryCertNameEn.trim() || newFactoryCertName.trim(), icon: 'Award' }] });
      setNewFactoryCertName('');
      setNewFactoryCertNameEn('');
    }
  };

  const addFactoryVideoUrl = () => {
    if ((newFactoryVideoUrlZh.trim() || newFactoryVideoUrlEn.trim()) && editingFactory) {
      const title = newFactoryVideoTitle.trim() || '未命名视频';
      const titleEn = newFactoryVideoTitleEn.trim() || title;
      const newVideo = { id: Date.now().toString(), title, titleEn, urlZh: newFactoryVideoUrlZh.trim(), urlEn: newFactoryVideoUrlEn.trim() };
      setEditingFactory({ ...editingFactory, videos: [...(editingFactory.videos || []), newVideo] });
      setNewFactoryVideoUrlZh('');
      setNewFactoryVideoUrlEn('');
      setNewFactoryVideoTitle('');
      setNewFactoryVideoTitleEn('');
    }
  };

  const saveSiteLogo = () => {
    localStorage.setItem('siteLogo', siteLogo);
    alert('Logo已保存');
  };

  const clearSiteLogo = () => {
    setSiteLogo('');
    localStorage.removeItem('siteLogo');
    alert('Logo已清除，将显示默认文字Logo');
  };

  const saveSiteTitle = () => {
    localStorage.setItem('siteTitle', JSON.stringify({ zh: siteTitle, en: siteTitleEn }));
    alert('标题已保存');
  };

  const clearSiteTitle = () => {
    setSiteTitle('');
    setSiteTitleEn('');
    localStorage.removeItem('siteTitle');
    alert('标题已清除，将显示默认标题');
  };

  const addFactoryImageUrl = () => {
    if (newFactoryImageUrl.trim() && editingFactory) {
      setEditingFactory({ ...editingFactory, galleryImages: [...(editingFactory.galleryImages || []), newFactoryImageUrl.trim()] });
      setNewFactoryImageUrl('');
    }
  };

  const addInspirationImageUrl = () => {
    if (newInspirationImageUrl.trim() && editingInspiration) {
      setEditingInspiration({ ...editingInspiration, images: [...(editingInspiration.images || []), newInspirationImageUrl.trim()] });
      setNewInspirationImageUrl('');
    }
  };

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const totalFiles = files.length;
    let uploadedCount = 0;
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (editingProduct) {
          setEditingProduct({ ...editingProduct, images: [...editingProduct.images, result] });
        }
        uploadedCount++;
        setUploadProgress(Math.round((uploadedCount / totalFiles) * 100));
        if (uploadedCount === totalFiles) {
          setTimeout(() => setUploadProgress(null), 500);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleInspirationImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const totalFiles = files.length;
    let uploadedCount = 0;
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (editingInspiration) {
          setEditingInspiration({ ...editingInspiration, images: [...editingInspiration.images, result] });
        }
        uploadedCount++;
        setUploadProgress(Math.round((uploadedCount / totalFiles) * 100));
        if (uploadedCount === totalFiles) {
          setTimeout(() => setUploadProgress(null), 500);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFactoryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const totalFiles = files.length;
    let uploadedCount = 0;
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (editingFactory) {
          setEditingFactory({ ...editingFactory, galleryImages: [...editingFactory.galleryImages, result] });
        }
        uploadedCount++;
        setUploadProgress(Math.round((uploadedCount / totalFiles) * 100));
        if (uploadedCount === totalFiles) {
          setTimeout(() => setUploadProgress(null), 500);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const toggleCategoryExpand = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {uploadProgress !== null && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-blue-900 text-white p-3">
          <div className="max-w-7xl mx-auto flex items-center justify-center space-x-4">
            <Upload className="w-5 h-5" />
            <span>正在处理图片... {uploadProgress}%</span>
          </div>
        </div>
      )}

      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-4 max-w-4xl max-h-full overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">图片预览</h3>
              <button onClick={() => setPreviewImage(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <img src={previewImage} alt="Preview" className="max-w-full h-auto rounded-lg" />
            <div className="mt-4 p-3 bg-gray-100 rounded">
              <p className="text-sm text-gray-600">请将此图片上传到您的图库后，复制URL地址到输入框中。</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Settings className="w-6 h-6 text-blue-900" />
              <h1 className="text-xl font-bold text-gray-900">网站管理后台</h1>
            </div>
            <div className="flex items-center space-x-4">
              {contactMessages.filter(m => m.status === 'unread').length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {contactMessages.filter(m => m.status === 'unread').length} 条新消息
                </span>
              )}
              <span className="text-sm text-gray-500">欢迎，管理员</span>
              <Link to="/" className="text-sm text-blue-600 hover:text-blue-800">返回前台</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">管理菜单</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'products' ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span>产品管理</span>
                </button>
                <button
                  onClick={() => setActiveTab('categories')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'categories' ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FolderOpen className="w-5 h-5" />
                  <span>分类管理</span>
                </button>
                <button
                  onClick={() => setActiveTab('inspirations')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'inspirations' ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Palette className="w-5 h-5" />
                  <span>灵感案例</span>
                </button>
                <button
                  onClick={() => setActiveTab('pages')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'pages' ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span>页面管理</span>
                </button>
                <button
                  onClick={() => setActiveTab('factory')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'factory' ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Building className="w-5 h-5" />
                  <span>工厂信息</span>
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'messages' ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Mail className="w-5 h-5" />
                  <span>客户留言</span>
                  {contactMessages.filter(m => m.status === 'unread').length > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {contactMessages.filter(m => m.status === 'unread').length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'settings' ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>网站设置</span>
                </button>
                <button
                  onClick={() => setActiveTab('dataSync')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'dataSync' ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Database className="w-5 h-5" />
                  <span>数据同步</span>
                </button>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'products' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">产品管理</h2>
                  <button 
                    onClick={() => setEditingProduct({
                      id: Date.now().toString(),
                      slug: '',
                      name: '',
                      nameEn: '',
                      category: '',
                      subcategory: '',
                      description: '',
                      descriptionEn: '',
                      images: [],
                      features: [],
                      featuresEn: [],
                      specifications: {},
                      specificationsEn: {},
                      seo: { title: '', description: '', keywords: [] },
                      documents: { manual: '', technicalData: '', imagesDownload: '', quote: '', appointment: '' },
                      createdAt: new Date().toISOString().split('T')[0],
                      updatedAt: new Date().toISOString().split('T')[0],
                    })}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span>添加产品</span>
                  </button>
                </div>

                {editingProduct ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">产品名称</label>
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">产品英文名称</label>
                        <input
                          type="text"
                          value={editingProduct.nameEn}
                          onChange={(e) => setEditingProduct({ ...editingProduct, nameEn: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                        <select
                          value={editingProduct.category}
                          onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value, subcategory: '' })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">请选择分类</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">子分类</label>
                        <select
                          value={editingProduct.subcategory}
                          onChange={(e) => setEditingProduct({ ...editingProduct, subcategory: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">请选择子分类</option>
                          {categories.find((c) => c.name === editingProduct.category)?.subcategories?.map((sub) => (
                            <option key={sub.id} value={sub.name}>{sub.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">中文描述</label>
                        <textarea
                          value={editingProduct.description}
                          onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">英文描述</label>
                        <textarea
                          value={editingProduct.descriptionEn}
                          onChange={(e) => setEditingProduct({ ...editingProduct, descriptionEn: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          rows={3}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">产品图片</label>
                      <div className="grid grid-cols-4 gap-2">
                        {editingProduct.images.map((img, index) => (
                          <div key={index} className="relative">
                            <img src={img} alt={`Product ${index + 1}`} className="w-full aspect-square object-cover rounded-lg" />
                            <button
                              onClick={() => {
                                const newImages = [...editingProduct.images];
                                newImages.splice(index, 1);
                                setEditingProduct({ ...editingProduct, images: newImages });
                              }}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <div 
                          className="flex items-center justify-center w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
                          onClick={() => document.getElementById('product-image-upload')?.click()}
                        >
                          <Upload className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                      <input
                        id="product-image-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleProductImageUpload}
                        className="hidden"
                      />
                    </div>

                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">产品特点（中文）</label>
                          <div className="flex flex-wrap gap-2">
                            {editingProduct.features.map((feature, index) => (
                              <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {feature}
                                <button onClick={() => {
                                  const newFeatures = [...editingProduct.features];
                                  newFeatures.splice(index, 1);
                                  setEditingProduct({ ...editingProduct, features: newFeatures });
                                }} className="ml-1 hover:text-blue-600">
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-32"
                                placeholder="添加特点..."
                              />
                              <button onClick={addFeature} className="px-3 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">产品特点（英文）</label>
                          <div className="flex flex-wrap gap-2">
                            {(editingProduct.featuresEn || []).map((feature, index) => (
                              <span key={index} className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                {feature}
                                <button onClick={() => {
                                  const newFeatures = [...(editingProduct.featuresEn || [])];
                                  newFeatures.splice(index, 1);
                                  setEditingProduct({ ...editingProduct, featuresEn: newFeatures });
                                }} className="ml-1 hover:text-green-600">
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={newFeatureEn}
                                onChange={(e) => setNewFeatureEn(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addFeatureEn()}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-32"
                                placeholder="Add feature..."
                              />
                              <button onClick={addFeatureEn} className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">产品参数（中文）</label>
                          <div className="space-y-2">
                            {Object.entries(editingProduct.specifications).map(([key, value]) => (
                              <div key={key} className="flex items-center space-x-2">
                                <span className="px-3 py-2 bg-gray-100 rounded-lg font-medium">{key}</span>
                                <span className="flex-1 px-3 py-2 bg-gray-50 rounded-lg">{value}</span>
                                <button onClick={() => removeSpecification(key)} className="p-1 text-red-600 hover:bg-red-50 rounded-lg">
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                            <div className="flex space-x-2">
                              <input
                                type="text"
                                value={newSpecKey}
                                onChange={(e) => setNewSpecKey(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-32"
                                placeholder="参数名"
                              />
                              <input
                                type="text"
                                value={newSpecValue}
                                onChange={(e) => setNewSpecValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addSpecification()}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="参数值"
                              />
                              <button onClick={addSpecification} className="px-3 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">产品参数（英文）</label>
                          <div className="space-y-2">
                            {Object.entries(editingProduct.specificationsEn || {}).map(([key, value]) => (
                              <div key={key} className="flex items-center space-x-2">
                                <span className="px-3 py-2 bg-gray-100 rounded-lg font-medium">{key}</span>
                                <span className="flex-1 px-3 py-2 bg-gray-50 rounded-lg">{value}</span>
                                <button onClick={() => removeSpecificationEn(key)} className="p-1 text-red-600 hover:bg-red-50 rounded-lg">
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                            <div className="flex space-x-2">
                              <input
                                type="text"
                                value={newSpecKeyEn}
                                onChange={(e) => setNewSpecKeyEn(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-32"
                                placeholder="Param Name"
                              />
                              <input
                                type="text"
                                value={newSpecValueEn}
                                onChange={(e) => setNewSpecValueEn(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addSpecificationEn()}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Param Value"
                              />
                              <button onClick={addSpecificationEn} className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-semibold mb-4">文档链接</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <Download className="w-4 h-4 inline mr-1" />
                            产品手册链接
                          </label>
                          <input
                            type="text"
                            value={editingProduct.documents.manual}
                            onChange={(e) => setEditingProduct({ ...editingProduct, documents: { ...editingProduct.documents, manual: e.target.value } })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="https://..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FileText className="w-4 h-4 inline mr-1" />
                            技术数据表链接
                          </label>
                          <input
                            type="text"
                            value={editingProduct.documents.technicalData}
                            onChange={(e) => setEditingProduct({ ...editingProduct, documents: { ...editingProduct.documents, technicalData: e.target.value } })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="https://..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FileImage className="w-4 h-4 inline mr-1" />
                            产品图片下载链接
                          </label>
                          <input
                            type="text"
                            value={editingProduct.documents.imagesDownload}
                            onChange={(e) => setEditingProduct({ ...editingProduct, documents: { ...editingProduct.documents, imagesDownload: e.target.value } })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="https://..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <Mail className="w-4 h-4 inline mr-1" />
                            获取报价链接/邮箱
                          </label>
                          <input
                            type="text"
                            value={editingProduct.documents.quote}
                            onChange={(e) => setEditingProduct({ ...editingProduct, documents: { ...editingProduct.documents, quote: e.target.value } })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="mailto:xxx@xxx.com 或 https://..."
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          预约体验链接/表单
                        </label>
                        <input
                          type="text"
                          value={editingProduct.documents.appointment}
                          onChange={(e) => setEditingProduct({ ...editingProduct, documents: { ...editingProduct.documents, appointment: e.target.value } })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-semibold mb-4">SEO设置</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">SEO标题</label>
                          <input
                            type="text"
                            value={editingProduct.seo.title}
                            onChange={(e) => setEditingProduct({ ...editingProduct, seo: { ...editingProduct.seo, title: e.target.value } })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">SEO描述</label>
                          <textarea
                            value={editingProduct.seo.description}
                            onChange={(e) => setEditingProduct({ ...editingProduct, seo: { ...editingProduct.seo, description: e.target.value } })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">SEO关键词（用逗号分隔）</label>
                        <input
                          type="text"
                          value={editingProduct.seo.keywords.join(', ')}
                          onChange={(e) => setEditingProduct({ ...editingProduct, seo: { ...editingProduct.seo, keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k) } })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button onClick={handleSaveProduct} className="flex items-center space-x-2 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
                        <Save className="w-5 h-5" />
                        <span>保存</span>
                      </button>
                      <button onClick={() => setEditingProduct(null)} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        取消
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {productList.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">暂无产品</p>
                    ) : (
                      productList.map((product) => (
                        <div key={product.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img 
                              src={product.images[0]?.startsWith('http') ? product.images[0] : `${window.location.origin}${product.images[0]}`} 
                              alt={product.name} 
                              className="w-14 h-14 object-cover rounded-lg"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23f3f4f6" width="100" height="100"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="12" x="50%" y="50%" text-anchor="middle" dy=".3em"%3E图片%3C/text%3E%3C/svg%3E';
                              }}
                            />
                            <div>
                              <div className="font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.category} · {product.subcategory}</div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button onClick={() => setEditingProduct({
                              ...product,
                              seo: product.seo || { title: '', description: '', keywords: [] },
                              documents: product.documents || { manual: '', technicalData: '', imagesDownload: '', quote: '', appointment: '' },
                            })} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="编辑">
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="删除">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'categories' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">分类管理</h2>
                  <button 
                    onClick={() => setEditingCategory({
                      id: Date.now().toString(),
                      name: '',
                      nameEn: '',
                      subcategories: [],
                    })}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span>添加分类</span>
                  </button>
                </div>

                {editingCategory ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">分类名称</label>
                        <input
                          type="text"
                          value={editingCategory.name}
                          onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">英文名称</label>
                        <input
                          type="text"
                          value={editingCategory.nameEn}
                          onChange={(e) => setEditingCategory({ ...editingCategory, nameEn: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">子分类</label>
                      <div className="flex flex-wrap gap-2">
                        {(editingCategory.subcategories || []).map((sub, index) => (
                          <span key={sub.id} className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {sub.name}
                            <button onClick={() => {
                              const newSubs = editingCategory.subcategories.filter(s => s.id !== sub.id);
                              setEditingCategory({ ...editingCategory, subcategories: newSubs });
                            }} className="ml-1 hover:text-green-600">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={newSubcategory}
                            onChange={(e) => setNewSubcategory(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addSubcategory()}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-32"
                            placeholder="添加子分类..."
                          />
                          <button onClick={addSubcategory} className="px-3 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button onClick={handleSaveCategory} className="flex items-center space-x-2 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
                        <Save className="w-5 h-5" />
                        <span>保存</span>
                      </button>
                      <button onClick={() => setEditingCategory(null)} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        取消
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {categories.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">暂无分类</p>
                    ) : (
                      categories.map((category) => {
                        const categoryProducts = productList.filter(p => p.category === category.name);
                        return (
                          <div key={category.id} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <button 
                                  onClick={() => toggleCategoryExpand(category.id)}
                                  className="p-1 hover:bg-gray-200 rounded"
                                >
                                  {expandedCategories.has(category.id) ? (
                                    <ChevronDown className="w-4 h-4" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4" />
                                  )}
                                </button>
                                <div>
                                  <div className="font-medium text-gray-900">{category.name}</div>
                                  <div className="text-sm text-gray-500">{category.nameEn} · {categoryProducts.length} 件产品</div>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button onClick={() => setEditingCategory({ ...category, subcategories: category.subcategories ? [...category.subcategories] : [] })} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="编辑">
                                  <Edit2 className="w-5 h-5" />
                                </button>
                                <button onClick={() => handleDeleteCategory(category.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="删除">
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                            {expandedCategories.has(category.id) && (
                              <div className="mt-4 pl-8 space-y-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-600 mb-2">子分类:</p>
                                  {category.subcategories.length === 0 ? (
                                    <p className="text-sm text-gray-400">暂无子分类</p>
                                  ) : (
                                    <div className="flex flex-wrap gap-2">
                                      {category.subcategories.map((sub) => (
                                        <div key={sub.id} className="flex items-center justify-between bg-white p-3 rounded-lg min-w-[200px]">
                                          <span>{sub.name} ({sub.nameEn})</span>
                                          <button onClick={() => handleDeleteSubcategory(category.id, sub.id)} className="p-1 text-red-500 hover:bg-red-50 rounded">
                                            <X className="w-4 h-4" />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                <div className="border-t pt-4">
                                  <div className="flex justify-between items-center mb-3">
                                    <p className="text-sm font-medium text-gray-600">产品列表:</p>
                                    <button 
                                      onClick={() => {
                                        setEditingProduct({
                                          id: Date.now().toString(),
                                          slug: '',
                                          name: '',
                                          nameEn: '',
                                          category: category.name,
                                          subcategory: '',
                                          description: '',
                                          descriptionEn: '',
                                          images: [],
                                          features: [],
                                          featuresEn: [],
                                          specifications: {},
                                          specificationsEn: {},
                                          seo: { title: '', description: '', keywords: [] },
                                          documents: { manual: '', technicalData: '', imagesDownload: '', quote: '', appointment: '' },
                                          createdAt: new Date().toISOString().split('T')[0],
                                          updatedAt: new Date().toISOString().split('T')[0],
                                        });
                                        setActiveTab('products');
                                      }}
                                      className="flex items-center space-x-1 px-3 py-1 bg-blue-900 text-white text-sm rounded-lg hover:bg-blue-800 transition-colors"
                                    >
                                      <Plus className="w-4 h-4" />
                                      <span>添加产品</span>
                                    </button>
                                  </div>
                                  {categoryProducts.length === 0 ? (
                                    <p className="text-sm text-gray-400">该分类暂无产品</p>
                                  ) : (
                                    <div className="space-y-2">
                                      {categoryProducts.map((product) => (
                                        <div key={product.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                                          <div className="flex items-center space-x-3">
                                            <img 
                                              src={product.images[0]} 
                                              alt={product.name} 
                                              className="w-10 h-10 object-cover rounded"
                                              onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23f3f4f6" width="100" height="100"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="12" x="50%" y="50%" text-anchor="middle" dy=".3em"%3E图片%3C/text%3E%3C/svg%3E';
                                              }}
                                            />
                                            <div>
                                              <div className="font-medium text-gray-900">{product.name}</div>
                                              <div className="text-sm text-gray-500">{product.subcategory}</div>
                                            </div>
                                          </div>
                                          <div className="flex space-x-2">
                                            <button onClick={() => {
                                              setEditingProduct({
                                                ...product,
                                                seo: product.seo || { title: '', description: '', keywords: [] },
                                                documents: product.documents || { manual: '', technicalData: '', imagesDownload: '', quote: '', appointment: '' },
                                              });
                                              setActiveTab('products');
                                            }} className="p-1 text-blue-600 hover:bg-blue-50 rounded" title="编辑">
                                              <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDeleteProduct(product.id)} className="p-1 text-red-600 hover:bg-red-50 rounded" title="删除">
                                              <Trash2 className="w-4 h-4" />
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'inspirations' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">灵感案例管理</h2>
                  <button 
                    onClick={() => setEditingInspiration({
                      id: Date.now().toString(),
                      slug: '',
                      style: designStyles[0]?.name || '现代风格',
                      title: '',
                      titleEn: '',
                      description: '',
                      descriptionEn: '',
                      images: [],
                      videos: [],
                      project: '',
                      projectEn: '',
                      location: '',
                      locationEn: '',
                      area: '',
                      shareUrl: '',
                      downloadUrl: '',
                      createdAt: new Date().toISOString().split('T')[0],
                      updatedAt: new Date().toISOString().split('T')[0],
                    })}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span>添加案例</span>
                  </button>
                </div>

                {editingInspiration ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">案例标题</label>
                        <input
                          type="text"
                          value={editingInspiration.title}
                          onChange={(e) => setEditingInspiration({ ...editingInspiration, title: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">英文标题</label>
                        <input
                          type="text"
                          value={editingInspiration.titleEn}
                          onChange={(e) => setEditingInspiration({ ...editingInspiration, titleEn: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">设计风格</label>
                      <select
                        value={editingInspiration.style}
                        onChange={(e) => setEditingInspiration({ ...editingInspiration, style: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        {designStyles.map((style) => (
                          <option key={style.name} value={style.name}>{style.name} ({style.nameEn})</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">项目名称</label>
                        <input
                          type="text"
                          value={editingInspiration.project}
                          onChange={(e) => setEditingInspiration({ ...editingInspiration, project: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">项目名称(英文)</label>
                        <input
                          type="text"
                          value={editingInspiration.projectEn}
                          onChange={(e) => setEditingInspiration({ ...editingInspiration, projectEn: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">地点</label>
                        <input
                          type="text"
                          value={editingInspiration.location}
                          onChange={(e) => setEditingInspiration({ ...editingInspiration, location: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">地点(英文)</label>
                        <input
                          type="text"
                          value={editingInspiration.locationEn}
                          onChange={(e) => setEditingInspiration({ ...editingInspiration, locationEn: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">面积</label>
                        <input
                          type="text"
                          value={editingInspiration.area}
                          onChange={(e) => setEditingInspiration({ ...editingInspiration, area: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">案例图片</label>
                      <div className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={newInspirationImageUrl}
                          onChange={(e) => setNewInspirationImageUrl(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addInspirationImageUrl()}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="输入图片URL..."
                        />
                        <button onClick={addInspirationImageUrl} className="px-3 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {editingInspiration.images.map((img, index) => (
                          <div key={index} className="relative">
                            <img src={img} alt={`Case ${index + 1}`} className="w-full aspect-square object-cover rounded-lg" />
                            <button
                              onClick={() => {
                                const newImages = [...editingInspiration.images];
                                newImages.splice(index, 1);
                                setEditingInspiration({ ...editingInspiration, images: newImages });
                              }}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <div 
                          className="flex items-center justify-center w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
                          onClick={() => document.getElementById('inspiration-image-upload')?.click()}
                        >
                          <Upload className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                      <input
                        id="inspiration-image-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleInspirationImageUpload}
                        className="hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">视频链接</label>
                      <div className="flex flex-wrap gap-2">
                        {(editingInspiration.videos || []).map((video, index) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                            {video}
                            <button onClick={() => {
                              const newVideos = [...editingInspiration.videos];
                              newVideos.splice(index, 1);
                              setEditingInspiration({ ...editingInspiration, videos: newVideos });
                            }} className="ml-1 hover:text-purple-600">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={newVideoUrl}
                            onChange={(e) => setNewVideoUrl(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                setEditingInspiration({ ...editingInspiration, videos: [...editingInspiration.videos, newVideoUrl.trim()] });
                                setNewVideoUrl('');
                              }
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-48"
                            placeholder="添加视频链接..."
                          />
                          <button onClick={() => {
                            setEditingInspiration({ ...editingInspiration, videos: [...editingInspiration.videos, newVideoUrl.trim()] });
                            setNewVideoUrl('');
                          }} className="px-3 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">中文描述</label>
                        <textarea
                          value={editingInspiration.description}
                          onChange={(e) => setEditingInspiration({ ...editingInspiration, description: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          rows={4}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">英文描述</label>
                        <textarea
                          value={editingInspiration.descriptionEn}
                          onChange={(e) => setEditingInspiration({ ...editingInspiration, descriptionEn: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          rows={4}
                        />
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-semibold mb-4">操作链接</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <Share2 className="w-4 h-4 inline mr-1" />
                            分享链接
                          </label>
                          <input
                            type="text"
                            value={editingInspiration.shareUrl}
                            onChange={(e) => setEditingInspiration({ ...editingInspiration, shareUrl: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="https://..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <Download className="w-4 h-4 inline mr-1" />
                            下载资料链接
                          </label>
                          <input
                            type="text"
                            value={editingInspiration.downloadUrl}
                            onChange={(e) => setEditingInspiration({ ...editingInspiration, downloadUrl: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button onClick={handleSaveInspiration} className="flex items-center space-x-2 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
                        <Save className="w-5 h-5" />
                        <span>保存</span>
                      </button>
                      <button onClick={() => setEditingInspiration(null)} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        取消
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-700 mb-3">设计风格管理</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {designStyles.map((style) => (
                          <span key={style.name} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {style.name}
                            {style.nameEn && style.nameEn !== style.name && (
                              <span className="ml-1 text-xs text-blue-600">({style.nameEn})</span>
                            )}
                            <button onClick={() => deleteStyle(style.name)} className="ml-1 hover:text-blue-600">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={newStyle}
                          onChange={(e) => setNewStyle(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addStyle()}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-32"
                          placeholder="中文风格名称..."
                        />
                        <input
                          type="text"
                          value={newStyleEn}
                          onChange={(e) => setNewStyleEn(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addStyle()}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-32"
                          placeholder="英文风格名称..."
                        />
                        <button onClick={addStyle} className="px-3 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {inspirationList.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">暂无案例</p>
                      ) : (
                        inspirationList.map((inspiration) => (
                          <div key={inspiration.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img 
                                src={inspiration.images[0]?.startsWith('http') ? inspiration.images[0] : `${window.location.origin}${inspiration.images[0]}`} 
                                alt={inspiration.title} 
                                className="w-14 h-14 object-cover rounded-lg"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23f3f4f6" width="100" height="100"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="12" x="50%" y="50%" text-anchor="middle" dy=".3em"%3E图片%3C/text%3E%3C/svg%3E';
                                }}
                              />
                              <div>
                                <div className="font-medium text-gray-900">{inspiration.title}</div>
                                <div className="text-sm text-gray-500">{inspiration.style} · {inspiration.location}</div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button onClick={() => setEditingInspiration({ ...inspiration, images: inspiration.images ? [...inspiration.images] : [], videos: inspiration.videos ? [...inspiration.videos] : [] })} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="编辑">
                                <Edit2 className="w-5 h-5" />
                              </button>
                              <button onClick={() => handleDeleteInspiration(inspiration.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="删除">
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'pages' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">页面内容管理</h2>
                </div>

                {editingPage ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">页面标题</label>
                        <input
                          type="text"
                          value={editingPage.title}
                          onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">英文标题</label>
                        <input
                          type="text"
                          value={editingPage.titleEn}
                          onChange={(e) => setEditingPage({ ...editingPage, titleEn: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">页面内容</label>
                      <textarea
                        value={editingPage.content}
                        onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={8}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">英文内容</label>
                      <textarea
                        value={editingPage.contentEn}
                        onChange={(e) => setEditingPage({ ...editingPage, contentEn: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={8}
                      />
                    </div>

                    <div className="flex space-x-4">
                      <button onClick={handleSavePage} className="flex items-center space-x-2 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
                        <Save className="w-5 h-5" />
                        <span>保存</span>
                      </button>
                      <button onClick={() => setEditingPage(null)} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        取消
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">页面名称</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标题</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {pageList.map((page) => (
                          <tr key={page.id}>
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <FileText className="w-5 h-5 text-gray-400 mr-3" />
                                <span className="text-gray-900 font-medium">{page.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-700">{page.title}</td>
                            <td className="py-4 px-4">
                              <div className="flex space-x-2">
                                <button onClick={() => setEditingPage(page)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="编辑">
                                  <Edit2 className="w-5 h-5" />
                                </button>
                                <button onClick={() => handleDeletePage(page.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="删除">
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="mt-8 bg-green-50 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                      <Leaf className="w-5 h-5 mr-2 text-green-600" />
                      可持续发展页面设置
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">页面标题</label>
                        <input
                          type="text"
                          value={sustainabilityData.heroTitle}
                          onChange={(e) => setSustainabilityData({ ...sustainabilityData, heroTitle: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">副标题</label>
                        <input
                          type="text"
                          value={sustainabilityData.heroSubtitle}
                          onChange={(e) => setSustainabilityData({ ...sustainabilityData, heroSubtitle: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                      <textarea
                        value={sustainabilityData.heroDescription}
                        onChange={(e) => setSustainabilityData({ ...sustainabilityData, heroDescription: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">社会责任</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
                          <input
                            type="text"
                            value={sustainabilityData.socialTitle}
                            onChange={(e) => setSustainabilityData({ ...sustainabilityData, socialTitle: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                          <textarea
                            value={sustainabilityData.socialDescription}
                            onChange={(e) => setSustainabilityData({ ...sustainabilityData, socialDescription: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">数据统计</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <input
                            type="text"
                            value={sustainabilityData.stats.certificationsLabel || '环保认证'}
                            onChange={(e) => setSustainabilityData({ ...sustainabilityData, stats: { ...sustainabilityData.stats, certificationsLabel: e.target.value }})}
                            className="block text-sm font-medium text-gray-700 mb-1 w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                            placeholder="标签名称"
                          />
                          <input
                            type="text"
                            value={sustainabilityData.stats.certifications}
                            onChange={(e) => setSustainabilityData({ ...sustainabilityData, stats: { ...sustainabilityData.stats, certifications: e.target.value }})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="数值"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={sustainabilityData.stats.greenProductsLabel || '绿色产品'}
                            onChange={(e) => setSustainabilityData({ ...sustainabilityData, stats: { ...sustainabilityData.stats, greenProductsLabel: e.target.value }})}
                            className="block text-sm font-medium text-gray-700 mb-1 w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                            placeholder="标签名称"
                          />
                          <input
                            type="text"
                            value={sustainabilityData.stats.greenProducts}
                            onChange={(e) => setSustainabilityData({ ...sustainabilityData, stats: { ...sustainabilityData.stats, greenProducts: e.target.value }})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="数值"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={sustainabilityData.stats.carbonReductionLabel || '碳排放减少'}
                            onChange={(e) => setSustainabilityData({ ...sustainabilityData, stats: { ...sustainabilityData.stats, carbonReductionLabel: e.target.value }})}
                            className="block text-sm font-medium text-gray-700 mb-1 w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                            placeholder="标签名称"
                          />
                          <input
                            type="text"
                            value={sustainabilityData.stats.carbonReduction}
                            onChange={(e) => setSustainabilityData({ ...sustainabilityData, stats: { ...sustainabilityData.stats, carbonReduction: e.target.value }})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="数值"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={sustainabilityData.stats.treesPlantedLabel || '树种植'}
                            onChange={(e) => setSustainabilityData({ ...sustainabilityData, stats: { ...sustainabilityData.stats, treesPlantedLabel: e.target.value }})}
                            className="block text-sm font-medium text-gray-700 mb-1 w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                            placeholder="标签名称"
                          />
                          <input
                            type="text"
                            value={sustainabilityData.stats.treesPlanted}
                            onChange={(e) => setSustainabilityData({ ...sustainabilityData, stats: { ...sustainabilityData.stats, treesPlanted: e.target.value }})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="数值"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">承诺项目</h4>
                      {sustainabilityData.commitments.map((commitment, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 mb-3">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
                              <input
                                type="text"
                                value={commitment.title}
                                onChange={(e) => {
                                  const newCommitments = [...sustainabilityData.commitments];
                                  newCommitments[index] = { ...commitment, title: e.target.value };
                                  setSustainabilityData({ ...sustainabilityData, commitments: newCommitments });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                              <input
                                type="text"
                                value={commitment.description}
                                onChange={(e) => {
                                  const newCommitments = [...sustainabilityData.commitments];
                                  newCommitments[index] = { ...commitment, description: e.target.value };
                                  setSustainabilityData({ ...sustainabilityData, commitments: newCommitments });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">数值</label>
                              <input
                                type="text"
                                value={commitment.stat}
                                onChange={(e) => {
                                  const newCommitments = [...sustainabilityData.commitments];
                                  newCommitments[index] = { ...commitment, stat: e.target.value };
                                  setSustainabilityData({ ...sustainabilityData, commitments: newCommitments });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">单位</label>
                              <input
                                type="text"
                                value={commitment.statLabel}
                                onChange={(e) => {
                                  const newCommitments = [...sustainabilityData.commitments];
                                  newCommitments[index] = { ...commitment, statLabel: e.target.value };
                                  setSustainabilityData({ ...sustainabilityData, commitments: newCommitments });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">发展目标</h4>
                      {sustainabilityData.goals.map((goal, index) => (
                        <div key={index} className="flex items-center space-x-4 mb-2">
                          <input
                            type="text"
                            value={goal.year}
                            onChange={(e) => {
                              const newGoals = [...sustainabilityData.goals];
                              newGoals[index] = { ...goal, year: e.target.value };
                              setSustainabilityData({ ...sustainabilityData, goals: newGoals });
                            }}
                            className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="年份"
                          />
                          <input
                            type="text"
                            value={goal.target}
                            onChange={(e) => {
                              const newGoals = [...sustainabilityData.goals];
                              newGoals[index] = { ...goal, target: e.target.value };
                              setSustainabilityData({ ...sustainabilityData, goals: newGoals });
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            placeholder="目标"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">重点项目</h4>
                      {sustainabilityData.initiatives.map((initiative, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 mb-3">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
                              <input
                                type="text"
                                value={initiative.title}
                                onChange={(e) => {
                                  const newInitiatives = [...sustainabilityData.initiatives];
                                  newInitiatives[index] = { ...initiative, title: e.target.value };
                                  setSustainabilityData({ ...sustainabilityData, initiatives: newInitiatives });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                              <input
                                type="text"
                                value={initiative.description}
                                onChange={(e) => {
                                  const newInitiatives = [...sustainabilityData.initiatives];
                                  newInitiatives[index] = { ...initiative, description: e.target.value };
                                  setSustainabilityData({ ...sustainabilityData, initiatives: newInitiatives });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">图片URL</label>
                              <input
                                type="text"
                                value={initiative.image}
                                onChange={(e) => {
                                  const newInitiatives = [...sustainabilityData.initiatives];
                                  newInitiatives[index] = { ...initiative, image: e.target.value };
                                  setSustainabilityData({ ...sustainabilityData, initiatives: newInitiatives });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <button onClick={handleSaveSustainability} className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <Save className="w-5 h-5" />
                        <span>保存可持续发展数据</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-green-50 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                      <Building className="w-5 h-5 mr-2 text-green-600" />
                      合作伙伴管理
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {partners.map((partner) => (
                        <div key={partner.id} className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            {partner.logo ? (
                              <img src={partner.logo} alt={partner.name} className="h-10 w-auto" />
                            ) : (
                              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <Building className="w-5 h-5 text-gray-400" />
                              </div>
                            )}
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  const index = partners.findIndex(p => p.id === partner.id);
                                  const updated = [...partners];
                                  updated[index] = { ...partner, isEditing: true };
                                  setPartners(updated);
                                }}
                                className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm('确定要删除这个合作伙伴吗？')) {
                                    setPartners(partners.filter(p => p.id !== partner.id));
                                    localStorage.setItem('partners', JSON.stringify(partners.filter(p => p.id !== partner.id)));
                                  }
                                }}
                                className="p-1 text-red-600 hover:bg-red-100 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          {partners.find(p => p.id === partner.id)?.isEditing ? (
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={partner.name}
                                onChange={(e) => {
                                  const index = partners.findIndex(p => p.id === partner.id);
                                  const updated = [...partners];
                                  updated[index] = { ...updated[index], name: e.target.value };
                                  setPartners(updated);
                                }}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                placeholder="中文名称"
                              />
                              <input
                                type="text"
                                value={partner.nameEn}
                                onChange={(e) => {
                                  const index = partners.findIndex(p => p.id === partner.id);
                                  const updated = [...partners];
                                  updated[index] = { ...updated[index], nameEn: e.target.value };
                                  setPartners(updated);
                                }}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                placeholder="English Name"
                              />
                              <input
                                type="text"
                                value={partner.logo}
                                onChange={(e) => {
                                  const index = partners.findIndex(p => p.id === partner.id);
                                  const updated = [...partners];
                                  updated[index] = { ...updated[index], logo: e.target.value };
                                  setPartners(updated);
                                }}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                placeholder="Logo URL"
                              />
                              <button
                                onClick={() => {
                                  const index = partners.findIndex(p => p.id === partner.id);
                                  const updated = [...partners];
                                  updated[index] = { ...updated[index], isEditing: false };
                                  setPartners(updated);
                                  localStorage.setItem('partners', JSON.stringify(updated));
                                }}
                                className="w-full px-2 py-1 bg-green-600 text-white rounded text-sm"
                              >
                                保存
                              </button>
                            </div>
                          ) : (
                            <div>
                              <div className="font-semibold text-gray-900">{partner.name}</div>
                              <div className="text-sm text-gray-500">{partner.nameEn}</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <button
                        onClick={() => {
                          const newPartner = {
                            id: Date.now().toString(),
                            name: '',
                            nameEn: '',
                            logo: '',
                            isEditing: true,
                          };
                          setPartners([...partners, newPartner]);
                        }}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>添加合作伙伴</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-blue-50 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-blue-600" />
                      联系信息设置
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">公司名称</label>
                        <input
                          type="text"
                          value={contactInfo.companyName}
                          onChange={(e) => setContactInfo({ ...contactInfo, companyName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">公司标语</label>
                        <input
                          type="text"
                          value={contactInfo.slogan}
                          onChange={(e) => setContactInfo({ ...contactInfo, slogan: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="高端卫浴品牌，致力于为您打造舒适、智能、环保的沐浴体验。"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">公司标语(英文)</label>
                        <input
                          type="text"
                          value={contactInfo.sloganEn}
                          onChange={(e) => setContactInfo({ ...contactInfo, sloganEn: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Premium bathroom brand dedicated to creating comfortable, smart, and eco-friendly bathing experiences."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">公司地址</label>
                        <input
                          type="text"
                          value={contactInfo.address}
                          onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">公司地址(英文)</label>
                        <input
                          type="text"
                          value={contactInfo.addressEn}
                          onChange={(e) => setContactInfo({ ...contactInfo, addressEn: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Chancheng District, Foshan City, Guangdong Province"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">地址第二行</label>
                        <input
                          type="text"
                          value={contactInfo.addressLine2}
                          onChange={(e) => setContactInfo({ ...contactInfo, addressLine2: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">地址第二行(英文)</label>
                        <input
                          type="text"
                          value={contactInfo.addressLine2En}
                          onChange={(e) => setContactInfo({ ...contactInfo, addressLine2En: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="No. 88, Bathroom Industrial Park"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">客服热线</label>
                        <input
                          type="text"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">电话服务时间</label>
                        <input
                          type="text"
                          value={contactInfo.phoneHours}
                          onChange={(e) => setContactInfo({ ...contactInfo, phoneHours: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="周一至周六 9:00-18:00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">电话服务时间(英文)</label>
                        <input
                          type="text"
                          value={contactInfo.phoneHoursEn}
                          onChange={(e) => setContactInfo({ ...contactInfo, phoneHoursEn: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Mon-Sat 9:00-18:00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">电子邮箱1</label>
                        <input
                          type="text"
                          value={contactInfo.emails[0]}
                          onChange={(e) => {
                            const newEmails = [...contactInfo.emails];
                            newEmails[0] = e.target.value;
                            setContactInfo({ ...contactInfo, emails: newEmails });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">电子邮箱2</label>
                        <input
                          type="text"
                          value={contactInfo.emails[1]}
                          onChange={(e) => {
                            const newEmails = [...contactInfo.emails];
                            newEmails[1] = e.target.value;
                            setContactInfo({ ...contactInfo, emails: newEmails });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">工作时间(中文)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">工作日</label>
                          <input
                            type="text"
                            value={contactInfo.workTime.weekday}
                            onChange={(e) => setContactInfo({ ...contactInfo, workTime: { ...contactInfo.workTime, weekday: e.target.value }})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="周一至周五: 9:00 - 18:00"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">周六</label>
                          <input
                            type="text"
                            value={contactInfo.workTime.saturday}
                            onChange={(e) => setContactInfo({ ...contactInfo, workTime: { ...contactInfo.workTime, saturday: e.target.value }})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="周六: 9:00 - 17:00"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">周日</label>
                          <input
                            type="text"
                            value={contactInfo.workTime.sunday}
                            onChange={(e) => setContactInfo({ ...contactInfo, workTime: { ...contactInfo.workTime, sunday: e.target.value }})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="周日: 休息"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">工作时间(英文)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Weekday</label>
                          <input
                            type="text"
                            value={contactInfo.workTime.weekdayEn}
                            onChange={(e) => setContactInfo({ ...contactInfo, workTime: { ...contactInfo.workTime, weekdayEn: e.target.value }})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Monday-Friday: 9:00 - 18:00"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Saturday</label>
                          <input
                            type="text"
                            value={contactInfo.workTime.saturdayEn}
                            onChange={(e) => setContactInfo({ ...contactInfo, workTime: { ...contactInfo.workTime, saturdayEn: e.target.value }})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Saturday: 9:00 - 17:00"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Sunday</label>
                          <input
                            type="text"
                            value={contactInfo.workTime.sundayEn}
                            onChange={(e) => setContactInfo({ ...contactInfo, workTime: { ...contactInfo.workTime, sundayEn: e.target.value }})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Sunday: Closed"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button onClick={handleSaveContactInfo} className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Save className="w-5 h-5" />
                        <span>保存联系信息</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-gray-50 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-gray-600" />
                      页脚设置
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">页脚标语</label>
                      <textarea
                        value={footerInfo.slogan}
                        onChange={(e) => setFooterInfo({ ...footerInfo, slogan: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instagram 链接</label>
                        <input
                          type="text"
                          value={footerInfo.instagramUrl}
                          onChange={(e) => setFooterInfo({ ...footerInfo, instagramUrl: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Facebook 链接</label>
                        <input
                          type="text"
                          value={footerInfo.facebookUrl}
                          onChange={(e) => setFooterInfo({ ...footerInfo, facebookUrl: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">YouTube 链接</label>
                        <input
                          type="text"
                          value={footerInfo.youtubeUrl}
                          onChange={(e) => setFooterInfo({ ...footerInfo, youtubeUrl: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button onClick={handleSaveFooterInfo} className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                        <Save className="w-5 h-5" />
                        <span>保存页脚设置</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-indigo-50 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                      <Menu className="w-5 h-5 mr-2 text-indigo-600" />
                      导航栏设置
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="border-b border-indigo-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">导航菜单项</h4>
                      {navItems.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 mb-4 p-4 bg-white rounded-lg">
                          <div className="flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">路径</label>
                                <input
                                  type="text"
                                  value={item.path}
                                  onChange={(e) => {
                                    const newItems = [...navItems];
                                    newItems[index] = { ...item, path: e.target.value };
                                    setNavItems(newItems);
                                  }}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">中文标签</label>
                                <input
                                  type="text"
                                  value={item.label}
                                  onChange={(e) => {
                                    const newItems = [...navItems];
                                    newItems[index] = { ...item, label: e.target.value };
                                    setNavItems(newItems);
                                  }}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">英文标签</label>
                                <input
                                  type="text"
                                  value={item.labelEn}
                                  onChange={(e) => {
                                    const newItems = [...navItems];
                                    newItems[index] = { ...item, labelEn: e.target.value };
                                    setNavItems(newItems);
                                  }}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <button onClick={handleSaveNavItems} className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        <Save className="w-5 h-5" />
                        <span>保存导航设置</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-orange-50 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                      <ImageIcon className="w-5 h-5 mr-2 text-orange-600" />
                      主页Banner设置
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="border-b border-orange-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Banner文字内容</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
                          <input
                            type="text"
                            value={homeConfig.hero.title}
                            onChange={(e) => setHomeConfig({ ...homeConfig, hero: { ...homeConfig.hero, title: e.target.value } })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">副标题</label>
                          <input
                            type="text"
                            value={homeConfig.hero.subtitle}
                            onChange={(e) => setHomeConfig({ ...homeConfig, hero: { ...homeConfig.hero, subtitle: e.target.value } })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">描述文字</label>
                          <textarea
                            value={homeConfig.hero.description}
                            onChange={(e) => setHomeConfig({ ...homeConfig, hero: { ...homeConfig.hero, description: e.target.value } })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">按钮1文字</label>
                          <input
                            type="text"
                            value={homeConfig.hero.buttonText}
                            onChange={(e) => setHomeConfig({ ...homeConfig, hero: { ...homeConfig.hero, buttonText: e.target.value } })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">按钮2文字</label>
                          <input
                            type="text"
                            value={homeConfig.hero.button2Text}
                            onChange={(e) => setHomeConfig({ ...homeConfig, hero: { ...homeConfig.hero, button2Text: e.target.value } })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-orange-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">背景图片设置</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">图片URL</label>
                          <input
                            type="text"
                            value={homeConfig.hero.backgroundImage}
                            onChange={(e) => setHomeConfig({ ...homeConfig, hero: { ...homeConfig.hero, backgroundImage: e.target.value } })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="输入图片链接或上传图片"
                          />
                        </div>
                        <div className="flex items-end">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  const result = event.target?.result as string;
                                  setHomeConfig({ ...homeConfig, hero: { ...homeConfig.hero, backgroundImage: result } });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                      {homeConfig.hero.backgroundImage && (
                        <div className="mt-4">
                          <img 
                            src={homeConfig.hero.backgroundImage} 
                            alt="Banner预览" 
                            className="max-w-xs rounded-lg border border-gray-200"
                          />
                        </div>
                      )}
                    </div>

                    <div className="border-b border-orange-200 pb-6">
                      <h4 className="font-semibold text-gray-900 mb-4">视频设置</h4>
                      <div className="flex items-center space-x-4 mb-4">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={homeConfig.hero.useVideo}
                            onChange={(e) => setHomeConfig({ ...homeConfig, hero: { ...homeConfig.hero, useVideo: e.target.checked } })}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="ml-2 text-gray-700">启用视频背景</span>
                        </label>
                      </div>

                      {homeConfig.hero.useVideo && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">视频URL</label>
                              <input
                                type="text"
                                value={homeConfig.hero.media.find(m => m.type === 'video')?.url || ''}
                                onChange={(e) => {
                                  const videoMedia = homeConfig.hero.media.find(m => m.type === 'video');
                                  if (videoMedia) {
                                    videoMedia.url = e.target.value;
                                  } else {
                                    homeConfig.hero.media.push({ id: Date.now().toString(), type: 'video', title: 'Banner视频', url: e.target.value });
                                  }
                                  setHomeConfig({ ...homeConfig });
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="支持视频链接或YouTube/Vimeo嵌入链接"
                              />
                            </div>
                            <div className="flex items-end">
                              <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                      const result = event.target?.result as string;
                                      const videoMedia = homeConfig.hero.media.find(m => m.type === 'video');
                                      if (videoMedia) {
                                        videoMedia.url = result;
                                      } else {
                                        homeConfig.hero.media.push({ id: Date.now().toString(), type: 'video', title: 'Banner视频', url: result });
                                      }
                                      setHomeConfig({ ...homeConfig });
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                              />
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">
                            支持上传本地视频文件（mp4, webm, ogg）或输入视频链接、YouTube/Vimeo嵌入链接
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-4">
                      <button onClick={handleSaveHomeConfig} className="flex items-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                        <Save className="w-5 h-5" />
                        <span>保存Banner设置</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'factory' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <Tags className="w-6 h-6 mr-2 text-teal-600" />
                      工厂分类管理
                    </h2>
                    <button 
                      onClick={() => setEditingFactoryCategory({ id: Date.now().toString(), name: '', nameEn: '' })}
                      className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                      <span>添加分类</span>
                    </button>
                  </div>

                  {editingFactoryCategory && (
                    <div className="space-y-4 mb-6 p-4 bg-teal-50 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">分类名称(中文)</label>
                          <input
                            type="text"
                            value={editingFactoryCategory.name}
                            onChange={(e) => setEditingFactoryCategory({ ...editingFactoryCategory, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                            placeholder="例如：淋浴房"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">分类名称(英文)</label>
                          <input
                            type="text"
                            value={editingFactoryCategory.nameEn}
                            onChange={(e) => setEditingFactoryCategory({ ...editingFactoryCategory, nameEn: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                            placeholder="例如：Showers"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => {
                            if (editingFactoryCategory.name && editingFactoryCategory.nameEn) {
                              const updatedCategories = editingFactoryCategory.id.startsWith('cat-') 
                                ? factoryCategories.map(c => c.id === editingFactoryCategory.id ? editingFactoryCategory : c)
                                : [...factoryCategories, { ...editingFactoryCategory, id: `cat-${Date.now()}` }];
                              setFactoryCategories(updatedCategories);
                              localStorage.setItem('factoryCategories', JSON.stringify(updatedCategories));
                              setEditingFactoryCategory(null);
                            }
                          }}
                          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          <span>保存</span>
                        </button>
                        <button
                          onClick={() => setEditingFactoryCategory(null)}
                          className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          <span>取消</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {factoryCategories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium text-gray-900">{category.name}</span>
                          <span className="text-gray-500 text-sm ml-2">({category.nameEn})</span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingFactoryCategory(category)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('确定要删除这个分类吗？')) {
                                const updatedCategories = factoryCategories.filter(c => c.id !== category.id);
                                setFactoryCategories(updatedCategories);
                                localStorage.setItem('factoryCategories', JSON.stringify(updatedCategories));
                              }
                            }}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">工厂信息管理</h2>
                    <button 
                      onClick={() => setEditingFactory({
                      id: Date.now().toString(),
                      name: '',
                      nameEn: '',
                      category: '',
                      categoryEn: '',
                      location: '',
                      locationEn: '',
                      description: '',
                      descriptionEn: '',
                      capacity: '',
                      capacityEn: '',
                      image: '',
                      features: [],
                      galleryImages: [],
                      videos: [],
                      phone: '',
                      phoneEn: '',
                      email: '',
                      emailEn: '',
                      workingHours: '',
                      workingHoursEn: '',
                      certifications: [],
                      factoryArea: '',
                      factoryAreaEn: '',
                      technicalStaff: '',
                      technicalStaffEn: '',
                      exportCountries: '',
                      exportCountriesEn: '',
                      patentTechnologies: '',
                      patentTechnologiesEn: '',
                      factoryStrengthTitle: '',
                      factoryStrengthTitleEn: '',
                    })}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span>添加工厂</span>
                  </button>
                </div>

                {editingFactory ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">工厂名称</label>
                        <input
                          type="text"
                          value={editingFactory.name}
                          onChange={(e) => setEditingFactory({ ...editingFactory, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">英文名称</label>
                        <input
                          type="text"
                          value={editingFactory.nameEn}
                          onChange={(e) => setEditingFactory({ ...editingFactory, nameEn: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">工厂分类</label>
                        <select
                          value={editingFactory.category}
                          onChange={(e) => {
                            const selectedCategory = factoryCategories.find(c => c.name === e.target.value);
                            setEditingFactory({ 
                              ...editingFactory, 
                              category: e.target.value,
                              categoryEn: selectedCategory?.nameEn || ''
                            });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">选择分类</option>
                          {factoryCategories.map((category) => (
                            <option key={category.id} value={category.name}>
                              {category.name} ({category.nameEn})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">所在地</label>
                        <input
                          type="text"
                          value={editingFactory.location}
                          onChange={(e) => setEditingFactory({ ...editingFactory, location: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">所在地(英文)</label>
                        <input
                          type="text"
                          value={editingFactory.locationEn}
                          onChange={(e) => setEditingFactory({ ...editingFactory, locationEn: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">产能规模</label>
                        <input
                          type="text"
                          value={editingFactory.capacity}
                          onChange={(e) => setEditingFactory({ ...editingFactory, capacity: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">产能规模(英文)</label>
                        <input
                          type="text"
                          value={editingFactory.capacityEn}
                          onChange={(e) => setEditingFactory({ ...editingFactory, capacityEn: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">工厂描述</label>
                      <textarea
                        value={editingFactory.description}
                        onChange={(e) => setEditingFactory({ ...editingFactory, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">工厂描述(英文)</label>
                      <textarea
                        value={editingFactory.descriptionEn}
                        onChange={(e) => setEditingFactory({ ...editingFactory, descriptionEn: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">工厂主图</label>
                      <input
                        type="text"
                        value={editingFactory.image}
                        onChange={(e) => setEditingFactory({ ...editingFactory, image: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="输入图片URL或上传图片"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">工厂图片</label>
                      <div className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={newFactoryImageUrl}
                          onChange={(e) => setNewFactoryImageUrl(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addFactoryImageUrl()}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="输入图片URL..."
                        />
                        <button onClick={addFactoryImageUrl} className="px-3 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {editingFactory.galleryImages.map((img, index) => (
                          <div key={index} className="relative">
                            <img src={img} alt={`Gallery ${index + 1}`} className="w-full aspect-square object-cover rounded-lg" />
                            <button
                              onClick={() => {
                                const newImages = [...editingFactory.galleryImages];
                                newImages.splice(index, 1);
                                setEditingFactory({ ...editingFactory, galleryImages: newImages });
                              }}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <div 
                          className="flex items-center justify-center w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
                          onClick={() => document.getElementById('factory-image-upload')?.click()}
                        >
                          <Upload className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                      <input
                        id="factory-image-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFactoryImageUpload}
                        className="hidden"
                      />
                    </div>



                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">视频链接</label>
                      <div className="flex flex-wrap gap-2">
                        {(editingFactory.videos || []).map((video, index) => (
                          <span key={video.id} className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                            <input
                              type="text"
                              value={video.title}
                              onChange={(e) => {
                                const newVideos = [...(editingFactory.videos || [])];
                                newVideos[index] = { ...newVideos[index], title: e.target.value };
                                setEditingFactory({ ...editingFactory, videos: newVideos });
                              }}
                              className="bg-transparent border-none outline-none text-sm w-auto max-w-20"
                              placeholder="中文"
                            />
                            <input
                              type="text"
                              value={video.titleEn || ''}
                              onChange={(e) => {
                                const newVideos = [...(editingFactory.videos || [])];
                                newVideos[index] = { ...newVideos[index], titleEn: e.target.value };
                                setEditingFactory({ ...editingFactory, videos: newVideos });
                              }}
                              className="bg-transparent border-none outline-none text-sm w-auto max-w-20"
                              placeholder="English"
                            />
                            <button onClick={() => {
                              const videos = Array.isArray(editingFactory.videos) ? editingFactory.videos : [];
                              const newVideos = videos.filter((_, i) => i !== index);
                              setEditingFactory({ ...editingFactory, videos: newVideos });
                            }} className="ml-1 hover:text-purple-600">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                        <div className="flex flex-wrap items-center gap-2">
                          <input
                            type="text"
                            value={newFactoryVideoTitle}
                            onChange={(e) => setNewFactoryVideoTitle(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-28"
                            placeholder="视频名称(中文)"
                          />
                          <input
                            type="text"
                            value={newFactoryVideoTitleEn}
                            onChange={(e) => setNewFactoryVideoTitleEn(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-28"
                            placeholder="视频名称(英文)"
                          />
                          <input
                            type="text"
                            value={newFactoryVideoUrlZh}
                            onChange={(e) => setNewFactoryVideoUrlZh(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addFactoryVideoUrl()}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-48"
                            placeholder="酷播云链接(国内)"
                          />
                          <input
                            type="text"
                            value={newFactoryVideoUrlEn}
                            onChange={(e) => setNewFactoryVideoUrlEn(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addFactoryVideoUrl()}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-48"
                            placeholder="YouTube链接(海外)"
                          />
                          <button onClick={addFactoryVideoUrl} className="px-3 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-3">联系方式</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">联系电话</label>
                          <input
                            type="text"
                            value={editingFactory.phone}
                            onChange={(e) => setEditingFactory({ ...editingFactory, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="400-888-8888"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">联系电话(英文)</label>
                          <input
                            type="text"
                            value={editingFactory.phoneEn}
                            onChange={(e) => setEditingFactory({ ...editingFactory, phoneEn: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="+86 400-888-8888"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">邮箱地址</label>
                          <input
                            type="text"
                            value={editingFactory.email}
                            onChange={(e) => setEditingFactory({ ...editingFactory, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="factory@sewoo.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">邮箱地址(英文)</label>
                          <input
                            type="text"
                            value={editingFactory.emailEn}
                            onChange={(e) => setEditingFactory({ ...editingFactory, emailEn: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="factory@sewoo.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">工作时间</label>
                          <input
                            type="text"
                            value={editingFactory.workingHours}
                            onChange={(e) => setEditingFactory({ ...editingFactory, workingHours: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="周一至周六 8:00-18:00"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">工作时间(英文)</label>
                          <input
                            type="text"
                            value={editingFactory.workingHoursEn}
                            onChange={(e) => setEditingFactory({ ...editingFactory, workingHoursEn: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Mon-Sat 8:00-18:00"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 rounded-xl p-4 mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-3">认证信息</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {editingFactory.certifications.map((cert, index) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm">
                            {cert.name} ({cert.nameEn})
                            <button onClick={() => {
                              const newCerts = [...editingFactory.certifications];
                              newCerts.splice(index, 1);
                              setEditingFactory({ ...editingFactory, certifications: newCerts });
                            }} className="ml-1 hover:text-yellow-600">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={newFactoryCertName}
                          onChange={(e) => setNewFactoryCertName(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="认证名称..."
                        />
                        <input
                          type="text"
                          value={newFactoryCertNameEn}
                          onChange={(e) => setNewFactoryCertNameEn(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="English Name..."
                        />
                        <button onClick={addFactoryCert} className="px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-indigo-50 rounded-xl p-4 mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-3">工厂实力标题</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">标题(中文)</label>
                          <input
                            type="text"
                            value={editingFactory.factoryStrengthTitle}
                            onChange={(e) => setEditingFactory({ ...editingFactory, factoryStrengthTitle: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="工厂实力展示"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">标题(英文)</label>
                          <input
                            type="text"
                            value={editingFactory.factoryStrengthTitleEn}
                            onChange={(e) => setEditingFactory({ ...editingFactory, factoryStrengthTitleEn: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Factory Strength"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-4 mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-3">工厂实力数据</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">厂房面积</label>
                          <input
                            type="text"
                            value={editingFactory.factoryArea}
                            onChange={(e) => setEditingFactory({ ...editingFactory, factoryArea: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="50,000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">厂房面积单位</label>
                          <input
                            type="text"
                            value={editingFactory.factoryAreaEn}
                            onChange={(e) => setEditingFactory({ ...editingFactory, factoryAreaEn: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="平方米厂房面积"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">技术人员</label>
                          <input
                            type="text"
                            value={editingFactory.technicalStaff}
                            onChange={(e) => setEditingFactory({ ...editingFactory, technicalStaff: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="200+"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">技术人员说明</label>
                          <input
                            type="text"
                            value={editingFactory.technicalStaffEn}
                            onChange={(e) => setEditingFactory({ ...editingFactory, technicalStaffEn: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="专业技术人员"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">出口国家</label>
                          <input
                            type="text"
                            value={editingFactory.exportCountries}
                            onChange={(e) => setEditingFactory({ ...editingFactory, exportCountries: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="50+"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">出口国家说明</label>
                          <input
                            type="text"
                            value={editingFactory.exportCountriesEn}
                            onChange={(e) => setEditingFactory({ ...editingFactory, exportCountriesEn: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="出口国家"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">专利技术</label>
                          <input
                            type="text"
                            value={editingFactory.patentTechnologies}
                            onChange={(e) => setEditingFactory({ ...editingFactory, patentTechnologies: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="100+"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">专利技术说明</label>
                          <input
                            type="text"
                            value={editingFactory.patentTechnologiesEn}
                            onChange={(e) => setEditingFactory({ ...editingFactory, patentTechnologiesEn: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="专利技术"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">工厂特色</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {editingFactory.features.map((feature, index) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {typeof feature === 'string' ? feature : `${feature.zh} (${feature.en})`}
                            <button onClick={() => {
                              const newFeatures = [...editingFactory.features];
                              newFeatures.splice(index, 1);
                              setEditingFactory({ ...editingFactory, features: newFeatures });
                            }} className="ml-1 hover:text-green-600">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={newFactoryFeature}
                          onChange={(e) => setNewFactoryFeature(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addFactoryFeature()}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-48"
                          placeholder="特色(中文)..."
                        />
                        <input
                          type="text"
                          value={newFactoryFeatureEn}
                          onChange={(e) => setNewFactoryFeatureEn(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addFactoryFeature()}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-48"
                          placeholder="特色(英文)..."
                        />
                        <button onClick={addFactoryFeature} className="px-3 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button onClick={handleSaveFactory} className="flex items-center space-x-2 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
                        <Save className="w-5 h-5" />
                        <span>保存</span>
                      </button>
                      <button onClick={() => setEditingFactory(null)} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        取消
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">工厂名称</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分类</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">所在地</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {factoryList.map((factory) => (
                          <tr key={factory.id}>
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <Building className="w-5 h-5 text-gray-400 mr-3" />
                                <span className="text-gray-900 font-medium">{factory.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-gray-700">{factory.category}</td>
                            <td className="py-4 px-4 text-gray-700">{factory.location}</td>
                            <td className="py-4 px-4">
                              <div className="flex space-x-2">
                                <button onClick={() => setEditingFactory({ ...factory, features: factory.features ? [...factory.features] : [], videos: factory.videos ? [...factory.videos] : [], galleryImages: factory.galleryImages ? [...factory.galleryImages] : [] })} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="编辑">
                                  <Edit2 className="w-5 h-5" />
                                </button>
                                <button onClick={() => handleDeleteFactory(factory.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="删除">
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">客户留言</h2>
                  <span className="text-sm text-gray-500">
                    共 {contactMessages.length} 条留言
                    {contactMessages.filter(m => m.status === 'unread').length > 0 && (
                      <span className="ml-2 bg-red-100 text-red-600 px-2 py-1 rounded-full">
                        {contactMessages.filter(m => m.status === 'unread').length} 条未读
                      </span>
                    )}
                  </span>
                </div>

                <div className="space-y-4">
                  {contactMessages.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">暂无留言</p>
                  ) : (
                    contactMessages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`bg-gray-50 rounded-lg p-4 ${message.status === 'unread' ? 'border-l-4 border-blue-500' : ''}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <MessageSquare className="w-5 h-5 text-blue-900" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{message.name}</div>
                              <div className="text-sm text-gray-500 flex items-center space-x-2">
                                <Mail className="w-3 h-3" />
                                <span>{message.email}</span>
                                {message.phone && (
                                  <>
                                    <span>|</span>
                                    <Phone className="w-3 h-3" />
                                    <span>{message.phone}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              message.status === 'unread' ? 'bg-blue-100 text-blue-800' :
                              message.status === 'read' ? 'bg-gray-200 text-gray-700' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {message.status === 'unread' ? '未读' :
                               message.status === 'read' ? '已读' : '已回复'}
                            </span>
                            <span className="text-xs text-gray-400">{message.createdAt}</span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="text-sm font-medium text-gray-700 mb-1">咨询主题: {message.subject}</div>
                          <p className="text-gray-600">{message.message}</p>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                          {message.status === 'unread' && (
                            <button 
                              onClick={() => handleMarkMessageRead(message.id)}
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                            >
                              <Check className="w-4 h-4 inline mr-1" />
                              标记已读
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteMessage(message.id)}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                          >
                            <Trash2 className="w-4 h-4 inline mr-1" />
                            删除
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">网站设置</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">网站Logo设置</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Logo图片链接</label>
                        <input
                          type="text"
                          value={siteLogo}
                          onChange={(e) => setSiteLogo(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="请输入Logo图片的URL地址..."
                        />
                        <p className="text-xs text-gray-500 mt-2">提示：您可以使用PicGo等工具上传图片到图床，然后复制图片链接粘贴到这里</p>
                      </div>
                      
                      {siteLogo && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">当前Logo预览</label>
                          <img
                            src={siteLogo}
                            alt="Logo预览"
                            className="max-h-32 object-contain border border-gray-200 rounded-lg p-2"
                            onError={(e) => {
                              const img = e.target as HTMLImageElement;
                              img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="14" x="50" y="55" text-anchor="middle"%3E图片加载失败%3C/text%3E%3C/svg%3E';
                            }}
                          />
                        </div>
                      )}
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={saveSiteLogo}
                          className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
                        >
                          保存Logo
                        </button>
                        {siteLogo && (
                          <button
                            onClick={clearSiteLogo}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                          >
                            清除Logo
                          </button>
                        )}
                      </div>
                      
                      {!siteLogo && (
                        <p className="text-sm text-gray-500">
                          当前未设置Logo，网站将显示默认的文字Logo "SEWOO"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">网站副标题设置</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">中文标题</label>
                          <input
                            type="text"
                            value={siteTitle}
                            onChange={(e) => setSiteTitle(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="例如：高端卫浴"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">英文标题</label>
                          <input
                            type="text"
                            value={siteTitleEn}
                            onChange={(e) => setSiteTitleEn(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="例如：Premium Bathroom"
                          />
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={saveSiteTitle}
                          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors font-medium"
                        >
                          保存标题
                        </button>
                        {(siteTitle || siteTitleEn) && (
                          <button
                            onClick={clearSiteTitle}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                          >
                            清除标题
                          </button>
                        )}
                      </div>
                      
                      {!siteTitle && !siteTitleEn && (
                        <p className="text-sm text-gray-500">
                          当前未设置标题，网站将显示默认标题：中文"高端卫浴"，英文"Premium Bathroom"
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dataSync' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Database className="w-6 h-6 text-blue-600" />
                      数据同步
                    </h2>
                    <button
                      onClick={() => window.location.reload()}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      刷新数据
                    </button>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">💡 同步说明</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      点击下方按钮导出当前浏览器中所有配置数据（包括工厂图片、产品、分类等）。导出后请把数据发送给开发人员，或保存为JSON文件放到项目根目录。
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          const data: Record<string, any> = {};
                          for (let i = 0; i < localStorage.length; i++) {
                            const key = localStorage.key(i) || '';
                            const value = localStorage.getItem(key);
                            if (value) {
                              try {
                                data[key] = JSON.parse(value);
                              } catch {
                                data[key] = value;
                              }
                            }
                          }
                          const jsonString = JSON.stringify(data, null, 2);
                          const blob = new Blob([jsonString], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `sewoo-data-export-${new Date().toISOString().slice(0,10)}.json`;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        <Download className="w-5 h-5" />
                        下载数据到文件
                      </button>

                      <button
                        onClick={() => {
                          const data: Record<string, any> = {};
                          for (let i = 0; i < localStorage.length; i++) {
                            const key = localStorage.key(i) || '';
                            const value = localStorage.getItem(key);
                            if (value) {
                              try {
                                data[key] = JSON.parse(value);
                              } catch {
                                data[key] = value;
                              }
                            }
                          }
                          const jsonString = JSON.stringify(data, null, 2);
                          navigator.clipboard.writeText(jsonString);
                          alert('数据已复制到剪贴板！');
                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                      >
                        <CopyIcon className="w-5 h-5" />
                        复制到剪贴板
                      </button>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">当前浏览器中的数据</h3>
                      <div className="space-y-4">
                        {(() => {
                          const data: Record<string, any> = {};
                          for (let i = 0; i < localStorage.length; i++) {
                            const key = localStorage.key(i) || '';
                            const value = localStorage.getItem(key);
                            if (value) {
                              try {
                                data[key] = JSON.parse(value);
                              } catch {
                                data[key] = value;
                              }
                            }
                          }
                          const keys = Object.keys(data);
                          if (keys.length === 0) {
                            return (
                              <div className="text-center py-8 text-gray-500">
                                <Database className="w-12 h-12 mx-auto mb-4 opacity-30" />
                                <p>当前浏览器中没有检测到配置数据</p>
                                <p className="text-xs mt-2">请先在其他管理页面完成数据修改并保存</p>
                              </div>
                            );
                          }
                          return keys.map((key) => {
                            const value = data[key];
                            const isArray = Array.isArray(value);
                            const isObject = typeof value === 'object' && value !== null;
                            return (
                              <div key={key} className="p-4 bg-white border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="font-medium text-gray-800">{key}</div>
                                  <div className="text-xs text-gray-400">
                                    {isArray ? `数组 (${value.length} 项)` : isObject ? `对象 (${Object.keys(value).length} 个属性)` : '字符串'}
                                  </div>
                                </div>
                                {isObject && (
                                  <pre className="max-h-32 overflow-auto text-xs bg-gray-50 p-3 rounded">
                                    {JSON.stringify(value, null, 2)}
                                  </pre>
                                )}
                                {!isObject && (
                                  <pre className="max-h-32 overflow-auto text-xs bg-gray-50 p-3 rounded">
                                    {String(value)}
                                  </pre>
                                )}
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>

                    <div className="bg-yellow-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">📋 使用步骤</h3>
                      <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                        <li>确认上方显示了所有你修改过的数据（包括工厂图片URL）</li>
                        <li>点击"下载数据到文件"或"复制到剪贴板"</li>
                        <li>把导出的数据发送给开发人员</li>
                        <li>开发人员会把数据写入配置文件并部署到云端</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;