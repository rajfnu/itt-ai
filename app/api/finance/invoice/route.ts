import { NextRequest, NextResponse } from 'next/server';
import { AgentResponse } from '@/types';

export async function POST(request: NextRequest): Promise<NextResponse<AgentResponse>> {
  try {
    const body = await request.json();
    const { taskId, input } = body;

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (taskId === 'process-invoice') {
      return NextResponse.json({
        success: true,
        data: {
          invoiceId: `INV-${Date.now()}`,
          vendorName: input.vendorName,
          invoiceNumber: input.invoiceNumber,
          amount: input.amount,
          dueDate: input.dueDate,
          status: 'pending_approval',
          approvalWorkflow: [
            { step: 1, approver: 'Finance Manager', status: 'pending' },
            { step: 2, approver: 'Department Head', status: 'waiting' },
          ],
          paymentScheduled: null,
        },
        message: `Invoice ${input.invoiceNumber} submitted for approval. Amount: $${input.amount}`,
        timestamp: new Date().toISOString(),
      });
    }

    if (taskId === 'check-invoice-status') {
      return NextResponse.json({
        success: true,
        data: {
          invoiceNumber: input.invoiceNumber,
          vendor: 'Acme Corp',
          amount: 15000,
          status: 'approved',
          submittedDate: '2024-01-05',
          approvedDate: '2024-01-08',
          paymentDate: '2024-01-15',
          paymentMethod: 'ACH Transfer',
        },
        message: `Invoice ${input.invoiceNumber} has been approved and scheduled for payment`,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: false,
      data: {},
      message: 'Unknown task',
      timestamp: new Date().toISOString(),
    }, { status: 400 });
  } catch (error) {
    console.error('Invoice API error:', error);
    return NextResponse.json({
      success: false,
      data: {},
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
