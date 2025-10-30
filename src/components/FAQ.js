import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How do crypto-backed loans work?',
      answer: 'You deposit cryptocurrency as collateral into a smart contract. Based on the value of your collateral, you can borrow stablecoins instantly. Your collateral is held securely until you repay the loan.'
    },
    {
      question: 'What happens if I don\'t repay my loan?',
      answer: 'If the loan is not repaid within the agreed timeframe, or if your collateral value drops below the liquidation threshold, your collateral may be liquidated to cover the loan amount and fees.'
    },
    {
      question: 'Are there any credit checks?',
      answer: 'No! TrustLoan is completely decentralized. There are no credit checks, no paperwork, and no intermediaries. Your loan is approved instantly based on your collateral.'
    },
    {
      question: 'What cryptocurrencies can I use as collateral?',
      answer: 'Currently, we support ETH, WBTC, and other major cryptocurrencies. The accepted collateral types are displayed when you connect your wallet.'
    },
    {
      question: 'How is the loan fee calculated?',
      answer: 'The loan fee is 2% of the borrowed amount. This fee covers network costs and platform operations. There are no hidden fees or charges.'
    },
    {
      question: 'Can I repay my loan early?',
      answer: 'Yes! You can repay your loan at any time without penalties. Once repaid, your collateral is immediately released back to your wallet.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2 className="section-title">Frequently Asked Questions</h2>
      
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${openIndex === index ? 'active' : ''}`}
          >
            <div 
              className="faq-question" 
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">
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
