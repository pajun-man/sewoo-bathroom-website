import { useState, useEffect } from 'react';
import SEO from '../components/seo/SEO';
import ProductCard from '../components/ui/ProductCard';
import ProductLayout from '../components/layout/ProductLayout';
import products from '../data/products.json';
import seoConfig from '../data/seo-config.json';
import { useI18n } from '../contexts/I18nContext';

const Products = () => {
  const { lang } = useI18n();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [productList, setProductList] = useState<any[]>(products);

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed)) {
          setProductList(parsed);
        }
      } catch (error) {
        console.error('Failed to parse products from localStorage:', error);
      }
    }
  }, []);

  const productsPageConfig = seoConfig.pages.find(p => p.page === 'products');

  const getProductsByCategory = (categoryName: string) => {
    return productList.filter((p: any) => p.category === categoryName);
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {activeCategory || (lang === 'zh' ? '全部产品' : 'All Products')}
          </h2>
          <div className="flex items-center">
            <span className="text-sm sm:text-base text-gray-600">
              {activeCategory 
                ? `${getProductsByCategory(activeCategory).length} ${lang === 'zh' ? '款产品' : 'products'}`
                : `${productList.length} ${lang === 'zh' ? '款产品' : 'products'}`
              }
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {(activeCategory ? getProductsByCategory(activeCategory) : productList).map((product: any) => (
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
            />
          ))}
        </div>

        {(activeCategory ? getProductsByCategory(activeCategory) : productList).length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              {lang === 'zh' ? '该分类暂无产品' : 'No products in this category'}
            </p>
          </div>
        )}
      </ProductLayout>
    </>
  );
};

export default Products;