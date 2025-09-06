import { Web3Auth } from "@web3auth/modal";
import { WEB3AUTH_NETWORK } from "@web3auth/base";

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!;

export const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  uiConfig: {
    appName: "SolanaGenie AI Portfolio",
    appUrl: "http://localhost:3000",
    mode: "dark",
    logoLight: "https://web3auth.io/images/web3authlog.png",
    logoDark: "https://web3auth.io/images/web3authlogodark.png",
    defaultLanguage: "en",
    loginMethodsOrder: ["google", "discord", "twitter", "email_passwordless"],
    theme: {
      primary: "#8b5cf6", // purple-500
    },
  },
} as any); // Temporary type bypass for development

export default web3auth;