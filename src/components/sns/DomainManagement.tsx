'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SNSDomain } from '@/lib/sns';
import { useAuthStore } from '@/store/auth';
import { ArrowLeft, ExternalLink, Copy } from 'lucide-react';

interface DomainManagementProps {
  domain: SNSDomain;
  onBack: () => void;
}

export default function DomainManagement({ domain, onBack }: DomainManagementProps) {
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [profileData, setProfileData] = useState({
    twitter: '',
    discord: '',
    website: '',
    bio: '',
  });
  const { publicKey } = useAuthStore();

  const handleRegister = async () => {
    setRegistering(true);
    
    try {
      // Simulate registration process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setRegistered(true);
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setRegistering(false);
    }
  };

  const copyDomainAddress = () => {
    const domainUrl = `${domain.name}.sol`;
    navigator.clipboard.writeText(domainUrl);
  };

  const openExplorer = () => {
    // In a real implementation, this would open the domain in Solana Explorer
    window.open(`https://explorer.solana.com/address/${domain.name}?cluster=devnet`, '_blank');
  };

  if (registered) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Congratulations!
          </h3>
          <p className="text-gray-600">
            You have successfully registered <strong>{domain.name}.sol</strong>
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="font-semibold">{domain.name}.sol</span>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyDomainAddress}
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={openExplorer}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <h4 className="font-semibold text-gray-900">Set up your profile</h4>
          
          <div>
            <Label htmlFor="twitter">Twitter Handle</Label>
            <Input
              id="twitter"
              placeholder="@username"
              value={profileData.twitter}
              onChange={(e) => setProfileData(prev => ({ ...prev, twitter: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="discord">Discord</Label>
            <Input
              id="discord"
              placeholder="username#1234"
              value={profileData.discord}
              onChange={(e) => setProfileData(prev => ({ ...prev, discord: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              placeholder="https://example.com"
              value={profileData.website}
              onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              placeholder="Tell us about yourself..."
              value={profileData.bio}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
            />
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
          <Button className="flex-1">
            Update Profile
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mr-3"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Register Domain</h3>
          <p className="text-sm text-gray-600">Complete your {domain.name}.sol registration</p>
        </div>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-semibold text-purple-900 text-lg">
              {domain.name}.sol
            </h4>
            <p className="text-purple-700 text-sm">Available for registration</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-900">
              {domain.price} SOL
            </div>
            <p className="text-purple-600 text-sm">Registration fee</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <Label>Your Wallet Address</Label>
          <div className="font-mono text-sm bg-gray-50 p-2 rounded border">
            {publicKey ? `${publicKey.slice(0, 8)}...${publicKey.slice(-8)}` : 'Not connected'}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <h5 className="font-medium text-yellow-800 mb-2">Important Notes:</h5>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Domain registration is permanent and cannot be reversed</li>
            <li>• You will own this domain and can transfer it later</li>
            <li>• Registration fee is non-refundable</li>
            <li>• Domain will resolve to your wallet address by default</li>
          </ul>
        </div>
      </div>

      <Button
        onClick={handleRegister}
        disabled={registering || !publicKey}
        className="w-full"
        size="lg"
      >
        {registering ? 'Processing Registration...' : `Register ${domain.name}.sol`}
      </Button>

      {!publicKey && (
        <p className="text-sm text-red-600 text-center mt-2">
          Please connect your wallet to register domains
        </p>
      )}
    </div>
  );
}