import { supabase } from '@/lib/supabase';

export interface TrackSiteEventParams {
  eventName:
    | 'page_view'
    | 'click_book_interest'
    | 'cta_click'
    | 'scroll_depth'
    | 'component_view'
    | 'component_engagement'
    | 'page_leave';
  landingPageSlug?: string;
  locationName?: string;
  componentName?: string;
  buttonLabel?: string;
  modelSlug?: string;
  value?: number; // Valor financeiro (ex: valor do chalé ou ticket estimado)
  currency?: string; // Moeda (padrão: BRL)
  metadata?: Record<string, any>;
}

/**
 * Envia o evento correspondente para o Meta Pixel (Facebook)
 * Incluindo 'value' e 'currency' para otimizar cálculos de CPA e ROAS.
 */
function trackMetaPixelEvent(params: TrackSiteEventParams) {
  if (typeof window === 'undefined' || !(window as any).fbq) return;

  const {
    eventName,
    locationName,
    componentName,
    buttonLabel,
    modelSlug,
    value,
    currency = 'BRL',
  } = params;

  const fbq = (window as any).fbq;

  switch (eventName) {
    case 'page_view':
      fbq('track', 'PageView');
      break;

    case 'click_book_interest':
      // Mapeia como Lead para cálculo de CPA no Gerenciador de Anúncios.
      // Se houver valor informado, envia para estimativa de ROAS.
      fbq('track', 'Lead', {
        content_name: modelSlug || 'Modelo de Chalé',
        content_category: locationName,
        button_label: buttonLabel,
        ...(value !== undefined && { value, currency }),
      });
      break;

    case 'cta_click':
      // Mapeia cliques de contato direto (ex: botão de WhatsApp)
      fbq('track', 'Contact', {
        content_name: buttonLabel || componentName,
        content_category: locationName,
        ...(value !== undefined && { value, currency }),
      });
      break;

    case 'component_view':
      if (modelSlug) {
        fbq('track', 'ViewContent', {
          content_name: modelSlug,
          content_category: locationName,
          ...(value !== undefined && { value, currency }),
        });
      }
      break;

    default:
      // Eventos customizados
      fbq('trackCustom', eventName, {
        location_name: locationName,
        component_name: componentName,
        button_label: buttonLabel,
        model_slug: modelSlug,
        ...(value !== undefined && { value, currency }),
      });
      break;
  }
}

/**
 * Obtém ou gera um ID de sessão com fallback seguro em memória
 * caso o sessionStorage esteja bloqueado pelo navegador.
 */
function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '';

  try {
    let sessionId = sessionStorage.getItem('eco_session_id');
    if (!sessionId) {
      sessionId =
        'sess_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      sessionStorage.setItem('eco_session_id', sessionId);
    }
    return sessionId;
  } catch (err) {
    console.warn('[Analytics] sessionStorage indisponível, usando ID de sessão em memória.');
    return 'sess_fallback_' + Math.random().toString(36).substring(2, 15);
  }
}

/**
 * Verifica com segurança se o page_view já foi disparado nesta aba
 */
function isPageViewAlreadyTracked(path: string): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const pageKey = `pv_tracked_${path}`;
    const alreadyTracked = sessionStorage.getItem(pageKey);

    if (alreadyTracked) {
      return true;
    }

    sessionStorage.setItem(pageKey, 'true');
    return false;
  } catch (err) {
    return false;
  }
}

export async function trackSiteEvent(params: TrackSiteEventParams) {
  const {
    eventName,
    landingPageSlug = 'jaboticatubas-mg',
    locationName = 'Jaboticatubas - MG',
    componentName,
    buttonLabel,
    modelSlug,
    value,
    currency = 'BRL',
    metadata = {},
  } = params;

  try {
    if (typeof window === 'undefined') return;

    // Regra anti-F5 para page_view
    if (eventName === 'page_view') {
      const isTracked = isPageViewAlreadyTracked(window.location.pathname);
      if (isTracked) {
        console.log(`[Analytics] Page view ignorado (já registrado em: ${window.location.pathname})`);
        return;
      }
    }

    // 1. Dispara o evento no Meta Pixel
    trackMetaPixelEvent(params);

    // 2. Leitura segura dos parâmetros UTM da URL
    let urlParams: URLSearchParams | null = null;
    try {
      urlParams = new URLSearchParams(window.location.search);
    } catch (e) {
      console.warn('[Analytics] Erro ao ler URLSearchParams:', e);
    }

    const payload = {
      event_name: eventName,
      landing_page_slug: landingPageSlug,
      location_name: locationName,
      component_name: componentName || null,
      button_label: buttonLabel || null,
      model_slug: modelSlug || null,
      page_url: window.location.href,
      referrer: document.referrer || null,
      session_id: getOrCreateSessionId(),
      user_agent: navigator.userAgent || null,
      utm_source: urlParams?.get('utm_source') || null,
      utm_medium: urlParams?.get('utm_medium') || null,
      utm_campaign: urlParams?.get('utm_campaign') || null,
      metadata: {
        ...metadata,
        ...(value !== undefined && { value, currency }),
      },
    };

    console.log('[Analytics] Enviando evento:', payload);

    // 3. Salva no banco Supabase
    const { error } = await supabase.from('site_events').insert(payload);

    if (error) {
      console.error('❌ Erro no Supabase ao registrar evento:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
    } else {
      console.log('✅ Evento salvo no Supabase com sucesso:', eventName);
    }
  } catch (err) {
    console.error('❌ Exceção não tratada ao rastrear evento:', err);
  }
}