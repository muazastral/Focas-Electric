import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Star, 
  ShoppingCart, 
  Eye, 
  X,
  Heart,
  MapPin,
  Tag,
  LayoutGrid,
  Lightbulb,
  ToggleLeft,
  Fan,
  Cable,
  Hammer,
  CircuitBoard,
  Smartphone,
  Factory,
  ArrowLeft,
  ArrowUpRight,
  ArrowRight,
  Check,
  Zap,
  SlidersHorizontal,
  Store
} from 'lucide-react';
import { Button } from './Button';
import { PRODUCTS, Product, BRAND_NAMES, LOCATIONS } from '../constants';
import { useCart } from './CartContext';
import { fallbackData, getProductsRequest } from '../services/api';

// Quick View Modal Component
interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onAddToCart }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
          {/* Image Section */}
          <div className="relative group bg-slate-50 dark:bg-slate-950 rounded-xl flex items-center justify-center overflow-hidden h-full min-h-[300px]">
             <img 
               src={product.image} 
               alt={product.name} 
               className="w-full h-full object-contain max-h-[400px] transition-transform duration-500 group-hover:scale-110" 
             />
             {product.isSale && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  SALE
                </span>
             )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col h-full">
            <div className="mb-2">
               <span className="text-cyan-600 dark:text-cyan-400 text-sm font-medium uppercase tracking-wider">{product.category}</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{product.name}</h2>
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium">Brand: <span className="text-slate-900 dark:text-white">{product.brand}</span></div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < product.rating ? 'fill-current' : 'text-slate-300 dark:text-slate-700'}`} />
                ))}
              </div>
              <span className="text-slate-500 dark:text-slate-400 text-sm">({product.rating} Reviews)</span>
            </div>

            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">RM {product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-slate-400 line-through mb-1">RM {product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <div className="prose dark:prose-invert mb-8">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {product.description}
                <br /><br />
                Standard industry warranty included.
              </p>
            </div>
            
            <div className="mb-8 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
               <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                 <Store className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Stock Availability:
               </h4>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                 {product.availableAt.map(locId => {
                   const loc = LOCATIONS.find(l => l.id === locId);
                   return loc ? (
                     <div key={locId} className="flex items-center gap-2">
                       <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                       <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                         {loc.name}
                       </span>
                     </div>
                   ) : null;
                 })}
               </div>
            </div>

            <div className="mt-auto flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="flex-1 gap-2" onClick={() => onAddToCart(product)}>
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </Button>
                <Button variant="secondary" size="lg" className="px-4" title="Add to Wishlist">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
              <Button variant="outline" className="w-full border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500">
                  View Full Product Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CATEGORY_ICONS: Record<string, any> = {
  'All': LayoutGrid,
  'Lighting': Lightbulb,
  'Switches': ToggleLeft,
  'Fans': Fan,
  'Cables': Cable,
  'Tools': Hammer,
  'Distribution Boards': CircuitBoard,
  'Smart Home': Smartphone,
  'Industrial': Factory,
};

interface ShopProps {
  initialCategory?: string;
}

export const Shop: React.FC<ShopProps> = ({ initialCategory = 'All' }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedEffect, setAddedEffect] = useState<string | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  const { addToCart, cartCount, cartTotal } = useCart();

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const apiProducts = await getProductsRequest();
        setProducts(apiProducts);
      } catch {
        setProducts(fallbackData.products);
      }
    };

    loadProducts();
  }, []);

  const categories = Object.keys(CATEGORY_ICONS);
  const brands = Array.from(new Set(products.map(product => product.brand))).filter(Boolean);
  const availableBrands = brands.length ? brands : BRAND_NAMES;

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    addToCart(product);
    setAddedEffect(product.id);
    setTimeout(() => setAddedEffect(null), 1000);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    
    return matchesSearch && matchesCategory && matchesPrice && matchesBrand;
  });

  return (
    <div className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      
      {/* 1. SHOP HERO SECTION */}
      <section className="bg-slate-100 dark:bg-slate-900 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
               <div className="max-w-xl text-center md:text-left">
                  <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">2025 Collection</h4>
                  <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6">
                     STEP INTO <br />
                     <span className="text-cyan-600 dark:text-cyan-400">ELECTRICAL</span> EXCELLENCE
                  </h1>
                  <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
                     Discover premium components for home and industry. <br className="hidden md:block"/>
                     Certified quality, delivered to your doorstep.
                  </p>
                  <Button size="lg" onClick={() => {
                     const el = document.getElementById('shop-grid');
                     el?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                     Start Shopping <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
               </div>
               
               {/* Hero Image / Abstract */}
               <div className="mt-10 md:mt-0 relative">
                  <div className="w-64 h-64 md:w-96 md:h-96 bg-cyan-500/20 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                  <img 
                    src="https://picsum.photos/800/800?random=hero" 
                    alt="Hero Product" 
                    className="relative z-10 w-full max-w-sm drop-shadow-2xl rounded-3xl transform rotate-[-10deg] hover:rotate-0 transition-transform duration-500"
                  />
               </div>
            </div>
         </div>
      </section>

      {/* 2. TRUSTED BY SECTION */}
      <div className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <p className="text-sm font-semibold text-slate-400 mb-6">Trusted By Top Companies</p>
           <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {availableBrands.slice(0, 5).map((brand, i) => (
                 <span key={i} className="text-xl font-bold text-slate-800 dark:text-white">{brand}</span>
              ))}
           </div>
        </div>
      </div>

      {/* 3. MAIN SHOP AREA */}
      <div id="shop-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-10">
           <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Explore Our Latest Collection</h2>
           
           {/* CATEGORY TABS (Horizontal Pills) */}
           <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                    selectedCategory === cat 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-lg transform scale-105' 
                      : 'bg-transparent text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${selectedCategory === cat ? 'bg-cyan-400' : 'bg-transparent'}`}></span>
                  {cat}
                </button>
              ))}
           </div>
        </div>

        {/* ADVANCED FILTERS (Top Bar) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
           
           {/* Search */}
           <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border-none focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>

           {/* Filter Toggles */}
           <div className="flex gap-3 w-full md:w-auto">
              <button 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border font-medium transition-colors ${showAdvancedFilters ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-500 text-cyan-700 dark:text-cyan-400' : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
              <div className="relative flex-1 md:flex-none">
                 <select className="w-full appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 py-2.5 pl-4 pr-10 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer">
                     <option>Sort: Newest</option>
                     <option>Price: Low to High</option>
                     <option>Price: High to Low</option>
                 </select>
                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
           </div>
        </div>

        {/* EXPANDABLE FILTER AREA (Vertical Stack within Top Section) */}
        {showAdvancedFilters && (
          <div className="mb-10 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 animate-in slide-in-from-top-2 duration-200">
             <div className="grid md:grid-cols-2 gap-8">
                {/* Price Range */}
                <div>
                   <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Price Range (RM)</h3>
                   <div className="flex items-center gap-4">
                      <span className="text-sm text-slate-500">0</span>
                      <input 
                          type="range" 
                          min="0" 
                          max="1000" 
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                          className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                      />
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{priceRange[1]}</span>
                   </div>
                </div>

                {/* Brands */}
                <div>
                   <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Brands</h3>
                   <div className="flex flex-wrap gap-2">
                      {availableBrands.map(brand => (
                        <button
                          key={brand}
                          onClick={() => toggleBrand(brand)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                            selectedBrands.includes(brand) 
                              ? 'bg-cyan-600 text-white border-cyan-600' 
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-cyan-500'
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* 4. PRODUCT GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group relative bg-white dark:bg-slate-900 rounded-[20px] p-4 transition-all duration-300 hover:shadow-2xl border border-transparent hover:border-slate-100 dark:hover:border-slate-800 cursor-pointer flex flex-col h-full"
                onClick={() => setSelectedProduct(product)}
              >
                
                {/* Header: Name & Price & Description */}
                <div className="mb-4 px-2 pt-2">
                   <div className="flex justify-between items-start mb-2">
                      <div>
                         <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">{product.category}</p>
                         <h3 className="font-semibold text-slate-900 dark:text-white text-base leading-tight line-clamp-1 pr-2">{product.name}</h3>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white text-lg">RM{product.price}</span>
                   </div>
                   <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {product.description}
                   </p>
                </div>

                {/* Image Area */}
                <div className="relative aspect-[4/3] flex items-center justify-center bg-slate-50 dark:bg-slate-950 rounded-2xl mb-4 overflow-hidden">
                   <img 
                     src={product.image} 
                     alt={product.name} 
                     className="w-3/4 h-3/4 object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply dark:mix-blend-normal"
                   />
                   
                   {/* Badges */}
                   <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {product.isNew && <span className="px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold uppercase rounded">New</span>}
                      {product.isSale && <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold uppercase rounded">Sale</span>}
                   </div>

                   {/* Quick View Button */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/10 dark:bg-black/20 backdrop-blur-[1px]">
                     <button
                       onClick={(e) => {
                         e.stopPropagation();
                         setSelectedProduct(product);
                       }}
                       className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-full shadow-xl hover:scale-110 transition-transform duration-200 border border-slate-100 dark:border-slate-700 hover:text-cyan-600 dark:hover:text-cyan-400"
                       title="Quick View"
                     >
                       <Eye className="w-5 h-5" />
                     </button>
                   </div>
                </div>

                {/* Footer: Colors/Specs & Actions */}
                <div className="px-2 pb-2 mt-auto">
                   {/* Color Dots (Mock) */}
                   <div className="flex gap-1.5 mb-4 justify-center md:justify-start">
                      <div className="w-3 h-3 rounded-full bg-slate-800 ring-1 ring-offset-1 ring-slate-300 dark:ring-slate-700 dark:ring-offset-slate-900"></div>
                      <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                   </div>

                   <div className="flex items-center justify-between mb-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                      {/* Left: Size/Spec Mock */}
                      <div className="flex gap-2 text-xs font-bold text-slate-400">
                         <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">S</span>
                         <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer text-slate-900 dark:text-white">M</span>
                         <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">L</span>
                      </div>

                      {/* Right: Actions */}
                      <button 
                         onClick={(e) => toggleWishlist(e, product.id)}
                         className={`transition-colors ${wishlist.includes(product.id) ? 'text-red-500' : 'text-slate-300 hover:text-red-500'}`}
                      >
                         <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                      </button>
                   </div>
                   
                   <Button 
                      variant="primary" 
                      className="w-full gap-2 text-sm justify-center shadow-md hover:shadow-lg"
                      onClick={(e) => handleAddToCart(product, e)}
                   >
                      {addedEffect === product.id ? (
                          <>Added <Check className="w-4 h-4" /></>
                      ) : (
                          <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
                      )}
                   </Button>
                </div>

              </div>
            ))}
          </div>
        ) : (
           <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
              <Search className="w-12 h-12 text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No products found</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Try adjusting your filters or search query.
              </p>
           </div>
        )}
        
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={handleAddToCart} />
      )}

      {/* Floating Cart Bar (Mobile Only) */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-4 right-4 z-40 lg:hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-slate-900 dark:bg-white rounded-full p-4 shadow-2xl flex items-center justify-between text-white dark:text-slate-900" onClick={() => window.location.hash = 'cart'}>
            <div className="flex items-center gap-3 pl-2">
               <span className="font-bold">{cartCount} Item(s)</span>
               <span className="opacity-50">|</span>
               <span className="font-bold">RM {cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2 pr-2 font-bold text-sm">
              View Cart <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};