import defaultSeoConfig from './seo-config.json';
import defaultProducts from './products.json';
import defaultInspirations from './inspirations.json';
import defaultSiteConfig from './site-config.json';

const styleMapping: Record<string, string> = {
  '现代风格': 'modern',
  '经典风格': 'classic',
  '极简风格': 'minimalist',
};

export const loadFromStorage = (key: string, defaultValue: any) => {
  try {
    if (typeof window === 'undefined') return defaultValue;
    const saved = localStorage.getItem(key);
    if (!saved) return defaultValue;
    
    const savedData = JSON.parse(saved);
    
    if (Array.isArray(defaultValue) && Array.isArray(savedData)) {
      const deletedKey = `deleted${key.charAt(0).toUpperCase() + key.slice(1)}`;
      const deletedIds = JSON.parse(localStorage.getItem(deletedKey) || '[]');
      
      const merged = defaultValue.filter((m: any) => !deletedIds.includes(m.id));
      
      savedData.forEach((item: any) => {
        if (deletedIds.includes(item.id)) return;
        
        const existingIndex = merged.findIndex((m: any) => m.id === item.id);
        if (existingIndex >= 0) {
          const defaultItem = defaultValue.find((d: any) => d.id === item.id) || item;
          const mergedItem = { ...defaultItem };
          
          if (item.images && item.images.length > 0) {
            mergedItem.images = item.images;
          }
          if (item.videos && item.videos.length > 0) {
            mergedItem.videos = item.videos;
          }
          if (item.title) mergedItem.title = item.title;
          if (item.titleEn) mergedItem.titleEn = item.titleEn;
          if (item.description) mergedItem.description = item.description;
          if (item.descriptionEn) mergedItem.descriptionEn = item.descriptionEn;
          if (item.designer) mergedItem.designer = item.designer;
          if (item.location) mergedItem.location = item.location;
          if (item.locationEn) mergedItem.locationEn = item.locationEn;
          if (item.project) mergedItem.project = item.project;
          if (item.projectEn) mergedItem.projectEn = item.projectEn;
          if (item.area) mergedItem.area = item.area;
          if (item.style) {
            mergedItem.style = styleMapping[item.style] || item.style;
          }
          if (item.slug) mergedItem.slug = item.slug;
          if (item.shareUrl) mergedItem.shareUrl = item.shareUrl;
          if (item.downloadUrl) mergedItem.downloadUrl = item.downloadUrl;
          if (item.createdAt) mergedItem.createdAt = item.createdAt;
          if (item.updatedAt) mergedItem.updatedAt = item.updatedAt;
          
          if (defaultItem.nameEn) mergedItem.nameEn = defaultItem.nameEn;
          if (defaultItem.descriptionEn) mergedItem.descriptionEn = defaultItem.descriptionEn;
          if (defaultItem.titleEn) mergedItem.titleEn = defaultItem.titleEn;
          if (defaultItem.featuresEn) mergedItem.featuresEn = defaultItem.featuresEn;
          if (defaultItem.specificationsEn) mergedItem.specificationsEn = defaultItem.specificationsEn;
          if (defaultItem.certificationsEn) mergedItem.certificationsEn = defaultItem.certificationsEn;
          if (defaultItem.seo) {
            mergedItem.seo = { ...defaultItem.seo };
            if (item.seo) {
              mergedItem.seo = { ...mergedItem.seo, ...item.seo };
            }
            if (defaultItem.seo.titleEn) mergedItem.seo.titleEn = defaultItem.seo.titleEn;
            if (defaultItem.seo.descriptionEn) mergedItem.seo.descriptionEn = defaultItem.seo.descriptionEn;
            if (defaultItem.seo.keywordsEn) mergedItem.seo.keywordsEn = defaultItem.seo.keywordsEn;
          }
          
          merged[existingIndex] = mergedItem;
        } else {
          const newItem = { ...item };
          if (newItem.style && styleMapping[newItem.style]) {
            newItem.style = styleMapping[newItem.style];
          }
          merged.push(newItem);
        }
      });
      return merged;
    }
    
    if (typeof defaultValue === 'object' && typeof savedData === 'object') {
      return { ...defaultValue, ...savedData };
    }
    
    return savedData;
  } catch (e) {
    return defaultValue;
  }
};

export const seoConfig = loadFromStorage('seoConfig', defaultSeoConfig);
export const products = loadFromStorage('products', defaultProducts);
export const inspirations = loadFromStorage('inspirations', defaultInspirations);
export const siteConfig = loadFromStorage('siteConfig', defaultSiteConfig);
