import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import ProductLayout from '../components/layout/ProductLayout';
import { ArrowLeft, Check, Download, FileText, Image, X, CheckCircle } from 'lucide-react';
import { products } from '../data/loader';
import { useI18n } from '../contexts/I18nContext';

const CONTACT_EMAIL = '3312327005@qq.com';

const ProductDetail = () => {
  const { lang } = useI18n();
  const { category, slug } = useParams();
  const location = useLocation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactType, setContactType] = useState<'quote' | 'appointment'>('quote');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    setActiveImageIndex(0);
    window.scrollTo(0, 0);
    
    const loadData = () => {
      const savedProducts = localStorage.getItem('products');
      const savedDeletedProducts = localStorage.getItem('deletedProducts');
      const deletedIds: string[] = savedDeletedProducts ? JSON.parse(savedDeletedProducts) : [];
      let mergedProducts = [...products];
      
      if (savedProducts) {
        try {
          const parsed = JSON.parse(savedProducts);
          if (Array.isArray(parsed)) {
            parsed.forEach(p => {
              const existingIndex = mergedProducts.findIndex(mp => mp.id === p.id);
              if (existingIndex >= 0) {
                mergedProducts[existingIndex] = p;
              } else {
                mergedProducts.push(p);
              }
            });
          }
        } catch (error) {
          console.error('Failed to parse products from localStorage:', error);
        }
      }
      
      mergedProducts = mergedProducts.filter((p: any) => !deletedIds.includes(p.id));
      
      const decodedCategory = category ? decodeURIComponent(category) : '';
      const found = mergedProducts.find(
        (p: any) => p.slug === slug && p.category === decodedCategory
      );
      setCurrentProduct(found);
    };
    
    loadData();
  }, [location.pathname, category, slug]);

  const product = currentProduct;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">{lang === 'zh' ? '产品未找到' : 'Product Not Found'}</h1>
        <Link to="/products">
          <Button>{lang === 'zh' ? '返回产品列表' : 'Back to Products'}</Button>
        </Link>
      </div>
    );
  }

  const savedProducts = localStorage.getItem('products');
  const savedDeletedProducts = localStorage.getItem('deletedProducts');
  const deletedIds: string[] = savedDeletedProducts ? JSON.parse(savedDeletedProducts) : [];
  let dataSource = [...products];
  if (savedProducts) {
    try {
      const parsed = JSON.parse(savedProducts);
      if (Array.isArray(parsed)) {
        parsed.forEach(p => {
          const existingIndex = dataSource.findIndex(mp => mp.id === p.id);
          if (existingIndex >= 0) {
            dataSource[existingIndex] = p;
          } else {
            dataSource.push(p);
          }
        });
      }
    } catch (error) {
      console.error('Failed to parse products from localStorage:', error);
    }
  }
  dataSource = dataSource.filter((p: any) => !deletedIds.includes(p.id));
  const relatedProducts = dataSource
    .filter((p: any) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const categoryTranslations: Record<string, string> = {
    '淋浴房': 'Showers',
    '马桶': 'Toilets',
    '盆': 'Basins',
    '智能马桶': 'Smart Toilets',
    '花洒': 'Showers',
    '其他产品': 'Others',
  };
  
  const subcategoryTranslations: Record<string, string> = {
    '整体淋浴房': 'Integrated Shower',
    '淋浴屏风': 'Shower Screen',
    '淋浴底座': 'Shower Base',
    '连体马桶': 'One-Piece Toilet',
    '分体马桶': 'Two-Piece Toilet',
    '壁挂马桶': 'Wall Hung Toilet',
    '台上盆': 'Countertop Basin',
    '台下盆': 'Undermount Basin',
    '立柱盆': 'Pedestal Basin',
    '一体盆': 'Integrated Basin',
    '全自动智能马桶': 'All-in-One Smart Toilet',
    '智能马桶盖': 'Smart Seat Cover',
    '淋浴花洒': 'Rain Shower',
    '手持花洒': 'Handheld Shower',
    '淋浴龙头': 'Shower Mixer',
    '浴室柜': 'Bathroom Cabinet',
    '五金配件': 'Hardware',
    '地板': 'Flooring',
  };

  const getCategoryLabel = (cat: string) => {
    return lang === 'zh' ? cat : categoryTranslations[cat] || cat;
  };

  const getSubcategoryLabel = (subcat: string) => {
    return lang === 'zh' ? subcat : subcategoryTranslations[subcat] || subcat;
  };

  const specTranslations: Record<string, string> = {
    '材质': 'Material',
    '玻璃厚度': 'Glass Thickness',
    '尺寸': 'Dimensions',
    '开门方式': 'Door Type',
    '保修': 'Warranty',
    '表面处理': 'Surface Finish',
    '颜色': 'Color',
    '重量': 'Weight',
    '安装方式': 'Installation',
  };

  const getSpecLabel = (key: string) => {
    return lang === 'zh' ? key : specTranslations[key] || key;
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('sending');

    try {
      const subjectLabel = contactType === 'quote'
        ? (lang === 'zh' ? '产品报价请求' : 'Product Quote Request')
        : (lang === 'zh' ? '预约体验' : 'Book Appointment');

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
          _subject: `[SEWOO网站] ${subjectLabel} - ${product.name}`,
          message: `${lang === 'zh' ? '产品名称：' : 'Product Name: '}${product.name}\n${lang === 'zh' ? '留言内容：' : 'Message: '}${formData.message}`,
          _template: 'table',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        const message = {
          id: Date.now().toString(),
          ...formData,
          productName: product.name,
          contactType,
          createdAt: new Date().toLocaleString('zh-CN'),
          status: 'unread',
        };
        const existingMessages = localStorage.getItem('contactMessages');
        const messages = existingMessages ? JSON.parse(existingMessages) : [];
        messages.push(message);
        localStorage.setItem('contactMessages', JSON.stringify(messages));

        setFormData({ name: '', email: '', phone: '', message: '' });

        setTimeout(() => {
          setSubmitStatus('idle');
          setShowContactModal(false);
        }, 3000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('发送失败:', error);
      setSubmitStatus('error');
      alert(lang === 'zh' ? '发送失败，请稍后再试。您也可以直接拨打我们的电话或发送邮件。' : 'Failed to send. Please try again later, or call us directly.');
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openContactModal = (type: 'quote' | 'appointment') => {
    setContactType(type);
    setShowContactModal(true);
  };

  return (
    <>
      <SEO
        title={lang === 'zh' ? product.seo?.title || product.name : product.seo?.titleEn || product.nameEn || product.name}
        description={lang === 'zh' ? product.seo?.description || product.description : product.seo?.descriptionEn || product.descriptionEn || product.description}
        keywords={lang === 'zh' ? (product.seo?.keywords || []) : (product.seo?.keywordsEn || product.seo?.keywords || [])}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6 sm:mb-8 text-sm sm:text-base">
          <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-blue-900">
            <ArrowLeft className="w-5 h-5 mr-2" />
            {lang === 'zh' ? '返回产品中心' : 'Back to Products'}
          </Link>
          <span className="text-gray-400">/</span>
          <Link to={`/products/category/${encodeURIComponent(product.category)}`} className="text-gray-600 hover:text-blue-900">
            {getCategoryLabel(product.category)}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{getSubcategoryLabel(product.subcategory)}</span>
        </div>
      </div>

      <ProductLayout currentCategory={product.category} currentSubcategory={product.subcategory}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
          <div className="space-y-4">
            <div className="aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              <img
                src={product.images[activeImageIndex]}
                alt={lang === 'zh' ? product.name : (product.nameEn || product.name)}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 sm:gap-3">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`aspect-square rounded-md sm:rounded-lg overflow-hidden bg-gray-100 border-2 transition-all ${
                      activeImageIndex === index 
                        ? 'border-blue-900 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="inline-block bg-blue-100 text-blue-900 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              {getSubcategoryLabel(product.subcategory)}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">
              {lang === 'zh' ? product.name : product.nameEn || product.name}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              {lang === 'zh' ? product.nameEn : product.name}
            </p>

            <p className="text-sm sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              {lang === 'zh' ? product.description : product.descriptionEn || product.description}
            </p>

            <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{lang === 'zh' ? '产品特点' : 'Product Features'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {(lang === 'zh' ? product.features : product.featuresEn || product.features).map((feature: string, index: number) => (
                  <div key={index} className="flex items-center text-sm sm:text-base">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 text-white rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{lang === 'zh' ? '技术参数' : 'Technical Specifications'}</h3>
              <div className="space-y-2 sm:space-y-3">
                {Object.entries(lang === 'zh' ? (product.specifications as Record<string, string>) : (product.specificationsEn as Record<string, string> || product.specifications as Record<string, string>)).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-start gap-4 py-2 border-b border-gray-700 last:border-b-0 text-sm sm:text-base">
                    <span className="text-gray-400 flex-shrink-0">{key}</span>
                    <span className="font-medium text-right break-words">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <button 
                onClick={() => product.documents?.manual && window.open(product.documents.manual, '_blank')}
                disabled={!product.documents?.manual}
                className={`w-full flex items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg transition-colors ${
                  product.documents?.manual 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Download className="w-5 h-5" />
                <span>{lang === 'zh' ? '下载产品手册' : 'Download Product Manual'}</span>
              </button>
              <button 
                onClick={() => product.documents?.technicalData && window.open(product.documents.technicalData, '_blank')}
                disabled={!product.documents?.technicalData}
                className={`w-full flex items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg transition-colors ${
                  product.documents?.technicalData 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>{lang === 'zh' ? '查看技术数据表' : 'View Technical Data'}</span>
              </button>
              <button 
                onClick={() => product.documents?.imagesDownload && window.open(product.documents.imagesDownload, '_blank')}
                disabled={!product.documents?.imagesDownload}
                className={`w-full flex items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base rounded-lg transition-colors ${
                  product.documents?.imagesDownload 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Image className="w-5 h-5" />
                <span>{lang === 'zh' ? '下载产品图片' : 'Download Product Images'}</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={() => openContactModal('quote')}
              >
                {lang === 'zh' ? '获取报价' : 'Get Quote'}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1"
                onClick={() => openContactModal('appointment')}
              >
                {lang === 'zh' ? '预约体验' : 'Book Appointment'}
              </Button>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
              {lang === 'zh' ? '相关产品' : 'Related Products'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
              {relatedProducts.map((relatedProduct: any) => {
                const displayCertifications = lang === 'zh' 
                  ? (relatedProduct.certifications || [])
                  : (relatedProduct.certificationsEn || relatedProduct.certifications || []);
                return (
                  <ProductCard
                    key={relatedProduct.id}
                    id={relatedProduct.id}
                    slug={relatedProduct.slug}
                    category={relatedProduct.category}
                    name={relatedProduct.name}
                    nameEn={relatedProduct.nameEn}
                    image={relatedProduct.images[0]}
                    description={relatedProduct.description}
                    descriptionEn={relatedProduct.descriptionEn}
                    certifications={displayCertifications}
                  />
                );
              })}
            </div>
          </div>
        )}
      </ProductLayout>

      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowContactModal(false)}></div>
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {contactType === 'quote' 
                  ? (lang === 'zh' ? '获取报价' : 'Get Quote')
                  : (lang === 'zh' ? '预约体验' : 'Book Appointment')}
              </h2>
              <button 
                onClick={() => setShowContactModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                {lang === 'zh' ? `您正在咨询产品：` : `You are inquiring about: `}
                <span className="font-medium text-gray-900">{product.name}</span>
              </p>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-green-900">
                      {lang === 'zh' ? '消息已成功发送！' : 'Your message has been sent!'}
                    </div>
                    <div className="text-sm text-green-700 mt-1">
                      {lang === 'zh' ? '我们会尽快与您联系，感谢您的咨询。' : 'We will contact you soon. Thank you for your inquiry!'}
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {lang === 'zh' ? '姓名' : 'Name'} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      disabled={submitStatus === 'sending'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder={lang === 'zh' ? '请输入您的姓名' : 'Enter your name'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {lang === 'zh' ? '邮箱' : 'Email'} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      disabled={submitStatus === 'sending'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder={lang === 'zh' ? '请输入您的邮箱' : 'Enter your email'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'zh' ? '电话' : 'Phone'}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    disabled={submitStatus === 'sending'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    placeholder={lang === 'zh' ? '请输入您的电话' : 'Enter your phone'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {lang === 'zh' ? '留言内容' : 'Message'} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows={4}
                    disabled={submitStatus === 'sending'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 resize-y"
                    placeholder={lang === 'zh' ? '请输入您的咨询内容' : 'Enter your message'}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={submitStatus === 'sending'}>
                  {submitStatus === 'sending'
                    ? (lang === 'zh' ? '发送中...' : 'Sending...')
                    : (lang === 'zh' ? '提交咨询' : 'Submit Inquiry')}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;