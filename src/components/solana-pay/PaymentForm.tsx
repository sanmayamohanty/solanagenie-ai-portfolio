'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createPaymentURL, generateQRCode, PaymentRequest } from '@/lib/solana-pay';
import { PublicKey } from '@solana/web3.js';
import { useAuthStore } from '@/store/auth';

interface PaymentFormProps {
  onPaymentCreated: (qrCode: string, paymentURL: URL) => void;
}

export default function PaymentForm({ onPaymentCreated }: PaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    memo: '',
    label: process.env.NEXT_PUBLIC_SOLANA_PAY_LABEL || 'SolanaGenie Payment',
    message: process.env.NEXT_PUBLIC_SOLANA_PAY_MESSAGE || 'Payment Request',
  });
  const { publicKey } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate recipient address
      new PublicKey(formData.recipient);
      
      const paymentRequest: PaymentRequest = {
        recipient: formData.recipient,
        amount: parseFloat(formData.amount),
        memo: formData.memo || undefined,
        label: formData.label,
        message: formData.message,
      };

      const paymentURL = createPaymentURL(paymentRequest);
      const qrCode = await generateQRCode(paymentURL);
      
      onPaymentCreated(qrCode, paymentURL);
    } catch (error) {
      console.error('Error creating payment:', error);
      alert('Error creating payment request. Please check the recipient address.');
    } finally {
      setLoading(false);
    }
  };

  const useMyWallet = () => {
    if (publicKey) {
      setFormData(prev => ({ ...prev, recipient: publicKey }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Payment Request</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="recipient">Recipient Address *</Label>
          <div className="flex gap-2 mt-1">
            <Input
              id="recipient"
              placeholder="Solana wallet address..."
              value={formData.recipient}
              onChange={(e) => setFormData(prev => ({ ...prev, recipient: e.target.value }))}
              required
              className="font-mono text-sm"
            />
            <Button
              type="button"
              variant="outline"
              onClick={useMyWallet}
              disabled={!publicKey}
            >
              Use Mine
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="amount">Amount (SOL) *</Label>
          <Input
            id="amount"
            type="number"
            step="0.0001"
            min="0"
            placeholder="0.0000"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
            required
          />
        </div>

        <div>
          <Label htmlFor="label">Label</Label>
          <Input
            id="label"
            placeholder="Payment description"
            value={formData.label}
            onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="message">Message</Label>
          <Input
            id="message"
            placeholder="Payment message"
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="memo">Memo (Optional)</Label>
          <Input
            id="memo"
            placeholder="Transaction memo"
            value={formData.memo}
            onChange={(e) => setFormData(prev => ({ ...prev, memo: e.target.value }))}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Creating Payment...' : 'Generate QR Code'}
        </Button>
      </form>
    </div>
  );
}