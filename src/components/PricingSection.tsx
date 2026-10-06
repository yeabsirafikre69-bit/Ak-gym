import React, { useState } from 'react';
import { Check, Star, Zap, Shield, ArrowRight } from 'lucide-react';
import { PRICING_PLANS, SPECIAL_PACKAGES } from '../data/gymData';
import { PricingPlan } from '../types/gym';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan, billingCycle: 'monthly' | 'quarterly' | 'annual') => void;
  onSelectSpecialPackage: (pkg: { title: string; price: string }) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPlan,
  onSelectSpecialPackage,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');

  return (
    <section id="pricing" className="py-20 bg-[#0d0f15] border-b border-[#232630]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-500 mb-2">
            <span>Transparent Pricing</span>
            <span aria-hidden="true">·</span>
            <span>Zero Sign-Up Fees</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white mb-4">
            MEMBERSHIP <span className="text-red-500">TIERS</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Choose the commitment level that fuels your goals. All memberships grant uncompromised access to elite coaching and competition equipment.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="mt-8 inline-flex items-center p-1.5 bg-[#141722] rounded-xl border border-[#272b3a]">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                billingCycle === 'monthly'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                billingCycle === 'quarterly'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Quarterly</span>
              <span className="text-[10px] text-amber-300 font-mono">SAVE 15%</span>
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className="text-[10px] text-emerald-400 font-mono">SAVE 25%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PRICING_PLANS.map((plan) => {
            const price =
              billingCycle === 'monthly'
                ? plan.monthlyPrice
                : billingCycle === 'quarterly'
                ? plan.quarterlyPrice
                : plan.annualPrice;

            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-gradient-to-b from-[#181a26] to-[#12141e] border-2 border-red-500/80 shadow-xl shadow-red-950/20'
                    : 'bg-[#12141e] border border-[#232736] hover:border-[#383e52]'
                }`}
              >
                {/* Popular Highlight Kicker */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-red-600 text-white text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-extrabold uppercase tracking-tight text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed min-h-[36px] mb-6">
                    {plan.description}
                  </p>

                  {/* Price display */}
                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-[#232736]">
                    <span className="text-2xl text-slate-400 font-medium">$</span>
                    <span className="text-5xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                      {price}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/ month</span>
                  </div>

                  {/* Billing note */}
                  <div className="text-[11px] text-slate-500 mb-6 font-mono">
                    {billingCycle === 'monthly' && 'Billed monthly · Cancel anytime with 30-day notice'}
                    {billingCycle === 'quarterly' && `Billed $${price * 3} every 3 months · 15% discount applied`}
                    {billingCycle === 'annual' && `Billed $${price * 12} once a year · 25% discount applied`}
                  </div>

                  {/* Core Features */}
                  <div className="space-y-3 mb-6">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block">
                      Included with this tier:
                    </span>
                    <ul className="space-y-2.5">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Plan Perks */}
                  {plan.perks.length > 0 && (
                    <div className="pt-4 border-t border-[#232736] mb-6 space-y-1.5">
                      {plan.perks.map((perk, pIdx) => (
                        <div key={pIdx} className="text-[11px] text-amber-400/90 flex items-center gap-1.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onSelectPlan(plan, billingCycle)}
                  className={`w-full py-3.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isPopular
                      ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30'
                      : 'bg-[#1e2332] hover:bg-[#282f42] text-slate-100 hover:text-white'
                  }`}
                >
                  <span>Select {plan.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Special Packages / Drop-Ins Grid */}
        <div className="mt-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">
            <span>Flexible Packages & Drop-Ins</span>
            <span aria-hidden="true">·</span>
            <span>No Long-Term Contracts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SPECIAL_PACKAGES.map((pkg, idx) => (
              <div
                key={idx}
                className="bg-[#12141f] rounded-xl border border-[#232738] p-5 flex flex-col justify-between hover:border-slate-500 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-red-400 font-semibold">{pkg.highlight}</span>
                    <span className="font-mono text-white font-bold text-lg">{pkg.price}</span>
                  </div>
                  <h4 className="text-lg font-bold uppercase text-white mb-2">{pkg.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{pkg.description}</p>
                </div>

                <div className="pt-3 border-t border-[#1e2332] flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">{pkg.unit}</span>
                  <button
                    onClick={() => onSelectSpecialPackage(pkg)}
                    className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white bg-[#1a1e2b] hover:bg-red-600 rounded-md transition-colors cursor-pointer"
                  >
                    Purchase Pass
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
