'use client';

import { useAI } from '@/hooks/useAI';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Shield, 
  Target, 
  Lightbulb,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useEffect } from 'react';

export default function AIInsightsPage() {
  const {
    analysisLoading,
    analysisError,
    portfolioAnalysis,
    marketInsights,
    tradingRecommendations,
    analyzePortfolio,
    getMarketInsights,
    getTradingRecommendations,
    clearError,
  } = useAI();

  useEffect(() => {
    // Auto-load portfolio analysis on page load
    analyzePortfolio();
  }, [analyzePortfolio]);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'Bullish': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'Bearish': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Buy': return 'bg-green-100 text-green-800';
      case 'Sell': return 'bg-red-100 text-red-800';
      case 'Hold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'Medium': return <CheckCircle className="w-4 h-4 text-yellow-600" />;
      case 'Low': return <XCircle className="w-4 h-4 text-gray-600" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Portfolio Insights</h1>
          <p className="text-gray-600 mt-1">
            Get AI-powered analysis of your Solana portfolio and market opportunities
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={analyzePortfolio}
            disabled={analysisLoading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${analysisLoading ? 'animate-spin' : ''}`} />
            Refresh Analysis
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {analysisError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {analysisError}
            <Button
              variant="link"
              size="sm"
              className="p-0 h-auto ml-2"
              onClick={clearError}
            >
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          onClick={analyzePortfolio}
          disabled={analysisLoading}
          className="flex items-center space-x-2 h-12"
        >
          <Brain className="w-5 h-5" />
          <span>Analyze Portfolio</span>
        </Button>
        <Button
          onClick={getMarketInsights}
          disabled={analysisLoading}
          variant="outline"
          className="flex items-center space-x-2 h-12"
        >
          <Activity className="w-5 h-5" />
          <span>Market Insights</span>
        </Button>
        <Button
          onClick={getTradingRecommendations}
          disabled={analysisLoading}
          variant="outline"
          className="flex items-center space-x-2 h-12"
        >
          <Target className="w-5 h-5" />
          <span>Trading Ideas</span>
        </Button>
      </div>

      {/* Portfolio Analysis */}
      {portfolioAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Portfolio Risk Analysis</span>
            </CardTitle>
            <CardDescription>
              AI-powered assessment of your portfolio's risk and diversification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {portfolioAnalysis.riskScore}/100
                </div>
                <div className="text-sm text-gray-600">Risk Score</div>
                <Badge className={getRiskColor(portfolioAnalysis.riskLevel)}>
                  {portfolioAnalysis.riskLevel} Risk
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {portfolioAnalysis.diversificationScore}/100
                </div>
                <div className="text-sm text-gray-600">Diversification</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {portfolioAnalysis.recommendations.length}
                </div>
                <div className="text-sm text-gray-600">Recommendations</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-2">AI Summary</h4>
              <p className="text-gray-600">{portfolioAnalysis.summary}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Recommendations</h4>
              <div className="space-y-2">
                {portfolioAnalysis.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Lightbulb className="w-4 h-4 mt-0.5 text-yellow-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Market Insights */}
      {marketInsights && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Market Intelligence</span>
            </CardTitle>
            <CardDescription>
              AI analysis of Solana ecosystem trends and opportunities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getTrendIcon(marketInsights.trend)}
                <span className="font-semibold">{marketInsights.trend} Trend</span>
              </div>
              <div className="text-sm text-gray-600">
                {marketInsights.confidence}% confidence
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Market Insights</h4>
              <div className="space-y-2">
                {marketInsights.insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Activity className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{insight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Top Opportunities</h4>
              <div className="space-y-2">
                {marketInsights.topOpportunities.map((opportunity, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Target className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{opportunity}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trading Recommendations */}
      {tradingRecommendations && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Trading Recommendations</span>
            </CardTitle>
            <CardDescription>
              AI-generated trading suggestions based on your portfolio and market conditions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Strategy Overview</h4>
              <p className="text-gray-600">{tradingRecommendations.strategy}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Specific Recommendations</h4>
              <div className="space-y-3">
                {tradingRecommendations.recommendations.map((rec, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getPriorityIcon(rec.priority)}
                        <span className="font-medium">{rec.token}</span>
                        <Badge className={getActionColor(rec.action)}>
                          {rec.action}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {rec.priority} Priority
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{rec.reasoning}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {analysisLoading && !portfolioAnalysis && !marketInsights && !tradingRecommendations && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
              <p className="text-gray-600">AI is analyzing your portfolio...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!analysisLoading && !portfolioAnalysis && !marketInsights && !tradingRecommendations && !analysisError && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                AI Portfolio Analysis
              </h3>
              <p className="text-gray-600 mb-4">
                Get intelligent insights about your Solana portfolio performance and opportunities.
              </p>
              <Button onClick={analyzePortfolio}>
                Start Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}