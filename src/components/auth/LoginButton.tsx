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
    if (!web3auth) {
      console.log("Web3Auth not initialized yet");
      return;
    }

    setLoading(true);
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      setIsConnected(true);

      const user = await web3auth.getUserInfo();
      setUser(user as any);

      if (web3authProvider) {
        const accounts = await web3authProvider.request({
          method: "getAccounts",
        });
        if (Array.isArray(accounts) && accounts.length > 0) {
          setPublicKey(accounts[0] as string);
        }
      }

      // Redirect to dashboard after successful login
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login failed:', error);
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

  return (
    <Button 
      onClick={handleLogin}
      disabled={loading || !web3auth}
      size="lg" 
      className="bg-purple-600 hover:bg-purple-700"
    >
      {loading ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
}