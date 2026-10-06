import React, { useState } from 'react';
import { ArrowUpRight, Check, Zap, Flame } from 'lucide-react';
import { SERVICES } from '../data/gymData';
import { ServiceProgram } from '../types/gym';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceProgram | null>(null);

  return (
    <section id="services" className="py-20 bg-[#0d0f15] border-b border-[#232630]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-500 mb-2">
              <span>Core Disciplines</span>
              <span aria-hidden="true">·</span>
              <span>Elite Coaching Staff</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
              ENGINEERED TRAINING <span className="text-red-500">PROGRAMS</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md">
            Whether you are pursuing raw barbell power, cardiovascular stamina, or a total physical transformation, our programs deliver proven results.
          </p>
        </div>

        {/* Asymmetric Bento / Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {SERVICES.map((service, index) => {
            const isMarquee = index === 0 || index === 3;
            const indexNumber = String(index + 1).padStart(2, '0');

            return (
              <div
                key={service.id}
                className="group relative bg-[#13151f] rounded-2xl border border-[#232734] hover:border-red-500/50 transition-all duration-300 flex flex-col overflow-hidden shadow-lg"
              >
                {/* Visual Asset Header */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#1c202d]">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13151f] via-[#13151f]/40 to-transparent" />

                  {/* Program Number & Tag */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="font-mono text-red-400 font-semibold bg-[#0b0c10]/80 backdrop-blur-sm px-2.5 py-1 rounded border border-[#2d3242]">
                      {indexNumber}
                    </span>
                    <span className="text-slate-300 bg-[#0b0c10]/80 backdrop-blur-sm px-3 py-1 rounded border border-[#2d3242] font-medium">
                      {service.tag}
                    </span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-2 group-hover:text-red-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-red-400/90 mb-4">
                      {service.subtitle}
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2.5 mb-6">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#232734] flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-slate-400">
                      <span className="text-slate-500 block uppercase text-[10px] tracking-wider">Ideal For</span>
                      <span className="text-slate-300 font-medium">{service.idealFor}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-[#1a1e2a] hover:bg-[#232838] rounded-lg transition-colors cursor-pointer"
                      >
                        Program Details
                      </button>
                      <button
                        onClick={() => onSelectServiceForBooking(service.title)}
                        className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <span>Book Trial</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 30-Day Transformation Callout Banner */}
        <div className="relative rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-950/40 via-[#151822] to-[#12141c] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">
              <Flame className="w-4 h-4" />
              <span>Next Cohort Registration Now Open</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-tight mb-2">
              Ready for the 30-Day Body Recomposition Challenge?
            </h3>
            <p className="text-sm text-slate-300">
              Includes 2 medical InBody 570 scans, weekly custom nutrition roadmap, 24/7 accountability group, and dedicated coach feedback.
            </p>
          </div>

          <div className="relative z-10 shrink-0 flex items-center gap-3">
            <button
              onClick={() => onSelectServiceForBooking('30-Day Total Transformation Challenge')}
              className="px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-lg shadow-lg shadow-red-600/30 transition-all cursor-pointer whitespace-nowrap"
            >
              Enroll in 30-Day Challenge
            </button>
          </div>
        </div>
      </div>

      {/* Program Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#12141c] border border-[#2b3040] rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  {selectedService.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white mt-1">
                  {selectedService.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1f2330] transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="h-48 w-full rounded-xl overflow-hidden mb-5">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {selectedService.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3">
                Key Curriculum & Inclusions
              </h4>
              <ul className="space-y-2">
                {selectedService.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <Check className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#171a25] border border-[#242938] mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Who is this for?</span>
                <span className="text-sm font-semibold text-white">{selectedService.idealFor}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-[#1a1e2b] rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onSelectServiceForBooking(title);
                }}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors cursor-pointer"
              >
                Book Free Trial Class
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
