'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, Download } from 'lucide-react';
import { formatSolAmount } from '@/lib/solana-pay';

interface PaymentDisplayProps {
  qrCode: string;
  paymentURL: URL;
  onReset: () => void;
}

export default function PaymentDisplay({ qrCode, paymentURL, onReset }: PaymentDisplayProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentURL.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.download = 'solana-payment-qr.png';
    link.href = qrCode;
    link.click();
  };

  const openInWallet = () => {
    window.open(paymentURL.toString(), '_blank');
  };

  // Parse payment details from URL
  const amount = paymentURL.searchParams.get('amount');
  const label = paymentURL.searchParams.get('label');
  const message = paymentURL.searchParams.get('message');
  const memo = paymentURL.searchParams.get('memo');
  const recipient = paymentURL.pathname.replace('solana:', '');

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Request Created</h3>
        <p className="text-sm text-gray-500">Scan QR code or share the payment link</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Code */}
        <div className="text-center">
          <div className="bg-gray-50 p-4 rounded-lg inline-block">
            <img 
              src={qrCode} 
              alt="Payment QR Code" 
              className="max-w-full h-auto"
              style={{ maxWidth: '300px' }}
            />
          </div>
          <div className="flex justify-center space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={downloadQR}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={openInWallet}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in Wallet
            </Button>
          </div>
        </div>

        {/* Payment Details */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Payment Details</h4>
          
          <div className="space-y-3">
            {amount && (
              <div>
                <label className="text-sm font-medium text-gray-600">Amount</label>
                <p className="text-lg font-semibold text-green-600">
                  {formatSolAmount(parseFloat(amount))}
                </p>
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium text-gray-600">Recipient</label>
              <p className="font-mono text-xs text-gray-800 break-all">
                {recipient}
              </p>
            </div>

            {label && (
              <div>
                <label className="text-sm font-medium text-gray-600">Label</label>
                <p className="text-sm text-gray-800">{label}</p>
              </div>
            )}

            {message && (
              <div>
                <label className="text-sm font-medium text-gray-600">Message</label>
                <p className="text-sm text-gray-800">{message}</p>
              </div>
            )}

            {memo && (
              <div>
                <label className="text-sm font-medium text-gray-600">Memo</label>
                <p className="text-sm text-gray-800">{memo}</p>
              </div>
            )}
          </div>

          {/* Payment URL */}
          <div>
            <label className="text-sm font-medium text-gray-600">Payment URL</label>
            <div className="flex items-center space-x-2 mt-1">
              <input
                type="text"
                value={paymentURL.toString()}
                readOnly
                className="flex-1 text-xs font-mono bg-gray-50 border border-gray-200 rounded px-2 py-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
              >
                <Copy className="w-3 h-3" />
                {copied ? 'Copied!' : ''}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Button
          variant="outline"
          onClick={onReset}
        >
          Create New Payment
        </Button>
      </div>
    </div>
  );
}