import React, { useState, useEffect } from 'react';

const LiveTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  // Simulate live transactions (in production, fetch from blockchain)
  useEffect(() => {
    const mockTransactions = [
      {
        id: '0x1a2b...3c4d',
        type: 'Loan Issued',
        amount: '$10,000',
        time: '2 minutes ago',
        status: 'confirmed'
      },
      {
        id: '0x5e6f...7g8h',
        type: 'Loan Repaid',
        amount: '$5,000',
        time: '15 minutes ago',
        status: 'confirmed'
      },
      {
        id: '0x9i0j...1k2l',
        type: 'Loan Issued',
        amount: '$25,000',
        time: '1 hour ago',
        status: 'confirmed'
      },
      {
        id: '0x3m4n...5o6p',
        type: 'Collateral Added',
        amount: '2.5 ETH',
        time: '2 hours ago',
        status: 'confirmed'
      },
      {
        id: '0x7q8r...9s0t',
        type: 'Loan Issued',
        amount: '$50,000',
        time: '3 hours ago',
        status: 'confirmed'
      }
    ];

    setTransactions(mockTransactions);
  }, []);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Loan Issued':
        return '💰';
      case 'Loan Repaid':
        return '✅';
      case 'Collateral Added':
        return '🔒';
      default:
        return '📝';
    }
  };

  return (
    <div className="live-transactions-section">
      <h2 className="section-title">Live Transactions</h2>
      
      <div className="transactions-container">
        {transactions.length === 0 ? (
          <div className="empty-state">
            <p>No recent transactions</p>
          </div>
        ) : (
          <div className="transactions-table">
            <div className="transactions-header">
              <div className="th-type">Type</div>
              <div className="th-amount">Amount</div>
              <div className="th-time">Time</div>
              <div className="th-status">Status</div>
            </div>
            
            <div className="transactions-body">
              {transactions.map((tx) => (
                <div key={tx.id} className="transaction-row">
                  <div className="td-type">
                    <span className="tx-icon">{getTypeIcon(tx.type)}</span>
                    <div className="tx-type-info">
                      <span className="tx-type">{tx.type}</span>
                      <span className="tx-id">{tx.id}</span>
                    </div>
                  </div>
                  <div className="td-amount">{tx.amount}</div>
                  <div className="td-time">{tx.time}</div>
                  <div className="td-status">
                    <span className={`status-badge ${tx.status}`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveTransactions;
