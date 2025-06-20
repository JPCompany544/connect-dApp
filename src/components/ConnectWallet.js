import React, { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import '../styles.css';

export default function ConnectWallet({ isInteractive = true }) {
  const { address, isConnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait until the component is mounted and hydrated
    setReady(true);
  }, []);

  const handleConnect = async () => {
    try {
      await open();
    } catch (err) {
      console.error('Connection failed:', err);
    }
  };

  if (!ready) return null;

  if (!isConnected) {
    return (
      <button
        onClick={handleConnect}
        disabled={!isInteractive || isConnecting}
        className={`connect-wallet-button ${
          !isInteractive || isConnecting ? 'disabled' : ''
        }`}
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    );
  }

  return (
    <div className={`wallet-info ${!isInteractive ? 'wallet-preview' : ''}`}>
      <span className="wallet-address">
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </span>
      {isInteractive && (
        <button onClick={() => disconnect()} className="disconnect-button">
          Disconnect
        </button>
      )}
    </div>
  );
}
