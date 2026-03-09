import { NextRequest, NextResponse } from 'next/server';
import { MpesaService } from '@/lib/mpesa';
import { TililSMSService } from '@/lib/tilil-sms';

export async function POST(request: NextRequest) {
    try {
        const callbackData = await request.json();
        console.log('M-Pesa Callback received:', JSON.stringify(callbackData, null, 2));

        const parsedCallback = MpesaService.parseCallbackData(callbackData);
        const sms = new TililSMSService();
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        if (parsedCallback.success) {
            console.log('Payment completed successfully:', {
                amount: parsedCallback.amount,
                mpesaReceiptNumber: parsedCallback.mpesaReceiptNumber,
                phoneNumber: parsedCallback.phoneNumber,
                checkoutRequestId: parsedCallback.checkoutRequestId
            });

            try {
                // Fetch existing status to get original payment details (ticketType, quantity, isClubMember)
                const statusResponse = await fetch(`${appUrl}/api/mpesa/status?checkoutRequestId=${parsedCallback.checkoutRequestId}`);
                const existingStatus = await statusResponse.json();

                console.log('Fetched existing status data:', existingStatus);

                // Update with full data
                await fetch(`${appUrl}/api/mpesa/status`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        checkoutRequestId: parsedCallback.checkoutRequestId,
                        status: 'success',
                        amount: parsedCallback.amount,
                        mpesaRef: parsedCallback.mpesaReceiptNumber,
                        ticketType: existingStatus.ticketType,
                        quantity: existingStatus.quantity,
                        isClubMember: existingStatus.isClubMember,
                        email: existingStatus.email,
                        name: existingStatus.name
                    })
                });

                // Send confirmation SMS
                if (parsedCallback.phoneNumber || existingStatus.phoneNumber) {
                    const finalPhone = (parsedCallback.phoneNumber || existingStatus.phoneNumber).toString();
                    const message = sms.generatePaymentConfirmationMessage(
                        Number(parsedCallback.amount),
                        parsedCallback.mpesaReceiptNumber,
                        existingStatus.ticketType || 'individual',
                        existingStatus.quantity || 1
                    );

                    await sms.sendSMS(finalPhone, message);
                    console.log(`Confirmation SMS sent to ${finalPhone}: ${message}`);
                }
            } catch (error) {
                console.error('Failed to update status and send SMS:', error);
            }

        } else {
            // Payment failed logic
            console.log('Payment failed:', {
                reason: parsedCallback.message,
                checkoutRequestId: parsedCallback.checkoutRequestId
            });

            try {
                const statusResponse = await fetch(`${appUrl}/api/mpesa/status?checkoutRequestId=${parsedCallback.checkoutRequestId}`);
                const existingStatus = await statusResponse.json();

                await fetch(`${appUrl}/api/mpesa/status`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        checkoutRequestId: parsedCallback.checkoutRequestId,
                        status: 'failed',
                        ticketType: existingStatus.ticketType,
                        quantity: existingStatus.quantity,
                        isClubMember: existingStatus.isClubMember
                    })
                });

                // Optionally send a failure SMS if possible
                if (parsedCallback.phoneNumber || existingStatus.phoneNumber) {
                    const finalPhone = (parsedCallback.phoneNumber || existingStatus.phoneNumber).toString();
                    const failureMessage = sms.generatePaymentFailedMessage();
                    await sms.sendSMS(finalPhone, failureMessage);
                }
            } catch (error) {
                console.error('Failed to update failure status:', error);
            }
        }

        return NextResponse.json({ message: 'Callback processed successfully' });
    } catch (error) {
        console.error('Callback processing error:', error);
        return NextResponse.json({ message: 'Callback received' });
    }
}
