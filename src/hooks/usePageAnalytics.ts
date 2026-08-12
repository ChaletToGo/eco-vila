'use client';

import { useEffect, useRef } from 'react';
import { trackSiteEvent } from '@/lib/trackSiteEvent';

interface UsePageAnalyticsProps {
  landingPageSlug?: string;
  locationName?: string;
}

export function usePageAnalytics({
  landingPageSlug = 'jaboticatubas-mg',
  locationName = 'Jaboticatubas - MG',
}: UsePageAnalyticsProps = {}) {
  const trackedDepths = useRef<Set<number>>(new Set());
  const maxScroll = useRef<number>(0);
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // --- RASTREIO DE SCROLL ---
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Calcular % rolado
      const scrollPercent = Math.round((scrollTop / (fullHeight - windowHeight)) * 100);
      if (scrollPercent > maxScroll.current) {
        maxScroll.current = Math.min(scrollPercent, 100);
      }

      // Disparar marcos: 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !trackedDepths.current.has(milestone)) {
          trackedDepths.current.add(milestone);

          trackSiteEvent({
            eventName: 'scroll_depth',
            landingPageSlug,
            locationName,
            metadata: { depth_percentage: milestone },
          });
        }
      });
    };

    // --- RASTREIO DE SAÍDA E TEMPO TOTAL ---
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const timeSpentSeconds = Math.round((Date.now() - startTime.current) / 1000);

        // Só rastreia se ficou mais de 2 segundos na página
        if (timeSpentSeconds >= 2) {
          trackSiteEvent({
            eventName: 'page_leave',
            landingPageSlug,
            locationName,
            metadata: {
              time_spent_seconds: timeSpentSeconds,
              max_scroll_percentage: maxScroll.current,
            },
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [landingPageSlug, locationName]);
}