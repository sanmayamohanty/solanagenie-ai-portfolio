# 🚀 SolanaGenie AI Portfolio - Claude Code Instructions

## 🎯 Project Mission
Build a production-ready, AI-powered Solana portfolio manager with seamless Web3Auth integration that meets all hackathon requirements while maintaining the highest code quality standards.

## 🔄 MANDATORY WORKFLOW PROTOCOL

### 1. Session Initialization (EVERY SESSION)
```
ALWAYS START WITH:
1. Read IMPLEMENTATION_CHECKLIST.md
2. Check current progress status
3. Identify next actionable task
4. Update task status to in_progress
```

### 2. Implementation Guidelines

#### 📋 Scope Adherence (CRITICAL)
- **NEVER deviate** from scope.md requirements
- **ALWAYS reference** IMPLEMENTATION_CHECKLIST.md before making changes
- **STRICT FOCUS** on hackathon requirements:
  - Web3Auth SDK integration (MANDATORY)
  - Social/email login (MANDATORY) 
  - Solana blockchain deployment (MANDATORY)
  - SNS example implementation (MANDATORY)
  - Solana Pay example implementation (MANDATORY)

#### 🛡️ Anti-Hallucination Measures
1. **Before ANY code changes**: Read existing files to understand structure
2. **Cross-reference**: Check IMPLEMENTATION_CHECKLIST.md for current task
3. **Validate**: Ensure changes align with scope.md requirements
4. **Update**: Mark tasks as completed IMMEDIATELY after finishing
5. **Never assume**: Always verify existing code patterns and dependencies

#### 🔧 Development Standards
- **TypeScript STRICT**: All code must be properly typed
- **Component Structure**: Follow existing patterns in components/
- **State Management**: Use Zustand for global state
- **Styling**: Tailwind CSS with shadcn/ui components
- **API Routes**: Next.js API routes in app/api/
- **Error Handling**: Comprehensive try-catch blocks

## 📁 Project Structure Requirements

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   ├── auth/              # Authentication components
│   ├── dashboard/         # Dashboard components
│   ├── solana-pay/        # Solana Pay components
│   └── sns/               # SNS components
├── lib/                   # Utilities and configurations
│   ├── web3auth.ts        # Web3Auth configuration
│   ├── solana.ts          # Solana connection setup
│   ├── ai.ts              # Mistral AI integration
│   └── utils.ts           # General utilities
├── hooks/                 # Custom React hooks
├── store/                 # Zustand store
└── types/                 # TypeScript types
```

## 🔗 Required Integrations

### 1. Web3Auth Configuration (CRITICAL)
- **SDK**: @web3auth/modal + @web3auth/solana-provider
- **Login Methods**: Google, Discord, Twitter, Email
- **Network**: Sapphire Devnet (from env.txt)
- **Chain**: Solana Devnet

### 2. Solana Integration
- **Library**: @solana/web3.js
- **RPC**: Helius devnet URL (from env.txt)
- **Tokens**: SPL Token support via @solana/spl-token

### 3. AI Integration
- **Provider**: Mistral AI (configured in env.txt)
- **Use Cases**: Portfolio analysis, market insights

### 4. Required Examples Implementation

#### SNS Integration Example
```typescript
// Required functionality:
- Domain search and availability check
- Domain registration flow
- Profile management
- Domain resolution
```

#### Solana Pay Example
```typescript
// Required functionality:
- Payment request creation
- QR code generation
- Payment processing
- Transaction confirmation
```

## 🤖 AI Integration Guidelines

### Mistral AI Usage
- **Endpoint**: Use MISTRAL_API_URL from env.txt
- **Key**: Use MISTRAL_API_KEY from env.txt
- **Model**: mistral-medium for portfolio analysis
- **Rate Limiting**: Implement proper error handling

### AI Features to Implement
1. **Portfolio Analysis**: Risk assessment and recommendations
2. **Market Insights**: Token analysis and trends
3. **Trading Recommendations**: Based on user portfolio

## 📝 Commit Protocol (CRITICAL)

### Commit Frequency Rules
```
COMMIT TRIGGERS (must commit when ANY occur):
1. Complete feature implementation
2. Working integration of new SDK/library
3. Successful API endpoint creation
4. UI component completion
5. Bug fix implementation
6. After every 2-3 significant code changes

NEVER COMMIT:
- Broken/non-functional code
- Missing dependencies
- Failing tests
- Incomplete features
```

### Commit Message Format (NO AI ATTRIBUTION)
```
feat: add solana pay integration

- implement payment request creation
- add QR code generation
- handle transaction processing
- update dashboard with payment status
```

**FORBIDDEN WORDS in commits**: AI, Claude, assistant, generated, automated, bot, GPT, LLM, machine learning, artificial intelligence

### Pre-Commit Requirements
1. **Run Tests**: `npm run test` (must pass)
2. **Linting**: `npm run lint` (must pass)
3. **Type Check**: `npm run type-check` (must pass)
4. **Update Checklist**: Mark completed items in IMPLEMENTATION_CHECKLIST.md

## 📊 Progress Tracking System

### Status Updates (MANDATORY)
1. **Before starting task**: Mark as "in_progress" in IMPLEMENTATION_CHECKLIST.md
2. **During development**: Update sub-tasks with specific progress
3. **After completion**: Mark as "completed" with timestamp
4. **Before commit**: Update all related checklist items

### Progress Reporting Format
```markdown
## Last Updated: [TIMESTAMP]
## Current Phase: [PHASE_NAME]
## Active Task: [SPECIFIC_TASK]
## Completion Status: [X/Y] features completed
```

## 🧪 Testing Requirements

### Testing Priorities
1. **Authentication Flow**: Social login and wallet creation
2. **Solana Integration**: Connection, balance fetching, transactions
3. **Solana Pay**: Payment creation and processing
4. **SNS Integration**: Domain search and registration
5. **AI Features**: Portfolio analysis functionality

### Testing Commands
```bash
npm run test              # Unit tests
npm run test:integration  # Integration tests
npm run test:e2e         # End-to-end tests
npm run test:coverage    # Coverage report
```

## 🚨 Error Prevention Measures

### Before Making Changes
1. **Read**: Current file content and structure
2. **Understand**: Existing patterns and dependencies
3. **Plan**: Check IMPLEMENTATION_CHECKLIST.md for task details
4. **Verify**: Ensure change aligns with scope.md

### During Implementation
1. **Follow Patterns**: Use existing code patterns
2. **Check Dependencies**: Verify all imports and packages exist
3. **Handle Errors**: Implement proper error handling
4. **Test Incrementally**: Test changes as you go

### After Implementation
1. **Update Checklist**: Mark tasks as completed immediately
2. **Test Thoroughly**: Run all relevant tests
3. **Review Changes**: Ensure code quality
4. **Commit Properly**: Follow commit guidelines

## 🎯 Hackathon Success Criteria

### Must-Have Features (ALL REQUIRED)
- ✅ Web3Auth social login working
- ✅ Automatic wallet creation
- ✅ Real-time Solana balance display
- ✅ Token swap functionality (Jupiter)
- ✅ Solana Pay implementation with QR codes
- ✅ SNS domain search and registration
- ✅ AI portfolio analysis
- ✅ Mobile-responsive design

### Demo Flow Requirements
1. **Landing Page** → Social login
2. **Authentication** → Wallet creation
3. **Dashboard** → Portfolio display
4. **Swap Feature** → Token exchange
5. **Solana Pay** → Payment creation/processing
6. **SNS Demo** → Domain management
7. **AI Insights** → Portfolio analysis

## 🔄 Session Management

### Starting a New Session
```
1. Read IMPLEMENTATION_CHECKLIST.md
2. Identify current progress
3. Update task status to in_progress
4. Reference specific requirements from scope.md
5. Begin implementation
```

### Ending a Session
```
1. Complete current task or reach logical stopping point
2. Update IMPLEMENTATION_CHECKLIST.md with progress
3. Commit changes if criteria met
4. Update CLAUDE.md if workflow improvements discovered
```

## 📚 Reference Documentation

### Primary References
- **scope.md**: Complete project requirements
- **IMPLEMENTATION_CHECKLIST.md**: Detailed task tracking
- **TESTING_FRAMEWORK.md**: Testing procedures
- **COMMIT_GUIDELINES.md**: Git management rules
- **env.txt**: Environment configuration

### External Documentation
- [Web3Auth Docs](https://web3auth.io/docs/sdk/pnp/web/)
- [Solana Web3.js](https://solanacookbook.com/)
- [Jupiter API](https://docs.jup.ag/)
- [Solana Pay](https://docs.solanapay.com/)

## ⚡ Performance Requirements

### Load Time Targets
- **Initial Load**: < 3 seconds
- **Authentication**: < 2 seconds
- **Balance Fetch**: < 1 second
- **Transaction**: < 5 seconds

### Code Quality Standards
- **TypeScript Coverage**: 100%
- **Test Coverage**: > 80%
- **Lighthouse Score**: > 90
- **Bundle Size**: < 500KB

## 🎪 YOLO Mode Protocol

When entering YOLO mode:
1. **Strict adherence** to this CLAUDE.md
2. **Frequent checklist updates** (every major change)
3. **Regular commits** (follow commit triggers)
4. **No shortcuts** on testing or validation
5. **Complete feature focus** (don't start new features until current is 100% done)

---

**REMEMBER**: This is a hackathon project that must demonstrate Web3Auth integration, Solana blockchain usage, and include working SNS and Solana Pay examples. Every line of code must contribute to these goals.