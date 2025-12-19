'use client';

import { useState, useEffect } from 'react';
import { DepartmentPortal } from '@/components/agents/DepartmentPortal';
import { marketingAgents } from '@/data/mock-data';
import { User, UserRole } from '@/types';

export default function MarketingPage() {
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
      title="Marketing Portal"
      description="AI-powered assistants for marketing and campaigns"
      agents={marketingAgents}
      accentColor="chart-5"
      userRole={userRole}
    />
  );
}
