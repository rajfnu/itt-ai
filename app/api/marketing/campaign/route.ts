import { NextRequest, NextResponse } from 'next/server';
import { AgentResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AgentResponse>> {
  try {
    const body = await request.json();
    const { taskId, input } = body;

    await new Promise(resolve => setTimeout(resolve, 1200));

    if (taskId === 'create-campaign') {
      return NextResponse.json({
        success: true,
        data: {
          campaignId: `CAMP-${Date.now()}`,
          campaignName: input.campaignName,
          objective: input.objective,
          budget: input.budget,
          startDate: input.startDate,
          endDate: input.endDate,
          status: 'draft',
          channels: ['Email', 'Social Media', 'Display Ads'],
          targetAudience: 'B2B Decision Makers',
          expectedReach: Math.round(input.budget * 10),
          estimatedROI: '3.5x',
        },
        message: `Campaign "${input.campaignName}" created successfully. Ready for launch.`,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        taskId,
        activeCampaigns: [
          { id: 'CAMP-001', name: 'Q4 Product Launch', status: 'active', performance: 'exceeding' },
          { id: 'CAMP-002', name: 'Holiday Promotion', status: 'active', performance: 'on-track' },
        ],
        totalBudget: 50000,
        spent: 32000,
        ...input,
      },
      message: 'Campaign task processed successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Campaign API error:', error);
    return NextResponse.json({
      success: false,
      data: {},
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
