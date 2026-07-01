import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

const maxId = products.reduce((max, p) => {
  const idNum = parseInt(p.id);
  return idNum > max ? idNum : max;
}, 0);

const defaultImage = 'https://images.unsplash.com/photo-1600612253971-1e7b7d365f0e?w=800';
const defaultImage2 = 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800';

const newProducts = [
  {
    slug: 'sewoo-9310-wall-hung-rimless-toilet',
    category: '马桶',
    subcategory: '壁挂马桶',
    name: 'SEWOO-9310 壁挂式无圈孔马桶',
    nameEn: 'SEWOO-9310 Wall-hung Rimless Toilet',
    description: 'SEWOO 9310壁挂式无圈孔马桶，515x340x370mm尺寸。Washdown Rimless喷射无圈孔冲水，UF软盖配置。挂墙设计节省空间，清洁无死角，现代简约风格。',
    descriptionEn: 'SEWOO 9310 wall-hung rimless toilet, dimensions 515x340x370mm. Washdown rimless flushing system, UF soft close seat. Wall-mounted design saves space, easy to clean, modern minimalist style.',
    images: [defaultImage, defaultImage2],
    specifications: {
      '类型': '壁挂马桶',
      '冲水方式': 'Washdown Rimless 喷射无圈孔',
      '尺寸': '515x340x370mm',
      '马桶盖': 'UF软盖',
      '材质': '优质陶瓷',
      '安装方式': '壁挂式',
      '保修': '5年'
    },
    features: [
      '无圈孔易清洁设计',
      '壁挂节省空间',
      'UF软盖舒适耐用',
      '现代简约风格',
      '节水环保'
    ],
    certifications: ['ISO9001', 'SONCAP', 'CNAS', 'CE'],
  },
  {
    slug: 'sewoo-9311-wall-hung-rimless-toilet',
    category: '马桶',
    subcategory: '壁挂马桶',
    name: 'SEWOO-9311 壁挂式无圈孔马桶',
    nameEn: 'SEWOO-9311 Wall-hung Rimless Toilet',
    description: 'SEWOO 9311壁挂式无圈孔马桶，505x360x360mm尺寸。Washdown Rimless喷射无圈孔冲水，UF软盖配置。圆润造型设计，挂墙安装，简洁大方。',
    descriptionEn: 'SEWOO 9311 wall-hung rimless toilet, dimensions 505x360x360mm. Washdown rimless flushing system, UF soft close seat. Rounded design, wall-mounted installation, simple and elegant.',
    images: [defaultImage, defaultImage2],
    specifications: {
      '类型': '壁挂马桶',
      '冲水方式': 'Washdown Rimless 喷射无圈孔',
      '尺寸': '505x360x360mm',
      '马桶盖': 'UF软盖',
      '材质': '优质陶瓷',
      '安装方式': '壁挂式',
      '保修': '5年'
    },
    features: [
      '无圈孔易清洁设计',
      '壁挂节省空间',
      '圆润造型',
      'UF软盖舒适耐用',
      '节水环保'
    ],
    certifications: ['ISO9001', 'SONCAP', 'CNAS', 'CE'],
  },
  {
    slug: 'sewoo-9321-wall-hung-rimless-toilet',
    category: '马桶',
    subcategory: '壁挂马桶',
    name: 'SEWOO-9321 壁挂式无圈孔马桶',
    nameEn: 'SEWOO-9321 Wall-hung Rimless Toilet',
    description: 'SEWOO 9321壁挂式无圈孔马桶，520x350x365mm尺寸。Washdown Rimless喷射无圈孔冲水，UF软盖配置。方形简约设计，挂墙安装，稳重大气。',
    descriptionEn: 'SEWOO 9321 wall-hung rimless toilet, dimensions 520x350x365mm. Washdown rimless flushing system, UF soft close seat. Square minimalist design, wall-mounted, stable and elegant.',
    images: [defaultImage, defaultImage2],
    specifications: {
      '类型': '壁挂马桶',
      '冲水方式': 'Washdown Rimless 喷射无圈孔',
      '尺寸': '520x350x365mm',
      '马桶盖': 'UF软盖',
      '材质': '优质陶瓷',
      '安装方式': '壁挂式',
      '保修': '5年'
    },
    features: [
      '无圈孔易清洁设计',
      '方形简约外观',
      '壁挂节省空间',
      'UF软盖舒适耐用',
      '稳重大气'
    ],
    certifications: ['ISO9001', 'SONCAP', 'CNAS', 'CE'],
  },
  {
    slug: 'sewoo-9322-wall-hung-rimless-toilet',
    category: '马桶',
    subcategory: '壁挂马桶',
    name: 'SEWOO-9322 壁挂式无圈孔马桶',
    nameEn: 'SEWOO-9322 Wall-hung Rimless Toilet',
    description: 'SEWOO 9322壁挂式无圈孔马桶，530x360x365mm尺寸。Washdown Rimless喷射无圈孔冲水，UF软盖配置。流线型设计，挂墙安装，时尚优雅。',
    descriptionEn: 'SEWOO 9322 wall-hung rimless toilet, dimensions 530x360x365mm. Washdown rimless flushing system, UF soft close seat. Streamlined design, wall-mounted, stylish and elegant.',
    images: [defaultImage, defaultImage2],
    specifications: {
      '类型': '壁挂马桶',
      '冲水方式': 'Washdown Rimless 喷射无圈孔',
      '尺寸': '530x360x365mm',
      '马桶盖': 'UF软盖',
      '材质': '优质陶瓷',
      '安装方式': '壁挂式',
      '保修': '5年'
    },
    features: [
      '无圈孔易清洁设计',
      '流线型外观',
      '壁挂节省空间',
      'UF软盖舒适耐用',
      '时尚优雅'
    ],
    certifications: ['ISO9001', 'SONCAP', 'CNAS', 'CE'],
  },
  {
    slug: 'sewoo-9312-wall-hung-rimless-toilet',
    category: '马桶',
    subcategory: '壁挂马桶',
    name: 'SEWOO-9312 壁挂式无圈孔马桶',
    nameEn: 'SEWOO-9312 Wall-hung Rimless Toilet',
    description: 'SEWOO 9312壁挂式无圈孔马桶，530x360x365mm尺寸。Washdown Rimless喷射无圈孔冲水，UF软盖配置。方形流线结合设计，挂墙安装，独特造型。',
    descriptionEn: 'SEWOO 9312 wall-hung rimless toilet, dimensions 530x360x365mm. Washdown rimless flushing system, UF soft close seat. Square and streamline combined design, wall-mounted, unique styling.',
    images: [defaultImage, defaultImage2],
    specifications: {
      '类型': '壁挂马桶',
      '冲水方式': 'Washdown Rimless 喷射无圈孔',
      '尺寸': '530x360x365mm',
      '马桶盖': 'UF软盖',
      '材质': '优质陶瓷',
      '安装方式': '壁挂式',
      '保修': '5年'
    },
    features: [
      '无圈孔易清洁设计',
      '独特造型设计',
      '壁挂节省空间',
      'UF软盖舒适耐用',
      '节水环保'
    ],
    certifications: ['ISO9001', 'SONCAP', 'CNAS', 'CE'],
  },
  {
    slug: 'sewoo-9316-wall-hung-rimless-toilet',
    category: '马桶',
    subcategory: '壁挂马桶',
    name: 'SEWOO-9316 壁挂式无圈孔马桶',
    nameEn: 'SEWOO-9316 Wall-hung Rimless Toilet',
    description: 'SEWOO 9316壁挂式无圈孔马桶，530x380x350mm尺寸。Washdown Rimless喷射无圈孔冲水，UF软盖配置。宽大舒适设计，挂墙安装，适合追求舒适体验的用户。',
    descriptionEn: 'SEWOO 9316 wall-hung rimless toilet, dimensions 530x380x350mm. Washdown rimless flushing system, UF soft close seat. Wide and comfortable design, wall-mounted, suitable for users seeking comfort.',
    images: [defaultImage, defaultImage2],
    specifications: {
      '类型': '壁挂马桶',
      '冲水方式': 'Washdown Rimless 喷射无圈孔',
      '尺寸': '530x380x350mm',
      '马桶盖': 'UF软盖',
      '材质': '优质陶瓷',
      '安装方式': '壁挂式',
      '保修': '5年'
    },
    features: [
      '无圈孔易清洁设计',
      '宽大舒适',
      '壁挂节省空间',
      'UF软盖舒适耐用',
      '高端体验'
    ],
    certifications: ['ISO9001', 'SONCAP', 'CNAS', 'CE'],
  },
  {
    slug: 'sewoo-9322c0-wall-hung-bidet-toilet',
    category: '马桶',
    subcategory: '壁挂马桶',
    name: 'SEWOO-9322C0 壁挂式妇洗器马桶（无阀款）',
    nameEn: 'SEWOO-9322C0 Wall-hung Bidet Toilet (Without Valve)',
    description: 'SEWOO 9322C0壁挂式妇洗器马桶（无阀款），530x360x365mm尺寸。Washdown Rimless喷射无圈孔冲水，UF软盖配置。无阀妇洗设计，挂墙安装，清洁卫生。',
    descriptionEn: 'SEWOO 9322C0 wall-hung bidet toilet without valve, dimensions 530x360x365mm. Washdown rimless flushing system, UF soft close seat. Valve-free bidet design, wall-mounted, clean and hygienic.',
    images: [defaultImage, defaultImage2],
    specifications: {
      '类型': '壁挂马桶（妇洗器款）',
      '妇洗功能': '无阀款',
      '冲水方式': 'Washdown Rimless 喷射无圈孔',
      '尺寸': '530x360x365mm',
      '马桶盖': 'UF软盖',
      '材质': '优质陶瓷',
      '安装方式': '壁挂式',
      '保修': '5年'
    },
    features: [
      '无阀妇洗设计',
      '无圈孔易清洁',
      '壁挂节省空间',
      'UF软盖舒适耐用',
      '清洁卫生'
    ],
    certifications: ['ISO9001', 'SONCAP', 'CNAS', 'CE'],
  },
  {
    slug: 'sewoo-9322c1-wall-hung-bidet-toilet',
    category: '马桶',
    subcategory: '壁挂马桶',
    name: 'SEWOO-9322C1 壁挂式妇洗器马桶（带阀款）',
    nameEn: 'SEWOO-9322C1 Wall-hung Bidet Toilet (With Valve)',
    description: 'SEWOO 9322C1壁挂式妇洗器马桶（带阀款），530x360x365mm尺寸。Washdown Rimless喷射无圈孔冲水，UF软盖配置。C1冷热水分开阀+C2混水阀可选（需另购），挂墙安装，妇洗功能完善。',
    descriptionEn: 'SEWOO 9322C1 wall-hung bidet toilet with valve, dimensions 530x360x365mm. Washdown rimless flushing system, UF soft close seat. Optional C1 cold/hot water valve + C2 mixer valve (sold separately). Wall-mounted with complete bidet function.',
    images: [defaultImage, defaultImage2],
    specifications: {
      '类型': '壁挂马桶（妇洗器带阀款）',
      '妇洗功能': '带阀款',
      'C1阀': '冷热水分开阀（可选）',
      'C2阀': '混水阀（可选）',
      '冲水方式': 'Washdown Rimless 喷射无圈孔',
      '尺寸': '530x360x365mm',
      '马桶盖': 'UF软盖',
      '材质': '优质陶瓷',
      '安装方式': '壁挂式',
      '保修': '5年'
    },
    features: [
      '带阀妇洗设计',
      '冷热水分开阀可选',
      '混水阀可选',
      '无圈孔易清洁',
      '壁挂节省空间'
    ],
    certifications: ['ISO9001', 'SONCAP', 'CNAS', 'CE'],
  },
  {
    slug: 'sewoo-9700-floor-standing-toilet',
    category: '马桶',
    subcategory: '落地式马桶',
    name: 'SEWOO-9700 落地式无圈孔马桶',
    nameEn: 'SEWOO-9700 Floor-standing Rimless Toilet',
    description: 'SEWOO 9700落地式无圈孔马桶，565x360x405mm尺寸。Washdown Rimless喷射无圈孔冲水，P-trap坑距180mm，UF软盖配置。落地安装，隐藏式水箱设计，简约现代。',
    descriptionEn: 'SEWOO 9700 floor-standing rimless toilet, dimensions 565x360x405mm. Washdown rimless flushing system, P-trap 180mm, UF soft close seat. Floor-mounted with concealed cistern design, minimalist and modern.',
    images: [defaultImage, defaultImage2],
    specifications: {
      '类型': '落地式马桶',
      '冲水方式': 'Washdown Rimless 喷射无圈孔',
      '尺寸': '565x360x405mm',
      'P-trap坑距': '180mm',
      '马桶盖': 'UF软盖',
      '材质': '优质陶瓷',
      '安装方式': '落地式',
      '保修': '5年'
    },
    features: [
      '无圈孔易清洁设计',
      '隐藏式水箱设计',
      '落地安装稳固',
      'UF软盖舒适耐用',
      '简约现代'
    ],
    certifications: ['ISO9001', 'SONCAP', 'CNAS', 'CE'],
  },
  {
    slug: 'sewoo-9701-floor-standing-toilet',
    category: '马桶',
    subcategory: '落地式马桶',
    name: 'SEWOO-9701 落地式无圈孔马桶',
    nameEn: 'SEWOO-9701 Floor-standing Rimless Toilet',
    description: 'SEWOO 9701落地式无圈孔马桶，540x370x400mm尺寸。Washdown Rimless喷射无圈孔冲水，P-trap坑距180mm，UF软盖配置。方形设计，落地安装，稳重大气。',
    descriptionEn: 'SEWOO 9701 floor-standing rimless toilet, dimensions 540x370x400mm. Washdown rimless flushing system, P-trap 180mm, UF soft close seat. Square design, floor-mounted, stable and elegant.',
    images: [defaultImage, defaultImage2],
    specifications: {
      '类型': '落地式马桶',
      '冲水方式': 'Washdown Rimless 喷射无圈孔',
      '尺寸': '540x370x400mm',
      'P-trap坑距': '180mm',
      '马桶盖': 'UF软盖',
      '材质': '优质陶瓷',
      '安装方式': '落地式',
      '保修': '5年'
    },
    features: [
      '无圈孔易清洁设计',
      '方形稳重大气',
      '落地安装稳固',
      'UF软盖舒适耐用',
      '隐藏水箱'
    ],
    certifications: ['ISO9001', 'SONCAP', 'CNAS', 'CE'],
  },
  {
    slug: 'sewoo-8006a-one-piece-toilet',
    category: '马桶',
    subcategory: '连体马桶',
    name: 'SEWOO-8006A 喷射虹吸式连体马桶',
    nameEn: 'SEWOO-8006A Washdown One-Piece Toilet',
    description: 'SEWOO 8006A系列喷射式连体马桶，730x380x770mm尺寸。S-trap坑距250mm，P-trap坑距180mm。PP马桶盖配置。经典造型，高效冲水，节水环保。',
    descriptionEn: 'SEWOO 8006A series washdown one-piece toilet, dimensions 730x380x770mm. S-trap: 250mm, P-trap: 180mm. PP seat cover. Classic design, efficient flushing, water-saving and eco-friendly.',
    images: [defaultImage, defaultImage2],
    specifications: {
      '类型': '连体马桶（一件式）',
      '冲水方式': 'Washdown 喷射式',
      '尺寸': '730x380x770mm',
      'S-trap坑距': '250mm',
      'P-trap坑距': '180mm',
      '马桶盖': 'PP软盖',
      '材质': '优质陶瓷',
      '保修': '5年'
    },
    features: [
      '喷射式高效冲水',
      '经典造型',
      'PP软盖配置',
      '节水环保',
      '易清洁釉面'
    ],
    certifications: ['ISO9001', 'SONCAP', 'CNAS', 'CE'],
  },
  {
    slug: 'sewoo-8601-one-piece-rimless-toilet',
    category: '马桶',
    subcategory: '连体马桶',
    name: 'SEWOO-8601 喷射无圈孔连体马桶',
    nameEn: 'SEWOO-8601 Washdown Rimless One-Piece Toilet',
    description: 'SEWOO 8601系列无圈孔连体马桶，695x380x720mm尺寸。S-trap坑距250mm，P-trap坑距180mm。PP马桶盖配置。无圈孔设计，易清洁，卫生无死角。',
    descriptionEn: 'SEWOO 8601 series rimless one-piece toilet, dimensions 695x380x720mm. S-trap: 250mm, P-trap: 180mm. PP seat cover. Rimless design, easy to clean, no hygiene dead corners.',
    images: [defaultImage, defaultImage2],
    specifications: {
      '类型': '连体马桶（无圈孔）',
      '冲水方式': 'Washdown Rimless 喷射无圈孔',
      '尺寸': '695x380x720mm',
      'S-trap坑距': '250mm',
      'P-trap坑距': '180mm',
      '马桶盖': 'PP软盖',
      '材质': '优质陶瓷',
      '保修': '5年'
    },
    features: [
      '无圈孔易清洁设计',
      '卫生无死角',
      'PP软盖配置',
      '节水环保',
      '经典款式'
    ],
    certifications: ['ISO9001', 'SONCAP', 'CNAS', 'CE'],
  },
  {
    slug: 'sewoo-9000-two-piece-toilet',
    category: '马桶',
    subcategory: '分体马桶',
    name: 'SEWOO-9000 喷射无圈孔分体马桶',
    nameEn: 'SEWOO-9000 Washdown Rimless Two-Piece Toilet',
    description: 'SEWOO 9000系列无圈孔分体马桶，650x365x785mm尺寸。S-trap坑距250mm，P-trap坑距180mm。PP马桶盖配置。方形简约设计，分体安装，维护方便。',
    descriptionEn: 'SEWOO 9000 series rimless two-piece toilet, dimensions 650x365x785mm. S-trap: 250mm, P-trap: 180mm. PP seat cover. Square minimalist design, two-piece installation, easy maintenance.',
    images: [defaultImage, defaultImage2],
    specifications: {
      '类型': '分体马桶（无圈孔）',
      '冲水方式': 'Washdown Rimless 喷射无圈孔',
      '尺寸': '650x365x785mm',
      'S-trap坑距': '250mm',
      'P-trap坑距': '180mm',
      '马桶盖': 'PP软盖',
      '材质': '优质陶瓷',
      '保修': '5年'
    },
    features: [
      '无圈孔易清洁设计',
      '方形简约外观',
      '分体安装维护方便',
      'PP软盖配置',
      '节水环保'
    ],
    certifications: ['ISO9001', 'SONCAP', 'CNAS', 'CE'],
  },
  {
    slug: 'sewoo-9001-two-piece-toilet',
    category: '马桶',
    subcategory: '分体马桶',
    name: 'SEWOO-9001 喷射无圈孔分体马桶',
    nameEn: 'SEWOO-9001 Washdown Rimless Two-Piece Toilet',
    description: 'SEWOO 9001系列无圈孔分体马桶，665x370x790mm尺寸。S-trap坑距250mm，P-trap坑距180mm。PP马桶盖配置。流线型设计，分体安装，现代风格。',
    descriptionEn: 'SEWOO 9001 series rimless two-piece toilet, dimensions 665x370x790mm. S-trap: 250mm, P-trap: 180mm. PP seat cover. Streamlined design, two-piece installation, modern style.',
    images: [defaultImage, defaultImage2],
    specifications: {
      '类型': '分体马桶（无圈孔）',
      '冲水方式': 'Washdown Rimless 喷射无圈孔',
      '尺寸': '665x370x790mm',
      'S-trap坑距': '250mm',
      'P-trap坑距': '180mm',
      '马桶盖': 'PP软盖',
      '材质': '优质陶瓷',
      '保修': '5年'
    },
    features: [
      '无圈孔易清洁设计',
      '流线型外观',
      '分体安装维护方便',
      'PP软盖配置',
      '现代风格'
    ],
    certifications: ['ISO9001', 'SONCAP', 'CNAS', 'CE'],
  },
  {
    slug: 'sewoo-9002-two-piece-toilet',
    category: '马桶',
    subcategory: '分体马桶',
    name: 'SEWOO-9002 喷射无圈孔分体马桶',
    nameEn: 'SEWOO-9002 Washdown Rimless Two-Piece Toilet',
    description: 'SEWOO 9002系列无圈孔分体马桶，685x380x790mm尺寸。S-trap坑距250mm，P-trap坑距180mm。PP马桶盖配置。圆润造型，分体安装，舒适大方。',
    descriptionEn: 'SEWOO 9002 series rimless two-piece toilet, dimensions 685x380x790mm. S-trap: 250mm, P-trap: 180mm. PP seat cover. Rounded design, two-piece installation, comfortable and elegant.',
    images: [defaultImage, defaultImage2],
    specifications: {
      '类型': '分体马桶（无圈孔）',
      '冲水方式': 'Washdown Rimless 喷射无圈孔',
      '尺寸': '685x380x790mm',
      'S-trap坑距': '250mm',
      'P-trap坑距': '180mm',
      '马桶盖': 'PP软盖',
      '材质': '优质陶瓷',
      '保修': '5年'
    },
    features: [
      '无圈孔易清洁设计',
      '圆润造型舒适',
      '分体安装维护方便',
      'PP软盖配置',
      '节水环保'
    ],
    certifications: ['ISO9001', 'SONCAP', 'CNAS', 'CE'],
  },
];

let currentId = maxId;
const productsToAdd = newProducts.map(p => {
  currentId++;
  return {
    id: String(currentId),
    ...p,
    seo: {
      title: `${p.name} - SEWOO 高端卫浴`,
      titleEn: `${p.nameEn} - SEWOO Premium Bath`,
      description: p.description,
      descriptionEn: p.descriptionEn,
      keywords: [p.name.split(' ')[0], p.subcategory, p.category, 'SEWOO'],
      keywordsEn: [p.nameEn.split(' ')[0], p.subcategory, p.category, 'SEWOO'],
    },
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    documents: {
      manual: '',
      technicalData: '',
      imagesDownload: '',
      quote: '',
      appointment: '',
    },
  };
});

const updatedProducts = [...products, ...productsToAdd];
fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2), 'utf-8');
console.log(`✓ 已添加 ${productsToAdd.length} 款新产品，当前产品总数: ${updatedProducts.length}`);
