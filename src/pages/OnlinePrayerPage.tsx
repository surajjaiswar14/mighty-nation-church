import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Video, 
  Clock, 
  MessageSquare, 
  Heart, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { ChurchStateService } from '../services/churchState';
import { BibleVerseBanner } from '../components/common/BibleVerseBanner';

export const OnlinePrayerPage: React.FC = () => {
  const [config, setConfig] = useState(ChurchStateService.getConfig());

  useEffect(() => {
    return ChurchStateService.subscribe(() => {
      setConfig(ChurchStateService.getConfig());
    });
  }, []);

  const hasValidMeetingLink = Boolean(
    config.onlinePrayer.meetingLink && 
    config.onlinePrayer.meetingLink.trim().length > 5 &&
    !config.onlinePrayer.meetingLink.includes('placeholder')
  );

  return (
    <div className="w-full">
      {/* Peaceful Header */}
      <section className="py-14 sm:py-18 bg-gradient-to-b from-sky-100/60 via-sky-50/40 to-white text-center px-4">
        <div className="max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-church-primary text-xs font-semibold uppercase tracking-wider border border-sky-200">
            <Video className="w-3.5 h-3.5" />
            <span>Online Gathering</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            {config.onlinePrayer.heading}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            "{config.onlinePrayer.description}"
          </p>
        </div>
      </section>

      {/* Main Prayer Card & Schedule */}
      <section className="py-12 sm:py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-sky-100 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Schedule */}
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 space-y-1">
              <span className="text-[10px] font-bold text-church-primary uppercase tracking-wider block">
                Prayer Timing
              </span>
              <p className="font-serif text-lg font-bold text-slate-900">
                {config.onlinePrayer.schedule}
              </p>
              <p className="text-[11px] text-slate-500">
                Daily prayer schedule
              </p>
            </div>

            {/* Platform */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 space-y-1">
              <span className="text-[10px] font-bold text-church-gold uppercase tracking-wider block">
                Meeting Platform
              </span>
              <p className="font-serif text-lg font-bold text-slate-900">
                {config.onlinePrayer.platform}
              </p>
              <p className="text-[11px] text-slate-500">
                Video / Audio gathering
              </p>
            </div>
          </div>

          {/* Meeting Link or Safe Fallback */}
          <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50">
            {hasValidMeetingLink ? (
              <div className="space-y-3 text-center sm:text-left">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Online Prayer Room is Active</span>
                </div>
                <a
                  href={config.onlinePrayer.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Video className="w-4 h-4" />
                  <span>Join Online Prayer Room</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                  Meeting Access Notice
                </span>
                <p className="text-sm font-semibold text-slate-900">
                  {config.onlinePrayer.fallbackMessage}
                </p>
                <div className="flex flex-wrap gap-2.5 pt-1">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-church-primary text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-800 transition-colors shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Contact Us for Meeting Link</span>
                  </Link>

                  <Link
                    to="/prayer-request"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-church-primary font-bold text-xs uppercase tracking-wider border border-sky-200 hover:bg-sky-50 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    <span>Submit Prayer Request</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <BibleVerseBanner />
    </div>
  );
};
