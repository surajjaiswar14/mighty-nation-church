import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ChurchLogo } from '../common/ChurchLogo';
import { 
  Menu, 
  X, 
  Video, 
  Clock, 
  MapPin, 
  ChevronRight,
  Sparkles,
  Heart
} from 'lucide-react';
import { ChurchStateService } from '../../services/churchState';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [config, setConfig] = useState(ChurchStateService.getConfig());
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return ChurchStateService.subscribe(() => {
      setConfig(ChurchStateService.getConfig());
    });
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Clean, focused navigation without Sermons
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'History', path: '/history' },
    { name: 'Leadership', path: '/leadership' },
    { name: 'Ministries', path: '/ministries' },
    { name: 'Services', path: '/services' },
    { name: 'Online Prayer', path: '/online-prayer' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Peaceful Top Notification Bar */}
      <div className="bg-gradient-to-r from-sky-900 via-blue-900 to-sky-950 text-white text-[11px] sm:text-xs py-1.5 px-4 border-b border-sky-800/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 text-sky-200">
              <MapPin className="w-3 h-3 text-church-goldWarm" />
              <span>Wadala, Mumbai</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-sky-200">
              <Clock className="w-3 h-3 text-church-goldWarm" />
              <span>Sunday: {config.services.sunday.time}</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-sky-200">
              <span>Friday Fasting: {config.services.friday.time}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-sky-200">
            <Link 
              to="/prayer-request" 
              className="hover:text-amber-200 transition-colors flex items-center gap-1 font-medium"
            >
              <Heart className="w-3 h-3 text-rose-300" />
              <span>Prayer Request</span>
            </Link>
            <span className="text-sky-600">|</span>
            <Link 
              to="/admin" 
              className="text-slate-300 hover:text-white transition-colors text-[10px]"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-soft border-b border-slate-200/80 py-2.5' 
            : 'bg-white/95 backdrop-blur-sm border-b border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Church Logo */}
            <ChurchLogo size="md" />

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                      isActive
                        ? 'text-church-primary bg-sky-50 shadow-xs border border-sky-200/60'
                        : 'text-slate-600 hover:text-church-primary hover:bg-slate-50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Prominent Attractive "Join Online Prayer" Button */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/online-prayer"
                className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-sky-500 via-blue-600 to-church-primary hover:from-sky-600 hover:to-blue-700 shadow-peaceful hover:shadow-divine transition-all duration-300 active:scale-95"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
                <Video className="w-3.5 h-3.5 text-sky-100" />
                <span>Join Online Prayer</span>
              </Link>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                to="/online-prayer"
                className="sm:hidden inline-flex items-center justify-center p-2 rounded-full bg-gradient-to-r from-sky-500 to-church-primary text-white shadow-sm"
                title="Join Online Prayer"
              >
                <Video className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-xl text-slate-700 hover:text-church-primary hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-md border-b border-slate-200 shadow-xl transition-all duration-200">
            <div className="max-w-7xl mx-auto px-4 pt-3 pb-6 space-y-1">
              <div className="bg-sky-50/80 p-3 rounded-2xl border border-sky-100 mb-3 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-church-gold shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700">
                  <p className="font-bold text-church-navy">Mighty Nation Church • Wadala</p>
                  <p className="text-slate-500 text-[11px]">Sunday: {config.services.sunday.time} • Friday: {config.services.friday.time}</p>
                </div>
              </div>

              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-church-primary bg-sky-50 font-bold border-l-4 border-church-primary'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-church-primary'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </NavLink>
              ))}

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  to="/online-prayer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-white font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-sky-500 to-church-primary shadow-sm"
                >
                  <Video className="w-4 h-4" />
                  <span>Join Online Prayer</span>
                </Link>

                <Link
                  to="/prayer-request"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-church-primary font-semibold text-xs uppercase tracking-wider bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>Request Prayer</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
