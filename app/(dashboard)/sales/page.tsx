'use client';

import { useState, useEffect } from 'react';
import { DepartmentPortal } from '@/components/agents/DepartmentPortal';
import { salesAgents } from '@/data/mock-data';
import { User, UserRole } from '@/types';

export default function SalesPage() {
  const [userRole, setUserRole] = useState<UserRole | undefined>();

  useEffect(() => {
    const storedUser = localStorage.getItem('itt-user');
    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        setUserRole(user.role);
      } catch {}
    }
  }, []);

  return (
    <DepartmentPortal
      title="Sales Portal"
      description="AI-powered assistants for sales and business development"
      agents={salesAgents}
      accentColor="chart-4"
      userRole={userRole}
    />
  );
}
