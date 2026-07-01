import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

const specKeyMap = {
  '类型': 'Type',
  '冲水方式': 'Flushing System',
  '尺寸': 'Dimensions',
  'S-trap坑距': 'S-trap Rough-in',
  'P-trap坑距': 'P-trap Rough-in',
  '马桶盖': 'Seat Cover',
  '材质': 'Material',
  '保修': 'Warranty',
  '妇洗功能': 'Bidet Function',
  'C1阀': 'C1 Valve',
  'C2阀': 'C2 Valve',
  '外观': 'Appearance',
  '工艺': 'Process',
  '坑距': 'Rough-in',
  '用水量': 'Water Consumption',
  '承重': 'Weight Capacity',
  '边框材质': 'Frame Material',
  '表面处理': 'Surface Finish',
  '玻璃厚度': 'Glass Thickness',
  '玻璃类型': 'Glass Type',
  '配件材质': 'Fitting Material',
  '配件颜色': 'Fitting Color',
  '高度范围': 'Height Range',
  '宽度范围': 'Width Range',
  '可定制': 'Customizable',
  '座高': 'Seat Height',
  '额定电压': 'Rated Voltage',
  '额定功率': 'Rated Power',
  '防水等级': 'Waterproof Rating',
  '安装方式': 'Installation Type',
};

const specValueMap = {
  '连体马桶（一件式）': 'One-Piece Toilet',
  '连体马桶（妇洗器款）': 'One-Piece Toilet (Bidet)',
  '连体马桶（妇洗器带阀款）': 'One-Piece Toilet (Bidet with Valve)',
  '连体马桶（无圈孔）': 'One-Piece Toilet (Rimless)',
  '连体马桶（大理石纹）': 'One-Piece Toilet (Marble Design)',
  '壁挂马桶': 'Wall-hung Toilet',
  '壁挂马桶（妇洗器款）': 'Wall-hung Toilet (Bidet)',
  '壁挂马桶（妇洗器带阀款）': 'Wall-hung Toilet (Bidet with Valve)',
  '落地式马桶': 'Floor-standing Toilet',
  '分体马桶（无圈孔）': 'Two-Piece Toilet (Rimless)',
  'Washdown 喷射式': 'Washdown',
  'Washdown Tornado 喷射虹吸': 'Washdown Tornado',
  'Washdown Rimless 喷射无圈孔': 'Washdown Rimless',
  '无阀款': 'Without Valve',
  '带阀款': 'With Valve',
  '冷热水分开阀（可选）': 'Cold/Hot Water Separate Valve (Optional)',
  '混水阀（可选）': 'Mixer Valve (Optional)',
  'UF软盖': 'UF Soft Close Seat',
  'PP软盖': 'PP Soft Close Seat',
  '优质陶瓷': 'Premium Ceramic',
  '5年': '5 Years',
  'Marble design 大理石纹': 'Marble Design',
  '高温烧制不褪色': 'High-temperature Fired, Fade-resistant',
  '是': 'Yes',
  '虹吸式': 'Siphonic',
  '入墙式': 'Wall-mounted',
  '壁挂式': 'Wall-mounted',
  '落地式': 'Floor-mounted',
  '400kg': '400kg',
  '优质陶瓷+ABS': 'Premium Ceramic + ABS',
  '304不锈钢': '304 Stainless Steel',
  '哑光银': 'Matte Silver',
  '亮银色': 'Bright Silver',
  '哑光黑': 'Matte Black',
  '透明钢化玻璃': 'Clear Tempered Glass',
  '304不锈钢/铝合金': '304 Stainless Steel / Aluminum Alloy',
  '隐藏式水箱设计': 'Concealed cistern design',
  '隐藏水箱': 'Concealed cistern',
};

const featuresMap = {
  '喷射虹吸高效冲水': 'Washdown tornado efficient flushing',
  '多种坑距可选': 'Multiple rough-in options',
  'UF软盖舒适耐用': 'UF soft close seat, comfortable and durable',
  '节水环保': 'Water-saving and eco-friendly',
  '易清洁釉面': 'Easy-to-clean glaze',
  '无阀妇洗设计': 'Valve-free bidet design',
  '安装简便': 'Easy installation',
  '带阀妇洗设计': 'Bidet with valve design',
  '冷热水分开阀可选': 'Cold/hot water separate valve optional',
  '混水阀可选': 'Mixer valve optional',
  '无圈孔易清洁设计': 'Rimless easy-to-clean design',
  '卫生无死角': 'Hygienic with no dead corners',
  '流线型外观': 'Streamlined appearance',
  'PP软盖配置': 'PP soft close seat included',
  '现代简约风格': 'Modern minimalist style',
  '方形简约外观': 'Square minimalist appearance',
  'UF软盖配置': 'UF soft close seat included',
  '稳重大气': 'Stable and elegant',
  '紧凑节省空间': 'Compact and space-saving',
  '适合小户型': 'Suitable for small bathrooms',
  '大理石纹独特设计': 'Unique marble design',
  '高温烧制不褪色': 'High-temperature fired, fade-resistant',
  '彰显品味': 'Reflects refined taste',
  '紧凑时尚': 'Compact and stylish',
  '经典款式大气': 'Classic and elegant style',
  '虹吸静音冲水': 'Siphonic quiet flushing',
  '釉面自洁': 'Self-cleaning glaze',
  '易安装': 'Easy to install',
  '隐藏式水箱': 'Hidden cistern',
  '节省空间': 'Space-saving',
  '清洁方便': 'Easy to clean',
  '现代设计': 'Modern design',
  '壁挂节省空间': 'Wall-mounted saves space',
  '圆润造型': 'Rounded design',
  '独特造型设计': 'Unique styling design',
  '宽大舒适': 'Wide and comfortable',
  '高端体验': 'Premium experience',
  '清洁卫生': 'Clean and hygienic',
  '落地安装稳固': 'Floor-mounted, stable',
  '简约现代': 'Minimalist and modern',
  '经典造型': 'Classic design',
  '经典款式': 'Classic style',
  '分体安装维护方便': 'Two-piece installation, easy maintenance',
  '圆润造型舒适': 'Rounded design, comfortable',
  '时尚优雅': 'Stylish and elegant',
};

function translateSpecs(specs) {
  const result = {};
  for (const [key, value] of Object.entries(specs)) {
    const enKey = specKeyMap[key] || key;
    const enValue = specValueMap[value] || value;
    result[enKey] = enValue;
  }
  return result;
}

function translateFeatures(features) {
  return features.map(f => featuresMap[f] || f);
}

let updatedCount = 0;

products.forEach(p => {
  const needsUpdate =
    (p.specifications && !p.specificationsEn) ||
    (p.features && !p.featuresEn) ||
    (p.certifications && !p.certificationsEn);

  if (needsUpdate) {
    if (p.specifications && !p.specificationsEn) {
      p.specificationsEn = translateSpecs(p.specifications);
    }
    if (p.features && !p.featuresEn) {
      p.featuresEn = translateFeatures(p.features);
    }
    if (p.certifications && !p.certificationsEn) {
      p.certificationsEn = [...p.certifications];
    }
    updatedCount++;
  }
});

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf-8');
console.log(`✓ 已为 ${updatedCount} 款产品补上英文参数、特点和认证`);
