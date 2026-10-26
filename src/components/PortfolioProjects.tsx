import React, { useState } from 'react';
import { ArrowUpRight, FolderGit2, CheckCircle2, X } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';

type ProjectItem = typeof PORTFOLIO_PROJECTS[0];

export const PortfolioProjects: React.FC = () => {
  const [filter, setFilter] = useState<string>('Semua');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ['Semua', 'Data Analytics', 'Machine Learning & IS', 'Arsitektur Sistem', 'Basis Data'];

  const filteredProjects = filter === 'Semua'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 lg:py-28 bg-slate-50/60 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">
              Karya Rekayasa & Portofolio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Proyek Sistem Informasi Terpilih
            </h2>
          </div>

          {/* Interactive filter tabs (functional buttons adhering to 1A) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  filter === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-7 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Metadata without pills (Clean unboxed text with subtle separators as mandated) */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-indigo-600">{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Tahun {project.period}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums font-mono">{project.metrics}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-3">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Key features */}
                <div className="space-y-2 mb-6">
                  {project.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech stack labels */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Lihat Detail Studi Kasus</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold mb-2">
              <span>{selectedProject.category}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedProject.period}</span>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">
              {selectedProject.title}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Metodologi Sistem Informasi yang Digunakan:
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Analisis kebutuhan fungsional dan non-fungsional dengan use case modeling.</li>
                <li>Penyusunan kamus data dan skema relasional bebas anomali modifikasi.</li>
                <li>Integrasi metrik performa latensi dan throughput query pada beban puncak.</li>
                <li>Dokumentasi teknis C4 architecture level 2 (Container diagram).</li>
              </ul>
            </div>

            <div className="mb-6">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Fitur & Spesifikasi Teknis:
              </div>
              <div className="space-y-2">
                {selectedProject.keyFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setSelectedProject(null)}
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
