import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StoreBanner } from './components/StoreBanner';
import { CategoryNav } from './components/CategoryNav';
import { Hero } from './components/Hero';
import { BrandStrip } from './components/BrandStrip';
import { FeaturedProducts } from './components/FeaturedProducts'; // Replaced Metrics
import { Inventory } from './components/Inventory';
import { QualityBrands } from './components/QualityBrands';
import { Services } from './components/Services';
import { Location } from './components/Location';
import { IndustryUseCases } from './components/IndustryUseCases';
import { News } from './components/News';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';
import { About } from './components/About';
import { Shop } from './components/Shop';
import { Login } from './components/Login';
import { AdminDashboard } from './components/AdminDashboard';
import { UserDashboard } from './components/UserDashboard';
import { NewsPage } from './components/NewsPage';
import { AuthProvider, useAuth } from './components/AuthContext';
import { CartProvider } from './components/CartContext';

// Router Wrapper Component to handle conditional rendering
const MainRouter: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedShopCategory, setSelectedShopCategory] = useState('All');
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: string, category?: string) => {
    setCurrentPage(page);
    if (category) {
      setSelectedShopCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Protect Admin Route
  const renderContent = () => {
    switch(currentPage) {
      case 'home':
        return (
          <>
            <StoreBanner />
            <CategoryNav onNavigate={handleNavigate} />
            <Hero onNavigate={handleNavigate} />
            <BrandStrip />
            <FeaturedProducts onNavigate={handleNavigate} />
            <Inventory />
            <QualityBrands />
            <Services />
            <Location />
            <IndustryUseCases />
            <News onNavigate={handleNavigate} />
            <FinalCTA />
          </>
        );
      case 'products':
        return <Shop initialCategory={selectedShopCategory} />;
      case 'about':
        return <About />;
      case 'news':
        return <NewsPage onNavigate={handleNavigate} />;
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      case 'admin':
        return user && isAdmin ? <AdminDashboard /> : <Login onNavigate={handleNavigate} />;
      case 'user-dashboard':
        return user ? <UserDashboard onNavigate={handleNavigate} /> : <Login onNavigate={handleNavigate} />;
      default:
        return (
          <>
             <StoreBanner />
             <Hero onNavigate={handleNavigate} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-white transition-colors duration-300">
      <Navbar scrolled={scrolled} onNavigate={handleNavigate} currentPage={currentPage} />
      
      <main>
        {renderContent()}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="focus-electrical-theme-v2">
      <AuthProvider>
        <CartProvider>
          <MainRouter />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;