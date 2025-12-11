import { NextResponse } from 'next/server';
import { ApiResponse, User } from '@/types';
import { mockUsers } from '@/data/mock-data';

// GET - List all employees
export async function GET(): Promise<NextResponse<ApiResponse<User[]>>> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // In production, fetch from database
  // For now, return expanded mock employee list
  const employees: User[] = [
    ...mockUsers,
    { id: '6', name: 'Tom Wilson', email: 'tom@intimetec.com', role: 'engineer', department: 'Engineering' },
    { id: '7', name: 'Emily Brown', email: 'emily@intimetec.com', role: 'engineer', department: 'Engineering' },
    { id: '8', name: 'David Lee', email: 'david@intimetec.com', role: 'hr_staff', department: 'Human Resources' },
    { id: '9', name: 'Jennifer Garcia', email: 'jennifer@intimetec.com', role: 'finance_staff', department: 'Finance' },
    { id: '10', name: 'Robert Taylor', email: 'robert@intimetec.com', role: 'marketing_staff', department: 'Marketing' },
  ];

  return NextResponse.json({
    success: true,
    data: employees,
  });
}
