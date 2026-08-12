'use client';

import { useEffect } from 'react';
import { trackSiteEvent } from '@/lib/trackSiteEvent';

interface TrackPageViewOptions {
  landingPageSlug: string;
  locationName: string;
}

export function useTrackPageView({ landingPageSlug, locationName }: TrackPageViewOptions) {
  useEffect(() => {
    trackSiteEvent({
      eventName: 'page_view',
      landingPageSlug,
      locationName,
      componentName: 'LandingPage',
    });
  }, [landingPageSlug, locationName]);
}