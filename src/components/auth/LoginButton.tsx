'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth';

export default function LoginButton() {
  const [loading, setLoading] = useState(false);
  const { 
    web3auth, 
    isConnected, 
    setProvider, 
    setIsConnected, 
    setUser, 
    setPublicKey,
    logout 
  } = useAuthStore();

  const handleLogin = async () => {
    console.log('LoginButton: handleLogin called');
    console.log('LoginButton: web3auth instance:', web3auth);
    console.log('LoginButton: web3auth status:', web3auth?.status);
    console.log('LoginButton: web3auth connected:', web3auth?.connected);
    
    if (!web3auth) {
      console.error("Web3Auth not initialized yet");
      alert('Web3Auth not initialized. Please refresh the page.');
      return;
    }

    if (web3auth.status !== 'ready') {
      console.error('Web3Auth not ready yet, status:', web3auth.status);
      alert('Web3Auth not ready. Please wait a moment and try again.');
      return;
    }

    // Additional check for modal initialization
    try {
      console.log('Checking if modal is initialized...');
      // Try to access modal state - this will throw if not ready
      const modalState = web3auth.status;
      console.log('Modal state check passed:', modalState);
    } catch (modalError) {
      console.error('Modal not initialized:', modalError);
      alert('Login modal not ready. Please refresh the page and try again.');
      return;
    }

    setLoading(true);
    try {
      console.log('Starting login process...');
      console.log('Web3Auth status before connect:', web3auth.status);
      console.log('Web3Auth connected before connect:', web3auth.connected);
      
      console.log('Calling web3auth.connect()...');
      
      // Try to force modal initialization if not ready
      try {
        if (typeof web3auth.initModal === 'function') {
          console.log('Attempting to initialize modal before connect...');
          await web3auth.initModal();
        }
      } catch (modalInitError) {
        console.warn('Modal initialization warning:', modalInitError);
      }
      
      const web3authProvider = await web3auth.connect();
      console.log('Web3Auth connected, provider:', web3authProvider);
      console.log('Web3Auth status after connect:', web3auth.status);
      console.log('Web3Auth connected after connect:', web3auth.connected);
      
      setProvider(web3authProvider);
      setIsConnected(true);

      const user = await web3auth.getUserInfo();
      console.log('Got user info:', user);
      setUser(user);

      if (web3authProvider) {
        try {
          const accounts = await web3authProvider.request({
            method: "getAccounts",
          });
          console.log('Got accounts:', accounts);
          if (Array.isArray(accounts) && accounts.length > 0) {
            setPublicKey(accounts[0] as string);
            console.log('Set public key:', accounts[0]);
          }
        } catch (accountError) {
          console.error('Error getting accounts:', accountError);
        }
      }

      // Redirect to dashboard after successful login
      console.log('Login successful, redirecting to dashboard');
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login failed:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        errorObject: error
      });
      alert(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!web3auth) return;

    try {
      await web3auth.logout();
      logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isConnected) {
    return (
      <Button 
        onClick={handleLogout}
        variant="outline" 
        className="text-white border-white hover:bg-white hover:text-black"
      >
        Disconnect
      </Button>
    );
  }

  console.log('LoginButton: Rendering button, web3auth exists:', !!web3auth);
  console.log('LoginButton: Button disabled state:', loading || !web3auth);

  return (
    <Button 
      onClick={() => {
        console.log('Button clicked!');
        handleLogin();
      }}
      disabled={loading || !web3auth}
      size="lg" 
      className="bg-purple-600 hover:bg-purple-700"
    >
      {loading ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
}