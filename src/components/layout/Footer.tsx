import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useI18n } from '../../contexts/I18nContext';

interface ContactInfo {
  companyName: string;
  slogan: string;
  sloganEn: string;
  address: string;
  addressEn: string;
  addressLine2: string;
  addressLine2En: string;
  phone: string;
  emails: string[];
}

interface FooterSocial {
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
}

const defaultContactInfo: ContactInfo = {
  companyName: 'SEWOO',
  slogan: '工厂供应链集合体，专注高端卫浴制造二十余年，为全球客户提供优质产品与服务。',
  sloganEn: 'Factory Supply Chain Collective, specializing in premium bathroom manufacturing for over 20 years, providing quality products and services worldwide.',
  address: '广东省佛山市禅城区',
  addressEn: 'Chancheng District, Foshan City, Guangdong Province',
  addressLine2: '卫浴产业园区88号',
  addressLine2En: 'No. 88, Bathroom Industrial Park',
  phone: '+86 400-888-9999',
  emails: ['info@sewoo-bath.com', 'support@sewoo-bath.com'],
};

const defaultSocial: FooterSocial = {
  instagramUrl: 'https://instagram.com/sewoobath',
  facebookUrl: 'https://facebook.com/sewoobath',
  youtubeUrl: 'https://youtube.com/sewoobath',
};

const Footer = () => {
  const { lang, t } = useI18n();
  const currentYear = new Date().getFullYear();
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [social, setSocial] = useState<FooterSocial>(defaultSocial);

  useEffect(() => {
    const savedContact = localStorage.getItem('contactInfo');
    if (savedContact) {
      try {
        setContactInfo({ ...defaultContactInfo, ...JSON.parse(savedContact) });
      } catch {
        setContactInfo(defaultContactInfo);
      }
    }

    const savedFooter = localStorage.getItem('footerInfo');
    if (savedFooter) {
      try {
        const footerData = JSON.parse(savedFooter);
        setSocial({
          instagramUrl: footerData.instagramUrl || defaultSocial.instagramUrl,
          facebookUrl: footerData.facebookUrl || defaultSocial.facebookUrl,
          youtubeUrl: footerData.youtubeUrl || defaultSocial.youtubeUrl,
        });
      } catch {
        setSocial(defaultSocial);
      }
    }
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">{contactInfo.companyName}</h3>
            <p className="text-gray-400 mb-4">
              {lang === 'zh' ? contactInfo.slogan : contactInfo.sloganEn}
            </p>
            <div className="flex space-x-4">
              <a href={social.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href={social.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href={social.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{t('产品分类')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products/category/淋浴房" className="text-gray-400 hover:text-white transition-colors">
                  {t('淋浴房')}
                </Link>
              </li>
              <li>
                <Link to="/products/category/马桶" className="text-gray-400 hover:text-white transition-colors">
                  {t('马桶')}
                </Link>
              </li>
              <li>
                <Link to="/products/category/花洒" className="text-gray-400 hover:text-white transition-colors">
                  {t('花洒')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  {t('查看全部产品')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{t('关于SEWOO')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  {t('品牌故事')}
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  {t('首页')}
                </Link>
              </li>
              <li>
                <Link to="/dealers" className="text-gray-400 hover:text-white transition-colors">
                  {t('可持续发展')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  {t('联系我们')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">{t('联系我们')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  {lang === 'zh' ? contactInfo.address : contactInfo.addressEn}<br />
                  {lang === 'zh' ? contactInfo.addressLine2 : contactInfo.addressLine2En}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">{contactInfo.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">{contactInfo.emails[0]}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} {contactInfo.companyName}. {t('版权所有')}.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                {t('隐私政策')}
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                {t('使用条款')}
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                {t('网站地图')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
