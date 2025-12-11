from fastapi import APIRouter
import asyncio
from datetime import datetime

from models import AgentRequest, AgentResponse

router = APIRouter()


@router.post("/invoice", response_model=AgentResponse, summary="Invoice Agent")
async def invoice_agent(request: AgentRequest):
    """
    AI Agent for invoice management.

    Capabilities:
    - Create and process invoices
    - Check invoice status
    - Track payments
    - Generate invoice reports
    """
    await asyncio.sleep(1.0)
    msg = request.message.lower()

    if "create" in msg or "new" in msg:
        return AgentResponse(
            success=True,
            message=f"""**Invoice Created Successfully**

📄 Invoice #: INV-{int(datetime.now().timestamp()) % 100000}
💰 Amount: $15,000.00
📅 Date: {datetime.now().strftime('%Y-%m-%d')}

**Status:** Draft - Ready for approval""",
            data={"invoiceId": f"INV-{int(datetime.now().timestamp()) % 100000}", "amount": 15000, "status": "draft"}
        )
    elif "status" in msg or "inv-" in msg:
        return AgentResponse(
            success=True,
            message="**Invoice INV-2024-001 Status:**\n\n✅ Created - Jan 5\n✅ Approved - Jan 6\n⏳ Payment Due - Feb 5",
            data={"status": "awaiting_payment", "dueDate": "Feb 5, 2024"}
        )
    else:
        return AgentResponse(
            success=True,
            message="Hi! I'm your Invoice Agent. I can:\n- Create invoices\n- Check status\n- Track payments\n- Generate reports",
            data={"totalInvoices": 156, "pendingApproval": 5}
        )


@router.post("/expense", response_model=AgentResponse, summary="Expense Manager")
async def expense_agent(request: AgentRequest):
    """AI Agent for expense management - review, categorize, analyze spending"""
    await asyncio.sleep(0.8)
    msg = request.message.lower()

    if "pending" in msg or "review" in msg:
        return AgentResponse(
            success=True,
            message="**Pending Expense Reports (8):**\n\n| Employee | Amount | Category |\n|----------|--------|----------|\n| Alex D. | $2,450 | Travel |\n| Lisa M. | $890 | Conference |",
            data={"pendingCount": 8, "totalPending": 12340}
        )
    else:
        return AgentResponse(
            success=True,
            message="Hi! I'm your Expense Manager. I help with:\n- Review expenses\n- Analyze spending\n- Track budgets",
            data={"pendingReview": 8, "totalThisMonth": 45000}
        )


@router.post("/budget", response_model=AgentResponse, summary="Budget Analyst")
async def budget_agent(request: AgentRequest):
    """AI Agent for budget tracking and forecasting"""
    await asyncio.sleep(0.9)
    return AgentResponse(
        success=True,
        message="Hi! I'm your Budget Analyst. I can:\n- Check department budgets\n- Forecast spending\n- Analyze variances",
        data={"totalBudget": 12000000, "spent": 9500000, "remaining": 2500000}
    )


@router.post("/payroll", response_model=AgentResponse, summary="Payroll Assistant")
async def payroll_agent(request: AgentRequest):
    """AI Agent for payroll processing and calculations"""
    await asyncio.sleep(0.8)
    return AgentResponse(
        success=True,
        message="Hi! I'm your Payroll Assistant. I handle:\n- Payroll scheduling\n- Bonus calculations\n- Tax withholdings",
        data={"nextPayroll": "January 15, 2025", "pendingApprovals": 7}
    )


@router.post("/report", response_model=AgentResponse, summary="Financial Reporter")
async def report_agent(request: AgentRequest):
    """AI Agent for financial reporting - P&L, cash flow, statements"""
    await asyncio.sleep(1.2)
    msg = request.message.lower()

    if "p&l" in msg or "profit" in msg:
        return AgentResponse(
            success=True,
            message="""**Q4 2024 P&L Summary:**

📊 Revenue: $7,320,000
💰 Gross Profit: $4,520,000 (62%)
📈 Net Income: $1,300,000 (18%)

*Revenue +12% vs Q3*""",
            data={"revenue": 7320000, "netIncome": 1300000, "netMargin": 18}
        )
    else:
        return AgentResponse(
            success=True,
            message="Hi! I'm your Financial Reporter. I generate:\n- P&L statements\n- Cash flow reports\n- Executive summaries",
            data={"availableReports": ["P&L", "Balance Sheet", "Cash Flow"]}
        )
