import React from 'react';

const ProcessingModal = ({ isOpen, message = "Processing", subtitle = "Your payment is being securely processed on-chain." }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-card shadow-2xl p-8 max-w-md w-full mx-4 animate-slideUp">
        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-transparent border-t-primary-light rounded-full animate-spin-slow"></div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-3">
          <h3 className="text-2xl font-bold text-text-primary">{message}</h3>
          <p className="text-text-secondary">{subtitle}</p>
          <p className="text-sm text-text-secondary/70">This may take 10–15 seconds.</p>
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
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        .animate-spin-slow {
          animation: spin-slow 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ProcessingModal;
