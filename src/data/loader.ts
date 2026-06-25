import defaultSeoConfig from './seo-config.json';
import defaultProducts from './products.json';
import defaultInspirations from './inspirations.json';
import defaultSiteConfig from './site-config.json';

// 从 localStorage 加载数据，与默认数据合并（默认数据优先）
export const loadFromStorage = (key: string, defaultValue: any) => {
  try {
    if (typeof window === 'undefined') return defaultValue;
    const saved = localStorage.getItem(key);
    if (!saved) return defaultValue;
    
    const savedData = JSON.parse(saved);
    
    if (Array.isArray(defaultValue) && Array.isArray(savedData)) {
      const merged = [...defaultValue];
      savedData.forEach((item: any) => {
        const existingIndex = merged.findIndex((m: any) => m.id === item.id);
        if (existingIndex >= 0) {
          merged[existingIndex] = item;
        } else {
          merged.push(item);
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
