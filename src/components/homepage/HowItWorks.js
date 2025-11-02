import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Connect Wallet',
      description: 'Link your wallet securely to access your credit profile. We support MetaMask, WalletConnect, and more.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      number: '02',
      title: 'Select Loan Amount',
      description: 'Choose your preferred amount from preset options or enter a custom figure up to $50,000.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: '03',
      title: 'Receive Funds Instantly',
      description: 'Loan is approved and credited to your wallet in seconds. Smart contracts handle everything automatically.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-white py-20 md:py-32">
      <div id="how-it-works" className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            How TrustLoan Works
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Three simple steps to get your first on-chain loan. No credit checks, no paperwork, no delays.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-white border-2 border-border rounded-card p-8 hover:border-primary hover:shadow-hover transform hover:-translate-y-1 transition-all duration-300"
            >
              {/* Number Badge */}
              <div className="absolute -top-4 left-8 w-12 h-12 bg-gradient-accent text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                {step.number}
              </div>

              {/* Icon */}
              <div className="text-primary mb-6 mt-4 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {step.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {step.description}
              </p>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-5 rounded-card transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-text-secondary mb-4">
            Ready to get started?
          </p>
          <button className="px-8 py-3 bg-gradient-accent text-white rounded-button font-semibold hover:shadow-hover transform hover:-translate-y-0.5 transition-all">
            Connect Your Wallet
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
