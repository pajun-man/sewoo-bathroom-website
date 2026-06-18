import { useState } from 'react';
import { Download, Copy, Check, Database, RefreshCw, Terminal, Upload, ArrowRight, FileJson } from 'lucide-react';

const ExportData = () => {
  const [copied, setCopied] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);
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

  const handleExport = (filename: string = `localstorage-export.json`) => {
    const data = loadCurrentData();
    const jsonString = JSON.stringify(data, null, 2);
    
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const data = loadCurrentData();
    const jsonString = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCommands = () => {
    const commands = `npm run import-data
git add -A
git commit -m "更新内容"
git push origin master:main`;
    navigator.clipboard.writeText(commands);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleRefresh = () => {
    loadCurrentData();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 标题 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Database className="w-6 h-6 text-blue-600" />
              数据导出 & 云端同步
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
            把您在 Admin 后台修改的数据导出到本地文件，然后通过命令行同步到云端网站。
          </p>
        </div>

        {/* 四步流程图 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-green-600" />
            完整同步流程（4 个步骤）
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-2">1</div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">导出数据</h3>
              <p className="text-xs text-gray-600">点击下方 "快速导出" 按钮</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-2">2</div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">放到项目根目录</h3>
              <p className="text-xs text-gray-600">文件应该已经是正确的名称</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-2">3</div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">运行导入脚本</h3>
              <p className="text-xs text-gray-600">在终端运行 npm run import-data</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-2">4</div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">提交 & 推送</h3>
              <p className="text-xs text-gray-600">运行 git 命令提交到 GitHub</p>
            </div>
          </div>

          {/* 快速导出按钮 */}
          <div className="bg-green-50 rounded-lg p-6 border border-green-200 mb-6">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FileJson className="w-5 h-5 text-green-700" />
              步骤 1：导出数据文件
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              点击下方按钮会直接下载一个名为 <code className="bg-white px-1.5 py-0.5 rounded text-xs font-mono">localstorage-export.json</code> 的文件，
              文件名已设置好，您无需重命名。
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleExport('localstorage-export.json')}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md"
              >
                <Download className="w-5 h-5" />
                🚀 快速导出（推荐）
              </button>
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? '已复制到剪贴板' : '复制到剪贴板'}
              </button>
            </div>
          </div>

          {/* 详细步骤 */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-600" />
                步骤 2：把文件放到项目根目录
              </h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>1. 找到刚才下载的 <code className="bg-white px-1.5 py-0.5 rounded text-xs font-mono">localstorage-export.json</code> 文件（在浏览器下载栏）</p>
                <p>2. 把它复制/移动到您的网站项目文件夹根目录（和 <code className="bg-white px-1.5 py-0.5 rounded text-xs font-mono">package.json</code> 同一个文件夹）</p>
                <p className="text-xs text-gray-500 bg-gray-100 p-2 rounded font-mono">
                  项目路径：d:\吴杨的公司\佛山市世优卫浴有限公司--SEWOO--WB Group\我做的网站，仿Jaquar版\
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-blue-600" />
                步骤 3 & 4：运行命令
              </h3>
              <div className="text-sm text-gray-700 space-y-3">
                <p>1. 在项目文件夹空白处<strong>按住 Shift + 右键</strong>，选择 "在此处打开 PowerShell 窗口"</p>
                <p>2. 在弹出的黑色窗口中，依次复制运行以下命令（点击可一键复制所有命令）：</p>
                <div className="relative">
                  <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <div className="text-green-400 mb-1">npm run import-data <span className="text-gray-500 text-xs ml-2"># 导入数据到配置文件</span></div>
                    <div className="text-green-400 mb-1">git add -A <span className="text-gray-500 text-xs ml-2"># 暂存所有修改</span></div>
                    <div className="text-green-400 mb-1">git commit -m "更新内容" <span className="text-gray-500 text-xs ml-2"># 提交修改</span></div>
                    <div className="text-green-400">git push origin master:main <span className="text-gray-500 text-xs ml-2"># 推送到 GitHub</span></div>
                  </div>
                  <button
                    onClick={handleCopyCommands}
                    className="absolute top-2 right-2 flex items-center gap-1 bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    {copiedCmd ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedCmd ? '已复制' : '复制所有命令'}
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 bg-yellow-50 p-3 rounded border border-yellow-200">
                  <span className="text-lg">💡</span>
                  <span>推送成功后，<strong>Vercel 会自动重新部署</strong>。等待 2-5 分钟后，您的网站就会显示最新内容。</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 数据预览 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            当前浏览器中的数据预览
          </h2>
          {Object.keys(currentData).length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Database className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>暂无数据，请点击页面顶部的 "刷新数据" 按钮加载</p>
            </div>
          ) : (
            <div className="space-y-3">
              {Object.entries(currentData).map(([key, value]) => (
                <div key={key} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-gray-800 text-sm">{key}</div>
                    <div className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded">
                      {Array.isArray(value) ? `数组 · ${value.length} 项` : typeof value === 'object' && value !== null ? `对象 · ${Object.keys(value).length} 个属性` : '字符串'}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">
                    <pre className="max-h-24 overflow-auto bg-white p-2 rounded border border-gray-200 text-xs font-mono">{JSON.stringify(value, null, 2)}</pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 底部提示 */}
        <div className="text-center text-sm text-gray-500 pt-4">
          <p>如遇到问题，可以把导出的 JSON 文件发给开发人员协助更新。</p>
        </div>
      </div>
    </div>
  );
};

export default ExportData;