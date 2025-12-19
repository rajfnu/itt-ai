'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, UserRole } from '@/types';
import { executivePrompts } from '@/data/mock-data';
import {
  Crown,
  Users,
  DollarSign,
  Megaphone,
  Briefcase,
  Code,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
} from 'lucide-react';

const departmentCards = [
  {
    title: 'Finance',
    description: 'P&L, budgets, expenses, and financial reports',
    href: '/finance',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Sales',
    description: 'Pipeline, RFPs, deals, and revenue forecasts',
    href: '/sales',
    icon: Briefcase,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'HR',
    description: 'Headcount, hiring, attrition, and employee data',
    href: '/hr',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'Marketing',
    description: 'Campaigns, leads, ROI, and brand metrics',
    href: '/marketing',
    icon: Megaphone,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
  {
    title: 'Engineering',
    description: 'Product status, infrastructure, and tech health',
    href: '/engineering',
    icon: Code,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
];

const roleDescriptions: Record<string, { title: string; focus: string }> = {
  ceo: {
    title: 'Chief Executive Officer',
    focus: 'Strategic overview, business performance, and company health',
  },
  cio: {
    title: 'Chief Information Officer',
    focus: 'Technology infrastructure, security, and digital transformation',
  },
  coo: {
    title: 'Chief Operating Officer',
    focus: 'Operational efficiency, processes, and cross-functional alignment',
  },
};

export default function ExecutivePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('itt-user');
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        // Only allow C-level access
        if (!['ceo', 'cio', 'coo'].includes(parsedUser.role)) {
          router.push('/admin');
          return;
        }
        setUser(parsedUser);
      } catch {
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const roleInfo = roleDescriptions[user.role] || roleDescriptions.ceo;
  const userPrompts = executivePrompts[user.role as 'ceo' | 'cio' | 'coo'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100">
              <Crown className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Executive Dashboard</h1>
              <p className="text-muted-foreground">{roleInfo.focus}</p>
            </div>
          </div>
        </div>
        <Badge variant="outline" className="text-sm">
          {roleInfo.title}
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (Q4)</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$7.32M</div>
            <p className="text-xs text-muted-foreground">+12% from last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$18.5M</div>
            <p className="text-xs text-muted-foreground">45 active opportunities</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Headcount</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">+15 this quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Departments Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Department Portals</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {departmentCards.map((dept) => {
            const Icon = dept.icon;
            const deptKey = dept.title.toLowerCase();
            const prompts = userPrompts[deptKey as keyof typeof userPrompts] || [];

            return (
              <Link key={dept.href} href={dept.href}>
                <Card className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${dept.bgColor}`}>
                        <Icon className={`h-5 w-5 ${dept.color}`} />
                      </div>
                      <CardTitle className="text-lg">{dept.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CardDescription>{dept.description}</CardDescription>
                    {prompts.length > 0 && (
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground mb-2">Quick insights:</p>
                        <p className="text-xs italic text-muted-foreground line-clamp-1">
                          "{prompts[0]}"
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Role-specific Insights */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Suggested Questions for {user.role.toUpperCase()}</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(userPrompts).slice(0, 4).map(([category, prompts]) => (
                <div key={category} className="space-y-2">
                  <h3 className="text-sm font-medium capitalize">{category}</h3>
                  <ul className="space-y-1">
                    {(prompts as string[]).slice(0, 2).map((prompt, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {prompt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
