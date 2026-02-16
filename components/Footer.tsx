import React from 'react';
import { Zap, Facebook, Instagram, Linkedin } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (onNavigate) {
      if (href === '#about') {
        onNavigate('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (href === '#products') {
        onNavigate('products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (href === '#home') {
        onNavigate('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        onNavigate('home');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-red-500/10 p-1.5 rounded-lg border border-red-500/20">
                <Zap className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white">Focus<span className="text-red-600 dark:text-red-400">Electrical</span></span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Your reliable partner for electrical & electronic solutions in Malaysia. Quality brands, fair prices, fast delivery.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 text-sm transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" onClick={(e) => handleLinkClick(e, '#products')} className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 text-sm transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 text-sm transition-colors">
                  About Us
                </a>
              </li>
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href} 
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold mb-6">Support</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 text-sm transition-colors">Contact Support</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 text-sm transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
             <h3 className="text-slate-900 dark:text-white font-bold mb-6">Connect</h3>
             <div className="flex space-x-4">
                <a href="#" className="p-2 bg-slate-200 dark:bg-slate-900 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-slate-200 dark:bg-slate-900 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-slate-200 dark:bg-slate-900 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
             </div>
          </div>

        </div>

        <div className="border-t border-slate-200 dark:border-slate-900 pt-8 text-center">
          <p className="text-slate-500 dark:text-slate-600 text-xs">
            © {new Date().getFullYear()} Focus Electrical Malaysia Sdn Bhd. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};