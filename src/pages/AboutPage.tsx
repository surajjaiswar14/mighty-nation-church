import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Compass, 
  Cross, 
  BookOpen, 
  Flame, 
  Heart, 
  TrendingUp, 
  Users, 
  Sparkles
} from 'lucide-react';
import { ChurchStateService } from '../services/churchState';
import { BibleVerseBanner } from '../components/common/BibleVerseBanner';

export const AboutPage: React.FC = () => {
  const [config, setConfig] = useState(ChurchStateService.getConfig());

  useEffect(() => {
    return ChurchStateService.subscribe(() => {
      setConfig(ChurchStateService.getConfig());
    });
  }, []);

  const getBeliefIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cross': return <Cross className="w-5 h-5 text-church-gold" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-church-primary" />;
      case 'Flame': return <Flame className="w-5 h-5 text-amber-500" />;
      case 'Heart': return <Heart className="w-5 h-5 text-rose-500" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      case 'Users': return <Users className="w-5 h-5 text-sky-500" />;
      default: return <Sparkles className="w-5 h-5 text-church-gold" />;
    }
  };

  return (
    <div className="w-full">
      {/* Peaceful Page Header */}
      <section className="py-14 sm:py-18 bg-gradient-to-b from-sky-100/60 via-sky-50/40 to-white text-center px-4">
        <div className="max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-church-primary text-xs font-semibold uppercase tracking-wider border border-sky-200">
            About Our Church
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Who We Are & What We Believe
          </h1>
          <p className="font-serif text-base sm:text-lg text-slate-600 italic">
            "{config.tagline}"
          </p>
        </div>
      </section>

      {/* Section A: Who We Are (Crisp & Simple) */}
      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-church-primary bg-sky-50 px-3 py-1 rounded-full">
              Our Community
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              A Christian Church in Wadala, Mumbai
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Mighty Nation Church is a Christ-centered congregation located in East Wadala, Mumbai. We gather to worship God in spirit and truth, preach the Gospel, and nurture spiritual growth.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              We believe in the power of prayer, the truth of God's Word, and walking in genuine Christian love and fellowship.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-soft border-4 border-white bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
              alt="Scripture and Prayer"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission (Concise side-by-side cards) */}
      <section className="py-12 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vision */}
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-sky-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-church-gold flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-church-gold block">
                Our Vision
              </span>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Raising Strong Believers
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To raise spiritually strong people who grow in faith, character, biblical understanding, and Christian service.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-sky-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-church-primary flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-church-primary block">
                Our Mission
              </span>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Spreading the Gospel
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To spread the Gospel of Jesus Christ, encourage prayer, strengthen families, and develop spiritual leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Beliefs (Clean 6-grid) */}
      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-church-primary bg-sky-50 px-3 py-1 rounded-full">
            Beliefs
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            What We Believe
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Core biblical truths that guide our worship and faith.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {config.beliefs.map((belief, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 space-y-2.5"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                {getBeliefIcon(belief.icon)}
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">
                {belief.title}
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                {belief.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <BibleVerseBanner />
    </div>
  );
};
