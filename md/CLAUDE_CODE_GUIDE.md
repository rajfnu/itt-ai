# InTimeTec Portal - Claude Code CLI Guide

## Project Overview

Build a corporate internal portal for InTimeTec with Role-Based Access Control (RBAC) and AI Agent interfaces for different departments.

**Tech Stack:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Context for auth/RBAC

---

## How to Use This Guide

This guide is split into **6 phases**. Feed each phase file to Claude Code CLI sequentially.

### Quick Start

```bash
# 1. Create project folder
mkdir intimetec-portal && cd intimetec-portal

# 2. Start Claude Code
claude

# 3. Feed the instruction files one by one
# Start with: @PHASE_1_SETUP.md
# Then: @PHASE_2_LAYOUT.md
# Continue through all phases...
```

### File Sequence

| Order | File | Description |
|-------|------|-------------|
| 1 | `PHASE_1_SETUP.md` | Project initialization & folder structure |
| 2 | `PHASE_2_LAYOUT.md` | Dashboard layout, header, sidebar |
| 3 | `PHASE_3_AUTH.md` | Login, RBAC context, role gate |
| 4 | `PHASE_4_ADMIN.md` | Admin dashboard with user/agent tables |
| 5 | `PHASE_5_AGENTS.md` | Reusable AI agent interface component |
| 6 | `PHASE_6_DEPARTMENTS.md` | HR, Finance, Marketing agent pages |

---

## Target File Structure

```
intimetec-portal/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── admin/
│   │   │   └── page.tsx
│   │   ├── hr/
│   │   │   └── page.tsx
│   │   ├── finance/
│   │   │   └── page.tsx
│   │   ├── marketing/
│   │   │   └── page.tsx
│   │   └── employees/
│   │       └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── DashboardLayout.tsx
│   ├── agents/
│   │   ├── AIAgentInterface.tsx
│   │   ├── HRAgent.tsx
│   │   ├── FinanceAgent.tsx
│   │   └── MarketingAgent.tsx
│   ├── admin/
│   │   ├── UserRoleTable.tsx
│   │   └── AgentPermissionsTable.tsx
│   └── auth/
│       ├── LoginScreen.tsx
│       └── RoleGate.tsx
├── lib/
│   ├── auth-context.tsx
│   ├── rbac.ts
│   └── utils.ts
├── types/
│   └── index.ts
└── data/
    └── mock-data.ts
```

---

## Tips for Claude Code CLI

### Feeding Instructions

```bash
# Method 1: Reference file directly
@PHASE_1_SETUP.md

# Method 2: Copy-paste content into Claude Code

# Method 3: Use with context
"Follow the instructions in @PHASE_1_SETUP.md"
```

### Verify After Each Phase

After each phase, ask Claude Code to verify:
```
Run the dev server and confirm [specific component] works correctly.
```

### If Something Breaks

```
The [component] isn't working as expected. Check the implementation and fix: [describe issue]
```

### Request Refinements

```
Update the Sidebar component to highlight the active route.
```

---

## Role Definitions

| Role | Access Level |
|------|--------------|
| `admin` | Full access to all sections including Admin Dashboard |
| `hr_staff` | HR section + Employee directory |
| `finance_staff` | Finance section only |
| `engineer` | Employee section only |
| `marketing_staff` | Marketing section only |

---

## Mock Users (for testing)

| Name | Email | Role |
|------|-------|------|
| Admin User | admin@intimetec.com | admin |
| HR Manager | hr@intimetec.com | hr_staff |
| Finance Lead | finance@intimetec.com | finance_staff |
| Dev Engineer | dev@intimetec.com | engineer |
| Marketing Exec | marketing@intimetec.com | marketing_staff |

---

## Next Steps

Start with `PHASE_1_SETUP.md` and work through each phase sequentially.
