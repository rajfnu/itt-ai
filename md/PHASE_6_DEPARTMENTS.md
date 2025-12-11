# PHASE 6: Department-Specific Agents

## Objective
Create customized AI agent interfaces for HR, Finance, and Marketing departments, each with department-specific form fields and mock responses.

---

## Instructions for Claude Code

### Step 1: Create HR Agent Component

```
Create components/agents/HRAgent.tsx:

Customize AIAgentInterface for HR Department:

Agent Configuration:
- Name: "New Hire Onboarding Status Agent"
- Description: "Check onboarding status and next steps for new employees"
- Endpoint: "/api/hr/onboard"

Custom Fields:
[
  {
    id: 'employeeId',
    label: 'Employee ID',
    type: 'text',
    placeholder: 'e.g., EMP-2024-001',
    required: true,
  },
  {
    id: 'department',
    label: 'Department',
    type: 'select',
    placeholder: 'Select department',
    options: [
      { value: 'engineering', label: 'Engineering' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'finance', label: 'Finance' },
      { value: 'hr', label: 'Human Resources' },
      { value: 'sales', label: 'Sales' },
    ],
  },
]

Mock Response:
{
  status: 'completed',
  employee_name: 'John Smith',
  employee_id: 'EMP-2024-001',
  department: 'Engineering',
  start_date: '2025-01-15',
  onboarding_progress: 85,
  completed_steps: [
    'Documentation submitted',
    'Background check cleared',
    'Equipment assigned',
    'Access credentials created'
  ],
  pending_steps: [
    'IT orientation scheduled',
    'Team introduction meeting'
  ],
  next_step: 'Final IT Setup',
  completion_date: '2025-01-20',
  assigned_buddy: 'Sarah Chen',
  manager: 'Mike Johnson'
}

Component:
export function HRAgent() {
  return (
    <AIAgentInterface
      agentName="New Hire Onboarding Status Agent"
      agentDescription="Check onboarding status and next steps for new employees"
      endpoint="/api/hr/onboard"
      customFields={hrCustomFields}
      mockResponse={hrMockResponse}
    />
  );
}
```

### Step 2: Create Finance Agent Component

```
Create components/agents/FinanceAgent.tsx:

Customize AIAgentInterface for Finance Department:

Agent Configuration:
- Name: "Quarterly Budget Approval Agent"
- Description: "Submit and track budget approval requests"
- Endpoint: "/api/finance/budget"

Custom Fields:
[
  {
    id: 'departmentCode',
    label: 'Department Code',
    type: 'text',
    placeholder: 'e.g., DEPT-ENG-001',
    required: true,
  },
  {
    id: 'amount',
    label: 'Requested Amount ($)',
    type: 'number',
    placeholder: 'Enter amount',
    required: true,
  },
  {
    id: 'quarter',
    label: 'Quarter',
    type: 'select',
    placeholder: 'Select quarter',
    options: [
      { value: 'Q1', label: 'Q1 (Jan-Mar)' },
      { value: 'Q2', label: 'Q2 (Apr-Jun)' },
      { value: 'Q3', label: 'Q3 (Jul-Sep)' },
      { value: 'Q4', label: 'Q4 (Oct-Dec)' },
    ],
  },
  {
    id: 'category',
    label: 'Budget Category',
    type: 'select',
    placeholder: 'Select category',
    options: [
      { value: 'capex', label: 'Capital Expenditure' },
      { value: 'opex', label: 'Operating Expenses' },
      { value: 'personnel', label: 'Personnel/Hiring' },
      { value: 'marketing', label: 'Marketing & Sales' },
      { value: 'rd', label: 'R&D' },
    ],
  },
]

Mock Response:
{
  approval_status: 'pending_review',
  request_id: 'BUD-2025-Q1-0042',
  department_code: 'DEPT-ENG-001',
  requested_amount: 150000,
  category: 'Capital Expenditure',
  quarter: 'Q1 2025',
  risk_score: 0.25,
  risk_level: 'low',
  current_reviewer: 'CFO',
  review_stage: 2,
  total_stages: 3,
  estimated_decision_date: '2025-01-25',
  budget_utilization: {
    allocated: 500000,
    spent: 320000,
    remaining: 180000,
    utilization_percent: 64
  },
  notes: 'Requires executive approval for amounts over $100,000',
  similar_requests: [
    { id: 'BUD-2024-Q4-0038', amount: 125000, status: 'approved' },
    { id: 'BUD-2024-Q3-0029', amount: 200000, status: 'approved' }
  ]
}

Component:
export function FinanceAgent() {
  return (
    <AIAgentInterface
      agentName="Quarterly Budget Approval Agent"
      agentDescription="Submit and track budget approval requests"
      endpoint="/api/finance/budget"
      customFields={financeCustomFields}
      mockResponse={financeMockResponse}
    />
  );
}
```

### Step 3: Create Marketing Agent Component

```
Create components/agents/MarketingAgent.tsx:

Customize AIAgentInterface for Marketing Department:

Agent Configuration:
- Name: "Campaign Content Generation Agent"
- Description: "Generate marketing content for various campaign types"
- Endpoint: "/api/marketing/content"

Custom Fields:
[
  {
    id: 'campaignType',
    label: 'Campaign Type',
    type: 'select',
    placeholder: 'Select campaign type',
    required: true,
    options: [
      { value: 'email', label: 'Email Campaign' },
      { value: 'social', label: 'Social Media' },
      { value: 'blog', label: 'Blog Post' },
      { value: 'landing', label: 'Landing Page' },
      { value: 'newsletter', label: 'Newsletter' },
    ],
  },
  {
    id: 'targetAudience',
    label: 'Target Audience',
    type: 'text',
    placeholder: 'e.g., Tech professionals, 25-45',
    required: true,
  },
  {
    id: 'tone',
    label: 'Content Tone',
    type: 'select',
    placeholder: 'Select tone',
    options: [
      { value: 'professional', label: 'Professional' },
      { value: 'casual', label: 'Casual & Friendly' },
      { value: 'urgent', label: 'Urgent/Action-oriented' },
      { value: 'educational', label: 'Educational' },
      { value: 'inspirational', label: 'Inspirational' },
    ],
  },
  {
    id: 'keywords',
    label: 'Keywords (comma-separated)',
    type: 'text',
    placeholder: 'e.g., AI, automation, efficiency',
  },
]

Mock Response:
{
  content_id: 'CONT-2025-0156',
  campaign_type: 'Email Campaign',
  status: 'draft_generated',
  content_link: 'https://docs.intimetec.com/drafts/cont-2025-0156.docx',
  preview_link: 'https://preview.intimetec.com/email/cont-2025-0156',
  generated_content: {
    subject_line: 'Transform Your Workflow with AI-Powered Automation',
    preview_text: 'Discover how leading companies are saving 40% of their time...',
    word_count: 450,
    estimated_read_time: '2 min',
    cta_text: 'Start Your Free Trial'
  },
  tone: 'professional',
  target_audience: 'Tech professionals, 25-45',
  seo_score: 85,
  readability_score: 'Grade 8',
  keyword_density: {
    'AI': 2.1,
    'automation': 1.8,
    'efficiency': 1.2
  },
  suggestions: [
    'Consider adding a customer testimonial',
    'A/B test with a question-based subject line',
    'Include mobile-optimized CTA button'
  ],
  generated_at: '2025-01-15T10:30:00Z',
  expires_at: '2025-01-22T10:30:00Z'
}

Component:
export function MarketingAgent() {
  return (
    <AIAgentInterface
      agentName="Campaign Content Generation Agent"
      agentDescription="Generate marketing content for various campaign types"
      endpoint="/api/marketing/content"
      customFields={marketingCustomFields}
      mockResponse={marketingMockResponse}
    />
  );
}
```

### Step 4: Update Department Pages

```
Update app/(dashboard)/hr/page.tsx:

'use client';

import { RoleGate } from '@/components/auth/RoleGate';
import { HRAgent } from '@/components/agents/HRAgent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus, ClipboardList, Calendar } from 'lucide-react';

export default function HRPage() {
  return (
    <RoleGate allowedRoles={['admin', 'hr_staff']}>
      <div className="container mx-auto p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold">HR Portal</h1>
          <p className="text-gray-600 mt-2">Human Resources AI Agents and Tools</p>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Active Employees" value="156" icon={Users} />
          <StatCard title="New Hires (This Month)" value="8" icon={UserPlus} />
          <StatCard title="Pending Onboardings" value="3" icon={ClipboardList} />
          <StatCard title="Scheduled Interviews" value="12" icon={Calendar} />
        </div>

        {/* AI Agent Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">AI Agents</h2>
          <HRAgent />
        </div>
      </div>
    </RoleGate>
  );
}

// Create StatCard helper component or inline it
```

```
Update app/(dashboard)/finance/page.tsx:

Similar structure with:
- Page header for Finance Portal
- Stats: Total Budget, Spent YTD, Pending Approvals, Active Requests
- FinanceAgent component

RoleGate allowedRoles={['admin', 'finance_staff']}
```

```
Update app/(dashboard)/marketing/page.tsx:

Similar structure with:
- Page header for Marketing Portal
- Stats: Active Campaigns, Content Pieces, Engagement Rate, Leads Generated
- MarketingAgent component

RoleGate allowedRoles={['admin', 'marketing_staff']}
```

### Step 5: Create Employee Directory Page

```
Update app/(dashboard)/employees/page.tsx:

A simple employee directory showing all users:

'use client';

import { RoleGate } from '@/components/auth/RoleGate';
import { mockUsers } from '@/data/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search, Mail, Building2 } from 'lucide-react';

Features:
- Search/filter by name or department
- Grid or list view toggle
- Employee cards showing:
  - Avatar with initials
  - Name
  - Email
  - Department badge
  - Role badge
- Click to view details (optional modal)

RoleGate allowedRoles={['admin', 'hr_staff', 'engineer', 'finance_staff', 'marketing_staff']}
```

### Step 6: Add Additional HR Agents (Optional)

```
Create additional HR-related agents:

components/agents/LeaveRequestAgent.tsx:
- Name: "Leave Request Agent"
- Fields: Employee ID, Leave Type (Annual, Sick, Personal), Start Date, End Date
- Mock Response: approval status, remaining leave balance, manager notification status

components/agents/PerformanceAgent.tsx:
- Name: "Performance Review Agent"  
- Fields: Employee ID, Review Period, Self-Assessment
- Mock Response: review status, feedback summary, next steps
```

### Step 7: Create Agent Index Export

```
Create components/agents/index.ts:

Export all agent components for easy importing:

export { AIAgentInterface } from './AIAgentInterface';
export { HRAgent } from './HRAgent';
export { FinanceAgent } from './FinanceAgent';
export { MarketingAgent } from './MarketingAgent';
// Add more as needed
```

---

## Department Page Template

Use this consistent structure for all department pages:

```tsx
'use client';

import { RoleGate } from '@/components/auth/RoleGate';
import { DepartmentAgent } from '@/components/agents/DepartmentAgent';

export default function DepartmentPage() {
  return (
    <RoleGate allowedRoles={['admin', 'department_role']}>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">[Department] Portal</h1>
          <p className="text-gray-600 mt-2">[Description]</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Stat cards */}
        </div>

        {/* AI Agents */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">AI Agents</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DepartmentAgent />
            {/* Additional agents */}
          </div>
        </section>
      </div>
    </RoleGate>
  );
}
```

---

## Verification

After completing this phase:

1. Run `npm run dev`
2. Log in as admin and test all department pages
3. Test HR Portal:
   - Fill in employee ID and select department
   - Submit query and verify mock response displays
4. Test Finance Portal:
   - Enter budget request details
   - Verify response shows approval status and risk score
5. Test Marketing Portal:
   - Select campaign type and enter audience
   - Verify content generation response
6. Test Employee Directory:
   - Verify search/filter works
   - Check responsive layout
7. Test role restrictions:
   - Log in as hr_staff - should only access HR and Employees
   - Log in as engineer - should only access Employees
   - Log in as finance_staff - should only access Finance

---

## Final Checklist

Before considering the project complete:

- [ ] All routes protected with appropriate roles
- [ ] Login/logout flow works correctly
- [ ] Sidebar shows only accessible links per role
- [ ] Admin can manage users and agent permissions
- [ ] All three department agents functional
- [ ] Employee directory accessible to all authenticated users
- [ ] Responsive design works on mobile
- [ ] No console errors
- [ ] Toast notifications appear for actions
- [ ] Loading states display correctly

---

## Congratulations! 🎉

You've completed the InTimeTec Portal. The application now includes:

✅ Role-Based Access Control (RBAC)
✅ Secure authentication flow
✅ Admin dashboard for user/agent management
✅ Department-specific AI agent interfaces
✅ Employee directory
✅ Responsive design
✅ Clean, professional UI with shadcn/ui

### Optional Enhancements

Consider adding:
- Real API integration (replace mock data)
- Database persistence (Prisma + PostgreSQL)
- Real SSO integration (Auth0, Clerk, NextAuth)
- Audit logging for admin actions
- Email notifications
- Export functionality for reports
