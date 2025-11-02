import React, { useState, useEffect } from 'react';

const LiveActivity = () => {
  const [transactions, setTransactions] = useState([]);

  // Mock live transactions with animation
  useEffect(() => {
    const mockTransactions = [
      { wallet: '0x8b7A...34D2', amount: '$10,000', status: 'Approved', time: '2 min ago', type: 'loan' },
      { wallet: '0x4c3F...12A8', amount: '$5,000', status: 'Approved', time: '5 min ago', type: 'loan' },
      { wallet: '0x2d1E...89B4', amount: '$3,200', status: 'Repaid', time: '8 min ago', type: 'repayment' },
      { wallet: '0x9f8C...56E3', amount: '$25,000', status: 'Approved', time: '12 min ago', type: 'loan' },
      { wallet: '0x6a5D...23F1', amount: '$8,500', status: 'Approved', time: '15 min ago', type: 'loan' },
      { wallet: '0x1b2C...78E9', amount: '$15,000', status: 'Repaid', time: '18 min ago', type: 'repayment' },
    ];

    setTransactions(mockTransactions);

    // Simulate new transaction every 10 seconds
    const interval = setInterval(() => {
      const newTx = {
        wallet: `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`,
        amount: `$${(Math.random() * 50000 + 1000).toFixed(0).toLocaleString()}`,
        status: Math.random() > 0.3 ? 'Approved' : 'Repaid',
        time: 'Just now',
        type: Math.random() > 0.3 ? 'loan' : 'repayment'
      };
      setTransactions(prev => [newTx, ...prev.slice(0, 5)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Repaid':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    if (type === 'loan') {
      return (
        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <section className="bg-background py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full mb-4">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-success">Live Activity</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Live On-Chain Transactions
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Recent approvals and repayments verified on-chain. Join thousands of users accessing instant credit.
          </p>
        </div>

        {/* Transactions Feed */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-card shadow-card border border-border overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 border-b border-border px-6 py-4">
              <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-text-secondary">
                <div className="col-span-4">Wallet</div>
                <div className="col-span-3">Amount</div>
                <div className="col-span-3">Status</div>
                <div className="col-span-2">Time</div>
              </div>
            </div>

            {/* Transaction List */}
            <div className="divide-y divide-border">
              {transactions.map((tx, index) => (
                <div
                  key={index}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Wallet */}
                    <div className="col-span-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center flex-shrink-0">
                        {getTypeIcon(tx.type)}
                      </div>
                      <span className="font-mono text-sm text-text-primary font-medium">
                        {tx.wallet}
                      </span>
                    </div>

                    {/* Amount */}
                    <div className="col-span-3">
                      <span className="font-semibold text-text-primary">
                        {tx.amount}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="col-span-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(tx.status)}`}>
                        {tx.status}
                      </span>
                    </div>

                    {/* Time */}
                    <div className="col-span-2">
                      <span className="text-sm text-text-secondary">
                        {tx.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t border-border px-6 py-4 text-center">
              <p className="text-sm text-text-secondary">
                Showing recent transactions • Updates every 10 seconds
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-lg border border-border p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">$2.5M</div>
              <div className="text-sm text-text-secondary">Processed Today</div>
            </div>
            <div className="bg-white rounded-lg border border-border p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">156</div>
              <div className="text-sm text-text-secondary">Active Loans</div>
            </div>
            <div className="bg-white rounded-lg border border-border p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">98.5%</div>
              <div className="text-sm text-text-secondary">Approval Rate</div>
            </div>
          </div>
        </div>

        {/* Mobile View - Simplified */}
        <div className="md:hidden max-w-4xl mx-auto mt-8">
          <div className="bg-white rounded-card shadow-card border border-border overflow-hidden">
            <div className="divide-y divide-border">
              {transactions.slice(0, 4).map((tx, index) => (
                <div key={index} className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-text-primary font-medium">
                      {tx.wallet}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-text-primary">{tx.amount}</span>
                    <span className="text-xs text-text-secondary">{tx.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveActivity;
