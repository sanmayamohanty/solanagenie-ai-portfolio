'use client';

import { useState } from 'react';
import PaymentForm from '@/components/solana-pay/PaymentForm';
import PaymentDisplay from '@/components/solana-pay/PaymentDisplay';
import { CreditCard } from 'lucide-react';

export default function SolanaPayPage() {
  const [currentPayment, setCurrentPayment] = useState<{
    qrCode: string;
    paymentURL: URL;
  } | null>(null);

  const handlePaymentCreated = (qrCode: string, paymentURL: URL) => {
    setCurrentPayment({ qrCode, paymentURL });
  };

  const handleReset = () => {
    setCurrentPayment(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <CreditCard className="w-8 h-8 text-green-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Solana Pay</h1>
          <p className="text-gray-600">Create payment requests with QR codes</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">How it works</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Create a payment request with recipient and amount</li>
          <li>• Generate a QR code that can be scanned by Solana wallets</li>
          <li>• Share the payment URL or QR code with the payer</li>
          <li>• The payer scans and confirms the transaction in their wallet</li>
        </ul>
      </div>

      {/* Main Content */}
      {currentPayment ? (
        <PaymentDisplay
          qrCode={currentPayment.qrCode}
          paymentURL={currentPayment.paymentURL}
          onReset={handleReset}
        />
      ) : (
        <PaymentForm onPaymentCreated={handlePaymentCreated} />
      )}

      {/* Sample QR Codes Info */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Compatible Wallets</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Phantom Wallet</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Solflare Wallet</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Backpack Wallet</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          QR codes work with any Solana Pay compatible wallet. Recipients can scan to pay instantly.
        </p>
      </div>
    </div>
  );
}