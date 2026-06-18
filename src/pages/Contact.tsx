import { useState, useEffect } from 'react';
import SEO from '../components/seo/SEO';
import Button from '../components/ui/Button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import seoConfig from '../data/seo-config.json';
import { siteConfig } from '../data/loader';
import { useI18n } from '../contexts/I18nContext';

interface ContactInfo {
  companyName: string;
  slogan: string;
  sloganEn: string;
  address: string;
  addressEn: string;
  addressLine2: string;
  addressLine2En: string;
  phone: string;
  phoneHours: string;
  phoneHoursEn: string;
  emails: string[];
  workTime: {
    weekday: string;
    weekdayEn: string;
    saturday: string;
    saturdayEn: string;
    sunday: string;
    sundayEn: string;
  };
}

const defaultContactInfo: ContactInfo = {
  companyName: 'SEWOO',
  slogan: '高端卫浴品牌，致力于为您打造舒适、智能、环保的沐浴体验。',
  sloganEn: 'Premium bathroom brand dedicated to creating comfortable, smart, and eco-friendly bathing experiences.',
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
};

const getInitialContactInfo = (): ContactInfo => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('contactInfo');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fall through
      }
    }
  }
  if (siteConfig?.contactInfo) {
    return siteConfig.contactInfo as ContactInfo;
  }
  return defaultContactInfo;
};

const Contact = () => {
  const { lang, t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo>(getInitialContactInfo);

  useEffect(() => {
    const saved = localStorage.getItem('contactInfo');
    if (saved) {
      try {
        setContactInfo(JSON.parse(saved));
      } catch {
        // keep existing
      }
    }
  }, []);

  const contactPageConfig = seoConfig.pages.find(p => p.page === 'contact');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    const message = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toLocaleString('zh-CN'),
      status: 'unread',
    };
    
    const existingMessages = localStorage.getItem('contactMessages');
    const messages = existingMessages ? JSON.parse(existingMessages) : [];
    messages.push(message);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    alert('感谢您的留言，我们会尽快与您联系！');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SEO
        title={contactPageConfig?.title || '联系我们'}
        description={contactPageConfig?.description || ''}
        keywords={contactPageConfig?.keywords || []}
        canonical={contactPageConfig?.canonical}
      />

      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">{t('联系我们')}</h1>
          <p className="text-xl opacity-90">
            {lang === 'zh' ? '期待为您服务' : 'Looking forward to serving you'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {t('发送消息')}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('姓名')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('请输入您的姓名')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('邮箱')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('请输入您的邮箱')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('电话')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('请输入您的电话')}
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('咨询主题')} *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{t('请选择咨询主题')}</option>
                    <option value="product">{lang === 'zh' ? '产品咨询' : 'Product Inquiry'}</option>
                    <option value="dealer">{lang === 'zh' ? '经销商合作' : 'Dealer Cooperation'}</option>
                    <option value="support">{lang === 'zh' ? '技术支持' : 'Technical Support'}</option>
                    <option value="other">{lang === 'zh' ? '其他' : 'Other'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('留言内容')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('请输入您的留言内容')}
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                {t('提交留言')}
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {t('联系方式')}
            </h2>
            <div className="space-y-6 mb-12">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t('公司地址')}</h3>
                  <p className="text-gray-600">
                    {lang === 'zh' ? contactInfo.address : contactInfo.addressEn}<br />
                    {lang === 'zh' ? contactInfo.addressLine2 : contactInfo.addressLine2En}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t('客服热线')}</h3>
                  <p className="text-gray-600">{contactInfo.phone}</p>
                  <p className="text-sm text-gray-500">{lang === 'zh' ? contactInfo.phoneHours : contactInfo.phoneHoursEn}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t('电子邮箱')}</h3>
                  {contactInfo.emails.map((email, index) => (
                    <p key={index} className="text-gray-600">{email}</p>
                  ))}
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t('工作时间')}</h3>
                  <p className="text-gray-600">{lang === 'zh' ? contactInfo.workTime.weekday : contactInfo.workTime.weekdayEn}</p>
                  <p className="text-gray-600">{lang === 'zh' ? contactInfo.workTime.saturday : contactInfo.workTime.saturdayEn}</p>
                  <p className="text-gray-600">{lang === 'zh' ? contactInfo.workTime.sunday : contactInfo.workTime.sundayEn}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('常见问题')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('在联系我们之前，您可以先查看我们的常见问题解答，或许能找到您需要的答案。')}
              </p>
              <Button variant="outline">
                {t('查看 FAQ')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
