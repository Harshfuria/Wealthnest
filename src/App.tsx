import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesBento } from './components/ServicesBento';
import { PricingMatrix } from './components/PricingMatrix';
import { RateEstimator } from './components/RateEstimator';
import { TechStack } from './components/TechStack';
import { ProofAndCaseStudies } from './components/ProofAndCaseStudies';
import { ResourcesAndNews } from './components/ResourcesAndNews';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { BookingModal } from './components/BookingModal';
import { GeminiChatModal } from './components/GeminiChatModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatRole, setChatRole] = useState<'general' | 'cfo' | 'tax' | 'capital'>('general');
  const [prefilledMessage, setPrefilledMessage] = useState('');

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleOpenClientPortal = () => {
    setIsClientPortalOpen(true);
  };

  const handleCloseClientPortal = () => {
    setIsClientPortalOpen(false);
  };

  const handleOpenChat = (role: 'general' | 'cfo' | 'tax' | 'capital' = 'general') => {
    setChatRole(role);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handleNavigateToCalculator = () => {
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToResources = () => {
    const element = document.getElementById('resources');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForCalculator = (_serviceId: string) => {
    handleNavigateToCalculator();
  };

  const handlePreFillContact = (quoteText: string) => {
    setPrefilledMessage(quoteText);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-slate-800 flex flex-col font-sans selection:bg-[#1E3F35] selection:text-white">
      {/* Navigation */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenClientPortal={handleOpenClientPortal}
        onNavigateToCalculator={handleNavigateToCalculator}
        onNavigateToResources={handleNavigateToResources}
        onOpenChat={() => handleOpenChat('general')}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onOpenClientPortal={handleOpenClientPortal}
          onNavigateToCalculator={handleNavigateToCalculator}
          onNavigateToResources={handleNavigateToResources}
          onOpenChat={() => handleOpenChat('general')}
        />

        {/* Practice Scope & Bento Grid */}
        <ServicesBento
          onSelectServiceForCalculator={handleSelectServiceForCalculator}
          onOpenBooking={handleOpenBooking}
        />

        {/* Engagement Models & Scope Framework */}
        <PricingMatrix
          onOpenBooking={handleOpenBooking}
          onNavigateToCalculator={handleNavigateToCalculator}
        />

        {/* Interactive Scope Configurator */}
        <RateEstimator
          onPreFillContact={handlePreFillContact}
        />

        {/* Technology Ecosystem Integrations */}
        <TechStack />

        {/* Resource Center & Regulatory Newsroom */}
        <ResourcesAndNews
          onOpenBooking={handleOpenBooking}
          onPreFillContact={handlePreFillContact}
        />

        {/* Client Success Case Studies & Real ROI proof */}
        <ProofAndCaseStudies
          onOpenBooking={handleOpenBooking}
        />

        {/* Common Compliance & Engagement FAQ */}
        <FAQSection />

        {/* Direct Contact & Lead Submission */}
        <ContactSection
          prefilledMessage={prefilledMessage}
          onClearPrefill={() => setPrefilledMessage('')}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={handleOpenBooking}
        onOpenClientPortal={handleOpenClientPortal}
        onNavigateToCalculator={handleNavigateToCalculator}
        onNavigateToResources={handleNavigateToResources}
      />

      {/* Floating Gemini AI Advisor Button */}
      <div className="fixed bottom-24 right-5 sm:right-6 z-40">
        <button
          onClick={() => handleOpenChat('general')}
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#1E3F35] hover:bg-[#152E27] text-white rounded-full shadow-xl border border-emerald-700/30 transition-all hover:scale-105 active:scale-95"
          aria-label="Open Gemini Advisory Desk"
        >
          <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-emerald-200 group-hover:rotate-12 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-left pr-1">
            <div className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>AI Advisory Desk</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
            </div>
            <div className="text-[10px] text-emerald-100/80">Ask Accounting, Tax & Debt</div>
          </div>
        </button>
      </div>

      {/* Sticky Fast WhatsApp Badge */}
      <FloatingWhatsApp />

      {/* Gemini AI Multi-turn Chat Modal */}
      <GeminiChatModal
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        initialRole={chatRole}
      />

      {/* Consultation Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
      />

      {/* Client Portal Modal */}
      <ClientPortalModal
        isOpen={isClientPortalOpen}
        onClose={handleCloseClientPortal}
        onOpenBooking={handleOpenBooking}
      />
    </div>
  );
}
