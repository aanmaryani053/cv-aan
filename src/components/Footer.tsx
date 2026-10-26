import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
            AM
          </span>
          <div className="text-xs text-slate-500">
            <span className="font-bold text-slate-900">{PROFILE_INFO.name}</span> · {PROFILE_INFO.major} ({PROFILE_INFO.university})
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-500">
          <a href="#hero" className="hover:text-indigo-600 transition-colors">Beranda</a>
          <a href="#about" className="hover:text-indigo-600 transition-colors">Tentang</a>
          <a href="#analytics-lab" className="hover:text-indigo-600 transition-colors">Lab Analisis</a>
          <a href="#projects" className="hover:text-indigo-600 transition-colors">Proyek</a>
          <a href="#research" className="hover:text-indigo-600 transition-colors">Publikasi</a>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400">© 2024 Aan Maryani</span>
          <button
            onClick={scrollToTop}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
            aria-label="Kembali ke atas"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
