import { NextRequest, NextResponse } from 'next/server';
import { MpesaService } from '@/lib/mpesa';

export async function POST(request: NextRequest) {
    try {
        const { email, phoneNumber, amount, eventType, ticketType, quantity, name, interests } = await request.json();

        if (!email || !phoneNumber || !amount || !ticketType || !quantity) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const mpesa = new MpesaService();
        const accountReference = `TOUR-${ticketType.substring(0, 3).toUpperCase()}`;
        const transactionDesc = `Siscom DC Tour: ${ticketType} x${quantity}`;

        const stkResponse = await mpesa.initiateStkPush(
            phoneNumber,
            Number(amount),
            accountReference,
            transactionDesc
        );

        if (stkResponse.ResponseCode === '0') {
            // Store initial pending status in the status tracker
            const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
            try {
                await fetch(`${appUrl}/api/mpesa/status`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        checkoutRequestId: stkResponse.CheckoutRequestID,
                        status: 'pending',
                        email,
                        name,
                        amount,
                        quantity,
                        ticketType
                    })
                });
            } catch (e) {
                console.error("Failed to initialize payment status:", e);
            }

            return NextResponse.json({
                success: true,
                checkoutRequestId: stkResponse.CheckoutRequestID,
                customerMessage: stkResponse.CustomerMessage
            });
        } else {
            return NextResponse.json({ error: stkResponse.ResponseDescription }, { status: 400 });
        }
    } catch (error: any) {
        console.error('M-Pesa STK Push error:', error);
        return NextResponse.json({ error: error.message || 'Payment initiation failed' }, { status: 500 });
    }
}
