import React from 'react';
import { ArrowRight, Calendar, ShieldCheck, Dumbbell, Zap } from 'lucide-react';
import { HERO_IMAGE, GYM_INFO } from '../data/gymData';

interface HeroProps {
  onOpenBooking: () => void;
  onNavigateToSchedule: () => void;
  onNavigateToServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onNavigateToSchedule,
  onNavigateToServices,
}) => {
  return (
    <section id="hero" className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between overflow-hidden bg-[#0b0c10]">
      {/* Background visual asset with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="High intensity athletes training at AK GYM 26"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-110"
        />
        {/* Measured dark gradient scrim for WCAG AA text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10] via-[#0b0c10]/85 to-[#0b0c10]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-[#0b0c10]/40" />
      </div>

      {/* Main hero copy container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-28 pb-12 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Subtle unboxed kicker - Zero-pill discipline */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-widest text-red-500 mb-3">
            <span>High Performance Strength Facility</span>
            <span aria-hidden="true">·</span>
            <span>Est. 2020</span>
            <span aria-hidden="true">·</span>
            <span>{GYM_INFO.handle}</span>
          </div>

          {/* Primary headline with balanced wrapping */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-none mb-6">
            FORGE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-500">UNSTOPPABLE</span> STRENGTH
          </h1>

          {/* Concrete value proposition */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mb-8">
            Experience premier CrossFit, Olympic weightlifting, group athletic conditioning, and personalized coaching at AK GYM 26. Built for everyday athletes who refuse average standards.
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={onOpenBooking}
              className="px-6 sm:px-8 py-3.5 text-sm sm:text-base font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-lg shadow-lg shadow-red-600/25 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Book a Free Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToSchedule}
              className="px-6 sm:px-7 py-3.5 text-sm sm:text-base font-bold uppercase tracking-wider text-slate-200 hover:text-white bg-[#1a1d26]/80 hover:bg-[#222634] border border-[#303545] rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-red-400" />
              <span>View Class Timetable</span>
            </button>
          </div>

          {/* Trust markers */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Free 60-min trial workout</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4 text-red-400" />
              <span>Certified strength coaches</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>No long-term lock-in contract</span>
            </div>
          </div>
        </div>
      </div>

      {/* Claim-to-Proof Quantitative Stats Banner */}
      <div className="relative z-10 border-t border-[#232630] bg-[#0c0e14]/90 backdrop-blur-md py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-[#232630]">
            {GYM_INFO.stats.map((stat, idx) => (
              <div key={idx} className={`${idx !== 0 ? 'md:pl-6 pt-4 md:pt-0' : ''}`}>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1 uppercase font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
