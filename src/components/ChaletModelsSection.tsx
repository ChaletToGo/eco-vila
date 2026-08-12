'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { trackSiteEvent } from '@/lib/trackSiteEvent';

const SUISSE_GARANTIE_SEAL_URL =
  'https://elhcijnfasljabddxfys.supabase.co/storage/v1/object/public/chales/suisse-garantie.png';

interface ChaletModelData {
  id: string;
  slug: string;
  tag: string;
  name: string;
  area: string;
  description: string;
  features: string[];
  price: number;
  availableUnits: number;
  totalUnits: number;
  imageSrc: string;
  whatsappLink?: string;
}

interface ChaletModelsSectionProps {
  locationSlug?: string;
  landingPageSlug?: string;
}

export default function ChaletModelsSection({
  locationSlug = 'jaboticatubas-mg',
  landingPageSlug = 'jaboticatubas-mg',
}: ChaletModelsSectionProps) {
  const [models, setModels] = useState<ChaletModelData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChaletModels() {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from('location_chalets')
          .select(`
            price,
            total_units,
            available_units,
            locations!inner ( slug, name ),
            chalet_models ( id, slug, tag, name, area, description, features, image_data, image_url, whatsapp_link )
          `)
          .eq('locations.slug', locationSlug)
          .eq('is_active', true);

        if (error) {
          console.error('Erro ao buscar chalés do banco:', error);
          return;
        }

        if (data) {
          const formattedModels: ChaletModelData[] = data.map((item: any) => {
            const model = item.chalet_models;

            const imageSrc =
              model?.image_url && model.image_url.trim() !== ''
                ? model.image_url
                : model?.image_data && model.image_data.trim() !== ''
                ? model.image_data
                : `/chales/${model?.slug || 'default'}.png`;

            return {
              id: model?.id || model?.slug,
              slug: model?.slug,
              tag: model?.tag || 'Lançamento',
              name: model?.name || 'Modelo Chalé',
              area: model?.area || '',
              description: model?.description || '',
              features: model?.features || [],
              price: item.price || 0,
              availableUnits: item.available_units ?? 0,
              totalUnits: item.total_units ?? 0,
              imageSrc: imageSrc,
              whatsappLink: model?.whatsapp_link || '',
            };
          });

          setModels(formattedModels);
        }
      } catch (err) {
        console.error('Erro inesperado:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchChaletModels();
  }, [locationSlug]);

  const handleInterestClick = (model: ChaletModelData) => {
    // Dispara o rastreamento individual mantendo o slug do modelo e o valor, 
    // mesmo com o botão usando um rótulo genérico.
    trackSiteEvent({
      eventName: 'click_book_interest',
      landingPageSlug,
      locationName: locationSlug,
      modelSlug: model.slug,
      componentName: 'ChaletModelsSection',
      buttonLabel: 'Tenho interesse',
      value: model.price,
      currency: 'BRL',
    });
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="chales" className="w-full bg-[#f8f9f5] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Cabeçalho */}
        <div className="flex flex-col gap-3 mb-12">
          <span className="text-[#0b3823] text-xs font-bold tracking-widest uppercase">
            Escolha seu chalé
          </span>
          <h2 className="text-[#0b3823] text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
            Nossos modelos. Um novo<br className="hidden sm:inline" /> jeito de morar.
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-light">
            Escolha o tamanho e o nível de conforto que combinam com seus planos.
          </p>
        </div>

        {/* Grid de Cards dos Modelos */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-6 h-[480px] animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {models.map((model) => {
              const isEsgotado = model.availableUnits <= 0;

              const targetWhatsappUrl = model.whatsappLink && model.whatsappLink.trim() !== ''
                ? model.whatsappLink
                : `https://wa.me/5538997332966?text=Ol%C3%A1!%20Tenho%20interesse%20no%20modelo%20${encodeURIComponent(model.name)}%20em%20${locationSlug}.`;

              return (
                <div
                  key={model.id}
                  className="bg-white rounded-3xl p-4 sm:p-5 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group"
                >
                  <div>
                    {/* Container da Imagem */}
                    <div className="relative w-full aspect-[4/3] bg-[#f0f4f0] rounded-2xl overflow-hidden mb-6 border border-gray-100">
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#0b3823] text-[10px] font-extrabold px-3 py-1 rounded-full shadow-sm tracking-wider z-10">
                        {model.tag}
                      </span>

                      {/* Exibe a badge somente se estiver esgotado */}
                      {isEsgotado && (
                        <span className="absolute top-3 right-3 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm z-10 bg-rose-100 text-rose-700">
                          Vendido
                        </span>
                      )}

                      <div
                        className="absolute bottom-3 right-3 z-10 bg-white/90 backdrop-blur-md p-1 rounded-full shadow-md border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        title="Garantia Suisse Garantie"
                      >
                        <img
                          src={SUISSE_GARANTIE_SEAL_URL}
                          alt="Selo Suisse Garantie"
                          className="w-10 h-10 object-contain rounded-full"
                        />
                      </div>

                      <img
                        src={model.imageSrc}
                        alt={model.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/chales/default.png';
                        }}
                      />
                    </div>

                    {/* Título e Área */}
                    <h3 className="text-[#0b3823] text-2xl font-bold tracking-tight mb-2">
                      {model.name} {model.area && `• `}<span className="font-extrabold">{model.area}</span>
                    </h3>

                    {/* Descrição */}
                    <p className="text-gray-500 text-xs sm:text-sm font-light mb-6 min-h-[38px]">
                      {model.description}
                    </p>

                    {/* Características */}
                    <ul className="flex flex-col gap-2.5 mb-8 border-t border-gray-100 pt-6">
                      {model.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Preço e Botão */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-[10px] font-light uppercase tracking-wider">Valor</span>
                      <span className="text-[#0b3823] text-xl font-extrabold tracking-tight">
                        {formatCurrency(model.price)}
                      </span>
                    </div>

                    {/* Botão de CTA limpo, com id único por modelo para os pixels/analytics */}
                    <Link
                      id={`cta-chale-${model.slug}`}
                      href={isEsgotado ? '#' : targetWhatsappUrl}
                      target={isEsgotado ? '_self' : '_blank'}
                      onClick={() => !isEsgotado && handleInterestClick(model)}
                      className={`text-xs sm:text-sm font-bold px-5 py-3 rounded-full transition-all whitespace-nowrap shadow-md ${
                        isEsgotado
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                          : 'bg-[#0b3823] text-white hover:bg-[#072618]'
                      }`}
                    >
                      {isEsgotado ? 'Esgotado' : 'Tenho interesse'}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}