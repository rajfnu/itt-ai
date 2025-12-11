import { NextRequest, NextResponse } from 'next/server';
import { AgentResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AgentResponse>> {
  try {
    const body = await request.json();
    const { message } = body;

    await new Promise(resolve => setTimeout(resolve, 1200));

    const lowerMessage = message?.toLowerCase() || '';

    let responseMessage = '';
    let responseData: Record<string, unknown> = {};

    if (lowerMessage.includes('authentication') || lowerMessage.includes('microservice')) {
      responseMessage = `Here's how we handle authentication in our microservices:

**Architecture Overview:**
We use a centralized authentication service with JWT tokens.

**Flow:**
1. User authenticates via \`/auth/login\`
2. Auth service validates credentials against LDAP/OAuth
3. JWT token issued (1hr expiry, refresh token for 7 days)
4. Services validate tokens via shared public key

**Code Example:**
\`\`\`typescript
// Middleware for token validation
import { verifyToken } from '@intimetec/auth-sdk';

export async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = await verifyToken(token);
  req.user = decoded;
  next();
}
\`\`\`

**Key Documentation:**
- [Auth Service README](/docs/auth-service)
- [Security Standards](/docs/security/authentication)
- [Token Management Guide](/docs/guides/jwt-tokens)

Need more details on any specific part?`;
      responseData = {
        sources: ['auth-service/README.md', 'docs/security/authentication.md'],
        codeExamples: 1,
        relatedDocs: 3
      };
    } else if (lowerMessage.includes('ci/cd') || lowerMessage.includes('pipeline')) {
      responseMessage = `Here's our standard CI/CD pipeline setup:

**Pipeline Stages:**
1. **Build** - Compile, lint, type-check
2. **Test** - Unit tests (>80% coverage required)
3. **Security Scan** - SAST, dependency check
4. **Docker Build** - Multi-stage Dockerfile
5. **Deploy to Dev** - Automatic on PR merge
6. **Deploy to Staging** - Manual approval
7. **Deploy to Prod** - Manual + Change ticket

**GitHub Actions Workflow:**
\`\`\`yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline
on: [push, pull_request]
jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage
\`\`\`

**Templates:**
- Node.js: \`/templates/ci/nodejs.yml\`
- Python: \`/templates/ci/python.yml\`
- Docker: \`/templates/ci/docker.yml\`

**Contact:** @devops-team for pipeline issues`;
      responseData = {
        sources: ['templates/ci/', '.github/workflows/'],
        stages: 7,
        templates: 3
      };
    } else if (lowerMessage.includes('coding standard') || lowerMessage.includes('react')) {
      responseMessage = `Here are our React coding standards:

**Project Structure:**
\`\`\`
src/
├── components/     # Reusable UI components
├── features/       # Feature-based modules
├── hooks/          # Custom React hooks
├── lib/            # Utilities and helpers
├── types/          # TypeScript definitions
└── app/            # Next.js app router
\`\`\`

**Component Guidelines:**
- Use functional components with hooks
- Props interface defined above component
- Max 200 lines per component file
- Extract logic to custom hooks

**Naming Conventions:**
- Components: PascalCase (\`UserProfile.tsx\`)
- Hooks: camelCase with 'use' prefix (\`useAuth.ts\`)
- Types: PascalCase (\`UserData.ts\`)

**Code Example:**
\`\`\`tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button className={styles[variant]} onClick={onClick}>
      {label}
    </button>
  );
}
\`\`\`

See full guide: [React Standards](/docs/frontend/react-standards)`;
      responseData = {
        sources: ['docs/frontend/react-standards.md', 'templates/react/'],
        lastUpdated: '2024-01-05'
      };
    } else {
      responseMessage = `I'm your Knowledge Base assistant with RAG capabilities! I search our internal docs, code repos, and wikis.

**What I Can Find:**
- Code examples and patterns
- Architecture documentation
- Best practices and standards
- API specifications
- Runbooks and guides

**Popular Searches:**
- "How do we handle authentication?"
- "Show me the CI/CD pipeline setup"
- "What are our React coding standards?"
- "Find the API documentation for [service]"

**Indexed Sources:**
- GitHub repositories (150+)
- Confluence wiki (2,000+ pages)
- Internal docs portal
- Architecture diagrams

What would you like to find?`;
      responseData = {
        indexedRepos: 150,
        wikiPages: 2000,
        lastIndexed: 'Today 6:00 AM'
      };
    }

    return NextResponse.json({
      success: true,
      message: responseMessage,
      data: responseData,
      sources: ['internal-docs', 'github', 'confluence'],
      status: 'complete',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Knowledge API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Sorry, I encountered an error searching the knowledge base.',
      status: 'error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
