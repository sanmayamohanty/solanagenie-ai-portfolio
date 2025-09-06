'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Check, X, Clock } from 'lucide-react';
import { searchDomain, validateDomainName, formatDomain, getSuggestedDomains, SNSDomain } from '@/lib/sns';

interface DomainSearchProps {
  onDomainSelect: (domain: SNSDomain) => void;
}

export default function DomainSearch({ onDomainSelect }: DomainSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SNSDomain | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (domain: string) => {
    const cleanDomain = domain.toLowerCase().trim();
    
    if (!cleanDomain) return;
    
    if (!validateDomainName(cleanDomain)) {
      setError('Invalid domain name. Use 3-63 characters (letters, numbers, hyphens only)');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await searchDomain(cleanDomain);
      setSearchResult(result);
      
      if (!result.available) {
        setSuggestions(getSuggestedDomains(cleanDomain));
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      setError('Failed to search domain. Please try again.');
      console.error('Domain search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    handleSearch(suggestion);
  };

  const handleSelect = () => {
    if (searchResult) {
      onDomainSelect(searchResult);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Search SNS Domains</h3>
        <p className="text-sm text-gray-600">Find and register .sol domains on Solana</p>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Enter domain name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-12"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
              .sol
            </span>
          </div>
          <Button
            type="submit"
            disabled={loading || !searchTerm.trim()}
          >
            {loading ? (
              <Clock className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </form>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {searchResult && (
        <div className="mb-6 p-4 border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-lg">
              {formatDomain(searchResult.name)}
            </h4>
            <div className="flex items-center space-x-2">
              {searchResult.available ? (
                <div className="flex items-center text-green-600">
                  <Check className="w-5 h-5 mr-1" />
                  <span className="font-medium">Available</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <X className="w-5 h-5 mr-1" />
                  <span className="font-medium">Taken</span>
                </div>
              )}
            </div>
          </div>

          {searchResult.available && searchResult.price && (
            <div className="mb-3">
              <span className="text-sm text-gray-600">Registration Price: </span>
              <span className="font-semibold text-purple-600">
                {searchResult.price} SOL
              </span>
            </div>
          )}

          {searchResult.owner && (
            <div className="mb-3">
              <span className="text-sm text-gray-600">Owner: </span>
              <span className="font-mono text-xs text-gray-800">
                {searchResult.owner.slice(0, 8)}...{searchResult.owner.slice(-8)}
              </span>
            </div>
          )}

          {searchResult.available && (
            <Button
              onClick={handleSelect}
              className="w-full"
            >
              Select Domain
            </Button>
          )}
        </div>
      )}

      {suggestions.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Suggested Alternatives</h4>
          <div className="grid grid-cols-2 gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-left p-2 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-purple-600">
                  {formatDomain(suggestion)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}