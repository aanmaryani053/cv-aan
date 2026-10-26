import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Beranda', href: '#hero' },
    { label: 'Tentang', href: '#about' },
    { label: 'Lab Analisis Anime', href: '#analytics-lab' },
    { label: 'Proyek & ERD', href: '#projects' },
    { label: 'Riset & Jurnal', href: '#research' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand title, one line */}
          <a
            href="#hero"
            className="flex items-center gap-3 text-slate-900 font-bold text-xl tracking-tight whitespace-nowrap shrink-0 group"
          >
            <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              AM
            </span>
            <span className="font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {PROFILE_INFO.name}
            </span>
          </a>

          {/* Zone 2: 4-5 nav links, 1-2 word labels, single-line */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-indigo-600 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenContact}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Hubungi Saya</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-indigo-600 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-100 bg-white px-6 py-4 space-y-3 shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-slate-700 hover:text-indigo-600 py-1.5"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full mt-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 text-center flex items-center justify-center gap-1.5"
            >
              <span>Hubungi Saya</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </header>

      {/* Left Vertical Brand Rail (as seen in user screenshot) */}
      <aside
        aria-label="Social media vertical rail"
        className="fixed left-4 bottom-12 z-30 hidden xl:flex flex-col items-center gap-6"
      >
        <span
          style={{ writingMode: 'vertical-rl' }}
          className="text-[11px] font-semibold tracking-wider text-slate-400 rotate-180 uppercase"
        >
          Follow Me
        </span>
        <div className="w-[1px] h-10 bg-slate-300" />
        <div
          style={{ writingMode: 'vertical-rl' }}
          className="flex items-center gap-5 text-xs font-medium text-slate-500 rotate-180"
        >
          <a
            href={PROFILE_INFO.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition-colors"
          >
            github
          </a>
          <span className="text-slate-300">·</span>
          <a
            href={PROFILE_INFO.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition-colors"
          >
            linkedin
          </a>
          <span className="text-slate-300">·</span>
          <a
            href={PROFILE_INFO.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition-colors"
          >
            instagram
          </a>
          <span className="text-slate-300">·</span>
          <a
            href={PROFILE_INFO.socialLinks.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition-colors"
          >
            behance
          </a>
        </div>
      </aside>
    </>
  );
};
