'use client';

import { DepartmentPortal } from '@/components/agents/DepartmentPortal';
import { salesAgents } from '@/data/mock-data';

export default function SalesPage() {
  return (
    <DepartmentPortal
      title="Sales Portal"
      description="AI-powered assistants for sales and business development"
      agents={salesAgents}
      accentColor="chart-4"
    />
  );
}
