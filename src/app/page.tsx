'use client';

import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import ConceptSection from '@/components/ConceptSection';
import ChaletModelsSection from '@/components/ChaletModelsSection';
import ProjectSection from '@/components/ProjectSection';
import SustainabilitySection from '@/components/SustainabilitySection';
import LocationSection from '@/components/LocationSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import SectionTracker from '@/components/SectionTracker';
import { useTrackPageView } from '@/hooks/useTrackPageView';
import { usePageAnalytics } from '@/hooks/usePageAnalytics';
import GarantiaSection from '@/components/GarantiaSection';

export default function Home() {
  const landingPageSlug = 'jaboticatubas-mg';
  const locationName = 'Jaboticatubas - MG';

  // 1. Dispara o page_view com a regra de proteção contra F5/reload
  useTrackPageView({
    landingPageSlug,
    locationName,
  });

  // 2. Rastreia automaticamente a profundidade de scroll (25%, 50%, 75%, 100%) e o tempo de saída (page_leave)
  usePageAnalytics({
    landingPageSlug,
    locationName,
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Cabeçalho */}
      <Header landingPageSlug={landingPageSlug} locationName={locationName} />

      {/* Conteúdo Principal com rastreamento por seção */}
      <main className="flex-grow">
        <SectionTracker
          componentName="HeroBanner"
          landingPageSlug={landingPageSlug}
          locationName={locationName}
        >
          <HeroBanner />
        </SectionTracker>

        <SectionTracker
          componentName="ConceptSection"
          landingPageSlug={landingPageSlug}
          locationName={locationName}
        >
          <ConceptSection />
        </SectionTracker>

        <SectionTracker
        componentName='GarantiaSection'
        landingPageSlug={landingPageSlug}
        locationName={locationName}
        >
          <GarantiaSection/>
        </SectionTracker>

        <SectionTracker
          componentName="ChaletModelsSection"
          landingPageSlug={landingPageSlug}
          locationName={locationName}
        >
          <ChaletModelsSection />
        </SectionTracker>

        <SectionTracker
          componentName="ProjectSection"
          landingPageSlug={landingPageSlug}
          locationName={locationName}
        >
          <ProjectSection
            landingPageSlug={landingPageSlug}
            locationName={locationName}
          />
        </SectionTracker>

        <SectionTracker
          componentName="SustainabilitySection"
          landingPageSlug={landingPageSlug}
          locationName={locationName}
        >
          <SustainabilitySection
            landingPageSlug={landingPageSlug}
            locationName={locationName}
          />
        </SectionTracker>

        <SectionTracker
          componentName="LocationSection"
          landingPageSlug={landingPageSlug}
          locationName={locationName}
        >
          <LocationSection
            landingPageSlug={landingPageSlug}
            locationName={locationName}
          />
        </SectionTracker>

        <SectionTracker
          componentName="CtaSection"
          landingPageSlug={landingPageSlug}
          locationName={locationName}
        >
          <CtaSection />
        </SectionTracker>
      </main>

      {/* Rodapé */}
      <Footer />
    </div>
  );
}