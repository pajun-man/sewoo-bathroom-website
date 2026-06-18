import { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';

const ExportData = () => {
  const [copied, setCopied] = useState(false);

  const exportAllData = () => {
    const data: Record<string, any> = {};
    
    const keysToExport = [
      'homeConfig',
      'products',
      'inspirations',
      'factories',
      'navItems',
      'siteLogo',
      'siteTitle',
      'contactInfo',
      'footerInfo',
      'pages',
      'categories',
      'partners',
      'designStyles',
      'factoryCategories',
      'sustainability',
      'appVersion',
    ];

    keysToExport.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          data[key] = JSON.parse(value);
        } catch {
          data[key] = value;
        }
      }
    });

    return data;
  };

  const handleExport = () => {
    const data = exportAllData();
    const jsonString = JSON.stringify(data, null, 2);
    
    // Create download
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sewoo-localstorage-export-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const data = exportAllData();
    const jsonString = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          导出 localStorage 数据
        </h1>
        <p className="text-gray-600 mb-6">
          点击下方按钮导出本地浏览器中存储的所有配置数据，包括首页Banner、工厂信息、产品数据等。
        </p>
        
        <div className="space-y-4">
          <button
            onClick={handleExport}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            下载 JSON 文件
          </button>
          
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
            {copied ? '已复制到剪贴板' : '复制到剪贴板'}
          </button>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="font-semibold text-gray-700 mb-2">导出的数据包含：</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 首页配置 (homeConfig)</li>
            <li>• 产品数据 (products)</li>
            <li>• 灵感案例 (inspirations)</li>
            <li>• 工厂数据 (factories)</li>
            <li>• 导航菜单 (navItems)</li>
            <li>• 网站Logo和标题 (siteLogo, siteTitle)</li>
            <li>• 联系信息 (contactInfo)</li>
            <li>• Footer配置 (footerInfo)</li>
            <li>• 页面内容 (pages)</li>
            <li>• 产品分类 (categories)</li>
            <li>• 合作伙伴 (partners)</li>
            <li>• 设计风格 (designStyles)</li>
            <li>• 工厂分类 (factoryCategories)</li>
            <li>• 可持续发展数据 (sustainability)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExportData;