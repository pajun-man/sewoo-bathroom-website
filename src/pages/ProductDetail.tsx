import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import ProductLayout from '../components/layout/ProductLayout';
import { ArrowLeft, Check, Download, FileText, Image } from 'lucide-react';
import { products } from '../data/loader';
import { useI18n } from '../contexts/I18nContext';

const ProductDetail = () => {
  const { lang } = useI18n();
  const { category, slug } = useParams();
  const location = useLocation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  useEffect(() => {
    setActiveImageIndex(0);
    window.scrollTo(0, 0);
    
    const loadData = () => {
      const savedProducts = localStorage.getItem('products');
      const dataSource = savedProducts ? JSON.parse(savedProducts) : products;
      const decodedCategory = category ? decodeURIComponent(category) : '';
      const found = dataSource.find(
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
  const dataSource = savedProducts ? JSON.parse(savedProducts) : products;
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

  return (
    <>
      <SEO
        title={lang === 'zh' ? product.seo?.title || product.name : product.seo?.titleEn || product.nameEn || product.name}
        description={lang === 'zh' ? product.seo?.description || product.description : product.seo?.descriptionEn || product.descriptionEn || product.description}
        keywords={product.seo?.keywords || []}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 transition-all ${
                      activeImageIndex === index 
                        ? 'border-blue-900 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="inline-block bg-blue-100 text-blue-900 px-4 py-1 rounded-full text-sm font-medium mb-4">
              {getSubcategoryLabel(product.subcategory)}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {lang === 'zh' ? product.name : product.nameEn || product.name}
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              {lang === 'zh' ? product.nameEn : product.name}
            </p>

            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              {lang === 'zh' ? product.description : product.descriptionEn || product.description}
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{lang === 'zh' ? '产品特点' : 'Product Features'}</h3>
              <div className="grid grid-cols-2 gap-3">
                {(lang === 'zh' ? product.features : product.featuresEn || product.features).map((feature: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 text-white rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">{lang === 'zh' ? '技术参数' : 'Technical Specifications'}</h3>
              <div className="space-y-3">
                {Object.entries(lang === 'zh' ? (product.specifications as Record<string, string>) : (product.specificationsEn as Record<string, string> || product.specifications as Record<string, string>)).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                    <span className="text-gray-400">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <button 
                onClick={() => product.documents?.manual && window.open(product.documents.manual, '_blank')}
                disabled={!product.documents?.manual}
                className={`w-full flex items-center justify-center space-x-3 px-6 py-3 rounded-lg transition-colors ${
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
                className={`w-full flex items-center justify-center space-x-3 px-6 py-3 rounded-lg transition-colors ${
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
                className={`w-full flex items-center justify-center space-x-3 px-6 py-3 rounded-lg transition-colors ${
                  product.documents?.imagesDownload 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Image className="w-5 h-5" />
                <span>{lang === 'zh' ? '下载产品图片' : 'Download Product Images'}</span>
              </button>
            </div>

            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={() => product.documents?.quote && window.open(product.documents.quote, '_blank')}
              >
                {lang === 'zh' ? '获取报价' : 'Get Quote'}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1"
                onClick={() => product.documents?.appointment && window.open(product.documents.appointment, '_blank')}
              >
                {lang === 'zh' ? '预约体验' : 'Book Appointment'}
              </Button>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {lang === 'zh' ? '相关产品' : 'Related Products'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct: any) => (
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
                />
              ))}
            </div>
          </div>
        )}
      </ProductLayout>
    </>
  );
};

export default ProductDetail;