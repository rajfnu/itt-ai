'use client';

import { DepartmentPortal } from '@/components/agents/DepartmentPortal';
import { financeAgents } from '@/data/mock-data';

export default function FinancePage() {
  return (
    <DepartmentPortal
      title="Finance Portal"
      description="AI-powered assistants for financial operations"
      agents={financeAgents}
      accentColor="secondary"
    />
  );
}
