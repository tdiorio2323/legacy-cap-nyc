import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import InstantOfferSimulator from '@/components/InstantOfferSimulator';
import TransparentPricing from '@/components/TransparentPricing';
import MCAReadinessScore from '@/components/MCAReadinessScore';
import UnderwriterNotes from '@/components/UnderwriterNotes';
import ProcessSection from '@/components/ProcessSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FundingCalculator from '@/components/FundingCalculator';
import DealDeskLive from '@/components/DealDeskLive';

const Index = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onCalculatorOpen={() => setIsCalculatorOpen(true)} />
      <HeroSection onCalculatorOpen={() => setIsCalculatorOpen(true)} />

      {/* NEW: Instant Offer Simulator - High Priority Feature */}
      <InstantOfferSimulator />

      {/* NEW: Transparent Pricing Card - High Priority Feature */}
      <TransparentPricing />

      {/* NEW: MCA Readiness Score - High Priority Feature with Lead Capture */}
      <MCAReadinessScore />

      {/* NEW: Underwriter Notes Mode - Replaces ServicesSection with enhanced version */}
      <UnderwriterNotes />

      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />

      {/* Existing Calculator Modal */}
      <FundingCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* NEW: Deal Desk Live - Floating Button with Modal */}
      <DealDeskLive />
    </div>
  );
};

export default Index;
