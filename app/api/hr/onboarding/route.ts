import { NextRequest, NextResponse } from 'next/server';
import { AgentResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AgentResponse>> {
  try {
    const body = await request.json();
    const { message } = body;

    await new Promise(resolve => setTimeout(resolve, 1200));

    const lowerMessage = message?.toLowerCase() || '';

    let responseMessage = '';
    let responseData: Record<string, unknown> = {};

    if (lowerMessage.includes('start') || lowerMessage.includes('new') || lowerMessage.includes('initiate')) {
      // Extract potential employee name from message
      const nameMatch = lowerMessage.match(/for\s+([a-zA-Z\s]+?)(?:\s+joining|\s+starting|$)/i);
      const employeeName = nameMatch ? nameMatch[1].trim() : 'New Employee';

      responseMessage = `I've initiated the onboarding process for **${employeeName}**:

**Onboarding Checklist Created:**
✅ Welcome email sent
✅ IT equipment request submitted
⏳ Access card - Pending (1-2 days)
⏳ Email account setup - In progress
⏳ Orientation scheduled - Pending your confirmation

**Next Steps:**
1. Confirm the start date
2. Assign a buddy/mentor
3. Schedule team introduction

**Documents Generated:**
- Welcome packet (PDF)
- IT setup request form
- Benefits enrollment guide

The hiring manager will receive a notification. Would you like me to schedule the orientation or assign a buddy?`;
      responseData = {
        onboardingId: 'ONB-' + Date.now(),
        employee: employeeName,
        status: 'initiated',
        tasksComplete: 2,
        tasksPending: 3,
        documentsGenerated: 3
      };
    } else if (lowerMessage.includes('status') || lowerMessage.includes('progress')) {
      const emailMatch = lowerMessage.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
      const email = emailMatch ? emailMatch[1] : 'employee@intimetec.com';

      responseMessage = `**Onboarding Status for ${email}:**

📊 **Overall Progress: 75%**

**Completed Tasks:**
✅ Welcome email sent - Jan 5
✅ IT equipment delivered - Jan 8
✅ Email account created - Jan 6
✅ Orientation attended - Jan 10
✅ Team introduction done - Jan 10
✅ Buddy assigned (Sarah Johnson)

**In Progress:**
⏳ Benefits enrollment (Due: Jan 15)
⏳ Security training (Due: Jan 20)

**Upcoming:**
📅 30-day check-in scheduled for Feb 5
📅 First project assignment pending

The employee is on track! Benefits enrollment is the next priority.`;
      responseData = {
        email: email,
        progress: 75,
        completedTasks: 6,
        pendingTasks: 2,
        nextCheckIn: 'Feb 5, 2024'
      };
    } else if (lowerMessage.includes('welcome') || lowerMessage.includes('packet')) {
      responseMessage = `I've generated a welcome packet! Here's what's included:

**Welcome Packet Contents:**

📄 **Welcome Letter**
- Personalized greeting from CEO
- Company mission and values
- First week expectations

📋 **Quick Start Guide**
- Building access and parking
- Key contacts and resources
- IT setup instructions

📚 **Policy Documents**
- Employee handbook
- Code of conduct
- Remote work policy

🎁 **First Day Checklist**
- Where to go on day one
- What to bring
- Team meeting schedule

**Delivery Options:**
- Email to new hire ✉️
- Print for desk welcome 🖨️
- Share with hiring manager 👥

Would you like me to send this packet now?`;
      responseData = {
        packetId: 'WP-' + Date.now(),
        documents: 4,
        format: ['PDF', 'Email'],
        status: 'ready'
      };
    } else if (lowerMessage.includes('orientation') || lowerMessage.includes('schedule')) {
      responseMessage = `Here are the upcoming orientation sessions:

**Available Sessions:**

📅 **Monday, Jan 15 - 9:00 AM**
- Capacity: 8/12 spots available
- Location: Conference Room A (Hybrid)

📅 **Wednesday, Jan 17 - 2:00 PM**
- Capacity: 10/12 spots available
- Location: Virtual only

📅 **Monday, Jan 22 - 9:00 AM**
- Capacity: 12/12 spots available
- Location: Conference Room A (Hybrid)

**Orientation Agenda (4 hours):**
1. Company overview & culture
2. Benefits and HR policies
3. IT systems training
4. Security awareness
5. Q&A with leadership

Which session would you like to enroll the new hire in?`;
      responseData = {
        availableSessions: 3,
        nextSession: 'Jan 15, 9:00 AM',
        duration: '4 hours',
        format: 'Hybrid'
      };
    } else {
      responseMessage = `Hi! I'm your Onboarding Assistant. I help make new hire onboarding smooth and efficient.

**What I Can Do:**

👤 **Start Onboarding**
"Start onboarding for Sarah joining as a developer next Monday"

📊 **Check Status**
"What is the onboarding status for john@intimetec.com?"

📦 **Generate Documents**
"Create a welcome packet for the marketing team"

📅 **Schedule Orientation**
"Schedule orientation for new hires this month"

**Current Stats:**
- Active onboardings: 5
- Completed this month: 12
- Average time to productivity: 2 weeks

How can I help you today?`;
      responseData = {
        activeOnboardings: 5,
        completedThisMonth: 12,
        avgTimeToProductivity: '2 weeks'
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
    console.error('Onboarding API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Sorry, I encountered an error. Please try again.',
      status: 'error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
