import React, { useState, useEffect } from 'react';

const LiveTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  // Simulate live transactions (in production, fetch from blockchain)
  useEffect(() => {
    const mockTransactions = [
      {
        id: '0x1a2b...3c4d',
        wallet: '0x8b7A...34D2',
        amount: '$10,000',
        time: '2 min ago',
        status: 'Approved'
      },
      {
        id: '0x5e6f...7g8h',
        wallet: '0x4c3F...12A8',
        amount: '$5,000',
        time: '15 min ago',
        status: 'Approved'
      },
      {
        id: '0x9i0j...1k2l',
        wallet: '0x2d1E...89B4',
        amount: '$25,000',
        time: '1 hour ago',
        status: 'Pending'
      },
      {
        id: '0x3m4n...5o6p',
        wallet: '0x9f8C...56E3',
        amount: '$2,500',
        time: '2 hours ago',
        status: 'Approved'
      },
      {
        id: '0x7q8r...9s0t',
        wallet: '0x6a5D...23F1',
        amount: '$50,000',
        time: '3 hours ago',
        status: 'Rejected'
      }
    ];

    setTransactions(mockTransactions);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-card shadow-card border border-border p-6 mb-6">
      <h2 className="text-section-title text-text-primary mb-6">Live Transactions</h2>
      
      <div className="overflow-x-auto">
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">No recent transactions</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Wallet</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr 
                  key={tx.id} 
                  className="border-b border-border hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm font-mono text-text-secondary">
                    {tx.wallet}
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-text-primary">
                    {tx.amount}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-text-secondary">
                    {tx.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LiveTransactions;
