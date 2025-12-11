import { NextRequest, NextResponse } from 'next/server';
import { AgentResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AgentResponse>> {
  try {
    const body = await request.json();
    const { taskId, input } = body;

    await new Promise(resolve => setTimeout(resolve, 1500));

    if (taskId === 'generate-content') {
      const contentTemplates: Record<string, string> = {
        blog: `# ${input.topic}\n\nIn today's fast-paced business environment, ${input.topic?.toLowerCase()} has become more important than ever. This comprehensive guide will walk you through everything you need to know...\n\n## Key Takeaways\n- Point 1: Understanding the fundamentals\n- Point 2: Best practices for implementation\n- Point 3: Measuring success\n\n## Conclusion\nBy following these strategies, your organization can stay ahead of the competition...`,
        social: `🚀 Excited to share our latest insights on ${input.topic}!\n\nKey benefits:\n✅ Increased efficiency\n✅ Better ROI\n✅ Competitive advantage\n\nLearn more: [link]\n\n#Business #Innovation #Growth`,
        email: `Subject: Discover How ${input.topic} Can Transform Your Business\n\nHi [First Name],\n\nWe know that ${input.topic?.toLowerCase()} is top of mind for leaders like you. That's why we've put together this exclusive guide...\n\nWhat you'll learn:\n• Strategy 1\n• Strategy 2\n• Strategy 3\n\n[CTA Button: Get Started Today]\n\nBest regards,\nThe InTimeTec Team`,
        ad: `${input.topic} | Transform Your Business Today\n\nTired of [pain point]? Our solution helps you achieve [benefit] in just [timeframe].\n\n✓ Feature 1\n✓ Feature 2\n✓ Feature 3\n\n→ Start your free trial today`,
      };

      return NextResponse.json({
        success: true,
        data: {
          contentType: input.contentType,
          topic: input.topic,
          tone: input.tone,
          generatedContent: contentTemplates[input.contentType] || 'Content generated successfully',
          wordCount: 250,
          readabilityScore: 72,
          seoScore: 85,
          suggestedHashtags: ['#Business', '#Innovation', '#Growth', '#Leadership'],
        },
        message: `${input.contentType} content generated successfully`,
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
    console.error('Content API error:', error);
    return NextResponse.json({
      success: false,
      data: {},
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
