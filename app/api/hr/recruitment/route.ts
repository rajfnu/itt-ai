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
        jobPostings: [
          { id: 'JP-001', title: 'Senior Developer', applicants: 45, status: 'active' },
          { id: 'JP-002', title: 'UX Designer', applicants: 28, status: 'active' },
        ],
        scheduledInterviews: 8,
        pendingReviews: 12,
        ...input,
      },
      message: 'Recruitment task processed successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Recruitment API error:', error);
    return NextResponse.json({
      success: false,
      data: {},
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
