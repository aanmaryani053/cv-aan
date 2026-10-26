import React, { useState } from 'react';
import { BookOpen, FileText, CheckCircle2, X, Download } from 'lucide-react';
import { RESEARCH_PAPERS, ResearchPaper } from '../data/portfolioData';

export const ResearchSection: React.FC = () => {
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);

  return (
    <section id="research" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">
            Riset Ilmiah & Publikasi
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Publikasi Riset Sistem Informasi
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Makalah dan studi penelitian akademis yang dipresentasikan pada seminar nasional dan jurnal teknologi informasi,
            mengevaluasi optimasi jaringan, algoritma machine learning, dan tata kelola basis data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {RESEARCH_PAPERS.map((paper) => (
            <div
              key={paper.id}
              className="bg-slate-50/80 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-indigo-600">{paper.year}</span>
                  <span aria-hidden="true">·</span>
                  <span className="truncate">{paper.conference}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug mb-3">
                  {paper.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-4 mb-4">
                  {paper.abstract}
                </p>

                <div className="space-y-1.5 mb-6">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Temuan Kunci:
                  </div>
                  {paper.findings.slice(0, 2).map((finding, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                      <span className="text-indigo-600 font-bold shrink-0">•</span>
                      <span className="line-clamp-2">{finding}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-slate-200">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedPaper(paper)}
                  className="w-full py-2 px-3 text-xs font-semibold text-indigo-600 bg-white border border-indigo-200 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Baca Abstrak & Temuan Lengkap</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Paper Modal */}
      {selectedPaper && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPaper(null)}
              className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs text-indigo-600 font-semibold mb-2">
              {selectedPaper.conference} ({selectedPaper.year})
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-4 leading-snug">
              {selectedPaper.title}
            </h3>

            <div className="mb-6">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Abstrak Makalah:
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                {selectedPaper.abstract}
              </p>
            </div>

            <div className="mb-6">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Hasil & Kontribusi Ilmiah:
              </div>
              <div className="space-y-2">
                {selectedPaper.findings.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="flex flex-wrap gap-1.5">
                {selectedPaper.tags.map(t => (
                  <span key={t} className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedPaper(null)}
                className="px-5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
