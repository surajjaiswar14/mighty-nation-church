import React, { useState } from 'react';
import { 
  Heart, 
  Send, 
  CheckCircle2, 
  Lock, 
  Phone, 
  Mail, 
  User, 
  AlertCircle 
} from 'lucide-react';
import { ChurchStateService } from '../services/churchState';
import { BibleVerseBanner } from '../components/common/BibleVerseBanner';
import { isSupabaseConfigured, supabase } from '../services/supabaseClient';

export const PrayerRequestPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [prayerRequest, setPrayerRequest] = useState('');
  const [permissionToContact, setPermissionToContact] = useState(true);
  
  // Honeypot spam trap
  const [honeypot, setHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (honeypot.trim().length > 0) return;

    if (!fullName.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }

    if (!prayerRequest.trim() || prayerRequest.trim().length < 5) {
      setErrorMessage('Please enter your prayer request.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = ChurchStateService.submitPrayerRequest({
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim() || undefined,
        email: email.trim() || undefined,
        prayerRequest: prayerRequest.trim(),
        permissionToContact
      });

      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('prayer_requests').insert([
            {
              full_name: fullName.trim(),
              phone_number: phoneNumber.trim() || null,
              email: email.trim() || null,
              prayer_request: prayerRequest.trim(),
              permission_to_contact: permissionToContact,
              status: 'pending'
            }
          ]);
        } catch (err) {
          console.warn('Supabase sync notice:', err);
        }
      }

      setSubmittedMessage(res.message);
      setFullName('');
      setPhoneNumber('');
      setEmail('');
      setPrayerRequest('');
    } catch (err) {
      setErrorMessage('An error occurred. Please try again.');
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
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>Prayer Ministry</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            How Can We Pray For You?
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            "The prayer of a righteous person is powerful and effective." — James 5:16
          </p>
        </div>
      </section>

      {/* Main Form */}
      <section className="py-12 sm:py-16 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-sky-100">
          {submittedMessage ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  {submittedMessage}
                </h3>
                <p className="text-xs text-slate-500">
                  Our ministry team will uphold your request in prayer.
                </p>
              </div>

              <button
                onClick={() => setSubmittedMessage(null)}
                className="mt-4 px-5 py-2.5 rounded-full bg-church-primary text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-800 transition-colors shadow-xs"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Privacy Notice */}
              <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-100 flex items-center gap-2.5 text-xs text-slate-600">
                <Lock className="w-4 h-4 text-church-primary shrink-0" />
                <span>Your request is kept strictly private with our pastoral team.</span>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Honeypot */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-church-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-church-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-church-primary"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Prayer Request <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={prayerRequest}
                  onChange={(e) => setPrayerRequest(e.target.value)}
                  placeholder="Share what is on your heart..."
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-church-primary leading-relaxed"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="permissionToContact"
                  checked={permissionToContact}
                  onChange={(e) => setPermissionToContact(e.target.checked)}
                  className="w-4 h-4 text-church-primary rounded border-slate-300"
                />
                <label htmlFor="permissionToContact" className="text-xs text-slate-600 cursor-pointer">
                  Permission to contact me if needed for prayer follow-up.
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-full text-white font-bold text-xs uppercase tracking-wider bg-church-primary hover:bg-blue-800 shadow-soft transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Prayer Request'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <BibleVerseBanner />
    </div>
  );
};
