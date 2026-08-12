'use client';

import React, { useEffect, useRef } from 'react';
import { trackSiteEvent } from '@/lib/trackSiteEvent';

interface SectionTrackerProps {
  componentName: string;
  landingPageSlug?: string;
  locationName?: string;
  children: React.ReactNode;
  minTimeSeconds?: number; // Tempo mínimo em segundos para considerar engajamento (padrão: 1s)
}

export default function SectionTracker({
  componentName,
  landingPageSlug = 'jaboticatubas-mg',
  locationName = 'Jaboticatubas - MG',
  children,
  minTimeSeconds = 1,
}: SectionTrackerProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const entryTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 1. O usuário começou a visualizar o componente
            entryTimeRef.current = Date.now();

            trackSiteEvent({
              eventName: 'component_view',
              componentName,
              landingPageSlug,
              locationName,
            });
          } else {
            // 2. O usuário saiu do componente: calcula o tempo retido
            if (entryTimeRef.current) {
              const durationSeconds = Math.round((Date.now() - entryTimeRef.current) / 1000);
              entryTimeRef.current = null;

              if (durationSeconds >= minTimeSeconds) {
                trackSiteEvent({
                  eventName: 'component_engagement',
                  componentName,
                  landingPageSlug,
                  locationName,
                  metadata: {
                    time_visible_seconds: durationSeconds,
                  },
                });
              }
            }
          }
        });
      },
      { threshold: 0.4 } // Considera ativo quando ao menos 40% do componente está na tela
    );

    observer.observe(el);

    return () => {
      // Se o usuário fechar a aba/navegar enquanto estava vendo o componente, registra o tempo acumulado
      if (entryTimeRef.current) {
        const durationSeconds = Math.round((Date.now() - entryTimeRef.current) / 1000);
        if (durationSeconds >= minTimeSeconds) {
          trackSiteEvent({
            eventName: 'component_engagement',
            componentName,
            landingPageSlug,
            locationName,
            metadata: { time_visible_seconds: durationSeconds },
          });
        }
      }
      observer.disconnect();
    };
  }, [componentName, landingPageSlug, locationName, minTimeSeconds]);

  return (
    <div ref={sectionRef} data-component-name={componentName}>
      {children}
    </div>
  );
}