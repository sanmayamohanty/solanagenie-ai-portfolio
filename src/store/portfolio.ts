import { create } from 'zustand';

interface PortfolioState {
  balance: number;
  tokens: any[];
  loading: boolean;
  error: string | null;
  setBalance: (balance: number) => void;
  setTokens: (tokens: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  balance: 0,
  tokens: [],
  loading: false,
  error: null,
  setBalance: (balance) => set({ balance }),
  setTokens: (tokens) => set({ tokens }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));