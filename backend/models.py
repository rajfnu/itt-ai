from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any, Literal
from datetime import datetime


# User Models
class User(BaseModel):
    id: str
    name: str
    email: str
    role: Literal["admin", "ceo", "cio", "coo", "hr_staff", "finance_staff", "engineer", "marketing_staff", "sales_staff"]
    department: str
    avatar: Optional[str] = None


class LoginRequest(BaseModel):
    email: EmailStr = Field(..., example="admin@intimetec.com")
    password: str = Field(..., min_length=1, example="demo123")


class LoginResponse(BaseModel):
    success: bool
    user: Optional[User] = None
    token: Optional[str] = None
    error: Optional[str] = None


# Agent Models
class AgentRequest(BaseModel):
    message: str = Field(..., min_length=1, example="What are our AI/ML capabilities?")


class AgentResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Dict[str, Any]] = None
    status: Literal["thinking", "searching", "processing", "complete", "error"] = "complete"
    timestamp: str = Field(default_factory=lambda: datetime.now().isoformat())


# Mock Data - InTimeTec Leadership & Staff
MOCK_USERS: List[User] = [
    User(id="1", name="Admin User", email="admin@intimetec.com", role="admin", department="Administration", avatar="/avatars/admin.png"),
    User(id="2", name="Khushbu Jain", email="hr@intimetec.com", role="hr_staff", department="Human Resources", avatar="/avatars/hr.png"),
    User(id="3", name="Tapish Rathore", email="finance@intimetec.com", role="finance_staff", department="Finance", avatar="/avatars/finance.png"),
    User(id="4", name="Rajeev Kumar", email="dev@intimetec.com", role="engineer", department="Engineering", avatar="/avatars/dev.png"),
    User(id="5", name="Priya Sharma", email="marketing@intimetec.com", role="marketing_staff", department="Marketing", avatar="/avatars/marketing.png"),
    User(id="6", name="Amit Gupta", email="sales@intimetec.com", role="sales_staff", department="Sales", avatar="/avatars/sales.png"),
    # C-Level Executives - InTimeTec Leadership
    User(id="7", name="Jeet Kumar", email="ceo@intimetec.com", role="ceo", department="Executive", avatar="/avatars/ceo.png"),
    User(id="8", name="Rakesh Gupta", email="cio@intimetec.com", role="cio", department="Executive", avatar="/avatars/cio.png"),
    User(id="9", name="Tapish Rathore", email="cfo@intimetec.com", role="coo", department="Executive", avatar="/avatars/cfo.png"),
]


def find_user_by_email(email: str) -> Optional[User]:
    """Find a user by email address"""
    for user in MOCK_USERS:
        if user.email.lower() == email.lower():
            return user
    return None
