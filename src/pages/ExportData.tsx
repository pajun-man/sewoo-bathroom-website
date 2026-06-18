import { useState } from 'react';
import { Download, Copy, Check, Database, RefreshCw } from 'lucide-react';

const ExportData = () => {
  const [copied, setCopied] = useState(false);
  const [currentData, setCurrentData] = useState<Record<string, any>>({});

  const getAllStorageKeys = () => {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i) || '');
    }
    return keys;
  };

  const loadCurrentData = () => {
    const data: Record<string, any> = {};
    const keys = getAllStorageKeys();
    
    keys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          data[key] = JSON.parse(value);
        } catch {
          data[key] = value;
        }
      }
    });
    
    setCurrentData(data);
    return data;
  };

  const exportAllData = () => {
    return loadCurrentData();
  };

  const handleExport = () => {
    const data = exportAllData();
    const jsonString = JSON.stringify(data, null, 2);
    
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

  const handleRefresh = () => {
    loadCurrentData();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Database className="w-6 h-6 text-blue-600" />
              导出 localStorage 数据
            </h1>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              刷新数据
            </button>
          </div>
          
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
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">当前 localStorage 数据</h2>
          {Object.keys(currentData).length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Database className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>暂无数据，请点击"刷新数据"按钮加载</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(currentData).map(([key, value]) => (
                <div key={key} className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-800 mb-2">{key}</div>
                  <div className="text-sm text-gray-600">
                    {typeof value === 'string' ? (
                      <span className="truncate">{value}</span>
                    ) : (
                      <pre className="max-h-40 overflow-auto text-xs">{JSON.stringify(value, null, 2)}</pre>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {typeof value === 'object' ? `共 ${Array.isArray(value) ? value.length : Object.keys(value).length} 项` : '字符串'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportData;