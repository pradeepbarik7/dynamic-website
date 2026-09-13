/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import BackgroundVideo from './components/BackgroundVideo';
import HeroContent from './components/HeroContent';
import MarqueeTicker from './components/MarqueeTicker';
import FeaturedProjects from './components/FeaturedProjects';
import LabsSection from './components/LabsSection';
import StudioManifesto from './components/StudioManifesto';
import OpeningsSection from './components/OpeningsSection';
import ShopSection from './components/ShopSection';
import ProjectInquiry from './components/ProjectInquiry';
import Footer from './components/Footer';

export default function App() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleToggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((item) => item !== service) : [...prev, service]
    );
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-black text-white font-sans selection:bg-white selection:text-black antialiased overflow-x-hidden min-h-screen flex flex-col">
      {/* Fixed Navigation Bar */}
      <Navbar onGetInTouchClick={scrollToContact} />

      {/* Hero Section Container with Video Layer */}
      <div className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-center">
        <BackgroundVideo />
        <HeroContent
          services={selectedServices}
          onToggleService={handleToggleService}
          onInquire={() => {
            scrollToContact();
          }}
        />
      </div>

      {/* Studio Discipline Marquee Ticker */}
      <MarqueeTicker />

      {/* Featured Projects & Case Studies Archive */}
      <FeaturedProjects />

      {/* Computational Laboratory & Interactive Creatives */}
      <LabsSection />

      {/* Global Presence & Editorial Manifesto */}
      <StudioManifesto />

      {/* Careers & Studio Openings */}
      <OpeningsSection />

      {/* Mainframe Editions Artifacts & Shop */}
      <ShopSection />

      {/* Project Inquiry & Configurator */}
      <ProjectInquiry
        services={selectedServices}
        onToggleService={handleToggleService}
      />

      {/* Studio Footer */}
      <Footer />
    </div>
  );
}

