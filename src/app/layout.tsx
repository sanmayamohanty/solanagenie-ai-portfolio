import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Web3AuthProvider from '@/components/auth/Web3AuthProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SolanaGenie AI Portfolio',
  description: 'AI-powered Solana portfolio manager with Web3Auth integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3AuthProvider>
          {children}
        </Web3AuthProvider>
      </body>
    </html>
  )
}