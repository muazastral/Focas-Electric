import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StoreBanner } from './components/StoreBanner';
import { CategoryNav } from './components/CategoryNav';
import { Hero } from './components/Hero';
import { BrandStrip } from './components/BrandStrip';
import { FeaturedProducts } from './components/FeaturedProducts';
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
import { CartPage } from './components/CartPage';
import { MyOrdersPage } from './components/MyOrdersPage';
import { NewsPage } from './components/NewsPage';
import { CmsPageRenderer } from './components/CmsPageRenderer';
import { InlineEditor } from './components/InlineEditor';
import { AuthProvider, useAuth } from './components/AuthContext';
import { CartProvider } from './components/CartContext';
import { getPublicCmsPageRequest } from './services/api';
import { Pencil } from 'lucide-react';

// ---------- localStorage CMS helpers ----------
const CMS_LOCAL_KEY = 'focus-electrical-cms';

const loadLocalCms = (): Record<string, { sections: any[]; pageId?: string; status?: string }> => {
  try { const raw = localStorage.getItem(CMS_LOCAL_KEY); return raw ? JSON.parse(raw) : {}; } catch { return {}; }
};

const saveLocalCms = (slug: string, sections: any[], pageId?: string, status?: string) => {
  try {
    const existing = loadLocalCms();
    existing[slug] = { sections, pageId, status };
    localStorage.setItem(CMS_LOCAL_KEY, JSON.stringify(existing));
  } catch { /* ignore */ }
};

// Router Wrapper Component to handle conditional rendering
const MainRouter: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedShopCategory, setSelectedShopCategory] = useState('All');
  const [cmsSections, setCmsSections] = useState<Record<string, any[]>>({ home: [], about: [] });
  const [cmsPageIds, setCmsPageIds] = useState<Record<string, string>>({});
  const [inlineEditMode, setInlineEditMode] = useState(false);
  const [editPageMeta, setEditPageMeta] = useState<{ slug: string; title: string; id?: string } | null>(null);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadCmsPages = async () => {
      const nextState: Record<string, any[]> = { home: [], about: [], products: [], news: [] };
      const nextIds: Record<string, string> = {};
      const local = loadLocalCms();

      for (const slug of ['home', 'about', 'products', 'news'] as const) {
        try {
          const page = await getPublicCmsPageRequest(slug);
          if (page.id && page.status === 'published' && Array.isArray(page.sections) && page.sections.length > 0) {
            nextState[slug] = page.sections;
            nextIds[slug] = page.id;
            // Sync localStorage
            saveLocalCms(slug, page.sections, page.id, page.status);
            continue;
          }
        } catch { /* fall through to localStorage */ }

        // Fallback: load from localStorage
        const cached = local[slug];
        if (cached && cached.sections && cached.sections.length > 0 && cached.status === 'published') {
          nextState[slug] = cached.sections;
          if (cached.pageId) nextIds[slug] = cached.pageId;
        }
      }

      setCmsSections(nextState);
      setCmsPageIds(prev => ({ ...prev, ...nextIds }));
    };

    loadCmsPages();
  }, []);

  const handleNavigate = (page: string, category?: string) => {
    setCurrentPage(page);
    if (category) {
      setSelectedShopCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Dynamically load CMS page if not already cached
    if (!cmsSections[page] && !['home', 'about', 'products', 'news', 'login', 'admin', 'user-dashboard', 'cart', 'my-orders'].includes(page)) {
      getPublicCmsPageRequest(page).then(p => {
        if (p.status === 'published' && Array.isArray(p.sections)) {
          setCmsSections(prev => ({ ...prev, [page]: p.sections }));
        }
      }).catch(() => { /* no CMS page for this slug */ });
    }
  };

  // Protect Admin Route
  const renderContent = () => {
    switch(currentPage) {
      case 'home':
        return (
          <>
            <StoreBanner />
            <CategoryNav onNavigate={handleNavigate} />
            {cmsSections.home.length > 0 ? (
              <CmsPageRenderer sections={cmsSections.home} onNavigate={handleNavigate} />
            ) : (
              <>
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
            )}
          </>
        );
      case 'products':
        return (
          <>
            {(cmsSections.products || []).length > 0 && (
              <CmsPageRenderer sections={cmsSections.products} onNavigate={handleNavigate} />
            )}
            <Shop initialCategory={selectedShopCategory} onNavigate={handleNavigate} />
          </>
        );
      case 'about':
        return cmsSections.about.length > 0 ? (
          <CmsPageRenderer sections={cmsSections.about} onNavigate={handleNavigate} />
        ) : (
          <About />
        );
      case 'news':
        return (
          <>
            {(cmsSections.news || []).length > 0 && (
              <CmsPageRenderer sections={cmsSections.news} onNavigate={handleNavigate} />
            )}
            <NewsPage onNavigate={handleNavigate} />
          </>
        );
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      case 'admin':
        return user && isAdmin ? <AdminDashboard /> : <Login onNavigate={handleNavigate} />;
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'my-orders':
        return <MyOrdersPage onNavigate={handleNavigate} />;
      case 'user-dashboard':
        return user ? <UserDashboard onNavigate={handleNavigate} /> : <Login onNavigate={handleNavigate} />;
      default:
        // Dynamic CMS page rendering for any custom slug
        if (cmsSections[currentPage] && cmsSections[currentPage].length > 0) {
          return <CmsPageRenderer sections={cmsSections[currentPage]} onNavigate={handleNavigate} />;
        }
        return (
          <>
             <StoreBanner />
             <Hero onNavigate={handleNavigate} />
          </>
        );
    }
  };

  // Title mapping for pages
  const pageTitleMap: Record<string, string> = {
    home: 'Home',
    about: 'About Us',
    products: 'Products',
    news: 'News',
  };

  // Default sections that mirror the hardcoded page components
  const getDefaultSectionsForPage = (slug: string): any[] => {
    const mkStyle = (bg = '#ffffff', text = '#0f172a', padding = 'py-16') => ({
      backgroundColor: bg, textColor: text, fontFamily: 'Inter', height: 'h-auto', textAlign: 'center' as const, padding,
    });

    if (slug === 'home') {
      return [
        {
          id: 'def-store', type: 'text-image', name: 'Store Banner',
          content: { title: 'Store.', subtitle: 'The best way to buy electrical supplies for your project.', image: 'ChatGPT Image Jan 21, 2026, 10_37_10 AM.png', buttonText: 'Connect with a Specialist' },
          style: mkStyle('#ffffff', '#0f172a', 'py-20'),
        },
        {
          id: 'def-hero', type: 'hero', name: 'Main Hero',
          content: { title: 'Powering Homes, Projects & Industries Across Malaysia', subtitle: 'Your trusted electrical & electronic supplier — delivering quality brands, competitive pricing, and reliable stock for homes, contractors, and businesses.', buttonText: 'Browse Products', image: '/pdf-catalog/page-001/img-001.png' },
          style: mkStyle('#f8fafc', '#0f172a', 'py-20'),
        },
        {
          id: 'def-brands', type: 'paragraph', name: 'Brand Strip',
          content: { bodyText: 'Authorized Distributor & Trusted Supplier For Leading Brands\n\nPanasonic  •  KDK  •  Schneider Electric  •  Legrand  •  Bosch  •  Osram  •  Hager  •  ABB  •  SJ Lite  •  Hitachi' },
          style: mkStyle('#ffffff', '#64748b', 'py-10'),
        },
        {
          id: 'def-featured', type: 'product-grid', name: 'Featured Products',
          content: { title: 'New Arrivals. Take your pick.', subtitle: 'Check out the latest additions to our inventory. Upgrade your setup today.', productIds: ['1', '2', '3', '5', '6', '7', '8', '9'] },
          style: mkStyle('#f8fafc', '#0f172a', 'py-20'),
        },
        {
          id: 'def-quality', type: 'text-image', name: 'Quality Brands',
          content: { title: 'Only Trusted Brands. No Compromise.', subtitle: 'We partner directly with established manufacturers to ensure every product meets safety standards, durability requirements, and local compliance.', image: '/pdf-catalog/page-003/img-001.png', buttonText: 'Learn More' },
          style: mkStyle('#ffffff', '#0f172a', 'py-20'),
        },
        {
          id: 'def-services', type: 'features', name: 'Services',
          content: {
            title: 'More Than Supply — We Support Your Projects',
            subtitle: 'Our team provides more than just products. We support your workflow from planning to delivery.',
            features: [
              { title: 'Project Quotation', desc: 'Comprehensive bulk quotation support for large scale projects.', icon: 'check' },
              { title: 'Product Consultation', desc: 'Expert advice to select the right components for your specific needs.', icon: 'check' },
              { title: 'Contractor Programs', desc: 'Specialized supply programs for developers and contractors.', icon: 'check' },
              { title: 'Logistics Coordination', desc: 'Scheduled delivery support for contractors, developers, and project sites.', icon: 'truck' },
              { title: 'After-sales Support', desc: 'Dedicated technical assistance and warranty handling.', icon: 'phone' },
              { title: 'Special Sourcing', desc: 'Sourcing niche or compliance-focused products for JKR and industrial requirements.', icon: 'check' },
            ],
          },
          style: mkStyle('#f8fafc', '#0f172a', 'py-20'),
        },
        {
          id: 'def-location', type: 'text-image', name: 'Store Location',
          content: { title: 'Visit Our Retail & Trade Store in Semambu', subtitle: 'Our physical store at Semambu Industrial Area serves walk-in customers, contractors, and businesses with ready stock and technical assistance.\n\nMon - Fri: 8:30 AM - 5:30 PM\nSat: 8:30 AM - 1:00 PM\n\n+60 9-555 1234', image: '/pdf-catalog/page-001/img-001.png', buttonText: 'Get Directions' },
          style: mkStyle('#ffffff', '#0f172a', 'py-20'),
        },
        {
          id: 'def-usecases', type: 'columns', name: 'Industry Use Cases',
          content: {
            columnsData: [
              { title: 'Residential Homes', text: 'Specialized supply solutions for homes.', image: '/pdf-catalog/page-001/img-001.png' },
              { title: 'Commercial Buildings', text: 'Office and retail electrical components.', image: '/pdf-catalog/page-003/img-001.png' },
              { title: 'Industrial Facilities', text: 'Heavy-duty equipment and wiring.', image: '/pdf-catalog/page-005/img-001.png' },
              { title: 'Construction Projects', text: 'Site-ready stock for contractors.', image: '/pdf-catalog/page-006/img-001.png' },
              { title: 'Renovation Contractors', text: 'Complete renovation supply kits.', image: '/pdf-catalog/page-009/img-001.jpeg' },
              { title: 'Property Developers', text: 'Bulk sourcing for developments.', image: '/pdf-catalog/page-011/img-001.png' },
            ],
          },
          style: mkStyle('#f8fafc', '#0f172a', 'py-20'),
        },
        {
          id: 'def-cta', type: 'cta', name: 'Final CTA',
          content: { title: "Let's Power Your Next Project", subtitle: 'Whether you need a single socket or a full project supply, our team is ready to assist.', buttonText: 'Request Quotation' },
          style: { ...mkStyle('#f8fafc', '#0f172a', 'py-20'), backgroundGradient: 'from-slate-900 to-slate-800', textColor: '#ffffff' },
        },
      ];
    }

    if (slug === 'about') {
      return [
        {
          id: 'def-about-hero', type: 'hero', name: 'About Hero',
          content: { title: 'Focus Electrical Malaysia Sdn Bhd', subtitle: 'An established Malaysian electrical and electronic distributor incorporated on 9 July 1999, supplying certified solutions for residential, commercial, and industrial use nationwide.', buttonText: 'Contact Us', image: '/pdf-catalog/page-001/img-001.png' },
          style: mkStyle('#f8fafc', '#0f172a', 'py-20'),
        },
        {
          id: 'def-about-features', type: 'features', name: 'What We Do',
          content: {
            title: 'Why Choose Focus Electrical',
            features: [
              { title: 'Certified Products', desc: 'All products meet strict Malaysian safety regulations (MS/IEC).', icon: 'check' },
              { title: 'Nationwide Coverage', desc: 'Multiple branches in Pahang serving the whole of Malaysia.', icon: 'truck' },
              { title: 'Expert Consultation', desc: 'Experienced team to guide your product selection.', icon: 'phone' },
            ],
          },
          style: mkStyle('#ffffff', '#0f172a', 'py-16'),
        },
        {
          id: 'def-about-brands', type: 'paragraph', name: 'Our Brands',
          content: { bodyText: 'Official Partners:\nPanasonic • KDK • Schneider Electric • Legrand • Bosch • Osram • Hager • ABB • SJ Lite • Hitachi' },
          style: mkStyle('#f8fafc', '#0f172a', 'py-12'),
        },
      ];
    }

    if (slug === 'products') {
      return [
        {
          id: 'def-prod-hero', type: 'hero', name: 'Products Hero',
          content: { title: 'Our Product Range', subtitle: 'Browse our full catalog of electrical supplies for every project type.', buttonText: 'View All' },
          style: mkStyle('#f8fafc', '#0f172a', 'py-16'),
        },
      ];
    }

    if (slug === 'news') {
      return [
        {
          id: 'def-news-hero', type: 'title', name: 'News Title',
          content: { title: 'Latest News & Updates', subtitle: 'Stay up to date with Focus Electrical', headingLevel: 'h1' },
          style: mkStyle('#f8fafc', '#0f172a', 'py-16'),
        },
      ];
    }

    return [];
  };

  // Get sections for the editor — CMS data if available, otherwise generate defaults
  const getEditorSections = (slug: string) => {
    const cmsData = cmsSections[slug];
    if (cmsData && cmsData.length > 0) return cmsData;
    return getDefaultSectionsForPage(slug);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 overflow-x-hidden selection:bg-red-500 selection:text-white transition-colors duration-300">
      {/* Inline editor mode */}
      {inlineEditMode && editPageMeta ? (
        <InlineEditor
          pageSlug={editPageMeta.slug}
          pageTitle={editPageMeta.title}
          existingPageId={editPageMeta.id}
          initialSections={getEditorSections(editPageMeta.slug)}
          onExit={() => {
            setInlineEditMode(false);
            setEditPageMeta(null);
          }}
          onSaved={(newSections, savedPageId) => {
            setCmsSections(prev => ({ ...prev, [editPageMeta.slug]: newSections }));
            if (savedPageId) {
              setCmsPageIds(prev => ({ ...prev, [editPageMeta.slug]: savedPageId }));
            }
            // Also persist to localStorage so changes survive refresh
            saveLocalCms(editPageMeta.slug, newSections, savedPageId, 'published');
          }}
          onNavigate={handleNavigate}
        />
      ) : (
        <>
          <Navbar scrolled={scrolled} onNavigate={handleNavigate} currentPage={currentPage} />
          
          <main>
            {renderContent()}
          </main>

          <Footer onNavigate={handleNavigate} />

          {/* Floating Edit Page button for admins */}
          {user && isAdmin && currentPage !== 'admin' && currentPage !== 'login' && (
            <button
              onClick={() => {
                const slug = currentPage;
                const title = pageTitleMap[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
                const existingId = cmsPageIds[slug] || loadLocalCms()[slug]?.pageId;
                setEditPageMeta({ slug, title, id: existingId });
                setInlineEditMode(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl shadow-red-600/30 transition-all hover:scale-105 active:scale-95 group"
              title={`Edit "${currentPage}" page`}
            >
              <Pencil className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Edit Page</span>
            </button>
          )}
        </>
      )}
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