import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleLaunchApp = () => {
    navigate('/dashboard');
  };

  const handleLearnMore = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-background overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-blue-50 opacity-50"></div>
      
      <div className="relative max-w-[1200px] mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 animate-fadeIn">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
                Instant On-Chain Loans,
                <span className="text-primary"> No Paperwork</span>
              </h1>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                Access decentralized credit in seconds. Connect your wallet, select your amount, and receive funds instantly — all powered by smart contracts.
              </p>
            </div>

            {/* Key Stats */}
            <div className="flex flex-wrap gap-8">
              <div>
                <div className="text-3xl font-bold text-primary">$50K</div>
                <div className="text-sm text-text-secondary">Credit Limit</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">10%</div>
                <div className="text-sm text-text-secondary">Processing Fee</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">10s</div>
                <div className="text-sm text-text-secondary">Approval Time</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleLaunchApp}
                className="px-8 py-4 bg-gradient-accent text-white rounded-button font-semibold text-lg hover:shadow-hover transform hover:-translate-y-0.5 transition-all"
              >
                Launch App
              </button>
              <button
                onClick={handleLearnMore}
                className="px-8 py-4 border-2 border-border text-text-primary rounded-button font-semibold text-lg hover:border-primary hover:text-primary transition-all"
              >
                Learn More
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-text-secondary">Audited Smart Contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-text-secondary">Non-Custodial</span>
              </div>
            </div>
          </div>

          {/* Right Column - Illustration/Mockup */}
          <div className="relative animate-slideUp">
            {/* Floating Card Mockup */}
            <div className="relative">
              {/* Main Dashboard Preview Card */}
              <div className="bg-white rounded-card shadow-2xl border border-border p-6 transform hover:scale-105 transition-transform duration-500">
                <div className="space-y-4">
                  {/* Mock Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-accent rounded-full"></div>
                      <div>
                        <div className="text-sm font-semibold text-text-primary">Your Wallet</div>
                        <div className="text-xs text-text-secondary font-mono">0x8b7A...34D2</div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      Connected
                    </div>
                  </div>

                  {/* Mock Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-xs text-text-secondary mb-1">Available Credit</div>
                      <div className="text-2xl font-bold text-primary">$50,000</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-text-secondary mb-1">Active Loans</div>
                      <div className="text-2xl font-bold text-text-primary">0</div>
                    </div>
                  </div>

                  {/* Mock Loan Selection */}
                  <div className="space-y-2">
                    <div className="text-xs text-text-secondary">Quick Select</div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="px-3 py-2 border-2 border-border rounded-full text-center text-sm font-semibold hover:border-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
                        $1K
                      </div>
                      <div className="px-3 py-2 border-2 border-primary bg-primary text-white rounded-full text-center text-sm font-semibold">
                        $5K
                      </div>
                      <div className="px-3 py-2 border-2 border-border rounded-full text-center text-sm font-semibold hover:border-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
                        $10K
                      </div>
                    </div>
                  </div>

                  {/* Mock CTA */}
                  <button className="w-full py-3 bg-gradient-accent text-white rounded-button font-semibold">
                    Apply for Loan
                  </button>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-100 rounded-full opacity-50 blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full opacity-50 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
