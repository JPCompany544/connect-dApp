import React from 'react';

const ActiveLoans = ({ loans }) => {
  return (
    <div className="active-loans-section">
      <h2 className="section-title">Active Loans</h2>
      
      {loans.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💼</div>
          <p className="empty-message">No active loans.</p>
          <p className="empty-submessage">Borrow assets to see your active loans here.</p>
        </div>
      ) : (
        <div className="loans-list">
          {loans.map((loan, index) => (
            <div key={index} className="loan-item">
              <div className="loan-item-header">
                <span className="loan-item-label">Loan #{index + 1}</span>
                <span className="loan-item-status">Active</span>
              </div>
              <div className="loan-item-details">
                <div className="loan-detail">
                  <span className="detail-label">Amount</span>
                  <span className="detail-value">${loan.amount.toLocaleString()}</span>
                </div>
                <div className="loan-detail">
                  <span className="detail-label">Due Date</span>
                  <span className="detail-value">{loan.dueDate}</span>
                </div>
                <div className="loan-detail">
                  <span className="detail-label">Remaining</span>
                  <span className="detail-value">${loan.remaining.toLocaleString()}</span>
                </div>
              </div>
              <button className="repay-btn">Repay Loan</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveLoans;
