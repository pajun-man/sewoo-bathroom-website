import { Link } from 'react-router-dom';
import { MapPin, User } from 'lucide-react';
import { useI18n } from '../../contexts/I18nContext';

interface InspirationCardProps {
  id: string;
  slug: string;
  style: string;
  title: string;
  titleEn?: string;
  image: string;
  description: string;
  descriptionEn?: string;
  project?: string;
  projectEn?: string;
  location?: string;
  locationEn?: string;
}

const InspirationCard = ({
  id,
  slug,
  style,
  title,
  titleEn,
  image,
  description,
  descriptionEn,
  project,
  projectEn,
  location,
  locationEn,
}: InspirationCardProps) => {
  const { lang } = useI18n();
  
  const styleLabels: Record<string, { zh: string; en: string }> = {
    modern: { zh: '现代风格', en: 'Modern Style' },
    classic: { zh: '经典风格', en: 'Classic Style' },
    minimalist: { zh: '极简风格', en: 'Minimalist Style' },
  };

  return (
    <Link to={`/inspiration/${style}/${slug}`}>
      <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 bg-blue-900 text-white text-xs px-3 py-1 rounded-full">
            {styleLabels[style] ? (lang === 'zh' ? styleLabels[style].zh : styleLabels[style].en) : style}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
            {lang === 'zh' ? title : (titleEn || title)}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {lang === 'zh' ? description : (descriptionEn || description)}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            {project && (
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>{lang === 'zh' ? project : (projectEn || project)}</span>
              </div>
            )}
            {location && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{lang === 'zh' ? location : (locationEn || location)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InspirationCard;
