import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import ProductCard from '../components/ui/ProductCard';
import ProductLayout from '../components/layout/ProductLayout';
import { ArrowLeft } from 'lucide-react';
import defaultProducts from '../data/products.json';
import defaultCategories from '../data/categories.json';
import { useI18n } from '../contexts/I18nContext';

const Category = () => {
  const { lang } = useI18n();
  const { category } = useParams();
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
  
  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">{lang === 'zh' ? '分类未找到' : 'Category Not Found'}</h1>
        <Link to="/products">
          {lang === 'zh' ? '返回产品中心' : 'Back to Products'}
        </Link>
      </div>
    );
  }

  const decodedCategory = decodeURIComponent(category);
  const filteredProducts = productList.filter((p: any) => p.category === decodedCategory);
  
  const subcategories = [...new Set(filteredProducts.map((p: any) => p.subcategory))] as string[];

  const currentCategoryData = useMemo(() => {
    return categories.find((cat: any) => cat.name === decodedCategory);
  }, [categories, decodedCategory]);

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
        title={`${getCategoryLabel(decodedCategory)} - SEWOO Premium Bathroom`}
        description={lang === 'zh' ? `浏览SEWOO ${decodedCategory}产品系列，高品质卫浴产品。` : `Explore SEWOO ${getCategoryLabel(decodedCategory)} product series, premium bathroom products.`}
        keywords={[getCategoryLabel(decodedCategory), lang === 'zh' ? '卫浴' : 'bathroom', 'SEWOO']}
      />

      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/products" className="text-white/80 hover:text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <span className="text-white/80">/</span>
            <span className="text-white">{getCategoryLabel(decodedCategory)}</span>
          </div>
          <h1 className="text-5xl font-bold">{getCategoryLabel(decodedCategory)}</h1>
        </div>
      </div>

      <ProductLayout currentCategory={decodedCategory}>
        {subcategories.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{lang === 'zh' ? '细分类目' : 'Subcategories'}</h3>
            <div className="flex flex-wrap gap-3">
              {subcategories.map((subcat) => (
                <Link
                  key={subcat}
                  to={`/products/subcategory/${encodeURIComponent(subcat)}`}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-blue-900 hover:text-white transition-colors"
                >
                  {getSubcategoryLabel(subcat)}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{lang === 'zh' ? '全部产品' : 'All Products'}</h2>
          <span className="text-gray-600">
            {lang === 'zh' ? '共' : 'Total'} {filteredProducts.length} {lang === 'zh' ? '款产品' : 'products'}
          </span>
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
              {lang === 'zh' ? '该分类暂无产品' : 'No products in this category'}
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

export default Category;