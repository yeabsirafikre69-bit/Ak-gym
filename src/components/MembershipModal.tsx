import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import { PricingPlan } from '../types/gym';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PricingPlan | null;
  billingCycle: 'monthly' | 'quarterly' | 'annual';
  specialPackage?: { title: string; price: string } | null;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  billingCycle,
  specialPackage,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    startDate: new Date().toISOString().split('T')[0],
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [memberId, setMemberId] = useState('');

  if (!isOpen) return null;

  const planTitle = specialPackage ? specialPackage.title : selectedPlan?.name || 'Unlimited Pro';
  const priceDisplay = specialPackage
    ? specialPackage.price
    : selectedPlan
    ? billingCycle === 'monthly'
      ? `$${selectedPlan.monthlyPrice}/mo`
      : billingCycle === 'quarterly'
      ? `$${selectedPlan.quarterlyPrice}/mo (billed quarterly)`
      : `$${selectedPlan.annualPrice}/mo (billed annually)`
    : '$149/mo';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.phone) return;

    setMemberId('AK-MEMBER-' + Math.floor(1000 + Math.random() * 9000));
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#12141f] border border-[#2c3246] rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1f2434] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-500 mb-1">
                <span>Join AK GYM 26</span>
                <span aria-hidden="true">·</span>
                <span>Immediate Access</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white">
                {planTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Complete your details below to activate your digital gym keycard.
              </p>
            </div>

            {/* Plan summary badge */}
            <div className="p-4 bg-[#171b28] border border-[#2a3044] rounded-xl mb-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Selected Tier</span>
                <span className="text-sm font-bold text-white">{planTitle}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Pricing</span>
                <span className="text-sm font-bold text-red-400 font-mono">{priceDisplay}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Jordan"
                    className="w-full bg-[#181c29] border border-[#2c3246] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Miller"
                    className="w-full bg-[#181c29] border border-[#2c3246] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jordan@example.com"
                  className="w-full bg-[#181c29] border border-[#2c3246] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#181c29] border border-[#2c3246] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">
                    Desired Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full bg-[#181c29] border border-[#2c3246] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#151824] rounded-lg border border-[#242939] text-xs text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero activation fee · Access keycard ready at reception</span>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Fast digital enrollment</span>
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-lg shadow-md shadow-red-600/30 transition-all cursor-pointer whitespace-nowrap"
                >
                  Activate Membership
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Enrollment Success Screen */
          <div className="text-center py-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-emerald-950/60 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="text-xs uppercase font-bold tracking-widest text-emerald-400 mb-1">
              Membership Enrolled
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white mb-2">
              WELCOME TO THE TRIBE, {formData.firstName.toUpperCase()}!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto mb-6">
              Your member account is active. Show this digital pass at the AK GYM 26 front desk on your first visit.
            </p>

            {/* Digital Pass Preview Card */}
            <div className="bg-gradient-to-r from-[#191d2c] via-[#212638] to-[#191d2c] border-2 border-red-500/70 rounded-2xl p-5 max-w-sm mx-auto mb-6 text-left shadow-xl">
              <div className="flex items-center justify-between border-b border-[#30384f] pb-3 mb-3">
                <span className="font-heading font-extrabold text-xl text-white">AK GYM 26</span>
                <span className="text-[10px] font-mono font-bold bg-red-600 text-white px-2 py-0.5 rounded">
                  VIP MEMBER
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 mb-4">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Athlete Name</span>
                  <span className="font-bold text-white text-sm">{formData.firstName} {formData.lastName}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Membership Tier</span>
                  <span className="font-semibold text-red-400">{planTitle}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase block">Pass ID</span>
                  <span className="font-mono font-bold text-white tracking-widest">{memberId}</span>
                </div>
              </div>

              {/* Barcode Mock */}
              <div className="bg-white/90 p-2 rounded flex items-center justify-center">
                <div className="font-mono text-[10px] text-black font-extrabold tracking-[0.3em]">
                  ||| | |||| | ||| || |||| | |||
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#1e2332] hover:bg-[#293044] rounded-lg transition-colors cursor-pointer"
            >
              Close & Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
