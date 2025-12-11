import { NextRequest, NextResponse } from 'next/server';
import { AgentResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AgentResponse>> {
  try {
    const body = await request.json();
    const { taskId, input } = body;

    await new Promise(resolve => setTimeout(resolve, 800));

    if (taskId === 'check-leave-balance') {
      return NextResponse.json({
        success: true,
        data: {
          employee: input.employeeEmail,
          balances: {
            vacation: { available: 12, used: 8, total: 20 },
            sick: { available: 5, used: 3, total: 8 },
            personal: { available: 2, used: 1, total: 3 },
          },
          pendingRequests: 1,
          nextAccrual: '2024-02-01',
        },
        message: `Leave balance retrieved for ${input.employeeEmail}`,
        timestamp: new Date().toISOString(),
      });
    }

    if (taskId === 'process-leave-request') {
      return NextResponse.json({
        success: true,
        data: {
          requestId: `LV-${Date.now()}`,
          employee: input.employeeEmail,
          leaveType: input.leaveType,
          startDate: input.startDate,
          endDate: input.endDate,
          status: 'pending_approval',
          approver: 'Sarah Johnson',
          daysRequested: 3,
        },
        message: `Leave request submitted successfully. Awaiting manager approval.`,
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
    console.error('Leave API error:', error);
    return NextResponse.json({
      success: false,
      data: {},
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
