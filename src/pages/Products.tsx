import { useState, useEffect, useMemo } from 'react';
import SEO from '../components/seo/SEO';
import ProductCard from '../components/ui/ProductCard';
import ProductLayout from '../components/layout/ProductLayout';
import products from '../data/products.json';
import seoConfig from '../data/seo-config.json';
import { useI18n } from '../contexts/I18nContext';

const defaultCertifications = ['CUPC', 'ETL', 'CE', 'WATERMARK'];

const certificationColors: Record<string, string> = {
  CUPC: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200',
  ETL: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200',
  CE: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
  WATERMARK: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
};

const colorPalette = [
  'bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200',
  'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200',
  'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
  'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',
  'bg-cyan-100 text-cyan-800 border-cyan-200 hover:bg-cyan-200',
  'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200',
  'bg-lime-100 text-lime-800 border-lime-200 hover:bg-lime-200',
  'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200',
];

const getCertificationColor = (cert: string): string => {
  if (certificationColors[cert]) return certificationColors[cert];
  let hash = 0;
  for (let i = 0; i < cert.length; i++) {
    hash = cert.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colorPalette[Math.abs(hash) % colorPalette.length];
};

const Products = () => {
  const { lang } = useI18n();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [productList, setProductList] = useState<any[]>(products);

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    const savedDeletedProducts = localStorage.getItem('deletedProducts');
    const deletedIds: string[] = savedDeletedProducts ? JSON.parse(savedDeletedProducts) : [];
    let mergedProducts = [...products];
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed)) {
          parsed.forEach((p: any) => {
            const existingIndex = mergedProducts.findIndex((mp: any) => mp.id === p.id);
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
    setProductList(mergedProducts);
  }, []);

  const productsPageConfig = seoConfig.pages.find(p => p.page === 'products');

  // 动态从产品数据中提取所有认证标签（包括后台新增的）
  const allCertifications = useMemo(() => {
    const certSet = new Set<string>(defaultCertifications);
    productList.forEach((p: any) => {
      if (Array.isArray(p.certifications)) {
        p.certifications.forEach((c: string) => {
          if (c && String(c).trim()) certSet.add(String(c).trim());
        });
      }
      if (Array.isArray(p.certificationsEn)) {
        p.certificationsEn.forEach((c: string) => {
          if (c && String(c).trim()) certSet.add(String(c).trim());
        });
      }
    });
    return Array.from(certSet);
  }, [productList]);

  const filteredProducts = useMemo(() => {
    let filtered = [...productList];

    if (activeCategory) {
      filtered = filtered.filter((p: any) => p.category === activeCategory);
    }
    if (activeSubcategory) {
      filtered = filtered.filter((p: any) => p.subcategory === activeSubcategory);
    }
    if (selectedCertifications.length > 0) {
      filtered = filtered.filter((p: any) => {
        // 同时检查中英文认证标签
        const certs = [
          ...(p.certifications || []),
          ...(p.certificationsEn || []),
        ].map((c: string) => c?.trim());
        return selectedCertifications.every(cert => certs.includes(cert));
      });
    }

    return filtered;
  }, [productList, activeCategory, activeSubcategory, selectedCertifications]);

  const toggleCertification = (cert: string) => {
    setSelectedCertifications(prev =>
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );
  };

  const clearFilters = () => {
    setSelectedCertifications([]);
    setActiveCategory(null);
    setActiveSubcategory(null);
  };

  return (
    <>
      <SEO
        title={productsPageConfig?.title || (lang === 'zh' ? '产品中心' : 'Products')}
        description={productsPageConfig?.description || ''}
        keywords={productsPageConfig?.keywords || []}
        canonical={productsPageConfig?.canonical}
      />

      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">{lang === 'zh' ? '产品中心' : 'Products'}</h1>
          <p className="text-base sm:text-lg lg:text-xl opacity-90 px-2 sm:px-0">
            {lang === 'zh' ? '探索我们的高端卫浴产品系列' : 'Explore our premium bathroom product series'}
          </p>
        </div>
      </div>

      <ProductLayout>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {activeSubcategory || activeCategory || (lang === 'zh' ? '全部产品' : 'All Products')}
          </h2>
          <div className="flex items-center">
            <span className="text-sm sm:text-base text-gray-600">
              {filteredProducts.length} {lang === 'zh' ? '款产品' : 'products'}
            </span>
          </div>
        </div>

        {selectedCertifications.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-sm text-gray-500">{lang === 'zh' ? '已选择认证：' : 'Selected:'}</span>
            {selectedCertifications.map(cert => (
              <button
                key={cert}
                onClick={() => toggleCertification(cert)}
                className={`px-2 py-1 text-xs font-medium rounded-md border ${getCertificationColor(cert)} transition-colors`}
              >
                {cert}
              </button>
            ))}
            <button
              onClick={clearFilters}
              className="px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {lang === 'zh' ? '清除筛选' : 'Clear'}
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          <span className="text-sm text-gray-600 flex-shrink-0">{lang === 'zh' ? '认证筛选：' : 'Certifications:'}</span>
          {allCertifications.map(cert => (
            <button
              key={cert}
              onClick={() => toggleCertification(cert)}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-md border transition-colors ${
                selectedCertifications.includes(cert)
                  ? getCertificationColor(cert)
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
              title={cert}
            >
              {cert}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product: any) => {
            // 同时传递中英文认证标签
            const displayCertifications = lang === 'zh' 
              ? (product.certifications || [])
              : (product.certificationsEn || product.certifications || []);
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                category={product.category}
                name={product.name}
                nameEn={product.nameEn}
                image={product.images[0]}
                description={product.description}
                descriptionEn={product.descriptionEn}
                certifications={displayCertifications}
              />
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              {lang === 'zh' ? '没有找到符合条件的产品' : 'No products found matching your criteria'}
            </p>
          </div>
        )}
      </ProductLayout>
    </>
  );
};

export default Products;