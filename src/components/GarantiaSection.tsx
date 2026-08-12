'use client';

import React from 'react';
import { ShieldCheck, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

export default function GarantiaSection() {
  const opcoesMadeira = [
    {
      titulo: 'Madeira Nacional',
      subtitulo: 'Padrão de Mercado',
      descricao: 'Construção convencional com madeiras e tratamentos padrão do mercado local.',
      garantiaFabrica: '6 Meses',
      comSeguro: 'Não aplicável',
      destaque: false,
    },
    {
      titulo: '100% Madeira Suíça (Pinus / Lei)',
      subtitulo: 'Garantia de Fábrica',
      descricao: 'Tratada com o processo tradicional suíço de secagem natural na sombra. Maior resistência a umidade e intempéries.',
      garantiaFabrica: '2 Anos',
      comSeguro: 'Até 20 Anos (Com Generali)',
      destaque: true,
    },
  ];

  return (
    <section id="garantia" className="w-full bg-[#f8f9f5] py-20 md:py-28 relative overflow-hidden">
      {/* Background Decorativo suave igual ao HeroBanner */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#e6eee6] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Cabeçalho */}
        <div className="flex flex-col gap-3 mb-16 max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-[#0b3823] opacity-60"></div>
            <span className="text-[#0b3823] text-xs font-bold tracking-widest uppercase">
              Qualidade & Proteção
            </span>
          </div>
          
          <h2 className="text-[#0b3823] text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
            Engenharia Suíça.{' '}
            <span className="font-serif font-medium italic text-[#0b3823]/90">
              Proteção de até 20 anos.
            </span>
          </h2>

          <p className="text-gray-700 text-base sm:text-lg font-light leading-relaxed mt-2">
            Nossos chalés são construídos com **Madeira 100% Suíça** (Pinus / Madeira de Lei) tratada via **secagem natural na sombra**. Ela já conta com 2 anos de garantia de fábrica e pode ter sua proteção estendida para **até 20 anos** com o seguro opcional da **Generali**.
          </p>
        </div>

        {/* Cards de Garantia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-stretch">
          {opcoesMadeira.map((item, index) => {
            if (item.destaque) {
              return (
                /* CARD DESTAQUE: MADEIRA SUÍÇA + SEGURO GENERALI */
                <div
                  key={index}
                  className="bg-[#0b3823] text-white rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#0b3823]/20 border border-[#0b3823] flex flex-col justify-between relative overflow-hidden transition-transform duration-300"
                >
                  <div className="absolute -right-8 -bottom-8 text-white/5 pointer-events-none">
                    <ShieldCheck size={220} />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-3.5 py-1.5 rounded-full tracking-wider uppercase border border-emerald-500/30 flex items-center gap-1.5">
                        <Sparkles size={12} />
                        Padrão Chalet To Go
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold tracking-tight text-white mb-1">
                      {item.titulo}
                    </h3>
                    <p className="text-xs text-emerald-200/80 font-medium mb-4">
                      {item.subtitulo}
                    </p>
                    <p className="text-gray-200 text-xs sm:text-sm font-light leading-relaxed mb-6">
                      {item.descricao}
                    </p>
                  </div>

                  {/* Detalhes de Garantia e Seguro */}
                  <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-emerald-200/70 text-xs font-light block uppercase tracking-wider">
                        Garantia de Fábrica
                      </span>
                      <span className="text-2xl font-bold text-white tracking-tight mt-0.5 block">
                        {item.garantiaFabrica}
                      </span>
                    </div>

                    <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-2xl p-3">
                      <span className="text-emerald-400 text-[10px] font-bold block uppercase tracking-wider">
                        Com Seguro Generali
                      </span>
                      <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5 block">
                        Até 20 Anos
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              /* CARD PADRÃO: MADEIRA NACIONAL */
              <div
                key={index}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
              >
                <div>
                  <span className="text-gray-400 text-[10px] font-bold tracking-wider uppercase block mb-3">
                    {item.subtitulo}
                  </span>
                  <h3 className="text-2xl font-bold text-[#0b3823] tracking-tight mb-3">
                    {item.titulo}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {item.descricao}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-400 text-xs font-light block uppercase tracking-wider">
                      Garantia de Fábrica
                    </span>
                    <span className="text-2xl font-bold text-gray-800 tracking-tight mt-1 block">
                      {item.garantiaFabrica}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-400 text-xs font-light block uppercase tracking-wider">
                      Proteção Estendida
                    </span>
                    <span className="text-sm font-medium text-gray-400 mt-2 block">
                      {item.comSeguro}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BANNER DA SEGURO GENERALI */}
        <div className="w-full bg-[#072618] text-white rounded-3xl p-8 sm:p-12 border border-emerald-900/60 shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-900/50 border border-emerald-700/50 text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
                <Building2 size={28} />
              </div>
              
              <div className="flex flex-col gap-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/80">
                    Parceria Internacional
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Proteção estendida com a <span className="text-emerald-400">Generali</span>
                </h3>
                <p className="text-emerald-100/80 text-sm font-light leading-relaxed">
                  A **Generali** é a maior seguradora da Suíça. Ao adquirir seu chalé de Madeira Suíça, você pode optar pela apólice residencial que estende a garantia estrutural e proteção contra imprevistos para **até 20 anos**.
                </p>
              </div>
            </div>

            {/* Caixa Informativa */}
            <div className="w-full lg:w-auto shrink-0 bg-emerald-950/60 border border-emerald-800/60 rounded-2xl p-5 flex flex-col justify-center gap-1">
              <span className="text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Contratação Simplificada
              </span>
              <span className="text-white text-base font-bold">Seguro Opcional de até 20 Anos</span>
              <span className="text-emerald-200/60 text-xs font-light">Disponível no contrato da compra</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}