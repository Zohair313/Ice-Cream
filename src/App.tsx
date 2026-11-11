import { useEffect, useState } from 'react';
import ContactSection from './components/ContactSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import HeroCarousel from './components/HeroCarousel';
import MenuShowcase from './components/MenuShowcase';
import Navbar from './components/Navbar';
import OnboardingModal from './components/OnboardingModal';
import StatsBar from './components/StatsBar';
import TestimonialsWall from './components/TestimonialsWall';
import { HERO_FLAVORS } from './data/cafeData';

export default function App() {
  const [activeFlavorIndex, setActiveFlavorIndex] = useState(0);
  const [scrollRequest, setScrollRequest] = useState<{
    index: number;
    nonce: number;
  } | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Sync accessible focus outline variable with active flavor shade
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--active-text-accent',
      HERO_FLAVORS[activeFlavorIndex].textAccent,
    );
  }, [activeFlavorIndex]);

  const handleJumpToHeroFlavor = (index: number) => {
    setActiveFlavorIndex(index);
    setScrollRequest({ index, nonce: Date.now() });
  };

  const handleGetStartedFromOnboarding = (flavorIndex: number) => {
    setActiveFlavorIndex(flavorIndex);
    setIsOnboardingOpen(false);
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111115] antialiased">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[120] focus:rounded-lg focus:bg-[#111115] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Navbar
        activeFlavorIndex={activeFlavorIndex}
        onSelectFlavor={handleJumpToHeroFlavor}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      <main id="main-content">
        <HeroCarousel
          activeIndex={activeFlavorIndex}
          onChangeIndex={setActiveFlavorIndex}
          scrollRequest={scrollRequest}
        />

        <StatsBar activeFlavorIndex={activeFlavorIndex} />

        <MenuShowcase
          activeFlavorIndex={activeFlavorIndex}
          onSelectFlavor={handleJumpToHeroFlavor}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
        />

        <TestimonialsWall activeFlavorIndex={activeFlavorIndex} />

        <FaqSection activeFlavorIndex={activeFlavorIndex} />

        <ContactSection
          activeFlavorIndex={activeFlavorIndex}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
        />
      </main>

      <Footer
        activeFlavorIndex={activeFlavorIndex}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onGetStarted={handleGetStartedFromOnboarding}
      />
    </div>
  );
}
