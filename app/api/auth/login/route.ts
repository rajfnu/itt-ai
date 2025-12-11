import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail } from '@/data/mock-data';
import { LoginResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<LoginResponse>> {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock authentication - in production, validate against real auth system
    // For demo purposes, any password works with valid mock user emails
    const user = findUserByEmail(email);

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Invalid credentials. User not found.',
      }, { status: 401 });
    }

    // Mock password validation (accept any password for demo)
    if (!password || password.length < 1) {
      return NextResponse.json({
        success: false,
        error: 'Password is required',
      }, { status: 401 });
    }

    // Generate mock token
    const token = `mock-jwt-token-${user.id}-${Date.now()}`;

    return NextResponse.json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
    }, { status: 500 });
  }
}
