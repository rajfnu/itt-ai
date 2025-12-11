from fastapi import APIRouter, HTTPException, Header
from typing import Optional
import time

from models import LoginRequest, LoginResponse, User, MOCK_USERS, find_user_by_email

router = APIRouter()


@router.post("/login", response_model=LoginResponse, summary="User Login")
async def login(request: LoginRequest):
    """
    Authenticate a user with email and password.

    For demo purposes, any password works with valid mock user emails:
    - admin@intimetec.com
    - hr@intimetec.com
    - finance@intimetec.com
    - dev@intimetec.com
    - marketing@intimetec.com
    - sales@intimetec.com
    """
    # Simulate network delay
    time.sleep(0.5)

    user = find_user_by_email(request.email)

    if not user:
        return LoginResponse(success=False, error="Invalid credentials. User not found.")

    # Generate mock token
    token = f"mock-jwt-token-{user.id}-{int(time.time() * 1000)}"

    return LoginResponse(success=True, user=user, token=token)


@router.post("/logout", summary="User Logout")
async def logout():
    """Log out the current user"""
    return {"success": True, "message": "Logged out successfully"}


@router.get("/me", summary="Get Current User")
async def get_current_user(authorization: Optional[str] = Header(None)):
    """
    Get the currently authenticated user's information.

    Requires Bearer token in Authorization header.
    """
    if not authorization or not authorization.startswith("Bearer mock-jwt-token-"):
        raise HTTPException(status_code=401, detail="Not authenticated")

    # Extract user ID from mock token
    token_parts = authorization.split("-")
    if len(token_parts) < 4:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = token_parts[3]
    user = next((u for u in MOCK_USERS if u.id == user_id), None)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {"success": True, "data": user}
