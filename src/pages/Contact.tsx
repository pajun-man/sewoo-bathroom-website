import { useState, useEffect } from 'react';
import SEO from '../components/seo/SEO';
import Button from '../components/ui/Button';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
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
  phone: '19174230029',
  phoneHours: '周一至周六 9:00-18:00',
  phoneHoursEn: 'Mon-Sat 9:00-18:00',
  emails: ['3312327005@qq.com'],
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

const CONTACT_EMAIL = '3312327005@qq.com';

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
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

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

  const subjectLabels: Record<string, { zh: string; en: string }> = {
    product: { zh: '产品咨询', en: 'Product Inquiry' },
    dealer: { zh: '经销商合作', en: 'Dealer Cooperation' },
    support: { zh: '技术支持', en: 'Technical Support' },
    other: { zh: '其他', en: 'Other' },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');

    try {
      const subjectLabel = formData.subject && subjectLabels[formData.subject]
        ? (lang === 'zh' ? subjectLabels[formData.subject].zh : subjectLabels[formData.subject].en)
        : (lang === 'zh' ? '产品咨询' : 'Product Inquiry');

      const response = await fetch('https://formsubmit.co/ajax/' + CONTACT_EMAIL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          _subject: `[SEWOO网站] ${subjectLabel} - ${formData.name}`,
          message: formData.message,
          _template: 'table',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
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

        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

        setTimeout(() => setSubmitStatus('idle'), 4000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('发送失败:', error);
      setSubmitStatus('error');
      alert(lang === 'zh' ? '发送失败，请稍后再试。您也可以直接拨打我们的电话或发送邮件。' : 'Failed to send. Please try again later, or call us directly.');
    }
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

      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
            {t('联系我们')}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl opacity-90">
            {lang === 'zh' ? '期待为您服务' : 'Looking forward to serving you'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
              {t('发送消息')}
            </h2>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-green-900">
                    {lang === 'zh' ? '消息已成功发送！' : 'Your message has been sent!'}
                  </div>
                  <div className="text-sm text-green-700 mt-1">
                    {lang === 'zh' ? '我们会尽快与您联系，感谢您的留言。' : 'We will contact you soon. Thank you for reaching out!'}
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    {t('姓名')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={submitStatus === 'sending'}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base disabled:bg-gray-100"
                    placeholder={lang === 'zh' ? '请输入您的姓名' : 'Enter your name'}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    {t('邮箱')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={submitStatus === 'sending'}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base disabled:bg-gray-100"
                    placeholder={lang === 'zh' ? '请输入您的邮箱' : 'Enter your email'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    {t('电话')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={submitStatus === 'sending'}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base disabled:bg-gray-100"
                    placeholder={lang === 'zh' ? '请输入您的电话' : 'Enter your phone'}
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    {t('咨询主题')} *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={submitStatus === 'sending'}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base disabled:bg-gray-100 bg-white"
                  >
                    <option value="">{lang === 'zh' ? '请选择咨询主题' : 'Select a subject'}</option>
                    <option value="product">{lang === 'zh' ? '产品咨询' : 'Product Inquiry'}</option>
                    <option value="dealer">{lang === 'zh' ? '经销商合作' : 'Dealer Cooperation'}</option>
                    <option value="support">{lang === 'zh' ? '技术支持' : 'Technical Support'}</option>
                    <option value="other">{lang === 'zh' ? '其他' : 'Other'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  {t('留言内容')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  disabled={submitStatus === 'sending'}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-y disabled:bg-gray-100"
                  placeholder={lang === 'zh' ? '请输入您的留言内容' : 'Enter your message'}
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={submitStatus === 'sending'}>
                {submitStatus === 'sending'
                  ? (lang === 'zh' ? '发送中...' : 'Sending...')
                  : (lang === 'zh' ? '提交留言' : 'Submit Message')}
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
              {t('联系方式')}
            </h2>
            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-900" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{t('公司地址')}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {lang === 'zh' ? contactInfo.address : contactInfo.addressEn}<br />
                    {lang === 'zh' ? contactInfo.addressLine2 : contactInfo.addressLine2En}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-900" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{t('客服热线')}</h3>
                  <a href={`tel:${contactInfo.phone}`} className="text-gray-600 text-sm sm:text-base hover:text-blue-900 transition-colors">
                    {contactInfo.phone}
                  </a>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {lang === 'zh' ? contactInfo.phoneHours : contactInfo.phoneHoursEn}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-900" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{t('电子邮箱')}</h3>
                  {contactInfo.emails.map((email, index) => (
                    <a key={index} href={`mailto:${email}`} className="block text-gray-600 text-sm sm:text-base hover:text-blue-900 transition-colors">
                      {email}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-900" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{t('工作时间')}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{lang === 'zh' ? contactInfo.workTime.weekday : contactInfo.workTime.weekdayEn}</p>
                  <p className="text-gray-600 text-sm sm:text-base">{lang === 'zh' ? contactInfo.workTime.saturday : contactInfo.workTime.saturdayEn}</p>
                  <p className="text-gray-600 text-sm sm:text-base">{lang === 'zh' ? contactInfo.workTime.sunday : contactInfo.workTime.sundayEn}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-lg">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-2 sm:mb-4">
                {t('常见问题')}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                {t('在联系我们之前，您可以先查看我们的常见问题解答，或许能找到您需要的答案。')}
              </p>
              <Button variant="outline" size="md" className="text-sm sm:text-base">
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
