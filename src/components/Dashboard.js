import React, { useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import LoanSummaryModal from './LoanSummaryModal';
import ActiveLoans from './ActiveLoans';
import FAQ from './FAQ';
import LiveTransactions from './LiveTransactions';
import './Dashboard.css';

const Dashboard = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [activeLoans] = useState([]);

  const CREDIT_LIMIT = 50000;
  const FEE_PERCENTAGE = 0.02;

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
    <div className="dashboard-container">
      {/* Summary Card */}
      <div className="summary-card">
        <div className="summary-header">
          <div className="wallet-info-section">
            <div className="wallet-label">Connected Wallet</div>
            <div className="wallet-address">{truncateAddress(address)}</div>
          </div>
          <button className="disconnect-btn" onClick={() => disconnect()}>
            Disconnect
          </button>
        </div>
        
        <div className="summary-stats">
          <div className="stat-item">
            <div className="stat-label">Active Loans</div>
            <div className="stat-value">{activeLoans.length}</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-label">Credit Limit</div>
            <div className="stat-value">${CREDIT_LIMIT.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Loan Selection Section */}
      <div className="loan-section">
        <h2 className="section-title">Select Loan Amount</h2>
        
        <div className="loan-grid">
          {loanPresets.map((amount) => {
            const fee = amount * FEE_PERCENTAGE;
            return (
              <div
                key={amount}
                className="loan-card"
                onClick={() => handleLoanSelect(amount)}
              >
                <div className="loan-amount">${amount.toLocaleString()}</div>
                <div className="loan-fee">Fee: ${fee.toLocaleString()}</div>
                <div className="loan-card-glow"></div>
              </div>
            );
          })}
        </div>

        {/* Custom Amount Input */}
        <div className="custom-loan-section">
          <input
            type="number"
            className="custom-loan-input"
            placeholder="max amount $50,000 ETH"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            max={CREDIT_LIMIT}
          />
          <button className="custom-loan-btn" onClick={handleCustomLoan}>
            Request Custom Loan
          </button>
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
  );
};

export default Dashboard;
