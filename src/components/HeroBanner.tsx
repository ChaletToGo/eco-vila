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
    { value: '6', label: 'Unidades habitacionais' },
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
    <section className="relative w-full bg-[#f1f6f1] pt-16 md:pt-24 overflow-hidden flex flex-col justify-between">
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e6eee6] rounded-full translate-x-1/2 -translate-y-1/2 opacity-60 z-0 pointer-events-none"></div>
      <div className="absolute bottom-20 left-0 w-[300px] h-[300px] bg-[#e6eee6] rounded-full -translate-x-1/2 translate-y-1/2 opacity-60 z-0 pointer-events-none"></div>

      {/* Conteúdo Principal do Hero Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-16 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* COLUNA ESQUERDA: TEXTO */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-[#0b3823] opacity-60"></div>
              <span className="text-[#0b3823] text-xs font-bold tracking-widest uppercase opacity-90">
                Uma nova forma de viver
              </span>
            </div>

            <h1 className="text-[#0b3823] text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Seu refúgio na natureza,{' '}
              <span className="font-serif font-medium italic text-[#0b3823]/90">
                do seu jeito.
              </span>
            </h1>

            <p className="text-gray-700 text-lg max-w-lg font-light leading-relaxed">
              Uma Eco Vila planejada para quem busca bem-estar, segurança, contato com a natureza e um investimento inteligente em {locationName}.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link
                href="#modelos"
                onClick={() => handleCtaClick('Conheça os modelos')}
                className="inline-flex items-center justify-center gap-2 bg-[#0b3823] text-white font-bold px-8 py-4 rounded-full hover:bg-[#072618] transition-all transform hover:-translate-y-0.5 shadow-md"
              >
                Conheça os modelos →
              </Link>
              <Link
                href="#projeto"
                onClick={() => handleCtaClick('Ver o projeto')}
                className="inline-flex items-center justify-center bg-white text-[#0b3823] font-bold px-8 py-4 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
              >
                Ver o projeto
              </Link>
            </div>

            {/* Checkmarks */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 mt-4 pt-6 border-t border-gray-200/60">
              <div className="flex items-center gap-2 text-sm text-[#0b3823]/90 font-medium">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Chalés prontos para morar</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#0b3823]/90 font-medium">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Lote de 480 m²</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#0b3823]/90 font-medium">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Projeto sustentável</span>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: IMAGEM E CARD DE PREÇO */}
          <div className="relative flex justify-center md:justify-end items-center">
            <div className="relative w-full max-w-[540px] aspect-[5/4] bg-white rounded-3xl p-3 shadow-2xl shadow-gray-200/80 border border-gray-100 overflow-hidden group">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/hero-banner.png"
                  alt={`Projeto da Eco Vila Chalet To Go em ${locationName}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 540px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Card de Preço Flutuante */}
            <div className="absolute bottom-6 left-[-10px] md:left-[-30px] bg-white p-4 sm:p-5 rounded-2xl shadow-xl shadow-gray-200/80 border border-gray-100 flex items-center gap-4 z-20">
              <div className="bg-[#f0f9f0] p-3 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 8C8 10 59 16.17 3.83 12 21c0 0 1.17-8.17 8-10 6.83 1.83 8 10 8 10z"></path>
                  <path d="M12 21c-3-3-4-8-4-8s5 1 8 4c0 0-1 4-4 4z" opacity="0.5"></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs font-light tracking-wide">A partir de</span>
                <span className="text-[#0b3823] text-xl font-bold tracking-tight">R$ 65 mil</span>
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