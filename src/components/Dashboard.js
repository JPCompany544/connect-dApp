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

  /* New State for Multi-step Flow */
  const [step, setStep] = useState(1); // 1: Type, 2: Form, 3: Amount
  const [loanType, setLoanType] = useState(null);
  const [formData, setFormData] = useState({});

  const CREDIT_LIMIT = 2000000;
  const FEE_PERCENTAGE = 0.01;
  // loanPresets removed in favor of config

  const LOAN_TYPES = [
    { id: 'business', label: 'Business Loan', icon: '💼' },
    { id: 'personal', label: 'Personal Loan', icon: '👤' },
    { id: 'renovation', label: 'Home Renovation', icon: '🏠' },
    { id: 'education', label: 'Education / Skill', icon: '🎓' },
    { id: 'credit', label: 'General Credit', icon: '💳' },
  ];

  /* Configuration for Loan Amounts & Fees per Type */
  const LOAN_OPTIONS_CONFIG = {
    business: [
      { amount: 20000, fee: 2000 },
      { amount: 50000, fee: 5000 },
      { amount: 100000, fee: 8500, save: 'Save 10%' },
      { amount: 150000, fee: 10000, save: 'Save 15%' },
      { amount: 200000, fee: 12500, save: 'Save 20%' },
      { amount: 500000, fee: 35000, save: 'Save 20%' } // Collateral Fee mentioned
    ],
    personal: [
      { amount: 5000, fee: 500 },
      { amount: 15000, fee: 1000, save: 'Save 10%' },
      { amount: 20000, fee: 1550, save: 'Save 20%' },
      { amount: 50000, fee: 3500, save: 'Save 30%' },
      { amount: 100000, fee: 5000, save: 'Save 40%' }
    ],
    renovation: [
      { amount: 50000, fee: 5000 },
      { amount: 100000, fee: 8500, save: 'Save 5%' },
      { amount: 200000, fee: 11650, save: 'Save 10%' },
      { amount: 300000, fee: 18550, save: 'Save 10%' },
      { amount: 500000, fee: 25080, save: 'Save 40%' }
    ],
    // Fallback for others using requested standard amounts & 1% logic
    default: [
      { amount: 20000 },
      { amount: 50000 },
      { amount: 100000 },
      { amount: 150000 },
      { amount: 200000 }
    ]
  };

  const truncateAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  /* Step 1 Handler */
  const handleTypeSelect = (type) => {
    setLoanType(type);
    setFormData({}); // Reset form on new type
    setStep(2);
  };

  /* Step 2 Handler */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* Step 3 Handler */
  const handleLoanSelect = (option) => {
    // If fee is pre-defined in config, use it. Otherwise calculate default 1%
    const fee = option.fee !== undefined ? option.fee : option.amount * FEE_PERCENTAGE;

    setSelectedLoan({
      amount: option.amount,
      fee,
      total: option.amount + fee,
      type: loanType,
      details: formData
    });
  };

  // Render Helpers
  const renderStep1 = () => (
    <div className="animate-fadeIn">
      <h2 className="text-section-title text-text-primary mb-2">Select Loan Type</h2>
      <p className="text-sm text-text-secondary mb-6">Choose the category that best fits your needs.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {LOAN_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => handleTypeSelect(type)}
            className="flex flex-col items-center justify-center p-6 border-2 border-border rounded-card hover:border-primary hover:bg-gray-50 transition-all group"
          >
            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{type.icon}</span>
            <span className="font-semibold text-text-primary group-hover:text-primary">{type.label}</span>
          </button>
        ))}
      </div>
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
      `}</style>
    </div>
  );

  const renderStep2 = () => {
    // Dynamic fields based on loanType
    let fields = [];
    if (loanType?.id === 'business') {
      fields = [
        { label: 'Business Category', name: 'category', type: 'select', options: ['Technology', 'Retail', 'Service', 'Manufacturing', 'Other'] },
        { label: 'Monthly Revenue', name: 'revenue', type: 'select', options: ['$0 - $10k', '$10k - $50k', '$50k - $100k', '$100k+'] },
        { label: 'Duration', name: 'duration', type: 'select', options: ['3 Months', '6 Months', '12 Months', '24 Months'] }
      ];
    } else if (loanType?.id === 'personal') {
      fields = [
        { label: 'Purpose', name: 'purpose', type: 'select', options: ['Emergency', 'Travel', 'Large Purchase', 'Debt Consolidation'] },
        { label: 'Employment Status', name: 'employment', type: 'select', options: ['Employed', 'Self-Employed', 'Freelance', 'Retired'] },
        { label: 'Repayment Preference', name: 'repayment', type: 'select', options: ['Weekly', 'Bi-Weekly', 'Monthly'] }
      ];
    } else if (loanType?.id === 'renovation') {
      fields = [
        { label: 'Property Type', name: 'property', type: 'select', options: ['House', 'Condo', 'Apartment', 'Commercial'] },
        { label: 'Est. Cost', name: 'cost', type: 'select', options: ['Under $5k', '$5k - $20k', '$20k - $50k', '$50k+'] },
        { label: 'Timeline', name: 'timeline', type: 'select', options: ['Immediate', 'Within 3 Months', 'Within 6 Months'] }
      ];
    } else {
      // Generic fallback
      fields = [
        { label: 'Loan Purpose', name: 'purpose', type: 'select', options: ['General Use', 'Investment', 'Refinancing'] },
        { label: 'Repayment Term', name: 'term', type: 'select', options: ['Short Term', 'Medium Term', 'Long Term'] }
      ];
    }

    return (
      <div className="animate-fadeIn">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-section-title text-text-primary mb-1">Loan Details</h2>
            <p className="text-sm text-text-secondary">Tell us a bit more about your {loanType?.label}.</p>
          </div>
          <button onClick={() => setStep(1)} className="text-sm text-text-secondary hover:text-primary">Change Type</button>
        </div>

        <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto space-y-5">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col text-left">
              <label className="text-sm font-semibold text-text-secondary mb-2">{field.label}</label>
              <select
                name={field.name}
                required
                onChange={handleInputChange}
                className="w-full p-3 border border-border rounded text-text-primary bg-white focus:border-primary outline-none transition-colors"
              >
                <option value="">Select...</option>
                {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          ))}

          <div className="pt-4 flex gap-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-border rounded-button font-semibold text-text-secondary hover:bg-gray-50 transition-all"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-accent text-white rounded-button font-semibold hover:shadow-hover transition-all"
              style={{ background: 'linear-gradient(135deg, #27e3b9, #11b7f4)' }}
            >
              Continue
            </button>
          </div>
          <p className="text-xs text-center text-text-secondary mt-4">Information is used for loan matching only.</p>
        </form>
      </div>
    );
  };

  /* Step 3 Render Helper */
  const renderStep3 = () => {
    // Determine which options to show
    const typeId = loanType?.id;
    const options = LOAN_OPTIONS_CONFIG[typeId] || LOAN_OPTIONS_CONFIG['default'];

    return (
      <div className="animate-fadeIn">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-section-title text-text-primary mb-2">Select Loan Amount</h2>
            <p className="text-sm text-text-secondary">Choose a preset amount for your {loanType?.label}.</p>
          </div>
          <button onClick={() => setStep(2)} className="text-sm text-text-secondary hover:text-primary">Back to Details</button>
        </div>

        {/* Preset Pills */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {options.map((option) => {
            return (
              <button
                key={option.amount}
                onClick={() => handleLoanSelect(option)}
                className="relative px-4 py-4 border-2 border-border rounded-card text-text-primary font-semibold hover:border-primary hover:bg-primary hover:text-white transition-all transform hover:-translate-y-0.5 shadow-sm group"
              >
                <div className="text-lg">${option.amount.toLocaleString()}</div>
                {option.save && (
                  <span className="absolute -top-3 right-2 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200 group-hover:bg-white group-hover:text-green-600 shadow-sm">
                    {option.save}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="text-center mt-6">
          <button onClick={() => setStep(2)} className="text-sm text-text-secondary underline hover:text-primary">
            Edit Loan Details
          </button>
        </div>
      </div>
    );
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

        {/* Dynamic Main Section */}
        <div className="bg-white rounded-card shadow-card border border-border p-6 mb-6 min-h-[400px]">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
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
