import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  Settings, 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  FileText, 
  TrendingUp, 
  UserPlus,
  Image as ImageIcon,
  Layers,
  ArrowLeft,
  Move,
  Save,
  MoveVertical,
  Type,
  Columns,
  LayoutTemplate,
  Palette,
  Grid,
  Monitor,
  Smartphone,
  CreditCard,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Video,
  MousePointer2,
  MoreVertical,
  CheckCircle2,
  Megaphone,
  X,
  Upload,
  Filter,
  MoreHorizontal,
  Clock,
  DollarSign,
  Truck,
  AlertCircle
} from 'lucide-react';
import { Button } from './Button';
import { PRODUCTS, MOCK_ORDERS, MOCK_USERS, Product } from '../constants';
import { Order, User } from '../types';
import { deleteProductRequest, fallbackData, getAdminOrdersRequest, getAdminUsersRequest, getProductsRequest, saveProductRequest } from '../services/api';

// --- Types ---

interface PageSectionStyle {
  backgroundColor: string;
  backgroundImage?: string;
  backgroundGradient?: string;
  textColor: string;
  fontFamily: 'Inter' | 'Roboto' | 'Serif' | 'Mono';
  height: string;
  textAlign: 'left' | 'center' | 'right';
  padding: string;
}

interface PageSection {
  id: string;
  type: 'hero' | 'features' | 'text-image' | 'video' | 'cta';
  name: string;
  content: {
    title?: string;
    subtitle?: string;
    image?: string;
    videoUrl?: string;
    buttonText?: string;
    features?: Array<{ title: string; desc: string; icon: string }>;
  };
  style: PageSectionStyle;
}

// --- Mock Data ---

const MOCK_PAGES = [
  { id: 1, title: 'Home', slug: '/', status: 'Published', lastModified: '2023-10-25' },
  { id: 2, title: 'About Us', slug: '/about', status: 'Published', lastModified: '2023-09-15' },
  { id: 3, title: 'Products', slug: '/products', status: 'Published', lastModified: '2023-10-20' },
  { id: 4, title: 'Contact', slug: '/contact', status: 'Draft', lastModified: '2023-10-26' },
];

const INITIAL_SECTIONS: PageSection[] = [
  { 
    id: 'sec-1', 
    type: 'hero', 
    name: 'Main Hero',
    content: { 
      title: 'Powering Your World', 
      subtitle: 'The leading distributor of electrical components in Malaysia.', 
      buttonText: 'Shop Now',
      image: 'https://picsum.photos/1200/600?random=1'
    }, 
    style: { 
      backgroundColor: '#ffffff', 
      textColor: '#0f172a', 
      fontFamily: 'Inter', 
      height: 'h-[500px]', 
      textAlign: 'center', 
      padding: 'py-20' 
    } 
  },
  { 
    id: 'sec-2', 
    type: 'features', 
    name: 'Key Features',
    content: { 
      title: 'Why Choose Us',
      features: [
        { title: 'Fast Delivery', desc: 'Nationwide shipping within 3 days.', icon: 'truck' },
        { title: 'Quality Guaranteed', desc: '100% Authentic products.', icon: 'check' },
        { title: '24/7 Support', desc: 'Expert technical assistance.', icon: 'phone' }
      ]
    }, 
    style: { 
      backgroundColor: '#f8fafc', 
      textColor: '#0f172a', 
      fontFamily: 'Inter', 
      height: 'h-auto', 
      textAlign: 'center', 
      padding: 'py-16' 
    } 
  }
];

// --- Helper Components ---

const ColorPicker = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-slate-500 font-medium">{label}</span>
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full border border-slate-200 overflow-hidden relative">
        <input 
          type="color" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer p-0 border-0"
        />
      </div>
      <span className="text-xs font-mono text-slate-400 uppercase">{value}</span>
    </div>
  </div>
);

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubView, setActiveSubView] = useState<string | null>(null);
  
  // -- Data State --
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  
  // -- Product Editing State --
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  // -- Visual Editor State --
  const [sections, setSections] = useState<PageSection[]>(INITIAL_SECTIONS);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  const selectedSection = sections.find(s => s.id === selectedSectionId);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const [apiProducts, apiOrders, apiUsers] = await Promise.all([
          getProductsRequest(),
          getAdminOrdersRequest(),
          getAdminUsersRequest(),
        ]);

        setProducts(apiProducts);
        setOrders(apiOrders);
        setUsers(apiUsers);
      } catch {
        setProducts(fallbackData.products);
        setOrders(fallbackData.orders);
        setUsers(fallbackData.users);
      }
    };

    loadAdminData();
  }, []);

  // --- Actions ---

  const updateSection = (id: string, updates: Partial<PageSection> | Partial<PageSectionStyle> | Partial<PageSection['content']>) => {
    setSections(prev => prev.map(sec => {
      if (sec.id !== id) return sec;
      if ('backgroundColor' in updates || 'textColor' in updates || 'textAlign' in updates || 'height' in updates || 'fontFamily' in updates || 'backgroundGradient' in updates || 'padding' in updates) {
        return { ...sec, style: { ...sec.style, ...updates } };
      }
      if ('title' in updates || 'subtitle' in updates || 'buttonText' in updates || 'image' in updates || 'videoUrl' in updates) {
        return { ...sec, content: { ...sec.content, ...updates } };
      }
      return { ...sec, ...updates } as PageSection;
    }));
  };

  const addSection = (type: PageSection['type']) => {
    const newSection: PageSection = {
      id: `sec-${Date.now()}`,
      type,
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      content: {
        title: 'New Section Title',
        subtitle: 'Add your content here.',
        buttonText: 'Click Me',
        image: 'https://picsum.photos/800/400',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      },
      style: {
        backgroundColor: '#ffffff',
        textColor: '#0f172a',
        fontFamily: 'Inter',
        height: 'h-auto',
        textAlign: 'center',
        padding: 'py-16'
      }
    };
    setSections([...sections, newSection]);
    setSelectedSectionId(newSection.id);
  };

  const deleteSection = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
    if (selectedSectionId === id) setSelectedSectionId(null);
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const idx = sections.findIndex(s => s.id === id);
    if ((direction === 'up' && idx === 0) || (direction === 'down' && idx === sections.length - 1)) return;
    const newSections = [...sections];
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    [newSections[idx], newSections[swapIdx]] = [newSections[swapIdx], newSections[idx]];
    setSections(newSections);
  };

  const handleSaveProduct = async () => {
    if (editingProduct) {
      try {
        const savedProduct = await saveProductRequest(editingProduct);

        if (editingProduct.id) {
          setProducts(prev => prev.map(p => p.id === savedProduct.id ? savedProduct : p));
        } else {
          setProducts(prev => [savedProduct, ...prev]);
        }
      } catch {
        if (editingProduct.id) {
          setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...editingProduct } as Product : p));
        } else {
          const newProduct = { ...editingProduct, id: Date.now().toString(), rating: 0, availableAt: ['hq'] } as Product;
          setProducts(prev => [...prev, newProduct]);
        }
      }

      setEditingProduct(null);
      setActiveSubView(null);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProductRequest(productId);
    } catch {
      // Continue with local state update for offline/mock mode.
    }

    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleOrderStatusChange = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  // --- Render Functions ---

  const renderSectionPreview = (section: PageSection) => {
    const isSelected = selectedSectionId === section.id;
    const { style, content } = section;
    const containerStyle: React.CSSProperties = {
      backgroundColor: style.backgroundColor,
      color: style.textColor,
      fontFamily: style.fontFamily,
      backgroundImage: style.backgroundImage ? `url(${style.backgroundImage})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
    const classes = `relative w-full ${style.height} ${style.padding} transition-all duration-200 ${isSelected ? 'ring-2 ring-cyan-500 ring-inset z-10' : 'hover:ring-1 hover:ring-cyan-300 ring-inset'}`;

    return (
      <div 
        key={section.id}
        className={classes}
        style={containerStyle}
        onClick={(e) => { e.stopPropagation(); setSelectedSectionId(section.id); }}
      >
        {style.backgroundGradient && (
          <div className={`absolute inset-0 bg-gradient-to-r ${style.backgroundGradient} opacity-90 -z-10`} />
        )}
        {isSelected && (
           <div className="absolute top-2 right-2 flex gap-1 z-50 bg-white dark:bg-slate-800 p-1 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in duration-200">
              <button onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'up'); }} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-500"><MoveVertical className="w-3 h-3" /></button>
              <button onClick={(e) => { e.stopPropagation(); deleteSection(section.id); }} className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded text-slate-500"><Trash2 className="w-3 h-3" /></button>
           </div>
        )}
        <div className={`max-w-4xl mx-auto px-6 h-full flex flex-col justify-center ${style.textAlign === 'center' ? 'items-center' : style.textAlign === 'right' ? 'items-end' : 'items-start'}`}>
          {(section.type === 'hero' || section.type === 'cta') && (
            <>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{content.title}</h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl">{content.subtitle}</p>
              <button 
                className="px-6 py-3 rounded-lg font-bold transition-transform active:scale-95"
                style={{ backgroundColor: style.textColor, color: style.backgroundColor }}
              >
                {content.buttonText}
              </button>
            </>
          )}
          {section.type === 'text-image' && (
             <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className={`${style.textAlign === 'right' ? 'order-2' : ''}`}>
                   <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
                   <p className="opacity-80 leading-relaxed mb-6">{content.subtitle}</p>
                   <button className="underline font-medium decoration-2 underline-offset-4">Learn More</button>
                </div>
                <div className={`${style.textAlign === 'right' ? 'order-1' : ''}`}>
                   <img src={content.image} alt="Section" className="rounded-xl shadow-lg w-full h-64 object-cover" />
                </div>
             </div>
          )}
          {section.type === 'features' && (
             <>
               <div className="mb-12">
                 <h2 className="text-3xl font-bold mb-2">{content.title}</h2>
                 <p className="opacity-80">{content.subtitle}</p>
               </div>
               <div className="grid md:grid-cols-3 gap-8 w-full">
                  {content.features?.map((feat, idx) => (
                    <div key={idx} className="p-6 rounded-xl bg-white/5 border border-current/10 backdrop-blur-sm">
                       <div className="mb-4 text-3xl opacity-80">
                         {feat.icon === 'truck' ? '🚚' : feat.icon === 'check' ? '🛡️' : '📞'}
                       </div>
                       <h3 className="font-bold text-lg mb-2">{feat.title}</h3>
                       <p className="text-sm opacity-70">{feat.desc}</p>
                    </div>
                  ))}
               </div>
             </>
          )}
          {section.type === 'video' && (
             <div className="w-full max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">{content.title}</h2>
                <div className="aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
                   <iframe width="100%" height="100%" src={content.videoUrl} title="Video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
             </div>
          )}
        </div>
      </div>
    );
  };

  const renderVisualEditor = () => (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-100 dark:bg-black fixed inset-0 top-20 z-40 animate-in fade-in duration-300">
      <div className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shadow-sm z-20">
         <div className="flex items-center gap-4">
            <button onClick={() => setActiveSubView(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500">
               <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
               <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                 Home Page <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Live Editor</span>
               </h1>
            </div>
         </div>
         <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <button onClick={() => setPreviewMode('desktop')} className={`p-2 rounded-md transition-all ${previewMode === 'desktop' ? 'bg-white dark:bg-slate-700 shadow text-cyan-600' : 'text-slate-500 hover:text-slate-700'}`}><Monitor className="w-4 h-4" /></button>
            <button onClick={() => setPreviewMode('mobile')} className={`p-2 rounded-md transition-all ${previewMode === 'mobile' ? 'bg-white dark:bg-slate-700 shadow text-cyan-600' : 'text-slate-500 hover:text-slate-700'}`}><Smartphone className="w-4 h-4" /></button>
         </div>
         <div className="flex items-center gap-3">
            <Button size="sm" className="gap-2"><Save className="w-4 h-4" /> Publish</Button>
         </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
         <div className="w-16 md:w-20 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col items-center py-6 gap-4 z-10">
            <div className="mb-2"><span className="text-[10px] font-bold text-slate-400 uppercase">Add</span></div>
            {[{ type: 'hero', icon: LayoutTemplate, label: 'Hero' }, { type: 'text-image', icon: ImageIcon, label: 'Content' }, { type: 'features', icon: Grid, label: 'Grid' }, { type: 'video', icon: Video, label: 'Video' }, { type: 'cta', icon: Megaphone, label: 'CTA' }].map((item) => (
              <button key={item.type} onClick={() => addSection(item.type as PageSection['type'])} className="group relative w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-cyan-600 hover:border-cyan-500 hover:shadow-md transition-all">
                <item.icon className="w-5 h-5" />
              </button>
            ))}
         </div>
         <div className="flex-1 overflow-y-auto bg-slate-100 dark:bg-black p-8 flex justify-center" onClick={() => setSelectedSectionId(null)}>
            <div className={`bg-white dark:bg-slate-950 shadow-2xl transition-all duration-300 ${previewMode === 'mobile' ? 'w-[375px] h-[812px] rounded-[40px] border-8 border-slate-800 overflow-y-auto overflow-x-hidden custom-scrollbar' : 'w-full max-w-[1200px] min-h-screen rounded-none'}`}>
               {sections.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-slate-400 p-10 border-2 border-dashed border-slate-300 m-10 rounded-xl">
                    <p className="mb-4">Page is empty</p>
                    <Button variant="outline" onClick={() => addSection('hero')}>Add First Section</Button>
                 </div>
               ) : (sections.map(section => renderSectionPreview(section)))}
               <div className="py-10 flex justify-center border-t border-dashed border-slate-200 dark:border-slate-800 m-4">
                  <Button variant="outline" onClick={() => addSection('text-image')} className="gap-2 border-dashed"><Plus className="w-4 h-4" /> Add Section at Bottom</Button>
               </div>
            </div>
         </div>
         <div className={`w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col z-20 transition-transform duration-300 absolute right-0 h-full md:static transform ${selectedSection ? 'translate-x-0' : 'translate-x-full md:translate-x-0 md:w-0 md:opacity-0 md:overflow-hidden'}`}>
            {selectedSection ? (
               <>
                 <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/50">
                    <div><h3 className="font-bold text-slate-900 dark:text-white">Edit {selectedSection.name}</h3><p className="text-xs text-slate-500 capitalize">{selectedSection.type} Section</p></div>
                    <button onClick={() => setSelectedSectionId(null)} className="md:hidden p-1"><X className="w-5 h-5" /></button>
                 </div>
                 <div className="flex-1 overflow-y-auto p-5 space-y-8">
                    <div className="space-y-4">
                       <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><Type className="w-3 h-3" /> Content</h4>
                       {selectedSection.content.title !== undefined && (<div><label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Heading</label><input type="text" value={selectedSection.content.title} onChange={(e) => updateSection(selectedSection.id, { title: e.target.value })} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm dark:text-white" /></div>)}
                       {selectedSection.content.subtitle !== undefined && (<div><label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Subtitle</label><textarea rows={3} value={selectedSection.content.subtitle} onChange={(e) => updateSection(selectedSection.id, { subtitle: e.target.value })} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm dark:text-white" /></div>)}
                       {selectedSection.content.buttonText !== undefined && (<div><label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Button Label</label><input type="text" value={selectedSection.content.buttonText} onChange={(e) => updateSection(selectedSection.id, { buttonText: e.target.value })} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm dark:text-white" /></div>)}
                       {selectedSection.content.image !== undefined && (<div><label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Image URL</label><div className="flex gap-2"><input type="text" value={selectedSection.content.image} onChange={(e) => updateSection(selectedSection.id, { image: e.target.value })} className="flex-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs dark:text-white truncate" /><button className="p-2 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700"><Upload className="w-4 h-4 text-slate-500" /></button></div></div>)}
                    </div>
                    <hr className="border-slate-100 dark:border-slate-800" />
                    <div className="space-y-4">
                       <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><Palette className="w-3 h-3" /> Appearance</h4>
                       <ColorPicker label="Background Color" value={selectedSection.style.backgroundColor} onChange={(val) => updateSection(selectedSection.id, { backgroundColor: val })} />
                       <ColorPicker label="Text Color" value={selectedSection.style.textColor} onChange={(val) => updateSection(selectedSection.id, { textColor: val })} />
                       <div><label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">Gradient Overlay</label><select value={selectedSection.style.backgroundGradient || ''} onChange={(e) => updateSection(selectedSection.id, { backgroundGradient: e.target.value })} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm dark:text-white"><option value="">None</option><option value="from-slate-900 to-slate-800">Dark Fade</option><option value="from-blue-600 to-cyan-500">Ocean Blue</option><option value="from-orange-500 to-amber-500">Sunset</option></select></div>
                    </div>
                 </div>
                 <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                    <Button variant="outline" className="w-full text-red-500 hover:bg-red-50 hover:border-red-200" onClick={() => deleteSection(selectedSection.id)}><Trash2 className="w-4 h-4 mr-2" /> Delete Section</Button>
                 </div>
               </>
            ) : (
               <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center"><MousePointer2 className="w-12 h-12 mb-4 opacity-20" /><p className="font-medium text-sm">Select a section in the preview to edit its properties.</p></div>
            )}
         </div>
      </div>
    </div>
  );

  const renderProductEntry = () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
       <div className="flex items-center gap-4 mb-6">
         <button onClick={() => { setEditingProduct(null); setActiveSubView(null); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><ArrowLeft className="w-5 h-5 text-slate-500" /></button>
         <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{editingProduct?.id ? 'Edit Product' : 'Add New Product'}</h2>
       </div>
       <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8">
             <div className="space-y-6">
                <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Product Name</label>
                   <input 
                      type="text" 
                      className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none dark:text-white" 
                      value={editingProduct?.name || ''} 
                      onChange={e => setEditingProduct(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Panasonic LED Ceiling Light"
                   />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category</label>
                    <select 
                      className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none dark:text-white"
                      value={editingProduct?.category || 'Lighting'}
                      onChange={e => setEditingProduct(prev => ({ ...prev, category: e.target.value }))}
                    >
                       <option>Lighting</option><option>Switches</option><option>Fans</option><option>Cables</option><option>Tools</option><option>Smart Home</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Brand</label>
                    <input 
                      type="text" 
                      className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none dark:text-white"
                      value={editingProduct?.brand || ''}
                      onChange={e => setEditingProduct(prev => ({ ...prev, brand: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Price (RM)</label>
                    <input 
                      type="number" 
                      className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none dark:text-white"
                      value={editingProduct?.price || ''}
                      onChange={e => setEditingProduct(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Original Price</label>
                    <input 
                      type="number" 
                      className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none dark:text-white"
                      value={editingProduct?.originalPrice || ''}
                      onChange={e => setEditingProduct(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) }))}
                      placeholder="Optional"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description</label>
                  <textarea 
                    rows={4} 
                    className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none dark:text-white"
                    value={editingProduct?.description || ''}
                    onChange={e => setEditingProduct(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Product Image</label>
                <div className="bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl h-64 flex items-center justify-center mb-4 relative overflow-hidden group">
                   {editingProduct?.image ? (
                     <img src={editingProduct.image} alt="Preview" className="w-full h-full object-contain" />
                   ) : (
                     <div className="text-center text-slate-400">
                       <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                       <p>Enter Image URL below</p>
                     </div>
                   )}
                </div>
                <input 
                  type="text" 
                  className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none dark:text-white mb-4"
                  placeholder="https://..."
                  value={editingProduct?.image || ''}
                  onChange={e => setEditingProduct(prev => ({ ...prev, image: e.target.value }))}
                />
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded text-cyan-600" checked={editingProduct?.isSale || false} onChange={e => setEditingProduct(prev => ({ ...prev, isSale: e.target.checked }))} />
                    <span className="text-sm text-slate-700 dark:text-slate-300">On Sale</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded text-cyan-600" checked={editingProduct?.isNew || false} onChange={e => setEditingProduct(prev => ({ ...prev, isNew: e.target.checked }))} />
                    <span className="text-sm text-slate-700 dark:text-slate-300">New Arrival</span>
                  </label>
                </div>
             </div>
          </div>
          <div className="border-t border-slate-100 dark:border-slate-800 mt-8 pt-8 flex justify-end gap-4">
             <Button variant="outline" onClick={() => { setEditingProduct(null); setActiveSubView(null); }}>Cancel</Button>
             <Button onClick={handleSaveProduct}>Save Product</Button>
          </div>
       </div>
    </div>
  );

  const renderProductsList = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Product Inventory</h2>
        <Button className="gap-2" onClick={() => { setEditingProduct({}); setActiveSubView('product_entry'); }}><Plus className="w-4 h-4" /> Add Product</Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
         <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2"><Filter className="w-4 h-4" /> Filter</Button>
         </div>
         
         <div className="overflow-x-auto">
           <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
             <thead className="bg-slate-50 dark:bg-slate-950/50 text-slate-900 dark:text-white font-semibold border-b border-slate-200 dark:border-slate-800">
               <tr>
                 <th className="px-6 py-4">Product Name</th>
                 <th className="px-6 py-4">Category</th>
                 <th className="px-6 py-4">Brand</th>
                 <th className="px-6 py-4">Price</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
               {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(product => (
                 <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                   <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-3">
                     <img src={product.image} alt="" className="w-10 h-10 rounded bg-slate-100 object-contain p-1" />
                     {product.name}
                   </td>
                   <td className="px-6 py-4">{product.category}</td>
                   <td className="px-6 py-4">{product.brand}</td>
                   <td className="px-6 py-4">RM {product.price.toFixed(2)}</td>
                   <td className="px-6 py-4">
                     <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.isSale ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                       {product.isSale ? 'On Sale' : 'In Stock'}
                     </span>
                   </td>
                   <td className="px-6 py-4 text-right">
                     <div className="flex justify-end gap-2">
                       <button onClick={() => { setEditingProduct(product); setActiveSubView('product_entry'); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-cyan-600"><Pencil className="w-4 h-4" /></button>
                       <button onClick={() => handleDeleteProduct(product.id)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                     </div>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );

  const renderOrderManagement = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
       <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Order Management</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
             <div><p className="text-sm text-slate-500">Pending Orders</p><p className="text-2xl font-bold text-slate-900 dark:text-white">{orders.filter(o => o.status === 'Pending').length}</p></div>
             <div className="p-3 bg-amber-100 text-amber-600 rounded-lg"><Clock className="w-6 h-6" /></div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
             <div><p className="text-sm text-slate-500">Processing</p><p className="text-2xl font-bold text-slate-900 dark:text-white">{orders.filter(o => o.status === 'Processing').length}</p></div>
             <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Package className="w-6 h-6" /></div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
             <div><p className="text-sm text-slate-500">Shipped</p><p className="text-2xl font-bold text-slate-900 dark:text-white">{orders.filter(o => o.status === 'Shipped').length}</p></div>
             <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><Truck className="w-6 h-6" /></div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
             <div><p className="text-sm text-slate-500">Revenue (Today)</p><p className="text-2xl font-bold text-slate-900 dark:text-white">RM 1,250</p></div>
             <div className="p-3 bg-green-100 text-green-600 rounded-lg"><DollarSign className="w-6 h-6" /></div>
          </div>
       </div>

       <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
             <thead className="bg-slate-50 dark:bg-slate-950/50 text-slate-900 dark:text-white font-semibold border-b border-slate-200 dark:border-slate-800">
               <tr>
                 <th className="px-6 py-4">Order ID</th>
                 <th className="px-6 py-4">Customer</th>
                 <th className="px-6 py-4">Date</th>
                 <th className="px-6 py-4">Total</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
               {orders.map(order => (
                 <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                   <td className="px-6 py-4 font-mono font-medium text-slate-900 dark:text-white">{order.id}</td>
                   <td className="px-6 py-4">{order.customerName}</td>
                   <td className="px-6 py-4">{order.date}</td>
                   <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">RM {order.total.toFixed(2)}</td>
                   <td className="px-6 py-4">
                     <select 
                       value={order.status}
                       onChange={(e) => handleOrderStatusChange(order.id, e.target.value as any)}
                       className={`px-3 py-1 rounded-full text-xs font-bold border-none outline-none cursor-pointer ${
                         order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                         order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                         order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                         order.status === 'Shipped' ? 'bg-purple-100 text-purple-700' :
                         'bg-amber-100 text-amber-700'
                       }`}
                     >
                        <option>Pending</option><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option>
                     </select>
                   </td>
                   <td className="px-6 py-4 text-right">
                     <Button variant="outline" size="sm">View Details</Button>
                   </td>
                 </tr>
               ))}
             </tbody>
          </table>
       </div>
    </div>
  );

  const renderCRM = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
       <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Customer Relationship Management</h2>
        <Button className="gap-2"><UserPlus className="w-4 h-4" /> Add Customer</Button>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
         <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
             <thead className="bg-slate-50 dark:bg-slate-950/50 text-slate-900 dark:text-white font-semibold border-b border-slate-200 dark:border-slate-800">
               <tr>
                 <th className="px-6 py-4">Customer</th>
                 <th className="px-6 py-4">Role</th>
                 <th className="px-6 py-4">Contact</th>
                 <th className="px-6 py-4">Total Spent</th>
                 <th className="px-6 py-4">Last Active</th>
                 <th className="px-6 py-4 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
               {users.map(user => {
                 const spent = orders.filter(o => o.userId === user.id).reduce((acc, curr) => acc + curr.total, 0);
                 return (
                   <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                     <td className="px-6 py-4 flex items-center gap-3">
                        <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} alt="" className="w-8 h-8 rounded-full" />
                        <div>
                           <p className="font-medium text-slate-900 dark:text-white">{user.name}</p>
                           <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                     </td>
                     <td className="px-6 py-4 capitalize"><span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs font-bold">{user.role}</span></td>
                     <td className="px-6 py-4">{user.phone || '-'}</td>
                     <td className="px-6 py-4 font-bold">RM {spent.toFixed(2)}</td>
                     <td className="px-6 py-4">2 days ago</td>
                     <td className="px-6 py-4 text-right">
                       <button className="text-cyan-600 hover:underline">View Profile</button>
                     </td>
                   </tr>
                 )
               })}
             </tbody>
         </table>
      </div>
    </div>
  );

  const renderStoreSettings = () => (
     <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Store Settings</h2>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 space-y-8">
           
           <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">General Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Store Name</label>
                    <input type="text" className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white" defaultValue="Focus Electrical Malaysia" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Support Email</label>
                    <input type="email" className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white" defaultValue="support@focus.com.my" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                    <input type="text" className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white" defaultValue="+60 9-560 6188" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Currency</label>
                    <select className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white"><option>MYR (RM)</option><option>USD ($)</option></select>
                 </div>
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Store Address</label>
                 <textarea className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white" rows={3} defaultValue="Lot 110 & 111, Jalan Industri Semambu 6, 25300 Kuantan, Pahang" />
              </div>
           </div>

           <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Payment & Tax</h3>
              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tax Rate (%)</label>
                    <input type="number" className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white" defaultValue="6" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Payment Methods</label>
                    <div className="space-y-2">
                       <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded text-cyan-600" /><span className="text-sm">Credit Card (Stripe)</span></label>
                       <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded text-cyan-600" /><span className="text-sm">FPX Online Banking</span></label>
                       <label className="flex items-center gap-2"><input type="checkbox" className="rounded text-cyan-600" /><span className="text-sm">Cash on Delivery</span></label>
                    </div>
                 </div>
              </div>
           </div>

           <div className="flex justify-end pt-4">
              <Button>Save Settings</Button>
           </div>
        </div>
     </div>
  );

  return (
    <div className="min-h-screen pt-20 bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
      
      {/* Sidebar - Same as before */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden md:block fixed h-[calc(100vh-80px)] top-20 left-0 overflow-y-auto custom-scrollbar z-30">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/30">A</div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">Admin Panel</p>
              <p className="text-xs text-slate-500">Focus Electrical</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <button onClick={() => { setActiveTab('overview'); setActiveSubView(null); }} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}><LayoutDashboard className="w-4 h-4" /> Dashboard</button>

            <div className="mb-6">
              <h4 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Commerce</h4>
              <button onClick={() => { setActiveTab('products'); setActiveSubView(null); }} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'products' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}><Package className="w-4 h-4" /> Products</button>
              <button onClick={() => { setActiveTab('orders'); setActiveSubView(null); }} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}><ShoppingCart className="w-4 h-4" /> Orders</button>
              <button onClick={() => { setActiveTab('crm'); setActiveSubView(null); }} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'crm' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}><Users className="w-4 h-4" /> CRM</button>
            </div>

            <div className="mb-6">
              <h4 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Web Content</h4>
              <button onClick={() => { setActiveTab('pages'); setActiveSubView(null); }} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'pages' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}><FileText className="w-4 h-4" /> Pages</button>
            </div>

             <div className="mb-6">
              <h4 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Settings</h4>
              <button onClick={() => { setActiveTab('settings'); setActiveSubView(null); }} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}><Settings className="w-4 h-4" /> Store Settings</button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-10">
        
        {activeSubView === 'editor' ? (
           renderVisualEditor()
        ) : activeSubView === 'product_entry' ? (
           renderProductEntry()
        ) : (
           <>
             {activeTab === 'overview' && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Dashboard Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">RM 45k</h3>
                      <p className="text-sm text-slate-500">Total Sales</p>
                    </div>
                  </div>
                </div>
             )}

             {activeTab === 'pages' && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pages</h2>
                    <Button className="gap-2" onClick={() => setActiveSubView('editor')}><Plus className="w-4 h-4" /> Add Page</Button>
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                      <thead className="bg-slate-50 dark:bg-slate-950/50 text-slate-900 dark:text-white font-semibold border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="px-6 py-4">Title</th>
                          <th className="px-6 py-4">Slug</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {MOCK_PAGES.map(page => (
                          <tr key={page.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{page.title}</td>
                            <td className="px-6 py-4 text-slate-500">{page.slug}</td>
                            <td className="px-6 py-4"><span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">{page.status}</span></td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button onClick={() => setActiveSubView('editor')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-cyan-600"><Pencil className="w-4 h-4" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
             )}

             {activeTab === 'products' && renderProductsList()}
             {activeTab === 'orders' && renderOrderManagement()}
             {activeTab === 'crm' && renderCRM()}
             {activeTab === 'settings' && renderStoreSettings()}
           </>
        )}

      </main>

    </div>
  );
};