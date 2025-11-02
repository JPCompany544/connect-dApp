import React, { useState } from 'react';

const CreditLimitCalculator = () => {
  const [amount, setAmount] = useState(10000);
  const fee = amount * 0.10;
  const total = amount + fee;

  const presets = [500, 1000, 5000, 10000, 25000, 50000];

  const handleSliderChange = (e) => {
    setAmount(parseInt(e.target.value));
  };

  return (
    <section className="bg-white py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Your Credit Limit, Simplified
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Calculate your loan instantly. Adjust the amount and see your fee in real-time.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-card shadow-card border-2 border-primary/20 p-8 md:p-12">
            {/* Amount Display */}
            <div className="text-center mb-8">
              <div className="text-sm text-text-secondary mb-2">Loan Amount</div>
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                ${amount.toLocaleString()}
              </div>
              <div className="text-sm text-text-secondary">
                Up to $50,000 available
              </div>
            </div>

            {/* Slider */}
            <div className="mb-8">
              <input
                type="range"
                min="500"
                max="50000"
                step="100"
                value={amount}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #2563EB 0%, #2563EB ${((amount - 500) / (50000 - 500)) * 100}%, #E5E7EB ${((amount - 500) / (50000 - 500)) * 100}%, #E5E7EB 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-text-secondary mt-2">
                <span>$500</span>
                <span>$50,000</span>
              </div>
            </div>

            {/* Preset Buttons */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8">
              {presets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset)}
                  className={`py-2 px-3 rounded-full text-sm font-semibold transition-all ${
                    amount === preset
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white border-2 border-border text-text-primary hover:border-primary'
                  }`}
                >
                  ${preset >= 1000 ? `${preset / 1000}K` : preset}
                </button>
              ))}
            </div>

            {/* Fee Breakdown */}
            <div className="bg-white rounded-lg p-6 space-y-3 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Loan Amount</span>
                <span className="font-semibold text-text-primary">${amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Processing & Collateral Fee (10%)</span>
                <span className="font-semibold text-text-primary">${fee.toLocaleString()}</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-text-primary">Total Repayment</span>
                  <span className="text-2xl font-bold text-primary">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Gauge Visualization */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">Credit Utilization</span>
                <span className="text-sm font-semibold text-primary">{((amount / 50000) * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-accent rounded-full transition-all duration-300"
                  style={{ width: `${(amount / 50000) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full py-4 bg-gradient-accent text-white rounded-button font-semibold text-lg hover:shadow-hover transform hover:-translate-y-0.5 transition-all">
              Check Eligibility
            </button>

            {/* Disclaimer */}
            <p className="text-xs text-text-secondary text-center mt-4">
              * Final loan amount subject to wallet verification and smart contract approval
            </p>
          </div>
        </div>

        {/* Bottom Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-3xl mb-2">⚡</div>
            <div className="font-semibold text-text-primary mb-1">Instant Approval</div>
            <div className="text-sm text-text-secondary">Get approved in under 10 seconds</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-3xl mb-2">🔒</div>
            <div className="font-semibold text-text-primary mb-1">Secure & Private</div>
            <div className="text-sm text-text-secondary">Your data stays on-chain, encrypted</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-3xl mb-2">💎</div>
            <div className="font-semibold text-text-primary mb-1">No Hidden Fees</div>
            <div className="text-sm text-text-secondary">Just 2%, transparent and fair</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #2563EB;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #2563EB;
          cursor: pointer;
          border-radius: 50%;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </section>
  );
};

export default CreditLimitCalculator;
