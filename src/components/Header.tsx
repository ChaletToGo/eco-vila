'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { trackSiteEvent } from '@/lib/trackSiteEvent';

interface HeaderProps {
  landingPageSlug?: string;
  locationName?: string;
  whatsappNumber?: string;
}

export default function Header({
  landingPageSlug = 'jaboticatubas-mg',
  locationName = 'Jaboticatubas - MG',
  whatsappNumber,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cleanNumber = whatsappNumber ? whatsappNumber.replace(/\D/g, '') : '';
  const formattedNumber = cleanNumber
    ? cleanNumber.startsWith('55')
      ? cleanNumber
      : `55${cleanNumber}`
    : '5500000000000';

  const whatsappUrl = `https://wa.me/${formattedNumber}?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20Eco%20Vila%20${encodeURIComponent(
    locationName
  )}.`;

  const handleWhatsappClick = () => {
    trackSiteEvent({
      eventName: 'cta_click',
      landingPageSlug,
      locationName,
      componentName: 'Header',
      buttonLabel: 'Falar no WhatsApp',
    });
  };

  const handleNavClick = (label: string) => {
    // Rastreia o evento sem bloquear o comportamento nativo do <a>
    trackSiteEvent({
      eventName: 'cta_click',
      landingPageSlug,
      locationName,
      componentName: 'Header',
      buttonLabel: `Nav: ${label}`,
    });

    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full font-sans sticky top-0 z-50 bg-white border-b border-gray-100 shadow-xs">
      {/* Top Bar Verde */}
      <div className="bg-[#0b3823] text-white text-[12px] sm:text-[13px] py-1.5 px-4 sm:px-12 font-medium tracking-tight">
        <div className="max-w-7xl mx-auto flex flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <svg
              className="w-3.5 h-3.5 text-[#86efac] shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17 8C8 10 5.9 16.17 3.83 12 21c0 0 1.17-8.17 8-10 6.83 1.83 8 10 8 10z" />
              <path d="M12 21c-3-3-4-8-4-8s5 1 8 4c0 0-1 4-4 4z" />
            </svg>
            <span className="text-[#e2e8f0] font-normal">
              <strong className="font-semibold text-white">Eco Vila</strong> • {locationName}
            </span>
          </div>

          <div className="text-[#cbd5e1] text-[12px] font-normal tracking-normal hidden md:block">
            Chalés móveis <span className="mx-1">•</span> Sustentabilidade <span className="mx-1">•</span> Investimento
          </div>
        </div>
      </div>

      {/* Header Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-12 py-3.5 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 bg-[#0b3823] transition-transform group-hover:scale-105 shrink-0"
            style={{
              maskImage: 'url(/logo.svg)',
              WebkitMaskImage: 'url(/logo.svg)',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
            }}
            aria-label="Chalet To Go Logo"
          />

          <div className="flex flex-col justify-center">
            <span className="font-extrabold text-[15px] sm:text-[17px] text-[#0b3823] tracking-tight leading-none">
              CHALET TO GO
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-[#155e3b] tracking-[0.22em] uppercase leading-tight mt-1">
              ECO VILA {locationName.split('-')[0].trim().toUpperCase()}
            </span>
          </div>
        </Link>

        {/* MENU DE NAVEGAÇÃO DESKTOP */}
        <nav className="hidden lg:flex items-center gap-7 text-[14px] font-semibold text-[#1e293b]">
          <a
            href="#conceito"
            onClick={() => handleNavClick('O conceito')}
            className="hover:text-[#0b3823] transition-colors py-1 cursor-pointer"
          >
            O conceito
          </a>
          <a
            href="#chales"
            onClick={() => handleNavClick('Chalés')}
            className="hover:text-[#0b3823] transition-colors py-1 cursor-pointer"
          >
            Chalés
          </a>
          <a
            href="#projeto"
            onClick={() => handleNavClick('Projeto')}
            className="hover:text-[#0b3823] transition-colors py-1 cursor-pointer"
          >
            Projeto
          </a>
          <a
            href="#sustentabilidade"
            onClick={() => handleNavClick('Sustentabilidade')}
            className="hover:text-[#0b3823] transition-colors py-1 cursor-pointer"
          >
            Sustentabilidade
          </a>
          <a
            href="#localizacao"
            onClick={() => handleNavClick('Localização')}
            className="hover:text-[#0b3823] transition-colors py-1 cursor-pointer"
          >
            Localização
          </a>
        </nav>

        {/* BOTÃO WHATSAPP */}
        <div className="hidden lg:block">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsappClick}
            className="inline-block bg-[#0b3823] text-white text-[13px] font-semibold px-6 py-2.5 rounded-full hover:bg-[#072618] transition-all shadow-xs"
          >
            Falar no WhatsApp
          </a>
        </div>

        {/* BOTÃO MOBILE */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-[#0b3823] hover:opacity-80 focus:outline-none"
          aria-label="Abrir menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MENU MOBILE */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-3 shadow-lg">
          <a
            href="#conceito"
            onClick={() => handleNavClick('O conceito')}
            className="text-[#1e293b] font-semibold text-sm hover:text-[#0b3823] py-2 border-b border-gray-50 cursor-pointer"
          >
            O conceito
          </a>
          <a
            href="#chales"
            onClick={() => handleNavClick('Chalés')}
            className="text-[#1e293b] font-semibold text-sm hover:text-[#0b3823] py-2 border-b border-gray-50 cursor-pointer"
          >
            Chalés
          </a>
          <a
            href="#projeto"
            onClick={() => handleNavClick('Projeto')}
            className="text-[#1e293b] font-semibold text-sm hover:text-[#0b3823] py-2 border-b border-gray-50 cursor-pointer"
          >
            Projeto
          </a>
          <a
            href="#sustentabilidade"
            onClick={() => handleNavClick('Sustentabilidade')}
            className="text-[#1e293b] font-semibold text-sm hover:text-[#0b3823] py-2 border-b border-gray-50 cursor-pointer"
          >
            Sustentabilidade
          </a>
          <a
            href="#localizacao"
            onClick={() => handleNavClick('Localização')}
            className="text-[#1e293b] font-semibold text-sm hover:text-[#0b3823] py-2 border-b border-gray-50 cursor-pointer"
          >
            Localização
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsappClick}
            className="mt-2 text-center bg-[#0b3823] text-white font-semibold text-sm py-2.5 rounded-full hover:bg-[#072618]"
          >
            Falar no WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}