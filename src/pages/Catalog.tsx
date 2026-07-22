import { useState, useEffect } from 'react';
import SEO from '../components/seo/SEO';
import { Download, FileText } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';

interface CatalogItem {
  id: string;
  name: string;
  nameEn: string;
  pdfUrl: string;
  size: string;
}

const defaultCatalogs: CatalogItem[] = [
  {
    id: '1',
    name: '瓷砖石材材料',
    nameEn: 'Tiles and Stone Materials',
    pdfUrl: 'https://catalog.sewoobath.com/1.Tiles-and-Stone-Materials.pdf',
    size: '16.44 MB'
  },
  {
    id: '2',
    name: '门窗',
    nameEn: 'Doors and Windows',
    pdfUrl: 'https://catalog.sewoobath.com/2.Doors-and-windows.pdf',
    size: '29.73 MB'
  },
  {
    id: '3',
    name: '橱柜',
    nameEn: 'Cabinets',
    pdfUrl: 'https://catalog.sewoobath.com/3.Cabinets.pdf',
    size: '26.96 MB'
  },
  {
    id: '4',
    name: '浴室柜',
    nameEn: 'Bathroom Cabinets',
    pdfUrl: 'https://catalog.sewoobath.com/4.Cabinets-Bathroom.pdf',
    size: '34.37 MB'
  },
  {
    id: '6',
    name: '智能马桶',
    nameEn: 'Smart Toilets',
    pdfUrl: 'https://catalog.sewoobath.com/6.Smart-toilets.pdf',
    size: '10.21 MB'
  },
  {
    id: '7',
    name: '陶瓷产品',
    nameEn: 'Ceramics Products',
    pdfUrl: 'https://catalog.sewoobath.com/7.Ceramics-products.pdf',
    size: '28.02 MB'
  },
  {
    id: '8',
    name: '淋浴房',
    nameEn: 'Shower Doors',
    pdfUrl: 'https://catalog.sewoobath.com/8.Shower-door.pdf',
    size: '9.77 MB'
  },
  {
    id: '9',
    name: '花洒套装龙头',
    nameEn: 'Shower Sets and Faucets',
    pdfUrl: 'https://catalog.sewoobath.com/9.Shower-sets-and-faucets.pdf',
    size: '6.81 MB'
  },
  {
    id: '10',
    name: '配件',
    nameEn: 'Accessories',
    pdfUrl: 'https://catalog.sewoobath.com/10.Accessories.pdf',
    size: '24.02 MB'
  },
  {
    id: '11',
    name: '盆',
    nameEn: 'Sinks',
    pdfUrl: 'https://catalog.sewoobath.com/11.Sinks.pdf',
    size: '7.63 MB'
  },
  {
    id: '13',
    name: '公共酒店用品',
    nameEn: 'Public Hotel Supplies',
    pdfUrl: 'https://catalog.sewoobath.com/13.Public-Hotel-supplies.pdf',
    size: '34.04 MB'
  },
  {
    id: '14',
    name: '综合图册',
    nameEn: 'Comprehensive Atlas',
    pdfUrl: 'https://catalog.sewoobath.com/Comprehensive-Atlas.pdf',
    size: '32.66 MB'
  },
  {
    id: '15',
    name: 'CUPC认证',
    nameEn: 'CUPC Certification',
    pdfUrl: 'https://catalog.sewoobath.com/CUPC.pdf',
    size: '37.57 MB'
  },
  {
    id: 'cat-1784640854587',
    name: '浴缸桑拿房-1',
    nameEn: 'Bathtubs and Sauna Rooms-1',
    pdfUrl: 'https://catalog.sewoobath.com/5.Bathtubs-sauna-rooms-1.pdf',
    size: '13.32 MB'
  },
  {
    id: 'cat-1784640855026',
    name: '浴缸桑拿房-2',
    nameEn: 'Bathtubs and Sauna Rooms-2',
    pdfUrl: 'https://catalog.sewoobath.com/5.Bathtubs-and-sauna-rooms-2.pdf',
    size: '30.61 MB'
  },
  {
    id: 'cat-1784640855226',
    name: '地毯-1',
    nameEn: 'Carpets-1',
    pdfUrl: 'https://catalog.sewoobath.com/12.Carpets-1.pdf',
    size: '34.12 MB'
  },
  {
    id: 'cat-1784640855630',
    name: '地毯-2',
    nameEn: 'Carpets-2',
    pdfUrl: 'https://catalog.sewoobath.com/12.Carpets-2.pdf',
    size: '29.66 MB'
  },
  {
    id: 'cat-1784640935368',
    name: '地毯-3',
    nameEn: 'Carpets-3',
    pdfUrl: 'https://catalog.sewoobath.com/12.Carpets-3.pdf',
    size: '27.83 MB'
  },
];

interface CatalogConfig {
  title?: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  buttonText?: string;
  buttonTextEn?: string;
}

const defaultCatalogConfig: CatalogConfig = {
  title: '',
  titleEn: '',
  description: '我们的图册，您需要更多的产品可以查看，现在还在持续更新中...',
  descriptionEn: 'You can browse our catalog if you need more products, and it is still being updated continuously...',
  buttonText: '',
  buttonTextEn: '',
};

const Catalog = () => {
  const { lang } = useI18n();
  const [catalogs, setCatalogs] = useState<CatalogItem[]>(defaultCatalogs);
  const [config, setConfig] = useState<CatalogConfig>(defaultCatalogConfig);

  useEffect(() => {
    const savedCatalogs = localStorage.getItem('catalogs');
    if (savedCatalogs) {
      try {
        const parsed = JSON.parse(savedCatalogs);
        if (Array.isArray(parsed)) {
          setCatalogs(parsed);
        }
      } catch {
        setCatalogs(defaultCatalogs);
      }
    }

    const savedConfig = localStorage.getItem('catalogConfig');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setConfig({ ...defaultCatalogConfig, ...parsed });
      } catch {
        setConfig(defaultCatalogConfig);
      }
    }
  }, []);

  return (
    <>
      <SEO
        title={lang === 'zh' ? '产品图册下载 - SEWOO 高端卫浴' : 'Product Catalog Downloads - SEWOO Premium Bathroom'}
        description={lang === 'zh' ? '下载SEWOO产品图册，了解我们的全系列卫浴产品' : 'Download SEWOO product catalogs to explore our full range of bathroom products'}
        keywords={lang === 'zh' ? ['产品图册', '卫浴产品', 'SEWOO', '下载'] : ['catalog', 'product', 'bathroom', 'SEWOO', 'download']}
      />

      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {lang === 'zh' ? (config.title || '产品图册下载') : (config.titleEn || 'Product Catalog Downloads')}
          </h1>
          <p className="text-lg opacity-90">
            {lang === 'zh' ? (config.description || '浏览并下载我们的产品图册，了解全系列卫浴产品详情') : (config.descriptionEn || 'Browse and download our product catalogs')}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-4">
          {catalogs.map((catalog) => (
            <div
              key={catalog.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {lang === 'zh' ? catalog.name : catalog.nameEn}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {lang === 'zh' ? `文件大小：${catalog.size}` : `${catalog.size}`}
                    </p>
                  </div>
                </div>
                <a
                  href={catalog.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
                >
                  <Download className="w-5 h-5" />
                  <span>{lang === 'zh' ? (config.buttonText || '下载图册') : (config.buttonTextEn || 'Download Catalog')}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            {lang === 'zh' ? '所有图册均为PDF格式，建议使用Adobe Reader或其他PDF阅读器打开' : 'All catalogs are in PDF format'}
          </p>
        </div>
      </div>
    </>
  );
};

export default Catalog;