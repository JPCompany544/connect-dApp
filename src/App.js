import './styles.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConnectWallet from './components/ConnectWallet';
import NavBar from './components/NavBar';
import Homepage from './components/homepage/Homepage';
import { useAccount, useWalletClient } from 'wagmi';
import { handleLoanRequest } from './components/handleLoanRequest';
import LiveChat from './components/LiveChat';
import OnboardingModal from './components/OnboardingModal';
import Dashboard from './components/Dashboard';


function App() {
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [mounted, setMounted] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    setMounted(true);

    // TODO: re-enable onboarding flag after testing
    // Check if user has completed onboarding
    // if (!localStorage.getItem('hasCompletedOnboarding')) {
    //   setShowOnboarding(true);
    // }

    // Temporarily show onboarding on every refresh for testing
    setShowOnboarding(true);

    // ✅ Inject Tawk.to chat widget
    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = 'https://embed.tawk.to/685d37b90d497d191b31a29f/1ium23bm3'; // Your real widget link
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    document.body.appendChild(s1);

    // 🚨 Error handler for script issues (already in your code)
    const errorHandler = (e) => {
      const target = e.target || e.srcElement;
      if (target && target.tagName === 'SCRIPT') {
        console.error('🚨 Script failed to load or invalid JS:', {
          src: target.src,
          outerHTML: target.outerHTML,
          message: e.message,
          error: e.error
        });

        fetch(target.src)
          .then(res => res.text())
          .then(body => {
            if (body.startsWith('<')) {
              console.warn('❗ This script returned HTML instead of JS:', target.src);
              console.log('Returned content:\n', body.slice(0, 500));
            }
          })
          .catch(fetchErr => {
            console.error('Failed to fetch script for inspection:', fetchErr);
          });
      }
    };

    window.addEventListener('error', errorHandler, true);

    return () => {
      window.removeEventListener('error', errorHandler, true);
    };
  }, []);

  const handleOnboardingComplete = () => {
    // TODO: re-enable onboarding flag after testing
    // localStorage.setItem('hasCompletedOnboarding', 'true');
    setShowOnboarding(false);
  };

  if (!mounted) return null;

  return (
    <Router>
      {showOnboarding && <OnboardingModal onComplete={handleOnboardingComplete} />}

      <div className="app">
        {/* New Clean Fintech NavBar */}
        <NavBar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={

            isConnected ? <Dashboard /> : (
              <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-6 p-8">
                  <h2 className="text-3xl font-bold text-text-primary">Connect Your Wallet</h2>
                  <p className="text-text-secondary">Please connect your wallet to access the dashboard</p>
                  <ConnectWallet />
                </div>
              </div>
            )
          } />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-100 border-t border-border mt-16">
          <div className="max-w-[1200px] mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-3">TrustLoan</h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Empowering decentralized access to instant loans. No paperwork. No delay.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-3">Navigate</h4>
                <div className="space-y-2">
                  <a href="#how-it-works" className="block text-text-secondary hover:text-primary transition-colors text-sm">How it Works</a>
                  <a href="#loan-offers" className="block text-text-secondary hover:text-primary transition-colors text-sm">Loan Offers</a>
                  <a href="#faq" className="block text-text-secondary hover:text-primary transition-colors text-sm">FAQ</a>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary mb-3">Connect</h4>
                <div className="space-y-2">
                  <a href="https://t.me/josecsco" target="_blank" rel="noopener noreferrer" className="block text-text-secondary hover:text-primary transition-colors text-sm">Telegram</a>
                  <a href="#" className="block text-text-secondary hover:text-primary transition-colors text-sm">Twitter</a>
                  <a href="#" className="block text-text-secondary hover:text-primary transition-colors text-sm">Contact Support</a>
                </div>
              </div>
            </div>
            <div className="border-t border-border pt-6 text-center">
              <p className="text-sm text-text-secondary">&copy; 2025 TrustLoan — All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
