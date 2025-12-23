import React, { useState, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import LoanSummaryModal from './LoanSummaryModal';
import ActiveLoans from './ActiveLoans';
import FAQ from './FAQ';
import LiveTransactions from './LiveTransactions';

const Dashboard = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [activeLoans] = useState([]);

  const CREDIT_LIMIT = 2000000;
  const FEE_PERCENTAGE = 0.01;
  const loanPresets = [1000000, 1200000, 1500000, 2000000];

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
          <p className="text-sm text-text-secondary mb-6">Choose a preset amount.</p>

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
            onClose={() => setSelectedLoan(null)}
            walletAddress={address}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
