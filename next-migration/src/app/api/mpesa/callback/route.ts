import { NextRequest, NextResponse } from 'next/server';
import { MpesaService } from '@/lib/mpesa';

export async function POST(request: NextRequest) {
    try {
        const callbackData = await request.json();
        console.log('M-Pesa Callback received:', JSON.stringify(callbackData, null, 2));

        const parsedCallback = MpesaService.parseCallbackData(callbackData);
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        if (parsedCallback.success) {
            console.log('Payment completed successfully:', parsedCallback);

            // Update session status to success
            await fetch(`${appUrl}/api/mpesa/status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    checkoutRequestId: parsedCallback.checkoutRequestId,
                    status: 'success',
                    mpesaRef: parsedCallback.mpesaReceiptNumber,
                    amount: parsedCallback.amount
                })
            });

            // You can add logic here to send SMS, update database, etc.

        } else {
            console.log('Payment failed:', parsedCallback.message);

            // Update session status to failed
            await fetch(`${appUrl}/api/mpesa/status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    checkoutRequestId: parsedCallback.checkoutRequestId,
                    status: 'failed',
                    message: parsedCallback.message
                })
            });
        }

        return NextResponse.json({ message: 'Callback processed' });
    } catch (error) {
        console.error('Callback error:', error);
        return NextResponse.json({ message: 'Error processing callback' }, { status: 500 });
    }
}
