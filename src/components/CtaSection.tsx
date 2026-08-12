'use client';

import React from 'react';
import { trackSiteEvent } from '@/lib/trackSiteEvent';

interface CtaSectionProps {
  landingPageSlug?: string;
  locationName?: string;
}

export default function CtaSection({
  landingPageSlug = 'jaboticatubas-mg',
  locationName = 'Jaboticatubas - MG',
}: CtaSectionProps) {
  const whatsappUrl =
    'https://wa.me/5500000000000?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20consultor%20sobre%20a%20Eco%20Vila.';

  const handleCtaClick = () => {
    trackSiteEvent({
      eventName: 'cta_click',
      landingPageSlug,
      locationName,
      componentName: 'CtaSection',
      buttonLabel: 'Falar com um consultor',
    });
  };

  return (
    <section className="w-full bg-[#f1f6f1] py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Card Principal Verde Escuro */}
        <div className="relative bg-[#0c4a2d] text-white rounded-[2.5rem] p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          {/* Círculos Decorativos Abstratos ao Fundo */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-white/5 rounded-full border border-white/10 pointer-events-none translate-x-1/3"></div>
          <div className="absolute right-12 top-1/2 -translate-y-1/2 w-[250px] sm:w-[320px] h-[250px] sm:h-[320px] bg-white/5 rounded-full pointer-events-none translate-x-1/3"></div>

          {/* Lado Esquerdo: Textos */}
          <div className="flex flex-col gap-4 max-w-2xl relative z-10">
            {/* Tag / Subtítulo */}
            <span className="text-[#a3e635] text-xs font-bold tracking-widest uppercase">
              Seu próximo passo
            </span>

            {/* Título Principal */}
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Seu refúgio na natureza pode começar agora.
            </h2>

            {/* Descrição */}
            <p className="text-emerald-100/90 text-sm sm:text-base font-light leading-relaxed">
              Fale com a equipe do Chalet To Go, conheça os modelos disponíveis e descubra qual combina com você.
            </p>
          </div>

          {/* Lado Direito: Botão CTA */}
          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCtaClick}
              className="inline-flex items-center justify-center gap-3 bg-white text-[#0c4a2d] font-bold px-8 py-4 rounded-full hover:bg-emerald-50 transition-all transform hover:-translate-y-0.5 shadow-lg w-full md:w-auto text-sm sm:text-base"
            >
              {/* Ícone de Balão de Fala */}
              <svg
                className="w-5 h-5 text-[#0c4a2d]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
              </svg>
              <span>Falar com um consultor</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}