import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ExternalLink } from 'lucide-react';
import { ChurchStateService } from '../services/churchState';
import { ServiceCards } from '../components/common/ServiceCards';
import { BibleVerseBanner } from '../components/common/BibleVerseBanner';

export const ServicesPage: React.FC = () => {
  const [config, setConfig] = useState(ChurchStateService.getConfig());

  useEffect(() => {
    return ChurchStateService.subscribe(() => {
      setConfig(ChurchStateService.getConfig());
    });
  }, []);

  return (
    <div className="w-full">
      {/* Peaceful Header */}
      <section className="py-14 sm:py-18 bg-gradient-to-b from-sky-100/60 via-sky-50/40 to-white text-center px-4">
        <div className="max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-church-primary text-xs font-semibold uppercase tracking-wider border border-sky-200">
            Worship Times
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Our Weekly Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            "Enter into His gates with thanksgiving, and into His courts with praise."
          </p>
        </div>
      </section>

      {/* Main Service Cards Section */}
      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceCards showDirectionsBtn={false} />
      </section>

      {/* What to Expect (Simple 3 points) */}
      <section className="py-12 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 space-y-1">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Visiting for the First Time?
            </h2>
            <p className="text-xs text-slate-500">
              Here is what you can expect during our services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 space-y-2">
              <span className="w-7 h-7 rounded-full bg-sky-100 text-church-primary font-bold text-xs flex items-center justify-center">1</span>
              <h3 className="font-serif text-base font-bold text-slate-900">Loving Welcome</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                You will be warmly greeted. Everyone is welcomed as family in God's house.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 space-y-2">
              <span className="w-7 h-7 rounded-full bg-sky-100 text-church-primary font-bold text-xs flex items-center justify-center">2</span>
              <h3 className="font-serif text-base font-bold text-slate-900">Joyful Worship</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Heartfelt praise that glorifies Christ and prepares our hearts to seek God.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 space-y-2">
              <span className="w-7 h-7 rounded-full bg-sky-100 text-church-primary font-bold text-xs flex items-center justify-center">3</span>
              <h3 className="font-serif text-base font-bold text-slate-900">Biblical Preaching</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Practical, Scripture-based teaching that strengthens your daily walk with God.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Link */}
      <section className="py-10 max-w-4xl mx-auto px-4 text-center">
        <a
          href={config.location.googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-church-primary hover:underline"
        >
          <MapPin className="w-4 h-4 text-church-gold" />
          <span>Church Address: {config.location.fullAddress} (Open Google Maps)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </section>

      <BibleVerseBanner />
    </div>
  );
};
