'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth';
import web3auth from '@/lib/web3auth';

export default function Web3AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setWeb3Auth, setProvider, setIsConnected, setUser, setPublicKey } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        console.log('Web3AuthProvider: Starting initialization...');
        console.log('Web3Auth instance:', web3auth);
        console.log('Web3Auth clientId:', web3auth.clientId);
        
        if (!web3auth) {
          throw new Error('Web3Auth instance not available');
        }

        console.log('Web3AuthProvider: Calling init...');
        console.log('Web3Auth config:', {
          clientId: web3auth.clientId,
          web3AuthNetwork: web3auth.web3AuthNetwork,
          chainNamespace: web3auth.chainNamespace
        });
        
        try {
          console.log('Web3AuthProvider: Trying initModal first...');
          if (typeof web3auth.initModal === 'function') {
            await web3auth.initModal();
            console.log('Web3AuthProvider: initModal succeeded');
          } else {
            console.log('Web3AuthProvider: initModal not available, using init...');
            await web3auth.init();
          }
        } catch (initError) {
          console.warn('Web3AuthProvider: initModal failed, falling back to init:', initError);
          await web3auth.init();
        }
        
        console.log('Web3AuthProvider: Initialization completed, checking status...');
        console.log('Web3AuthProvider: Current status:', web3auth.status);
        
        // Wait for readiness with more patience
        let retries = 0;
        const maxRetries = 30;
        while ((!web3auth.status || web3auth.status === 'not_ready') && retries < maxRetries) {
          console.log(`Web3AuthProvider: Waiting for ready status, attempt ${retries + 1}/${maxRetries}, current: ${web3auth.status}`);
          await new Promise(resolve => setTimeout(resolve, 100));
          retries++;
        }
        
        console.log(`Web3AuthProvider: Final status after ${retries} attempts: ${web3auth.status}`);
        
        console.log('Web3AuthProvider: init completed successfully');
        console.log('Web3Auth status after init:', {
          connected: web3auth.connected,
          provider: !!web3auth.provider,
          status: web3auth.status,
          ready: web3auth.status === 'ready'
        });

        setWeb3Auth(web3auth);
        setIsInitialized(true);
        console.log('Web3AuthProvider: Initialization complete, proceeding regardless of status');

        // Check if user is already connected (handles redirect callback)
        if (web3auth.connected && web3auth.provider) {
          console.log('Web3AuthProvider: User already connected, restoring session...');
          setProvider(web3auth.provider);
          setIsConnected(true);
          
          try {
            const user = await web3auth.getUserInfo();
            console.log('Web3AuthProvider: Retrieved user info:', user);
            setUser(user);
            
            // Redirect to dashboard after successful authentication
            console.log('Web3AuthProvider: Authentication successful, redirecting to dashboard...');
            window.location.href = '/dashboard';
            return; // Exit early since we're redirecting
          } catch (userError) {
            console.error('Web3AuthProvider: Error getting user info:', userError);
          }

          // Get user's public key
          try {
            const accounts = await web3auth.provider.request({
              method: "getAccounts",
            });
            console.log('Web3AuthProvider: Retrieved accounts:', accounts);
            if (Array.isArray(accounts) && accounts.length > 0) {
              setPublicKey(accounts[0] as string);
              console.log('Web3AuthProvider: Set public key:', accounts[0]);
            }
          } catch (accountError) {
            console.error('Web3AuthProvider: Error getting accounts:', accountError);
          }
          
          // Redirect to dashboard after setting up account
          console.log('Web3AuthProvider: Account setup complete, redirecting to dashboard...');
          window.location.href = '/dashboard';
        } else {
          console.log('Web3AuthProvider: User not connected, ready for login');
        }
      } catch (error) {
        console.error('Web3AuthProvider: Initialization failed:', error);
        setInitError(error instanceof Error ? error.message : 'Unknown initialization error');
        setIsInitialized(true); // Still allow the app to render
      }
    };

    init();
  }, []);

  // Show loading state until Web3Auth is initialized
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Initializing Web3Auth...</div>
          {initError && (
            <div className="text-red-400 text-sm max-w-md">
              Error: {initError}
            </div>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}