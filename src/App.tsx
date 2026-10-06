import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ScheduleSection } from './components/ScheduleSection';
import { PricingSection } from './components/PricingSection';
import { FitnessCalculator } from './components/FitnessCalculator';
import { AboutLocationSection } from './components/AboutLocationSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { MembershipModal } from './components/MembershipModal';
import { GymClass, PricingPlan } from './types/gym';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedClass, setPreselectedClass] = useState<{ gymClass: GymClass; day: string } | null>(null);
  const [preselectedServiceTitle, setPreselectedServiceTitle] = useState<string | null>(null);

  // Membership Modal State
  const [isMembershipOpen, setIsMembershipOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');
  const [specialPackage, setSpecialPackage] = useState<{ title: string; price: string } | null>(null);

  // Smooth navigation helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open booking modal for a general free pass
  const handleOpenGeneralBooking = () => {
    setPreselectedClass(null);
    setPreselectedServiceTitle(null);
    setIsBookingOpen(true);
  };

  // Open booking modal for a specific discipline/service
  const handleSelectServiceForBooking = (serviceTitle: string) => {
    setPreselectedClass(null);
    setPreselectedServiceTitle(serviceTitle);
    setIsBookingOpen(true);
  };

  // Open booking modal for a specific scheduled class
  const handleReserveClass = (gymClass: GymClass, day: string) => {
    setPreselectedServiceTitle(null);
    setPreselectedClass({ gymClass, day });
    setIsBookingOpen(true);
  };

  // Open membership modal for a selected tier
  const handleSelectPlan = (plan: PricingPlan, billingCycle: 'monthly' | 'quarterly' | 'annual') => {
    setSpecialPackage(null);
    setSelectedPlan(plan);
    setSelectedBillingCycle(billingCycle);
    setIsMembershipOpen(true);
  };

  // Open membership modal for special packages (30-day challenge pass, drop-ins)
  const handleSelectSpecialPackage = (pkg: { title: string; price: string }) => {
    setSelectedPlan(null);
    setSpecialPackage(pkg);
    setIsMembershipOpen(true);
  };

  // Program recommendation from Fitness Calculator
  const handleSelectProgramRecommendation = (programName: string) => {
    handleSelectServiceForBooking(programName);
  };

  // Scroll spy to update active section in navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'schedule', 'pricing', 'calculator', 'about'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 flex flex-col font-sans">
      {/* Strict Top Bar Contract Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenGeneralBooking}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={handleOpenGeneralBooking}
          onNavigateToSchedule={() => handleNavigate('schedule')}
          onNavigateToServices={() => handleNavigate('services')}
        />

        {/* Services & Specialized Programs */}
        <ServicesSection
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        {/* Class Timetable Schedule */}
        <ScheduleSection
          onReserveClass={handleReserveClass}
        />

        {/* Memberships & Pricing Plans */}
        <PricingSection
          onSelectPlan={handleSelectPlan}
          onSelectSpecialPackage={handleSelectSpecialPackage}
        />

        {/* Interactive Fitness Calculator Blueprint */}
        <FitnessCalculator
          onSelectProgramRecommendation={handleSelectProgramRecommendation}
        />

        {/* About, Location & Instagram @akgym26 Showcase */}
        <AboutLocationSection
          onOpenBooking={handleOpenGeneralBooking}
        />
      </main>

      {/* Quiet Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenGeneralBooking}
      />

      {/* Interactive Free Trial / Class Spot Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedClass={preselectedClass}
        preselectedServiceTitle={preselectedServiceTitle}
      />

      {/* Interactive Membership Enrollment Checkout Modal */}
      <MembershipModal
        isOpen={isMembershipOpen}
        onClose={() => setIsMembershipOpen(false)}
        selectedPlan={selectedPlan}
        billingCycle={selectedBillingCycle}
        specialPackage={specialPackage}
      />
    </div>
  );
}
