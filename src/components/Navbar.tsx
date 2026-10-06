import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'schedule', label: 'Class Schedule' },
    { id: 'pricing', label: 'Memberships' },
    { id: 'calculator', label: 'Fitness Tool' },
    { id: 'about', label: 'About & Location' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0b0c10]/90 backdrop-blur-md border-b border-[#232630]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('hero')}
          className="text-left font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white hover:text-red-500 transition-colors cursor-pointer"
        >
          AK GYM <span className="text-red-500">26</span>
        </button>

        {/* Zone 2: 4–6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors cursor-pointer py-1 relative ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1–2 primary actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com/akgym26"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg border border-[#2c303d] hover:border-slate-500 transition-colors whitespace-nowrap"
          >
            <span>@akgym26</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onOpenBooking}
            className="px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-lg shadow-sm hover:shadow-red-600/20 transition-all cursor-pointer whitespace-nowrap"
          >
            Book Free Pass
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg border border-[#2c303d] hover:bg-[#1a1d26] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#232630] bg-[#0e1017] px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === link.id
                  ? 'bg-red-500/10 text-red-400 font-semibold'
                  : 'text-slate-300 hover:bg-[#181b24]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-[#232630] flex flex-col gap-2">
            <a
              href="https://instagram.com/akgym26"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-300 rounded-lg bg-[#151720] border border-[#272b38]"
            >
              <span>Follow Official Instagram</span>
              <span className="text-red-400">@akgym26 ↗</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-center text-sm font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
            >
              Book Free Trial Session
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
