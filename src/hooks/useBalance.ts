'use client';

import { useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useAuthStore } from '@/store/auth';
import { usePortfolioStore } from '@/store/portfolio';
import { getBalance } from '@/lib/solana';

export function useBalance() {
  const { publicKey } = useAuthStore();
  const { balance, setBalance, setLoading, setError } = usePortfolioStore();

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) return;

      setLoading(true);
      setError(null);

      try {
        const pubKey = new PublicKey(publicKey);
        const solBalance = await getBalance(pubKey);
        setBalance(solBalance);
      } catch (error) {
        console.error('Error fetching balance:', error);
        setError('Failed to fetch balance');
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();

    // Refresh balance every 30 seconds
    const interval = setInterval(fetchBalance, 30000);

    return () => clearInterval(interval);
  }, [publicKey]);

  return { balance };
}