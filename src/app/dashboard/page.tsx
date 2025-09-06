'use client';

import BalanceCard from '@/components/dashboard/BalanceCard';
import { useAuthStore } from '@/store/auth';
import { Brain, CreditCard, Globe, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuthStore();

  const quickActions = [
    {
      name: 'Token Swap',
      description: 'Exchange tokens using Jupiter',
      href: '/dashboard/swap',
      icon: TrendingUp,
      color: 'bg-blue-500',
    },
    {
      name: 'Solana Pay',
      description: 'Create payment requests',
      href: '/dashboard/solana-pay',
      icon: CreditCard,
      color: 'bg-green-500',
    },
    {
      name: 'SNS Domains',
      description: 'Manage .sol domains',
      href: '/dashboard/sns',
      icon: Globe,
      color: 'bg-purple-500',
    },
    {
      name: 'AI Insights',
      description: 'Portfolio analysis',
      href: '/dashboard/ai',
      icon: Brain,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name || 'Anonymous'}!
        </h2>
        <p className="text-purple-100">
          Manage your Solana portfolio with AI-powered insights and seamless Web3 interactions.
        </p>
      </div>

      {/* Balance Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <BalanceCard />
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${action.color} text-white mr-4`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{action.name}</h4>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="text-center py-8 text-gray-500">
          <p>No recent activity. Start by connecting to get devnet SOL!</p>
          <a
            href="https://faucet.solana.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-700 font-medium mt-2 inline-block"
          >
            Get free devnet SOL →
          </a>
        </div>
      </div>
    </div>
  );
}