import React from 'react';
import { ArrowRight, Database, BarChart3, Film, Cpu } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenContact: () => void;
  onExploreAnalytics: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
  onExploreAnalytics
}) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background subtle organic blur circles */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[580px]">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            <span className="text-xl md:text-2xl font-light text-slate-500 mb-2">
              Hello,
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-4 text-balance">
              I Am <span className="text-indigo-600">{PROFILE_INFO.name}</span>
            </h1>

            <div className="flex items-center gap-2 text-indigo-700 font-semibold text-lg md:text-xl mb-6">
              <span>{PROFILE_INFO.roleTitle}</span>
            </div>

            <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
              Mengawali langkah di dunia <strong className="text-slate-900 font-semibold">Sistem Informasi</strong>:{' '}
              membedah industri hiburan dan platform streaming anime melalui kacamata data—mulai dari dasar
              pemodelan basis data relasional (ERD), eksplorasi algoritma rekomendasi, hingga pemahaman
              arsitektur sistem terdistribusi sejak semester awal perkuliahan.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onOpenContact}
                className="px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/45 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group"
              >
                <span>Let's talk</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreAnalytics}
                className="px-6 py-3.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-full hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 shadow-sm transition-all flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4 text-indigo-500" />
                <span>Eksplorasi Lab Analisis</span>
              </button>
            </div>

            {/* Academic highlights line */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
              <span>{PROFILE_INFO.university}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>IPK {PROFILE_INFO.gpa}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Komite Riset Data Anime</span>
            </div>
          </div>

          {/* Right Column: Organic Backdrop Shape & Portrait (matching screenshot composition) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center">
            {/* The signature organic flowing purple blob shape from screenshot */}
            <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
              {/* Organic curved shape background with rich indigo gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 shadow-2xl shadow-indigo-600/30 overflow-hidden"
                style={{
                  borderRadius: '52% 48% 62% 38% / 46% 56% 44% 54%'
                }}
              >
                {/* Subtle internal glowing orb */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-400/30 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-indigo-300/20 rounded-full blur-xl" />
              </div>

              {/* Decorative small organic sphere on bottom right (as seen in screenshot) */}
              <div
                className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-full shadow-lg shadow-indigo-500/40 z-20 pointer-events-none hidden sm:block"
              />

              {/* High-fidelity portrait photo */}
              <div className="relative z-10 w-[86%] h-[92%] overflow-hidden flex items-end justify-center">
                <img
                  src="/assets/aistudio/aan_95a1fb80.jpeg"
                  alt={`Potret profesional ${PROFILE_INFO.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center rounded-[40px] drop-shadow-xl transform hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              {/* Floating tech badge pill */}
              <div className="absolute -left-6 bottom-14 z-20 bg-white/95 backdrop-blur-md border border-slate-100 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Domain Riset</div>
                  <div className="text-xs font-bold text-slate-800">Anime Data Analytics</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Key Metrics Strip below the split (strictly adhering to frontend-design rule) */}
        <div className="mt-16 pt-10 border-t border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {PROFILE_INFO.stats.map((stat, idx) => (
              <div key={idx} className="bg-slate-50/70 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <div className="text-3xl lg:text-4xl font-extrabold text-indigo-600 tracking-tight tabular-nums mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-medium text-slate-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
