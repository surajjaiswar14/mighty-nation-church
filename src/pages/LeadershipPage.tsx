import React, { useState, useEffect } from 'react';
import { ChurchStateService } from '../services/churchState';
import { BibleVerseBanner } from '../components/common/BibleVerseBanner';

export const LeadershipPage: React.FC = () => {
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
            Leadership
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Founders & Church Leadership
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Servants of Christ leading Mighty Nation Church with faithful biblical teaching and prayer.
          </p>
        </div>
      </section>

      {/* Leadership Profile Cards */}
      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {config.leadership.map((leader) => (
            <div
              key={leader.id}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-soft border border-slate-200/80 flex flex-col sm:flex-row gap-5 items-center sm:items-start"
            >
              {/* Photo */}
              <div className="w-36 h-44 shrink-0 rounded-xl overflow-hidden bg-slate-100 shadow-xs">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Details */}
              <div className="flex-1 space-y-2 text-center sm:text-left">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-church-primary border border-sky-100">
                  {leader.designation}
                </span>

                <h3 className="font-serif text-xl font-bold text-slate-900">
                  {leader.name}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {leader.bio}
                </p>

                {leader.bookletNote && (
                  <p className="text-[11px] text-amber-800 font-medium pt-1">
                    ℹ️ {leader.bookletNote}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <BibleVerseBanner />
    </div>
  );
};
