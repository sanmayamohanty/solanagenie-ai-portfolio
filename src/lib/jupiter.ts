const JUPITER_API_URL = process.env.NEXT_PUBLIC_JUPITER_API_URL!;
const JUPITER_TOKEN_LIST_URL = process.env.NEXT_PUBLIC_JUPITER_TOKEN_LIST_URL!;

export interface Token {
  address: string;
  chainId: number;
  decimals: number;
  name: string;
  symbol: string;
  logoURI?: string;
  tags?: string[];
}

export interface Quote {
  inputMint: string;
  inAmount: string;
  outputMint: string;
  outAmount: string;
  otherAmountThreshold: string;
  swapMode: string;
  slippageBps: number;
  platformFee?: any;
  priceImpactPct: string;
  routePlan: RouteInfo[];
}

export interface RouteInfo {
  swapInfo: {
    ammKey: string;
    label: string;
    inputMint: string;
    outputMint: string;
    inAmount: string;
    outAmount: string;
    feeAmount: string;
    feeMint: string;
  };
  percent: number;
}

// Popular Solana tokens for demo
const POPULAR_TOKENS: Token[] = [
  {
    address: "So11111111111111111111111111111111111111112",
    chainId: 101,
    decimals: 9,
    name: "Wrapped SOL",
    symbol: "SOL",
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
  },
  {
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    chainId: 101,
    decimals: 6,
    name: "USD Coin",
    symbol: "USDC",
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
  },
  {
    address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    chainId: 101,
    decimals: 6,
    name: "Tether USD",
    symbol: "USDT",
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.png"
  },
  {
    address: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
    chainId: 101,
    decimals: 9,
    name: "Marinade staked SOL",
    symbol: "mSOL",
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png"
  },
  {
    address: "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
    chainId: 101,
    decimals: 9,
    name: "Lido Staked SOL",
    symbol: "stSOL",
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj/logo.png"
  },
];

export const getTokenList = async (): Promise<Token[]> => {
  try {
    // For demo purposes, return popular tokens
    // In production, you would fetch from Jupiter token list API
    return POPULAR_TOKENS;
  } catch (error) {
    console.error('Error fetching token list:', error);
    return POPULAR_TOKENS;
  }
};

export const getQuote = async (
  inputMint: string,
  outputMint: string,
  amount: string,
  slippageBps: number = 50
): Promise<Quote> => {
  try {
    // For demo purposes, simulate a quote response
    // In production, you would call the Jupiter API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const inputAmount = parseFloat(amount);
    const outputAmount = inputAmount * (0.95 + Math.random() * 0.1); // Simulate exchange rate
    
    const mockQuote: Quote = {
      inputMint,
      inAmount: (inputAmount * Math.pow(10, 9)).toString(), // Convert to lamports
      outputMint,
      outAmount: (outputAmount * Math.pow(10, 6)).toString(), // Convert to token units
      otherAmountThreshold: (outputAmount * 0.995 * Math.pow(10, 6)).toString(),
      swapMode: "ExactIn",
      slippageBps,
      priceImpactPct: (Math.random() * 0.5).toFixed(4),
      routePlan: [
        {
          swapInfo: {
            ammKey: "58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2",
            label: "Orca",
            inputMint,
            outputMint,
            inAmount: (inputAmount * Math.pow(10, 9)).toString(),
            outAmount: (outputAmount * Math.pow(10, 6)).toString(),
            feeAmount: (inputAmount * 0.003 * Math.pow(10, 9)).toString(),
            feeMint: inputMint,
          },
          percent: 100,
        },
      ],
    };
    
    return mockQuote;
  } catch (error) {
    console.error('Error getting quote:', error);
    throw new Error('Failed to get swap quote');
  }
};

export const formatTokenAmount = (amount: string, decimals: number): number => {
  return parseFloat(amount) / Math.pow(10, decimals);
};

export const parseTokenAmount = (amount: number, decimals: number): string => {
  return (amount * Math.pow(10, decimals)).toString();
};

export const calculatePriceImpact = (quote: Quote): number => {
  return parseFloat(quote.priceImpactPct);
};

export const calculateMinimumReceived = (quote: Quote, slippageBps: number): number => {
  const outputAmount = parseFloat(quote.outAmount);
  const slippage = slippageBps / 10000;
  return outputAmount * (1 - slippage);
};