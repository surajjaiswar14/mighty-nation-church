import React, { useState, useEffect } from 'react';
import { Images, Maximize2 } from 'lucide-react';
import { ChurchStateService } from '../services/churchState';
import { Lightbox } from '../components/common/Lightbox';
import { BibleVerseBanner } from '../components/common/BibleVerseBanner';

export const GalleryPage: React.FC = () => {
  const [config, setConfig] = useState(ChurchStateService.getConfig());
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    return ChurchStateService.subscribe(() => {
      setConfig(ChurchStateService.getConfig());
    });
  }, []);

  const filteredItems = activeCategory === 'All'
    ? config.galleryItems
    : config.galleryItems.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="w-full">
      {/* Peaceful Header */}
      <section className="py-14 sm:py-18 bg-gradient-to-b from-sky-100/60 via-sky-50/40 to-white text-center px-4">
        <div className="max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-church-primary text-xs font-semibold uppercase tracking-wider border border-sky-200">
            <Images className="w-3.5 h-3.5" />
            <span>Moments</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Church Photo Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Glimpses of worship, prayer, and fellowship at Mighty Nation Church.
          </p>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {config.galleryCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === category
                  ? 'bg-church-primary text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-soft border border-slate-200 transition-all cursor-pointer flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3 text-white">
                  <span className="text-[10px] font-semibold">{item.category}</span>
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="p-3">
                <h3 className="font-serif text-xs font-bold text-slate-900 truncate">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={filteredItems}
        currentIndex={currentImageIndex}
        onNavigate={(idx) => setCurrentImageIndex(idx)}
      />

      <BibleVerseBanner />
    </div>
  );
};
