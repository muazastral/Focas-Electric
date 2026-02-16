import React, { useState } from 'react';
import { Button } from './Button';
import { PRODUCTS } from '../constants';

interface CmsSectionStyle {
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundGradient?: string;
  backgroundGradientFrom?: string;
  backgroundGradientTo?: string;
  backgroundGradientDirection?: string;
  textColor?: string;
  fontFamily?: 'Inter' | 'Roboto' | 'Serif' | 'Mono';
  height?: string;
  textAlign?: 'left' | 'center' | 'right';
  padding?: string;
  imageFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  imageDisplay?: 'full' | 'thumbnail' | 'medium' | 'auto';
}

interface CmsSectionContent {
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

interface CmsSection {
  id?: string;
  type: 'hero' | 'features' | 'text-image' | 'video' | 'cta' | 'image' | 'title' | 'paragraph' | 'slideshow' | 'product-grid' | 'spacer' | 'columns';
  name?: string;
  content?: CmsSectionContent;
  style?: CmsSectionStyle;
}

interface CmsPageRendererProps {
  sections: CmsSection[];
  onNavigate?: (page: string) => void;
}

const SlideshowSection: React.FC<{ content: CmsSectionContent }> = ({ content }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = content.slides || [];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {content.title && <h3 className="text-3xl font-bold mb-6 text-center">{content.title}</h3>}
      {slides.length > 0 && (
        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src={slides[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              className="w-full h-80 md:h-[450px] object-cover transition-all duration-500"
            />
          </div>
          {slides.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-red-600 scale-125' : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'}`}
                />
              ))}
            </div>
          )}
          {slides.length > 1 && (
            <>
              <button onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-black/60 flex items-center justify-center text-slate-700 dark:text-white shadow hover:bg-white">&#8249;</button>
              <button onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-black/60 flex items-center justify-center text-slate-700 dark:text-white shadow hover:bg-white">&#8250;</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const alignClassMap = {
  left: 'items-start text-left',
  center: 'items-center text-center',
  right: 'items-end text-right',
} as const;

export const CmsPageRenderer: React.FC<CmsPageRendererProps> = ({ sections, onNavigate }) => {
  return (
    <>
      {sections.map((section, index) => {
        const content = section.content || {};
        const style = section.style || {};
        const textAlign = style.textAlign || 'center';

        // Build composite background-image
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
          <section
            key={section.id || `${section.type}-${index}`}
            className={`relative ${style.height || 'h-auto'} ${style.padding || 'py-16'} overflow-hidden`}
            style={blockStyle}
          >
            {style.backgroundGradient && !style.backgroundGradientFrom && (
              <div className={`absolute inset-0 bg-gradient-to-r ${style.backgroundGradient} opacity-90`} />
            )}

            <div className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col ${alignClassMap[textAlign] || alignClassMap.center}`}>
              {(section.type === 'hero' || section.type === 'cta') && (
                <>
                  {content.title && <h2 className="text-4xl md:text-5xl font-black mb-4 max-w-4xl">{content.title}</h2>}
                  {content.subtitle && <p className="text-lg opacity-90 mb-8 max-w-3xl">{content.subtitle}</p>}
                  {content.buttonText && (
                    <Button onClick={() => onNavigate?.('products')}>{content.buttonText}</Button>
                  )}
                </>
              )}

              {section.type === 'text-image' && (
                <div className="w-full grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    {content.title && <h3 className="text-3xl font-bold mb-4">{content.title}</h3>}
                    {content.subtitle && <p className="opacity-90 leading-relaxed mb-6">{content.subtitle}</p>}
                    {content.buttonText && <Button onClick={() => onNavigate?.('about')}>{content.buttonText}</Button>}
                  </div>
                  <div>
                    {content.image && (
                      <img src={content.image} alt={content.title || 'Section image'} className={`${imgClass} rounded-2xl shadow`} style={{ objectFit: imgFit }} />
                    )}
                  </div>
                </div>
              )}

              {section.type === 'features' && (
                <div className="w-full">
                  {content.title && <h3 className="text-3xl font-bold mb-2">{content.title}</h3>}
                  {content.subtitle && <p className="opacity-90 mb-8">{content.subtitle}</p>}
                  <div className="grid md:grid-cols-3 gap-6">
                    {(content.features || []).map((feature, featureIndex) => (
                      <div key={`${feature.title}-${featureIndex}`} className="p-6 rounded-xl bg-white/10 border border-white/20">
                        <h4 className="font-bold mb-2">{feature.title}</h4>
                        <p className="text-sm opacity-90">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {section.type === 'video' && (
                <div className="w-full max-w-4xl">
                  {content.title && <h3 className="text-3xl font-bold mb-6">{content.title}</h3>}
                  {content.videoUrl && (
                    <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow">
                      <iframe
                        width="100%"
                        height="100%"
                        src={content.videoUrl}
                        title={content.title || 'CMS video'}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              )}

              {section.type === 'image' && (
                <div className="w-full max-w-4xl mx-auto">
                  {content.image && <img src={content.image} alt={content.caption || 'Image'} className={`${style.imageDisplay === 'full' ? 'w-full h-auto' : style.imageDisplay === 'thumbnail' ? 'w-48 h-48 mx-auto' : 'w-full max-h-[600px]'} rounded-2xl shadow-lg`} style={{ objectFit: imgFit }} />}
                  {content.caption && <p className="text-sm opacity-70 mt-3 italic">{content.caption}</p>}
                </div>
              )}

              {section.type === 'title' && (
                <div className="w-full max-w-4xl mx-auto">
                  {content.headingLevel === 'h1' && content.title && <h1 className="text-5xl md:text-6xl font-black mb-2">{content.title}</h1>}
                  {content.headingLevel === 'h2' && content.title && <h2 className="text-4xl md:text-5xl font-bold mb-2">{content.title}</h2>}
                  {(content.headingLevel === 'h3' || !content.headingLevel) && content.title && <h3 className="text-3xl font-bold mb-2">{content.title}</h3>}
                  {content.headingLevel === 'h4' && content.title && <h4 className="text-2xl font-semibold mb-2">{content.title}</h4>}
                  {content.subtitle && <p className="text-lg opacity-80">{content.subtitle}</p>}
                </div>
              )}

              {section.type === 'paragraph' && (
                <div className="w-full max-w-3xl mx-auto">
                  {content.bodyText && <p className="text-base leading-relaxed opacity-90 whitespace-pre-line">{content.bodyText}</p>}
                </div>
              )}

              {section.type === 'slideshow' && <SlideshowSection content={content} />}

              {section.type === 'product-grid' && (
                <div className="w-full">
                  {content.title && <h3 className="text-3xl font-bold mb-2">{content.title}</h3>}
                  {content.subtitle && <p className="opacity-90 mb-8">{content.subtitle}</p>}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {(content.productIds || []).map((pid) => {
                      const prod = PRODUCTS.find(p => p.id === pid);
                      return prod ? (
                        <div key={pid} className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="aspect-square bg-slate-50 dark:bg-slate-800 p-4 flex items-center justify-center">
                            <img src={prod.image} alt={prod.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
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

              {section.type === 'spacer' && (
                <div style={{ height: content.spacerHeight || '60px' }} />
              )}

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
        );
      })}
    </>
  );
};
