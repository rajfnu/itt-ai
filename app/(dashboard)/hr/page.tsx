'use client';

import { useState, useEffect } from 'react';
import { DepartmentPortal } from '@/components/agents/DepartmentPortal';
import { hrAgents } from '@/data/mock-data';
import { User, UserRole } from '@/types';

export default function HRPage() {
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
      title="HR Portal"
      description="AI-powered assistants for human resources tasks"
      agents={hrAgents}
      accentColor="primary"
      userRole={userRole}
    />
  );
}
