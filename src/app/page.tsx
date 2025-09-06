import { Button } from "@/components/ui/button"
import LoginButton from "@/components/auth/LoginButton"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            SolanaGenie
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Portfolio
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            AI-powered Solana portfolio management with seamless Web3Auth integration. 
            Track, analyze, and optimize your crypto investments with advanced AI insights.
          </p>

          <div className="space-x-4">
            <LoginButton />
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-black">
              Learn More
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Social Login</h3>
              <p className="text-gray-300">
                Connect instantly with Google, Discord, or Twitter. No seed phrases required.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">AI Insights</h3>
              <p className="text-gray-300">
                Get personalized portfolio analysis and recommendations powered by Mistral AI.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Solana Native</h3>
              <p className="text-gray-300">
                Built for Solana with SNS domains, Solana Pay, and Jupiter DEX integration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}