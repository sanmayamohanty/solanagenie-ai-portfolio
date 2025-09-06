'use client';

import { useState, useCallback } from 'react';
import { usePortfolioStore } from '@/store/portfolio';

interface PortfolioAnalysis {
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  diversificationScore: number;
  recommendations: string[];
  summary: string;
}

interface MarketInsights {
  trend: 'Bullish' | 'Bearish' | 'Neutral';
  confidence: number;
  insights: string[];
  topOpportunities: string[];
}

interface TradingRecommendations {
  recommendations: Array<{
    action: 'Buy' | 'Sell' | 'Hold';
    token: string;
    reasoning: string;
    priority: 'High' | 'Medium' | 'Low';
  }>;
  strategy: string;
}

export function useAI() {
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [portfolioAnalysis, setPortfolioAnalysis] = useState<PortfolioAnalysis | null>(null);
  const [marketInsights, setMarketInsights] = useState<MarketInsights | null>(null);
  const [tradingRecommendations, setTradingRecommendations] = useState<TradingRecommendations | null>(null);
  
  const { balance, tokens } = usePortfolioStore();

  const analyzePortfolio = useCallback(async () => {
    setAnalysisLoading(true);
    setAnalysisError(null);

    try {
      const portfolioData = {
        balance,
        tokens: tokens.map(token => ({
          symbol: token.symbol || 'UNKNOWN',
          amount: token.amount || 0,
          value: (token.amount || 0) * (token.price || 0),
        })),
        totalValue: balance * 150 + tokens.reduce((total, token) => 
          total + (token.amount || 0) * (token.price || 0), 0
        ), // Rough SOL price estimation
      };

      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          portfolioData,
          analysisType: 'portfolio',
        }),
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const analysis: PortfolioAnalysis = await response.json();
      setPortfolioAnalysis(analysis);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Portfolio analysis failed';
      setAnalysisError(errorMessage);
      console.error('Portfolio analysis error:', error);
    } finally {
      setAnalysisLoading(false);
    }
  }, [balance, tokens]);

  const getMarketInsights = useCallback(async () => {
    setAnalysisLoading(true);
    setAnalysisError(null);

    try {
      // Mock market data - in a real app, this would come from a market data API
      const marketData = {
        prices: {
          SOL: 150,
          USDC: 1,
          RAY: 1.2,
          SRM: 0.8,
        },
        marketCap: {
          SOL: 65000000000,
          USDC: 25000000000,
          RAY: 180000000,
          SRM: 65000000,
        },
        volume24h: {
          SOL: 2500000000,
          USDC: 8000000000,
          RAY: 45000000,
          SRM: 12000000,
        },
      };

      const portfolioData = {
        balance,
        tokens: tokens.map(token => ({
          symbol: token.symbol || 'UNKNOWN',
          amount: token.amount || 0,
          value: (token.amount || 0) * (token.price || 0),
        })),
        totalValue: balance * 150 + tokens.reduce((total, token) => 
          total + (token.amount || 0) * (token.price || 0), 0
        ),
      };

      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          portfolioData,
          marketData,
          analysisType: 'market',
        }),
      });

      if (!response.ok) {
        throw new Error(`Market analysis failed: ${response.statusText}`);
      }

      const insights: MarketInsights = await response.json();
      setMarketInsights(insights);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Market analysis failed';
      setAnalysisError(errorMessage);
      console.error('Market analysis error:', error);
    } finally {
      setAnalysisLoading(false);
    }
  }, [balance, tokens]);

  const getTradingRecommendations = useCallback(async () => {
    setAnalysisLoading(true);
    setAnalysisError(null);

    try {
      // Mock market data
      const marketData = {
        prices: {
          SOL: 150,
          USDC: 1,
          RAY: 1.2,
          SRM: 0.8,
        },
        marketCap: {
          SOL: 65000000000,
          USDC: 25000000000,
          RAY: 180000000,
          SRM: 65000000,
        },
        volume24h: {
          SOL: 2500000000,
          USDC: 8000000000,
          RAY: 45000000,
          SRM: 12000000,
        },
      };

      const portfolioData = {
        balance,
        tokens: tokens.map(token => ({
          symbol: token.symbol || 'UNKNOWN',
          amount: token.amount || 0,
          value: (token.amount || 0) * (token.price || 0),
        })),
        totalValue: balance * 150 + tokens.reduce((total, token) => 
          total + (token.amount || 0) * (token.price || 0), 0
        ),
      };

      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          portfolioData,
          marketData,
          analysisType: 'trading',
        }),
      });

      if (!response.ok) {
        throw new Error(`Trading analysis failed: ${response.statusText}`);
      }

      const recommendations: TradingRecommendations = await response.json();
      setTradingRecommendations(recommendations);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Trading analysis failed';
      setAnalysisError(errorMessage);
      console.error('Trading analysis error:', error);
    } finally {
      setAnalysisLoading(false);
    }
  }, [balance, tokens]);

  return {
    // State
    analysisLoading,
    analysisError,
    portfolioAnalysis,
    marketInsights,
    tradingRecommendations,
    
    // Actions
    analyzePortfolio,
    getMarketInsights,
    getTradingRecommendations,
    
    // Utility
    clearError: () => setAnalysisError(null),
  };
}