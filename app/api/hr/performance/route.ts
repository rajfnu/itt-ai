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
        reviewPeriod: 'Q4 2024',
        template: 'Standard Performance Review',
        sections: [
          'Goals Achievement',
          'Core Competencies',
          'Development Areas',
          'Manager Feedback',
        ],
        dueDate: '2024-01-15',
        ...input,
      },
      message: 'Performance review task processed successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Performance API error:', error);
    return NextResponse.json({
      success: false,
      data: {},
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
