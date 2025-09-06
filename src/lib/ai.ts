import { rateLimit } from './utils';

// Rate limiter for Mistral API calls (10 requests per minute)
const mistralRateLimit = rateLimit(10, 60 * 1000);

interface MistralMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface MistralResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
  }>;
}

interface PortfolioData {
  balance: number;
  tokens: Array<{
    symbol: string;
    amount: number;
    value: number;
  }>;
  totalValue: number;
}

interface MarketData {
  prices: Record<string, number>;
  marketCap: Record<string, number>;
  volume24h: Record<string, number>;
}

class MistralAI {
  private apiKey: string;
  private apiUrl: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.MISTRAL_API_KEY!;
    this.apiUrl = process.env.MISTRAL_API_URL!;
    this.model = process.env.NEXT_PUBLIC_MISTRAL_MODEL || 'mistral-large-latest';

    if (!this.apiKey) {
      throw new Error('MISTRAL_API_KEY environment variable is not set');
    }
  }

  private async makeRequest(messages: MistralMessage[]): Promise<string> {
    try {
      // Apply rate limiting
      await mistralRateLimit();

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Mistral API error: ${response.status} - ${errorText}`);
      }

      const data: MistralResponse = await response.json();
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from Mistral API');
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error('Mistral API request failed:', error);
      throw new Error(`AI analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async analyzePortfolio(portfolioData: PortfolioData): Promise<{
    riskScore: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    diversificationScore: number;
    recommendations: string[];
    summary: string;
  }> {
    const messages: MistralMessage[] = [
      {
        role: 'system',
        content: `You are a professional Solana DeFi portfolio analyst. Analyze the provided portfolio data and provide:
1. Risk score (0-100, where 100 is highest risk)
2. Risk level (Low/Medium/High)
3. Diversification score (0-100, where 100 is perfectly diversified)
4. 3-5 specific recommendations
5. A brief summary

Focus on Solana ecosystem tokens and DeFi best practices. Be concise and actionable.

Respond in this exact JSON format:
{
  "riskScore": number,
  "riskLevel": "Low" | "Medium" | "High", 
  "diversificationScore": number,
  "recommendations": ["recommendation1", "recommendation2", ...],
  "summary": "brief analysis summary"
}`
      },
      {
        role: 'user',
        content: `Analyze this Solana portfolio:
- SOL Balance: ${portfolioData.balance} SOL
- Total Portfolio Value: $${portfolioData.totalValue.toFixed(2)}
- Tokens: ${portfolioData.tokens.map(t => `${t.symbol}: ${t.amount} ($${t.value.toFixed(2)})`).join(', ') || 'None'}
- Token Count: ${portfolioData.tokens.length}`
      }
    ];

    try {
      const response = await this.makeRequest(messages);
      const analysis = JSON.parse(response);
      
      // Validate response structure
      if (typeof analysis.riskScore !== 'number' || 
          !['Low', 'Medium', 'High'].includes(analysis.riskLevel) ||
          typeof analysis.diversificationScore !== 'number' ||
          !Array.isArray(analysis.recommendations) ||
          typeof analysis.summary !== 'string') {
        throw new Error('Invalid response format from AI');
      }

      return analysis;
    } catch (error) {
      console.error('Portfolio analysis failed:', error);
      // Return fallback analysis
      return {
        riskScore: portfolioData.tokens.length === 0 ? 100 : 
                  portfolioData.tokens.length < 3 ? 70 : 40,
        riskLevel: portfolioData.tokens.length === 0 ? 'High' : 
                  portfolioData.tokens.length < 3 ? 'Medium' : 'Low',
        diversificationScore: Math.min(portfolioData.tokens.length * 20, 100),
        recommendations: [
          'Consider diversifying across different Solana projects',
          'Add stablecoins like USDC for risk management',
          'Research top Solana DeFi protocols for yield opportunities'
        ],
        summary: 'Portfolio analysis temporarily unavailable. Consider diversifying your holdings.'
      };
    }
  }

  async getMarketInsights(marketData: MarketData): Promise<{
    trend: 'Bullish' | 'Bearish' | 'Neutral';
    confidence: number;
    insights: string[];
    topOpportunities: string[];
  }> {
    const messages: MistralMessage[] = [
      {
        role: 'system',
        content: `You are a Solana ecosystem market analyst. Analyze market data and provide:
1. Overall trend (Bullish/Bearish/Neutral)
2. Confidence level (0-100)
3. 3-5 market insights
4. Top 3 opportunities in Solana ecosystem

Focus on actionable insights for Solana investors.

Respond in this exact JSON format:
{
  "trend": "Bullish" | "Bearish" | "Neutral",
  "confidence": number,
  "insights": ["insight1", "insight2", ...],
  "topOpportunities": ["opportunity1", "opportunity2", "opportunity3"]
}`
      },
      {
        role: 'user',
        content: `Analyze this Solana market data:
- Token Prices: ${Object.entries(marketData.prices).map(([symbol, price]) => `${symbol}: $${price}`).join(', ')}
- Market Caps: ${Object.entries(marketData.marketCap).map(([symbol, cap]) => `${symbol}: $${cap.toLocaleString()}`).join(', ')}
- 24h Volumes: ${Object.entries(marketData.volume24h).map(([symbol, vol]) => `${symbol}: $${vol.toLocaleString()}`).join(', ')}`
      }
    ];

    try {
      const response = await this.makeRequest(messages);
      const insights = JSON.parse(response);
      
      // Validate response structure
      if (!['Bullish', 'Bearish', 'Neutral'].includes(insights.trend) ||
          typeof insights.confidence !== 'number' ||
          !Array.isArray(insights.insights) ||
          !Array.isArray(insights.topOpportunities)) {
        throw new Error('Invalid response format from AI');
      }

      return insights;
    } catch (error) {
      console.error('Market insights failed:', error);
      // Return fallback insights
      return {
        trend: 'Neutral',
        confidence: 50,
        insights: [
          'Market analysis temporarily unavailable',
          'Consider dollar-cost averaging for long-term positions',
          'Monitor Solana network developments'
        ],
        topOpportunities: [
          'Research high-TVL Solana DeFi protocols',
          'Consider liquid staking options',
          'Explore NFT opportunities on Solana'
        ]
      };
    }
  }

  async generateTradingRecommendations(portfolioData: PortfolioData, marketData: MarketData): Promise<{
    recommendations: Array<{
      action: 'Buy' | 'Sell' | 'Hold';
      token: string;
      reasoning: string;
      priority: 'High' | 'Medium' | 'Low';
    }>;
    strategy: string;
  }> {
    const messages: MistralMessage[] = [
      {
        role: 'system',
        content: `You are a Solana DeFi trading advisor. Based on portfolio and market data, provide:
1. 3-5 trading recommendations with actions (Buy/Sell/Hold)
2. Overall trading strategy

Consider risk management, diversification, and Solana ecosystem trends.

Respond in this exact JSON format:
{
  "recommendations": [
    {
      "action": "Buy" | "Sell" | "Hold",
      "token": "token_symbol",
      "reasoning": "explanation",
      "priority": "High" | "Medium" | "Low"
    }
  ],
  "strategy": "overall strategy description"
}`
      },
      {
        role: 'user',
        content: `Provide trading recommendations for this portfolio:
Portfolio: SOL: ${portfolioData.balance}, Tokens: ${portfolioData.tokens.map(t => `${t.symbol}: ${t.amount}`).join(', ')}
Market: ${Object.entries(marketData.prices).map(([symbol, price]) => `${symbol}: $${price}`).join(', ')}`
      }
    ];

    try {
      const response = await this.makeRequest(messages);
      const recommendations = JSON.parse(response);
      
      // Validate response structure
      if (!Array.isArray(recommendations.recommendations) ||
          typeof recommendations.strategy !== 'string') {
        throw new Error('Invalid response format from AI');
      }

      return recommendations;
    } catch (error) {
      console.error('Trading recommendations failed:', error);
      // Return fallback recommendations
      return {
        recommendations: [
          {
            action: 'Hold',
            token: 'SOL',
            reasoning: 'Maintain SOL position as network utility token',
            priority: 'Medium'
          }
        ],
        strategy: 'Trading recommendations temporarily unavailable. Consider holding current positions and researching Solana ecosystem developments.'
      };
    }
  }
}

// Export singleton instance
export const mistralAI = new MistralAI();

// Export types for use in components
export type { PortfolioData, MarketData };