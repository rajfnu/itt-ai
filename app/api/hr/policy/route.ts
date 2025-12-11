import { NextRequest, NextResponse } from 'next/server';
import { AgentResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AgentResponse>> {
  try {
    const body = await request.json();
    const { taskId, input } = body;

    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({
      success: true,
      data: {
        taskId,
        policies: [
          { id: 'POL-001', name: 'Remote Work Policy', lastUpdated: '2024-01-01' },
          { id: 'POL-002', name: 'Travel Expense Policy', lastUpdated: '2023-12-15' },
          { id: 'POL-003', name: 'Code of Conduct', lastUpdated: '2023-11-01' },
        ],
        complianceRate: 95,
        ...input,
      },
      message: 'Policy task processed successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Policy API error:', error);
    return NextResponse.json({
      success: false,
      data: {},
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
