import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Category from "./pages/Category";
import Subcategory from "./pages/Subcategory";
import ProductDetail from "./pages/ProductDetail";
import Inspiration from "./pages/Inspiration";
import InspirationDetail from "./pages/InspirationDetail";
import FactoryPage from "./pages/FactoryPage";
import FactoryDetail from "./pages/FactoryDetail";
import ResetPage from "./pages/ResetPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dealers from "./pages/Dealers";
import Admin from "./pages/Admin";
import ExportData from "./pages/ExportData";
import Analytics from "./pages/Analytics";
import { I18nProvider } from "./contexts/I18nContext";

// 访问记录组件
function VisitTracker() {
  const location = useLocation();

  useEffect(() => {
    // 不记录管理页面和统计页面
    if (location.pathname.startsWith('/admin') || 
        location.pathname.startsWith('/analytics') ||
        location.pathname.startsWith('/export-data') ||
        location.pathname.startsWith('/reset')) {
      return;
    }

    try {
      const savedVisits = localStorage.getItem('visitRecords');
      const visits = savedVisits ? JSON.parse(savedVisits) : [];

      const newVisit = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        path: location.pathname,
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        referrer: document.referrer || '',
      };

      // 只保留最近1000条记录
      const updatedVisits = [newVisit, ...visits].slice(0, 1000);
      localStorage.setItem('visitRecords', JSON.stringify(updatedVisits));
    } catch (error) {
      console.error('Failed to record visit:', error);
    }
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <I18nProvider>
      <HelmetProvider>
        <Router>
          <VisitTracker />
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/products" element={<Layout><Products /></Layout>} />
            <Route path="/products/category/:category" element={<Layout><Category /></Layout>} />
            <Route path="/products/subcategory/:subcategory" element={<Layout><Subcategory /></Layout>} />
            <Route path="/products/:category/:slug" element={<Layout><ProductDetail /></Layout>} />
            <Route path="/inspiration" element={<Layout><Inspiration /></Layout>} />
            <Route path="/inspiration/:style/:slug" element={<Layout><InspirationDetail /></Layout>} />
            <Route path="/factory" element={<Layout><FactoryPage /></Layout>} />
            <Route path="/factory/:id" element={<Layout><FactoryDetail /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/dealers" element={<Layout><Dealers /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/export-data" element={<ExportData />} />
            <Route path="/reset" element={<ResetPage />} />
          </Routes>
          <VercelAnalytics />
        </Router>
      </HelmetProvider>
    </I18nProvider>
  );
}

export default App;
