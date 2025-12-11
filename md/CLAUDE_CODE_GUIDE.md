# InTimeTec Portal - Claude Code CLI Guide

## Project Overview

Build a corporate internal portal for InTimeTec with Role-Based Access Control (RBAC) and **Conversational AI Agent interfaces** for different departments.

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
| 5 | `PHASE_5_AGENTS.md` | Conversational AI agent interface component |
| 6 | `PHASE_6_DEPARTMENTS.md` | HR, Finance, Marketing, Sales, Engineering portals |

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
│   │   ├── sales/
│   │   │   └── page.tsx
│   │   ├── engineering/
│   │   │   └── page.tsx
│   │   └── employees/
│   │       └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   ├── hr/
│   │   ├── finance/
│   │   ├── marketing/
│   │   ├── sales/
│   │   └── engineering/
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
│   │   ├── AgentChat.tsx      # Conversational chat interface
│   │   └── DepartmentPortal.tsx
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

## AI Agent Interface Design

### Conversational UI Pattern

Instead of traditional forms, agents use a **chat-based interface** with:

1. **Natural Language Input** - Users type requests in plain English
2. **Suggested Prompts** - Quick-start buttons for common tasks
3. **Status Indicators** - Visual feedback (Thinking, Searching, Processing)
4. **Rich Responses** - Formatted markdown with data cards
5. **Action Buttons** - Inline actions for follow-up tasks

### Agent Capabilities by Department

#### Sales Portal
| Agent | Capabilities |
|-------|-------------|
| Capabilities Expert | Product knowledge, case studies, competitive positioning |
| Deck Builder | Pitch decks, one-pagers, proposal templates |
| RFP Responder | Analyze RFPs, draft responses, compliance checking |
| RFP Hunter | Search market RFPs, match opportunities, set alerts |
| Sales Coach | Objection handling, deal strategy, pitch practice |

#### Engineering Hub
| Agent | Capabilities |
|-------|-------------|
| Training Assistant | Learning paths, certifications, course recommendations |
| Knowledge Base | RAG-powered doc search, code examples, best practices |
| Code Reviewer | Code analysis, security checks, optimization suggestions |
| Architecture Advisor | System design, technology selection, scaling strategies |
| DevOps Helper | CI/CD pipelines, K8s troubleshooting, infrastructure |

#### HR Portal
| Agent | Capabilities |
|-------|-------------|
| Onboarding Assistant | New hire setup, document generation, progress tracking |
| Leave Manager | Balance checks, request processing, policy questions |
| Performance Coach | Review templates, goal tracking, feedback compilation |
| Recruitment Agent | Resume screening, job descriptions, interview scheduling |
| Policy Assistant | Policy questions, document generation, compliance |

#### Finance Portal
| Agent | Capabilities |
|-------|-------------|
| Invoice Agent | Create/track invoices, vendor management, payments |
| Expense Manager | Review expenses, categorization, spending reports |
| Budget Analyst | Budget tracking, forecasting, variance analysis |
| Payroll Assistant | Payroll processing, tax calculations, pay stubs |
| Financial Reporter | P&L, cash flow, financial statements |

#### Marketing Portal
| Agent | Capabilities |
|-------|-------------|
| Lead Generator | Lead creation, scoring, pipeline management |
| Campaign Manager | Campaign planning, scheduling, performance tracking |
| Content Creator | Blog posts, social content, email copy |
| Social Media Agent | Post scheduling, engagement analysis, trends |
| Marketing Analyst | KPIs, ROI analysis, performance reports |

---

## Role Definitions

| Role | Access Level |
|------|--------------|
| `admin` | Full access to all sections including Admin Dashboard |
| `hr_staff` | HR section + Employee directory |
| `finance_staff` | Finance section only |
| `engineer` | Engineering Hub + Employee directory |
| `marketing_staff` | Marketing section only |
| `sales_staff` | Sales section only |

---

## Mock Users (for testing)

| Name | Email | Role |
|------|-------|------|
| Admin User | admin@intimetec.com | admin |
| HR Manager | hr@intimetec.com | hr_staff |
| Finance Lead | finance@intimetec.com | finance_staff |
| Dev Engineer | dev@intimetec.com | engineer |
| Marketing Exec | marketing@intimetec.com | marketing_staff |
| Sales Rep | sales@intimetec.com | sales_staff |

---

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
http://localhost:3000
```

## API Endpoints

All agents have REST endpoints that accept conversational messages:

```
POST /api/{department}/{agent}
Body: { "message": "user's natural language query" }
Response: { "success": true, "message": "formatted response", "data": {...} }
```

---

## Next Steps

Start with `PHASE_1_SETUP.md` and work through each phase sequentially.
