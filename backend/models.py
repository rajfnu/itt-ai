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
    User(id="1", name="Kuldeep Mathur", email="kuldeep.mathur@intimetec.com", role="admin", department="IT & Security", avatar="/avatars/admin.png"),
    User(id="2", name="HR Manager", email="hr@intimetec.com", role="hr_staff", department="Human Resources", avatar="/avatars/hr.png"),
    User(id="3", name="Finance Manager", email="finance@intimetec.com", role="finance_staff", department="Finance", avatar="/avatars/finance.png"),
    User(id="4", name="Ritesh Soni", email="ritesh.soni@intimetec.com", role="engineer", department="Engineering", avatar="/avatars/dev.png"),
    User(id="5", name="Marketing Manager", email="marketing@intimetec.com", role="marketing_staff", department="Marketing", avatar="/avatars/marketing.png"),
    User(id="6", name="Vijaya Arucapalli", email="vijaya.arucapalli@intimetec.com", role="sales_staff", department="Client Delivery", avatar="/avatars/sales.png"),
    # C-Level Executives - InTimeTec Leadership
    User(id="7", name="Jeet Kumar", email="jeet.kumar@intimetec.com", role="ceo", department="Executive", avatar="/avatars/ceo.png"),
    User(id="8", name="Rakesh Sawan", email="rakesh.sawan@intimetec.com", role="cio", department="Executive", avatar="/avatars/cto.png"),
    User(id="9", name="Sandeep Jain", email="sandeep.jain@intimetec.com", role="coo", department="Executive", avatar="/avatars/md.png"),
    # Additional Executives
    User(id="10", name="Dan Puga", email="dan.puga@intimetec.com", role="ceo", department="Executive", avatar="/avatars/evp.png"),
    User(id="11", name="Matt Fratzke", email="matt.fratzke@intimetec.com", role="coo", department="Executive", avatar="/avatars/evp.png"),
    User(id="12", name="Cody Erben", email="cody.erben@intimetec.com", role="cio", department="Technology", avatar="/avatars/vp.png"),
    User(id="13", name="Rajeev Kumar", email="rajeev.kumar@intimetec.com", role="cio", department="ANZ", avatar="/avatars/cto.png"),
    User(id="14", name="Venkatesh Bachu", email="venkatesh.bachu@intimetec.com", role="coo", department="ANZ", avatar="/avatars/md.png"),
]


def find_user_by_email(email: str) -> Optional[User]:
    """Find a user by email address"""
    for user in MOCK_USERS:
        if user.email.lower() == email.lower():
            return user
    return None
