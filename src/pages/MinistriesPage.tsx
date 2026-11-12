import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Music, 
  CheckCircle2, 
  Users, 
  BookOpen, 
  Flame, 
  Calendar 
} from 'lucide-react';
import { ChurchStateService } from '../services/churchState';
import { BibleVerseBanner } from '../components/common/BibleVerseBanner';

export const MinistriesPage: React.FC = () => {
  const [config, setConfig] = useState(ChurchStateService.getConfig());

  useEffect(() => {
    return ChurchStateService.subscribe(() => {
      setConfig(ChurchStateService.getConfig());
    });
  }, []);

  const ministriesList = [
    {
      title: "Praise & Worship Ministry",
      subtitle: "United in Worship",
      description: "Leading the church family into heartfelt adoration, glorifying God through uplifting music, singing, and spiritual devotion.",
      icon: Music,
      timing: "Sunday Worship & Prayer Vigils"
    },
    {
      title: "Friday Fasting & Intercession",
      subtitle: "Corporate Prayer",
      description: "Dedicated believers consecrated in weekly fasting and corporate prayer, interceding for families and personal needs.",
      icon: Flame,
      timing: "Every Friday 8:30 PM – 9:30 PM"
    },
    {
      title: "Bible College & Discipleship",
      subtitle: "Mighty Nation Bible College",
      description: "Biblical education and ministry leadership development, equipping believers to serve God faithfully.",
      icon: BookOpen,
      timing: "Ministry Training Sessions"
    },
    {
      title: "Children & Family Fellowship",
      subtitle: "Nurturing Faith",
      description: "Teaching Bible stories, scriptures, and Christian character to children, helping families grow strong in the Lord.",
      icon: Users,
      timing: "Sunday Worship Sessions"
    }
  ];

  return (
    <div className="w-full">
      {/* Peaceful Header */}
      <section className="py-14 sm:py-18 bg-gradient-to-b from-sky-100/60 via-sky-50/40 to-white text-center px-4">
        <div className="max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-church-primary text-xs font-semibold uppercase tracking-wider border border-sky-200">
            Ministries
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Ministries & Worship Team
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Serving God, strengthening believers, and glorifying Christ in Wadala, Mumbai.
          </p>
        </div>
      </section>

      {/* Featured Worship Ministry Spotlight */}
      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-sky-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-church-gold bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                Praise & Adoration
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
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
                  to="/services"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-church-primary text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-800 transition-colors shadow-xs"
                >
                  <span>Join Sunday Worship</span>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xs bg-slate-100">
              <img
                src={config.worshipTeam.image}
                alt="Worship Team Group Photo"
                className="w-full h-72 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* All Ministries Grid */}
      <section className="py-12 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ministriesList.map((m, index) => {
              const IconComp = m.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-church-primary flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-church-gold block">
                      {m.subtitle}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-slate-900">
                      {m.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {m.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-church-primary font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{m.timing}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <BibleVerseBanner />
    </div>
  );
};
