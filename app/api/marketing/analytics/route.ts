import { NextRequest, NextResponse } from 'next/server';
import { AgentResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AgentResponse>> {
  try {
    const body = await request.json();
    const { taskId, input } = body;

    await new Promise(resolve => setTimeout(resolve, 1100));

    return NextResponse.json({
      success: true,
      data: {
        taskId,
        period: 'Last 30 days',
        kpis: {
          websiteVisits: 125000,
          uniqueVisitors: 78000,
          bounceRate: 42,
          avgSessionDuration: '3:45',
          conversionRate: 3.2,
        },
        channelPerformance: [
          { channel: 'Organic Search', visits: 45000, conversions: 1200 },
          { channel: 'Paid Search', visits: 32000, conversions: 890 },
          { channel: 'Social Media', visits: 28000, conversions: 450 },
          { channel: 'Email', visits: 20000, conversions: 680 },
        ],
        topContent: [
          { page: '/product-demo', views: 8500 },
          { page: '/pricing', views: 6200 },
          { page: '/blog/ai-trends', views: 4800 },
        ],
        roi: {
          spend: 25000,
          revenue: 87500,
          roi: 250,
        },
        ...input,
      },
      message: 'Marketing analytics report generated',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({
      success: false,
      data: {},
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
