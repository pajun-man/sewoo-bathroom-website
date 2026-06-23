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
  certifications?: string[];
}

const certificationStyles: Record<string, string> = {
  CUPC: 'bg-orange-100 text-orange-800 border-orange-200',
  ETL: 'bg-purple-100 text-purple-800 border-purple-200',
  CE: 'bg-blue-100 text-blue-800 border-blue-200',
  WATERMARK: 'bg-green-100 text-green-800 border-green-200',
};

const certificationLabels: Record<string, string> = {
  CUPC: 'CUPC',
  ETL: 'ETL',
  CE: 'CE',
  WATERMARK: 'Watermark',
};

const ProductCard = ({ id, slug, category, name, nameEn, image, description, descriptionEn, certifications }: ProductCardProps) => {
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
          
          {certifications && certifications.length > 0 && (
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-wrap gap-1 sm:gap-2 justify-end">
              {certifications.slice(0, 3).map((cert) => (
                <span
                  key={cert}
                  className={`px-1.5 sm:px-2 py-1 text-[10px] sm:text-xs font-semibold rounded-md border ${
                    certificationStyles[cert] || 'bg-gray-100 text-gray-700 border-gray-200'
                  }`}
                  title={certificationLabels[cert] || cert}
                >
                  {certificationLabels[cert] || cert}
                </span>
              ))}
              {certifications.length > 3 && (
                <span className="px-1.5 sm:px-2 py-1 text-[10px] sm:text-xs font-semibold rounded-md border bg-gray-100 text-gray-700 border-gray-200">
                  +{certifications.length - 3}
                </span>
              )}
            </div>
          )}
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
