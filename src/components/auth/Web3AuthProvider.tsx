'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import web3auth from '@/lib/web3auth';

export default function Web3AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setWeb3Auth, setProvider, setIsConnected, setUser, setPublicKey } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.init();
        setWeb3Auth(web3auth);

        if (web3auth.connected) {
          setProvider(web3auth.provider);
          setIsConnected(true);
          
          const user = await web3auth.getUserInfo();
          setUser(user as any);

          // Get user's public key
          if (web3auth.provider) {
            const accounts = await web3auth.provider.request({
              method: "getAccounts",
            });
            if (Array.isArray(accounts) && accounts.length > 0) {
              setPublicKey(accounts[0] as string);
            }
          }
        }
      } catch (error) {
        console.error('Web3Auth initialization error:', error);
      }
    };

    init();
  }, [setWeb3Auth, setProvider, setIsConnected, setUser, setPublicKey]);

  return <>{children}</>;
}