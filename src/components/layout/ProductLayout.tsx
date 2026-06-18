import { Link } from 'react-router-dom';
import { Filter } from 'lucide-react';
import categoriesData from '../../data/categories.json';
import { useI18n } from '../../contexts/I18nContext';

interface ProductLayoutProps {
  children: React.ReactNode;
  currentCategory?: string;
  currentSubcategory?: string;
}

const ProductLayout = ({ children, currentCategory, currentSubcategory }: ProductLayoutProps) => {
  const { lang } = useI18n();
  const savedCategories = localStorage.getItem('categories');
  const categories = savedCategories ? JSON.parse(savedCategories) : categoriesData;

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

  const getSubcategoryLabel = (name: string) => {
    return lang === 'zh' ? name : subcategoryTranslations[name] || name;
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="lg:col-span-2 xl:col-span-2">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-28 h-fit">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                {lang === 'zh' ? '产品分类' : 'Product Categories'}
              </h3>
              <nav className="space-y-3">
                <Link
                  to="/products"
                  className={`block w-full text-left px-5 py-3 rounded-lg transition-colors ${
                    !currentCategory && !currentSubcategory ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {lang === 'zh' ? '全部产品' : 'All Products'}
                </Link>
                {categories.map((cat: any) => (
                  <div key={cat.name} className="space-y-2">
                    <Link
                      to={`/products/category/${encodeURIComponent(cat.name)}`}
                      className={`block w-full text-left px-5 py-3 rounded-lg transition-colors ${
                        currentCategory === cat.name ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {lang === 'zh' ? cat.name : cat.nameEn || cat.name}
                    </Link>
                    <div className="ml-4 space-y-2">
                      {cat.subcategories.map((subcat: { id: string; name: string; nameEn: string }) => (
                        <Link
                          key={subcat.id}
                          to={`/products/subcategory/${encodeURIComponent(subcat.name)}`}
                          className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${
                            currentSubcategory === subcat.name ? 'bg-blue-900 text-white' : 'text-gray-600 hover:text-blue-900 hover:bg-gray-200'
                          }`}
                        >
                          {getSubcategoryLabel(subcat.name)}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-10 xl:col-span-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLayout;