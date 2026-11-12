import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChurchLogo } from '../common/ChurchLogo';
import { 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowUp,
  ExternalLink
} from 'lucide-react';
import { ChurchStateService } from '../../services/churchState';

export const Footer: React.FC = () => {
  const [config, setConfig] = useState(ChurchStateService.getConfig());

  useEffect(() => {
    return ChurchStateService.subscribe(() => {
      setConfig(ChurchStateService.getConfig());
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 relative border-t-2 border-sky-600/30">
      {/* Peaceful Scripture Accent */}
      <div className="bg-sky-950/70 py-3.5 px-4 text-center border-b border-sky-800/30">
        <p className="text-xs sm:text-sm font-serif italic text-sky-200">
          "{config.scripture.verse}" — <span className="font-sans font-semibold text-amber-300">{config.scripture.reference}</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Identity */}
          <div className="space-y-3">
            <ChurchLogo size="md" lightText={true} />
            <p className="text-xs text-amber-300 font-medium tracking-wide">
              "{config.tagline}"
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              A peaceful, Christ-centered church family in East Wadala, Mumbai, devoted to prayer, worship, and spiritual growth.
            </p>
          </div>

          {/* Col 2: Navigation Links (No Sermons) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-300">
              Quick Links
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us & Beliefs</Link></li>
              <li><Link to="/history" className="hover:text-white transition-colors">Church History</Link></li>
              <li><Link to="/leadership" className="hover:text-white transition-colors">Leadership</Link></li>
              <li><Link to="/ministries" className="hover:text-white transition-colors">Ministries & Worship</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Service Timings</Link></li>
              <li><Link to="/online-prayer" className="hover:text-amber-300 transition-colors font-medium text-sky-300">Join Online Prayer</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Photo Gallery</Link></li>
              <li><Link to="/prayer-request" className="hover:text-white transition-colors">Submit Prayer Request</Link></li>
            </ul>
          </div>

          {/* Col 3: Service Times */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-300">
              Worship Timings
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <span className="text-[11px] font-bold text-amber-300 block">{config.services.sunday.name}</span>
                <span className="text-white font-medium">{config.services.sunday.time}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <span className="text-[11px] font-bold text-sky-300 block">{config.services.friday.name}</span>
                <span className="text-white font-medium">{config.services.friday.time}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Location */}
          <div className="space-y-3 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-300">
              Church Location
            </h3>
            <div className="flex items-start gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-church-goldWarm shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {config.location.fullAddress}
              </p>
            </div>
            <div className="pt-1">
              <a
                href={config.location.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-sky-300 hover:text-white underline underline-offset-4"
              >
                <span>View Google Maps Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Mighty Nation Church • Wadala, Mumbai</p>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-slate-400 hover:text-white flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Admin Login</span>
            </Link>
            <button
              onClick={scrollToTop}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
