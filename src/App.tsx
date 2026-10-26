import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { AnimeAnalyticsLab } from './components/AnimeAnalyticsLab';
import { SkillsSection } from './components/SkillsSection';
import { PortfolioProjects } from './components/PortfolioProjects';
import { ResearchSection } from './components/ResearchSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const handleOpenContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreAnalytics = () => {
    const labElem = document.getElementById('analytics-lab');
    if (labElem) {
      labElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      <main>
        {/* Hero Section with Organic Shape Portrait matching screenshot */}
        <HeroSection
          onOpenContact={handleOpenContact}
          onExploreAnalytics={handleExploreAnalytics}
        />

        {/* About Section with Organic Contoured Photo & Academic Bio */}
        <AboutSection
          onOpenResume={() => setResumeModalOpen(true)}
          onOpenContact={handleOpenContact}
        />

        {/* Interactive Anime Analytics Lab: Core Showcase for Information Systems & Anime */}
        <AnimeAnalyticsLab />

        {/* Technical & Academic Competencies */}
        <SkillsSection />

        {/* Filterable Information Systems Projects */}
        <PortfolioProjects />

        {/* Research Papers & Scientific Findings */}
        <ResearchSection />

        {/* Interactive Contact & Collaboration Section */}
        <ContactSection />
      </main>

      {/* Clean Footer */}
      <Footer />

      {/* Interactive Academic CV / Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}
