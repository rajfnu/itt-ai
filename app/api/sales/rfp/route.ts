import { NextRequest, NextResponse } from 'next/server';
import { AgentResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AgentResponse>> {
  try {
    const body = await request.json();
    const { message } = body;

    await new Promise(resolve => setTimeout(resolve, 1300));

    const lowerMessage = message?.toLowerCase() || '';

    let responseMessage = '';
    let responseData: Record<string, unknown> = {};

    if (lowerMessage.includes('analyze') || lowerMessage.includes('requirement')) {
      responseMessage = `I've analyzed the RFP and identified the following key requirements:

**Mandatory Requirements (Must Have):**
1. SOC2 Type II certification - ✅ We have this
2. 5+ years enterprise experience - ✅ 15+ years
3. Agile/Scrum methodology - ✅ Certified teams
4. 24/7 support capability - ✅ Global delivery

**Technical Requirements:**
- Cloud-native architecture (AWS preferred)
- Microservices design pattern
- API-first approach
- CI/CD automation

**Evaluation Criteria:**
- Technical approach: 40%
- Past performance: 25%
- Price: 20%
- Team qualifications: 15%

**Deadline:** 30 days from posting
**Budget Range:** $500K - $1M (estimated)

I recommend prioritizing the technical approach section.`;
      responseData = {
        mandatoryMet: 4,
        mandatoryTotal: 4,
        evaluationWeights: { technical: 40, pastPerformance: 25, price: 20, team: 15 },
        deadline: '30 days',
        budgetEstimate: '$500K - $1M'
      };
    } else if (lowerMessage.includes('technical approach') || lowerMessage.includes('draft')) {
      responseMessage = `Here's a draft for the Technical Approach section:

**1. Solution Overview**
Our proposed solution leverages a modern, cloud-native architecture designed for scalability, security, and maintainability...

**2. Architecture Design**
We recommend a microservices-based approach using:
- Containerized services on Kubernetes
- Event-driven communication via message queues
- API Gateway for unified access control

**3. Technology Stack**
- Backend: Node.js/Python microservices
- Frontend: React with TypeScript
- Database: PostgreSQL + Redis caching
- Infrastructure: AWS EKS, Terraform IaC

**4. Development Methodology**
Two-week sprints with continuous delivery...

Shall I expand on any section or add specific details?`;
      responseData = {
        sections: ['Solution Overview', 'Architecture', 'Tech Stack', 'Methodology'],
        wordCount: 2500,
        completeness: '70%'
      };
    } else if (lowerMessage.includes('past') || lowerMessage.includes('cloud migration')) {
      responseMessage = `Found 3 relevant past responses about cloud migration:

**1. State DOT Cloud Migration (2023)**
- Migrated legacy mainframe to AWS
- 18-month project, $2.4M value
- Won - scored 95/100

**2. Healthcare System Modernization (2023)**
- Azure migration with HIPAA compliance
- 12-month project, $1.8M value
- Won - scored 92/100

**3. Financial Services AWS Migration (2022)**
- Multi-region DR setup
- 24-month project, $3.2M value
- Won - scored 88/100

I can pull content from any of these for your current response.`;
      responseData = {
        matchingResponses: 3,
        winRate: '100%',
        totalValue: '$7.4M',
        avgScore: 92
      };
    } else {
      responseMessage = `I'm your RFP response assistant. I can help you with:

**RFP Analysis:**
- Extract and summarize requirements
- Identify compliance gaps
- Highlight evaluation criteria
- Assess win probability

**Response Drafting:**
- Technical approach sections
- Management approach
- Past performance narratives
- Pricing strategies

**Content Library:**
- Search past winning proposals
- Find relevant case studies
- Access boilerplate content

Upload an RFP or describe what you need, and I'll help you craft a winning response!`;
      responseData = {
        librarySize: 150,
        winRate: '68%',
        avgResponseTime: '5 days'
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
    console.error('RFP API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Sorry, I encountered an error processing your RFP request.',
      status: 'error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
