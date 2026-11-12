import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, MessageSquare } from 'lucide-react';
import { ChurchStateService } from '../services/churchState';
import { BibleVerseBanner } from '../components/common/BibleVerseBanner';

export const EventsPage: React.FC = () => {
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
            <Calendar className="w-3.5 h-3.5" />
            <span>Calendar</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Events & Announcements
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Upcoming worship programs, special prayer meetings, and church celebrations.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {config.events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl overflow-hidden shadow-soft border border-slate-200/80 flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden bg-slate-100 relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-white/90 text-church-primary text-[10px] font-bold shadow-xs">
                    {event.tag}
                  </span>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="text-[11px] font-semibold text-church-gold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{event.date} • {event.time}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-church-primary font-bold text-xs uppercase tracking-wider bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Contact About Event</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BibleVerseBanner />
    </div>
  );
};
