import React, { useState, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useNavigate, useLocation } from 'react-router-dom';
import ConnectWallet from './ConnectWallet';

const NavBar = () => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const truncateAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 4)}...${addr.slice(-3)}`;
  };

  const handleNavigation = (path, sectionId = null) => {
    if (sectionId && location.pathname === '/') {
      // If on homepage, scroll to section
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId) {
      // If not on homepage, navigate then scroll
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Just navigate
      navigate(path);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 bg-white border-b border-border transition-all duration-300 ${scrolled ? 'shadow-md backdrop-blur-sm bg-white/95' : 'shadow-sm'}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-2xl font-bold text-primary">TrustLoan</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('/')}
              className="text-text-primary font-medium hover:text-primary transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('/', 'how-it-works')}
              className="text-text-primary font-medium hover:text-primary transition-colors"
            >
              How it Works
            </button>
            <button 
              onClick={() => handleNavigation('/', 'faqs')}
              className="text-text-primary font-medium hover:text-primary transition-colors"
            >
              FAQs
            </button>
            <button 
              onClick={() => handleNavigation('/dashboard')}
              className="text-text-primary font-medium hover:text-primary transition-colors"
            >
              Dashboard
            </button>
          </div>

          {/* Wallet Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-3">
                <div className="px-4 py-2 bg-blue-50 border border-primary/20 rounded-lg">
                  <span className="text-sm font-mono text-primary font-medium">
                    {truncateAddress(address)}
                  </span>
                </div>
                <button
                  onClick={() => disconnect()}
                  className="text-sm text-text-secondary hover:text-primary font-medium"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <ConnectWallet />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6 text-text-primary"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="px-6 py-4 space-y-3">
            <button 
              onClick={() => handleNavigation('/')}
              className="block w-full text-left text-text-primary font-medium hover:text-primary py-2"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('/', 'how-it-works')}
              className="block w-full text-left text-text-primary font-medium hover:text-primary py-2"
            >
              How it Works
            </button>
            <button 
              onClick={() => handleNavigation('/', 'faqs')}
              className="block w-full text-left text-text-primary font-medium hover:text-primary py-2"
            >
              FAQs
            </button>
            <button 
              onClick={() => handleNavigation('/dashboard')}
              className="block w-full text-left text-text-primary font-medium hover:text-primary py-2"
            >
              Dashboard
            </button>
            <div className="pt-3 border-t border-border">
              {isConnected ? (
                <div className="space-y-2">
                  <div className="px-4 py-2 bg-blue-50 border border-primary/20 rounded-lg">
                    <span className="text-sm font-mono text-primary font-medium">
                      {truncateAddress(address)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      disconnect();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left text-sm text-text-secondary hover:text-primary font-medium py-2"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <ConnectWallet />
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
