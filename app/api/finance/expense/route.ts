import { NextRequest, NextResponse } from 'next/server';
import { AgentResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AgentResponse>> {
  try {
    const body = await request.json();
    const { taskId, input } = body;

    await new Promise(resolve => setTimeout(resolve, 900));

    return NextResponse.json({
      success: true,
      data: {
        taskId,
        expenseReports: [
          { id: 'EXP-001', employee: 'John Doe', amount: 1250, status: 'pending' },
          { id: 'EXP-002', employee: 'Jane Smith', amount: 890, status: 'approved' },
        ],
        monthlyTotal: 45000,
        categorySummary: {
          travel: 18000,
          meals: 5000,
          supplies: 12000,
          software: 10000,
        },
        ...input,
      },
      message: 'Expense task processed successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Expense API error:', error);
    return NextResponse.json({
      success: false,
      data: {},
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
