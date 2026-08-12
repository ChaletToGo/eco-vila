'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Phone, MapPin } from 'lucide-react';
import { trackSiteEvent } from '@/lib/trackSiteEvent';
import { supabase } from '@/lib/supabase';

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
  phone: initialPhone = '5538997332966',
  phoneFormatted: initialPhoneFormatted = '(38) 99733-2966',
}: FooterProps) {
  const [phone, setPhone] = useState(initialPhone);
  const [phoneFormatted, setPhoneFormatted] = useState(initialPhoneFormatted);

  useEffect(() => {
    async function fetchLocationData() {
      try {
        const { data, error } = await supabase
          .from('locations')
          .select('phone, phone_formatted')
          .eq('slug', landingPageSlug)
          .single();

        if (error) return;

        if (data) {
          if (data.phone) setPhone(data.phone);
          if (data.phone_formatted) setPhoneFormatted(data.phone_formatted);
        }
      } catch (err) {
        // Silenciosamente mantém os valores padrões
      }
    }

    fetchLocationData();
  }, [landingPageSlug]);

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
    <footer className="w-full bg-[#051c12] border-t border-emerald-950/80 text-white/80 py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs sm:text-sm">
        
        {/* Lado Esquerdo: Logo e Identificação */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="Chalet To Go Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain brightness-0 invert"
          />
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-wider text-white uppercase text-sm">
              CHALET TO GO
            </span>
            <span className="text-emerald-800">•</span>
            <span className="text-emerald-200/70 font-light">
              Eco Vila {locationName}
            </span>
          </div>
        </div>

        {/* Lado Direito: Telefone e Endereço */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-4 sm:gap-6 text-emerald-100/80 font-light">
          
          {/* Telefone / WhatsApp vindo do Supabase */}
          <a
            href={`https://wa.me/${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handlePhoneClick}
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            <Phone className="w-4 h-4 text-emerald-500 group-hover:text-emerald-400 transition-colors" />
            <span>{phoneFormatted}</span>
          </a>

          <span className="hidden sm:inline text-emerald-800">•</span>

          {/* Endereço */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <span>{address}</span>
          </div>

        </div>

      </div>
    </footer>
  );
}