import { NextRequest, NextResponse } from 'next/server';
import { mistralAI } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { portfolioData, marketData, analysisType } = body;

    if (!portfolioData) {
      return NextResponse.json(
        { error: 'Portfolio data is required' },
        { status: 400 }
      );
    }

    let result;

    switch (analysisType) {
      case 'portfolio':
        result = await mistralAI.analyzePortfolio(portfolioData);
        break;
      
      case 'market':
        if (!marketData) {
          return NextResponse.json(
            { error: 'Market data is required for market analysis' },
            { status: 400 }
          );
        }
        result = await mistralAI.getMarketInsights(marketData);
        break;
      
      case 'trading':
        if (!marketData) {
          return NextResponse.json(
            { error: 'Market data is required for trading recommendations' },
            { status: 400 }
          );
        }
        result = await mistralAI.generateTradingRecommendations(portfolioData, marketData);
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid analysis type. Must be one of: portfolio, market, trading' },
          { status: 400 }
        );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('AI analysis error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'AI analysis failed',
        fallback: true
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Analysis API',
    endpoints: {
      POST: '/api/ai/analyze',
      parameters: {
        portfolioData: 'Required - Portfolio data object',
        marketData: 'Optional - Market data object (required for market/trading analysis)',
        analysisType: 'Required - One of: portfolio, market, trading'
      }
    }
  });
}