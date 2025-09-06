'use client';

import { useBalance } from '@/hooks/useBalance';
import { usePortfolioStore } from '@/store/portfolio';
import { Wallet, TrendingUp, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BalanceCard() {
  const { balance } = useBalance();
  const { loading, error } = usePortfolioStore();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Wallet className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">SOL Balance</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={loading ? 'animate-spin' : ''}
          disabled={loading}
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2">
        <div className="text-3xl font-bold text-gray-900">
          {loading ? (
            <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
          ) : error ? (
            <span className="text-red-500 text-sm">Error loading</span>
          ) : (
            `${balance.toFixed(4)} SOL`
          )}
        </div>
        
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <TrendingUp className="w-4 h-4" />
          <span>Solana Devnet</span>
        </div>

        {balance === 0 && !loading && !error && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Your wallet has no SOL. Get free devnet SOL from the{' '}
              <a
                href="https://faucet.solana.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline hover:text-yellow-900"
              >
                Solana Faucet
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}