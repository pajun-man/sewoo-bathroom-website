import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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
import { I18nProvider } from "./contexts/I18nContext";

function App() {
  return (
    <I18nProvider>
      <HelmetProvider>
        <Router>
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
            <Route path="/admin" element={<Admin />} />
            <Route path="/reset" element={<ResetPage />} />
          </Routes>
        </Router>
      </HelmetProvider>
    </I18nProvider>
  );
}

export default App;
