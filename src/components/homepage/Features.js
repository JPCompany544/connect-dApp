import React from 'react';

const Features = () => {
  const features = [
    {
      title: 'Instant Blockchain-Verified Approvals',
      description: 'Smart contracts verify your eligibility and approve loans in under 10 seconds.'
    },
    {
      title: 'No Traditional Credit Checks',
      description: 'Your on-chain activity is your credit score. No SSN, no credit bureaus, no delays.'
    },
    {
      title: 'Fair 10% Processing & Collateral Fee',
      description: 'Transparent, one-time fee covering processing and collateral management with no hidden charges.'
    },
    {
      title: 'Transparent Smart Contracts',
      description: 'All loan terms are encoded in audited smart contracts. No fine print, no surprises.'
    },
    {
      title: 'Backed by Decentralized Protocols',
      description: 'Built on Ethereum with multi-signature security and community governance.'
    }
  ];

  return (
    <section className="bg-background py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Feature List */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
                Why Choose TrustLoan
              </h2>
              <p className="text-lg text-text-secondary">
                Experience the future of lending with decentralized, transparent, and instant credit access.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-4 group"
                >
                  {/* Check Icon */}
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <svg className="w-4 h-4 text-primary group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-primary mb-1">10K+</div>
                <div className="text-sm text-text-secondary">Loans Issued</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">$50M+</div>
                <div className="text-sm text-text-secondary">Total Volume</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
                <div className="text-sm text-text-secondary">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="relative">
            {/* Main Feature Card */}
            <div className="bg-white rounded-card shadow-card border border-border p-8 relative overflow-hidden">
              {/* Gradient Overlay */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-accent opacity-10 blur-3xl"></div>

              {/* Content */}
              <div className="relative space-y-6">
                {/* Security Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                  <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-success">Audited & Secure</span>
                </div>

                {/* Feature Highlights */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary mb-1">Non-Custodial</div>
                      <div className="text-sm text-text-secondary">You always control your funds</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary mb-1">Smart Contract Verified</div>
                      <div className="text-sm text-text-secondary">Audited by leading security firms</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-text-primary mb-1">Instant Settlement</div>
                      <div className="text-sm text-text-secondary">Funds arrive in seconds, not days</div>
                    </div>
                  </div>
                </div>

                {/* Trust Metrics */}
                <div className="pt-6 border-t border-border">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-primary">100%</div>
                      <div className="text-xs text-text-secondary">Transparent</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-primary">24/7</div>
                      <div className="text-xs text-text-secondary">Available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-100 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
