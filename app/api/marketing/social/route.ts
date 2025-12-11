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
        platforms: ['LinkedIn', 'Twitter', 'Facebook', 'Instagram'],
        scheduledPosts: 12,
        publishedThisWeek: 8,
        engagement: {
          likes: 1250,
          shares: 340,
          comments: 89,
          reach: 45000,
        },
        topPerformingPost: {
          platform: 'LinkedIn',
          content: 'Product announcement...',
          engagement: 520,
        },
        ...input,
      },
      message: 'Social media task processed successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Social API error:', error);
    return NextResponse.json({
      success: false,
      data: {},
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
