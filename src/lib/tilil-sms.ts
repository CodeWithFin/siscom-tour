interface TililSMSResponse {
    status_code: string;
    status_desc: string;
    message_id: number;
    mobile_number: string;
    network_id: string;
    message_cost: number;
    credit_balance: number;
}

export class TililSMSService {
    private apiKey: string;
    private shortcode: string;
    private apiUrl: string;

    constructor() {
        this.apiKey = process.env.TILIL_API_KEY!;
        this.shortcode = process.env.TILIL_SHORTCODE!;
        this.apiUrl = 'https://api.tililtech.com/sms/v3/sendsms';
    }

    async sendSMS(phoneNumber: string | number, message: string): Promise<void> {
        if (!this.apiKey || !this.shortcode) {
            console.warn('Tilil SMS credentials missing. Skipping SMS sending.');
            return;
        }

        let formattedPhone = String(phoneNumber);
        if (formattedPhone.startsWith('0')) {
            formattedPhone = '254' + formattedPhone.substring(1);
        } else if (!formattedPhone.startsWith('254')) {
            formattedPhone = '254' + formattedPhone;
        }

        const messageParams = {
            api_key: this.apiKey,
            service_id: 0,
            mobile: formattedPhone,
            response_type: 'json',
            shortcode: this.shortcode,
            message: message,
        };

        console.log('Sending SMS to:', formattedPhone);

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageParams),
            });

            const data = await response.json();
            console.log('SMS API Response:', data);
        } catch (error) {
            console.error('SMS sending error:', error);
        }
    }

    generatePaymentConfirmationMessage(
        amount: number,
        mpesaReceiptNumber: string,
        ticketType: 'individual' | 'corporate',
        quantity: number = 1
    ): string {
        const tourText = ticketType === 'corporate' ? 'Corporate Package' : 'Individual Ticket';
        const quantityText = quantity > 1 ? `${quantity} ${tourText}s` : tourText;

        return `Payment Confirmed! Your booking for Siscom DC Tour (${quantityText}) is secured. Amount: KES ${amount.toLocaleString()} Ref: ${mpesaReceiptNumber}. Get ready for an insightful tour! For support, contact info@siscom.africa`;
    }

    generatePaymentFailedMessage(): string {
        return `Payment Failed. Your payment for the Siscom DC Tour could not be processed. Please try again or contact support at info@siscom.africa.`;
    }
}
