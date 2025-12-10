# PHASE 3: Authentication & RBAC

## Objective
Implement authentication context, login screen, and role-based access control (RBAC) components.

---

## Instructions for Claude Code

### Step 1: Create Auth Context

```
Create lib/auth-context.tsx:

A React Context for authentication state management:

Interface:
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithSSO: () => Promise<boolean>;
  logout: () => void;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  hasPermission: (permission: string) => boolean;
}

Features:
- Store current user in state
- Persist auth state to localStorage (check on mount)
- Mock login function that validates against mockUsers
- Mock SSO login (simulates redirect, auto-logs in as admin)
- Logout clears state and localStorage
- hasRole() helper to check if user has required role(s)
- isLoading state for initial auth check

Implementation:
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { mockUsers } from '@/data/mock-data';

// Create context with proper typing
// Export useAuth hook
// Export AuthProvider component

Mock login logic:
- Check if email exists in mockUsers
- For demo: accept any password
- Return true/false based on success
- Set user state on success

SSO login simulation:
- Delay 1 second (simulate redirect)
- Auto-login as first admin user in mockUsers
```

### Step 2: Create RBAC Utilities

```
Create lib/rbac.ts:

Utility functions for role-based access control:

// Check if a role has access to a route
export function canAccessRoute(userRole: UserRole, route: string): boolean {
  const routePermissions: Record<string, UserRole[]> = {
    '/admin': ['admin'],
    '/hr': ['admin', 'hr_staff'],
    '/finance': ['admin', 'finance_staff'],
    '/marketing': ['admin', 'marketing_staff'],
    '/employees': ['admin', 'hr_staff', 'engineer', 'finance_staff', 'marketing_staff'],
  };
  
  const allowedRoles = routePermissions[route];
  if (!allowedRoles) return true; // Public route
  return allowedRoles.includes(userRole);
}

// Check if user can access an AI agent
export function canAccessAgent(userRole: UserRole, agentId: string, agents: AIAgent[]): boolean {
  const agent = agents.find(a => a.id === agentId);
  if (!agent) return false;
  return agent.allowedRoles.includes(userRole);
}

// Get accessible navigation items for a role
export function getAccessibleNavItems(userRole: UserRole, navItems: NavItem[]): NavItem[] {
  return navItems.filter(item => item.roles.includes(userRole));
}

// Role hierarchy for comparison
export const roleHierarchy: Record<UserRole, number> = {
  admin: 100,
  hr_staff: 50,
  finance_staff: 50,
  marketing_staff: 50,
  engineer: 30,
};

export function hasHigherOrEqualRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}
```

### Step 3: Create Login Screen

```
Create components/auth/LoginScreen.tsx:

A modern login screen component:

Layout:
- Full page, centered content
- Background: subtle gradient or pattern
- Card in center with login form

Card contents:
1. Header section:
   - "InTimeTec Portal" title
   - "Secure Access" subtitle
   - Optional: Company logo placeholder

2. SSO Button (primary action):
   - Large button: "Sign In with SSO"
   - Icon: KeyRound or Shield from Lucide
   - Full width
   - Primary color styling

3. Divider:
   - "or continue with email" text with lines

4. Email/Password form:
   - Email input field (with validation)
   - Password input field (type="password")
   - "Login" button (secondary styling)
   - Loading state on buttons during auth

5. Demo accounts hint (for development):
   - Small text: "Demo: Use any email from mock data"
   - List available demo emails

State management:
- email, password (controlled inputs)
- isLoading (disable form during auth)
- error (display auth errors)

Use shadcn components: Card, CardHeader, CardContent, Input, Button, Separator

On successful login, redirect to /admin (or appropriate dashboard based on role).
```

### Step 4: Create RoleGate Component

```
Create components/auth/RoleGate.tsx:

A wrapper component that restricts access based on user role:

Props:
interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}

Behavior:
- Get current user from useAuth()
- If user's role is in allowedRoles, render children
- Otherwise, render fallback or default "Access Denied" message

Default fallback:
<div className="flex flex-col items-center justify-center min-h-[400px] text-center">
  <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
  <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
  <p className="text-gray-600 mb-4">
    You don't have permission to view this content.
  </p>
  <p className="text-sm text-gray-500">
    Required role(s): {allowedRoles.join(', ')}
  </p>
  <Button variant="outline" className="mt-4" onClick={() => router.back()}>
    Go Back
  </Button>
</div>

Use Lucide icon: ShieldAlert
```

### Step 5: Create Auth Middleware/Protection

```
Create components/auth/ProtectedRoute.tsx:

A wrapper that redirects unauthenticated users:

Props:
interface ProtectedRouteProps {
  children: React.ReactNode;
}

Behavior:
- Check isAuthenticated from useAuth()
- If not authenticated and not loading, redirect to /login
- While loading, show loading spinner
- If authenticated, render children

Loading state:
<div className="flex items-center justify-center min-h-screen">
  <Loader2 className="h-8 w-8 animate-spin text-primary" />
</div>
```

### Step 6: Create Login Page

```
Create app/(auth)/login/page.tsx:

Import and render LoginScreen component.

Add redirect logic: if user is already authenticated, redirect to dashboard.

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { LoginScreen } from '@/components/auth/LoginScreen';

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/admin');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return <LoginScreen />;
}
```

### Step 7: Wrap App with AuthProvider

```
Update app/layout.tsx:

Wrap the entire app with AuthProvider:

import { AuthProvider } from '@/lib/auth-context';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### Step 8: Update Dashboard Layout with Protection

```
Update app/(dashboard)/layout.tsx:

Add ProtectedRoute wrapper:

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}
```

### Step 9: Add RoleGate to Admin Page

```
Update app/(dashboard)/admin/page.tsx:

Wrap content with RoleGate:

import { RoleGate } from '@/components/auth/RoleGate';

export default function AdminPage() {
  return (
    <RoleGate allowedRoles={['admin']}>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage users and AI agent permissions</p>
        {/* Content will be added in Phase 4 */}
      </div>
    </RoleGate>
  );
}
```

---

## Auth Flow Summary

```
1. User visits any dashboard route
2. ProtectedRoute checks authentication
3. If not authenticated → redirect to /login
4. User logs in via email/password or SSO
5. On success → redirect to /admin (or role-appropriate page)
6. RoleGate components restrict access within authenticated areas
```

---

## Verification

After completing this phase:

1. Run `npm run dev`
2. Visit `http://localhost:3000` - should redirect to login
3. Try logging in with `admin@intimetec.com` - should succeed
4. After login, should see dashboard with sidebar
5. Log out - should redirect to login
6. Try logging in with `dev@intimetec.com` (engineer)
7. Navigate to /admin - should see "Access Denied"
8. Navigate to /employees - should have access

---

## Next Phase

Proceed to `PHASE_4_ADMIN.md` to build the Admin Dashboard with user and agent management tables.
