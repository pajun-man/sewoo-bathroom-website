import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'zh' | 'en';

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (text: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
  '首页': { zh: '首页', en: 'Home' },
  '产品中心': { zh: '产品中心', en: 'Products' },
  '灵感画廊': { zh: '灵感画廊', en: 'Inspiration' },
  '工厂介绍': { zh: '工厂介绍', en: 'Factory' },
  '关于我们': { zh: '关于我们', en: 'About' },
  '可持续发展': { zh: '可持续发展', en: 'Sustainability' },
  '联系我们': { zh: '联系我们', en: 'Contact' },
  '中文': { zh: '中文', en: 'Chinese' },
  'English': { zh: 'English', en: 'English' },
  '探索产品': { zh: '探索产品', en: 'Explore Products' },
  '了解我们': { zh: '了解我们', en: 'About Us' },
  '高端卫浴领导者': { zh: '高端卫浴领导者', en: 'Premium Bathroom Leader' },
  '匠心铸造': { zh: '匠心铸造', en: 'Craftsmanship Excellence' },
  '品质卫浴': { zh: '品质卫浴', en: 'Premium Bathroom' },
  '国家信赖之选': { zh: '国家信赖之选', en: 'Trusted by Nations' },
  '年行业经验': { zh: '年行业经验', en: 'Years Experience' },
  '专利技术': { zh: '专利技术', en: 'Patents' },
  '合作经销商': { zh: '合作经销商', en: 'Dealers' },
  '核心技术': { zh: '核心技术', en: 'Core Technology' },
  '创新技术，品质为先': { zh: '创新技术，品质为先', en: 'Innovative Technology, Quality First' },
  '节水技术': { zh: '节水技术', en: 'Water Saving' },
  '智能控制': { zh: '智能控制', en: 'Smart Control' },
  '高级饰面': { zh: '高级饰面', en: 'Premium Finish' },
  '可持续制造': { zh: '可持续制造', en: 'Sustainable Manufacturing' },
  '精选高端卫浴产品': { zh: '精选高端卫浴产品', en: 'Selected Premium Bathroom Products' },
  '品质保证': { zh: '品质保证', en: 'Quality Assurance' },
  '创新设计': { zh: '创新设计', en: 'Innovative Design' },
  '节能环保': { zh: '节能环保', en: 'Energy Saving' },
  '售后无忧': { zh: '售后无忧', en: 'After Sales Support' },
  '浏览全部产品': { zh: '浏览全部产品', en: 'View All Products' },
  '查看全部产品': { zh: '查看全部产品', en: 'View All Products' },
  '项目案例': { zh: '项目案例', en: 'Project Cases' },
  '探索我们的成功案例，获取浴室设计灵感': { zh: '探索我们的成功案例，获取浴室设计灵感', en: 'Explore our successful cases for bathroom design inspiration' },
  '查看更多案例': { zh: '查看更多案例', en: 'View More Cases' },
  '合作伙伴': { zh: '合作伙伴', en: 'Partners' },
  '深受知名企业信赖': { zh: '深受知名企业信赖', en: 'Trusted by Renowned Enterprises' },
  '准备好开始您的项目了吗？': { zh: '准备好开始您的项目了吗？', en: 'Ready to start your project?' },
  '联系我们的专业团队，获取定制化卫浴解决方案': { zh: '联系我们的专业团队，获取定制化卫浴解决方案', en: 'Contact our professional team for customized bathroom solutions' },
  '获取报价': { zh: '获取报价', en: 'Get Quote' },
  '查找经销商': { zh: '查找经销商', en: 'Find Dealer' },
  '发送消息': { zh: '发送消息', en: 'Send Message' },
  '联系方式': { zh: '联系方式', en: 'Contact Information' },
  '姓名': { zh: '姓名', en: 'Name' },
  '邮箱': { zh: '邮箱', en: 'Email' },
  '电话': { zh: '电话', en: 'Phone' },
  '咨询主题': { zh: '咨询主题', en: 'Subject' },
  '留言内容': { zh: '留言内容', en: 'Message' },
  '提交留言': { zh: '提交留言', en: 'Submit Message' },
  '公司地址': { zh: '公司地址', en: 'Company Address' },
  '客服热线': { zh: '客服热线', en: 'Customer Service' },
  '电子邮箱': { zh: '电子邮箱', en: 'Email' },
  '工作时间': { zh: '工作时间', en: 'Working Hours' },
  '周一至周五': { zh: '周一至周五', en: 'Monday-Friday' },
  '周六': { zh: '周六', en: 'Saturday' },
  '周日': { zh: '周日', en: 'Sunday' },
  '休息': { zh: '休息', en: 'Closed' },
  '常见问题': { zh: '常见问题', en: 'FAQ' },
  '查看 FAQ': { zh: '查看 FAQ', en: 'View FAQ' },
  '品牌故事': { zh: '品牌故事', en: 'Brand Story' },
  '查看全部': { zh: '查看全部', en: 'View All' },
  '产品管理': { zh: '产品管理', en: 'Product Management' },
  '分类管理': { zh: '分类管理', en: 'Category Management' },
  '灵感案例': { zh: '灵感案例', en: 'Inspiration Cases' },
  '页面管理': { zh: '页面管理', en: 'Page Management' },
  '工厂信息': { zh: '工厂信息', en: 'Factory Info' },
  '客户留言': { zh: '客户留言', en: 'Customer Messages' },
  '添加产品': { zh: '添加产品', en: 'Add Product' },
  '产品名称': { zh: '产品名称', en: 'Product Name' },
  '产品英文名称': { zh: '产品英文名称', en: 'Product English Name' },
  '保存': { zh: '保存', en: 'Save' },
  '取消': { zh: '取消', en: 'Cancel' },
  '添加分类': { zh: '添加分类', en: 'Add Category' },
  '分类名称': { zh: '分类名称', en: 'Category Name' },
  '英文名称': { zh: '英文名称', en: 'English Name' },
  '子分类': { zh: '子分类', en: 'Subcategory' },
  '添加子分类...': { zh: '添加子分类...', en: 'Add subcategory...' },
  '添加案例': { zh: '添加案例', en: 'Add Case' },
  '案例标题': { zh: '案例标题', en: 'Case Title' },
  '英文标题': { zh: '英文标题', en: 'English Title' },
  '设计师': { zh: '设计师', en: 'Designer' },
  '地点': { zh: '地点', en: 'Location' },
  '面积': { zh: '面积', en: 'Area' },
  '案例图片': { zh: '案例图片', en: 'Case Images' },
  '英文描述': { zh: '英文描述', en: 'English Description' },
  '分享链接': { zh: '分享链接', en: 'Share Link' },
  '下载资料链接': { zh: '下载资料链接', en: 'Download Link' },
  '设计风格管理': { zh: '设计风格管理', en: 'Design Style Management' },
  '中文风格名称...': { zh: '中文风格名称...', en: 'Chinese style name...' },
  '英文风格名称...': { zh: '英文风格名称...', en: 'English style name...' },
  '暂无案例': { zh: '暂无案例', en: 'No cases yet' },
  '该分类暂无产品': { zh: '该分类暂无产品', en: 'No products in this category' },
  '件产品': { zh: '件产品', en: 'products' },
  '页面内容管理': { zh: '页面内容管理', en: 'Page Content Management' },
  '页面标题': { zh: '页面标题', en: 'Page Title' },
  '页面内容': { zh: '页面内容', en: 'Page Content' },
  '主页Banner设置': { zh: '主页Banner设置', en: 'Homepage Banner Settings' },
  '背景图片设置': { zh: '背景图片设置', en: 'Background Image Settings' },
  '图片URL': { zh: '图片URL', en: 'Image URL' },
  '视频设置': { zh: '视频设置', en: 'Video Settings' },
  '启用视频背景': { zh: '启用视频背景', en: 'Enable Video Background' },
  '视频URL': { zh: '视频URL', en: 'Video URL' },
  '支持上传本地视频文件': { zh: '支持上传本地视频文件', en: 'Support local video file upload' },
  '联系信息设置': { zh: '联系信息设置', en: 'Contact Info Settings' },
  '页脚设置': { zh: '页脚设置', en: 'Footer Settings' },
  '页脚标语': { zh: '页脚标语', en: 'Footer Slogan' },
  '导航栏设置': { zh: '导航栏设置', en: 'Navigation Settings' },
  '路径': { zh: '路径', en: 'Path' },
  '标签': { zh: '标签', en: 'Label' },
  '英文标签': { zh: '英文标签', en: 'English Label' },
  '保存导航设置': { zh: '保存导航设置', en: 'Save Navigation Settings' },
  '编辑': { zh: '编辑', en: 'Edit' },
  '删除': { zh: '删除', en: 'Delete' },
  '确定要删除这个产品吗？': { zh: '确定要删除这个产品吗？', en: 'Are you sure you want to delete this product?' },
  '确定要删除这个分类吗？相关产品也会被删除！': { zh: '确定要删除这个分类吗？相关产品也会被删除！', en: 'Are you sure you want to delete this category? Related products will also be deleted!' },
  '确定要删除这个风格吗？': { zh: '确定要删除这个风格吗？', en: 'Are you sure you want to delete this style?' },
  '返回前台': { zh: '返回前台', en: 'Back to Frontend' },
  '欢迎': { zh: '欢迎', en: 'Welcome' },
  '管理员': { zh: '管理员', en: 'Admin' },
  '产品保存成功！': { zh: '产品保存成功！', en: 'Product saved successfully!' },
  '案例保存成功！': { zh: '案例保存成功！', en: 'Case saved successfully!' },
  '页面保存成功！': { zh: '页面保存成功！', en: 'Page saved successfully!' },
  '可持续发展数据保存成功！': { zh: '可持续发展数据保存成功！', en: 'Sustainability data saved successfully!' },
  '联系信息保存成功！': { zh: '联系信息保存成功！', en: 'Contact info saved successfully!' },
  '页脚设置保存成功！': { zh: '页脚设置保存成功！', en: 'Footer settings saved successfully!' },
  '导航设置保存成功！': { zh: '导航设置保存成功！', en: 'Navigation settings saved successfully!' },
  '主页Banner设置保存成功！': { zh: '主页Banner设置保存成功！', en: 'Homepage Banner settings saved successfully!' },
  '分类保存成功！': { zh: '分类保存成功！', en: 'Category saved successfully!' },
  '工厂信息保存成功！': { zh: '工厂信息保存成功！', en: 'Factory info saved successfully!' },
  '确定要删除这个工厂吗？': { zh: '确定要删除这个工厂吗？', en: 'Are you sure you want to delete this factory?' },
  '未读': { zh: '未读', en: 'Unread' },
  '已读': { zh: '已读', en: 'Read' },
  '确定要删除这条留言吗？': { zh: '确定要删除这条留言吗？', en: 'Are you sure you want to delete this message?' },
  '网站管理后台': { zh: '网站管理后台', en: 'Website Admin' },
  '关于SEWOO': { zh: '关于SEWOO', en: 'About SEWOO' },
  '核心价值观': { zh: '核心价值观', en: 'Core Values' },
  '卓越品质': { zh: '卓越品质', en: 'Premium Quality' },
  '创新驱动': { zh: '创新驱动', en: 'Innovation Driven' },
  '用户至上': { zh: '用户至上', en: 'Customer First' },
  '全球视野': { zh: '全球视野', en: 'Global Vision' },
  '抗菌技术': { zh: '抗菌技术', en: 'Antibacterial Technology' },
  '产品分类': { zh: '产品分类', en: 'Product Categories' },
  '淋浴房': { zh: '淋浴房', en: 'Showers' },
  '马桶': { zh: '马桶', en: 'Toilets' },
  '花洒': { zh: '花洒', en: 'Showers' },
  '版权所有': { zh: '版权所有', en: 'All Rights Reserved' },
  '隐私政策': { zh: '隐私政策', en: 'Privacy Policy' },
  '使用条款': { zh: '使用条款', en: 'Terms of Service' },
  '网站地图': { zh: '网站地图', en: 'Site Map' },
  '精选材料，精湛工艺，确保每一件产品都达到最高标准。': { zh: '精选材料，精湛工艺，确保每一件产品都达到最高标准。', en: 'Selected materials, exquisite craftsmanship, ensuring every product meets the highest standards.' },
  '持续研发投入，掌握核心技术，引领行业发展。': { zh: '持续研发投入，掌握核心技术，引领行业发展。', en: 'Continuous R&D investment, mastering core technologies, leading industry development.' },
  '以客户需求为导向，提供全方位解决方案。': { zh: '以客户需求为导向，提供全方位解决方案。', en: 'Customer-oriented, providing comprehensive solutions.' },
  '深耕国际市场，本地化服务，满足多元需求。': { zh: '深耕国际市场，本地化服务，满足多元需求。', en: 'Deeply rooted in international markets, localized services to meet diverse needs.' },
};

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'zh';
  });

  useEffect(() => {
    localStorage.setItem('language', lang);
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    window.location.reload();
  };

  const t = (text: string, fallback?: string): string => {
    return translations[text]?.[lang] || fallback || text;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
