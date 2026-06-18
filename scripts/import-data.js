import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'src', 'data');
const exportFile = path.join(__dirname, '..', 'localstorage-export.json');

function updateJSONFile(filePath, newData) {
  if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf-8');
    console.log(`✓ 已更新: ${path.basename(filePath)}`);
  }
}

function importData() {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║        SEWOO 数据同步工具 v2.0             ║');
  console.log('╚════════════════════════════════════════════╝\n');

  if (!fs.existsSync(exportFile)) {
    console.error('❌ 错误: 找不到 localstorage-export.json 文件');
    console.log('\n请按以下步骤操作：');
    console.log('1. 在浏览器中打开网站Admin后台');
    console.log('2. 点击左侧菜单的"数据同步"');
    console.log('3. 确认数据显示正常后，点击"下载数据到文件"');
    console.log('4. 把下载的文件改名为 localstorage-export.json');
    console.log('5. 把文件放到项目根目录（和 package.json 同级）');
    console.log('6. 再次运行: npm run import-data\n');
    process.exit(1);
  }

  const rawData = fs.readFileSync(exportFile, 'utf-8');
  const data = JSON.parse(rawData);
  const keys = Object.keys(data);

  console.log(`✓ 检测到 ${keys.length} 个数据项:\n`);
  keys.forEach(key => {
    const value = data[key];
    let type = typeof value;
    if (Array.isArray(value)) type = 'array';
    const count = type === 'array' ? value.length : (type === 'object' ? Object.keys(value).length : 0);
    const countStr = type === 'string' ? value.slice(0, 30) + (value.length > 30 ? '...' : '') : (count > 0 ? `(${count} 项)` : '');
    console.log(`  • ${key} [${type}] ${countStr}`);
  });
  console.log('\n');

  let updatedCount = 0;

  // 更新 factories.json
  if (data.factories && Array.isArray(data.factories) && data.factories.length > 0) {
    updateJSONFile(path.join(dataDir, 'factories.json'), data.factories);
    updatedCount++;
  }

  // 更新 products.json
  if (data.products && Array.isArray(data.products) && data.products.length > 0) {
    updateJSONFile(path.join(dataDir, 'products.json'), data.products);
    updatedCount++;
  }

  // 更新 inspirations.json
  if (data.inspirations && Array.isArray(data.inspirations) && data.inspirations.length > 0) {
    updateJSONFile(path.join(dataDir, 'inspirations.json'), data.inspirations);
    updatedCount++;
  }

  // 更新 categories.json
  if (data.categories && Array.isArray(data.categories) && data.categories.length > 0) {
    updateJSONFile(path.join(dataDir, 'categories.json'), data.categories);
    updatedCount++;
  }

  // 更新 home-config.json
  if (data.homeConfig) {
    const homeConfig = {
      version: data.homeConfig.version || '2.0.0',
      ...data.homeConfig
    };
    updateJSONFile(path.join(dataDir, 'home-config.json'), homeConfig);
    updatedCount++;
  }

  // 更新 factoryCategories.json
  if (data.factoryCategories && Array.isArray(data.factoryCategories) && data.factoryCategories.length > 0) {
    updateJSONFile(path.join(dataDir, 'factoryCategories.json'), data.factoryCategories);
    updatedCount++;
  }

  // 更新 partners.json
  if (data.partners && Array.isArray(data.partners) && data.partners.length > 0) {
    updateJSONFile(path.join(dataDir, 'partners.json'), { partners: data.partners });
    updatedCount++;
  }

  // 更新 designStyles.json
  if (data.designStyles) {
    updateJSONFile(path.join(dataDir, 'designStyles.json'), data.designStyles);
    updatedCount++;
  }

  // 更新 pages.json
  if (data.pages) {
    updateJSONFile(path.join(dataDir, 'pages.json'), data.pages);
    updatedCount++;
  }

  // 更新 sustainability.json
  if (data.sustainability) {
    updateJSONFile(path.join(dataDir, 'sustainability.json'), data.sustainability);
    updatedCount++;
  }

  // 更新 site-config.json
  const siteConfig = {
    navItems: data.navItems || null,
    siteLogo: data.siteLogo || null,
    siteTitle: data.siteTitle || null,
    contactInfo: data.contactInfo || null,
    footerInfo: data.footerInfo || null,
  };

  if (siteConfig.navItems || siteConfig.siteLogo || siteConfig.siteTitle || siteConfig.contactInfo || siteConfig.footerInfo) {
    updateJSONFile(path.join(dataDir, 'site-config.json'), siteConfig);
    updatedCount++;
  }

  console.log(`\n╔══════════════════════════════════════════════╗`);
  console.log(`║  完成！共更新 ${updatedCount.toString().padEnd(2)} 个配置文件              ║`);
  console.log(`╚══════════════════════════════════════════════╝\n`);
  console.log('下一步操作：');
  console.log('1. 运行 npm run build  构建项目');
  console.log('2. 运行 npm run dev    本地验证');
  console.log('3. 确认内容正确后，提交并推送代码到GitHub');
  console.log('4. Vercel会自动检测新代码并重新部署\n');
}

importData();