import { NextRequest, NextResponse } from 'next/server';
import { AgentResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AgentResponse>> {
  try {
    const body = await request.json();
    const { message } = body;

    await new Promise(resolve => setTimeout(resolve, 1400));

    const lowerMessage = message?.toLowerCase() || '';

    let responseMessage = '';
    let responseData: Record<string, unknown> = {};

    if (lowerMessage.includes('it modernization') || lowerMessage.includes('this week')) {
      responseMessage = `Found 5 IT Modernization RFPs posted this week:

**1. State of California - IT Infrastructure Modernization**
- Budget: $5-10M | Due: Feb 15, 2024
- Match Score: 92% 🔥
- [View Details]

**2. Department of Veterans Affairs - Cloud Migration**
- Budget: $2-5M | Due: Feb 20, 2024
- Match Score: 88%
- [View Details]

**3. City of Austin - Digital Services Platform**
- Budget: $1-2M | Due: Feb 18, 2024
- Match Score: 85%
- [View Details]

**4. US Army - Legacy System Replacement**
- Budget: $10M+ | Due: Mar 1, 2024
- Match Score: 78%
- [View Details]

**5. Florida DOT - Cloud Infrastructure**
- Budget: $3-5M | Due: Feb 25, 2024
- Match Score: 82%
- [View Details]

Would you like me to set up alerts for similar opportunities?`;
      responseData = {
        totalFound: 5,
        highMatches: 3,
        totalValue: '$21-32M',
        sources: ['SAM.gov', 'GovWin', 'State Portals']
      };
    } else if (lowerMessage.includes('federal') || lowerMessage.includes('healthcare')) {
      responseMessage = `Found 3 Federal Healthcare IT opportunities:

**1. CMS - Medicare Claims Processing Modernization**
- Agency: Centers for Medicare & Medicaid
- Budget: $15-25M | Due: Mar 10, 2024
- Match Score: 95% 🔥
- Set-aside: Small Business

**2. NIH - Research Data Platform**
- Agency: National Institutes of Health
- Budget: $5-8M | Due: Feb 28, 2024
- Match Score: 87%
- Full & Open Competition

**3. VA - Telehealth Expansion**
- Agency: Veterans Affairs
- Budget: $8-12M | Due: Mar 5, 2024
- Match Score: 84%
- SDVOSB Set-aside

These match well with our healthcare IT experience.`;
      responseData = {
        opportunities: 3,
        totalValue: '$28-45M',
        avgMatchScore: 89,
        smallBusinessSetAsides: 2
      };
    } else if (lowerMessage.includes('alert') || lowerMessage.includes('set up')) {
      responseMessage = `I've configured the following RFP alerts for you:

**Active Alerts:**
1. ✅ AI/ML Opportunities - Federal & State
2. ✅ Cloud Migration - All sectors
3. ✅ Healthcare IT - Federal only
4. ✅ Digital Transformation - $1M+ value

**Alert Settings:**
- Frequency: Daily digest at 8 AM
- Match threshold: 70%+
- Notification: Email + In-app

You'll receive your first digest tomorrow morning. I'll flag any urgent opportunities (due within 14 days) immediately.`;
      responseData = {
        alertsActive: 4,
        frequency: 'daily',
        threshold: '70%',
        nextDigest: '8 AM tomorrow'
      };
    } else {
      responseMessage = `I'm your RFP Hunter! I continuously scan government and commercial procurement portals for opportunities that match our capabilities.

**What I Can Do:**
- Search for new RFPs by keyword, industry, or agency
- Match opportunities to our capabilities
- Track RFP deadlines and updates
- Set up custom alerts
- Analyze competition on specific bids

**Current Stats:**
- Monitoring: 15+ procurement portals
- New RFPs this week: 127
- High-match opportunities: 23

What type of opportunities are you looking for?`;
      responseData = {
        portalsMonitored: 15,
        weeklyRfps: 127,
        highMatches: 23,
        avgMatchRate: '18%'
      };
    }

    return NextResponse.json({
      success: true,
      message: responseMessage,
      data: responseData,
      status: 'complete',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('RFP Search API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Sorry, I encountered an error searching for RFPs.',
      status: 'error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
