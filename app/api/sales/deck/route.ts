import { NextRequest, NextResponse } from 'next/server';
import { AgentResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AgentResponse>> {
  try {
    const body = await request.json();
    const { message } = body;

    await new Promise(resolve => setTimeout(resolve, 1500));

    const lowerMessage = message?.toLowerCase() || '';

    let responseMessage = '';
    let responseData: Record<string, unknown> = {};

    if (lowerMessage.includes('fintech') || lowerMessage.includes('digital transformation')) {
      responseMessage = `I've created a customized pitch deck for your fintech digital transformation opportunity:

**Deck Structure:**
1. **Cover Slide** - InTimeTec x [Client Name]
2. **Understanding Your Challenges** - Legacy systems, compliance, customer experience
3. **Our Approach** - Agile transformation methodology
4. **Digital Banking Solutions** - Core modernization, mobile-first
5. **Security & Compliance** - SOC2, PCI-DSS expertise
6. **Case Study** - Regional Bank: 40% cost reduction
7. **Team & Timeline** - Dedicated fintech experts
8. **Investment & ROI** - Projected 3x return in 2 years
9. **Next Steps** - Discovery workshop proposal

The deck is ready for download with your branding.`;
      responseData = {
        deckId: 'DECK-FIN-' + Date.now(),
        slides: 9,
        template: 'fintech-transformation',
        status: 'generated',
        downloadUrl: '/downloads/deck-fintech.pptx'
      };
    } else if (lowerMessage.includes('one-pager') || lowerMessage.includes('devops')) {
      responseMessage = `I've generated a DevOps Services one-pager:

**InTimeTec DevOps Services**

**What We Offer:**
- CI/CD Pipeline Design & Implementation
- Infrastructure as Code (Terraform, Ansible)
- Kubernetes & Container Orchestration
- Cloud-Native Architecture
- 24/7 Managed Services

**Key Metrics:**
- 70% faster deployment cycles
- 99.9% uptime SLA
- 50% reduction in infrastructure costs

**Certifications:** AWS DevOps Pro, Kubernetes Admin, Azure DevOps

The one-pager is ready in PDF format.`;
      responseData = {
        documentId: 'OP-DEVOPS-' + Date.now(),
        type: 'one-pager',
        format: 'PDF',
        downloadUrl: '/downloads/devops-one-pager.pdf'
      };
    } else {
      responseMessage = `I can help you create compelling sales materials. Here's what I can generate:

**Pitch Decks:**
- Industry-specific presentations
- Technical deep-dives
- Executive summaries
- ROI-focused proposals

**One-Pagers:**
- Service overviews
- Solution briefs
- Case study summaries
- Capability sheets

**Proposal Templates:**
- RFP responses
- SOW documents
- Pricing proposals

Tell me about your client and the opportunity, and I'll create the perfect materials!`;
      responseData = {
        availableTemplates: ['pitch-deck', 'one-pager', 'proposal', 'case-study'],
        industries: ['Healthcare', 'Finance', 'Retail', 'Government', 'Technology']
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
    console.error('Deck API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Sorry, I encountered an error creating your deck.',
      status: 'error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
