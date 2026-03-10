import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 10,
});

export default pool;

// ── Schema ──────────────────────────────────────────────────────────────────
// Run once to create the table in Neon
export const CREATE_PAYMENTS_TABLE = `
CREATE TABLE IF NOT EXISTS payments (
    id                  SERIAL PRIMARY KEY,
    checkout_request_id TEXT        NOT NULL UNIQUE,
    merchant_request_id TEXT,
    status              TEXT        NOT NULL DEFAULT 'pending',   -- pending | success | failed
    name                TEXT,
    email               TEXT,
    phone_number        TEXT,
    ticket_type         TEXT,
    quantity            INTEGER,
    is_club_member      BOOLEAN     DEFAULT FALSE,
    amount              NUMERIC(10, 2),
    mpesa_ref           TEXT,
    failure_reason      TEXT,
    facility            TEXT,
    tour_date           TEXT,
    interests           TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`;

// ── Helpers ─────────────────────────────────────────────────────────────────

export async function upsertPayment(data: {
    checkoutRequestId: string;
    merchantRequestId?: string;
    status: 'pending' | 'success' | 'failed';
    name?: string;
    email?: string;
    phoneNumber?: string;
    ticketType?: string;
    quantity?: number;
    isClubMember?: boolean;
    amount?: number;
    mpesaRef?: string;
    failureReason?: string;
    facility?: string;
    tourDate?: string;
    interests?: string;
}) {
    const query = `
        INSERT INTO payments (
            checkout_request_id, merchant_request_id, status, name, email,
            phone_number, ticket_type, quantity, is_club_member, amount, mpesa_ref, failure_reason,
            facility, tour_date, interests, updated_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,NOW())
        ON CONFLICT (checkout_request_id) DO UPDATE SET
            merchant_request_id = COALESCE(EXCLUDED.merchant_request_id, payments.merchant_request_id),
            status              = EXCLUDED.status,
            name                = COALESCE(EXCLUDED.name, payments.name),
            email               = COALESCE(EXCLUDED.email, payments.email),
            phone_number        = COALESCE(EXCLUDED.phone_number, payments.phone_number),
            ticket_type         = COALESCE(EXCLUDED.ticket_type, payments.ticket_type),
            quantity            = COALESCE(EXCLUDED.quantity, payments.quantity),
            is_club_member      = COALESCE(EXCLUDED.is_club_member, payments.is_club_member),
            amount              = COALESCE(EXCLUDED.amount, payments.amount),
            mpesa_ref           = COALESCE(EXCLUDED.mpesa_ref, payments.mpesa_ref),
            failure_reason      = COALESCE(EXCLUDED.failure_reason, payments.failure_reason),
            facility            = COALESCE(EXCLUDED.facility, payments.facility),
            tour_date           = COALESCE(EXCLUDED.tour_date, payments.tour_date),
            interests           = COALESCE(EXCLUDED.interests, payments.interests),
            updated_at          = NOW()
        RETURNING *;
    `;
    const values = [
        data.checkoutRequestId,
        data.merchantRequestId ?? null,
        data.status,
        data.name ?? null,
        data.email ?? null,
        data.phoneNumber ?? null,
        data.ticketType ?? null,
        data.quantity ?? null,
        data.isClubMember ?? null,
        data.amount ?? null,
        data.mpesaRef ?? null,
        data.failureReason ?? null,
        data.facility ?? null,
        data.tourDate ?? null,
        data.interests ?? null,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
}

export async function getPayment(checkoutRequestId: string) {
    const result = await pool.query(
        'SELECT * FROM payments WHERE checkout_request_id = $1',
        [checkoutRequestId]
    );
    return result.rows[0] ?? null;
}
