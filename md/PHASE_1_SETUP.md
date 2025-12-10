# PHASE 1: Project Setup & Initialization

## Objective
Initialize a Next.js 14 project with TypeScript, Tailwind CSS, and shadcn/ui. Create the complete folder structure for the InTimeTec Portal.

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
- button
- card
- input
- textarea
- select
- dropdown-menu
- avatar
- badge
- table
- tabs
- checkbox
- separator
- sheet (for mobile sidebar)
- toast

Run: npx shadcn@latest add button card input textarea select dropdown-menu avatar badge table tabs checkbox separator sheet toast
```

### Step 3: Create Folder Structure

```
Create the following folder structure (empty files are fine for now):

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
│   └── employees/
│       └── page.tsx          # Employee directory
├── layout.tsx                # Root layout
├── page.tsx                  # Home/redirect page
└── globals.css               # Global styles (already exists)

components/
├── layout/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── DashboardLayout.tsx
├── agents/
│   ├── AIAgentInterface.tsx
│   ├── HRAgent.tsx
│   ├── FinanceAgent.tsx
│   └── MarketingAgent.tsx
├── admin/
│   ├── UserRoleTable.tsx
│   └── AgentPermissionsTable.tsx
└── auth/
    ├── LoginScreen.tsx
    └── RoleGate.tsx

lib/
├── auth-context.tsx
├── rbac.ts
└── utils.ts                  # Already exists from shadcn

types/
└── index.ts

data/
└── mock-data.ts
```

### Step 4: Create Type Definitions

```
Create types/index.ts with these TypeScript interfaces:

export type UserRole = 'admin' | 'hr_staff' | 'finance_staff' | 'engineer' | 'marketing_staff';

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
}

export interface AgentResponse {
  success: boolean;
  data: Record<string, unknown>;
  timestamp: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  roles: UserRole[];
}
```

### Step 5: Create Mock Data

```
Create data/mock-data.ts with mock users and AI agents:

import { User, AIAgent, NavItem } from '@/types';

export const mockUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@intimetec.com', role: 'admin', department: 'Administration' },
  { id: '2', name: 'Sarah HR', email: 'hr@intimetec.com', role: 'hr_staff', department: 'Human Resources' },
  { id: '3', name: 'Mike Finance', email: 'finance@intimetec.com', role: 'finance_staff', department: 'Finance' },
  { id: '4', name: 'Dev Engineer', email: 'dev@intimetec.com', role: 'engineer', department: 'Engineering' },
  { id: '5', name: 'Lisa Marketing', email: 'marketing@intimetec.com', role: 'marketing_staff', department: 'Marketing' },
];

export const mockAgents: AIAgent[] = [
  {
    id: 'agent-1',
    name: 'Onboarding Agent',
    description: 'Handles new hire onboarding status queries',
    endpoint: '/api/hr/onboard',
    allowedRoles: ['admin', 'hr_staff'],
    department: 'HR',
  },
  {
    id: 'agent-2',
    name: 'Budget Checker',
    description: 'Processes budget approval requests',
    endpoint: '/api/finance/budget',
    allowedRoles: ['admin', 'finance_staff'],
    department: 'Finance',
  },
  {
    id: 'agent-3',
    name: 'Content Generator',
    description: 'Generates marketing campaign content',
    endpoint: '/api/marketing/content',
    allowedRoles: ['admin', 'marketing_staff'],
    department: 'Marketing',
  },
];

export const navigationItems: NavItem[] = [
  { title: 'Admin Dashboard', href: '/admin', icon: 'Settings', roles: ['admin'] },
  { title: 'HR Portal', href: '/hr', icon: 'Users', roles: ['admin', 'hr_staff'] },
  { title: 'Finance Portal', href: '/finance', icon: 'DollarSign', roles: ['admin', 'finance_staff'] },
  { title: 'Marketing Portal', href: '/marketing', icon: 'Megaphone', roles: ['admin', 'marketing_staff'] },
  { title: 'Employees', href: '/employees', icon: 'UserCircle', roles: ['admin', 'hr_staff', 'engineer', 'finance_staff', 'marketing_staff'] },
];
```

### Step 6: Update Global Styles

```
Update app/globals.css to include corporate color scheme:

Add CSS variables for InTimeTec branding:
- Primary: Deep blue (#1e3a5f)
- Secondary: Teal accent (#0d9488)
- Background: Clean slate grays

Ensure dark mode support is configured.
```

### Step 7: Create Home Page Redirect

```
Update app/page.tsx to redirect to /login:

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

---

## Next Phase

Proceed to `PHASE_2_LAYOUT.md` to build the dashboard layout components.
