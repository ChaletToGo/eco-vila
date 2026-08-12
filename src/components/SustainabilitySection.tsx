'use client';

import React from 'react';
import { trackSiteEvent } from '@/lib/trackSiteEvent';

interface SustainabilitySectionProps {
  landingPageSlug?: string;
  locationName?: string;
}

export default function SustainabilitySection({
  landingPageSlug = 'jaboticatubas-mg',
  locationName = 'Jaboticatubas - MG',
}: SustainabilitySectionProps) {
  const items = [
    {
      icon: '☀️',
      title: 'Energia solar',
      description: 'Geração fotovoltaica como parte da proposta sustentável da Eco Vila.',
    },
    {
      icon: '💧',
      title: 'Água da chuva',
      description: 'Captação e armazenamento para uso racional dos recursos hídricos.',
    },
    {
      icon: '♻️',
      title: 'Reuso e compostagem',
      description: 'Soluções para reaproveitamento de água, resíduos e matéria orgânica.',
    },
    {
      icon: '🌱',
      title: 'Horta comunitária',
      description: 'Produção compartilhada e mais contato com a natureza no dia a dia.',
    },
    {
      icon: '🌳',
      title: 'Área verde',
      description: 'Cerca viva, arborização e cerca de 60% do terreno verde/permeável.',
    },
    {
      icon: '💡',
      title: 'Iluminação LED',
      description: 'Mais eficiência energética nas áreas planejadas da Eco Vila.',
    },
  ];

  const handleItemClick = (title: string) => {
    trackSiteEvent({
      eventName: 'cta_click',
      landingPageSlug,
      locationName,
      componentName: 'SustainabilitySection',
      buttonLabel: `Card: ${title}`,
    });
  };

  return (
    <section id="sustentabilidade" className="w-full bg-[#f1f6f1] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col gap-3 mb-12">
          <span className="text-[#0b3823] text-xs font-bold tracking-widest uppercase">
            Sustentabilidade
          </span>
          <h2 className="text-[#0b3823] text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
            Viver melhor também é<br className="hidden sm:inline" /> cuidar do lugar.
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-light max-w-2xl">
            O projeto incorpora soluções para reduzir impactos e tornar a experiência mais eficiente em {locationName}.
          </p>
        </div>

        {/* Grid dos 6 Cards de Sustentabilidade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(item.title)}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100/80 flex flex-col gap-3 cursor-pointer group"
            >
              <span className="text-3xl mb-1 transform group-hover:scale-110 transition-transform origin-left">
                {item.icon}
              </span>
              <h3 className="text-[#0b3823] text-lg font-bold tracking-tight group-hover:text-emerald-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}