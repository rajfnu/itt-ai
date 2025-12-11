from fastapi import APIRouter
import asyncio
from datetime import datetime

from models import AgentRequest, AgentResponse

router = APIRouter()


@router.post("/onboarding", response_model=AgentResponse, summary="Onboarding Assistant")
async def onboarding_agent(request: AgentRequest):
    """
    AI Agent for employee onboarding tasks.

    Capabilities:
    - Initiate onboarding for new employees
    - Track onboarding progress
    - Generate welcome packages
    - Schedule orientation sessions
    """
    await asyncio.sleep(1.2)
    msg = request.message.lower()

    if "start" in msg or "new" in msg or "initiate" in msg:
        return AgentResponse(
            success=True,
            message="""I've initiated the onboarding process:

**Onboarding Checklist Created:**
✅ Welcome email sent
✅ IT equipment request submitted
⏳ Access card - Pending (1-2 days)
⏳ Email account setup - In progress

**Next Steps:**
1. Confirm the start date
2. Assign a buddy/mentor
3. Schedule team introduction""",
            data={"onboardingId": f"ONB-{int(datetime.now().timestamp())}", "status": "initiated"}
        )
    elif "status" in msg or "progress" in msg:
        return AgentResponse(
            success=True,
            message="**Onboarding Status:** 75% complete\n\n✅ Welcome email sent\n✅ IT equipment delivered\n⏳ Benefits enrollment pending",
            data={"progress": 75, "completedTasks": 6, "pendingTasks": 2}
        )
    else:
        return AgentResponse(
            success=True,
            message="Hi! I'm your Onboarding Assistant. I can:\n\n- Start onboarding for new hires\n- Check onboarding status\n- Generate welcome packets\n- Schedule orientation\n\nHow can I help?",
            data={"activeOnboardings": 5, "completedThisMonth": 12}
        )


@router.post("/leave", response_model=AgentResponse, summary="Leave Manager")
async def leave_agent(request: AgentRequest):
    """
    AI Agent for leave management.

    Capabilities:
    - Check leave balances
    - Process leave requests
    - View pending approvals
    - Explain leave policies
    """
    await asyncio.sleep(0.8)
    msg = request.message.lower()

    if "balance" in msg or "how many" in msg:
        return AgentResponse(
            success=True,
            message="**Leave Balance:**\n\n📅 Vacation: 12 days remaining\n🏥 Sick Leave: 8 days\n👤 Personal: 3 days",
            data={"vacationDays": 12, "sickLeave": 8, "personalDays": 3}
        )
    elif "policy" in msg or "maternity" in msg:
        return AgentResponse(
            success=True,
            message="**Parental Leave Policy:**\n- Maternity: 16 weeks paid\n- Paternity: 4 weeks paid\n- Adoption: 12 weeks paid",
            data={"policyType": "Parental Leave"}
        )
    else:
        return AgentResponse(
            success=True,
            message="Hi! I'm your Leave Manager. Ask me about:\n- Leave balances\n- Submit requests\n- Policy questions",
            data={"capabilities": ["Balance Check", "Submit Request", "Policy Info"]}
        )


@router.post("/performance", response_model=AgentResponse, summary="Performance Coach")
async def performance_agent(request: AgentRequest):
    """AI Agent for performance management - reviews, goals, feedback"""
    await asyncio.sleep(1.0)
    return AgentResponse(
        success=True,
        message="Hi! I'm your Performance Coach. I help with:\n- Performance review templates\n- Goal tracking\n- 360 feedback compilation",
        data={"capabilities": ["Reviews", "Goals", "Feedback"]}
    )


@router.post("/recruitment", response_model=AgentResponse, summary="Recruitment Agent")
async def recruitment_agent(request: AgentRequest):
    """AI Agent for recruitment - job descriptions, candidate screening, scheduling"""
    await asyncio.sleep(0.9)
    return AgentResponse(
        success=True,
        message="Hi! I'm your Recruitment Agent. I can:\n- Create job descriptions\n- Screen resumes\n- Schedule interviews",
        data={"activeRequisitions": 8, "totalCandidates": 156}
    )


@router.post("/policy", response_model=AgentResponse, summary="Policy Assistant")
async def policy_agent(request: AgentRequest):
    """AI Agent for company policies - Q&A, document generation, compliance"""
    await asyncio.sleep(0.7)
    msg = request.message.lower()

    if "remote" in msg or "wfh" in msg:
        return AgentResponse(
            success=True,
            message="**Remote Work Policy:**\n\n- All full-time employees eligible after 90 days\n- Core hours: 10 AM - 3 PM\n- $500 home office stipend",
            data={"policyType": "Remote Work"}
        )
    else:
        return AgentResponse(
            success=True,
            message="Hi! I'm your Policy Assistant. Ask me about:\n- Remote work\n- Expense reimbursement\n- Code of conduct",
            data={"totalPolicies": 25}
        )
