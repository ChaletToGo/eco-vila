'use client';

import React from 'react';
import { trackSiteEvent } from '@/lib/trackSiteEvent';

interface FooterProps {
  landingPageSlug?: string;
  locationName?: string;
  address?: string;
  phone?: string;
  phoneFormatted?: string;
}

export default function Footer({
  landingPageSlug = 'jaboticatubas-mg',
  locationName = 'Jaboticatubas',
  address = 'Avenida 02, nº 1868',
  phone = '5538997332966',
  phoneFormatted = '(38) 99733-2966',
}: FooterProps) {
  const handlePhoneClick = () => {
    trackSiteEvent({
      eventName: 'cta_click',
      landingPageSlug,
      locationName,
      componentName: 'Footer',
      buttonLabel: `Telefone WhatsApp: ${phoneFormatted}`,
    });
  };

  return (
    <footer className="w-full bg-[#051c12] border-t border-emerald-950 text-white/80 py-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
        
        {/* Lado Esquerdo: Marca / Projeto */}
        <div className="flex items-center gap-2">
          <span className="font-extrabold tracking-wide text-white">
            CHALET TO GO
          </span>
          <span className="text-emerald-700">•</span>
          <span className="text-emerald-200/70 font-light">
            Eco Vila {locationName}
          </span>
        </div>

        {/* Lado Direito: Telefone e Endereço */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 text-emerald-100/70 font-light">
          <span className="text-base" role="img" aria-label="telefone">
            📱
          </span>
          <a
            href={`https://wa.me/${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handlePhoneClick}
            className="hover:text-white transition-colors"
          >
            {phoneFormatted}
          </a>
          <span className="text-emerald-700">•</span>
          <span>{address}</span>
        </div>

      </div>
    </footer>
  );
}