import { NextRequest, NextResponse } from 'next/server';
import { mockUsers } from '@/data/mock-data';
import { ApiResponse, User } from '@/types';

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<User>>> {
  // Mock session check - in production, validate JWT token
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer mock-jwt-token-')) {
    return NextResponse.json({
      success: false,
      error: 'Not authenticated',
    }, { status: 401 });
  }

  // Extract user ID from mock token
  const tokenParts = authHeader.split('-');
  const userId = tokenParts[3];

  const user = mockUsers.find(u => u.id === userId);

  if (!user) {
    return NextResponse.json({
      success: false,
      error: 'User not found',
    }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: user,
  });
}
