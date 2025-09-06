# 🚀 SolanaGenie AI Portfolio

> **AI-Powered Solana Portfolio Manager with Web3Auth Integration**

A comprehensive, production-ready Solana portfolio management application featuring AI-powered insights, social authentication, and seamless Web3 integration. Built for the Web3Auth hackathon with full SNS and Solana Pay implementations.

## 🌟 Key Features

### 🔐 **Seamless Authentication**
- **Web3Auth Integration**: Social login with Google, Discord, Twitter, and Email
- **Seedless Wallets**: Automatic wallet creation without seed phrases
- **Multi-Provider Support**: Flexible authentication options
- **Session Management**: Secure session handling with NextAuth.js

### 💰 **Portfolio Management**
- **Real-time Balance Tracking**: Live SOL and SPL token balances
- **Multi-Token Support**: Comprehensive token portfolio view
- **Transaction History**: Complete transaction tracking
- **Portfolio Analytics**: Performance metrics and insights

### 🤖 **AI-Powered Insights**
- **Risk Analysis**: AI-driven portfolio risk assessment
- **Market Intelligence**: Real-time market trends and opportunities
- **Trading Recommendations**: Personalized buy/sell/hold suggestions
- **Diversification Scoring**: Portfolio optimization insights

### 💳 **Solana Pay Integration** *(Required Example)*
- **QR Code Generation**: Create payment requests instantly
- **Deep Link Support**: Seamless mobile wallet integration
- **Transaction Monitoring**: Real-time payment status tracking
- **Merchant Dashboard**: Payment analytics and management

### 🌐 **SNS Domain Management** *(Required Example)*
- **Domain Search**: Find available .sol domains
- **Registration Flow**: Complete domain purchase process
- **Domain Management**: Transfer and profile setup
- **Resolution Service**: Address and reverse lookup

### 🔄 **DeFi Integration**
- **Jupiter Swap**: Token swapping with best rates
- **Slippage Protection**: Configurable slippage settings
- **Swap History**: Complete transaction logging
- **Multi-Token Support**: Extensive token compatibility

---

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern UI components
- **Zustand** - Lightweight state management

### **Blockchain**
- **Solana Web3.js** - Solana blockchain interaction
- **Web3Auth SDK** - Social authentication and wallet management
- **Jupiter API** - Token swap aggregation
- **Solana Pay** - Payment protocol integration

### **AI & Analytics**
- **Mistral AI** - Large language model for analysis
- **Custom Rate Limiting** - API usage optimization
- **Fallback Systems** - Graceful degradation

### **Backend & Infrastructure**
- **Next.js API Routes** - Serverless backend
- **Environment Configuration** - Secure credential management
- **Error Handling** - Comprehensive error management
- **Performance Optimization** - Optimized for production

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Git

### **Installation**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/sanmayamohanty/solanagenie-ai-portfolio.git
   cd solanagenie-ai-portfolio
   ```

2. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure Environment Variables**
   ```bash
   # Web3Auth Configuration
   NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=your_web3auth_client_id
   WEB3AUTH_CLIENT_SECRET=your_web3auth_client_secret
   
   # Solana Configuration
   NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
   
   # Mistral AI Configuration
   MISTRAL_API_KEY=your_mistral_api_key
   MISTRAL_API_URL=https://api.mistral.ai/v1/chat/completions
   
   # NextAuth Configuration
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open Application**
   ```
   http://localhost:3000
   ```

---

## 📱 Application Flow

### **1. Landing Page**
- Modern landing page with feature highlights
- Social login options (Google, Discord, Twitter, Email)
- Clear value proposition and call-to-actions

### **2. Authentication**
- Web3Auth modal for social login
- Automatic seedless wallet creation
- Secure session establishment
- Redirect to dashboard on success

### **3. Dashboard**
- Portfolio overview with real-time balances
- Quick actions for swap, pay, domains, and AI insights
- Navigation sidebar with all features
- Mobile-responsive design

### **4. Token Swap** (`/dashboard/swap`)
- Jupiter integration for best swap rates
- Token selection with search functionality
- Slippage configuration
- Transaction confirmation and tracking

### **5. Solana Pay** (`/dashboard/solana-pay`)
- Payment request creation
- QR code generation and display
- Deep link support for mobile wallets
- Transaction status monitoring
- Payment history and analytics

### **6. SNS Domains** (`/dashboard/sns`)
- Domain search with availability checking
- Registration flow with payment processing
- Domain management and transfer
- Profile setup and configuration

### **7. AI Insights** (`/dashboard/ai`)
- Portfolio risk analysis with scoring
- Market intelligence and trends
- Personalized trading recommendations
- Interactive charts and visualizations

---

## 🔧 API Documentation

### **Authentication Endpoints**
```typescript
// Web3Auth integration
GET  /api/auth/web3auth/callback
POST /api/auth/web3auth/verify

// NextAuth.js endpoints
GET  /api/auth/[...nextauth]
```

### **Portfolio Endpoints**
```typescript
// Balance and token information
GET /api/portfolio/balance/:publicKey
GET /api/portfolio/tokens/:publicKey
GET /api/portfolio/history/:publicKey
```

### **AI Analysis Endpoints**
```typescript
// AI-powered analysis
POST /api/ai/analyze
// Body: { portfolioData, marketData?, analysisType }
// Types: 'portfolio' | 'market' | 'trading'
```

### **Solana Pay Endpoints**
```typescript
// Payment processing
POST /api/solana-pay/create
GET  /api/solana-pay/status/:reference
POST /api/solana-pay/confirm
```

### **SNS Endpoints**
```typescript
// Domain management
GET  /api/sns/search/:domain
POST /api/sns/register
GET  /api/sns/resolve/:domain
```

---

## 🧪 Testing

### **Development Testing**
```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

### **Manual Testing Checklist**

#### **Authentication Flow**
- [ ] Google OAuth login/logout
- [ ] Discord OAuth login/logout
- [ ] Twitter OAuth login/logout
- [ ] Email passwordless login/logout
- [ ] Wallet creation verification
- [ ] Session persistence

#### **Portfolio Features**
- [ ] Real-time balance updates
- [ ] Token list display
- [ ] Transaction history
- [ ] Balance refresh functionality

#### **AI Integration**
- [ ] Portfolio risk analysis
- [ ] Market insights generation
- [ ] Trading recommendations
- [ ] Error handling and fallbacks

#### **Solana Pay**
- [ ] Payment request creation
- [ ] QR code generation
- [ ] Transaction processing
- [ ] Status updates

#### **SNS Integration**
- [ ] Domain search functionality
- [ ] Registration flow
- [ ] Domain management
- [ ] Resolution services

---

## 🔒 Security Considerations

### **Environment Security**
- All sensitive keys in `.env.local` (gitignored)
- API key validation and rate limiting
- Secure session management
- HTTPS enforcement in production

### **Wallet Security**
- Web3Auth's seedless architecture
- Private key never exposed to client
- Secure transaction signing
- Multi-factor authentication support

### **API Security**
- Rate limiting on AI endpoints
- Input validation and sanitization
- Error message sanitization
- CORS configuration

---

## 🎯 Hackathon Requirements

### ✅ **Core Requirements Met**
- **Web3Auth SDK Integration**: Full social login implementation
- **Solana Deployment**: Running on Solana devnet
- **Required Examples**: Complete SNS and Solana Pay implementations
- **Production Ready**: Comprehensive error handling and optimization

### ✅ **Additional Features**
- AI-powered portfolio analysis
- Modern, responsive UI/UX
- Comprehensive testing suite
- Production deployment configuration

---

## 🚀 Deployment

### **Vercel Deployment** (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Deploy to production
vercel --prod
```

### **Docker Deployment**
```bash
# Build Docker image
docker build -t solanagenie .

# Run container
docker run -p 3000:3000 solanagenie
```

### **Environment Variables for Production**
- Update RPC URLs to mainnet endpoints
- Configure production API keys
- Set secure session secrets
- Enable analytics and monitoring

---

## 📊 Performance Metrics

### **Load Time Targets**
- Initial Load: < 3 seconds
- Authentication: < 2 seconds
- Balance Fetch: < 1 second
- Transaction: < 5 seconds

### **Code Quality**
- TypeScript Coverage: 100%
- Test Coverage: > 80%
- Lighthouse Score: > 90
- Bundle Size: < 500KB

---

## 🛠️ Development Guide

### **Project Structure**
```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Auth pages
│   ├── dashboard/         # Main app pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   ├── auth/              # Auth components
│   ├── dashboard/         # Dashboard components
│   ├── solana-pay/        # Solana Pay components
│   └── sns/               # SNS components
├── lib/                   # Utilities
│   ├── web3auth.ts        # Web3Auth config
│   ├── solana.ts          # Solana connection
│   ├── ai.ts              # Mistral AI client
│   └── utils.ts           # General utilities
├── hooks/                 # Custom hooks
├── store/                 # Zustand stores
└── types/                 # TypeScript types
```

### **Adding New Features**

1. **Create Component**
   ```typescript
   // src/components/feature/NewComponent.tsx
   export default function NewComponent() {
     return <div>New Feature</div>
   }
   ```

2. **Add Route**
   ```typescript
   // src/app/dashboard/new-feature/page.tsx
   export default function NewFeaturePage() {
     return <NewComponent />
   }
   ```

3. **Update Navigation**
   ```typescript
   // Add to sidebar navigation
   // Update dashboard quick actions
   ```

### **Coding Standards**
- Use TypeScript for all new code
- Follow existing component patterns
- Implement proper error handling
- Add comprehensive tests
- Update documentation

---

## 🤝 Contributing

### **Development Workflow**
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### **Commit Message Format**
```
type(scope): description

feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code improvements
test: add tests
chore: maintenance tasks
```

---

## 🐛 Troubleshooting

### **Common Issues**

#### **Web3Auth Connection Issues**
```bash
# Check environment variables
echo $NEXT_PUBLIC_WEB3AUTH_CLIENT_ID

# Verify network configuration
# Ensure correct Web3Auth setup
```

#### **Solana Connection Issues**
```bash
# Test RPC endpoint
curl -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"getHealth"}' \
  $NEXT_PUBLIC_SOLANA_RPC_URL
```

#### **AI Analysis Failures**
```bash
# Check Mistral API key
# Verify rate limiting settings
# Check error logs
```

#### **Build Issues**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

## 📞 Support

### **Getting Help**
- **Documentation**: Check this README and inline code comments
- **Issues**: Create GitHub issue with detailed description
- **Discussions**: Use GitHub Discussions for questions
- **Discord**: Join Web3Auth Discord for platform-specific help

### **Reporting Bugs**
Include the following in bug reports:
- Environment details (OS, Node version, browser)
- Steps to reproduce
- Expected vs actual behavior
- Error messages and logs
- Screenshots if applicable

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Web3Auth Team** - For the excellent authentication platform
- **Solana Foundation** - For the robust blockchain infrastructure
- **Jupiter Protocol** - For the swap aggregation services
- **Mistral AI** - For the powerful language model
- **Vercel** - For the deployment platform
- **shadcn/ui** - For the beautiful UI components

---

## 📈 Roadmap

### **Phase 1: Core Features** ✅
- Web3Auth integration
- Basic portfolio management
- Solana Pay implementation
- SNS domain management

### **Phase 2: AI Integration** ✅
- Portfolio risk analysis
- Market intelligence
- Trading recommendations
- Predictive analytics

### **Phase 3: Advanced Features** 🔄
- Multi-chain support
- Advanced DeFi integrations
- Social trading features
- Mobile application

### **Phase 4: Enterprise** 📋
- White-label solutions
- Advanced analytics
- Institutional features
- Compliance tools

---

**Built with ❤️ for the Web3Auth Hackathon**

*SolanaGenie AI Portfolio - Where AI meets DeFi on Solana*
