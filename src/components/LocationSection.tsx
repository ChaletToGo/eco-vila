'use client';

import React from 'react';
import { trackSiteEvent } from '@/lib/trackSiteEvent';

interface LocationSectionProps {
  landingPageSlug?: string;
  locationName?: string;
}

export default function LocationSection({
  landingPageSlug = 'jaboticatubas-mg',
  locationName = 'Jaboticatubas - MG',
}: LocationSectionProps) {
  const distances = [
    { place: 'Centro de Jaboticatubas', distance: '8 km' },
    { place: 'Lagoa Santa', distance: '25 km' },
    { place: 'Belo Horizonte', distance: '55 km' },
    { place: 'Aeroporto de Confins', distance: '35 km' },
  ];

  const displayAddress = 'Avenida 02, nº 1868, Bairro Bom Jardim, Jaboticatubas - MG';

  // SUSTITUA estes valores pelas coordenadas exatas do seu terreno no Google Maps
  const latitude = '-19.512345';
  const longitude = '-43.789012';

  // Embed direto pelas coordenadas geográficas (garante a exibição sem falhas)
  const iframeMapSrc = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
  const mapDirectUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  const handleMapClick = () => {
    trackSiteEvent({
      eventName: 'cta_click',
      landingPageSlug,
      locationName,
      componentName: 'LocationSection',
      buttonLabel: 'Abrir no Google Maps',
    });
  };

  return (
    <section id="localizacao" className="w-full bg-[#072618] text-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* COLUNA ESQUERDA: TEXTO E TABELA DE DISTÂNCIAS */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-[#82c496] text-xs font-bold tracking-widest uppercase">
              Localização
            </span>

            <h2 className="text-white text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
              Natureza perto de tudo que importa.
            </h2>

            <p className="text-emerald-100/80 text-base font-light leading-relaxed">
              A Eco Vila está localizada na {displayAddress}.
            </p>

            <div className="bg-[#0b3823]/60 backdrop-blur-md rounded-2xl p-6 border border-emerald-800/40 mt-2 shadow-lg">
              <div className="flex flex-col divide-y divide-emerald-800/50">
                {distances.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3.5 first:pt-0 last:pb-0"
                  >
                    <span className="text-emerald-100/90 text-sm font-medium">
                      {item.place}
                    </span>
                    <span className="text-white text-sm font-extrabold tracking-tight">
                      {item.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: MAPA INTERATIVO EMBUTIDO */}
          <div className="lg:col-span-7 h-full flex flex-col items-end gap-3">
            <div className="relative w-full aspect-[4/3] max-h-[480px] bg-[#0b3823] rounded-3xl overflow-hidden border border-emerald-800/40 shadow-2xl">
              <iframe
                title="Localização Eco Vila Jaboticatubas"
                src={iframeMapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full rounded-3xl opacity-95 hover:opacity-100 transition-all duration-300"
              />
            </div>

            <a
              href={mapDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleMapClick}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#82c496] hover:text-white transition-colors pt-1"
            >
              <span>Abrir no Google Maps</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}