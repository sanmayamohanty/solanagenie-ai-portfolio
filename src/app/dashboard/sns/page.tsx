'use client';

import { useState } from 'react';
import DomainSearch from '@/components/sns/DomainSearch';
import DomainManagement from '@/components/sns/DomainManagement';
import { Globe } from 'lucide-react';
import { SNSDomain } from '@/lib/sns';

export default function SNSPage() {
  const [selectedDomain, setSelectedDomain] = useState<SNSDomain | null>(null);

  const handleDomainSelect = (domain: SNSDomain) => {
    setSelectedDomain(domain);
  };

  const handleBack = () => {
    setSelectedDomain(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Globe className="w-8 h-8 text-purple-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SNS Domains</h1>
          <p className="text-gray-600">Manage your Solana Name Service domains</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h3 className="font-semibold text-purple-900 mb-2">About Solana Name Service</h3>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Register human-readable .sol domains for your Solana addresses</li>
          <li>• Use domains instead of long wallet addresses for easy payments</li>
          <li>• Create a decentralized identity with social profiles</li>
          <li>• Transfer or sell your domains on secondary markets</li>
        </ul>
      </div>

      {/* Main Content */}
      {selectedDomain ? (
        <DomainManagement
          domain={selectedDomain}
          onBack={handleBack}
        />
      ) : (
        <DomainSearch onDomainSelect={handleDomainSelect} />
      )}

      {/* Domain Pricing Info */}
      {!selectedDomain && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Domain Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">750</div>
              <div className="text-sm text-gray-600">SOL</div>
              <div className="text-xs text-gray-500">3 characters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">160</div>
              <div className="text-sm text-gray-600">SOL</div>
              <div className="text-xs text-gray-500">4 characters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">100</div>
              <div className="text-sm text-gray-600">SOL</div>
              <div className="text-xs text-gray-500">5 characters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">20-25</div>
              <div className="text-sm text-gray-600">SOL</div>
              <div className="text-xs text-gray-500">6+ characters</div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Prices are for demonstration purposes. Actual SNS pricing may vary.
          </p>
        </div>
      )}
    </div>
  );
}