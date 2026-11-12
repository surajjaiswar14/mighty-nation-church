import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Info, ArrowRight } from 'lucide-react';
import { ChurchStateService } from '../services/churchState';
import { BibleVerseBanner } from '../components/common/BibleVerseBanner';

export const HistoryPage: React.FC = () => {
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
            Historical Milestones
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Our Church History & Heritage
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Documented ministry initiatives from the church history booklet founded by Pastor John & Priscilla Gladstone.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative border-l-2 border-sky-200 ml-4 sm:ml-24 space-y-10">
          {config.historyTimeline.map((item, index) => (
            <div key={index} className="relative">
              {/* Year badge */}
              <div className="sm:absolute sm:-left-28 sm:top-1 text-left sm:text-right pr-4 mb-2 sm:mb-0">
                <span className="font-serif text-2xl font-bold text-church-primary block">
                  {item.year}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {item.category}
                </span>
              </div>

              {/* Node dot */}
              <div className="absolute -left-[13px] top-2 w-6 h-6 rounded-full bg-white border-4 border-church-primary shadow-xs"></div>

              {/* Card */}
              <div className="ml-6 bg-white rounded-2xl p-5 sm:p-6 shadow-soft border border-slate-200/80 flex flex-col sm:flex-row gap-5 items-center">
                <div className="flex-1 space-y-2">
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="w-full sm:w-44 h-32 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note from booklet */}
        <div className="mt-12 p-4 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-slate-600 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-church-primary shrink-0 mt-0.5" />
          <span>
            These historical milestones represent documented ministry initiatives from the church history booklet. We present them faithfully according to church records.
          </span>
        </div>
      </section>

      <BibleVerseBanner />
    </div>
  );
};
