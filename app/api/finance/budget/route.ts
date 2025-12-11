import { NextRequest, NextResponse } from 'next/server';
import { AgentResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AgentResponse>> {
  try {
    const body = await request.json();
    const { taskId, input } = body;

    await new Promise(resolve => setTimeout(resolve, 1100));

    if (taskId === 'check-budget') {
      const budgetData: Record<string, Record<string, { allocated: number; spent: number; remaining: number }>> = {
        engineering: {
          q1: { allocated: 500000, spent: 420000, remaining: 80000 },
          q2: { allocated: 550000, spent: 510000, remaining: 40000 },
          q3: { allocated: 520000, spent: 480000, remaining: 40000 },
          q4: { allocated: 600000, spent: 250000, remaining: 350000 },
        },
        hr: {
          q1: { allocated: 150000, spent: 130000, remaining: 20000 },
          q2: { allocated: 160000, spent: 155000, remaining: 5000 },
          q3: { allocated: 155000, spent: 140000, remaining: 15000 },
          q4: { allocated: 180000, spent: 90000, remaining: 90000 },
        },
        finance: {
          q1: { allocated: 120000, spent: 110000, remaining: 10000 },
          q2: { allocated: 125000, spent: 120000, remaining: 5000 },
          q3: { allocated: 130000, spent: 125000, remaining: 5000 },
          q4: { allocated: 140000, spent: 70000, remaining: 70000 },
        },
        marketing: {
          q1: { allocated: 300000, spent: 280000, remaining: 20000 },
          q2: { allocated: 350000, spent: 340000, remaining: 10000 },
          q3: { allocated: 320000, spent: 290000, remaining: 30000 },
          q4: { allocated: 400000, spent: 180000, remaining: 220000 },
        },
      };

      const dept = input.department?.toLowerCase() || 'engineering';
      const qtr = input.quarter?.toLowerCase() || 'q4';
      const data = budgetData[dept]?.[qtr] || { allocated: 0, spent: 0, remaining: 0 };

      return NextResponse.json({
        success: true,
        data: {
          department: input.department,
          quarter: input.quarter,
          ...data,
          utilizationRate: Math.round((data.spent / data.allocated) * 100),
          forecast: 'On track',
          alerts: data.remaining < data.allocated * 0.1 ? ['Budget nearly exhausted'] : [],
        },
        message: `Budget status for ${input.department} ${input.quarter}: ${Math.round((data.spent / data.allocated) * 100)}% utilized`,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: false,
      data: {},
      message: 'Unknown task',
      timestamp: new Date().toISOString(),
    }, { status: 400 });
  } catch (error) {
    console.error('Budget API error:', error);
    return NextResponse.json({
      success: false,
      data: {},
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
