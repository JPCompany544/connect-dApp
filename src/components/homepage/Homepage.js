import React, { useEffect } from 'react';
import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import Features from './Features';
import CreditLimitCalculator from './CreditLimitCalculator';
import LiveActivity from './LiveActivity';
import FAQ from '../FAQ';
import CTASection from './CTASection';

const Homepage = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections with a small delay to ensure DOM is ready
    setTimeout(() => {
      const sections = document.querySelectorAll('.observe-fade');
      sections.forEach(section => observer.observe(section));
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* How It Works Section */}
      <div className="observe-fade" style={{ opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' }}>
        <HowItWorks />
      </div>

      {/* Features Section */}
      <div className="observe-fade" style={{ opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' }}>
        <Features />
      </div>

      {/* Credit Limit Calculator */}
      <div className="observe-fade" style={{ opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' }}>
        <CreditLimitCalculator />
      </div>

      {/* Live Activity Section */}
      <div className="observe-fade" style={{ opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' }}>
        <LiveActivity />
      </div>

      {/* FAQ Section */}
      <div id="faqs" className="observe-fade bg-white py-20 md:py-32" style={{ opacity: 1, transform: 'translateY(0)', transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Everything you need to know about TrustLoan and how it works.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <FAQ />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default Homepage;
