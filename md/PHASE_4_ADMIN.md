# PHASE 4: Admin Dashboard

## Objective
Build the Admin Dashboard with two main features: User Role Management and AI Agent Permissions configuration.

---

## Instructions for Claude Code

### Step 1: Create User Role Table Component

```
Create components/admin/UserRoleTable.tsx:

An interactive data table for managing user roles:

Props:
interface UserRoleTableProps {
  users: User[];
  onRoleChange: (userId: string, newRole: UserRole) => void;
}

Table columns:
1. Avatar + Name (combined cell with user avatar and name)
2. Email
3. Department
4. Current Role (editable dropdown)
5. Actions (optional: Edit, Delete buttons)

Features:
- Use shadcn Table components (Table, TableHeader, TableBody, TableRow, TableCell, TableHead)
- Role dropdown using shadcn Select component
- Each role change triggers onRoleChange callback
- Visual feedback on role change (toast notification)
- Optional: Search/filter functionality

Role options in dropdown:
- Admin
- HR Staff  
- Finance Staff
- Engineer
- Marketing Staff

Styling:
- Zebra striping on rows (even rows slightly different background)
- Hover state on rows
- Badge component to display current role with color coding:
  - admin: red/primary
  - hr_staff: green
  - finance_staff: blue
  - engineer: purple
  - marketing_staff: orange

Use shadcn Badge component for role display.
Use shadcn Avatar component for user avatars.
```

### Step 2: Create Agent Permissions Table Component

```
Create components/admin/AgentPermissionsTable.tsx:

A table for configuring which roles can access each AI agent:

Props:
interface AgentPermissionsTableProps {
  agents: AIAgent[];
  onPermissionChange: (agentId: string, allowedRoles: UserRole[]) => void;
}

Table columns:
1. Agent Name (with description tooltip)
2. Department (badge)
3. API Endpoint (monospace/code styling)
4. Allowed Roles (multi-select checkboxes)

Features:
- Each agent row has a group of checkboxes for role permissions
- Checkbox options: Admin, HR, Finance, Engineer, Marketing
- Changes trigger onPermissionChange with updated role array
- Visual indicator showing which roles currently have access

Implementation for role checkboxes:
const allRoles: UserRole[] = ['admin', 'hr_staff', 'finance_staff', 'engineer', 'marketing_staff'];

For each agent, map over allRoles and render checkbox:
<Checkbox 
  checked={agent.allowedRoles.includes(role)}
  onCheckedChange={(checked) => handlePermissionToggle(agent.id, role, checked)}
/>

Styling:
- Agent name in bold
- Description as smaller, muted text below name
- Endpoint in code/monospace font with gray background
- Checkboxes arranged horizontally with role labels
```

### Step 3: Create Admin Dashboard Page

```
Update app/(dashboard)/admin/page.tsx:

Combine both tables into a tabbed interface:

'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRoleTable } from '@/components/admin/UserRoleTable';
import { AgentPermissionsTable } from '@/components/admin/AgentPermissionsTable';
import { RoleGate } from '@/components/auth/RoleGate';
import { mockUsers, mockAgents } from '@/data/mock-data';
import { User, AIAgent, UserRole } from '@/types';
import { useToast } from '@/components/ui/use-toast';

Page structure:
1. Page header with title and description
2. Tabs component with two tabs:
   - "User Management" tab
   - "Agent Permissions" tab

3. User Management tab content:
   - Card wrapper
   - Title: "User Role Management"
   - Description: "Assign and modify user roles across the organization"
   - UserRoleTable component

4. Agent Permissions tab content:
   - Card wrapper
   - Title: "AI Agent Permissions"
   - Description: "Configure which roles can access each AI agent"
   - AgentPermissionsTable component

State management:
- useState for users (initialized from mockUsers)
- useState for agents (initialized from mockAgents)
- handleRoleChange function to update user role
- handlePermissionChange function to update agent permissions
- Show toast notification on changes

Wrap entire content with RoleGate allowedRoles={['admin']}
```

### Step 4: Add Summary Statistics Cards

```
Add a statistics section above the tabs in the Admin Dashboard:

Create a row of 4 stat cards showing:
1. Total Users (count of users)
2. Active Agents (count of agents)
3. Admin Users (count of users with admin role)
4. Departments (count of unique departments)

Use shadcn Card component for each stat:
<Card>
  <CardHeader className="flex flex-row items-center justify-between pb-2">
    <CardTitle className="text-sm font-medium text-gray-600">
      Total Users
    </CardTitle>
    <Users className="h-4 w-4 text-gray-400" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">{users.length}</div>
    <p className="text-xs text-gray-500">Across all departments</p>
  </CardContent>
</Card>

Icons (Lucide React):
- Total Users: Users
- Active Agents: Bot
- Admin Users: Shield
- Departments: Building2

Layout: Grid with 4 columns on desktop, 2 on tablet, 1 on mobile
```

### Step 5: Add User Actions (Optional Enhancement)

```
Enhance UserRoleTable with action buttons:

Add an Actions column with:
1. Edit button (Pencil icon) - opens edit modal
2. Delete button (Trash icon) - shows confirmation dialog

Create components/admin/EditUserModal.tsx:
- Modal/Dialog using shadcn Dialog component
- Form to edit user details (name, email, department)
- Save and Cancel buttons

Create components/admin/DeleteUserDialog.tsx:
- AlertDialog using shadcn AlertDialog component
- Confirmation message: "Are you sure you want to remove {user.name}?"
- Cancel and Delete buttons
- Delete button should be destructive variant
```

### Step 6: Add Agent Action (Optional Enhancement)

```
Add ability to create new agents:

Create components/admin/AddAgentDialog.tsx:
- Dialog with form for new agent
- Fields: Name, Description, Endpoint, Department (dropdown), Allowed Roles (checkboxes)
- Add button triggers onAddAgent callback

Add "Add Agent" button in Agent Permissions tab header:
<Button onClick={() => setShowAddAgent(true)}>
  <Plus className="h-4 w-4 mr-2" />
  Add Agent
</Button>
```

---

## Component Structure

```
components/admin/
├── UserRoleTable.tsx        # User management table
├── AgentPermissionsTable.tsx # Agent permissions table
├── EditUserModal.tsx        # (Optional) Edit user dialog
├── DeleteUserDialog.tsx     # (Optional) Delete confirmation
└── AddAgentDialog.tsx       # (Optional) Add new agent
```

---

## Mock Data Updates

```
Ensure data/mock-data.ts has sufficient test data:

At least 5-7 users with varied roles
At least 3-4 AI agents with different permission configurations

Add more mock data if needed for realistic table display.
```

---

## Styling Reference

Role badge colors:
```typescript
const roleBadgeColors: Record<UserRole, string> = {
  admin: 'bg-red-100 text-red-800',
  hr_staff: 'bg-green-100 text-green-800',
  finance_staff: 'bg-blue-100 text-blue-800',
  engineer: 'bg-purple-100 text-purple-800',
  marketing_staff: 'bg-orange-100 text-orange-800',
};
```

Department badge colors:
```typescript
const deptBadgeColors: Record<string, string> = {
  HR: 'bg-green-100 text-green-800',
  Finance: 'bg-blue-100 text-blue-800',
  Marketing: 'bg-orange-100 text-orange-800',
  Engineering: 'bg-purple-100 text-purple-800',
};
```

---

## Verification

After completing this phase:

1. Run `npm run dev`
2. Log in as admin (admin@intimetec.com)
3. Navigate to Admin Dashboard
4. Verify both tabs display correctly
5. Test changing a user's role - should see toast notification
6. Test toggling agent permissions - should update checkboxes
7. Verify statistics cards show correct counts
8. Test responsive layout on different screen sizes

---

## Next Phase

Proceed to `PHASE_5_AGENTS.md` to create the reusable AI Agent Interface component.
