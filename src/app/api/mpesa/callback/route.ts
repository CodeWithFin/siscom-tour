import { NextRequest, NextResponse } from 'next/server';
import { MpesaService } from '@/lib/mpesa';
import { TililSMSService } from '@/lib/tilil-sms';
import { upsertPayment, getPayment } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const callbackData = await request.json();
        console.log('M-Pesa Callback received:', JSON.stringify(callbackData, null, 2));

        const parsedCallback = MpesaService.parseCallbackData(callbackData);
        const sms = new TililSMSService();

        if (parsedCallback.success) {
            console.log('Payment completed successfully:', {
                amount: parsedCallback.amount,
                mpesaReceiptNumber: parsedCallback.mpesaReceiptNumber,
                phoneNumber: parsedCallback.phoneNumber,
                checkoutRequestId: parsedCallback.checkoutRequestId
            });

            try {
                // Get existing row to preserve user details saved at initiate
                const existing = await getPayment(parsedCallback.checkoutRequestId);
                console.log('Existing payment record:', existing);

                // Update DB with success + mpesa receipt
                await upsertPayment({
                    checkoutRequestId: parsedCallback.checkoutRequestId,
                    status: 'success',
                    amount: Number(parsedCallback.amount),
                    mpesaRef: parsedCallback.mpesaReceiptNumber,
                    phoneNumber: parsedCallback.phoneNumber?.toString() || existing?.phone_number,
                });

                // Send confirmation SMS
                const finalPhone = parsedCallback.phoneNumber?.toString() || existing?.phone_number;
                if (finalPhone) {
                    const message = sms.generatePaymentConfirmationMessage(
                        Number(parsedCallback.amount),
                        parsedCallback.mpesaReceiptNumber,
                        existing?.ticket_type || 'individual',
                        existing?.quantity || 1
                    );
                    await sms.sendSMS(finalPhone, message);
                    console.log(`Confirmation SMS sent to ${finalPhone}`);
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
                await upsertPayment({
                    checkoutRequestId: parsedCallback.checkoutRequestId,
                    status: 'failed',
                    failureReason: parsedCallback.message || 'Unknown',
                });

                // Optionally send a failure SMS if possible
                const existing = await getPayment(parsedCallback.checkoutRequestId);
                const finalPhone = parsedCallback.phoneNumber?.toString() || existing?.phone_number;
                if (finalPhone) {
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
