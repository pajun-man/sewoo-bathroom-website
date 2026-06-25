import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import ProductCard from '../components/ui/ProductCard';
import ProductLayout from '../components/layout/ProductLayout';
import { ArrowLeft } from 'lucide-react';
import defaultProducts from '../data/products.json';
import defaultCategories from '../data/categories.json';
import { useI18n } from '../contexts/I18nContext';

const Subcategory = () => {
  const { lang } = useI18n();
  const { subcategory } = useParams();
  const [productList, setProductList] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>(defaultCategories);
  
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    const savedDeletedProducts = localStorage.getItem('deletedProducts');
    const savedCategories = localStorage.getItem('categories');
    const deletedIds: string[] = savedDeletedProducts ? JSON.parse(savedDeletedProducts) : [];
    let mergedProducts = [...defaultProducts];
    
    if (savedCategories) {
      try {
        const parsed = JSON.parse(savedCategories);
        if (Array.isArray(parsed)) {
          const merged = [...parsed];
          defaultCategories.forEach((cat: any) => {
            const existingIndex = merged.findIndex((mc: any) => mc.id === cat.id);
            if (existingIndex < 0) {
              merged.push(cat);
            }
          });
          setCategories(merged);
        }
      } catch (error) {
        console.error('Failed to parse categories from localStorage:', error);
      }
    }
    
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
    const seenIds = new Set<string>();
    const uniqueProducts = mergedProducts.filter((p: any) => {
      if (!p.id || seenIds.has(p.id)) return false;
      seenIds.add(p.id);
      return true;
    });
    setProductList(uniqueProducts);
  }, []);
  
  if (!subcategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">{lang === 'zh' ? '分类未找到' : 'Category Not Found'}</h1>
        <Link to="/products">
          {lang === 'zh' ? '返回产品中心' : 'Back to Products'}
        </Link>
      </div>
    );
  }

  const decodedSubcategory = decodeURIComponent(subcategory);
  const filteredProducts = productList.filter((p: any) => p.subcategory === decodedSubcategory);
  
  const category = productList.find((p: any) => p.subcategory === decodedSubcategory)?.category || '产品';

  const getCategoryLabel = (cat: string) => {
    if (lang === 'zh') return cat;
    const found = categories.find((c: any) => c.name === cat);
    return found?.nameEn || cat;
  };

  const getSubcategoryLabel = (subcat: string) => {
    if (lang === 'zh') return subcat;
    for (const cat of categories) {
      const found = (cat.subcategories || []).find((s: any) => s.name === subcat);
      if (found) return found.nameEn || subcat;
    }
    return subcat;
  };

  return (
    <>
      <SEO
        title={`${getSubcategoryLabel(decodedSubcategory)} - SEWOO Premium Bathroom`}
        description={lang === 'zh' ? `浏览SEWOO ${decodedSubcategory}产品系列，高品质卫浴产品。` : `Explore SEWOO ${getSubcategoryLabel(decodedSubcategory)} product series, premium bathroom products.`}
        keywords={[getSubcategoryLabel(decodedSubcategory), lang === 'zh' ? '卫浴' : 'bathroom', 'SEWOO']}
      />

      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/products" className="text-white/80 hover:text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <span className="text-white/80">/</span>
            <Link to={`/products/category/${encodeURIComponent(category)}`} className="text-white/80 hover:text-white">
              {getCategoryLabel(category)}
            </Link>
            <span className="text-white/80">/</span>
            <span className="text-white">{getSubcategoryLabel(decodedSubcategory)}</span>
          </div>
          <h1 className="text-5xl font-bold">{getSubcategoryLabel(decodedSubcategory)}</h1>
        </div>
      </div>

      <ProductLayout currentCategory={category} currentSubcategory={decodedSubcategory}>
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-600">
            {lang === 'zh' ? '共' : 'Total'} {filteredProducts.length} {lang === 'zh' ? '款产品' : 'products'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product: any) => {
            const displayCertifications = lang === 'zh' 
              ? (product.certifications || [])
              : (product.certificationsEn || product.certifications || []);
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                category={product.category}
                name={lang === 'zh' ? product.name : product.nameEn || product.name}
                nameEn={product.nameEn}
                image={product.images[0]}
                description={lang === 'zh' ? product.description : product.descriptionEn || product.description}
                descriptionEn={product.descriptionEn}
                certifications={displayCertifications}
              />
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              {lang === 'zh' ? '该细分类目暂无产品' : 'No products in this subcategory'}
            </p>
            <Link to="/products" className="block mt-4 text-blue-900 hover:text-blue-700">
              {lang === 'zh' ? '返回产品中心' : 'Back to Products'}
            </Link>
          </div>
        )}
      </ProductLayout>
    </>
  );
};

export default Subcategory;