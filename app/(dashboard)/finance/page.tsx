'use client';

import { useState, useEffect } from 'react';
import { DepartmentPortal } from '@/components/agents/DepartmentPortal';
import { financeAgents } from '@/data/mock-data';
import { User, UserRole } from '@/types';

export default function FinancePage() {
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
      title="Finance Portal"
      description="AI-powered assistants for financial operations"
      agents={financeAgents}
      accentColor="secondary"
      userRole={userRole}
    />
  );
}
