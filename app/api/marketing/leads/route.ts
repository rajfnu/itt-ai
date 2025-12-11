import { NextRequest, NextResponse } from 'next/server';
import { AgentResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AgentResponse>> {
  try {
    const body = await request.json();
    const { taskId, input } = body;

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (taskId === 'create-lead') {
      return NextResponse.json({
        success: true,
        data: {
          leadId: `LEAD-${Date.now()}`,
          companyName: input.companyName,
          contactName: input.contactName,
          email: input.email,
          source: input.source,
          status: 'new',
          score: 0,
          assignedTo: 'Lisa Martinez',
          createdAt: new Date().toISOString(),
          nextAction: 'Initial outreach within 24 hours',
        },
        message: `New lead created for ${input.companyName}. Assigned to sales team for follow-up.`,
        timestamp: new Date().toISOString(),
      });
    }

    if (taskId === 'score-lead') {
      return NextResponse.json({
        success: true,
        data: {
          leadEmail: input.leadEmail,
          leadId: 'LEAD-12345',
          companyName: 'Tech Solutions Inc',
          score: 85,
          scoreBreakdown: {
            companySize: 20,
            industry: 25,
            engagement: 25,
            budget: 15,
          },
          qualification: 'Hot Lead',
          recommendation: 'Schedule demo call immediately',
          predictedCloseRate: 72,
        },
        message: `Lead scored at 85/100 - Qualified as Hot Lead`,
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
    console.error('Leads API error:', error);
    return NextResponse.json({
      success: false,
      data: {},
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
