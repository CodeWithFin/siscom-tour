import { NextRequest, NextResponse } from 'next/server';

// Global variable for status tracking during development
// In production, this would be a database like Redis or MongoDB
const paymentStatusMap = new Map<string, any>();

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const checkoutRequestId = searchParams.get('checkoutRequestId');

    if (!checkoutRequestId) {
        return NextResponse.json({ error: 'Missing checkoutRequestId' }, { status: 400 });
    }

    const statusData = paymentStatusMap.get(checkoutRequestId);

    if (!statusData) {
        return NextResponse.json({
            status: 'pending',
            message: 'Payment status not yet found'
        });
    }

    // Clean up old entries (older than 10 minutes)
    if (Date.now() - statusData.timestamp > 10 * 60 * 1000) {
        paymentStatusMap.delete(checkoutRequestId);
        return NextResponse.json({
            status: 'failed',
            message: 'Payment session timeout'
        });
    }

    return NextResponse.json(statusData);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { checkoutRequestId, status, email, name, amount, quantity, ticketType, mpesaRef } = body;

    if (!checkoutRequestId || !status) {
        return NextResponse.json({ error: 'Missing checkoutRequestId or status' }, { status: 400 });
    }

    const existingData = paymentStatusMap.get(checkoutRequestId) || {};

    paymentStatusMap.set(checkoutRequestId, {
        ...existingData,
        status,
        timestamp: existingData.timestamp || Date.now(),
        email: email || existingData.email,
        name: name || existingData.name,
        amount: amount || existingData.amount,
        quantity: quantity || existingData.quantity,
        ticketType: ticketType || existingData.ticketType,
        mpesaRef: mpesaRef || existingData.mpesaRef,
        updatedAt: Date.now()
    });

    return NextResponse.json({ message: 'Status updated successfully' });
}
