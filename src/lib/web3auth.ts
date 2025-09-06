import { Web3Auth } from "@web3auth/modal";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import { WEB3AUTH_NETWORK, CHAIN_NAMESPACES } from "@web3auth/base";

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!;

console.log('Web3Auth Environment Check:');
console.log('NEXT_PUBLIC_WEB3AUTH_CLIENT_ID:', process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID);
console.log('clientId:', clientId);

if (!clientId) {
  console.error('CRITICAL ERROR: Web3Auth Client ID is not set!');
  console.error('Please check your .env.local file');
}

// Solana chain configuration
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.SOLANA,
  chainId: "0x3", // Solana Devnet
  rpcTarget: process.env.NEXT_PUBLIC_SOLANA_RPC_URL!,
  displayName: "Solana Devnet",
  blockExplorerUrl: "https://explorer.solana.com/?cluster=devnet",
  ticker: "SOL",
  tickerName: "Solana",
};

// Solana private key provider
const privateKeyProvider = new SolanaPrivateKeyProvider({
  config: { chainConfig },
});

// Initialize Web3Auth
export const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider: privateKeyProvider as any,
  uiConfig: {
    appName: "SolanaGenie AI Portfolio",
    appUrl: "http://localhost:3000", 
    mode: "dark",
    logoLight: "https://web3auth.io/images/web3authlog.png",
    logoDark: "https://web3auth.io/images/web3authlogodark.png",
    defaultLanguage: "en",
    loginMethodsOrder: ["google", "discord", "twitter", "email_passwordless"],
    modalZIndex: "99999",
    uxMode: "redirect", // Use redirect instead of popup to avoid CORS issues
    theme: {
      primary: "#8b5cf6",
    },
  },
  enableLogging: true,
});

// Web3Auth Modal has built-in social login adapters

export default web3auth;