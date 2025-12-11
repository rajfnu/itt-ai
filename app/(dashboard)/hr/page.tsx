'use client';

import { DepartmentPortal } from '@/components/agents/DepartmentPortal';
import { hrAgents } from '@/data/mock-data';

export default function HRPage() {
  return (
    <DepartmentPortal
      title="HR Portal"
      description="AI-powered assistants for human resources tasks"
      agents={hrAgents}
      accentColor="primary"
    />
  );
}
