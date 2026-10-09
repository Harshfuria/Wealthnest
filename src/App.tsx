import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PracticeAreas } from './components/PracticeAreas';
import { IndustriesSection } from './components/IndustriesSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ProofAndCaseStudies } from './components/ProofAndCaseStudies';
import { ResourcesAndNews } from './components/ResourcesAndNews';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { BookingModal } from './components/BookingModal';
import { GeminiChatModal } from './components/GeminiChatModal';
import { ClientPortalModal } from './components/ClientPortalModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { BrandAssetModal } from './components/BrandAssetModal';
import { TaxCountdownBanner } from './components/TaxCountdownBanner';
import { IRSQuickToolsSection } from './components/IRSQuickToolsSection';
import { SpecializedSolutionsSection } from './components/SpecializedSolutionsSection';
import { QuickBooksCertificationsSection } from './components/QuickBooksCertificationsSection';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTopic, setBookingTopic] = useState('Tax Preparation & Planning');
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [isBrandKitOpen, setIsBrandKitOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatRole, setChatRole] = useState<'general' | 'cfo' | 'tax' | 'capital'>('tax');
  const [prefilledMessage, setPrefilledMessage] = useState('');

  const handleOpenBooking = (topic?: string) => {
    if (topic) {
      setBookingTopic(topic);
    }
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

  const handleOpenChat = (role: 'general' | 'cfo' | 'tax' | 'capital' = 'tax') => {
    setChatRole(role);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handleNavigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePreFillContact = (quoteText: string) => {
    setPrefilledMessage(quoteText);
    handleNavigateToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#FAFBF9] text-slate-800 flex flex-col font-sans selection:bg-[#1E3F35] selection:text-white">
      {/* Top Header Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenClientPortal={handleOpenClientPortal}
        onNavigateToSection={handleNavigateToSection}
        onOpenBrandKit={() => setIsBrandKitOpen(true)}
      />

      {/* Live Tax Filing Deadline Countdown Banner */}
      <TaxCountdownBanner onOpenBooking={() => handleOpenBooking('Tax Filing Deadline & Estimate')} />

      {/* Main Page Flow - Strategic Accounting & Advisory Architecture */}
      <main className="flex-grow">
        {/* 1. Hero Section: Direct Value Proposition, Lead Form & Trust Markers */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenClientPortal={handleOpenClientPortal}
          onNavigateToServices={() => handleNavigateToSection('services')}
          onNavigateToContact={() => handleNavigateToSection('contact')}
        />

        {/* 2. Firm Overview / Who We Are: Mission, Standards & Circular 230 Commitments */}
        <AboutSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenClientPortal={handleOpenClientPortal}
        />

        {/* 3. Core Practice Areas: Comprehensive 8-Pillar Services Grid */}
        <PracticeAreas
          onOpenBooking={(title) => handleOpenBooking(title)}
        />

        {/* 4. Official Intuit QuickBooks ProAdvisor Certifications (Level 1, Level 2, Workforce) */}
        <QuickBooksCertificationsSection
          onOpenBooking={(title) => handleOpenBooking(title)}
        />

        {/* 5. Specialized Solutions (Cross-Border, Visas, Remote US Business) */}
        <SpecializedSolutionsSection
          onOpenBooking={(title) => handleOpenBooking(title)}
        />

        {/* 5. Industries We Specialize In: Sector-Specific Tax & Compliance Blueprints */}
        <IndustriesSection
          onOpenBooking={(industry) => handleOpenBooking(`${industry} Consultation`)}
        />

        {/* 6. Why Choose Us: 5 Key Differentiators & Side-by-Side Comparison Matrix */}
        <WhyChooseUsSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 7. Proven Client Outcomes: Case Studies & Business Founder Testimonials */}
        <ProofAndCaseStudies
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 8. Tax Deadlines Calendar & Regulatory Bulletins */}
        <ResourcesAndNews
          onOpenBooking={() => handleOpenBooking()}
          onPreFillContact={handlePreFillContact}
        />

        {/* 9. IRS Official Links & Useful Client Tools (Where's My Refund, Payments, EIN) */}
        <IRSQuickToolsSection
          onOpenBooking={() => handleOpenBooking('IRS Notice Review')}
        />

        {/* 10. Frequently Asked Questions: Transparent Onboarding & Virtual Process */}
        <FAQSection />

        {/* 11. Direct Contact & Confidential Consultation Submission Form */}
        <ContactSection
          prefilledMessage={prefilledMessage}
          onClearPrefill={() => setPrefilledMessage('')}
        />
      </main>

      {/* Comprehensive Advisory Firm Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenClientPortal={handleOpenClientPortal}
        onNavigateToSection={handleNavigateToSection}
        onOpenBrandKit={() => setIsBrandKitOpen(true)}
      />

      {/* Floating Advisor Assistance Button */}
      <div className="fixed bottom-24 right-5 sm:right-6 z-40">
        <button
          onClick={() => handleOpenChat('tax')}
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#1E3F35] hover:bg-[#152E27] text-white rounded-full shadow-xl border border-emerald-700/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Open Tax & Advisory Assistant"
        >
          <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-amber-300 group-hover:rotate-12 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-left pr-1">
            <div className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>Tax & Advisory Desk</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
            </div>
            <div className="text-[10px] text-emerald-100/80">Corporate Tax, Deadlines & Planning</div>
          </div>
        </button>
      </div>

      {/* Fast WhatsApp Chat Trigger */}
      <FloatingWhatsApp />

      {/* Gemini AI Multi-turn Tax & Advisory Consultation Modal */}
      <GeminiChatModal
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        initialRole={chatRole}
      />

      {/* Consultation Scheduling Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialTopic={bookingTopic}
      />

      {/* 256-Bit Encrypted Client Portal & Firm Owner Console */}
      <ClientPortalModal
        isOpen={isClientPortalOpen}
        onClose={handleCloseClientPortal}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Official Brand Logo & Identity Kit Modal */}
      <BrandAssetModal
        isOpen={isBrandKitOpen}
        onClose={() => setIsBrandKitOpen(false)}
      />
    </div>
  );
}
