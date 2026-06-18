import { Link } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useI18n } from '../../contexts/I18nContext';

interface NavItem {
  path: string;
  label: string;
  labelEn: string;
  hasDropdown?: boolean;
  dropdownItems?: {
    label: string;
    labelEn: string;
    subItems: { name: string; nameEn: string }[];
  }[];
}

const defaultDropdownItems = [
  { label: '淋浴房', labelEn: 'Shower Enclosures', subItems: [
    { name: '整体淋浴房', nameEn: 'Integrated Shower' },
    { name: '淋浴屏风', nameEn: 'Shower Screen' },
    { name: '淋浴底座', nameEn: 'Shower Base' },
  ]},
  { label: '马桶', labelEn: 'Toilets', subItems: [
    { name: '连体马桶', nameEn: 'One-Piece Toilet' },
    { name: '分体马桶', nameEn: 'Two-Piece Toilet' },
    { name: '壁挂马桶', nameEn: 'Wall Hung Toilet' },
  ]},
  { label: '盆', labelEn: 'Wash Basins', subItems: [
    { name: '台上盆', nameEn: 'Countertop Basin' },
    { name: '台下盆', nameEn: 'Undermount Basin' },
    { name: '立柱盆', nameEn: 'Pedestal Basin' },
    { name: '一体盆', nameEn: 'Integrated Basin' },
  ]},
  { label: '智能马桶', labelEn: 'Smart Toilets', subItems: [
    { name: '全自动智能马桶', nameEn: 'All-in-One Smart Toilet' },
    { name: '智能马桶盖', nameEn: 'Smart Seat Cover' },
    { name: '智能小便斗', nameEn: 'Smart Urinal' },
  ]},
  { label: '花洒', labelEn: 'Shower Fixtures', subItems: [
    { name: '淋浴花洒套装', nameEn: 'Shower Set' },
    { name: '手持花洒', nameEn: 'Handheld Shower' },
    { name: '头顶花洒', nameEn: 'Rain Shower' },
    { name: '淋浴龙头', nameEn: 'Shower Mixer' },
  ]},
  { label: '其他产品', labelEn: 'Other Products', subItems: [
    { name: '浴室家具', nameEn: 'Bathroom Furniture' },
    { name: '地板', nameEn: 'Flooring' },
    { name: '五金配件', nameEn: 'Hardware' },
    { name: '浴室柜', nameEn: 'Bathroom Cabinet' },
  ]},
];

const defaultNavItems: NavItem[] = [
  { path: '/', label: '首页', labelEn: 'Home' },
  { 
    path: '/products', 
    label: '产品中心', 
    labelEn: 'Products',
    hasDropdown: true,
    dropdownItems: defaultDropdownItems,
  },
  { path: '/inspiration', label: '灵感画廊', labelEn: 'Inspiration' },
  { path: '/factory', label: '工厂介绍', labelEn: 'Factory' },
  { path: '/about', label: '关于我们', labelEn: 'About' },
  { path: '/dealers', label: '可持续发展', labelEn: 'Sustainability' },
  { path: '/contact', label: '联系我们', labelEn: 'Contact' },
];

const Header = () => {
  const { lang, setLang, t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>(defaultNavItems);
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [siteTitle, setSiteTitle] = useState<string>('');
  const [siteTitleEn, setSiteTitleEn] = useState<string>('');

  useEffect(() => {
    const savedNavItems = localStorage.getItem('navItems');
    if (savedNavItems) {
      try {
        const parsed = JSON.parse(savedNavItems);
        const mergedItems = parsed.map((item: NavItem) => {
          if (item.hasDropdown && !item.dropdownItems) {
            return { ...item, dropdownItems: defaultDropdownItems };
          }
          return item;
        });
        setNavItems(mergedItems);
      } catch {
        setNavItems(defaultNavItems);
      }
    }

    const savedLogo = localStorage.getItem('siteLogo');
    if (savedLogo) {
      setLogoUrl(savedLogo);
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

  const handleLangChange = (newLang: 'zh' | 'en') => {
    setLang(newLang);
    setIsLangOpen(false);
  };

  const getItemLabel = (item: NavItem) => {
    return lang === 'zh' ? item.label : item.labelEn || item.label;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="SEWOO Logo"
                className="h-14 w-auto object-contain"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                }}
              />
            ) : (
              <div className="text-2xl font-bold text-blue-900">
                SEWOO
              </div>
            )}
            <div className="text-sm text-gray-600 hidden sm:block">
              {lang === 'zh' ? (siteTitle || '工厂供应链集合体') : (siteTitleEn || 'Factory Supply Chain')}
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-5 py-2 text-gray-700 hover:text-blue-900 transition-colors duration-200 font-medium"
              >
                {getItemLabel(item)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {lang === 'zh' ? t('中文') : t('English')}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                  <button
                    onClick={() => handleLangChange('zh')}
                    className={`block w-full px-4 py-2 text-sm text-left transition-colors ${
                      lang === 'zh' ? 'bg-blue-50 text-blue-900 font-medium' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {t('中文')}
                  </button>
                  <button
                    onClick={() => handleLangChange('en')}
                    className={`block w-full px-4 py-2 text-sm text-left transition-colors ${
                      lang === 'en' ? 'bg-blue-50 text-blue-900 font-medium' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {t('English')}
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 text-gray-700 hover:text-blue-900 transition-colors px-2"
                >
                  {getItemLabel(item)}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
