import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '../../contexts/I18nContext';

interface ProductCardProps {
  id: string;
  slug: string;
  category: string;
  name: string;
  nameEn?: string;
  image: string;
  description: string;
  descriptionEn?: string;
}

const ProductCard = ({ id, slug, category, name, nameEn, image, description, descriptionEn }: ProductCardProps) => {
  const { lang } = useI18n();
  
  return (
    <Link to={`/products/${encodeURIComponent(category)}/${slug}`} className="block h-full">
      <div className="group bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={lang === 'zh' ? name : (nameEn || name)}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        </div>
        <div className="p-4 sm:p-6 flex flex-col flex-1">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-900 transition-colors leading-tight">
            {lang === 'zh' ? name : (nameEn || name)}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-2 flex-1">
            {lang === 'zh' ? description : (descriptionEn || description)}
          </p>
          <div className="flex items-center text-sm sm:text-base text-blue-900 font-medium group-hover:text-yellow-600 transition-colors">
            <span>{lang === 'zh' ? '了解详情' : 'Learn More'}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
