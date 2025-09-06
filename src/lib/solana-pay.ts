import { parseURL } from '@solana/pay';
import { PublicKey } from '@solana/web3.js';
import QRCode from 'qrcode';

export interface PaymentRequest {
  recipient: string;
  amount: number;
  memo?: string;
  label?: string;
  message?: string;
}

export const createPaymentURL = (request: PaymentRequest): URL => {
  const { recipient, amount, memo, label, message } = request;
  
  const url = new URL('solana:' + recipient);
  
  if (amount) {
    url.searchParams.set('amount', amount.toString());
  }
  
  if (memo) {
    url.searchParams.set('memo', memo);
  }
  
  if (label) {
    url.searchParams.set('label', label);
  }
  
  if (message) {
    url.searchParams.set('message', message);
  }
  
  return url;
};

export const generateQRCode = async (paymentURL: URL): Promise<string> => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(paymentURL.toString(), {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

export const validatePaymentURL = (url: string): boolean => {
  try {
    const parsedURL = parseURL(url);
    // Basic validation - check if parsedURL is valid
    if ('recipient' in parsedURL && parsedURL.recipient) {
      new PublicKey(parsedURL.recipient);
    }
    return true;
  } catch (error) {
    console.error('Invalid payment URL:', error);
    return false;
  }
};

export const formatSolAmount = (amount: number): string => {
  return `${amount.toFixed(4)} SOL`;
};