import { useParams, Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import ProductCard from '../components/ui/ProductCard';
import ProductLayout from '../components/layout/ProductLayout';
import { ArrowLeft } from 'lucide-react';
import products from '../data/products.json';
import { useI18n } from '../contexts/I18nContext';

const Category = () => {
  const { lang } = useI18n();
  const { category } = useParams();
  
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
  const savedProducts = localStorage.getItem('products');
  const dataSource = savedProducts ? JSON.parse(savedProducts) : products;
  const filteredProducts = dataSource.filter((p: any) => p.category === decodedCategory);
  
  const subcategories = [...new Set(filteredProducts.map((p: any) => p.subcategory))] as string[];

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
          {filteredProducts.map((product: any) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              category={product.category}
              name={lang === 'zh' ? product.name : product.nameEn || product.name}
              image={product.images[0]}
              description={lang === 'zh' ? product.description : product.descriptionEn || product.description}
            />
          ))}
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