import { NextRequest, NextResponse } from 'next/server';
import { AgentResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AgentResponse>> {
  try {
    const body = await request.json();
    const { message } = body;

    await new Promise(resolve => setTimeout(resolve, 1000));

    const lowerMessage = message?.toLowerCase() || '';

    let responseMessage = '';
    let responseData: Record<string, unknown> = {};

    if (lowerMessage.includes('cloud') || lowerMessage.includes('certification') || lowerMessage.includes('aws')) {
      responseMessage = `Here are recommended certifications for cloud architecture:

**Recommended Path:**

1. **AWS Solutions Architect Associate** (Start here)
   - Duration: 4-6 weeks of study
   - Cost: $150 exam fee (company sponsored)
   - Available: Internal prep course starting Jan 15

2. **AWS Solutions Architect Professional**
   - Duration: 8-12 weeks after Associate
   - Prerequisite: Associate certification

3. **Kubernetes Administrator (CKA)**
   - Duration: 6-8 weeks
   - Hands-on labs available in our sandbox

**Learning Resources:**
- A Cloud Guru subscription (company-provided)
- AWS Skill Builder
- Internal study groups (Thursdays 4 PM)

**Your Current Progress:**
- AWS Cloud Practitioner: ✅ Completed
- AWS Associate: 📝 In Progress (60%)

Would you like me to enroll you in the upcoming study group?`;
      responseData = {
        recommendedCerts: ['AWS SA Associate', 'AWS SA Pro', 'CKA'],
        currentProgress: 60,
        nextExamDate: 'Jan 30, 2024',
        studyGroupAvailable: true
      };
    } else if (lowerMessage.includes('kubernetes') || lowerMessage.includes('k8s')) {
      responseMessage = `Here are the best resources to learn Kubernetes:

**Beginner Track:**
1. "Kubernetes for Developers" - Internal Course (8 hours)
2. Kubernetes.io Official Tutorial
3. "Kubernetes in Action" book (library)

**Hands-On Labs:**
- Internal K8s Sandbox: sandbox.intimetec.com/k8s
- Katacoda Interactive Labs
- killer.sh for CKA prep

**Learning Path:**
Week 1-2: Core concepts (Pods, Services, Deployments)
Week 3-4: ConfigMaps, Secrets, Volumes
Week 5-6: Networking and Ingress
Week 7-8: Helm, Operators, Best Practices

**Internal Experts:**
- @david-devops - K8s architecture
- @emily-sre - Production operations

Want me to create a personalized learning plan?`;
      responseData = {
        courses: 3,
        estimatedTime: '8 weeks',
        sandboxAccess: true,
        mentorsAvailable: 2
      };
    } else if (lowerMessage.includes('tech lead') || lowerMessage.includes('leadership')) {
      responseMessage = `Here's a learning path for becoming a Tech Lead:

**Technical Excellence (Months 1-3)**
- System Design fundamentals
- Architecture patterns course
- Code review best practices

**Leadership Skills (Months 4-6)**
- "The Manager's Path" book club
- Giving effective feedback workshop
- Conflict resolution training

**Communication (Months 7-9)**
- Technical writing course
- Presentation skills workshop
- Stakeholder management

**Practical Experience:**
- Lead a small project (assigned by manager)
- Mentor a junior developer
- Present at tech talks

**Upcoming Opportunities:**
- Tech Lead shadow program (Feb cohort)
- Architecture review board participation

Your manager has been notified of your interest.`;
      responseData = {
        pathDuration: '9 months',
        modules: ['Technical', 'Leadership', 'Communication'],
        nextMilestone: 'Shadow Program Feb',
        managerNotified: true
      };
    } else {
      responseMessage = `Welcome to your Training Assistant! I help you grow your technical skills.

**What I Can Do:**
- Recommend learning paths and certifications
- Find courses and resources
- Track your learning progress
- Connect you with mentors

**Popular Requests:**
- "What certifications should I get for [role]?"
- "Find me resources to learn [technology]"
- "What trainings are happening this month?"
- "Show my learning progress"

**Upcoming Training Sessions:**
- Jan 15: AWS SA Prep Bootcamp
- Jan 22: React Advanced Patterns
- Jan 29: System Design Interview Prep

What would you like to learn?`;
      responseData = {
        upcomingTrainings: 3,
        yourEnrollments: 1,
        hoursThisQuarter: 24,
        certifications: 2
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
    console.error('Training API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Sorry, I encountered an error. Please try again.',
      status: 'error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
