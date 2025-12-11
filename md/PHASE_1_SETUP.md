# PHASE 1: Project Setup & Initialization

## Objective
Initialize a Next.js 14 project with TypeScript, Tailwind CSS, and shadcn/ui. Create the complete folder structure for the InTimeTec Portal with Sales and Engineering departments.

---

## Instructions for Claude Code

### Step 1: Initialize Next.js Project

```
Create a new Next.js 14 project with the following configuration:
- TypeScript enabled
- Tailwind CSS enabled
- App Router (not Pages Router)
- ESLint enabled
- src/ directory: NO (use root app/ folder)
- Import alias: @/*

Run: npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

### Step 2: Install shadcn/ui

```
Initialize shadcn/ui with these settings:
- Style: Default
- Base color: Slate
- CSS variables: Yes

Run: npx shadcn@latest init

Then install these shadcn/ui components:
- button, card, input, textarea, select
- dropdown-menu, avatar, badge
- table, tabs, checkbox, separator
- sheet (for mobile sidebar)
- sonner (for toasts)

Run: npx shadcn@latest add button card input textarea select dropdown-menu avatar badge table tabs checkbox separator sheet sonner
```

### Step 3: Create Folder Structure

```
Create the following folder structure:

app/
├── (auth)/
│   └── login/
│       └── page.tsx          # Login page
├── (dashboard)/
│   ├── layout.tsx            # Dashboard layout wrapper
│   ├── admin/
│   │   └── page.tsx          # Admin dashboard
│   ├── hr/
│   │   └── page.tsx          # HR department page
│   ├── finance/
│   │   └── page.tsx          # Finance department page
│   ├── marketing/
│   │   └── page.tsx          # Marketing department page
│   ├── sales/
│   │   └── page.tsx          # Sales department page
│   ├── engineering/
│   │   └── page.tsx          # Engineering hub page
│   └── employees/
│       └── page.tsx          # Employee directory
├── api/
│   ├── auth/
│   │   ├── login/route.ts
│   │   ├── logout/route.ts
│   │   └── me/route.ts
│   ├── hr/
│   │   ├── onboarding/route.ts
│   │   ├── leave/route.ts
│   │   ├── performance/route.ts
│   │   ├── recruitment/route.ts
│   │   └── policy/route.ts
│   ├── finance/
│   │   ├── invoice/route.ts
│   │   ├── expense/route.ts
│   │   ├── budget/route.ts
│   │   ├── payroll/route.ts
│   │   └── report/route.ts
│   ├── marketing/
│   │   ├── leads/route.ts
│   │   ├── campaign/route.ts
│   │   ├── content/route.ts
│   │   ├── social/route.ts
│   │   └── analytics/route.ts
│   ├── sales/
│   │   ├── capabilities/route.ts
│   │   ├── deck/route.ts
│   │   ├── rfp/route.ts
│   │   ├── rfp-search/route.ts
│   │   └── coach/route.ts
│   ├── engineering/
│   │   ├── training/route.ts
│   │   ├── knowledge/route.ts
│   │   ├── code-review/route.ts
│   │   ├── architecture/route.ts
│   │   └── devops/route.ts
│   └── employees/route.ts
├── layout.tsx                # Root layout
├── page.tsx                  # Home/redirect page
└── globals.css               # Global styles

components/
├── agents/
│   ├── AgentChat.tsx         # Conversational chat interface
│   └── DepartmentPortal.tsx  # Department page with agent cards
├── admin/
│   ├── UserRoleTable.tsx
│   └── AgentPermissionsTable.tsx
└── auth/
    ├── LoginScreen.tsx
    └── RoleGate.tsx

lib/
├── auth-context.tsx
├── rbac.ts
└── utils.ts

types/
└── index.ts

data/
└── mock-data.ts
```

### Step 4: Create Type Definitions

```typescript
// types/index.ts
export type UserRole = 'admin' | 'hr_staff' | 'finance_staff' | 'engineer' | 'marketing_staff' | 'sales_staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  avatar?: string;
}

export interface AIAgent {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  allowedRoles: UserRole[];
  department: string;
  icon: string;
  category: string;
  capabilities: string[];
  suggestedPrompts: string[];
  greeting: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  status?: 'sending' | 'thinking' | 'searching' | 'processing' | 'complete' | 'error';
  data?: Record<string, unknown>;
}

export interface AgentResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
  status: 'thinking' | 'searching' | 'processing' | 'complete' | 'error';
  timestamp: string;
}
```

### Step 5: Create Mock Data

Create mock users and AI agents with:
- 6 mock users (admin, hr, finance, marketing, sales, engineer)
- 25+ AI agents across 5 departments
- Each agent with capabilities, suggested prompts, and greeting

### Step 6: Update Global Styles

Update app/globals.css with InTimeTec branding:
- Primary: Deep blue (#1e3a5f)
- Secondary: Teal accent (#0d9488)
- Dark mode support
- Custom scrollbar styling

### Step 7: Create Home Page Redirect

```typescript
// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login');
}
```

---

## Verification

After completing this phase, verify:

1. Run `npm run dev` - server starts without errors
2. Navigate to `http://localhost:3000` - redirects to /login
3. Check that all shadcn/ui components are installed in components/ui/
4. Confirm folder structure matches the specification
5. API routes respond with mock data

---

## API Testing

Test the APIs with curl:

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@intimetec.com","password":"demo123"}'

# Chat with an agent
curl -X POST http://localhost:3000/api/sales/capabilities \
  -H "Content-Type: application/json" \
  -d '{"message":"What are our AI/ML capabilities?"}'
```

---

## Next Phase

Proceed to `PHASE_2_LAYOUT.md` to build the dashboard layout components.
