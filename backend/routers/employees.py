from fastapi import APIRouter, HTTPException
from typing import List

from models import User, MOCK_USERS

router = APIRouter()


@router.get("/", summary="List All Employees")
async def list_employees():
    """Get a list of all employees"""
    return {"success": True, "data": MOCK_USERS}


@router.get("/{employee_id}", summary="Get Employee by ID")
async def get_employee(employee_id: str):
    """Get a specific employee by their ID"""
    user = next((u for u in MOCK_USERS if u.id == employee_id), None)

    if not user:
        raise HTTPException(status_code=404, detail="Employee not found")

    return {"success": True, "data": user}
