import { useState, useEffect } from 'react';
import SEO from '../components/seo/SEO';
import { Eye, Clock, Monitor, Globe, TrendingUp, Users, MapPin, RefreshCw, Trash2 } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';

interface VisitRecord {
  id: string;
  timestamp: string;
  path: string;
  userAgent: string;
  language: string;
  screenWidth: number;
  screenHeight: number;
  referrer: string;
  ip?: string;
  city?: string;
  country?: string;
}

interface VisitStats {
  totalVisits: number;
  uniqueVisitors: number;
  pageViews: Record<string, number>;
  dailyVisits: Record<string, number>;
  browserStats: Record<string, number>;
  deviceStats: Record<string, number>;
}

const Analytics = () => {
  const { lang } = useI18n();
  const [visits, setVisits] = useState<VisitRecord[]>([]);
  const [stats, setStats] = useState<VisitStats>({
    totalVisits: 0,
    uniqueVisitors: 0,
    pageViews: {},
    dailyVisits: {},
    browserStats: {},
    deviceStats: {},
  });
  const [loading, setLoading] = useState(false);

  // 加载访问记录
  useEffect(() => {
    loadVisits();
  }, []);

  const loadVisits = () => {
    try {
      const savedVisits = localStorage.getItem('visitRecords');
      if (savedVisits) {
        const records: VisitRecord[] = JSON.parse(savedVisits);
        setVisits(records);
        calculateStats(records);
      }
    } catch (error) {
      console.error('Failed to load visit records:', error);
    }
  };

  // 计算统计数据
  const calculateStats = (records: VisitRecord[]) => {
    const pageViews: Record<string, number> = {};
    const dailyVisits: Record<string, number> = {};
    const browserStats: Record<string, number> = {};
    const deviceStats: Record<string, number> = {};
    const uniqueDays: Set<string> = new Set();

    records.forEach((record) => {
      // 页面访问统计
      pageViews[record.path] = (pageViews[record.path] || 0) + 1;

      // 每日访问统计
      const date = new Date(record.timestamp).toLocaleDateString('zh-CN');
      dailyVisits[date] = (dailyVisits[date] || 0) + 1;
      uniqueDays.add(date);

      // 浏览器统计
      const browser = getBrowserName(record.userAgent);
      browserStats[browser] = (browserStats[browser] || 0) + 1;

      // 设备统计
      const device = getDeviceType(record.screenWidth);
      deviceStats[device] = (deviceStats[device] || 0) + 1;
    });

    setStats({
      totalVisits: records.length,
      uniqueVisitors: uniqueDays.size * 2, // 估算（简单算法）
      pageViews,
      dailyVisits,
      browserStats,
      deviceStats,
    });
  };

  // 获取浏览器名称
  const getBrowserName = (userAgent: string): string => {
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome';
    if (userAgent.includes('Edg')) return 'Edge';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
    if (userAgent.includes('Opera') || userAgent.includes('OPR')) return 'Opera';
    return '其他';
  };

  // 获取设备类型
  const getDeviceType = (width: number): string => {
    if (width < 768) return '手机';
    if (width < 1024) return '平板';
    return '电脑';
  };

  // 清除所有记录
  const clearRecords = () => {
    if (confirm(lang === 'zh' ? '确定要清除所有访问记录吗？' : 'Are you sure to clear all visit records?')) {
      localStorage.removeItem('visitRecords');
      setVisits([]);
      setStats({
        totalVisits: 0,
        uniqueVisitors: 0,
        pageViews: {},
        dailyVisits: {},
        browserStats: {},
        deviceStats: {},
      });
    }
  };

  // 导出数据
  const exportData = () => {
    const data = {
      visits,
      stats,
      exportTime: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-export-${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEO
        title={lang === 'zh' ? '访问统计 - SEWOO' : 'Analytics - SEWOO'}
        description={lang === 'zh' ? '网站访问数据统计与分析' : 'Website visit statistics and analysis'}
        keywords={lang === 'zh' ? ['访问统计', '数据分析', '流量统计'] : ['analytics', 'statistics', 'traffic']}
      />

      <div className="min-h-screen bg-gray-100">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Eye className="w-8 h-8" />
              {lang === 'zh' ? '网站访问统计' : 'Website Analytics'}
            </h1>
            <p className="mt-2 opacity-80">
              {lang === 'zh' ? '查看网站访问数据和用户行为分析' : 'View website visit data and user behavior analysis'}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{lang === 'zh' ? '总访问量' : 'Total Visits'}</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.totalVisits}</p>
                </div>
                <Eye className="w-12 h-12 text-blue-200" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{lang === 'zh' ? '预估访客' : 'Est. Visitors'}</p>
                  <p className="text-3xl font-bold text-green-600">{stats.uniqueVisitors}</p>
                </div>
                <Users className="w-12 h-12 text-green-200" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{lang === 'zh' ? '页面数' : 'Pages'}</p>
                  <p className="text-3xl font-bold text-purple-600">{Object.keys(stats.pageViews).length}</p>
                </div>
                <Globe className="w-12 h-12 text-purple-200" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{lang === 'zh' ? '今日访问' : 'Today'}</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {stats.dailyVisits[new Date().toLocaleDateString('zh-CN')] || 0}
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-orange-200" />
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={loadVisits}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              {lang === 'zh' ? '刷新数据' : 'Refresh'}
            </button>
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Globe className="w-4 h-4" />
              {lang === 'zh' ? '导出数据' : 'Export'}
            </button>
            <button
              onClick={clearRecords}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              {lang === 'zh' ? '清除记录' : 'Clear'}
            </button>
          </div>

          {/* 详细统计 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* 页面访问排行 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                {lang === 'zh' ? '页面访问排行' : 'Top Pages'}
              </h2>
              <div className="space-y-3">
                {Object.entries(stats.pageViews)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 10)
                  .map(([path, count]) => (
                    <div key={path} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700 truncate">{path}</span>
                      <span className="text-blue-600 font-semibold">{count} {lang === 'zh' ? '次' : 'visits'}</span>
                    </div>
                  ))}
                {Object.keys(stats.pageViews).length === 0 && (
                  <p className="text-gray-500 text-center py-4">{lang === 'zh' ? '暂无数据' : 'No data'}</p>
                )}
              </div>
            </div>

            {/* 每日访问统计 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                {lang === 'zh' ? '每日访问统计' : 'Daily Visits'}
              </h2>
              <div className="space-y-3">
                {Object.entries(stats.dailyVisits)
                  .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
                  .slice(0, 7)
                  .map(([date, count]) => (
                    <div key={date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{date}</span>
                      <span className="text-green-600 font-semibold">{count} {lang === 'zh' ? '次' : 'visits'}</span>
                    </div>
                  ))}
                {Object.keys(stats.dailyVisits).length === 0 && (
                  <p className="text-gray-500 text-center py-4">{lang === 'zh' ? '暂无数据' : 'No data'}</p>
                )}
              </div>
            </div>

            {/* 浏览器统计 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-purple-600" />
                {lang === 'zh' ? '浏览器统计' : 'Browser Stats'}
              </h2>
              <div className="space-y-3">
                {Object.entries(stats.browserStats)
                  .sort((a, b) => b[1] - a[1])
                  .map(([browser, count]) => (
                    <div key={browser} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{browser}</span>
                      <span className="text-purple-600 font-semibold">{count} {lang === 'zh' ? '次' : 'visits'}</span>
                    </div>
                  ))}
                {Object.keys(stats.browserStats).length === 0 && (
                  <p className="text-gray-500 text-center py-4">{lang === 'zh' ? '暂无数据' : 'No data'}</p>
                )}
              </div>
            </div>

            {/* 设备统计 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-orange-600" />
                {lang === 'zh' ? '设备类型统计' : 'Device Stats'}
              </h2>
              <div className="space-y-3">
                {Object.entries(stats.deviceStats)
                  .sort((a, b) => b[1] - a[1])
                  .map(([device, count]) => (
                    <div key={device} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{device}</span>
                      <span className="text-orange-600 font-semibold">{count} {lang === 'zh' ? '次' : 'visits'}</span>
                    </div>
                  ))}
                {Object.keys(stats.deviceStats).length === 0 && (
                  <p className="text-gray-500 text-center py-4">{lang === 'zh' ? '暂无数据' : 'No data'}</p>
                )}
              </div>
            </div>
          </div>

          {/* 最近访问记录 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              {lang === 'zh' ? '最近访问记录' : 'Recent Visits'}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{lang === 'zh' ? '时间' : 'Time'}</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{lang === 'zh' ? '页面' : 'Page'}</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{lang === 'zh' ? '浏览器' : 'Browser'}</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{lang === 'zh' ? '设备' : 'Device'}</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{lang === 'zh' ? '来源' : 'Source'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {visits.slice(0, 50).map((visit) => (
                    <tr key={visit.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {new Date(visit.timestamp).toLocaleString('zh-CN')}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{visit.path}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{getBrowserName(visit.userAgent)}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{getDeviceType(visit.screenWidth)}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 truncate max-w-xs">
                        {visit.referrer || (lang === 'zh' ? '直接访问' : 'Direct')}
                      </td>
                    </tr>
                  ))}
                  {visits.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                        {lang === 'zh' ? '暂无访问记录' : 'No visit records'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 说明 */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-yellow-800 mb-2">
              {lang === 'zh' ? '⚠️ 关于IP地址获取' : '⚠️ About IP Address'}
            </h3>
            <p className="text-yellow-700">
              {lang === 'zh'
                ? '由于这是纯前端项目，无法直接获取访问者的真实IP地址。当前统计基于浏览器本地存储，只能记录访问次数、时间、页面路径、浏览器类型等信息。'
                : 'Since this is a pure frontend project, we cannot directly get the visitor\'s real IP address. Current statistics are based on browser local storage, only recording visit counts, time, page paths, browser types, etc.'}
            </p>
            <p className="text-yellow-700 mt-2">
              {lang === 'zh'
                ? '如需获取真实IP地址和更详细的访问统计，建议使用：Vercel Analytics（如果您部署在Vercel）、Google Analytics、百度统计等第三方服务。'
                : 'To get real IP addresses and more detailed statistics, we recommend using: Vercel Analytics (if deployed on Vercel), Google Analytics, Baidu Analytics, etc.'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;