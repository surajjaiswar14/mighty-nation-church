import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Send, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import { ChurchStateService } from '../services/churchState';
import { BibleVerseBanner } from '../components/common/BibleVerseBanner';
import { isSupabaseConfigured, supabase } from '../services/supabaseClient';

export const ContactPage: React.FC = () => {
  const [config, setConfig] = useState(ChurchStateService.getConfig());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    return ChurchStateService.subscribe(() => {
      setConfig(ChurchStateService.getConfig());
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = ChurchStateService.submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        subject: subject.trim() || 'General Inquiry',
        message: message.trim()
      });

      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('contact_messages').insert([
            {
              name: name.trim(),
              email: email.trim(),
              phone: phone.trim() || null,
              subject: subject.trim() || 'General Inquiry',
              message: message.trim(),
              status: 'unread'
            }
          ]);
        } catch (err) {
          console.warn('Supabase sync notice:', err);
        }
      }

      setSuccessMessage(res.message);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setErrorMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Peaceful Header */}
      <section className="py-14 sm:py-18 bg-gradient-to-b from-sky-100/60 via-sky-50/40 to-white text-center px-4">
        <div className="max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-church-primary text-xs font-semibold uppercase tracking-wider border border-sky-200">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit & Connect</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Contact Us & Location
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Mighty Nation Church, East Wadala, Mumbai
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column: Address & Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-soft border border-sky-100 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-church-primary block">
                Church Address
              </span>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-church-gold shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong className="block font-bold text-slate-900">Mighty Nation Church</strong>
                  <p>{config.location.fullAddress}</p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={config.location.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-church-primary text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-800 transition-colors shadow-xs"
                >
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Contact & WhatsApp */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-church-primary uppercase">
                  <Phone className="w-3.5 h-3.5 text-church-gold" />
                  <span>Phone</span>
                </div>
                <p className="text-xs font-medium text-slate-800">{config.contact.phone}</p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-church-primary uppercase">
                  <Mail className="w-3.5 h-3.5 text-church-gold" />
                  <span>Email</span>
                </div>
                <p className="text-xs font-medium text-slate-800 truncate">{config.contact.email}</p>
              </div>
            </div>

            {/* Map Embed */}
            <div className="rounded-3xl overflow-hidden shadow-soft border border-slate-200 h-56 bg-slate-100">
              <iframe
                title="Church Google Map"
                src={config.location.mapsEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Simple Contact Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-sky-100">
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">
              Send a Message
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Have questions about services or online prayer? Reach out to us.
            </p>

            {successMessage ? (
              <div className="p-6 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <p className="text-xs sm:text-sm text-emerald-900 font-medium">{successMessage}</p>
                <button
                  onClick={() => setSuccessMessage(null)}
                  className="px-4 py-1.5 rounded-full bg-emerald-700 text-white font-semibold text-xs uppercase"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-50 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-church-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-church-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Phone <span className="text-slate-400 font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-church-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Visiting This Sunday / Online Prayer Link"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-church-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message..."
                    className="w-full p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-church-primary"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-full text-white font-bold text-xs uppercase tracking-wider bg-church-primary hover:bg-blue-800 shadow-soft transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <BibleVerseBanner />
    </div>
  );
};
