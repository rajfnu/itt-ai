'use client';

import { DepartmentPortal } from '@/components/agents/DepartmentPortal';
import { marketingAgents } from '@/data/mock-data';

export default function MarketingPage() {
  return (
    <DepartmentPortal
      title="Marketing Portal"
      description="AI-powered assistants for marketing and campaigns"
      agents={marketingAgents}
      accentColor="chart-5"
    />
  );
}
