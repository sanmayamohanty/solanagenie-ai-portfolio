import { create } from 'zustand';
import { Web3Auth } from "@web3auth/modal";
import { IProvider, UserInfo as Web3AuthUserInfo } from "@web3auth/base";

interface UserInfo extends Partial<Web3AuthUserInfo> {
  email?: string;
  name?: string;
  profileImage?: string;
  aggregateVerifier?: string;
  verifier?: string;
  verifierId?: string;
  typeOfLogin?: string;
}

interface AuthState {
  web3auth: Web3Auth | null;
  provider: IProvider | null;
  isConnected: boolean;
  user: UserInfo | null;
  publicKey: string | null;
  setWeb3Auth: (web3auth: Web3Auth) => void;
  setProvider: (provider: IProvider | null) => void;
  setIsConnected: (connected: boolean) => void;
  setUser: (user: UserInfo | null) => void;
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