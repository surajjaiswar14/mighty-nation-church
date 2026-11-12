import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  MapPin, 
  Heart, 
  Video, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ChurchStateService } from '../services/churchState';
import { BibleVerseBanner } from '../components/common/BibleVerseBanner';
import { ServiceCards } from '../components/common/ServiceCards';
import { Lightbox } from '../components/common/Lightbox';

export const HomePage: React.FC = () => {
  const [config, setConfig] = useState(ChurchStateService.getConfig());
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    return ChurchStateService.subscribe(() => {
      setConfig(ChurchStateService.getConfig());
    });
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="w-full">
      {/* 1. HERO SECTION - Light, Serene & Calming */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-sky-100/70 via-sky-50/50 to-white overflow-hidden py-16 px-4">
        {/* Soft background glow and ethereal overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Wadala Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-sky-200/70 text-church-primary text-xs font-semibold tracking-wide mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-church-gold" />
            <span>Mighty Nation Church • Wadala, Mumbai</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight mb-4">
            Welcome to <br />
            <span className="sky-gradient-text">Mighty Nation Church</span>
          </h1>

          {/* Subheading */}
          <p className="font-serif text-lg sm:text-2xl text-slate-700 italic font-medium mb-3">
            "{config.tagline}"
          </p>

          {/* Concise Description */}
          <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed mb-6">
            Come together in God's presence, experience His love, grow in faith, and become part of our church family.
          </p>

          {/* Clean Service Times Card at a glance */}
          <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl border border-sky-100 p-4 mb-8 shadow-soft">
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="border-r border-slate-100 pr-3">
                <span className="text-[10px] font-bold text-church-gold uppercase tracking-wider block">
                  Sunday Worship
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-900">
                  {config.services.sunday.time}
                </span>
              </div>
              <div className="pl-1">
                <span className="text-[10px] font-bold text-church-secondary uppercase tracking-wider block">
                  Friday Fasting
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-900">
                  {config.services.friday.time}
                </span>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-church-primary hover:bg-blue-800 shadow-soft transition-all active:scale-95"
            >
              <span>Join Us This Sunday</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/prayer-request"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider text-church-primary bg-white hover:bg-sky-50 border border-sky-200 shadow-xs transition-all active:scale-95"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Request Prayer</span>
            </Link>

            <Link
              to="/online-prayer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-all"
            >
              <Video className="w-3.5 h-3.5 text-church-gold" />
              <span>Online Prayer</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. BIBLE VERSE SECTION */}
      <BibleVerseBanner />

      {/* 3. WELCOME MESSAGE SECTION - Simple & Heartfelt */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-church-primary bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              Welcome
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              A Warm Welcome in <span className="text-church-primary">Christ Jesus</span>
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              We welcome you warmly to Mighty Nation Church in Wadala, Mumbai. Whether you are exploring faith or looking for a praying congregation, you are family here.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              We gather to experience God's transformative presence through sincere worship, sound biblical preaching, and loving fellowship.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-church-primary hover:underline"
              >
                <span>Learn about our faith</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-slate-300">•</span>
              <Link
                to="/history"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-church-primary"
              >
                <span>Church history</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-soft border-4 border-white bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80"
              alt="Church Family Fellowship"
              className="w-full h-72 object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. WEEKLY SERVICES SCHEDULE */}
      <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-church-primary bg-sky-100/70 px-3 py-1 rounded-full">
              Worship Times
            </span>
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              Our Weekly Services
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Join us in Wadala East for worship, biblical teaching, and corporate prayer.
            </p>
          </div>

          <ServiceCards />
        </div>
      </section>

      {/* 5. WORSHIP MINISTRY SECTION: "United in Worship" */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-church-gold bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                Worship Ministry
              </span>

              <h2 className="font-serif text-3xl font-bold text-slate-900">
                {config.worshipTeam.heading}
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                {config.worshipTeam.description}
              </p>

              <div className="space-y-2 pt-2">
                {config.worshipTeam.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/ministries"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-church-primary hover:underline"
                >
                  <span>Explore all ministries</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-soft border-4 border-white bg-slate-100">
              <img
                src={config.worshipTeam.image}
                alt="Worship Team"
                className="w-full h-72 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOUNDERS & LEADERSHIP PREVIEW */}
      <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-church-primary bg-sky-100/70 px-3 py-1 rounded-full">
              Leadership
            </span>
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              Pastoral & Ministry Leadership
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Serving Mighty Nation Church with faithful biblical teaching and prayer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {config.leadership.map((person) => (
              <div
                key={person.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-peaceful transition-all flex flex-col"
              >
                <div className="h-48 overflow-hidden bg-slate-100">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-1.5">
                  <div>
                    <span className="text-[10px] font-bold text-church-primary uppercase block">
                      {person.designation}
                    </span>
                    <h3 className="font-serif text-base font-bold text-slate-900">{person.name}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed mt-1 line-clamp-2">
                      {person.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/leadership"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-church-primary hover:underline"
            >
              <span>View full leadership profiles</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. UPCOMING GATHERINGS */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-church-primary bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                Calendar
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                Upcoming Church Gatherings
              </h2>
            </div>
            <Link
              to="/events"
              className="text-xs font-bold text-church-primary hover:underline"
            >
              View all events →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.events.map((event) => (
              <div
                key={event.id}
                className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs flex flex-col justify-between"
              >
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-bold text-church-gold uppercase tracking-wider">
                    {event.date} • {event.time}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="px-5 pb-4 pt-1 flex justify-between items-center text-xs border-t border-slate-200/60">
                  <span className="text-slate-500 text-[11px]">{event.location}</span>
                  <Link to="/contact" className="font-bold text-church-primary hover:underline text-[11px]">
                    Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PHOTO GALLERY PREVIEW */}
      <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-church-primary bg-sky-100/70 px-3 py-1 rounded-full">
                Moments
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                Church Photo Gallery
              </h2>
            </div>
            <Link
              to="/gallery"
              className="text-xs font-bold text-church-primary hover:underline"
            >
              Open gallery →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {config.galleryItems.slice(0, 4).map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group relative h-40 rounded-2xl overflow-hidden cursor-pointer shadow-xs bg-slate-200"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                  <p className="text-[11px] font-bold text-white leading-tight truncate">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. LOCATION & CONTACT PREVIEW */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-sky-50 rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-soft">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-church-primary">
                  Visit Us in Wadala
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  Mighty Nation Church Location
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {config.location.fullAddress}
                </p>

                <div className="pt-2 flex flex-wrap gap-2.5">
                  <a
                    href={config.location.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-church-primary text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-800 transition-colors shadow-xs"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-church-primary font-bold text-xs uppercase tracking-wider border border-sky-200 hover:bg-sky-100/50 transition-colors"
                  >
                    <span>Contact Us</span>
                  </Link>
                </div>
              </div>

              <div className="h-52 rounded-2xl overflow-hidden shadow-xs border border-slate-200">
                <iframe
                  title="Church Location Map"
                  src={config.location.mapsEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox for Gallery */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={config.galleryItems}
        currentIndex={lightboxIndex}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
};
