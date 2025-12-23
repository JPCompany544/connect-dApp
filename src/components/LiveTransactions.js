import React, { useState, useEffect } from 'react';

const WALLET_ADDRESSES = [
  '0x71C...9A21', '0x3dN...8B44', '0x92F...1E09', '0xA45...7C88', '0xB12...3D44',
  '0xC34...5E66', '0xD56...7F88', '0xE78...9A00', '0xF90...1B22', '0x1A2...3C44',
  '0x3B4...5D66', '0x5C6...7E88', '0x7D8...9F00', '0x9E0...1A22', '0xB01...3C44',
  '0xD23...5E66', '0xF45...7A88', '0x167...9C00', '0x389...1E22', '0x5AB...3D44',
  '0x7CD...5F66', '0x9EF...7A88', '0x123...4B55', '0x456...7C88', '0x789...0D11'
];

const AMOUNTS = [
  '$5,000', '$10,000', '$15,000', '$20,000', '$25,000',
  '$30,000', '$50,000', '$75,000', '$100,000', '$150,000',
  '$200,000', '$250,000', '$300,000', '$500,000'
];

const TIMES = [
  'Just now', '1 min ago', '2 mins ago', '5 mins ago', '10 mins ago',
  '15 mins ago', '30 mins ago', '45 mins ago', '1 hour ago'
];

const LiveTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  // Helper to get random item from array
  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Generate a random list of transactions
  const generateTransactions = () => {
    // Pick 5-8 random transactions to show at a time
    const count = Math.floor(Math.random() * 4) + 5;
    const newTransactions = [];

    // Shuffle wallets to ensure uniqueness in the view
    const shuffledWallets = [...WALLET_ADDRESSES].sort(() => 0.5 - Math.random());

    for (let i = 0; i < count; i++) {
      newTransactions.push({
        id: `tx-${Math.random().toString(36).substr(2, 9)}`,
        wallet: shuffledWallets[i],
        amount: getRandom(AMOUNTS),
        time: getRandom(TIMES),
        status: 'Success'
      });
    }

    // Sort by time "freshness" for visual effect (just naive string sort or random)
    // Actually, "Just now" should be top. Let's strictly place "Just now" at top if present.
    return newTransactions.sort((a, b) => {
      if (a.time === 'Just now') return -1;
      if (b.time === 'Just now') return 1;
      return 0;
    });
  };

  useEffect(() => {
    // Initial load
    setTransactions(generateTransactions());

    // Update every 2 minutes (120,000 ms)
    const intervalId = setInterval(() => {
      setTransactions(generateTransactions());
    }, 120000);

    return () => clearInterval(intervalId);
  }, []);

  const getStatusColor = (status) => {
    if (status === 'Success') return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-card shadow-card border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-section-title text-text-primary">Live Transactions</h2>
        <span className="flex items-center text-xs text-green-600 font-medium">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Live Feed
        </span>
      </div>

      <div className="overflow-x-auto">
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">Loading transactions...</p>
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
                  className="border-b border-border hover:bg-gray-50 transition-colors animate-fadeIn"
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
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default LiveTransactions;
