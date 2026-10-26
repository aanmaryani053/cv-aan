import React, { useState } from 'react';
import { X, Download, Check, Copy, GraduationCap, Award, Briefcase, Code } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const textResume = `
CURRICULUM VITAE
${PROFILE_INFO.name}
${PROFILE_INFO.roleTitle}
Email: ${PROFILE_INFO.email}
Lokasi: ${PROFILE_INFO.location}

PENDIDIKAN:
${PROFILE_INFO.university}
${PROFILE_INFO.major} (2024 - Sekarang · Semester Awal)
IPK: ${PROFILE_INFO.gpa} (Predikat Sangat Memuaskan)

KOMPETENSI:
- Analisis Data & Data Mining: Python, Pandas, Scikit-Learn, Plotly, Tableau
- Basis Data: PostgreSQL (3NF Normalization), MySQL, Redis, MongoDB
- Arsitektur Sistem: Cloud CDN Edge Caching, Microservices, C4 Architecture
- Rekayasa Perangkat Lunak: React, TypeScript, Tailwind CSS, FastAPI

PUBLIKASI ILMIAH:
1. Optimasi Content Delivery Network (CDN) pada Lonjakan Traffic Simulcast Anime (JNASIR 2024)
2. Penerapan Algoritma Hybrid Matrix Factorization pada Sistem Rekomendasi Anime (SINTERKOM 2024)
3. Analisis Kebutuhan & Skema Basis Data Relasional Platform Lisensi Anime (2023)
    `.trim();

    navigator.clipboard.writeText(textResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
              CV
            </span>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Curriculum Vitae Akademik</h3>
              <p className="text-xs text-slate-500">{PROFILE_INFO.name} · Mahasiswa Sistem Informasi</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin Teks'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Body */}
        <div className="space-y-6 text-slate-800 text-xs sm:text-sm">
          {/* Identity & Summary */}
          <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100">
            <div className="font-bold text-base text-slate-900">{PROFILE_INFO.name}</div>
            <div className="text-xs font-semibold text-indigo-700 mb-2">{PROFILE_INFO.roleTitle}</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mahasiswa semester awal Sistem Informasi dengan antusiasme tinggi pada logika pemrograman, pemodelan basis data relasional (ERD),
              dan eksplorasi data industri kreatif anime. Aktif mengasah keterampilan analisis komputasional melalui studi terapan dan eksplorasi dataset riil.
            </p>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 font-bold text-slate-900 uppercase tracking-wider text-xs mb-3">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Riwayat Pendidikan</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{PROFILE_INFO.university}</div>
                  <div className="text-xs text-slate-600">S1 Sistem Informasi (Information Systems)</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-indigo-600 tabular-nums">IPK {PROFILE_INFO.gpa}</div>
                  <div className="text-[11px] text-slate-400">2024 — Sekarang (Semester Awal)</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                Fokus Mata Kuliah Dasar: Konsep Sistem Informasi, Algoritma & Pemrograman, Pengantar Basis Data, Matematika Diskrit, dan Statistika Dasar.
              </div>
            </div>
          </div>

          {/* Key Academic Projects */}
          <div>
            <div className="flex items-center gap-2 font-bold text-slate-900 uppercase tracking-wider text-xs mb-3">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span>Proyek & Pengalaman Riset Utama</span>
            </div>
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex justify-between font-bold text-slate-900 text-xs">
                  <span>AnimeLens: Analisis Prediktif Data Anime 15.000 Judul</span>
                  <span className="text-slate-400">2024</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Mengekstrak korelasi studio, budget proxy, dan pacing terhadap kepuasan audiens global menggunakan Python & Scikit-Learn.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex justify-between font-bold text-slate-900 text-xs">
                  <span>AniStream: Perancangan Arsitektur CDN & Simulasi Simulcast</span>
                  <span className="text-slate-400">2023 - 2024</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Mendesain edge caching multi-tier berbasis LFU-DA, memangkas latensi buffering hingga 76.7% untuk 50.000 penonton serentak.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <div className="flex items-center gap-2 font-bold text-slate-900 uppercase tracking-wider text-xs mb-3">
              <Code className="w-4 h-4 text-indigo-600" />
              <span>Keahlian & Perkakas Teknis</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800">Bahasa Pemrograman & DB:</span>
                <p className="text-slate-600 mt-0.5">Python, SQL (PostgreSQL, MySQL), TypeScript, JavaScript, HTML5/CSS3</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800">Framework & Analitik:</span>
                <p className="text-slate-600 mt-0.5">Pandas, Scikit-Learn, Plotly, React, Tailwind CSS, FastAPI, Docker</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-slate-200 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Tutup
          </button>
          <button
            onClick={() => {
              window.print();
            }}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
