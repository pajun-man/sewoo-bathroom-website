import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'src', 'data');
const projectRoot = path.join(__dirname, '..');

// 支持多种文件名格式，自动寻找第一个匹配的 JSON
function findExportFile() {
  const candidates = [
    path.join(projectRoot, 'localstorage-export.json'),
    path.join(projectRoot, 'sewoo-localstorage-export.json'),
    path.join(projectRoot, 'sewoo-data-export.json'),
  ];
  // 额外搜索根目录下任意包含 "localstorage" 或 "export" 的 JSON 文件名
  try {
    const files = fs.readdirSync(projectRoot);
    files.forEach(file => {
      if (file.endsWith('.json') && (file.includes('localstorage') || file.includes('export') || file.includes('data'))) {
        const fullPath = path.join(projectRoot, file);
        if (!candidates.includes(fullPath)) candidates.push(fullPath);
      }
    });
  } catch (e) {
    // ignore
  }
  for (const f of candidates) {
    if (fs.existsSync(f)) return f;
  }
  return null;
}

const exportFile = findExportFile();

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

  if (!exportFile || !fs.existsSync(exportFile)) {
    console.error('❌ 错误: 找不到数据导出文件');
    console.log('\n请按以下步骤操作：');
    console.log('1. 在浏览器中打开 http://localhost:5173/export-data');
    console.log('2. 点击 "🚀 快速导出（推荐）" 按钮（文件会自动命名好）');
    console.log('   或在 Admin 后台 → 数据同步 → 点击"下载数据到文件"');
    console.log('3. 把下载的 JSON 文件（无需改名）放到项目根目录');
    console.log('   （和 package.json 同一个文件夹）');
    console.log('4. 再次运行: npm run import-data\n');
    console.log('支持的文件名示例：localstorage-export.json, sewoo-localstorage-export-2025-xx-xx.json\n');
    process.exit(1);
  }

  console.log(`✓ 找到文件: ${path.basename(exportFile)}\n`);

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