import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Filter, ChevronRight } from 'lucide-react';
import categoriesData from '../../data/categories.json';
import { useI18n } from '../../contexts/I18nContext';

interface ProductLayoutProps {
  children: React.ReactNode;
  currentCategory?: string;
  currentSubcategory?: string;
}

const ProductLayout = ({ children, currentCategory, currentSubcategory }: ProductLayoutProps) => {
  const { lang } = useI18n();
  const location = useLocation();
  const [categories, setCategories] = useState<any[]>(categoriesData);

  useEffect(() => {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      try {
        const parsed = JSON.parse(savedCategories);
        if (Array.isArray(parsed)) {
          const merged = [...parsed];
          categoriesData.forEach((cat: any) => {
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
  }, []);

  const getSubcategoryLabel = (subcat: any) => {
    return lang === 'zh' ? subcat.name : (subcat.nameEn || subcat.name);
  };

  // 收集所有分类（用于手机端的横向滚动标签栏）
  const allCategoryChips = [
    { label: lang === 'zh' ? '全部产品' : 'All Products', to: '/products', isActive: !currentCategory && !currentSubcategory },
    ...categories.map((cat: any) => [
      { label: lang === 'zh' ? cat.name : cat.nameEn || cat.name, to: `/products/category/${encodeURIComponent(cat.name)}`, isActive: currentCategory === cat.name },
      ...(cat.subcategories || []).map((subcat: any) => ({
        label: getSubcategoryLabel(subcat),
        to: `/products/subcategory/${encodeURIComponent(subcat.name)}`,
        isActive: currentSubcategory === subcat.name,
      })),
    ]),
  ].flat();

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* 桌面端：左侧栏 + 右侧内容 */}
        <div className="grid grid-cols-12 gap-4 lg:gap-8">
          {/* 左侧分类栏：手机隐藏，桌面显示 */}
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <div className="bg-gray-50 rounded-xl p-4 lg:p-6 sticky top-28 h-fit">
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4 lg:mb-6 flex items-center">
                <Filter className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                {lang === 'zh' ? '产品分类' : 'Product Categories'}
              </h3>
              <nav className="space-y-2">
                <Link
                  to="/products"
                  className={`block w-full text-left px-4 py-2.5 rounded-lg transition-colors text-sm ${
                    !currentCategory && !currentSubcategory ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {lang === 'zh' ? '全部产品' : 'All Products'}
                </Link>
                {categories.map((cat: any) => (
                  <div key={cat.name} className="space-y-1">
                    <Link
                      to={`/products/category/${encodeURIComponent(cat.name)}`}
                      className={`block w-full text-left px-4 py-2.5 rounded-lg transition-colors text-sm ${
                        currentCategory === cat.name ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {lang === 'zh' ? cat.name : cat.nameEn || cat.name}
                    </Link>
                    <div className="ml-4 space-y-1 pb-2">
                      {cat.subcategories.map((subcat: any) => (
                        <Link
                          key={subcat.id}
                          to={`/products/subcategory/${encodeURIComponent(subcat.name)}`}
                          className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                            currentSubcategory === subcat.name ? 'bg-blue-900 text-white' : 'text-gray-600 hover:text-blue-900 hover:bg-gray-200'
                          }`}
                        >
                          <span className="flex items-center">
                            <ChevronRight className="w-3 h-3 mr-1 opacity-50" />
                            {getSubcategoryLabel(subcat)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* 右侧内容区：手机占 12 列，桌面占 9/10 列 */}
          <div className="col-span-12 lg:col-span-9 xl:col-span-10">
            {/* 手机端：横向滚动的分类标签条 */}
            <div className="lg:hidden mb-4 sm:mb-6 -mx-4 px-4">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {allCategoryChips.map((chip, index) => (
                  <Link
                    key={index}
                    to={chip.to}
                    className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm whitespace-nowrap transition-colors ${
                      chip.isActive ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {chip.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* 产品内容 */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLayout;
