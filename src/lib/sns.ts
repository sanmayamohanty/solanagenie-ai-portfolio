import { Connection, PublicKey } from '@solana/web3.js';
import { connection } from './solana';

const SNS_REGISTRY_PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_SNS_PROGRAM_ID!);

export interface SNSDomain {
  name: string;
  owner?: string;
  available: boolean;
  price?: number;
}

export const searchDomain = async (domain: string): Promise<SNSDomain> => {
  try {
    // Remove .sol if present
    const cleanDomain = domain.replace('.sol', '');
    
    // For demo purposes, simulate domain availability check
    // In a real implementation, you would query the SNS registry
    const isAvailable = Math.random() > 0.3; // 70% chance domain is taken
    
    return {
      name: cleanDomain,
      available: isAvailable,
      owner: isAvailable ? undefined : generateRandomOwner(),
      price: isAvailable ? Math.floor(Math.random() * 50) + 10 : undefined,
    };
  } catch (error) {
    console.error('Error searching domain:', error);
    throw new Error('Failed to search domain');
  }
};

export const resolveDomain = async (domain: string): Promise<string | null> => {
  try {
    // For demo purposes, return a mock address if domain is "taken"
    const cleanDomain = domain.replace('.sol', '');
    const domainInfo = await searchDomain(cleanDomain);
    
    return domainInfo.available ? null : domainInfo.owner || null;
  } catch (error) {
    console.error('Error resolving domain:', error);
    return null;
  }
};

export const reverseResolveDomain = async (address: string): Promise<string | null> => {
  try {
    // For demo purposes, simulate reverse resolution
    // In reality, you would query the SNS registry
    const domains = ['alice', 'bob', 'charlie', 'dao', 'defi'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    
    return Math.random() > 0.7 ? `${randomDomain}.sol` : null;
  } catch (error) {
    console.error('Error reverse resolving domain:', error);
    return null;
  }
};

export const validateDomainName = (domain: string): boolean => {
  // Remove .sol suffix if present
  const cleanDomain = domain.replace('.sol', '');
  
  // Check length (3-63 characters)
  if (cleanDomain.length < 3 || cleanDomain.length > 63) {
    return false;
  }
  
  // Check characters (lowercase letters, numbers, hyphens)
  const validPattern = /^[a-z0-9-]+$/;
  if (!validPattern.test(cleanDomain)) {
    return false;
  }
  
  // Cannot start or end with hyphen
  if (cleanDomain.startsWith('-') || cleanDomain.endsWith('-')) {
    return false;
  }
  
  return true;
};

export const getDomainPrice = (domain: string): number => {
  const length = domain.replace('.sol', '').length;
  
  if (length <= 3) return 750; // Premium short domains
  if (length === 4) return 160;
  if (length === 5) return 100;
  if (length <= 10) return 25;
  return 20; // Long domains
};

export const formatDomain = (domain: string): string => {
  return domain.endsWith('.sol') ? domain : `${domain}.sol`;
};

export const getSuggestedDomains = (baseDomain: string): string[] => {
  const clean = baseDomain.replace('.sol', '');
  const suggestions = [
    `${clean}1`,
    `${clean}2`,
    `${clean}sol`,
    `${clean}dao`,
    `${clean}defi`,
    `my${clean}`,
    `${clean}nft`,
    `${clean}web3`,
  ];
  
  return suggestions.slice(0, 4);
};

// Helper function to generate mock owner addresses
function generateRandomOwner(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let result = '';
  for (let i = 0; i < 44; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}