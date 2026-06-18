import { useEffect } from 'react';

const ResetPage = () => {
  useEffect(() => {
    const confirmReset = window.confirm('确定要重置所有数据吗？这将清除所有自定义内容并恢复到默认状态。');
    if (confirmReset) {
      localStorage.clear();
      alert('数据已重置！正在返回首页...');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } else {
      window.location.href = '/';
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="text-6xl mb-4">🔄</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">正在重置数据...</h1>
        <p className="text-gray-600">请稍候，正在恢复到默认状态...</p>
      </div>
    </div>
  );
};

export default ResetPage;
