import React, { useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import LoanSummaryModal from './LoanSummaryModal';
import ProcessingModal from './ProcessingModal';
import ActiveLoans from './ActiveLoans';
import FAQ from './FAQ';
import LiveTransactions from './LiveTransactions';

const Dashboard = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [activeLoans] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const CREDIT_LIMIT = 50000;
  const FEE_PERCENTAGE = 0.10;

  const loanPresets = [500, 1000, 5000, 10000, 25000, 50000];

  const truncateAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleLoanSelect = (amount) => {
    const fee = amount * FEE_PERCENTAGE;
    setSelectedLoan({
      amount,
      fee,
      total: amount + fee
    });
  };

  const handleCustomLoan = () => {
    const amount = parseFloat(customAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid loan amount');
      return;
    }
    if (amount > CREDIT_LIMIT) {
      alert(`Maximum loan amount is $${CREDIT_LIMIT.toLocaleString()}`);
      return;
    }
    handleLoanSelect(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Hero Overview Card */}
        <div className="bg-white rounded-card shadow-card border border-border p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left Side - Overview */}
            <div className="flex-1">
              <h2 className="text-section-title text-text-primary mb-4">Loan Overview</h2>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-text-secondary">Wallet Address</p>
                <p className="text-base font-mono font-medium text-text-primary">{truncateAddress(address)}</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Credit Limit</p>
                  <p className="text-2xl font-bold text-text-primary">${CREDIT_LIMIT.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Active Loans</p>
                  <p className="text-2xl font-bold text-text-primary">{activeLoans.length}</p>
                </div>
              </div>
            </div>
            
            {/* Right Side - Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => disconnect()}
                className="px-6 py-2.5 border-2 border-primary text-primary rounded-button font-semibold hover:bg-primary hover:text-white transition-all"
              >
                Disconnect Wallet
              </button>
              <p className="text-xs text-text-secondary text-center max-w-xs">
                Your wallet is securely synced to TrustLoan's smart contract.
              </p>
            </div>
          </div>
        </div>

        {/* Loan Selection Section */}
        <div className="bg-white rounded-card shadow-card border border-border p-6 mb-6">
          <h2 className="text-section-title text-text-primary mb-2">Select Your Loan Amount</h2>
          <p className="text-sm text-text-secondary mb-6">Choose a preset or enter a custom amount.</p>
          
          {/* Preset Pills */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            {loanPresets.map((amount) => {
              const fee = amount * FEE_PERCENTAGE;
              return (
                <button
                  key={amount}
                  onClick={() => handleLoanSelect(amount)}
                  className="px-4 py-3 border-2 border-border rounded-full text-text-primary font-semibold hover:border-primary hover:bg-primary hover:text-white transition-all transform hover:-translate-y-0.5"
                >
                  ${amount.toLocaleString()}
                </button>
              );
            })}
          </div>

          {/* Custom Amount Input */}
          <div className="border-t border-border pt-6">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Custom Amount (USD)
            </label>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="number"
                className="flex-1 px-4 py-3 border-2 border-border rounded-input focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                max={CREDIT_LIMIT}
              />
              <button
                onClick={handleCustomLoan}
                className="px-8 py-3 bg-gradient-accent text-white rounded-button font-semibold hover:shadow-hover transform hover:-translate-y-0.5 transition-all"
              >
                Apply for Loan
              </button>
            </div>
            <p className="text-xs text-text-secondary mt-2">Fee: 10% of selected amount (processing & collateral)</p>
          </div>
        </div>

        {/* Active Loans Section */}
        <ActiveLoans loans={activeLoans} />

        {/* FAQ Section */}
        <FAQ />

        {/* Live Transactions Section */}
        <LiveTransactions />

        {/* Loan Summary Modal */}
        {selectedLoan && (
          <LoanSummaryModal
            loan={selectedLoan}
            onClose={() => { setSelectedLoan(null); setIsProcessing(false); }}
            walletAddress={address}
            onProcessingChange={setIsProcessing}
          />
        )}

        {/* Processing Modal */}
        <ProcessingModal isOpen={isProcessing} />
      </div>
    </div>
  );
};

export default Dashboard;
