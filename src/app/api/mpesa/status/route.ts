import { NextRequest, NextResponse } from 'next/server';
import { upsertPayment, getPayment } from '@/lib/db';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const checkoutRequestId = searchParams.get('checkoutRequestId');

    if (!checkoutRequestId) {
        return NextResponse.json({ error: 'Missing checkoutRequestId' }, { status: 400 });
    }

    const row = await getPayment(checkoutRequestId);

    if (!row) {
        return NextResponse.json({
            status: 'pending',
            message: 'Payment status not found'
        });
    }

    return NextResponse.json({
        status: row.status,
        amount: row.amount,
        mpesaRef: row.mpesa_ref,
        ticketType: row.ticket_type,
        quantity: row.quantity,
        isClubMember: row.is_club_member,
        email: row.email,
        name: row.name,
        phoneNumber: row.phone_number,
        message: row.status === 'success' ? 'Payment completed successfully' :
            row.status === 'failed' ? 'Payment failed' : 'Payment in progress'
    });
}

export async function POST(request: NextRequest) {
    const { checkoutRequestId, merchantRequestId, status, amount, mpesaRef, ticketType, quantity, isClubMember, email, name, phoneNumber, failureReason } = await request.json();

    if (!checkoutRequestId || !status) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await upsertPayment({
        checkoutRequestId,
        merchantRequestId,
        status,
        amount,
        mpesaRef,
        ticketType,
        quantity,
        isClubMember,
        email,
        name,
        phoneNumber,
        failureReason,
    });

    return NextResponse.json({ message: 'Status updated' });
}

