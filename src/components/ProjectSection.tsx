'use client';

import React from 'react';
import Image from 'next/image';
import { trackSiteEvent } from '@/lib/trackSiteEvent';

interface ProjectSectionProps {
  landingPageSlug?: string;
  locationName?: string;
}

export default function ProjectSection({
  landingPageSlug = 'jaboticatubas-mg',
  locationName = 'Jaboticatubas - MG',
}: ProjectSectionProps) {
  const projectFeatures = [
    {
      title: 'Área comum de 100 m²',
      description: 'Redário, pergolado, fogo de chão, horta e pomar.',
    },
    {
      title: 'Estacionamento',
      description: 'Espaço interno com 2 vagas indicadas no projeto.',
    },
    {
      title: 'Infraestrutura planejada',
      description: 'Portão automatizado, piso permeável e cerca viva no perímetro.',
    },
    {
      title: '5 unidades',
      description: 'Chalés distribuídos para preservar áreas verdes e espaços de convivência.',
    },
  ];

  const handleFeatureClick = (title: string) => {
    trackSiteEvent({
      eventName: 'cta_click',
      landingPageSlug,
      locationName,
      componentName: 'ProjectSection',
      buttonLabel: `Feature: ${title}`,
    });
  };

  return (
    <section id="projeto" className="w-full bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* COLUNA ESQUERDA: IMPLANTAÇÃO / PLANTA */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[450px] aspect-[1/2] bg-neutral-100 rounded-3xl p-3 shadow-xl border border-neutral-100 overflow-hidden group">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/project-section.png"
                  alt={`Implantação da Eco Vila Chalet To Go em ${locationName}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: DETALHES DO PROJETO */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Tag / Subtítulo */}
            <span className="text-[#0b3823] text-xs font-bold tracking-widest uppercase">
              O Projeto
            </span>

            {/* Título Principal */}
            <h2 className="text-[#0b3823] text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
              Um pequeno condomínio pensado nos detalhes.
            </h2>

            {/* Descrição em Destaque */}
            <p className="text-gray-600 text-base sm:text-lg font-light leading-relaxed">
              O terreno de 16 × 30 metros foi planejado para equilibrar unidades privativas, circulação, convivência e áreas verdes.
            </p>

            {/* Lista de Recursos */}
            <div className="flex flex-col gap-6 mt-4">
              {projectFeatures.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleFeatureClick(item.title)}
                  className="flex items-start gap-4 cursor-pointer group"
                >
                  {/* Ícone Check Verde */}
                  <div className="w-7 h-7 bg-emerald-100 group-hover:bg-[#0b3823] transition-colors rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-emerald-700 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  
                  {/* Texto */}
                  <div className="flex flex-col">
                    <h3 className="text-[#0b3823] font-bold text-base sm:text-lg group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm font-light mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}