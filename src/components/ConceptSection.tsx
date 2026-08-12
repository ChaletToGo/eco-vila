'use client';

import React from 'react';
import Image from 'next/image';
import { trackSiteEvent } from '@/lib/trackSiteEvent';

interface ConceptSectionProps {
  landingPageSlug?: string;
  locationName?: string;
}

export default function ConceptSection({
  landingPageSlug = 'jaboticatubas-mg',
  locationName = 'Jaboticatubas - MG',
}: ConceptSectionProps) {
  const pillars = [
    {
      icon: '🌲',
      title: 'Natureza',
      description: 'Área verde, pomar e horta comunitária.',
    },
    {
      icon: '🏡',
      title: 'Conforto',
      description: 'Chalés planejados para aproveitar cada espaço.',
    },
    {
      icon: '☀️',
      title: 'Sustentabilidade',
      description: 'Energia solar e soluções de reaproveitamento.',
    },
    {
      icon: '📈',
      title: 'Investimento',
      description: 'Uma proposta de moradia e patrimônio.',
    },
  ];

  const handlePillarClick = (title: string) => {
    trackSiteEvent({
      eventName: 'cta_click',
      landingPageSlug,
      locationName,
      componentName: 'ConceptSection',
      buttonLabel: `Pilar: ${title}`,
    });
  };

  return (
    <section id="conceito" className="w-full bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* COLUNA ESQUERDA: IMAGEM AMPLIADA + CARD REPOSICIONADO */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-start">
            {/* Container da Imagem maior */}
            <div className="relative w-full max-w-[560px] aspect-[4/3] bg-neutral-100 rounded-3xl p-3 shadow-xl border border-neutral-100 overflow-hidden group">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/concept-section.png"
                  alt="Vista do conceito Eco Vila Chalet To Go"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Card Flutuante Verde Escuro */}
            <div className="absolute -bottom-6 right-0 sm:right-4 lg:-right-6 bg-[#0b3823] text-white p-5 sm:p-6 rounded-2xl shadow-2xl max-w-[220px] sm:max-w-[240px] z-20 border border-emerald-900/50">
              <h3 className="text-lg sm:text-xl font-bold mb-2 tracking-tight">
                Eco Vila
              </h3>
              <p className="text-emerald-100 text-xs font-light leading-relaxed">
                Natureza + conforto + mobilidade + investimento
              </p>
            </div>
          </div>

          {/* COLUNA DIREITA: CONTEÚDO E PILARES */}
          <div className="lg:col-span-6 flex flex-col gap-6 lg:pl-4">
            <span className="text-[#0b3823] text-xs font-bold tracking-widest uppercase">
              O Conceito
            </span>

            <h2 className="text-[#0b3823] text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
              Mais que um chalé.{' '}
              <span className="block font-normal">Uma experiência de vida.</span>
            </h2>

            <p className="text-gray-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
              O Chalet To Go nasce com uma proposta simples: criar um lugar onde a arquitetura, a natureza e a praticidade convivam em equilíbrio.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {pillars.map((pillar, index) => (
                <div
                  key={index}
                  onClick={() => handlePillarClick(pillar.title)}
                  className="bg-[#fafcfa] p-5 rounded-2xl border border-gray-100/80 hover:border-emerald-200 hover:shadow-md transition-all flex flex-col gap-2 cursor-pointer"
                >
                  <span className="text-2xl mb-1">{pillar.icon}</span>
                  <h4 className="text-[#0b3823] font-bold text-base">
                    {pillar.title}
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}