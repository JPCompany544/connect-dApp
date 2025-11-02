import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How long does it take to approve a loan?',
      answer: 'Loans are approved instantly on-chain. Once you submit your request and the transaction is confirmed, you\'ll receive your funds immediately — typically within 10-15 seconds.'
    },
    {
      question: 'How do I repay my loan?',
      answer: 'You can repay your loan at any time through the dashboard. Simply click the "Repay" button on your active loan, and confirm the transaction in your wallet. There are no early repayment penalties.'
    },
    {
      question: 'Is my wallet data secure?',
      answer: 'Absolutely. TrustLoan uses industry-standard encryption and never stores your private keys. All transactions are processed directly through your wallet, and our smart contracts are audited for security.'
    },
    {
      question: 'What is the 10% fee used for?',
      answer: 'The 10% processing and collateral fee serves multiple purposes: (1) Collateral Management - A portion is held as security to protect the lending pool and ensure loan stability. (2) Smart Contract Operations - Covers gas fees and on-chain transaction costs. (3) Risk Management - Helps maintain platform solvency and protects against market volatility. (4) Platform Maintenance - Supports ongoing development, security audits, and infrastructure costs. This is a transparent, one-time fee with no hidden charges or recurring costs. The collateral component is returned upon successful loan repayment.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-card shadow-card border border-border p-6 mb-6">
      <h2 className="text-section-title text-text-primary mb-6">Frequently Asked Questions</h2>
      
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`border-b border-border last:border-b-0 ${openIndex === index ? 'border-l-4 border-l-primary' : ''}`}
          >
            <button 
              className="w-full text-left py-4 px-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-semibold text-text-primary pr-4">{faq.question}</span>
              <span className="text-2xl text-primary font-light flex-shrink-0 transition-transform duration-200" style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-text-secondary leading-relaxed animate-slideDown">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
