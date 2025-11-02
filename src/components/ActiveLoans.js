import React from 'react';

const ActiveLoans = ({ loans }) => {
  return (
    <div className="bg-white rounded-card shadow-card border border-border p-6 mb-6">
      <h2 className="text-section-title text-text-primary mb-6">Active Loans</h2>
      
      {loans.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4 opacity-30">📄</div>
          <p className="text-lg font-semibold text-text-primary mb-2">No active loans yet</p>
          <p className="text-sm text-text-secondary">Your approved loans will appear here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Loan ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Due Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-text-secondary">Repay</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan, index) => (
                <tr 
                  key={index} 
                  className="border-b border-border hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm font-medium text-text-primary">
                    #{String(index + 1).padStart(4, '0')}
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-text-primary">
                    ${loan.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-text-secondary">
                    {loan.dueDate}
                  </td>
                  <td className="py-4 px-4">
                    <button className="px-4 py-2 bg-gradient-accent text-white rounded-button text-sm font-semibold hover:shadow-hover transition-all">
                      Repay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActiveLoans;
