import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, CheckCircle2, HeartHandshake, ArrowRight } from 'lucide-react';
import { ChurchStateService } from '../../services/churchState';

export const ServiceCards: React.FC<{ showDirectionsBtn?: boolean }> = ({ showDirectionsBtn = true }) => {
  const [config, setConfig] = useState(ChurchStateService.getConfig());

  useEffect(() => {
    return ChurchStateService.subscribe(() => {
      setConfig(ChurchStateService.getConfig());
    });
  }, []);

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Card 1: Sunday Worship */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft hover:shadow-peaceful border border-sky-100 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-church-primary font-bold text-xs uppercase tracking-wider mb-4">
              <Calendar className="w-3.5 h-3.5" />
              <span>{config.services.sunday.day}</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
              {config.services.sunday.name}
            </h3>

            <div className="flex items-center gap-2 text-church-primary font-bold text-xl mb-3">
              <Clock className="w-5 h-5 text-church-gold" />
              <span>{config.services.sunday.time}</span>
            </div>

            <p className="text-slate-600 text-sm mb-5 leading-relaxed">
              {config.services.sunday.description}
            </p>

            <ul className="space-y-2 pt-3 border-t border-slate-100">
              {config.services.sunday.activities.map((act, index) => (
                <li key={index} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-white font-semibold text-xs uppercase tracking-wider bg-church-primary hover:bg-blue-800 transition-colors shadow-sm"
            >
              <span>Join Us This Sunday</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Card 2: Friday Fasting Prayer */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft hover:shadow-peaceful border border-sky-100 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-church-gold font-bold text-xs uppercase tracking-wider mb-4">
              <Calendar className="w-3.5 h-3.5" />
              <span>{config.services.friday.day}</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
              {config.services.friday.name}
            </h3>

            <div className="flex items-center gap-2 text-church-secondary font-bold text-xl mb-3">
              <Clock className="w-5 h-5 text-church-secondary" />
              <span>{config.services.friday.time}</span>
            </div>

            <p className="text-slate-600 text-sm mb-5 leading-relaxed">
              {config.services.friday.description}
            </p>

            <ul className="space-y-2 pt-3 border-t border-slate-100">
              {config.services.friday.activities.map((act, index) => (
                <li key={index} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-2">
            <Link
              to="/prayer-request"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-church-primary font-semibold text-xs uppercase tracking-wider bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors"
            >
              <span>Request Prayer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Warm welcome note */}
      <div className="max-w-xl mx-auto text-center p-3.5 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-sky-50 border border-sky-100 flex items-center justify-center gap-2.5">
        <HeartHandshake className="w-5 h-5 text-church-gold shrink-0" />
        <p className="font-serif text-sm sm:text-base font-bold text-slate-800">
          "{config.services.welcomeNote}"
        </p>
      </div>
    </div>
  );
};
