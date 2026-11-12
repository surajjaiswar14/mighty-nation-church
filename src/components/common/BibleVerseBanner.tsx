import React from 'react';
import { ChurchStateService } from '../../services/churchState';

export const BibleVerseBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  const config = ChurchStateService.getConfig();

  return (
    <section className={`relative overflow-hidden py-10 px-4 bg-gradient-to-r from-sky-50 via-white to-blue-50 text-slate-800 border-y border-sky-100 ${className}`}>
      <div className="relative max-w-4xl mx-auto text-center space-y-2">
        <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-slate-800 font-medium leading-relaxed italic">
          "{config.scripture.verse}"
        </blockquote>

        <p className="text-church-primary font-sans font-bold text-sm sm:text-base tracking-wider">
          — {config.scripture.reference}
        </p>
      </div>
    </section>
  );
};
