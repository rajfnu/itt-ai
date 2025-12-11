from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from routers import auth, employees, hr, finance, marketing, sales, engineering

app = FastAPI(
    title="InTimeTec Portal API",
    description="""
## InTimeTec Corporate Portal Backend API

This API provides endpoints for the InTimeTec internal portal with AI-powered agents for different departments.

### Departments:
- **HR** - Onboarding, Leave, Performance, Recruitment, Policy
- **Finance** - Invoice, Expense, Budget, Payroll, Reports
- **Marketing** - Leads, Campaigns, Content, Social Media, Analytics
- **Sales** - Capabilities, Deck Builder, RFP Response, RFP Search, Sales Coach
- **Engineering** - Training, Knowledge Base, Code Review, Architecture, DevOps

### Authentication:
All protected endpoints require a Bearer token in the Authorization header.
    """,
    version="1.0.0",
    contact={
        "name": "InTimeTec",
        "email": "support@intimetec.com",
    },
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(employees.router, prefix="/api/employees", tags=["Employees"])
app.include_router(hr.router, prefix="/api/hr", tags=["HR Department"])
app.include_router(finance.router, prefix="/api/finance", tags=["Finance Department"])
app.include_router(marketing.router, prefix="/api/marketing", tags=["Marketing Department"])
app.include_router(sales.router, prefix="/api/sales", tags=["Sales Department"])
app.include_router(engineering.router, prefix="/api/engineering", tags=["Engineering Department"])


@app.get("/api/health", tags=["Health"])
async def health_check():
    """Check API health status"""
    return {"status": "ok", "timestamp": datetime.now().isoformat()}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=4000)
