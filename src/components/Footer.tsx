import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GYM_INFO } from '../data/gymData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="bg-[#08090d] border-t border-[#1c1f2b] text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <span className="font-heading text-2xl font-extrabold tracking-tight text-white block mb-2">
              AK GYM <span className="text-red-500">26</span>
            </span>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              High-performance strength, CrossFit, athletic conditioning, and personal coaching facility.
            </p>
            <a
              href={GYM_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
            >
              <span>Follow {GYM_INFO.handle}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-white mb-3">
              Explore Facility
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Training Disciplines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('schedule')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Class Timetable
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Membership Tiers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Fitness & Calorie Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Operating Hours Recap */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-white mb-3">
              Operating Hours
            </h4>
            <div className="space-y-1.5 text-xs">
              <p className="flex justify-between">
                <span>Mon – Fri:</span>
                <span className="text-white font-mono">{GYM_INFO.operatingHours.weekdays}</span>
              </p>
              <p className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-white font-mono">{GYM_INFO.operatingHours.saturday}</span>
              </p>
              <p className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-white font-mono">{GYM_INFO.operatingHours.sunday}</span>
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1c1f2b]">
              <span className="text-[11px] text-slate-500 block">Location:</span>
              <span className="text-xs text-slate-300">{GYM_INFO.address}, {GYM_INFO.city}</span>
            </div>
          </div>

          {/* Direct Actions */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-white mb-3">
              Start Today
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Book a complimentary 60-minute trial session or tour the facility with a coach.
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors cursor-pointer text-center"
            >
              Book Free Trial Pass
            </button>
          </div>
        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-8 border-t border-[#1a1d29] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} AK GYM 26. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Instagram: @akgym26</span>
            <span>·</span>
            <span>Tel: {GYM_INFO.phone}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
