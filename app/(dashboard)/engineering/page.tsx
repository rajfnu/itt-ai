'use client';

import { DepartmentPortal } from '@/components/agents/DepartmentPortal';
import { engineeringAgents } from '@/data/mock-data';

export default function EngineeringPage() {
  return (
    <DepartmentPortal
      title="Engineering Hub"
      description="AI-powered assistants for developers and tech teams"
      agents={engineeringAgents}
      accentColor="chart-3"
    />
  );
}
