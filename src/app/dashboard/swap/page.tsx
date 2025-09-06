'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpDown, TrendingUp, AlertCircle } from 'lucide-react';
import { getTokenList, getQuote, formatTokenAmount, Token, Quote } from '@/lib/jupiter';
import { useAuthStore } from '@/store/auth';

export default function SwapPage() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState('');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const { publicKey } = useAuthStore();

  useEffect(() => {
    const loadTokens = async () => {
      try {
        const tokenList = await getTokenList();
        setTokens(tokenList);
        
        // Set default tokens (SOL -> USDC)
        setFromToken(tokenList.find(t => t.symbol === 'SOL') || tokenList[0]);
        setToToken(tokenList.find(t => t.symbol === 'USDC') || tokenList[1]);
      } catch (error) {
        console.error('Error loading tokens:', error);
      }
    };

    loadTokens();
  }, []);

  const handleGetQuote = async () => {
    if (!fromToken || !toToken || !fromAmount || parseFloat(fromAmount) <= 0) {
      return;
    }

    setLoading(true);
    try {
      const quoteResult = await getQuote(
        fromToken.address,
        toToken.address,
        fromAmount
      );
      setQuote(quoteResult);
    } catch (error) {
      console.error('Error getting quote:', error);
      alert('Failed to get quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = async () => {
    if (!quote) return;

    setSwapping(true);
    try {
      // Simulate swap process
      await new Promise(resolve => setTimeout(resolve, 3000));
      alert('Swap completed successfully! (Demo)');
      setQuote(null);
      setFromAmount('');
    } catch (error) {
      console.error('Swap failed:', error);
      alert('Swap failed. Please try again.');
    } finally {
      setSwapping(false);
    }
  };

  const switchTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setQuote(null);
  };

  const selectToken = (token: Token, isFrom: boolean) => {
    if (isFrom) {
      setFromToken(token);
    } else {
      setToToken(token);
    }
    setQuote(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <TrendingUp className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Token Swap</h1>
          <p className="text-gray-600">Exchange tokens using Jupiter aggregator</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Swap Interface */}
        <Card>
          <CardHeader>
            <CardTitle>Swap Tokens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* From Token */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">From</label>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={fromAmount}
                    onChange={(e) => {
                      setFromAmount(e.target.value);
                      setQuote(null);
                    }}
                  />
                </div>
                <select
                  value={fromToken?.symbol || ''}
                  onChange={(e) => {
                    const token = tokens.find(t => t.symbol === e.target.value);
                    if (token) selectToken(token, true);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  {tokens.map(token => (
                    <option key={token.address} value={token.symbol}>
                      {token.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Switch Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={switchTokens}
              >
                <ArrowUpDown className="w-4 h-4" />
              </Button>
            </div>

            {/* To Token */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">To</label>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="0.00"
                    value={quote ? formatTokenAmount(quote.outAmount, toToken?.decimals || 6).toFixed(6) : ''}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <select
                  value={toToken?.symbol || ''}
                  onChange={(e) => {
                    const token = tokens.find(t => t.symbol === e.target.value);
                    if (token) selectToken(token, false);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  {tokens.map(token => (
                    <option key={token.address} value={token.symbol}>
                      {token.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quote Button */}
            <Button
              onClick={handleGetQuote}
              disabled={loading || !fromAmount || !fromToken || !toToken}
              className="w-full"
            >
              {loading ? 'Getting Quote...' : 'Get Quote'}
            </Button>

            {/* Quote Details */}
            {quote && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Rate:</span>
                  <span>
                    1 {fromToken?.symbol} = {(formatTokenAmount(quote.outAmount, toToken?.decimals || 6) / parseFloat(fromAmount)).toFixed(4)} {toToken?.symbol}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Price Impact:</span>
                  <span className={parseFloat(quote.priceImpactPct) > 1 ? 'text-red-600' : 'text-green-600'}>
                    {quote.priceImpactPct}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Route:</span>
                  <span>{quote.routePlan[0]?.swapInfo.label || 'Jupiter'}</span>
                </div>
              </div>
            )}

            {/* Swap Button */}
            {quote && (
              <Button
                onClick={handleSwap}
                disabled={swapping || !publicKey}
                className="w-full"
                size="lg"
              >
                {swapping ? 'Swapping...' : `Swap ${fromToken?.symbol} for ${toToken?.symbol}`}
              </Button>
            )}

            {!publicKey && (
              <div className="flex items-center space-x-2 text-amber-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Connect your wallet to swap tokens</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Token Information */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Popular Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {tokens.slice(0, 5).map(token => (
                  <div key={token.address} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      {token.logoURI && (
                        <img
                          src={token.logoURI}
                          alt={token.symbol}
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <div>
                        <div className="font-medium">{token.symbol}</div>
                        <div className="text-xs text-gray-500">{token.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">$0.00</div>
                      <div className="text-xs text-gray-500">Balance</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Swap Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Best price aggregation across multiple DEXs</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Low slippage and price impact</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>MEV protection for better execution</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Powered by Jupiter aggregator</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}