import { NextRequest, NextResponse } from 'next/server';
import { AgentResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AgentResponse>> {
  try {
    const body = await request.json();
    const { taskId, input } = body;

    await new Promise(resolve => setTimeout(resolve, 1200));

    return NextResponse.json({
      success: true,
      data: {
        taskId,
        reportType: 'Financial Summary',
        period: 'Q4 2024',
        revenue: 2500000,
        expenses: 1800000,
        netIncome: 700000,
        profitMargin: 28,
        yearOverYear: {
          revenueGrowth: 15,
          expenseGrowth: 8,
          profitGrowth: 22,
        },
        ...input,
      },
      message: 'Financial report generated successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Report API error:', error);
    return NextResponse.json({
      success: false,
      data: {},
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
