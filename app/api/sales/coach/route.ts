import { NextRequest, NextResponse } from 'next/server';
import { AgentResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AgentResponse>> {
  try {
    const body = await request.json();
    const { message } = body;

    await new Promise(resolve => setTimeout(resolve, 1100));

    const lowerMessage = message?.toLowerCase() || '';

    let responseMessage = '';
    let responseData: Record<string, unknown> = {};

    if (lowerMessage.includes('expensive') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      responseMessage = `Great question! Here's how to handle the "too expensive" objection:

**1. Acknowledge & Explore**
"I appreciate you sharing that. Help me understand - when you say expensive, are you comparing to a specific alternative or your allocated budget?"

**2. Reframe to Value**
"Let's look at the total cost of ownership. Our solution typically saves clients 40% in maintenance costs over 3 years."

**3. Quantify the ROI**
"Based on similar projects, you'd likely see a 250% ROI within 18 months. Would it help if I put together a custom ROI analysis?"

**4. Offer Options**
"We have flexible engagement models. Would you prefer a phased approach that spreads the investment?"

**Key Tips:**
- Never immediately discount
- Always tie price to value
- Use success stories from similar clients

Would you like to practice this scenario?`;
      responseData = {
        objectionType: 'Price',
        techniques: ['Value Reframing', 'ROI Analysis', 'Phased Approach'],
        successRate: '72%'
      };
    } else if (lowerMessage.includes('strategy') || lowerMessage.includes('deal')) {
      responseMessage = `Let's develop a winning strategy for your deal. Based on best practices:

**Discovery Questions to Ask:**
1. What triggered this initiative now?
2. What happens if you don't solve this?
3. Who else is involved in the decision?
4. What does success look like in 12 months?

**Competitive Positioning:**
- Lead with our unique differentiators
- Focus on their specific pain points
- Demonstrate quick wins possible

**Next Steps Strategy:**
1. Get multi-stakeholder buy-in
2. Propose a small proof-of-concept
3. Build an internal champion

**Red Flags to Watch:**
- Single-threaded relationship
- Unclear decision timeline
- No defined budget

Tell me more about the specific deal and I'll tailor this advice.`;
      responseData = {
        dealStage: 'Discovery',
        keyActions: 4,
        riskLevel: 'Medium'
      };
    } else if (lowerMessage.includes('discovery') || lowerMessage.includes('question')) {
      responseMessage = `Here are powerful discovery questions for your call:

**Situation Questions:**
- "Walk me through your current process for [X]"
- "What tools/systems are you using today?"

**Problem Questions:**
- "What's the biggest challenge you're facing with [X]?"
- "How is this impacting your team/business?"

**Implication Questions:**
- "If this doesn't get solved, what happens in 6 months?"
- "What's the cost of the status quo?"

**Need-Payoff Questions:**
- "How would it help if you could [desired outcome]?"
- "What would solving this mean for your team?"

**Pro Tips:**
- Ask open-ended questions (avoid yes/no)
- Listen more than you talk (70/30 rule)
- Take notes and summarize back

Would you like me to roleplay this discovery call with you?`;
      responseData = {
        questionTypes: ['Situation', 'Problem', 'Implication', 'Need-Payoff'],
        methodology: 'SPIN Selling',
        listenRatio: '70/30'
      };
    } else if (lowerMessage.includes('practice') || lowerMessage.includes('pitch')) {
      responseMessage = `Let's practice your pitch! I'll act as the prospect.

**Scenario Setup:**
I'm the CTO of a mid-size fintech company. We're struggling with:
- Legacy systems slowing us down
- Compliance concerns with new regulations
- Pressure to launch new products faster

**Your Challenge:**
Deliver a 2-minute elevator pitch that:
1. Connects to my pain points
2. Differentiates InTimeTec
3. Proposes a clear next step

When you're ready, type your pitch and I'll give you feedback on:
- Message clarity
- Value proposition strength
- Call-to-action effectiveness

Ready when you are!`;
      responseData = {
        mode: 'Practice',
        scenario: 'Fintech CTO',
        focusAreas: ['Pain Points', 'Differentiation', 'CTA']
      };
    } else {
      responseMessage = `I'm your Sales Coach! I'm here to help you win more deals and grow your skills.

**How I Can Help:**

🎯 **Objection Handling**
"How do I respond when they say it's too expensive?"

📋 **Deal Strategy**
"Help me develop a strategy for the TechCorp deal"

❓ **Discovery Skills**
"What questions should I ask in my next call?"

🎤 **Pitch Practice**
"Let's practice my demo pitch"

📊 **Win/Loss Analysis**
"Why did we lose the XYZ deal?"

What sales challenge can I help you with today?`;
      responseData = {
        coachingAreas: ['Objections', 'Strategy', 'Discovery', 'Practice', 'Analysis'],
        sessionsThisMonth: 12,
        skillImprovement: '+15%'
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
    console.error('Coach API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Sorry, I encountered an error. Let\'s try again.',
      status: 'error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
