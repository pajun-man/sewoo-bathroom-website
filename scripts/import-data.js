import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'src', 'data');

function readFile(filePath) {
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  }
  return null;
}

function writeFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✓ 已更新 ${path.basename(filePath)}`);
}

function importData() {
  console.log('开始同步数据...\n');

  const exportFile = path.join(__dirname, '..', 'localstorage-export.json');
  
  let data = {};
  
  if (fs.existsSync(exportFile)) {
    const rawData = fs.readFileSync(exportFile, 'utf-8');
    data = JSON.parse(rawData);
    console.log('从 localstorage-export.json 读取数据');
  }

  console.log('找到以下数据:');
  Object.keys(data).forEach(key => {
    console.log(`  - ${key}`);
  });
  console.log('');

  // 更新 home-config.json
  if (data.homeConfig) {
    writeFile(path.join(dataDir, 'home-config.json'), data.homeConfig);
  }

  // 更新 factories.json
  if (data.factories) {
    writeFile(path.join(dataDir, 'factories.json'), data.factories);
  }

  // 更新 products.json
  if (data.products) {
    writeFile(path.join(dataDir, 'products.json'), data.products);
  }

  // 更新 inspirations.json
  if (data.inspirations) {
    writeFile(path.join(dataDir, 'inspirations.json'), data.inspirations);
  }

  // 更新 categories.json
  if (data.categories) {
    writeFile(path.join(dataDir, 'categories.json'), data.categories);
  }

  // 更新 site-config.json
  const siteConfig = {};
  if (data.navItems) siteConfig.navItems = data.navItems;
  if (data.siteLogo) siteConfig.siteLogo = data.siteLogo;
  if (data.siteTitle) siteConfig.siteTitle = data.siteTitle;
  if (data.contactInfo) siteConfig.contactInfo = data.contactInfo;
  if (data.footerInfo) siteConfig.footerInfo = data.footerInfo;
  if (data.designStyles) siteConfig.designStyles = data.designStyles;
  if (data.pages) siteConfig.pages = data.pages;
  if (data.factoryCategories) siteConfig.factoryCategories = data.factoryCategories;
  if (data.sustainability) siteConfig.sustainability = data.sustainability;

  if (Object.keys(siteConfig).length > 0) {
    writeFile(path.join(dataDir, 'site-config.json'), siteConfig);
  }

  console.log('\n同步完成！');
}

importData();