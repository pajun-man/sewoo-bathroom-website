export const APP_VERSION = '2.0.0';

const STORAGE_KEYS_TO_CLEAR = [
  'homeConfig',
  'contactInfo',
  'footerInfo',
  'siteLogo',
  'siteTitle',
  'navItems',
];

export const checkAndClearOldCache = (): void => {
  const savedVersion = localStorage.getItem('appVersion');
  
  if (savedVersion !== APP_VERSION) {
    STORAGE_KEYS_TO_CLEAR.forEach(key => {
      localStorage.removeItem(key);
    });
    localStorage.setItem('appVersion', APP_VERSION);
  }
};

export const getAppVersion = (): string => {
  return APP_VERSION;
};