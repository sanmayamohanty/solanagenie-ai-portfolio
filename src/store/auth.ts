import { create } from 'zustand';
import { Web3Auth } from "@web3auth/modal";

interface AuthState {
  web3auth: Web3Auth | null;
  provider: any;
  isConnected: boolean;
  user: any;
  publicKey: string | null;
  setWeb3Auth: (web3auth: Web3Auth) => void;
  setProvider: (provider: any) => void;
  setIsConnected: (connected: boolean) => void;
  setUser: (user: any) => void;
  setPublicKey: (publicKey: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  web3auth: null,
  provider: null,
  isConnected: false,
  user: null,
  publicKey: null,
  setWeb3Auth: (web3auth) => set({ web3auth }),
  setProvider: (provider) => set({ provider }),
  setIsConnected: (isConnected) => set({ isConnected }),
  setUser: (user) => set({ user }),
  setPublicKey: (publicKey) => set({ publicKey }),
  logout: () => set({ 
    provider: null, 
    isConnected: false, 
    user: null, 
    publicKey: null 
  }),
}));