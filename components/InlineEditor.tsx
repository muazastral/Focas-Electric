import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Plus,
  Save,
  X,
  Trash2,
  Move,
  ChevronUp,
  ChevronDown,
  Copy,
  Pencil,
  LayoutTemplate,
  Heading,
  PilcrowSquare,
  ImageIcon,
  Columns,
  Grid,
  SlidersHorizontal,
  ShoppingBag,
  Video,
  Megaphone,
  Minus,
  Monitor,
  Smartphone,
  Palette,
  Type,
  MousePointer2,
  GripVertical,
  Eye,
  EyeOff,
  Undo2,
  Upload,
  Image as LucideImage,
} from 'lucide-react';
import { Button } from './Button';
import { PRODUCTS, Product } from '../constants';
import { CmsPage, MediaAsset } from '../types';
import {
  saveCmsPageRequest,
  getPublicCmsPageRequest,
  getMediaAssetsRequest,
  uploadMediaAssetRequest,
} from '../services/api';

// ---------- Types ----------

interface SectionStyle {
  backgroundColor: string;
  backgroundImage?: string;
  backgroundGradient?: string;
  backgroundGradientFrom?: string;
  backgroundGradientTo?: string;
  backgroundGradientDirection?: string;
  textColor: string;
  fontFamily: 'Inter' | 'Roboto' | 'Serif' | 'Mono';
  height: string;
  textAlign: 'left' | 'center' | 'right';
  padding: string;
  imageFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  imageDisplay?: 'full' | 'thumbnail' | 'medium' | 'auto';
}

interface SectionContent {
  title?: string;
  subtitle?: string;
  image?: string;
  videoUrl?: string;
  buttonText?: string;
  features?: Array<{ title: string; desc: string; icon: string }>;
  bodyText?: string;
  caption?: string;
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4';
  slides?: string[];
  productIds?: string[];
  spacerHeight?: string;
  columnsData?: Array<{ title: string; text: string; image?: string }>;
}

type SectionType = 'hero' | 'features' | 'text-image' | 'video' | 'cta' | 'image' | 'title' | 'paragraph' | 'slideshow' | 'product-grid' | 'spacer' | 'columns';

interface PageSection {
  id: string;
  type: SectionType;
  name: string;
  content: SectionContent;
  style: SectionStyle;
}

interface InlineEditorProps {
  pageSlug: string;
  pageTitle: string;
  existingPageId?: string;
  initialSections: PageSection[];
  onExit: () => void;
  onSaved?: (sections: PageSection[], pageId?: string) => void;
  onNavigate?: (page: string) => void;
}

// ---------- Templates ----------

const SECTION_TEMPLATES: Record<SectionType, { name: string; content: SectionContent }> = {
  hero: {
    name: 'Hero Banner',
    content: { title: 'Powering Your Project', subtitle: 'Trusted electrical supplies for every need.', buttonText: 'Explore Products', image: '/pdf-catalog/page-019/img-001.jpeg' },
  },
  'text-image': {
    name: 'Split Content',
    content: { title: 'From Planning to Installation', subtitle: 'Get technical guidance, quality brands, and inventory support from one supplier.', image: '/pdf-catalog/page-023/img-001.jpeg', buttonText: 'Contact Sales' },
  },
  features: {
    name: 'Feature Grid',
    content: { title: 'Why Choose Focus', subtitle: 'Fast fulfilment, certified products, and practical support.', features: [{ title: 'Fast Delivery', desc: 'Dispatch-ready stock for urgent sites.', icon: 'truck' }, { title: 'Certified Quality', desc: 'SIRIM and project-grade options.', icon: 'check' }, { title: 'Technical Support', desc: 'Selection help for real site needs.', icon: 'phone' }] },
  },
  image: {
    name: 'Image Block',
    content: { image: '/pdf-catalog/page-019/img-001.jpeg', caption: 'Quality electrical products' },
  },
  title: {
    name: 'Section Title',
    content: { title: 'Our Services', subtitle: 'What we offer', headingLevel: 'h2' },
  },
  paragraph: {
    name: 'Text Block',
    content: { bodyText: 'Focus Electrical has been serving the Malaysian market with quality electrical components since 2005.' },
  },
  slideshow: {
    name: 'Image Slideshow',
    content: { title: 'Product Gallery', slides: ['/pdf-catalog/page-019/img-001.jpeg', '/pdf-catalog/page-023/img-001.jpeg', '/pdf-catalog/page-031/img-001.png'] },
  },
  'product-grid': {
    name: 'Product Showcase',
    content: { title: 'Featured Products', subtitle: 'Browse our best sellers', productIds: ['1', '2', '3', '5'] },
  },
  spacer: {
    name: 'Spacer',
    content: { spacerHeight: '60px' },
  },
  columns: {
    name: 'Multi-Column',
    content: { columnsData: [{ title: 'Quality Brands', text: 'Authorized dealer for Schneider, Panasonic, KDK.', image: '/pdf-catalog/page-019/img-001.jpeg' }, { title: 'Fast Delivery', text: 'Dispatch-ready stock for urgent project sites.', image: '/pdf-catalog/page-023/img-001.jpeg' }, { title: 'Expert Support', text: 'Technical guidance from experienced specialists.', image: '/pdf-catalog/page-031/img-001.png' }] },
  },
  video: {
    name: 'Video Section',
    content: { title: 'Watch Our Story', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  },
  cta: {
    name: 'Call To Action',
    content: { title: 'Ready to Order?', subtitle: 'Contact our sales team for quotes and project pricing.', buttonText: 'Get in Touch' },
  },
};

const WIDGET_LIST: { type: SectionType; icon: React.FC<any>; label: string }[] = [
  { type: 'hero', icon: LayoutTemplate, label: 'Hero' },
  { type: 'title', icon: Heading, label: 'Title' },
  { type: 'paragraph', icon: PilcrowSquare, label: 'Text' },
  { type: 'image', icon: LucideImage, label: 'Image' },
  { type: 'text-image', icon: Columns, label: 'Split' },
  { type: 'features', icon: Grid, label: 'Features' },
  { type: 'columns', icon: Columns, label: 'Columns' },
  { type: 'slideshow', icon: SlidersHorizontal, label: 'Slideshow' },
  { type: 'product-grid', icon: ShoppingBag, label: 'Products' },
  { type: 'video', icon: Video, label: 'Video' },
  { type: 'cta', icon: Megaphone, label: 'CTA' },
  { type: 'spacer', icon: Minus, label: 'Spacer' },
];

// ---------- Color Picker ----------

const ColorPicker: React.FC<{ label: string; value: string; onChange: (v: string) => void }> = ({ label, value, onChange }) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-slate-500 font-medium">{label}</span>
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-600 overflow-hidden relative">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer p-0 border-0" />
      </div>
      <span className="text-xs font-mono text-slate-400 uppercase">{value}</span>
    </div>
  </div>
);

// ---------- Slideshow preview ----------

const SlideshowPreview: React.FC<{ slides: string[] }> = ({ slides }) => {
  const [cur, setCur] = useState(0);
  if (!slides.length) return null;
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <img src={slides[cur]} alt={`Slide ${cur + 1}`} className="w-full h-80 md:h-[450px] object-cover transition-all duration-500" />
      </div>
      {slides.length > 1 && (
        <>
          <div className="flex items-center justify-center gap-2 mt-4">
            {slides.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setCur(i); }} className={`w-3 h-3 rounded-full transition-all ${i === cur ? 'bg-red-600 scale-125' : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'}`} />
            ))}
          </div>
          <button onClick={(e) => { e.stopPropagation(); setCur((p) => (p - 1 + slides.length) % slides.length); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-black/60 flex items-center justify-center shadow hover:bg-white">&#8249;</button>
          <button onClick={(e) => { e.stopPropagation(); setCur((p) => (p + 1) % slides.length); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-black/60 flex items-center justify-center shadow hover:bg-white">&#8250;</button>
        </>
      )}
    </div>
  );
};

// ---------- Align map ----------

const alignClassMap: Record<string, string> = {
  left: 'items-start text-left',
  center: 'items-center text-center',
  right: 'items-end text-right',
};

// =======================================================================
// MAIN COMPONENT
// =======================================================================

export const InlineEditor: React.FC<InlineEditorProps> = ({
  pageSlug,
  pageTitle,
  existingPageId,
  initialSections,
  onExit,
  onSaved,
  onNavigate,
}) => {
  const [sections, setSections] = useState<PageSection[]>(initialSections);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [sidebarTab, setSidebarTab] = useState<'settings' | 'widgets'>('widgets');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [pageId, setPageId] = useState<string | undefined>(existingPageId);
  const [insertIndex, setInsertIndex] = useState<number | null>(null);
  const [products] = useState<Product[]>(PRODUCTS);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Drag & drop state
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [dragOverPos, setDragOverPos] = useState<'above' | 'below'>('below');

  const selected = sections.find((s) => s.id === selectedId) || null;

  // Load media
  useEffect(() => {
    getMediaAssetsRequest().then(setMediaAssets).catch(() => {});
  }, []);

  // ---------- Section CRUD ----------

  const updateSection = useCallback(
    (id: string, updates: Partial<SectionStyle> | Partial<SectionContent> | Partial<PageSection>) => {
      setSections((prev) =>
        prev.map((sec) => {
          if (sec.id !== id) return sec;
          if ('backgroundColor' in updates || 'textColor' in updates || 'textAlign' in updates || 'height' in updates || 'fontFamily' in updates || 'backgroundGradient' in updates || 'padding' in updates || 'backgroundImage' in updates || 'imageFit' in updates || 'imageDisplay' in updates || 'backgroundGradientFrom' in updates || 'backgroundGradientTo' in updates || 'backgroundGradientDirection' in updates) {
            return { ...sec, style: { ...sec.style, ...(updates as Partial<SectionStyle>) } };
          }
          if ('title' in updates || 'subtitle' in updates || 'buttonText' in updates || 'image' in updates || 'videoUrl' in updates || 'bodyText' in updates || 'caption' in updates || 'headingLevel' in updates || 'slides' in updates || 'productIds' in updates || 'spacerHeight' in updates || 'columnsData' in updates || 'features' in updates) {
            return { ...sec, content: { ...sec.content, ...(updates as Partial<SectionContent>) } };
          }
          return { ...sec, ...updates } as PageSection;
        }),
      );
    },
    [],
  );

  const addSection = useCallback(
    (type: SectionType, atIndex?: number) => {
      const tpl = SECTION_TEMPLATES[type];
      const newSec: PageSection = {
        id: `sec-${Date.now()}`,
        type,
        name: tpl.name,
        content: { ...tpl.content },
        style: {
          backgroundColor: '#ffffff',
          textColor: '#0f172a',
          fontFamily: 'Inter',
          height: 'h-auto',
          textAlign: 'center',
          padding: 'py-16',
        },
      };
      setSections((prev) => {
        const next = [...prev];
        const idx = atIndex !== undefined ? atIndex : next.length;
        next.splice(idx, 0, newSec);
        return next;
      });
      setSelectedId(newSec.id);
      setSidebarTab('settings');
      setInsertIndex(null);
    },
    [],
  );

  const deleteSection = useCallback(
    (id: string) => {
      setSections((prev) => prev.filter((s) => s.id !== id));
      if (selectedId === id) setSelectedId(null);
    },
    [selectedId],
  );

  const duplicateSection = useCallback(
    (id: string) => {
      setSections((prev) => {
        const idx = prev.findIndex((s) => s.id === id);
        if (idx === -1) return prev;
        const clone: PageSection = {
          ...prev[idx],
          id: `sec-${Date.now()}`,
          name: `${prev[idx].name} Copy`,
          content: {
            ...prev[idx].content,
            features: prev[idx].content.features ? [...prev[idx].content.features] : undefined,
            slides: prev[idx].content.slides ? [...prev[idx].content.slides] : undefined,
            productIds: prev[idx].content.productIds ? [...prev[idx].content.productIds] : undefined,
            columnsData: prev[idx].content.columnsData ? prev[idx].content.columnsData.map((c) => ({ ...c })) : undefined,
          },
          style: { ...prev[idx].style },
        };
        const next = [...prev];
        next.splice(idx + 1, 0, clone);
        return next;
      });
    },
    [],
  );

  const moveSection = useCallback((id: string, dir: 'up' | 'down') => {
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if ((dir === 'up' && idx === 0) || (dir === 'down' && idx === prev.length - 1)) return prev;
      const next = [...prev];
      const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
      [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
      return next;
    });
  }, []);

  // ---------- Drag & Drop ----------

  const handleDragStart = useCallback((e: React.DragEvent, id: string) => {
    setDragId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDragId(null);
    setDragOverId(null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (id === dragId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    setDragOverPos(e.clientY < midY ? 'above' : 'below');
    setDragOverId(id);
  }, [dragId]);

  const handleDrop = useCallback((e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!dragId || dragId === targetId) { setDragId(null); setDragOverId(null); return; }
    setSections(prev => {
      const fromIdx = prev.findIndex(s => s.id === dragId);
      const toIdx = prev.findIndex(s => s.id === targetId);
      if (fromIdx === -1 || toIdx === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(fromIdx, 1);
      const insertAt = dragOverPos === 'above' ? (fromIdx < toIdx ? toIdx - 1 : toIdx) : (fromIdx < toIdx ? toIdx : toIdx + 1);
      next.splice(insertAt, 0, moved);
      return next;
    });
    setDragId(null);
    setDragOverId(null);
  }, [dragId, dragOverPos]);

  // ---------- Save ----------

  const handleSave = async (status: 'draft' | 'published') => {
    setSaving(true);
    setSaveStatus(null);
    const payload: Partial<CmsPage> = {
      id: pageId,
      title: pageTitle,
      slug: pageSlug,
      status,
      sections,
    };
    try {
      const saved = await saveCmsPageRequest(payload);
      setPageId(saved.id);
      setSaveStatus(status === 'published' ? 'Published!' : 'Draft saved!');
      // Persist to localStorage as backup
      try { localStorage.setItem(`focus-cms-${pageSlug}`, JSON.stringify({ sections, pageId: saved.id, status })); } catch {}
      onSaved?.(sections, saved.id);
    } catch {
      // Fallback for offline/mock — persist to localStorage
      try { localStorage.setItem(`focus-cms-${pageSlug}`, JSON.stringify({ sections, pageId, status })); } catch {}
      setSaveStatus(status === 'published' ? 'Published (offline)' : 'Draft saved (offline)');
      onSaved?.(sections, pageId);
    }
    setSaving(false);
    setTimeout(() => setSaveStatus(null), 2500);
  };

  // ---------- Media upload ----------

  const handleMediaUpload = async (file: File) => {
    try {
      const uploaded = await uploadMediaAssetRequest(file);
      setMediaAssets((prev) => [uploaded, ...prev]);
    } catch {
      const local: MediaAsset = {
        id: String(Date.now()),
        filename: file.name,
        original_name: file.name,
        mime_type: file.type,
        size_bytes: file.size,
        disk: 'browser',
        path: file.name,
        url: URL.createObjectURL(file),
      };
      setMediaAssets((prev) => [local, ...prev]);
    }
  };

  const applyMedia = (url: string) => {
    if (mediaTarget && selectedId) {
      if (mediaTarget === 'image') {
        updateSection(selectedId, { image: url });
      } else if (mediaTarget === 'slide') {
        const sec = sections.find(s => s.id === selectedId);
        if (sec) updateSection(selectedId, { slides: [...(sec.content.slides || []), url] });
      } else if (mediaTarget === 'bg-image') {
        updateSection(selectedId, { backgroundImage: url });
      }
    }
    setMediaOpen(false);
    setMediaTarget(null);
  };

  // ---------- Inline text editing ----------

  const handleInlineText = (sectionId: string, field: 'title' | 'subtitle' | 'bodyText' | 'buttonText', text: string) => {
    updateSection(sectionId, { [field]: text });
  };

  // CE props factory
  const editableProps = (sectionId: string, field: 'title' | 'subtitle' | 'bodyText' | 'buttonText'): React.HTMLAttributes<HTMLElement> => ({
    contentEditable: true,
    suppressContentEditableWarning: true,
    onBlur: (e: React.FocusEvent<HTMLElement>) => handleInlineText(sectionId, field, e.currentTarget.textContent || ''),
    onClick: (e: React.MouseEvent) => { e.stopPropagation(); setSelectedId(sectionId); setSidebarTab('settings'); },
    className: 'outline-none focus:ring-2 focus:ring-red-500/40 focus:rounded px-1 -mx-1 cursor-text',
    style: { minWidth: '1em' },
  });

  // ---------- Render one section ----------

  const renderSection = (section: PageSection) => {
    const content = section.content || {};
    const style = section.style || {} as SectionStyle;
    const textAlign = style.textAlign || 'center';
    const isSelected = selectedId === section.id;
    const isHovered = hoveredId === section.id;

    // Build background-image: combine custom gradient + bg image
    const bgParts: string[] = [];
    if (style.backgroundGradientFrom && style.backgroundGradientTo) {
      const dir = style.backgroundGradientDirection || 'to right';
      bgParts.push(`linear-gradient(${dir}, ${style.backgroundGradientFrom}, ${style.backgroundGradientTo})`);
    }
    if (style.backgroundImage) {
      bgParts.push(`url(${style.backgroundImage})`);
    }

    const imgFit = (style.imageFit || 'cover') as React.CSSProperties['objectFit'];
    const imgSizeMap: Record<string, string> = { full: 'w-full h-auto', thumbnail: 'w-48 h-48 mx-auto', medium: 'w-full h-72', auto: 'w-full h-72' };
    const imgClass = imgSizeMap[style.imageDisplay || 'auto'] || imgSizeMap.auto;

    const blockStyle: React.CSSProperties = {
      backgroundColor: style.backgroundColor || '#ffffff',
      color: style.textColor || '#0f172a',
      fontFamily: style.fontFamily || 'Inter',
      backgroundImage: bgParts.length > 0 ? bgParts.join(', ') : undefined,
      backgroundSize: (style.backgroundImage || bgParts.length) ? 'cover' : undefined,
      backgroundPosition: (style.backgroundImage || bgParts.length) ? 'center' : undefined,
    };

    return (
      <div
        key={section.id}
        className={`relative group ${dragId === section.id ? 'opacity-40 scale-[0.98]' : ''} transition-all`}
        onMouseEnter={() => setHoveredId(section.id)}
        onMouseLeave={() => setHoveredId(null)}
        draggable
        onDragStart={(e) => handleDragStart(e, section.id)}
        onDragEnd={handleDragEnd}
        onDragOver={(e) => handleDragOver(e, section.id)}
        onDrop={(e) => handleDrop(e, section.id)}
      >
        {/* Drop indicator line */}
        {dragOverId === section.id && dragId !== section.id && (
          <div className={`absolute left-4 right-4 z-40 h-1 bg-red-500 rounded-full shadow-lg shadow-red-500/50 transition-all ${dragOverPos === 'above' ? '-top-0.5' : '-bottom-0.5'}`} />
        )}

        {/* Outline overlay */}
        <div
          className={`absolute inset-0 z-20 pointer-events-none border-2 transition-all duration-200 ${
            isSelected
              ? 'border-red-500 shadow-[inset_0_0_0_1px_rgba(239,68,68,0.2)]'
              : isHovered
              ? 'border-blue-400/60 border-dashed'
              : 'border-transparent'
          }`}
        />

        {/* Section label badge */}
        {(isSelected || isHovered) && (
          <div className={`absolute top-0 left-0 z-30 text-xs font-bold px-2 py-1 rounded-br-lg ${isSelected ? 'bg-red-500 text-white' : 'bg-blue-400/80 text-white'}`}>
            {section.name || section.type}
          </div>
        )}

        {/* Floating toolbar for selected section */}
        {isSelected && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 px-2 py-1">
            <button onClick={() => moveSection(section.id, 'up')} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded" title="Move up"><ChevronUp className="w-4 h-4" /></button>
            <button onClick={() => moveSection(section.id, 'down')} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded" title="Move down"><ChevronDown className="w-4 h-4" /></button>
            <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />
            <button onClick={() => duplicateSection(section.id)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded" title="Duplicate"><Copy className="w-4 h-4" /></button>
            <button onClick={() => { setSelectedId(section.id); setSidebarTab('settings'); setSidebarOpen(true); }} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-red-500" title="Settings"><Pencil className="w-4 h-4" /></button>
            <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />
            <button onClick={() => deleteSection(section.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-red-500" title="Delete"><Trash2 className="w-4 h-4" /></button>
          </div>
        )}

        {/* Actual section content (click to select) */}
        <section
          onClick={(e) => {
            // Don't select if clicking contentEditable
            if ((e.target as HTMLElement).getAttribute('contenteditable') === 'true') return;
            setSelectedId(section.id);
            setSidebarTab('settings');
            setSidebarOpen(true);
          }}
          className={`relative ${style.height || 'h-auto'} ${style.padding || 'py-16'} overflow-hidden cursor-pointer`}
          style={blockStyle}
        >
          {style.backgroundGradient && !style.backgroundGradientFrom && (
            <div className={`absolute inset-0 bg-gradient-to-r ${style.backgroundGradient} opacity-90`} />
          )}

          <div className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col ${alignClassMap[textAlign] || alignClassMap.center}`}>
            {/* HERO / CTA */}
            {(section.type === 'hero' || section.type === 'cta') && (
              <>
                {content.title !== undefined && <h2 className="text-4xl md:text-5xl font-black mb-4 max-w-4xl" {...editableProps(section.id, 'title')}>{content.title}</h2>}
                {content.subtitle !== undefined && <p className="text-lg opacity-90 mb-8 max-w-3xl" {...editableProps(section.id, 'subtitle')}>{content.subtitle}</p>}
                {content.buttonText && <Button onClick={() => onNavigate?.('products')}>{content.buttonText}</Button>}
              </>
            )}

            {/* TEXT-IMAGE */}
            {section.type === 'text-image' && (
              <div className="w-full grid md:grid-cols-2 gap-8 items-center">
                <div>
                  {content.title !== undefined && <h3 className="text-3xl font-bold mb-4" {...editableProps(section.id, 'title')}>{content.title}</h3>}
                  {content.subtitle !== undefined && <p className="opacity-90 leading-relaxed mb-6" {...editableProps(section.id, 'subtitle')}>{content.subtitle}</p>}
                  {content.buttonText && <Button onClick={() => onNavigate?.('about')}>{content.buttonText}</Button>}
                </div>
                <div>
                  {content.image && <img src={content.image} alt={content.title || 'Section image'} className={`${imgClass} rounded-2xl shadow`} style={{ objectFit: imgFit }} />}
                </div>
              </div>
            )}

            {/* FEATURES */}
            {section.type === 'features' && (
              <div className="w-full">
                {content.title !== undefined && <h3 className="text-3xl font-bold mb-2" {...editableProps(section.id, 'title')}>{content.title}</h3>}
                {content.subtitle !== undefined && <p className="opacity-90 mb-8" {...editableProps(section.id, 'subtitle')}>{content.subtitle}</p>}
                <div className="grid md:grid-cols-3 gap-6">
                  {(content.features || []).map((feature, fi) => (
                    <div key={fi} className="p-6 rounded-xl bg-white/10 border border-white/20">
                      <h4 className="font-bold mb-2">{feature.title}</h4>
                      <p className="text-sm opacity-90">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIDEO */}
            {section.type === 'video' && (
              <div className="w-full max-w-4xl">
                {content.title !== undefined && <h3 className="text-3xl font-bold mb-6" {...editableProps(section.id, 'title')}>{content.title}</h3>}
                {content.videoUrl && (
                  <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow">
                    <iframe width="100%" height="100%" src={content.videoUrl} title={content.title || 'Video'} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowFullScreen />
                  </div>
                )}
              </div>
            )}

            {/* IMAGE */}
            {section.type === 'image' && (
              <div className="w-full max-w-4xl mx-auto">
                {content.image && <img src={content.image} alt={content.caption || 'Image'} className={`${style.imageDisplay === 'full' ? 'w-full h-auto' : style.imageDisplay === 'thumbnail' ? 'w-48 h-48 mx-auto' : 'w-full max-h-[600px]'} rounded-2xl shadow-lg`} style={{ objectFit: imgFit }} />}
                {content.caption !== undefined && <p className="text-sm opacity-70 mt-3 italic" {...editableProps(section.id, 'subtitle')}>{content.caption}</p>}
              </div>
            )}

            {/* TITLE */}
            {section.type === 'title' && (
              <div className="w-full max-w-4xl mx-auto">
                {content.headingLevel === 'h1' && content.title !== undefined && <h1 className="text-5xl md:text-6xl font-black mb-2" {...editableProps(section.id, 'title')}>{content.title}</h1>}
                {content.headingLevel === 'h2' && content.title !== undefined && <h2 className="text-4xl md:text-5xl font-bold mb-2" {...editableProps(section.id, 'title')}>{content.title}</h2>}
                {(content.headingLevel === 'h3' || !content.headingLevel) && content.title !== undefined && <h3 className="text-3xl font-bold mb-2" {...editableProps(section.id, 'title')}>{content.title}</h3>}
                {content.headingLevel === 'h4' && content.title !== undefined && <h4 className="text-2xl font-semibold mb-2" {...editableProps(section.id, 'title')}>{content.title}</h4>}
                {content.subtitle !== undefined && <p className="text-lg opacity-80" {...editableProps(section.id, 'subtitle')}>{content.subtitle}</p>}
              </div>
            )}

            {/* PARAGRAPH */}
            {section.type === 'paragraph' && (
              <div className="w-full max-w-3xl mx-auto">
                {content.bodyText !== undefined && <p className="text-base leading-relaxed opacity-90 whitespace-pre-line" {...editableProps(section.id, 'bodyText')}>{content.bodyText}</p>}
              </div>
            )}

            {/* SLIDESHOW */}
            {section.type === 'slideshow' && (
              <div className="w-full max-w-4xl mx-auto">
                {content.title !== undefined && <h3 className="text-3xl font-bold mb-6 text-center" {...editableProps(section.id, 'title')}>{content.title}</h3>}
                <SlideshowPreview slides={content.slides || []} />
              </div>
            )}

            {/* PRODUCT GRID */}
            {section.type === 'product-grid' && (
              <div className="w-full">
                {content.title !== undefined && <h3 className="text-3xl font-bold mb-2" {...editableProps(section.id, 'title')}>{content.title}</h3>}
                {content.subtitle !== undefined && <p className="opacity-90 mb-8" {...editableProps(section.id, 'subtitle')}>{content.subtitle}</p>}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {(content.productIds || []).map((pid) => {
                    const prod = PRODUCTS.find((p) => p.id === pid);
                    return prod ? (
                      <div key={pid} className="group/card bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-square bg-slate-50 dark:bg-slate-800 p-4 flex items-center justify-center">
                          <img src={prod.image} alt={prod.name} className="max-w-full max-h-full object-contain group-hover/card:scale-105 transition-transform" />
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-sm mb-1 line-clamp-2">{prod.name}</h4>
                          <p className="text-xs opacity-60 mb-2">{prod.brand}</p>
                          <p className="font-bold text-red-600">RM {prod.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* SPACER */}
            {section.type === 'spacer' && (
              <div style={{ height: content.spacerHeight || '60px' }} className="w-full flex items-center justify-center">
                <div className="border-t-2 border-dashed border-current/20 w-1/3" />
                <span className="text-xs opacity-30 mx-3">spacer</span>
                <div className="border-t-2 border-dashed border-current/20 w-1/3" />
              </div>
            )}

            {/* COLUMNS */}
            {section.type === 'columns' && (
              <div className={`w-full grid gap-6 ${(content.columnsData?.length || 3) <= 2 ? 'md:grid-cols-2' : (content.columnsData?.length || 3) >= 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
                {(content.columnsData || []).map((col, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden border border-white/10">
                    {col.image && <img src={col.image} alt={col.title} className="w-full h-48 object-cover" />}
                    <div className="p-6">
                      <h4 className="font-bold text-lg mb-2">{col.title}</h4>
                      <p className="text-sm opacity-80">{col.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Add section button between sections */}
        <div className="relative h-0 z-30">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const idx = sections.findIndex((s) => s.id === section.id);
                setInsertIndex(idx + 1);
                setSidebarTab('widgets');
                setSidebarOpen(true);
              }}
              className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg text-xs font-medium transition-all hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" /> Add Section
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ---------- Settings sidebar ----------

  const renderSettingsPanel = () => {
    if (!selected) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center">
          <MousePointer2 className="w-12 h-12 mb-4 opacity-20" />
          <p className="font-medium text-sm">Click a section on the page to edit it.</p>
        </div>
      );
    }
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">{selected.name}</h3>
          <p className="text-xs text-slate-500 capitalize">{selected.type} section</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Content fields */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><Type className="w-3 h-3" /> Content</h4>

            {selected.content.title !== undefined && (
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Heading</label>
                <input type="text" value={selected.content.title} onChange={(e) => updateSection(selected.id, { title: e.target.value })} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm dark:text-white" />
              </div>
            )}

            {selected.content.subtitle !== undefined && (
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Subtitle</label>
                <textarea rows={3} value={selected.content.subtitle} onChange={(e) => updateSection(selected.id, { subtitle: e.target.value })} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm dark:text-white" />
              </div>
            )}

            {selected.content.bodyText !== undefined && (
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Body Text</label>
                <textarea rows={6} value={selected.content.bodyText} onChange={(e) => updateSection(selected.id, { bodyText: e.target.value })} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm dark:text-white" />
              </div>
            )}

            {selected.content.headingLevel !== undefined && (
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Heading Level</label>
                <select value={selected.content.headingLevel} onChange={(e) => updateSection(selected.id, { headingLevel: e.target.value })} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm dark:text-white">
                  <option value="h1">H1 - Main Title</option><option value="h2">H2 - Section Title</option><option value="h3">H3 - Sub Title</option><option value="h4">H4 - Small Title</option>
                </select>
              </div>
            )}

            {selected.content.caption !== undefined && (
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Caption</label>
                <input type="text" value={selected.content.caption} onChange={(e) => updateSection(selected.id, { caption: e.target.value })} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm dark:text-white" />
              </div>
            )}

            {selected.content.buttonText !== undefined && (
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Button Label</label>
                <input type="text" value={selected.content.buttonText} onChange={(e) => updateSection(selected.id, { buttonText: e.target.value })} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm dark:text-white" />
              </div>
            )}

            {selected.content.image !== undefined && (
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Image</label>
                <div className="flex gap-2">
                  <input type="text" value={selected.content.image} onChange={(e) => updateSection(selected.id, { image: e.target.value })} className="flex-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs dark:text-white truncate" />
                  <button onClick={() => { setMediaTarget('image'); setMediaOpen(true); }} className="p-2 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-200"><LucideImage className="w-4 h-4 text-slate-500" /></button>
                </div>
                {selected.content.image && <img src={selected.content.image} alt="" className="mt-2 w-full h-24 object-cover rounded border" />}
              </div>
            )}

            {selected.content.videoUrl !== undefined && (
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Video URL (embed)</label>
                <input type="text" value={selected.content.videoUrl} onChange={(e) => updateSection(selected.id, { videoUrl: e.target.value })} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs dark:text-white" />
              </div>
            )}

            {selected.content.spacerHeight !== undefined && (
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Spacer Height</label>
                <select value={selected.content.spacerHeight} onChange={(e) => updateSection(selected.id, { spacerHeight: e.target.value })} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm dark:text-white">
                  <option value="20px">Small (20px)</option><option value="40px">Medium (40px)</option><option value="60px">Default (60px)</option><option value="80px">Large (80px)</option><option value="120px">Extra Large (120px)</option>
                </select>
              </div>
            )}

            {/* Slides */}
            {selected.content.slides !== undefined && (
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Slides ({selected.content.slides.length})</label>
                <div className="space-y-2">
                  {selected.content.slides.map((slide, idx) => (
                    <div key={idx} className="flex gap-2 items-start p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <img src={slide} alt={`Slide ${idx + 1}`} className="w-16 h-12 object-cover rounded flex-shrink-0 border border-slate-300 dark:border-slate-600" />
                      <div className="flex-1 min-w-0">
                        <input type="text" value={slide} onChange={(e) => { const ns = [...(selected.content.slides || [])]; ns[idx] = e.target.value; updateSection(selected.id, { slides: ns }); }} className="w-full p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-[10px] dark:text-white mb-1 truncate" />
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-slate-400 mr-auto">#{idx + 1}</span>
                          <button disabled={idx === 0} onClick={() => { const ns = [...(selected.content.slides || [])]; [ns[idx - 1], ns[idx]] = [ns[idx], ns[idx - 1]]; updateSection(selected.id, { slides: ns }); }} className="p-0.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded disabled:opacity-20" title="Move up"><ChevronUp className="w-3 h-3" /></button>
                          <button disabled={idx === (selected.content.slides || []).length - 1} onClick={() => { const ns = [...(selected.content.slides || [])]; [ns[idx], ns[idx + 1]] = [ns[idx + 1], ns[idx]]; updateSection(selected.id, { slides: ns }); }} className="p-0.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded disabled:opacity-20" title="Move down"><ChevronDown className="w-3 h-3" /></button>
                          <button onClick={() => { const ns = [...(selected.content.slides || [])]; ns.splice(idx, 1); updateSection(selected.id, { slides: ns }); }} className="p-0.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded" title="Remove"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <button onClick={() => updateSection(selected.id, { slides: [...(selected.content.slides || []), '/pdf-catalog/page-019/img-001.jpeg'] })} className="text-xs text-red-600 hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Add Slide</button>
                    <button onClick={() => { setMediaTarget('slide'); setMediaOpen(true); }} className="text-xs text-blue-600 hover:underline flex items-center gap-1"><LucideImage className="w-3 h-3" /> From Media</button>
                  </div>
                </div>
              </div>
            )}

            {/* Product IDs */}
            {selected.content.productIds !== undefined && (
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Products ({(selected.content.productIds || []).length})</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {(selected.content.productIds || []).map((pid, idx) => (
                    <div key={idx} className="flex gap-1">
                      <select value={pid} onChange={(e) => { const ni = [...(selected.content.productIds || [])]; ni[idx] = e.target.value; updateSection(selected.id, { productIds: ni }); }} className="flex-1 p-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs dark:text-white">
                        {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                      <button onClick={() => { const ni = [...(selected.content.productIds || [])]; ni.splice(idx, 1); updateSection(selected.id, { productIds: ni }); }} className="p-1 text-red-500"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <button onClick={() => updateSection(selected.id, { productIds: [...(selected.content.productIds || []), products[0]?.id || '1'] })} className="text-xs text-red-600 hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
                  <button onClick={() => updateSection(selected.id, { productIds: products.map((p) => p.id) })} className="text-xs text-red-600 hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Add All ({products.length})</button>
                  {(selected.content.productIds || []).length > 0 && (
                    <button onClick={() => updateSection(selected.id, { productIds: [] })} className="text-xs text-slate-400 hover:text-red-500 hover:underline flex items-center gap-1"><Trash2 className="w-3 h-3" /> Clear</button>
                  )}
                </div>
              </div>
            )}

            {/* Columns */}
            {selected.content.columnsData !== undefined && (
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Columns ({selected.content.columnsData.length})</label>
                <div className="space-y-3">
                  {(selected.content.columnsData || []).map((col, idx) => (
                    <div key={idx} className="p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 space-y-1">
                      <input type="text" placeholder="Title" value={col.title} onChange={(e) => { const nc = [...(selected.content.columnsData || [])]; nc[idx] = { ...nc[idx], title: e.target.value }; updateSection(selected.id, { columnsData: nc }); }} className="w-full p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-xs dark:text-white" />
                      <textarea rows={2} placeholder="Text" value={col.text} onChange={(e) => { const nc = [...(selected.content.columnsData || [])]; nc[idx] = { ...nc[idx], text: e.target.value }; updateSection(selected.id, { columnsData: nc }); }} className="w-full p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-xs dark:text-white" />
                      <div className="flex justify-end"><button onClick={() => { const nc = [...(selected.content.columnsData || [])]; nc.splice(idx, 1); updateSection(selected.id, { columnsData: nc }); }} className="text-xs text-red-500 flex items-center gap-1"><Trash2 className="w-3 h-3" /> Remove</button></div>
                    </div>
                  ))}
                  <button onClick={() => updateSection(selected.id, { columnsData: [...(selected.content.columnsData || []), { title: 'New Column', text: 'Column content' }] })} className="text-xs text-red-600 hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Add Column</button>
                </div>
              </div>
            )}

            {/* Features editor */}
            {selected.content.features !== undefined && (
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Features ({selected.content.features.length})</label>
                <div className="space-y-3">
                  {(selected.content.features || []).map((feat, idx) => (
                    <div key={idx} className="p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 space-y-1">
                      <input type="text" placeholder="Title" value={feat.title} onChange={(e) => { const nf = [...(selected.content.features || [])]; nf[idx] = { ...nf[idx], title: e.target.value }; updateSection(selected.id, { features: nf }); }} className="w-full p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-xs dark:text-white" />
                      <textarea rows={2} placeholder="Description" value={feat.desc} onChange={(e) => { const nf = [...(selected.content.features || [])]; nf[idx] = { ...nf[idx], desc: e.target.value }; updateSection(selected.id, { features: nf }); }} className="w-full p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-xs dark:text-white" />
                      <div className="flex justify-end"><button onClick={() => { const nf = [...(selected.content.features || [])]; nf.splice(idx, 1); updateSection(selected.id, { features: nf }); }} className="text-xs text-red-500 flex items-center gap-1"><Trash2 className="w-3 h-3" /> Remove</button></div>
                    </div>
                  ))}
                  <button onClick={() => updateSection(selected.id, { features: [...(selected.content.features || []), { title: 'New Feature', desc: 'Description', icon: 'check' }] })} className="text-xs text-red-600 hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Add Feature</button>
                </div>
              </div>
            )}
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* Appearance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><Palette className="w-3 h-3" /> Appearance</h4>
            <ColorPicker label="Background" value={selected.style.backgroundColor} onChange={(v) => updateSection(selected.id, { backgroundColor: v })} />
            <ColorPicker label="Text Color" value={selected.style.textColor} onChange={(v) => updateSection(selected.id, { textColor: v })} />

            {/* Background Image */}
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Background Image</label>
              <div className="flex gap-2">
                <input type="text" value={selected.style.backgroundImage || ''} onChange={(e) => updateSection(selected.id, { backgroundImage: e.target.value || undefined })} placeholder="None" className="flex-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs dark:text-white truncate" />
                <button onClick={() => { setMediaTarget('bg-image'); setMediaOpen(true); }} className="p-2 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-200"><LucideImage className="w-4 h-4 text-slate-500" /></button>
              </div>
              {selected.style.backgroundImage && (
                <div className="mt-2 relative">
                  <img src={selected.style.backgroundImage} alt="" className="w-full h-20 object-cover rounded border" />
                  <button onClick={() => updateSection(selected.id, { backgroundImage: undefined })} className="absolute top-1 right-1 p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600"><X className="w-3 h-3" /></button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Text Align</label>
              <div className="flex gap-1">
                {(['left', 'center', 'right'] as const).map((a) => (
                  <button key={a} onClick={() => updateSection(selected.id, { textAlign: a })} className={`flex-1 p-1.5 rounded text-xs font-medium border ${selected.style.textAlign === a ? 'bg-red-50 border-red-300 text-red-700 dark:bg-red-900/20 dark:border-red-700 dark:text-red-400' : 'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700'}`}>{a}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Padding</label>
              <select value={selected.style.padding} onChange={(e) => updateSection(selected.id, { padding: e.target.value })} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm dark:text-white">
                <option value="py-4">Compact</option><option value="py-8">Small</option><option value="py-12">Medium</option><option value="py-16">Default</option><option value="py-20">Large</option><option value="py-28">Extra Large</option>
              </select>
            </div>

            {/* Image Display & Fit */}
            {(selected.content.image !== undefined || selected.type === 'image' || selected.type === 'text-image' || selected.type === 'slideshow') && (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Image Display</label>
                  <div className="flex gap-1 flex-wrap">
                    {(['auto', 'full', 'medium', 'thumbnail'] as const).map((d) => (
                      <button key={d} onClick={() => updateSection(selected.id, { imageDisplay: d })} className={`flex-1 p-1.5 rounded text-xs font-medium border capitalize ${(selected.style.imageDisplay || 'auto') === d ? 'bg-red-50 border-red-300 text-red-700 dark:bg-red-900/20 dark:border-red-700 dark:text-red-400' : 'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700'}`}>{d}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Image Fit</label>
                  <div className="flex gap-1 flex-wrap">
                    {(['cover', 'contain', 'fill', 'none', 'scale-down'] as const).map((f) => (
                      <button key={f} onClick={() => updateSection(selected.id, { imageFit: f })} className={`px-2 py-1.5 rounded text-xs font-medium border capitalize ${(selected.style.imageFit || 'cover') === f ? 'bg-red-50 border-red-300 text-red-700 dark:bg-red-900/20 dark:border-red-700 dark:text-red-400' : 'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700'}`}>{f}</button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Gradient Preset */}
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Gradient Preset</label>
              <select value={selected.style.backgroundGradient || ''} onChange={(e) => updateSection(selected.id, { backgroundGradient: e.target.value })} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm dark:text-white">
                <option value="">None</option><option value="from-slate-900 to-slate-800">Dark Fade</option><option value="from-red-600 to-red-500">Crimson Glow</option><option value="from-orange-500 to-amber-500">Sunset</option><option value="from-blue-600 to-indigo-600">Ocean</option><option value="from-emerald-500 to-teal-500">Forest</option><option value="from-purple-600 to-pink-500">Neon</option><option value="from-gray-900 to-gray-700">Charcoal</option>
              </select>
            </div>

            {/* Custom Gradient */}
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Custom Gradient</label>
              <div className="space-y-2">
                <ColorPicker label="From" value={selected.style.backgroundGradientFrom || '#000000'} onChange={(v) => updateSection(selected.id, { backgroundGradientFrom: v })} />
                <ColorPicker label="To" value={selected.style.backgroundGradientTo || '#333333'} onChange={(v) => updateSection(selected.id, { backgroundGradientTo: v })} />
                <select value={selected.style.backgroundGradientDirection || ''} onChange={(e) => updateSection(selected.id, { backgroundGradientDirection: e.target.value })} className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs dark:text-white">
                  <option value="">Direction: Right</option><option value="to left">Left</option><option value="to right">Right</option><option value="to bottom">Down</option><option value="to top">Up</option><option value="to bottom right">Diagonal &#8600;</option><option value="to bottom left">Diagonal &#8601;</option><option value="to top right">Diagonal &#8599;</option><option value="to top left">Diagonal &#8598;</option>
                </select>
                {(selected.style.backgroundGradientFrom || selected.style.backgroundGradientTo) && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-6 rounded border" style={{ background: `linear-gradient(${selected.style.backgroundGradientDirection || 'to right'}, ${selected.style.backgroundGradientFrom || '#000'}, ${selected.style.backgroundGradientTo || '#333'})` }} />
                    <button onClick={() => updateSection(selected.id, { backgroundGradientFrom: undefined, backgroundGradientTo: undefined, backgroundGradientDirection: undefined } as any)} className="text-xs text-red-500 hover:underline">Clear</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Delete section */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800">
          <button onClick={() => deleteSection(selected.id)} className="w-full flex items-center justify-center gap-2 p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border border-red-200 dark:border-red-900/30 text-sm font-medium transition-colors">
            <Trash2 className="w-4 h-4" /> Delete Section
          </button>
        </div>
      </div>
    );
  };

  // ---------- Widgets panel ----------

  const renderWidgetsPanel = () => (
    <div className="p-4 space-y-4">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Add Widget</h4>
      {insertIndex !== null && (
        <p className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded">
          Inserting at position {insertIndex + 1}
          <button onClick={() => setInsertIndex(null)} className="ml-2 underline">Cancel</button>
        </p>
      )}
      <div className="grid grid-cols-2 gap-2">
        {WIDGET_LIST.map((w) => (
          <button
            key={w.type}
            onClick={() => addSection(w.type, insertIndex ?? undefined)}
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-red-400 hover:shadow-md hover:text-red-600 transition-all text-slate-600 dark:text-slate-400"
          >
            <w.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{w.label}</span>
          </button>
        ))}
      </div>

      <hr className="border-slate-200 dark:border-slate-800" />

      {/* Section order list */}
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sections ({sections.length})</h4>
      <div className="space-y-1">
        {sections.map((sec, idx) => (
          <div
            key={sec.id}
            onClick={() => { setSelectedId(sec.id); setSidebarTab('settings'); }}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors cursor-pointer ${
              selectedId === sec.id ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
            } ${dragOverId === sec.id && dragId !== sec.id ? (dragOverPos === 'above' ? 'border-t-2 border-t-red-500' : 'border-b-2 border-b-red-500') : ''} ${dragId === sec.id ? 'opacity-40' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e, sec.id)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, sec.id)}
            onDrop={(e) => handleDrop(e, sec.id)}
          >
            <GripVertical className="w-3 h-3 opacity-40 cursor-grab active:cursor-grabbing flex-shrink-0" />
            <span className="flex-1 truncate">{sec.name}</span>
            <span className="text-[10px] opacity-40 uppercase flex-shrink-0">{sec.type}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ---------- Media Library modal ----------

  const renderMediaLibrary = () =>
    mediaOpen ? (
      <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <h3 className="font-bold">Media Library</h3>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg cursor-pointer hover:bg-red-600">
                <Upload className="w-4 h-4" /> Upload
                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleMediaUpload(e.target.files[0])} />
              </label>
              <button onClick={() => setMediaOpen(false)} className="p-1"><X className="w-5 h-5" /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 grid grid-cols-4 gap-3">
            {mediaAssets.map((asset) => (
              <button key={asset.id} onClick={() => applyMedia(asset.url)} className="group aspect-square rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-red-500 overflow-hidden transition-all">
                <img src={asset.url} alt={asset.original_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </button>
            ))}
            {mediaAssets.length === 0 && (
              <div className="col-span-4 text-center py-12 text-slate-400">
                <p>No media yet. Upload an image to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    ) : null;

  // =================================================================
  // RENDER
  // =================================================================

  return (
    <div ref={containerRef} className="relative">
      {/* Top toolbar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button onClick={onExit} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" title="Exit editor">
            <X className="w-5 h-5 text-slate-500" />
          </button>
          <div className="border-l border-slate-200 dark:border-slate-700 h-8 mx-1" />
          <div>
            <h1 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              Editing: {pageTitle}
            </h1>
            <p className="text-xs text-slate-500">/{pageSlug}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saveStatus && (
            <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full animate-in fade-in">
              {saveStatus}
            </span>
          )}
          <button
            onClick={() => { setSidebarOpen(!sidebarOpen); }}
            className={`p-2 rounded-lg transition-colors ${sidebarOpen ? 'bg-red-50 text-red-600 dark:bg-red-900/20' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500'}`}
            title="Toggle sidebar"
          >
            <Columns className="w-4 h-4" />
          </button>
          <Button size="sm" variant="outline" className="gap-1.5" onClick={() => handleSave('draft')} disabled={saving}>
            <Save className="w-3.5 h-3.5" /> {saving ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button size="sm" className="gap-1.5" onClick={() => handleSave('published')} disabled={saving}>
            <Save className="w-3.5 h-3.5" /> {saving ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>

      {/* Right sidebar */}
      <div className={`fixed top-14 right-0 bottom-0 z-50 w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-xl transition-transform duration-300 flex flex-col ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setSidebarTab('widgets')}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${sidebarTab === 'widgets' ? 'text-red-600 border-b-2 border-red-500' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Widgets
          </button>
          <button
            onClick={() => setSidebarTab('settings')}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${sidebarTab === 'settings' ? 'text-red-600 border-b-2 border-red-500' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Settings
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {sidebarTab === 'settings' ? renderSettingsPanel() : renderWidgetsPanel()}
        </div>
      </div>

      {/* Page content with inline sections */}
      <div className={`pt-14 transition-all duration-300 ${sidebarOpen ? 'mr-80' : 'mr-0'}`}>
        {/* Add section at top */}
        {sections.length === 0 ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-300 dark:border-slate-700 m-8 rounded-2xl">
            <LayoutTemplate className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg font-medium mb-2">This page is empty</p>
            <p className="text-sm mb-6">Start building by adding your first section</p>
            <Button onClick={() => { setSidebarTab('widgets'); setSidebarOpen(true); }} className="gap-2">
              <Plus className="w-4 h-4" /> Add First Section
            </Button>
          </div>
        ) : (
          <>
            {/* Sections */}
            {sections.map((section) => renderSection(section))}

            {/* Add at bottom */}
            <div className="py-8 flex justify-center border-t-2 border-dashed border-slate-200 dark:border-slate-800 mx-4">
              <button
                onClick={() => { setInsertIndex(null); setSidebarTab('widgets'); setSidebarOpen(true); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-600 dark:text-slate-400 hover:text-red-600 rounded-full border border-dashed border-slate-300 dark:border-slate-700 hover:border-red-400 transition-all font-medium text-sm"
              >
                <Plus className="w-4 h-4" /> Add Section
              </button>
            </div>
          </>
        )}
      </div>

      {/* Media library modal */}
      {renderMediaLibrary()}

      {/* Click-away handler for deselecting */}
      {selectedId && (
        <div
          className="fixed inset-0 z-[1]"
          onClick={() => setSelectedId(null)}
          style={{ pointerEvents: 'none' }}
        />
      )}
    </div>
  );
};
