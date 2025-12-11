import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

export async function POST(): Promise<NextResponse<ApiResponse>> {
  // Mock logout - in production, invalidate session/token
  return NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });
}
