import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Calendar, Clock, User, ShieldCheck } from 'lucide-react';
import { GymClass } from '../types/gym';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedClass?: { gymClass: GymClass; day: string } | null;
  preselectedServiceTitle?: string | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedClass,
  preselectedServiceTitle,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    discipline: 'CrossFit & Functional Fitness',
    preferredTime: 'Morning (6:00 AM – 9:00 AM)',
    experience: 'Beginner (New to CrossFit/Lifting)',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  useEffect(() => {
    if (preselectedClass) {
      setFormData((prev) => ({
        ...prev,
        discipline: `${preselectedClass.gymClass.name} (${preselectedClass.day})`,
        preferredTime: preselectedClass.gymClass.time,
      }));
    } else if (preselectedServiceTitle) {
      setFormData((prev) => ({
        ...prev,
        discipline: preselectedServiceTitle,
      }));
    }
  }, [preselectedClass, preselectedServiceTitle]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    const randomCode = 'AK-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(randomCode);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#12141e] border border-[#2b3042] rounded-2xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1f2334] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-500 mb-1">
                <span>Free Trial Pass</span>
                <span aria-hidden="true">·</span>
                <span>Zero Obligation</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                {preselectedClass ? 'RESERVE CLASS SPOT' : 'BOOK A FREE TRIAL SESSION'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {preselectedClass
                  ? `Secure your spot for ${preselectedClass.gymClass.name} on ${preselectedClass.day}.`
                  : 'Come experience the facility, meet our head coaches, and crush a 60-minute trial session on us.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Henderson"
                    className="w-full bg-[#181c29] border border-[#2c3246] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">
                    Phone Number *
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
                  placeholder="alex@example.com"
                  className="w-full bg-[#181c29] border border-[#2c3246] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">
                    Program / Discipline
                  </label>
                  <select
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    className="w-full bg-[#181c29] border border-[#2c3246] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="CrossFit & Functional Fitness">CrossFit & Barbell WOD</option>
                    <option value="Group HIIT & Athletic Conditioning">Group HIIT & Turf Sprint</option>
                    <option value="1-on-1 Personal Training">1-on-1 Personal Training</option>
                    <option value="30-Day Total Transformation Challenge">30-Day Transformation Challenge</option>
                    <option value="Open Gym & Lifting Platforms">Open Gym & Lifting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">
                    Preferred Time of Day
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-[#181c29] border border-[#2c3246] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Early Morning (6:00 AM – 8:00 AM)">Early Morning (6:00 AM – 8:00 AM)</option>
                    <option value="Midday (11:30 AM – 1:30 PM)">Midday (11:30 AM – 1:30 PM)</option>
                    <option value="Evening (5:30 PM – 7:30 PM)">Evening (5:30 PM – 7:30 PM)</option>
                    <option value="Weekend Morning (8:30 AM – 11:00 AM)">Weekend Morning (8:30 AM – 11:00 AM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">
                  Training Background
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full bg-[#181c29] border border-[#2c3246] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                >
                  <option value="Beginner (New to CrossFit/Lifting)">Beginner (New to functional training/lifting)</option>
                  <option value="Intermediate (6+ months consistent gym)">Intermediate (6+ months lifting experience)</option>
                  <option value="Advanced (Experienced CrossFit / Competitive)">Advanced (Competitive athlete or CrossFit L1/L2)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-slate-400 mb-1">
                  Notes, Injuries or Goals (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. recovering from shoulder tweak, want to learn clean & jerk technique"
                  className="w-full bg-[#181c29] border border-[#2c3246] rounded-lg px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Free · No credit card required</span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-lg shadow-md shadow-red-600/30 transition-all cursor-pointer whitespace-nowrap"
                >
                  Confirm Free Pass
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="text-center py-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-emerald-950/60 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="text-xs uppercase font-bold tracking-widest text-emerald-400 mb-1">
              Pass Confirmed & Registered
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white mb-2">
              YOU'RE READY TO TRAIN, {formData.name.toUpperCase().split(' ')[0]}!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6">
              Your free trial session has been registered. An SMS confirmation and calendar invite have been dispatched.
            </p>

            <div className="p-4 bg-[#171b28] border border-[#2b3246] rounded-xl max-w-sm mx-auto mb-6 text-left space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Confirmation Code:</span>
                <span className="font-mono font-bold text-red-400">{confirmationCode}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Discipline / Session:</span>
                <span className="font-semibold text-white truncate max-w-[180px]">{formData.discipline}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Facility Location:</span>
                <span className="text-white">26 Ironworks Blvd</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 mb-6">
              Please arrive 10 minutes early with athletic shoes, water bottle, and a towel.
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#1e2332] hover:bg-[#293044] rounded-lg transition-colors cursor-pointer"
            >
              Done & Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
