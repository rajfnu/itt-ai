import { NextRequest, NextResponse } from 'next/server';
import { AgentResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AgentResponse>> {
  try {
    const body = await request.json();
    const { taskId, input } = body;

    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      data: {
        taskId,
        payrollPeriod: 'January 2024',
        totalEmployees: 125,
        grossPayroll: 875000,
        deductions: {
          tax: 175000,
          benefits: 45000,
          retirement: 35000,
        },
        netPayroll: 620000,
        nextPayDate: '2024-01-31',
        ...input,
      },
      message: 'Payroll task processed successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Payroll API error:', error);
    return NextResponse.json({
      success: false,
      data: {},
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
