'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { trackSiteEvent } from '@/lib/trackSiteEvent';

interface HeroBannerProps {
  landingPageSlug?: string;
  locationName?: string;
}

export default function HeroBanner({
  landingPageSlug = 'jaboticatubas-mg',
  locationName = 'Jaboticatubas - MG',
}: HeroBannerProps) {
  const stats = [
    { value: '480 m²', label: 'Área total do lote' },
    { value: '5', label: 'Unidades habitacionais' },
    { value: '100 m²', label: 'Área comum' },
    { value: '60%', label: 'Área verde/permeável' },
  ];

  const handleCtaClick = (buttonLabel: string) => {
    trackSiteEvent({
      eventName: 'cta_click',
      landingPageSlug,
      locationName,
      componentName: 'HeroBanner',
      buttonLabel,
    });
  };

  return (
    <section className="relative w-full bg-[#f1f6f1] pt-6 sm:pt-16 md:pt-24 overflow-hidden flex flex-col justify-between">
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#e6eee6] rounded-full translate-x-1/3 -translate-y-1/3 opacity-60 z-0 pointer-events-none"></div>
      <div className="absolute bottom-20 left-0 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-[#e6eee6] rounded-full -translate-x-1/3 translate-y-1/3 opacity-60 z-0 pointer-events-none"></div>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 relative z-10 mb-10 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* COLUNA ESQUERDA: TEXTO E AÇÕES */}
          <div className="flex flex-col gap-4 sm:gap-6 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-6 sm:w-8 h-px bg-[#0b3823] opacity-60"></div>
              <span className="text-[#0b3823] text-[11px] sm:text-xs font-bold tracking-widest uppercase opacity-90">
                Uma nova forma de viver
              </span>
            </div>

            <h1 className="text-[#0b3823] text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[1.15] tracking-tight">
              Seu refúgio na natureza,{' '}
              <span className="font-serif font-medium italic text-[#0b3823]/90 block sm:inline">
                do seu jeito.
              </span>
            </h1>

            <p className="text-gray-700 text-base sm:text-lg max-w-lg font-light leading-relaxed">
              Uma Eco Vila planejada para quem busca bem-estar, segurança, contato com a natureza e um investimento inteligente em {locationName}.
            </p>

            {/* IMAGEM NO MOBILE: Posicionada entre a descrição e os botões */}
            <div className="block md:hidden my-2">
              <div className="relative w-full aspect-[5/4] bg-white rounded-2xl p-2 shadow-xl border border-gray-100 overflow-hidden">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src="/hero-banner.png"
                    alt={`Projeto da Eco Vila Chalet To Go em ${locationName}`}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>

                {/* Card de Preço sobreposto no mobile */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-2.5 rounded-xl shadow-md border border-gray-100 flex items-center gap-2.5 z-20">
                  <div className="bg-[#f0f9f0] p-1.5 rounded-lg shrink-0">
                    <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 8C8 10 59 16.17 3.83 12 21c0 0 1.17-8.17 8-10 6.83 1.83 8 10 8 10z"></path>
                      <path d="M12 21c-3-3-4-8-4-8s5 1 8 4c0 0-1 4-4 4z" opacity="0.5"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[10px] font-light">A partir de</span>
                    <span className="text-[#0b3823] text-sm font-bold">R$ 65 mil</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTÕES DE AÇÃO */}
            <div className="flex flex-col sm:flex-row gap-3 mt-1 sm:mt-2 w-full">
              <Link
                href="#chales"
                onClick={() => handleCtaClick('Conheça os modelos')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0b3823] text-white font-bold px-8 py-3.5 sm:py-4 rounded-full hover:bg-[#072618] active:scale-[0.98] transition-all shadow-md text-center text-sm sm:text-base"
              >
                Conheça os modelos →
              </Link>
              <Link
                href="#projeto"
                onClick={() => handleCtaClick('Ver o projeto')}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-[#0b3823] font-bold px-8 py-3.5 sm:py-4 rounded-full border border-gray-200 hover:border-gray-300 active:bg-gray-100 transition-all shadow-sm text-center text-sm sm:text-base"
              >
                Ver o projeto
              </Link>
            </div>

            {/* Checkmarks */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 mt-2 sm:mt-4 pt-4 sm:pt-6 border-t border-gray-200/60">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#0b3823]/90 font-medium">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Chalés prontos para morar</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#0b3823]/90 font-medium">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Lote de 480 m²</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#0b3823]/90 font-medium">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Projeto sustentável</span>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: IMAGEM APENAS PARA DESKTOP */}
          <div className="hidden md:flex relative justify-end items-center">
            <div className="relative w-full max-w-[540px] aspect-[5/4] bg-white rounded-3xl p-3 shadow-2xl shadow-gray-200/80 border border-gray-100 overflow-hidden group">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/hero-banner.png"
                  alt={`Projeto da Eco Vila Chalet To Go em ${locationName}`}
                  fill
                  priority
                  sizes="540px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Card de Preço Flutuante Desktop */}
            <div className="absolute bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 z-20">
              <div className="bg-[#f0f9f0] p-3 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 8C8 10 59 16.17 3.83 12 21c0 0 1.17-8.17 8-10 6.83 1.83 8 10 8 10z"></path>
                  <path d="M12 21c-3-3-4-8-4-8s5 1 8 4c0 0-1 4-4 4z" opacity="0.5"></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs font-light">A partir de</span>
                <span className="text-[#0b3823] text-xl font-bold">R$ 65 mil</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BANNER DE ESTATÍSTICAS */}
      <div className="w-full bg-[#072618] text-white border-t border-emerald-900/40 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-emerald-900/60">
          {stats.map((stat, index) => (
            <div key={index} className={`flex flex-col items-center justify-center text-center ${index > 1 ? 'pt-4 md:pt-0' : ''}`}>
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-emerald-200/80 font-light mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}