import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTopic, setBookingTopic] = useState('Tax Preparation & Planning');

  const handleOpenBooking = (topic?: string) => {
    if (topic) {
      setBookingTopic(topic);
    }
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleNavigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#1E3F35] selection:text-white">
      <Navbar
        onOpenBooking={handleOpenBooking}
        onNavigateToSection={handleNavigateToSection}
      />

      <main className="flex-grow">
        <Hero
          onOpenBooking={handleOpenBooking}
          onNavigateToServices={() => handleNavigateToSection('services')}
        />

        <ServicesSection onOpenBooking={handleOpenBooking} />

        <AboutSection onOpenBooking={handleOpenBooking} />

        <FAQSection />

        <ContactSection />
      </main>

      <Footer
        onNavigateToSection={handleNavigateToSection}
        onOpenBooking={handleOpenBooking}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialTopic={bookingTopic}
      />
    </div>
  );
}
