import React from 'react';
import { Database, LineChart, Server } from 'lucide-react';
import { SKILLS_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <LineChart className="w-5 h-5 text-indigo-600" />;
      case 1:
        return <Database className="w-5 h-5 text-purple-600" />;
      default:
        return <Server className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section className="py-20 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">
            Kompetensi Kurikulum & Industri
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Keahlian Teknis & Analitis
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Kombinasi fondasi rekayasa perangkat lunak, perancangan basis data, dan teknik analisis kuantitatif.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILLS_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.category}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  {getIcon(idx)}
                </div>
                <h3 className="font-bold text-base text-slate-900">{cat.category}</h3>
              </div>

              <div className="space-y-4">
                {cat.skills.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                      <span>{s.name}</span>
                      <span className="text-indigo-600 font-semibold tabular-nums">{s.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-700"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
