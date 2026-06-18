import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'src', 'data');
const exportFile = path.join(__dirname, '..', 'localstorage-export.json');

function importData() {
  console.log('开始导入 localStorage 数据...\n');

  // Check if export file exists
  if (!fs.existsSync(exportFile)) {
    console.error('错误: 找不到 localstorage-export.json 文件');
    console.log('请先在浏览器中访问 http://localhost:5173/export-data 下载数据');
    process.exit(1);
  }

  // Read export file
  const rawData = fs.readFileSync(exportFile, 'utf-8');
  const data = JSON.parse(rawData);

  console.log('找到以下数据:');
  Object.keys(data).forEach(key => {
    console.log(`  - ${key}`);
  });
  console.log('');

  // Import homeConfig
  if (data.homeConfig) {
    const filePath = path.join(dataDir, 'home-config.json');
    fs.writeFileSync(filePath, JSON.stringify(data.homeConfig, null, 2), 'utf-8');
    console.log('✓ 已更新 home-config.json');
  }

  // Import factories
  if (data.factories) {
    const filePath = path.join(dataDir, 'factories.json');
    fs.writeFileSync(filePath, JSON.stringify(data.factories, null, 2), 'utf-8');
    console.log('✓ 已更新 factories.json');
  }

  // Import products
  if (data.products) {
    const filePath = path.join(dataDir, 'products.json');
    fs.writeFileSync(filePath, JSON.stringify(data.products, null, 2), 'utf-8');
    console.log('✓ 已更新 products.json');
  }

  // Import inspirations
  if (data.inspirations) {
    const filePath = path.join(dataDir, 'inspirations.json');
    fs.writeFileSync(filePath, JSON.stringify(data.inspirations, null, 2), 'utf-8');
    console.log('✓ 已更新 inspirations.json');
  }

  // Import categories
  if (data.categories) {
    const filePath = path.join(dataDir, 'categories.json');
    fs.writeFileSync(filePath, JSON.stringify(data.categories, null, 2), 'utf-8');
    console.log('✓ 已更新 categories.json');
  }

  // Import partners
  if (data.partners) {
    const partnersData = { partners: data.partners };
    const filePath = path.join(dataDir, 'partners.json');
    fs.writeFileSync(filePath, JSON.stringify(partnersData, null, 2), 'utf-8');
    console.log('✓ 已创建 partners.json');
  }

  // Import navItems, siteLogo, siteTitle, contactInfo, footerInfo to site-config.json
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
    const filePath = path.join(dataDir, 'site-config.json');
    fs.writeFileSync(filePath, JSON.stringify(siteConfig, null, 2), 'utf-8');
    console.log('✓ 已创建 site-config.json');
  }

  console.log('\n导入完成！请运行 npm run build 重新构建项目。');
}

importData();