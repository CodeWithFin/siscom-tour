import { NextRequest, NextResponse } from 'next/server';
import { MpesaService } from '@/lib/mpesa';

export async function POST(request: NextRequest) {
    try {
        const { email, phoneNumber, amount, eventType, isClubMember, ticketType, quantity, name } = await request.json();

        // Validate input
        if (!email || !phoneNumber || !amount || !ticketType || !quantity) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate phone number format
        const phoneRegex = /^(?:254|0)[17]\d{8}$/;
        if (!phoneRegex.test(phoneNumber)) {
            return NextResponse.json(
                { error: 'Invalid phone number format. Please use 07xx or 2547xx.' },
                { status: 400 }
            );
        }

        if (amount <= 0) {
            return NextResponse.json(
                { error: 'Amount must be greater than 0' },
                { status: 400 }
            );
        }

        const mpesa = new MpesaService();

        // Generate unique account reference and descriptions
        const accountReference = `TOUR-${ticketType.substring(0, 3).toUpperCase()}`;
        const ticketTypeText = ticketType === 'individual' ? 'Individual' : 'Corporate';
        const transactionDesc = `Siscom DC Tour: ${ticketTypeText} Ticket x${quantity}`;

        try {
            const stkResponse = await mpesa.initiateStkPush(
                phoneNumber,
                Number(amount),
                accountReference,
                transactionDesc
            );

            if (stkResponse.ResponseCode === '0') {
                try {
                    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
                    await fetch(`${appUrl}/api/mpesa/status`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            checkoutRequestId: stkResponse.CheckoutRequestID,
                            status: 'pending',
                            ticketType,
                            quantity,
                            isClubMember,
                            email,
                            name,
                            amount: Number(amount)
                        })
                    });
                } catch (error) {
                    console.error('Failed to set initial payment status:', error);
                }

                return NextResponse.json({
                    success: true,
                    message: stkResponse.CustomerMessage,
                    checkoutRequestId: stkResponse.CheckoutRequestID,
                    merchantRequestId: stkResponse.MerchantRequestID,
                });
            } else {
                return NextResponse.json(
                    { error: stkResponse.ResponseDescription },
                    { status: 400 }
                );
            }
        } catch (mpesaError: any) {
            console.error('M-Pesa STK Push error:', mpesaError);
            return NextResponse.json(
                { error: mpesaError.message || 'Payment initiation failed. Please try again.' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Payment initiation error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
