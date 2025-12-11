from fastapi import APIRouter
import asyncio
from datetime import datetime

from models import AgentRequest, AgentResponse

router = APIRouter()


@router.post("/capabilities", response_model=AgentResponse, summary="Capabilities Expert")
async def capabilities_agent(request: AgentRequest):
    """
    AI Agent for product/service knowledge.

    Capabilities:
    - Explain product features
    - Compare services
    - Provide case studies
    - Answer technical questions
    """
    await asyncio.sleep(1.0)
    msg = request.message.lower()

    if "ai" in msg or "ml" in msg:
        return AgentResponse(
            success=True,
            message="""**InTimeTec AI/ML Capabilities:**

🤖 **Core AI Services:**
- Custom ML model development
- Predictive analytics
- Computer Vision
- NLP & Generative AI

**Tech Stack:** PyTorch, TensorFlow, AWS SageMaker

**Case Studies:**
1. HealthCo - 60% faster diagnosis with ML
2. FinanceFirst - $2M/year fraud savings""",
            data={"capabilities": ["ML", "Computer Vision", "GenAI"], "caseStudies": 3}
        )
    elif "cloud" in msg:
        return AgentResponse(
            success=True,
            message="""**Cloud Migration Services:**

☁️ AWS Expert (25+ certified)
☁️ Azure Expert (20+ certified)
☁️ GCP Advanced (12+ certified)

- 100+ migrations completed
- 35% avg cost savings
- 99.9% uptime during migration""",
            data={"platforms": ["AWS", "Azure", "GCP"], "migrationsCompleted": 100}
        )
    else:
        return AgentResponse(
            success=True,
            message="Hi! I'm your Capabilities Expert. Ask me about:\n- AI/ML capabilities\n- Cloud services\n- Case studies\n- Technology stack",
            data={"services": ["AI/ML", "Cloud", "Custom Dev", "Data Analytics"]}
        )


@router.post("/deck", response_model=AgentResponse, summary="Deck Builder")
async def deck_agent(request: AgentRequest):
    """AI Agent for creating sales presentations and pitch decks"""
    await asyncio.sleep(1.5)
    msg = request.message.lower()

    if "create" in msg or "build" in msg or "fintech" in msg:
        return AgentResponse(
            success=True,
            message=f"""**Pitch Deck Created (12 slides):**

1. Cover - InTimeTec Partnership
2. Understanding Your Challenge
3. Our Approach
4-6. Solution Components
7-8. Case Studies
9. Team & Experience
10. Timeline & Investment
11. Why InTimeTec
12. Next Steps

📥 Download: [PPTX] [PDF]""",
            data={"deckId": f"DECK-{int(datetime.now().timestamp())}", "slides": 12}
        )
    else:
        return AgentResponse(
            success=True,
            message="Hi! I'm your Deck Builder. I create:\n- Pitch decks\n- One-pagers\n- Executive summaries\n- Custom proposals",
            data={"templatesAvailable": 12}
        )


@router.post("/rfp", response_model=AgentResponse, summary="RFP Responder")
async def rfp_agent(request: AgentRequest):
    """AI Agent for RFP analysis and response generation"""
    await asyncio.sleep(1.3)
    msg = request.message.lower()

    if "analyze" in msg:
        return AgentResponse(
            success=True,
            message="""**RFP Analysis Complete:**

📋 RFP: State of California IT Modernization
💰 Value: $5-10M
📅 Due: February 15, 2024

**Compliance:** 92% requirements met
⚠️ Gap: FedRAMP (in progress)

**Evaluation Criteria:**
- Technical: 40%
- Past Performance: 25%
- Price: 20%""",
            data={"rfpNumber": "CDT-2024-089", "complianceScore": 92, "value": "$5-10M"}
        )
    else:
        return AgentResponse(
            success=True,
            message="Hi! I'm your RFP Responder. I help:\n- Analyze RFPs\n- Draft responses\n- Find past proposals\n- Check compliance",
            data={"totalResponses": 45, "winRate": 71}
        )


@router.post("/rfp-search", response_model=AgentResponse, summary="RFP Hunter")
async def rfp_search_agent(request: AgentRequest):
    """AI Agent for searching and tracking RFP opportunities"""
    await asyncio.sleep(1.2)
    msg = request.message.lower()

    if "find" in msg or "search" in msg:
        return AgentResponse(
            success=True,
            message="""**IT Modernization RFPs Found (8):**

1. ⭐ State of Ohio - $15-20M - Match: 95%
2. ⭐ NYC Education - $8-12M - Match: 88%
3. Florida DOT - $6-8M - Match: 85%
4. US Army Corps - $10-15M - Match: 82%""",
            data={"totalFound": 8, "highMatch": 4, "totalValue": 65000000}
        )
    else:
        return AgentResponse(
            success=True,
            message="Hi! I'm your RFP Hunter. I can:\n- Search for new RFPs\n- Match to capabilities\n- Set up alerts\n- Track deadlines",
            data={"activeOpportunities": 45, "pipelineValue": 180000000}
        )


@router.post("/coach", response_model=AgentResponse, summary="Sales Coach")
async def coach_agent(request: AgentRequest):
    """AI Agent for sales coaching and deal strategy"""
    await asyncio.sleep(1.0)
    msg = request.message.lower()

    if "expensive" in msg or "price" in msg:
        return AgentResponse(
            success=True,
            message="""**Handling "Too Expensive" Objection:**

**A.C.E. Framework:**

**A - Acknowledge**
"I understand budget is key..."

**C - Clarify**
"Is this about overall investment or ROI?"

**E - Educate**
"Let me share how similar companies justified this..."

**Sample Response:**
"You're right [competitor] is cheaper upfront. But here's what clients tell us..."
""",
            data={"objectionType": "Price", "framework": "A.C.E."}
        )
    elif "strategy" in msg:
        return AgentResponse(
            success=True,
            message="""**Deal Strategy Framework:**

1. Map stakeholders
2. Identify champion
3. Address concerns
4. Competitive positioning
5. Close plan""",
            data={"dealValue": 2500000, "winProbability": "35%"}
        )
    else:
        return AgentResponse(
            success=True,
            message="Hi! I'm your Sales Coach. I help with:\n- Objection handling\n- Deal strategy\n- Pitch practice\n- Win/loss analysis",
            data={"winRate": 42, "avgDealSize": 850000}
        )
