import React from 'react';
import { Download, ExternalLink, GraduationCap, Award, Compass, Database } from 'lucide-react';
import { PROFILE_INFO, SKILLS_CATEGORIES } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenResume,
  onOpenContact
}) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-slate-50/50 relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute -left-20 top-1/3 w-72 h-72 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Organic Shaped Photo Container (Mirrors screenshot design) */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Outer fluid contoured boundary */}
            <div className="relative w-full max-w-[400px] aspect-[4/3] sm:aspect-square flex items-center justify-center">
              {/* Organic border outline shape */}
              <div
                className="absolute inset-0 border-4 border-indigo-600/40 p-2 shadow-xl shadow-indigo-500/10"
                style={{
                  borderRadius: '58% 42% 48% 52% / 48% 54% 46% 52%'
                }}
              >
                {/* Photo container */}
                <div
                  className="w-full h-full overflow-hidden bg-slate-200"
                  style={{
                    borderRadius: '56% 44% 50% 50% / 46% 52% 48% 54%'
                  }}
                >
                  <img
                    src="/src/assets/images/student_working_laptop_1792391667937.jpg"
                    alt="Mahasiswa Sistem Informasi sedang menganalisis data anime di laptop"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Decorative Purple Sphere on Right Side (Directly from user screenshot!) */}
              <div
                className="absolute -right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full shadow-lg shadow-indigo-600/30 hidden sm:block"
              />

              {/* Little info card */}
              <div className="absolute -bottom-4 left-6 bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 shadow-md flex items-center gap-2.5">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <div className="text-xs">
                  <div className="font-bold text-slate-800">Sistem Informasi UNIKMA</div>
                  <div className="text-slate-500">Semester Awal (IPK 3.86)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Technical Competencies */}
          <div className="lg:col-span-7">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest block mb-2">
              Profil Akademik & Minat Studi
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
              About me
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-4">
              Halo, saya <strong className="text-slate-900 font-semibold">{PROFILE_INFO.name}</strong>,
              mahasiswa semester awal Program Studi Sistem Informasi di {PROFILE_INFO.university}.
              Saya memiliki semangat tinggi mempelajari keterhubungan antara <span className="text-indigo-600 font-semibold">dasar rekayasa perangkat lunak</span>,{' '}
              <span className="text-indigo-600 font-semibold">eksplorasi data</span>, dan tren teknologi dalam industri kreatif animasi Jepang.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
              {PROFILE_INFO.secondaryBio}
            </p>

            {/* Academic & Skill Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                  <Database className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm text-slate-900 mb-1">Arsitektur DB 3NF</div>
                <p className="text-xs text-slate-500">Normalisasi database relasional katalog anime & log tontonan berkapasitas tinggi.</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm text-slate-900 mb-1">Sistem Rekomendasi</div>
                <p className="text-xs text-slate-500">Hybrid SVD, Content-Based Cosine Similarity & NLP sentiment analysis.</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                  <Award className="w-4 h-4" />
                </div>
                <div className="font-bold text-sm text-slate-900 mb-1">Riset & Publikasi</div>
                <p className="text-xs text-slate-500">3 makalah penelitian terindeks dalam seminar nasional sistem informasi.</p>
              </div>
            </div>

            {/* Action Buttons: Mirrors screenshot (Hire Me + View Portfolio) */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenContact}
                className="px-7 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-md shadow-indigo-500/25 hover:from-indigo-700 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Hire Me
              </button>

              <button
                onClick={onOpenResume}
                className="px-6 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-full hover:bg-slate-50 hover:border-slate-400 shadow-xs transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Unduh CV / Resume</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
