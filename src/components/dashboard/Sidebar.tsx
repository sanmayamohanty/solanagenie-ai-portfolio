'use client';

import { cn } from '@/lib/utils';
import { 
  Home, 
  Wallet, 
  TrendingUp, 
  CreditCard, 
  Globe, 
  Brain,
  Settings,
  LogOut
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Portfolio', href: '/dashboard/portfolio', icon: Wallet },
  { name: 'Swap', href: '/dashboard/swap', icon: TrendingUp },
  { name: 'Solana Pay', href: '/dashboard/solana-pay', icon: CreditCard },
  { name: 'SNS Domains', href: '/dashboard/sns', icon: Globe },
  { name: 'AI Insights', href: '/dashboard/ai', icon: Brain },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, web3auth } = useAuthStore();

  const handleLogout = async () => {
    if (web3auth) {
      await web3auth.logout();
    }
    logout();
  };

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg"></div>
          <span className="text-xl font-bold text-gray-900">SolanaGenie</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}