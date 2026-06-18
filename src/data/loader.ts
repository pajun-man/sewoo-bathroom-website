import defaultSeoConfig from './seo-config.json';
import defaultProducts from './products.json';
import defaultInspirations from './inspirations.json';

// 从 localStorage 加载数据，没有的话使用默认数据
export const loadFromStorage = (key: string, defaultValue: any) => {
  try {
    if (typeof window === 'undefined') return defaultValue;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

export const seoConfig = loadFromStorage('seoConfig', defaultSeoConfig);
export const products = loadFromStorage('products', defaultProducts);
export const inspirations = loadFromStorage('inspirations', defaultInspirations);
