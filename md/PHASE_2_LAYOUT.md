# PHASE 2: Dashboard Layout Components

## Objective
Create the main dashboard layout including Header, Sidebar, and the DashboardLayout wrapper component.

---

## Instructions for Claude Code

### Step 1: Create Header Component

```
Create components/layout/Header.tsx:

A fixed top navigation bar with:
- Left side: Company logo/text "InTimeTec Portal" (use a professional font styling)
- Right side: 
  - User avatar (use shadcn Avatar component)
  - User name display
  - Dropdown menu (shadcn DropdownMenu) with options:
    - "Profile" 
    - "Settings"
    - Separator
    - "Sign Out" (this should call a logout function from auth context)

Props:
- user: User object (from types)
- onLogout: () => void

Styling:
- Fixed position at top
- Height: 64px (h-16)
- Background: white with subtle bottom border
- Shadow: subtle drop shadow
- Z-index: 50 (above sidebar)
- Full width

Use Lucide React icons for menu items (User, Settings, LogOut).
```

### Step 2: Create Sidebar Component

```
Create components/layout/Sidebar.tsx:

A collapsible left-hand sidebar for navigation with:

Props:
- isCollapsed: boolean
- onToggle: () => void
- currentPath: string (for active state highlighting)

Features:
- Navigation links for: Admin Dashboard, HR, Finance, Marketing, Employees
- Each link shows icon + text (text hidden when collapsed)
- Active link highlighted with background color and left border accent
- Collapse/expand toggle button at the bottom
- Role-based visibility (links only show if user has permission)

Structure:
- Fixed position on left
- Width: 256px expanded, 64px collapsed
- Full height minus header (calc(100vh - 64px))
- Top padding to account for fixed header
- Smooth transition animation on collapse/expand

Icons (Lucide React):
- Admin: Settings
- HR: Users  
- Finance: DollarSign
- Marketing: Megaphone
- Employees: UserCircle
- Collapse toggle: ChevronLeft/ChevronRight

Accept navigation items from props and filter based on user role.
```

### Step 3: Create Mobile Sidebar (Sheet)

```
Create components/layout/MobileSidebar.tsx:

A mobile-responsive sidebar using shadcn Sheet component:

Props:
- isOpen: boolean
- onClose: () => void
- currentPath: string

Features:
- Opens from left side on mobile
- Same navigation links as desktop sidebar
- Closes when a link is clicked
- Hamburger menu trigger in Header (only visible on mobile)

Use shadcn Sheet, SheetContent, SheetTrigger components.
```

### Step 4: Create DashboardLayout Component

```
Create components/layout/DashboardLayout.tsx:

A wrapper component that combines Header + Sidebar + main content area:

Props:
- children: React.ReactNode

Features:
- Manages sidebar collapsed state (useState)
- Manages mobile sidebar open state (useState)
- Gets current user from AuthContext
- Gets current pathname from usePathname()
- Responsive behavior:
  - Desktop (lg+): Show desktop sidebar
  - Mobile (<lg): Hide sidebar, show hamburger menu in header

Layout structure:
<div className="min-h-screen bg-gray-50">
  <Header />
  <Sidebar /> (desktop only)
  <MobileSidebar /> (mobile only)
  <main> 
    {children} 
  </main>
</div>

Main content area should:
- Have left margin matching sidebar width (ml-64 or ml-16 based on collapsed state)
- Have top padding for fixed header (pt-16)
- Transition smoothly when sidebar collapses
- On mobile: no left margin (full width)
```

### Step 5: Create Dashboard Route Layout

```
Create app/(dashboard)/layout.tsx:

This layout wraps all dashboard pages:

import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

Note: This will need AuthProvider wrapper - we'll add that in Phase 3.
For now, create a placeholder that just renders children.
```

### Step 6: Create Placeholder Dashboard Pages

```
Create placeholder content for each dashboard page:

app/(dashboard)/admin/page.tsx:
- Title: "Admin Dashboard"
- Subtitle: "Manage users and AI agent permissions"
- Empty card placeholder

app/(dashboard)/hr/page.tsx:
- Title: "HR Portal"  
- Subtitle: "Human Resources AI Agents"
- Empty card placeholder

app/(dashboard)/finance/page.tsx:
- Title: "Finance Portal"
- Subtitle: "Financial AI Agents"
- Empty card placeholder

app/(dashboard)/marketing/page.tsx:
- Title: "Marketing Portal"
- Subtitle: "Marketing AI Agents"
- Empty card placeholder

app/(dashboard)/employees/page.tsx:
- Title: "Employee Directory"
- Subtitle: "View all employees"
- Empty card placeholder

Each page should have consistent styling:
- Container with max-width and padding
- Page title (h1) and subtitle (p with muted color)
- Card component as placeholder for future content
```

---

## Component API Summary

### Header
```typescript
interface HeaderProps {
  user: User;
  onLogout: () => void;
  onMenuClick: () => void;  // For mobile hamburger
}
```

### Sidebar
```typescript
interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  currentPath: string;
  userRole: UserRole;
  navItems: NavItem[];
}
```

### DashboardLayout
```typescript
interface DashboardLayoutProps {
  children: React.ReactNode;
}
```

---

## Styling Guidelines

Use these Tailwind classes for consistent styling:

**Transitions:**
```
transition-all duration-300 ease-in-out
```

**Active nav link:**
```
bg-primary/10 text-primary border-l-4 border-primary
```

**Inactive nav link:**
```
text-gray-600 hover:bg-gray-100 hover:text-gray-900
```

**Sidebar:**
```
fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r
```

---

## Verification

After completing this phase:

1. Temporarily hardcode a mock user in DashboardLayout to test
2. Run `npm run dev`
3. Navigate to `/admin` - should see layout with header and sidebar
4. Test sidebar collapse/expand
5. Test responsive behavior (resize browser)
6. Verify navigation links highlight correctly

---

## Next Phase

Proceed to `PHASE_3_AUTH.md` to implement authentication context and RBAC.
