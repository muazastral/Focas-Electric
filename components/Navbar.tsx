import React, { useState } from 'react';
import { Menu, X, Zap, Sun, Moon, Monitor, User as UserIcon, LogOut, ShoppingBag, ShoppingCart, LayoutDashboard } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { Button } from './Button';
import { useTheme } from './ThemeProvider';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';

interface NavbarProps {
  scrolled: boolean;
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled, onNavigate, currentPage = 'home' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    if (onNavigate) {
      if (href === '#about') {
        onNavigate('about');
      } else if (href === '#products') {
        onNavigate('products');
      } else if (href === '#news') {
        onNavigate('news');
      } else if (href === '#home') {
        onNavigate('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Handle anchor links for same-page sections
        if (currentPage !== 'home') {
           onNavigate('home');
           setTimeout(() => {
             const element = document.querySelector(href);
             if (element) {
               element.scrollIntoView({ behavior: 'smooth' });
             }
           }, 100);
        } else {
           const element = document.querySelector(href);
           if (element) {
             element.scrollIntoView({ behavior: 'smooth' });
           }
        }
      }
    }
    setIsOpen(false);
  };

  const handleUserNav = (dest: string) => {
    if(onNavigate) onNavigate(dest);
    setUserMenuOpen(false);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    if(onNavigate) onNavigate('home');
    setUserMenuOpen(false);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('#home')}
            className="flex-shrink-0 flex items-center gap-2 focus:outline-none"
          >
            <div className="bg-red-500/10 p-2 rounded-lg border border-red-500/20">
              <Zap className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">Focus<span className="text-red-600 dark:text-red-400">Electrical</span></span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavClick('#home')}
              className={`text-sm font-medium transition-colors ${currentPage === 'home' && !window.location.hash ? 'text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400'}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('#products')}
              className={`text-sm font-medium transition-colors ${currentPage === 'products' ? 'text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400'}`}
            >
              Products
            </button>
            <button 
              onClick={() => handleNavClick('#about')}
              className={`text-sm font-medium transition-colors ${currentPage === 'about' ? 'text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400'}`}
            >
              About Us
            </button>

            {NAV_ITEMS.map((item) => (
              <button 
                key={item.label} 
                onClick={() => handleNavClick(item.href)}
                className={`text-sm font-medium transition-colors focus:outline-none ${currentPage === 'news' && item.href === '#news' ? 'text-red-600 dark:text-red-400' : 'text-slate-600 hover:text-red-600 dark:text-slate-300 dark:hover:text-red-400'}`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Theme Toggle */}
            <div className="relative">
              <button 
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Sun className="h-5 w-5" /> : theme === 'dark' ? <Moon className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
              </button>
              
              {themeMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg py-1 z-50">
                  <button 
                    onClick={() => { setTheme('light'); setThemeMenuOpen(false); }}
                    className={`flex items-center gap-2 w-full px-4 py-2 text-sm ${theme === 'light' ? 'text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <Sun className="h-4 w-4" /> Light
                  </button>
                  <button 
                    onClick={() => { setTheme('dark'); setThemeMenuOpen(false); }}
                    className={`flex items-center gap-2 w-full px-4 py-2 text-sm ${theme === 'dark' ? 'text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <Moon className="h-4 w-4" /> Dark
                  </button>
                  <button 
                    onClick={() => { setTheme('system'); setThemeMenuOpen(false); }}
                    className={`flex items-center gap-2 w-full px-4 py-2 text-sm ${theme === 'system' ? 'text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <Monitor className="h-4 w-4" /> Default
                  </button>
                </div>
              )}
            </div>

            {/* User Auth / Dashboard */}
            {user ? (
               <div className="relative">
                 <button 
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-slate-200 dark:border-slate-800 hover:border-red-500 transition-colors"
                 >
                   <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=06b6d4&color=fff`} alt={user.name} className="w-8 h-8 rounded-full" />
                   {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                   )}
                 </button>

                 {userMenuOpen && (
                   <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                     <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                       <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                       <p className="text-xs text-slate-500 truncate">{user.email}</p>
                     </div>
                     {isAdmin ? (
                       <button onClick={() => handleUserNav('admin')} className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2">
                         <LayoutDashboard className="w-4 h-4" /> Admin Panel
                       </button>
                     ) : (
                       <button onClick={() => handleUserNav('user-dashboard')} className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2">
                         <LayoutDashboard className="w-4 h-4" /> Dashboard
                       </button>
                     )}
                     {!isAdmin && (
                       <>
                        <button onClick={() => handleUserNav('cart')} className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2">
                          <ShoppingCart className="w-4 h-4" /> My Cart ({cartCount})
                        </button>
                        <button onClick={() => handleUserNav('my-orders')} className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2">
                          <ShoppingBag className="w-4 h-4" /> My Orders
                        </button>
                       </>
                     )}
                     <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2">
                       <LogOut className="w-4 h-4" /> Sign Out
                     </button>
                   </div>
                 )}
               </div>
            ) : (
               <Button variant="primary" size="sm" onClick={() => onNavigate && onNavigate('login')}>Login</Button>
            )}

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
             {/* Mobile Theme Toggle */}
            <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
            >
                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => handleNavClick('#home')}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${currentPage === 'home' ? 'text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20' : 'text-slate-600 dark:text-slate-300'}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('#products')}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${currentPage === 'products' ? 'text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20' : 'text-slate-600 dark:text-slate-300'}`}
            >
              Products
            </button>
            <button
              onClick={() => handleNavClick('#about')}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${currentPage === 'about' ? 'text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20' : 'text-slate-600 dark:text-slate-300'}`}
            >
              About Us
            </button>
            {NAV_ITEMS.map((item) => (
              <button 
                key={item.label} 
                onClick={() => handleNavClick(item.href)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${currentPage === 'news' && item.href === '#news' ? 'text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                {item.label}
              </button>
            ))}
            <div className="mt-4 px-3 border-t border-slate-100 dark:border-slate-800 pt-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=06b6d4&color=fff`} alt={user.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                  {isAdmin ? (
                    <Button className="w-full mb-2" onClick={() => handleUserNav('admin')}>Admin Panel</Button>
                  ) : (
                    <Button className="w-full mb-2" onClick={() => handleUserNav('user-dashboard')}>My Dashboard</Button>
                  )}
                  <Button variant="outline" className="w-full" onClick={handleLogout}>Sign Out</Button>
                </>
              ) : (
                <Button variant="primary" className="w-full" onClick={() => { if(onNavigate) onNavigate('login'); setIsOpen(false); }}>Login / Sign Up</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};