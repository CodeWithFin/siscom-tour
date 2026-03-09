import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const timeoutData = await request.json();
        console.log('M-Pesa Timeout received:', JSON.stringify(timeoutData, null, 2));

        // Handle timeout scenarios based on business logic if needed
        // This acknowledges Safaricom's timeout notification

        return NextResponse.json({ message: 'Timeout acknowledged' });
    } catch (error) {
        console.error('Timeout processing error:', error);
        return NextResponse.json({ message: 'Timeout received' });
    }
}
