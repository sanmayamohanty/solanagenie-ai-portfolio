'use client';

import { useAuthStore } from '@/store/auth';
import { formatSolAddress } from '@/lib/solana';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink } from 'lucide-react';

export default function Header() {
  const { user, publicKey } = useAuthStore();

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
    }
  };

  const openExplorer = () => {
    if (publicKey) {
      window.open(`https://explorer.solana.com/address/${publicKey}?cluster=devnet`, '_blank');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, {user?.name || 'Anonymous'}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {publicKey && (
            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
              <span className="text-sm font-mono text-gray-600">
                {formatSolAddress(publicKey)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={copyAddress}
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={openExplorer}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          )}
          
          {user?.profileImage && (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          )}
        </div>
      </div>
    </header>
  );
}