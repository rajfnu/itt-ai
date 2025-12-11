'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AIAgent } from '@/types';
import { AgentChat } from './AgentChat';
import {
  Bot,
  UserPlus,
  Calendar,
  TrendingUp,
  Search,
  FileText,
  Receipt,
  CreditCard,
  PieChart,
  DollarSign,
  BarChart,
  Target,
  Megaphone,
  Edit,
  Share2,
  LineChart,
  Lightbulb,
  Presentation,
  FileSearch,
  Radar,
  Sparkles,
  GraduationCap,
  BookOpen,
  Code,
  Boxes,
  Server,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  UserPlus,
  Calendar,
  TrendingUp,
  Search,
  FileText,
  Receipt,
  CreditCard,
  PieChart,
  DollarSign,
  BarChart,
  Target,
  Megaphone,
  Edit,
  Share2,
  LineChart,
  Lightbulb,
  Presentation,
  FileSearch,
  Radar,
  Sparkles,
  GraduationCap,
  BookOpen,
  Code,
  Boxes,
  Server,
};

interface DepartmentPortalProps {
  title: string;
  description: string;
  agents: AIAgent[];
  accentColor?: string;
}

export function DepartmentPortal({
  title,
  description,
  agents,
  accentColor = 'primary',
}: DepartmentPortalProps) {
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);

  // Group agents by category
  const agentsByCategory = agents.reduce((acc, agent) => {
    if (!acc[agent.category]) {
      acc[agent.category] = [];
    }
    acc[agent.category].push(agent);
    return acc;
  }, {} as Record<string, AIAgent[]>);

  if (selectedAgent) {
    return (
      <div className="space-y-4">
        <AgentChat agent={selectedAgent} onBack={() => setSelectedAgent(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* Agents Grid by Category */}
      {Object.entries(agentsByCategory).map(([category, categoryAgents]) => (
        <div key={category} className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {category}
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryAgents.map((agent) => {
              const Icon = iconMap[agent.icon] || Bot;
              return (
                <Card
                  key={agent.id}
                  className={cn(
                    'cursor-pointer transition-all hover:shadow-lg group',
                    'hover:border-primary/50 hover:-translate-y-0.5'
                  )}
                  onClick={() => setSelectedAgent(agent)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div
                        className={cn(
                          'p-2.5 rounded-xl transition-colors',
                          `bg-${accentColor}/10 group-hover:bg-${accentColor}/20`
                        )}
                        style={{
                          backgroundColor: `hsl(var(--${accentColor}) / 0.1)`,
                        }}
                      >
                        <Icon
                          className="h-5 w-5"
                          style={{ color: `hsl(var(--${accentColor}))` }}
                        />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        AI Agent
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-3">{agent.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CardDescription className="line-clamp-2">
                      {agent.description}
                    </CardDescription>

                    {/* Capabilities preview */}
                    <div className="flex flex-wrap gap-1">
                      {agent.capabilities.slice(0, 3).map((cap, index) => (
                        <span
                          key={index}
                          className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full"
                        >
                          {cap.split(' ').slice(0, 2).join(' ')}
                        </span>
                      ))}
                      {agent.capabilities.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{agent.capabilities.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Suggested prompt preview */}
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground italic line-clamp-1">
                        "{agent.suggestedPrompts[0]}"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
